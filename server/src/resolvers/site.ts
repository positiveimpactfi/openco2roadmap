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
import { z } from "zod";
import { DataEntry } from "../entity/DataEntry";
import { Municipality } from "../entity/Municipality";
import { Site } from "../entity/Site";
import { SiteType } from "../entity/SiteType";
import { SiteUnit } from "../entity/SiteUnit";
import { User } from "../entity/User";
import { Role } from "../types";
import { MyContext } from "../types/MyContext";
import { truthyObject } from "../utils/truthyObject";

const updateSchema = z
  .object({
    name: z.string(),
    siteTypeID: z.string(),
    municipalityID: z.number(),
  })
  .partial();

@InputType()
class SiteUnitInput {
  @Field()
  id: string;

  @Field()
  name: string;
}

@Resolver(Site)
export class SiteResolver {
  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
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

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => Site)
  async updateSite(
    @Arg("siteID") siteID: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("siteTypeID", { nullable: true }) siteTypeID: string,
    @Arg("municipalityID", () => Int, { nullable: true })
    municipalityID: number,
    @Arg("siteUnits", () => [SiteUnitInput], { nullable: true })
    siteUnits: SiteUnit[]
  ): Promise<Site | undefined> {
    const site = await Site.findOne(siteID, {
      relations: ["siteUnits", "siteType"],
    });
    if (!site) {
      console.error("invalid site");
      return undefined;
    }
    const res = updateSchema.safeParse({ name, siteTypeID, municipalityID });
    if (!res.success) {
      console.error("bad update site input data");
      return undefined;
    }
    const {
      name: pName,
      siteTypeID: pSiteTypeID,
      municipalityID: pMunicipalityID,
    } = res.data;
    const siteData = {
      ...(pName && { name: pName }),
      ...(pSiteTypeID && { siteType: await SiteType.findOne(pSiteTypeID) }),
      ...(pMunicipalityID && {
        municipality: await Municipality.findOne(pMunicipalityID),
      }),
    };

    const oldSiteUnits = site.siteUnits;
    /** handle deleted site units
     * we don't want to lose data entries, so they are moved to site's default site unit
     */
    for (let oldUnit of oldSiteUnits) {
      const isDeleted =
        !oldUnit.name.startsWith("default_") &&
        !siteUnits.some((s) => s.id === oldUnit.id);
      if (isDeleted) {
        console.log(`${oldUnit.name} has been deleted`);
        const defaultUnit = oldSiteUnits.find((u) =>
          u.name.startsWith("default_")
        );
        if (defaultUnit) {
          const oldDataEntries = await oldUnit.dataEntries;
          let savedDataEntries: DataEntry[] = [];
          for (let dataEntry of oldDataEntries) {
            dataEntry.siteUnit = defaultUnit;
            savedDataEntries.push(await dataEntry.save());
          }
          defaultUnit.dataEntries = Promise.resolve(
            (await defaultUnit.dataEntries).concat(savedDataEntries)
          );
          await defaultUnit.save();
          await oldUnit.remove();
        }
      }
    }

    for (let s of siteUnits) {
      /** handle site units that were renamed */
      if (oldSiteUnits.some((oldUnit) => s.id === oldUnit.id)) {
        const siteUnit = await SiteUnit.findOne(s.id);
        if (siteUnit) {
          siteUnit.name = s.name;
          await siteUnit.save();
        }
      }
      /** handle new sites */
      if (s.id.startsWith("new_")) {
        const newSiteUnit = await SiteUnit.create({
          name: s.name,
          site: site,
        }).save();
        site.siteUnits.push(newSiteUnit);
        await site.save();
      }
    }

    /** siteData fields can be undefined (if findOne fails), so we pass only truthy fields to the update function  */
    await Site.update(site.id, truthyObject(siteData));
    await site.reload();

    return site;
  }

  @Authorized([Role.ADMIN])
  @Query(() => [Site])
  async allSites(): Promise<Site[] | undefined> {
    const sites = await Site.find({ relations: ["siteType"] });
    return sites;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
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
