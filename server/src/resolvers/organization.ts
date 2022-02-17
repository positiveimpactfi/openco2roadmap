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
import { Municipality } from "../entity/Municipality";
import { Organization } from "../entity/Organization";
import { SiteType } from "../entity/SiteType";
import { SubIndustry } from "../entity/SubIndustry";
import { User } from "../entity/User";
import { Role } from "../types";
import { MyContext } from "../types/MyContext";
import { inverseNullish } from "../utils/inverseNullish";

@InputType()
class OrganizationInput implements Partial<Organization> {
  @Field()
  name: string;

  @Field()
  businessID: string;

  @Field(() => Int, { nullable: true })
  industryID: number;

  @Field(() => Int, { nullable: true })
  municipalityID: number;
}

@InputType()
class EditOrganizationInput extends OrganizationInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  businessID: string;
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

  @Authorized(Role.ADMIN, Role.COMPANY_ADMIN)
  @Query(() => [User])
  async myOrganizationUsers(
    @Ctx() { req }: MyContext
  ): Promise<User[] | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) return undefined;
    const org = user.organizations[0];
    const res = await User.createQueryBuilder("user")
      .select(["user", "org"])
      .leftJoin("user.organizations", "org")
      .where("org.id = :id", { id: org.id })
      .getMany();
    return res;
  }

  @Authorized([Role.ADMIN])
  @Mutation(() => Organization)
  async createOrganization(
    @Arg("data")
    { name, municipalityID, industryID, businessID }: OrganizationInput
  ): Promise<Organization | undefined> {
    const industry = inverseNullish(
      industryID,
      await SubIndustry.findOne(industryID)
    );
    if (!industry) {
      console.log("no industry");
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
      industry,
      municipality,
    }).save();

    console.log("new org", newOrg);
    return newOrg;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => Organization)
  async updateOrganization(
    @Arg("newData")
    { name, municipalityID, industryID, businessID }: EditOrganizationInput,
    @Arg("organizationID") organizationID: string
  ): Promise<Organization | undefined> {
    const org = await Organization.findOne(organizationID);
    if (!org) {
      console.error("no organization found");
      return undefined;
    }

    if (name) org.name = name;
    if (businessID) org.businessID = businessID;
    if (industryID) {
      const industry = await SubIndustry.findOne(industryID);
      if (industry) org.industry = industry;
    }

    if (municipalityID) {
      const municipality = await Municipality.findOne(municipalityID);
      if (municipality) org.municipality = municipality;
    }

    const updatedOrg = await org.save();
    console.log("updated org", updatedOrg);

    return updatedOrg;
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
