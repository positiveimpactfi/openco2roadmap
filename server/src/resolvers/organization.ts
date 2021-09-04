import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { Organization } from "../entity/Organization";
import { User } from "../entity/User";

@Resolver(Organization)
export class OrganizationResolver {
  @Authorized(["SUPERADMIN", "ADMIN"])
  @Query(() => [Organization])
  allOrganizations(): Promise<Organization[]> {
    return Organization.find({});
  }

  @Authorized("SUPERADMIN")
  @Query(() => [User])
  async usersInOrganization(
    @Arg("organizationID") organizationID: string
  ): Promise<User[]> {
    const org = await Organization.findOne(organizationID, {
      relations: ["users"],
    });
    if (!org) {
      throw Error("organization not found");
    }
    const users = org.users;
    return users;
  }

  @Authorized("SUPERADMIN")
  @Mutation(() => Organization)
  createOrganization(
    @Arg("name") name: string,
    @Arg("businessID") businessID: string
  ): Promise<Organization> {
    return Organization.create({
      name,
      businessID,
    }).save();
  }

  @Authorized(["SUPERADMIN", "ADMIN"])
  @Mutation(() => User)
  async addUserToOrganization(
    @Arg("userId", () => Int) userId: number,
    @Arg("organizationId", () => Int) organizationId: number
  ) {
    const org = await Organization.findOne(organizationId, {
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
