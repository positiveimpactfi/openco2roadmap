import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { KPI, User } from "../entity";
import { Role } from "../types";
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
}
