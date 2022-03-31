import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
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
    @Arg("year", () => Int) year: number
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

    const previousValues = await KPIValue.find({
      where: { parent: kpi, year: year, organization: user.organizations[0] },
    });
    if (previousValues.length > 0) {
      console.log("value for this year already exists");
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

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => KPIValue)
  async updateKPIValue(
    @Ctx() { req }: MyContext,
    @Arg("id") id: string,
    @Arg("value", { nullable: true }) value: number,
    @Arg("year", () => Int, { nullable: true }) year: number
  ): Promise<KPIValue | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) return undefined;
    const kpiValue = await KPIValue.findOne(id, {
      relations: ["organization"],
    });
    if (!kpiValue) return undefined;
    if (user.organizations[0].id !== kpiValue.organization.id) {
      return undefined;
    }
    if (!value && !year) return kpiValue;
    else {
      if (value) kpiValue.value = value;
      if (year) kpiValue.year = year;
      const savedKPIValue = await kpiValue.save();
      return savedKPIValue;
    }
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => KPIValue)
  async deleteKPIValue(
    @Ctx() { req }: MyContext,
    @Arg("id") id: string
  ): Promise<KPIValue | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) return undefined;
    if (!id) return undefined;
    const kpiValue = await KPIValue.findOne(id, {
      relations: ["organization"],
    });
    if (!kpiValue) {
      console.log("no KPI value");
      return undefined;
    }
    if (user.organizations[0].id !== kpiValue.organization.id) {
      console.log("access denied");
      return undefined;
    }
    const removedValue = await kpiValue.remove();
    return removedValue;
  }
}
