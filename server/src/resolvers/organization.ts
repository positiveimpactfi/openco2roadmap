import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { Organization } from "../entity/Organization";
import { User } from "../entity/User";

@Resolver(Organization)
export class OrganizationResolver {
  @Authorized("ADMIN")
  @Query(() => [Organization])
  organizations(): Promise<Organization[]> {
    return Organization.find({});
  }

  @Authorized("ADMIN")
  @Mutation(() => Organization)
  addOrganization(@Arg("name") name: string): Promise<Organization> {
    return Organization.create({
      name,
    }).save();
  }

  @Authorized("ADMIN", "MAINTAINER")
  @Mutation(() => User)
  async addUserToOrganization(
    @Arg("userId", () => Int) userId: number,
    @Arg("organizationName") organization: string
  ) {
    const org = await Organization.findOne({
      where: { name: organization },
      relations: ["users"],
    });
    const user = await User.findOne(userId, { relations: ["organizations"] });
    if (!user || !org) {
      throw Error("something went wrong");
    }
    user.organizations = [...user.organizations, org];
    org.users = [...org.users, user];
    await user.save();
    await org.save();

    return user;
  }
}
