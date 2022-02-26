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
}
