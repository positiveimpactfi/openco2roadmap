import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { EmissionFactor } from "../entity/EmissionFactor";
import { EmissionFactorValue } from "../entity/EmissionFactorValue";
import { User } from "../entity/User";
import { Role } from "../types";
import { MyContext } from "../types/MyContext";

@Resolver(EmissionFactorValue)
export class EmissionFactorValueResolver {
  @Authorized([Role.ADMIN])
  @Query(() => [EmissionFactorValue])
  allEmissionFactorValues() {
    return EmissionFactorValue.createQueryBuilder("ev")
      .select(["ev", "emissionFactor.name", "emissionFactor.id"])
      .leftJoin("ev.emissionFactor", "emissionFactor")
      .getMany();
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => EmissionFactorValue)
  async createEmissionFactorValue(
    @Ctx() { req }: MyContext,
    @Arg("emissionFactorID") emissionFactorID: string,
    @Arg("value") value: number,
    @Arg("startDate") startDate: number,
    @Arg("endDate") endDate: number
  ): Promise<EmissionFactorValue | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const org = user.organizations[0];
    const EF = await EmissionFactor.findOne(emissionFactorID, {
      relations: ["values"],
    });
    if (!EF) {
      console.error("no EF");
      return undefined;
    }

    const efBase: Partial<EmissionFactorValue> = {
      value: value,
      startDate: startDate,
      endDate: endDate,
      emissionFactor: EF,
    };

    // creator is null if SuperAdmin creates a new EF Value, this way it's public to all users
    if (user.roles[0].name !== Role.SUPERADMIN) {
      efBase.creator = org;
    }

    const newEFValue = await EmissionFactorValue.create(efBase).save();

    EF.values.push(newEFValue);
    await EmissionFactor.save(EF);
    console.log("created EF value", newEFValue);
    return newEFValue;
  }
}
