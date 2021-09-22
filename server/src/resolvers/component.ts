import { Component } from "../entity/Component";
import { Authorized, Query, Resolver } from "type-graphql";
import { Role } from "../types";

@Resolver(Component)
export class ComponentResolver {
  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Query(() => [Component])
  allComponents(): Promise<Component[]> {
    return Component.find({ relations: ["category"] });
  }
}
