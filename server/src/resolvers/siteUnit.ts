import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Site } from "../entity/Site";
import { SiteUnit } from "../entity/SiteUnit";
import { Role } from "../types";

@Resolver(SiteUnit)
export class SiteUnitResolver {
  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [SiteUnit])
  allSiteUnits() {
    return SiteUnit.find({});
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => SiteUnit)
  async createSiteUnit(
    @Arg("name") name: string,
    @Arg("siteID") siteID: string
  ): Promise<SiteUnit | undefined> {
    const site = await Site.findOne(siteID);
    if (!site) {
      console.error("site not found!");
      return undefined;
    }
    const newSiteUnit = await SiteUnit.create({ name, site }).save();
    return newSiteUnit;
  }
}
