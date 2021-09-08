import { Municipality } from "../entity/Municipality";
import { Site } from "../entity/Site";
import { SiteType } from "../entity/SiteType";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { SiteUnit } from "../entity/SiteUnit";
import { Role } from "../types/Role";
import { MyContext } from "../types/MyContext";
import { User } from "../entity/User";

@Resolver(Site)
export class SiteResolver {
  @Mutation(() => Site)
  async createSite(
    @Arg("name") name: string,
    @Arg("siteTypeID") siteTypeID: string,
    @Arg("municipalityID", () => Int) municipalityID: number,
    @Arg("siteUnits", () => [String], { nullable: true }) siteUnits?: string[]
  ): Promise<Site | undefined> {
    const siteType = await SiteType.findOne(siteTypeID);
    console.log("site type", siteType);
    if (!siteType) {
      console.error("site type does not exist");
      return undefined;
    }
    const municipality = await Municipality.findOne(municipalityID);
    if (!municipality) {
      console.error("municipality not found");
      return undefined;
    }
    const newSite = await Site.create({
      name,
      municipality,
      siteType,
      siteUnits: [],
    }).save();
    const defaultSiteUnit = await SiteUnit.create({
      site: newSite,
      name: "default_" + name,
    }).save();
    newSite.siteUnits.push(defaultSiteUnit);
    if (siteUnits) {
      siteUnits.forEach(async (siteUnit) => {
        const createdSiteUnit = await SiteUnit.create({
          name: siteUnit,
          site: newSite,
        }).save();
        newSite.siteUnits.push(createdSiteUnit);
      });
    }
    await newSite.save();
    return newSite;
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [Site])
  async allSites(): Promise<Site[] | undefined> {
    const sites = await Site.find({ relations: ["siteType"] });
    return sites;
  }

  @Authorized([
    Role.SUPERADMIN,
    Role.ADMIN,
    Role.COMPANY_ADMIN,
    Role.COMPANY_USER,
  ])
  @Query(() => [Site])
  async allSitesInMyOrganization(
    @Ctx() { req }: MyContext
  ): Promise<Site[] | undefined> {
    const user = await User.findOne(req.session.userId);
    if (!user) {
      console.error("no user found");
      return undefined;
    }
    const org = user.organizations[0];
    const orgSiteTypes = await org.siteTypes;
    if (!orgSiteTypes) {
      return undefined;
    }
    let allSites: Site[] = [];
    for (let orgSite of orgSiteTypes) {
      const mySites = await Site.find({
        where: { siteType: orgSite },
        relations: ["siteType"],
      });
      allSites = allSites.concat(mySites);
    }
    return allSites;
  }
}
