import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { EmissionFactor } from "../entity/EmissionFactor";
import { EmissionFactorValue } from "../entity/EmissionFactorValue";
import { Role } from "../types/Role";

@Resolver(EmissionFactorValue)
export class EmissionFactorValueResolver {
  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [EmissionFactorValue])
  allEmissionFactorValues() {
    return EmissionFactorValue.find({});
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => EmissionFactorValue)
  async createEmissionFactorValue(
    @Arg("emissionFactorID") emissionFactorID: string,
    @Arg("value") value: number,
    @Arg("startDate") startDate: number,
    @Arg("endDate") endDate: number
  ): Promise<EmissionFactorValue | undefined> {
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
    }).save();

    (await EF.values).push(newEFValue);
    console.log("created EF value", newEFValue);
    return newEFValue;
  }
}
