import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { EmissionFactor } from "../entity/EmissionFactor";
import { EmissionFactorValue } from "../entity/EmissionFactorValue";
import { EmissionSource } from "../entity/EmissionSource";
import { PhysicalQuantity } from "../entity/PhysicalQuantity";
import { User } from "../entity/User";
import { DataSourceType } from "../types/DataSourceType";
import { MyContext } from "../types/MyContext";
import { Role } from "../types/Role";

@Resolver(EmissionFactor)
export class EmissionFactorResolver {
  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [EmissionFactor])
  allEmissionFactors(): Promise<EmissionFactor[]> {
    return EmissionFactor.find({ relations: ["physicalQuantity"] });
  }

  @Query(() => [EmissionFactor])
  async myOrganizationEmissionFactors(
    @Ctx() { req }: MyContext
  ): Promise<EmissionFactor[] | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const org = user.organizations[0];
    const myEmissionFactorValues = await EmissionFactorValue.find({
      where: { creator: org },
      relations: [
        "emissionFactor",
        "emissionFactor.values",
        "emissionFactor.values.creator",
      ],
    });
    // groups organization's emission factor values by emission factor
    const reduced = myEmissionFactorValues.reduce(async (previous, current) => {
      const prev = await previous;
      if (!prev) return;
      if (prev.some((val) => val.name === current.emissionFactor.name)) {
        const id = prev.findIndex(
          (val) => val.name === current.emissionFactor.name
        );
        const copied = [...prev];
        const vals = await copied[id].values;
        const filteredValues = vals.filter((v) => v.creator?.id === org.id);
        copied[id].values = Promise.resolve(filteredValues);
        return copied;
      } else {
        const ef = current.emissionFactor;
        const vals = (await ef.values).filter((v) => v.creator?.id === org.id);
        const filteredEf = {
          ...ef,
          values: Promise.resolve(vals),
        } as EmissionFactor;
        console.log();
        return [...prev, filteredEf];
      }
    }, Promise.resolve([]) as Promise<EmissionFactor[] | undefined>);

    return reduced;
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => EmissionFactor)
  async createEmissionFactor(
    @Ctx() { req }: MyContext,
    @Arg("emissionSourceIDs", () => [String]) emissionSourceIDs: string[],
    @Arg("name") name: string,
    @Arg("physicalQuantityID") physicalQuantityID: number,
    @Arg("source", { nullable: true }) source: string,
    @Arg("dataSourceType", () => DataSourceType, { nullable: true })
    dataSourceType: DataSourceType
  ): Promise<EmissionFactor | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const org = user.organizations[0];
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
      creator: org,
    }).save();
    for (let emissionSource of emissionSources) {
      (await emissionSource.emissionFactors).push(newEF);
      await emissionSource.save();
    }
    console.log("created EF", newEF);

    return newEF;
  }
}
