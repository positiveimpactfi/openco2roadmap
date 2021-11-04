import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { allUnits } from "../../../shared/measurementUnits";
import { CalculationResult } from "../entity/CalculationResult";
import { DataEntry } from "../entity/DataEntry";
import { EmissionFactorValue } from "../entity/EmissionFactorValue";
import { SiteUnit } from "../entity/SiteUnit";
import { User } from "../entity/User";
import {
  CategoryType,
  EmissionSourceType,
  MeasurementUnitType,
  Role,
} from "../types";
import { MyContext } from "../types/MyContext";

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

    const res = await DataEntry.createQueryBuilder("data")
      .select([
        "data",
        "createdBy",
        "siteUnit",
        "site",
        "ev",
        "ef",
        "calculationResults",
      ])
      .leftJoin("data.createdBy", "createdBy")
      .leftJoin("createdBy.organizations", "org")
      .leftJoin("data.siteUnit", "siteUnit")
      .leftJoin("siteUnit.site", "site")
      .leftJoin("data.emissionFactorValue", "ev")
      .leftJoin("ev.emissionFactor", "ef")
      .leftJoin("data.calculationResults", "calculationResults")
      .where("createdBy.id = :id", { id: user.id })
      .getMany();

    return res;
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

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Mutation(() => DataEntry)
  async createDataEntry(
    @Ctx() { req }: MyContext,
    @Arg("siteUnitID") siteUnitID: string,
    @Arg("emissionsFactorValueID") emissionFactorValueID: string,
    @Arg("emissionSource", () => EmissionSourceType)
    emissionSource: EmissionSourceType,
    @Arg("measurementUnit", () => MeasurementUnitType)
    measurementUnit: MeasurementUnitType,
    @Arg("category", () => CategoryType) category: CategoryType,
    @Arg("startDate", () => Date) startDate: Date,
    @Arg("endDate", () => Date) endDate: Date,
    @Arg("consumptionValue") consumptionValue: number
  ): Promise<DataEntry | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const siteUnit = await SiteUnit.findOne(siteUnitID, {
      relations: ["site"],
    });
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
      measurementUnit,
      category,
      emissionSource,
      emissionFactorValue: EFValue,
      createdBy: user,
      calculationResults: [],
    }).save();

    const mUnit = allUnits.find(
      (unit) => unit.shorthand === MeasurementUnitType[measurementUnit]
    )?.conversionFactor;

    const calculationResult = await CalculationResult.create({
      startDate,
      endDate,
      consumptionValue,
      measurementUnit,
      emissionSource,
      category,
      emissionFactorValue: EFValue.value,
      siteUnitID: siteUnit.id,
      siteID: siteUnit.site.id,
      creatorID: user.id,
      organizationID: user.organizations[0].id,
      emissionsCalculated: mUnit
        ? EFValue.value * consumptionValue * mUnit
        : undefined,
      isLatest: true,
      dataEntry: newDataEntry,
    }).save();

    newDataEntry.calculationResults.push(calculationResult);
    await newDataEntry.save();
    console.log("created data entry", newDataEntry);
    console.log("created new calculation result", calculationResult);
    return newDataEntry;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Mutation(() => DataEntry)
  async updateDataEntry(
    @Ctx() { req }: MyContext,
    @Arg("dataEntryID") dataEntryID: string,
    @Arg("siteUnitID", { nullable: true }) siteUnitID?: string,
    @Arg("emissionsFactorValueID", { nullable: true })
    emissionFactorValueID?: string,
    @Arg("emissionSource", () => EmissionSourceType, { nullable: true })
    emissionSource?: EmissionSourceType,
    @Arg("measurementUnit", () => MeasurementUnitType, { nullable: true })
    measurementUnit?: MeasurementUnitType,
    @Arg("category", () => CategoryType, { nullable: true })
    category?: CategoryType,
    @Arg("startDate", () => Date, { nullable: true }) startDate?: Date,
    @Arg("endDate", () => Date, { nullable: true }) endDate?: Date,
    @Arg("consumptionValue", { nullable: true }) consumptionValue?: number
  ): Promise<DataEntry | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }

    const dataEntry = await DataEntry.findOne(dataEntryID, {
      relations: [
        "emissionFactorValue",
        "siteUnit",
        "siteUnit.site",
        "calculationResults",
      ],
    });
    if (!dataEntry) {
      console.error("could not find data entry for specified id");
      return undefined;
    }
    // Data entry found, check its latest calculation result
    const oldCalculationResult = await CalculationResult.findOne({
      where: { isLatest: true, dataEntry: dataEntry },
      relations: ["dataEntry"],
    });

    // Update fields if the mutation provides argument values for them
    let newSiteUnit, newEFValue;
    if (siteUnitID) {
      newSiteUnit = await SiteUnit.findOne(siteUnitID, {
        relations: ["site"],
      });
      if (newSiteUnit) dataEntry.siteUnit = newSiteUnit;
    }
    if (emissionFactorValueID) {
      newEFValue = await EmissionFactorValue.findOne(emissionFactorValueID);
      if (newEFValue) dataEntry.emissionFactorValue = newEFValue;
    }
    if (emissionSource) dataEntry.emissionSource = emissionSource;
    if (measurementUnit) dataEntry.measurementUnit = measurementUnit;
    if (category) dataEntry.category = category;
    if (startDate) dataEntry.startDate = startDate;
    if (endDate) dataEntry.endDate = endDate;
    if (consumptionValue) dataEntry.consumptionValue = consumptionValue;

    const mUnit = allUnits.find(
      (unit) =>
        unit.shorthand === MeasurementUnitType[dataEntry.measurementUnit]
    )?.conversionFactor;

    // calculate the emissions
    const emissionsCalculated = mUnit
      ? newEFValue
        ? newEFValue.value * dataEntry.consumptionValue * mUnit
        : dataEntry.emissionFactorValue.value *
          dataEntry.consumptionValue *
          mUnit
      : undefined;

    const updatedDataEntry = await dataEntry.save();

    // create new CalculationResult and save it
    const calculationResult = await CalculationResult.create({
      startDate: dataEntry.startDate,
      endDate: dataEntry.endDate,
      consumptionValue: dataEntry.consumptionValue,
      measurementUnit: dataEntry.measurementUnit,
      emissionSource: dataEntry.emissionSource,
      category: dataEntry.category,
      emissionFactorValue: newEFValue
        ? newEFValue.value
        : dataEntry.emissionFactorValue.value,
      siteUnitID: newSiteUnit ? newSiteUnit.id : dataEntry.siteUnit.id,
      siteID: newSiteUnit ? newSiteUnit.site.id : dataEntry.siteUnit.site.id,
      creatorID: user.id,
      organizationID: user.organizations[0].id,
      emissionsCalculated: emissionsCalculated,
      isLatest: true,
      dataEntry: updatedDataEntry,
    }).save();

    // update previous calculation result
    if (oldCalculationResult) {
      oldCalculationResult.isLatest = false;
      await oldCalculationResult.save();
    }

    dataEntry.calculationResults
      ? dataEntry.calculationResults.push(calculationResult)
      : (dataEntry.calculationResults = [calculationResult]);
    const finalDataEntry = await dataEntry.save();
    console.log("updated data entry", finalDataEntry);
    console.log("created new calculation result", calculationResult);
    return finalDataEntry;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Mutation(() => DataEntry)
  async deleteEntry(
    @Ctx() { req }: MyContext,
    @Arg("dataEntryID") dataEntryID: string
  ): Promise<DataEntry | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["dataEntries"],
    });
    if (!user) {
      console.error("no user when trying to delete entry");
      return undefined;
    }
    const dataEntry = await DataEntry.findOne(dataEntryID, {
      relations: ["calculationResults"],
    });
    if (!dataEntry) {
      console.error("data entry not found");
      return undefined;
    }
    const deletedCalculationResults = await CalculationResult.remove(
      dataEntry.calculationResults
    );
    console.log("deleted calculation results", deletedCalculationResults);
    user.dataEntries = user.dataEntries?.filter(
      (entry) => entry.id !== dataEntry.id
    );
    await user.save();

    const deletedEntry = await dataEntry.remove();
    console.log("deleted data entry", { ...deletedEntry, id: dataEntry.id });
    return deletedEntry;
  }
}
