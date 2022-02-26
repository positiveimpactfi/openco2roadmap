import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { KPI, MeasurementUnit, User } from "../entity";
import { MeasurementUnitType, Role } from "../types";
import { MyContext } from "../types/MyContext";

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
      .select(["kpi.id", "kpi.name"])
      .where("kpi.organization IS NULL")
      .getMany();
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
}
