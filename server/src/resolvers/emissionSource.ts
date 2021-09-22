import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Component } from "../entity/Component";
import { EmissionSource } from "../entity/EmissionSource";
import { Role } from "../types";

@Resolver(EmissionSource)
export class EmissionSourceResolver {
  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Query(() => [EmissionSource])
  async allEmissionSources(): Promise<EmissionSource[]> {
    const res = await EmissionSource.createQueryBuilder("es")
      .select(["es", "components", "category.name", "category.id"])
      .leftJoin("es.components", "components")
      .leftJoin("components.category", "category")
      .getMany();
    return res;
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => EmissionSource)
  async createEmissionSource(
    @Arg("componentIDs", () => [String]) componentIDs: string[],
    @Arg("name") name: string
  ): Promise<EmissionSource | undefined> {
    const components = await Component.findByIds(componentIDs);
    if (!components) {
      console.error("component not found");
      return undefined;
    }
    const newEmissionSource = await EmissionSource.create({ name }).save();
    for (let component of components) {
      (await component.emissionSources).push(newEmissionSource);
      await component.save();
    }
    console.log(newEmissionSource);
    return newEmissionSource;
  }
}
