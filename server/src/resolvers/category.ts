import { Query, Resolver } from "type-graphql";
import { Category } from "../entity/Category";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  allCategories(): Promise<Category[]> {
    return Category.find({ relations: ["components"] });
  }
}
