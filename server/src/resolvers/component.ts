import { Component } from "../entity/Component";
import { Query, Resolver } from "type-graphql";

@Resolver(Component)
export class ComponentResolver {
  @Query(() => [Component])
  components(): Promise<Component[]> {
    return Component.find({ relations: ["category"] });
  }
}
