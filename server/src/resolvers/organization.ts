import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Organization } from "../entity/Organization";
import { User } from "../entity/User";
import { Role } from "../types/Role";
import { SiteType } from "../entity/SiteType";
import { MyContext } from "../types/MyContext";
import { BusinessField } from "../entity/BusinessField";
import { Municipality } from "../entity/Municipality";
import { inverseNullish } from "../utils/inverseNullish";

@InputType()
class OrganizationInput {
  @Field()
  name: string;

  @Field()
  businessID: string;

  @Field(() => Int, { nullable: true })
  businessFieldID: number;

  @Field(() => Int, { nullable: true })
  municipalityID: number;
}

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

  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Mutation(() => Organization)
  async createOrganization(
    @Arg("data")
    { name, municipalityID, businessFieldID, businessID }: OrganizationInput
  ): Promise<Organization | undefined> {
    const businessField = inverseNullish(
      businessFieldID,
      await BusinessField.findOne(businessFieldID)
    );
    if (!businessField) {
      console.log("no business field");
    }
    const municipality = inverseNullish(
      municipalityID,
      await Municipality.findOne(municipalityID)
    );
    if (!municipality) {
      console.log("no municipality");
    }

    const newOrg = await Organization.create({
      name,
      businessID,
      businessField,
      municipality,
    }).save();

    console.log("new org", newOrg);
    return newOrg;
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

  @Authorized([
    Role.SUPERADMIN,
    Role.ADMIN,
    Role.COMPANY_ADMIN,
    Role.COMPANY_USER,
  ])
  @Query(() => [SiteType])
  async siteTypes(@Ctx() { req }: MyContext): Promise<SiteType[] | undefined> {
    const user = await User.findOne(req.session.userId);
    if (!user) {
      throw Error("invalid session cookie!");
    }
    const org = await Organization.findOne(user.organizations[0], {
      relations: ["siteTypes"],
    });
    const siteTypes = org?.siteTypes;
    return siteTypes;
  }
}
