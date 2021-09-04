import { SiteType } from "../entity/SiteType";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UserRoleType as Role } from "../types/UserRoles";
import { MyContext } from "../types/MyContext";
import { User } from "../entity/User";

@Resolver(SiteType)
export class SiteTypeResolver {
  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => SiteType)
  async createSiteType(
    @Ctx() { req }: MyContext,
    @Arg("name") name: string
  ): Promise<SiteType | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      throw Error("invalid cookie");
    }
    const org = user.organizations[0];
    const siteTypeExists = await SiteType.findOne({
      where: { name, organization: org },
      relations: ["organization"],
    });
    if (siteTypeExists) {
      console.error("site type already exists");
      return siteTypeExists;
    }

    try {
      const newSiteType = await SiteType.create({
        name,
        organization: org,
      }).save();
      return newSiteType;
    } catch (err) {
      console.error(err);
      return;
    }
  }
}
