import { Query, Resolver } from "type-graphql";
import { PhysicalQuantity } from "../entity/PhysicalQuantity";

@Resolver(PhysicalQuantity)
export class PhysicalQuantityResolver {
  @Query(() => [PhysicalQuantity])
  physicalQuantities(): Promise<PhysicalQuantity[]> {
    return PhysicalQuantity.find({ relations: ["units"] });
  }
}
