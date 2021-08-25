import { MeasurementUnit } from "../entity/MeasurementUnit";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class MeasurementUnitResolver {
  @Query(() => [MeasurementUnit])
  units(): Promise<MeasurementUnit[]> {
    return MeasurementUnit.find({ relations: ["physicalQuantity"] });
  }
}
