import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { KPI, KPIValue, MeasurementUnit, User } from "../entity";
import { MeasurementUnitType, Role } from "../types";
import { MyContext } from "../types/MyContext";
import { z } from "zod";

@ObjectType()
class EmissionsByKPI {
  @Field()
  year: number;

  @Field()
  co2_emissions: number;

  @Field()
  value: number;

  @Field()
  kpi: string;

  @Field()
  kpiValue: number;
}

const kpiSchema = z
  .object({
    year: z.number(),
    co2_emissions: z.number(),
    value: z.number(),
    kpi: z.string(),
    kpi_value: z.number(),
  })
  .array();

@Resolver(KPI)
export class KPIResolver {
  @Authorized([Role.ADMIN])
  @Query(() => [KPI])
  allKPIs() {
    return KPI.createQueryBuilder("kpi")
      .select(["kpi", "values", "organization", "unit"])
      .leftJoin("kpi.values", "values")
      .leftJoinAndSelect("values.organization", "valueOrg")
      .leftJoin("kpi.organization", "organization")
      .leftJoin("kpi.unit", "unit")
      .getMany();
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Query(() => [KPI])
  publicKPIs() {
    return KPI.createQueryBuilder("kpi")
      .select(["kpi.id", "kpi.name", "unit"])
      .leftJoin("kpi.unit", "unit")
      .where("kpi.organization IS NULL")
      .getMany();
  }

  @Authorized([Role.COMPANY_ADMIN])
  @Query(() => [EmissionsByKPI])
  async emissionsByKPI(
    @Ctx() { req }: MyContext
  ): Promise<EmissionsByKPI[] | undefined> {
    const user = await User.findOne(req.session.userId);
    if (!user) return undefined;
    const conn = getConnection();
    const res = await conn.manager.query(
      `with kpis (myYear, emissions, kvYear, kvValue, kpi) as (select date_part('year', cr."startDate") as myYear,
        sum(cr."emissionsCalculated") as emissions,
        kv.year as kvYear,
        kv.value as value,
        kpi.name as kpi
        from kpi_value kv
          left join kpi on kv."parentId" = kpi.id
          left join calculation_result cr
                  on kv."organizationId" = cr."organizationID" ::uuid
        where cr."organizationID" = $1
              and cr."isLatest" is true
        group by myYear, value, kpi, kvYear)
      select myYear as year, emissions as co2_emissions, kvValue as value, kpi, emissions/kvValue as kpi_value
        from kpis
        where myYear = kvYear
        group by year, emissions, kvYear, kpi, kvValue
        order by year, kpi;`,
      [user.organizations[0].id]
    );
    const parsed = kpiSchema.safeParse(res);
    if (!parsed.success) {
      return undefined;
    }
    const mappedData = parsed.data.map((v) => {
      return { ...v, kpiValue: v.kpi_value };
    });
    return mappedData;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Query(() => [KPI])
  async myOrganizationKPIs(
    @Ctx() { req }: MyContext
  ): Promise<KPI[] | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      return undefined;
    }
    const org = user.organizations[0];
    return KPI.createQueryBuilder("kpi")
      .select(["kpi", "values", "organization", "unit"])
      .leftJoin("kpi.values", "values")
      .leftJoinAndSelect("values.organization", "valueOrg")
      .leftJoin("kpi.organization", "organization")
      .leftJoin("kpi.unit", "unit")
      .where("kpi.organizationId = :orgId", { orgId: org.id })
      .orWhere("values.organizationId = :orgId", { orgId: org.id })
      .getMany();
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => KPI)
  async createKPI(
    @Ctx() { req }: MyContext,
    @Arg("name") name: string,
    @Arg("measurementUnit", () => MeasurementUnitType, { nullable: true })
    measurementUnit: MeasurementUnitType
  ): Promise<KPI | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      req.log.error({ error: "no user" }, "no user found!");
      console.error("no user");
      return undefined;
    }
    const org = user.organizations[0];
    const previousKPI = await KPI.find({
      where: { organization: org, name: name },
    });
    if (previousKPI.length > 0) {
      console.log("KPI with this name already exists");
      return undefined;
    }
    let kpiBase = KPI.create({ name: name, organization: org });
    if (measurementUnit) {
      const unit = await MeasurementUnit.findOne(measurementUnit);
      if (unit) {
        kpiBase.unit = unit;
      }
    }
    const savedKpi = await kpiBase.save();
    return savedKpi;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => KPI)
  async updateKPI(
    @Ctx() { req }: MyContext,
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("measurementUnit", () => MeasurementUnitType, { nullable: true })
    measurementUnit: MeasurementUnitType
  ): Promise<KPI | undefined> {
    const user = await User.findOne(req.session.userId);
    if (!user) {
      return undefined;
    }
    const kpi = await KPI.findOne(id);
    if (!kpi) {
      req.log.error({ error: "no KPI found for id" }, "no KPI");
      return undefined;
    }
    if (kpi.organization.id !== user.organizations[0].id) {
      req.log.error(user, "access denied");
      return undefined;
    }
    let propertiesChanged = {
      name: false,
      unit: false,
    };
    if (name) {
      kpi.name = name;
      propertiesChanged.name = true;
    }
    if (measurementUnit) {
      const unit = await MeasurementUnit.findOne(measurementUnit);
      if (unit) {
        kpi.unit = unit;
        propertiesChanged.unit = true;
      }
    }
    if (propertiesChanged.name && propertiesChanged.unit) {
      req.log.info(kpi, "Changed name and unit");
      const savedKPI = await kpi.save();
      return savedKPI;
    } else if (propertiesChanged.name) {
      req.log.info(kpi, "Changed KPI name");
      const savedKPI = await kpi.save();
      return savedKPI;
    } else if (propertiesChanged.unit) {
      req.log.info(kpi, "Changed KPI unit");
      const savedKPI = await kpi.save();
      return savedKPI;
    }
    return undefined;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => KPI)
  async deleteKPI(
    @Ctx() { req }: MyContext,
    @Arg("id") id: string
  ): Promise<KPI | undefined> {
    const user = await User.findOne(req.session.userId);
    if (!user) {
      console.log("no user");
      return undefined;
    }
    const kpi = await KPI.findOne(id, {
      relations: ["organization", "values"],
    });
    console.log("kpi", kpi);
    if (!kpi) {
      console.log("no KPI");
      req.log.error("did not find KPI");
      return undefined;
    }
    if (kpi.organization.id !== user.organizations[0].id) {
      req.log.error(kpi, "access denied");
      return undefined;
    }
    const removedValues = await KPIValue.remove(kpi.values);
    req.log.info("removed KPI values", removedValues);
    const removeRes = await kpi.remove();
    req.log.info("removed KPI", removeRes);
    return removeRes;
  }
}
