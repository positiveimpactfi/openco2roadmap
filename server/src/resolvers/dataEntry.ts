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
