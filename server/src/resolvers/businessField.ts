import { BusinessField } from "../entity/BusinessField";
import { Query, Resolver } from "type-graphql";

@Resolver(BusinessField)
export class BusinessFieldResolver {
  @Query(() => [BusinessField])
  businessFields(): Promise<BusinessField[]> {
    return BusinessField.find({});
  }
}
