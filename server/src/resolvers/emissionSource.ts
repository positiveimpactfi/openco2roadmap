import { EmissionSource } from "../entity/EmissionSource";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { UserRoleType as Role } from "../types/UserRoles";
import { Component } from "../entity/Component";

@Resolver(EmissionSource)
export class EmissionSourceResolver {
  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [EmissionSource])
  allEmissionSources() {
    return EmissionSource.find({});
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
