import { Municipality } from "../entity/Municipality";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class MunicipalityResolver {
  @Query(() => [Municipality])
  allMunicipalities() {
    return Municipality.find({ order: { name: "ASC" } });
  }
}
