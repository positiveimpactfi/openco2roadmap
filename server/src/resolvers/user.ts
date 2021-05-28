import { Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find({});
  }
}
