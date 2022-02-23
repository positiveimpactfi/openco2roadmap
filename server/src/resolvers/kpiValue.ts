import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { KPI } from "../entity";
import { KPIValue } from "../entity/KPIValue";
import { User } from "../entity/User";
import { Role } from "../types";
import { MyContext } from "../types/MyContext";

@Resolver(KPIValue)
export class KPIValueResolver {
  @Authorized([Role.ADMIN])
  @Query(() => [KPIValue])
  allKPIValues() {
    return KPIValue.createQueryBuilder("kv")
      .select(["kv", "kpi.name", "organization"])
      .leftJoin("kv.parent", "kpi")
      .leftJoin("kv.organization", "organization")
      .getMany();
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => KPIValue)
  async createKPIValue(
    @Ctx() { req }: MyContext,
    @Arg("kpiID") kpiID: string,
    @Arg("value") value: number,
    @Arg("year") year: number
  ): Promise<KPIValue | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const org = user.organizations[0];
    const kpi = await KPI.findOne(kpiID, {
      relations: ["values"],
    });
    if (!kpi) {
      console.error("no EF");
      return undefined;
    }

    const kpiBase: Partial<KPIValue> = {
      value: value,
      year: year,
      organization: org,
      parent: kpi,
    };

    const newKPIValue = await KPIValue.create(kpiBase).save();

    kpi.values.push(newKPIValue);
    await KPI.save(kpi);
    console.log("created KPI value", newKPIValue);
    return newKPIValue;
  }
}
