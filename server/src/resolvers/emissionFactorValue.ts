import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { EmissionFactor } from "../entity/EmissionFactor";
import { EmissionFactorValue } from "../entity/EmissionFactorValue";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";
import { Role } from "../types/Role";

@Resolver(EmissionFactorValue)
export class EmissionFactorValueResolver {
  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [EmissionFactorValue])
  allEmissionFactorValues() {
    return EmissionFactorValue.find({ relations: ["emissionFactor"] });
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
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
    const EF = await EmissionFactor.findOne(emissionFactorID);
    if (!EF) {
      console.error("no EF");
      return undefined;
    }

    const newEFValue = await EmissionFactorValue.create({
      value,
      startDate,
      endDate,
      emissionFactor: EF,
      creator: org,
    }).save();

    (await EF.values).push(newEFValue);
    console.log("created EF value", newEFValue);
    return newEFValue;
  }
}
