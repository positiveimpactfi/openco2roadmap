import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { EmissionFactor } from "../entity/EmissionFactor";
import { EmissionSource } from "../entity/EmissionSource";
import { PhysicalQuantity } from "../entity/PhysicalQuantity";
import { DataSourceType } from "../types/DataSourceType";
import { UserRoleType as Role } from "../types/UserRoles";

@Resolver(EmissionFactor)
export class EmissionFactorResolver {
  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [EmissionFactor])
  allEmissionFactors() {
    return EmissionFactor.find({});
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => EmissionFactor)
  async createEmissionFactor(
    @Arg("emissionSourceIDs", () => [String]) emissionSourceIDs: string[],
    @Arg("name") name: string,
    @Arg("physicalQuantityID") physicalQuantityID: number,
    @Arg("source", { nullable: true }) source: string,
    @Arg("dataSourceType", () => DataSourceType, { nullable: true })
    dataSourceType: DataSourceType
  ): Promise<EmissionFactor | undefined> {
    const emissionSources = await EmissionSource.findByIds(emissionSourceIDs);
    if (!emissionSources) {
      console.error("no emission sources defined");
      return undefined;
    }
    const physicalQuantity = await PhysicalQuantity.findOne(physicalQuantityID);
    const newEF = await EmissionFactor.create({
      name,
      physicalQuantity,
      source,
      dataSourceType,
    }).save();
    for (let emissionSource of emissionSources) {
      (await emissionSource.emissionFactors).push(newEF);
      await emissionSource.save();
    }
    console.log("created EF", newEF);

    return newEF;
  }
}
