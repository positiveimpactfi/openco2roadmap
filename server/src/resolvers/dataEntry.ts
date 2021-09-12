import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { DataEntry } from "../entity/DataEntry";
import { Role } from "../types/Role";
import { MyContext } from "../types/MyContext";
import { User } from "../entity/User";
import { SiteUnit } from "../entity/SiteUnit";
import { EmissionFactorValue } from "../entity/EmissionFactorValue";

@Resolver(DataEntry)
export class DataEntryResolver {
  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [DataEntry])
  allDataEntries(): Promise<DataEntry[]> {
    return DataEntry.find({});
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Query(() => [DataEntry])
  async myDataEntries(
    @Ctx() { req }: MyContext
  ): Promise<DataEntry[] | undefined> {
    const user = await User.findOne(req.session.userId);
    if (!user) {
      console.error("no user!");
      return undefined;
    }
    return DataEntry.find({
      where: { createdBy: user },
      relations: ["createdBy"],
    });
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Query(() => [DataEntry])
  async myOrganizationDataEntries(
    @Ctx() { req }: MyContext
  ): Promise<DataEntry[] | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const org = user.organizations[0];
    const res = await DataEntry.createQueryBuilder("data")
      .select(["data", "createdBy", "org"])
      .leftJoin("data.createdBy", "createdBy")
      .leftJoin("createdBy.organizations", "org")
      .where("org.id = :id", { id: org.id })
      .getMany();
    return res;
  }

  @Mutation(() => DataEntry)
  async createDataEntry(
    @Ctx() { req }: MyContext,
    @Arg("siteUnitID") siteUnitID: string,
    @Arg("emissionsFactorValueID") emissionFactorValueID: string,
    @Arg("startDate", () => Date) startDate: Date,
    @Arg("endDate", () => Date) endDate: Date,
    @Arg("consumptionValue") consumptionValue: number
  ): Promise<DataEntry | undefined> {
    const user = await User.findOne(req.session.userId);
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const siteUnit = await SiteUnit.findOne(siteUnitID);
    if (!siteUnit) {
      console.error("no site unit");
      return undefined;
    }
    const EFValue = await EmissionFactorValue.findOne(emissionFactorValueID);
    if (!EFValue) {
      console.error("no EF value");
      return undefined;
    }
    const newDataEntry = await DataEntry.create({
      siteUnit,
      startDate,
      endDate,
      consumptionValue,
      emissionFactorValue: EFValue,
      createdBy: user,
    }).save();
    console.log("created data entry", newDataEntry);
    return newDataEntry;
  }
}
