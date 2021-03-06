import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { z } from "zod";
import { EmissionFactor } from "../entity/EmissionFactor";
import { EmissionFactorValue } from "../entity/EmissionFactorValue";
import { EmissionSource } from "../entity/EmissionSource";
import { PhysicalQuantity } from "../entity/PhysicalQuantity";
import { User } from "../entity/User";
import { Role } from "../types";
import { DataSourceType } from "../types/DataSourceType";
import { MyContext } from "../types/MyContext";

type myType = (Omit<Partial<EmissionFactor>, "values"> & {
  values: (Pick<
    EmissionFactorValue,
    "id" | "value" | "startDate" | "endDate"
  > & {
    creator: {
      id: string;
    };
  })[];
})[];

const schema = z.array(
  z.object({
    id: z.string(),
    value: z.number(),
    name: z.string(),
    startDate: z.number(),
    endDate: z.number(),
    creator: z.string(),
  })
);

@Resolver(EmissionFactor)
export class EmissionFactorResolver {
  @Authorized([Role.ADMIN])
  @Query(() => [EmissionFactor])
  allEmissionFactors(): Promise<EmissionFactor[]> {
    return EmissionFactor.find({
      relations: ["physicalQuantity", "creator", "values"],
    });
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Query(() => [EmissionFactor])
  allPublicEmissionFactors(): Promise<EmissionFactor[]> {
    const res = EmissionFactor.createQueryBuilder("ef")
      .select(["ef", "quantity", "values", "baseUnit"])
      .leftJoin("ef.physicalQuantity", "quantity")
      .leftJoin("ef.values", "values")
      .leftJoin("quantity.baseUnit", "baseUnit")
      .where("values.creatorId IS NULL")
      .getMany();
    return res;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Query(() => [EmissionFactor])
  async myEmissionFactors(
    @Ctx() { req }: MyContext
  ): Promise<EmissionFactor[] | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const org = user.organizations[0];
    const res = await EmissionFactor.createQueryBuilder("ef")
      .select(["ef", "ev", "quantity", "baseUnit"])
      .leftJoin("ef.values", "ev")
      .leftJoin("ef.creator", "creator")
      .leftJoin("ef.physicalQuantity", "quantity")
      .leftJoin("quantity.baseUnit", "baseUnit")
      .where("ef.creatorId =:efCreatorId", { efCreatorId: org.id })
      .orWhere("ev.creatorId =:evCreatorId", { evCreatorId: org.id })
      .getMany();
    return res;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Query(() => [EmissionFactor])
  async myOrganizationEmissionFactors(
    @Ctx() { req }: MyContext
  ): Promise<myType | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const org = user.organizations[0];
    const conn = getConnection();
    const res = await conn.query(
      `SELECT
    ev.id,
    ev.value,
    ef AS name,
    ev. "startDate",
    ev. "endDate",
    org.id AS creator
  FROM
    emission_factor_value AS ev
    LEFT JOIN emission_factor AS ef ON ev. "emissionFactorId" = ef.id
    LEFT JOIN organization AS org ON ev. "creatorId" = org.id
  WHERE
    ef. "creatorId" IS NOT NULL
    AND org.id = $1
  GROUP BY
    ef,
    ev.id,
    org.id
  ORDER BY
    ef`,
      [org.id]
    );
    console.log("raw result", res);
    const result = schema.safeParse(res);
    if (!result.success) {
      console.error("sql statement faulty");
      console.log(result.error);
      return undefined;
    }
    const rawData = result.data;
    console.log("rawData", rawData);
    // group values by emission factors
    const reducedEmissionFactors = rawData.reduce((prev, current) => {
      if (prev.some((val) => val.name === current.name)) {
        const id = prev.findIndex((val) => val.name === current.name);
        const copiedPrev = [...prev];
        copiedPrev[id].values = [
          ...copiedPrev[id].values,
          {
            id: current.id,
            value: current.value,
            startDate: current.startDate,
            endDate: current.endDate,
            creator: {
              id: current.creator,
            },
          },
        ];
        return copiedPrev;
      }

      return [
        ...prev,
        {
          name: current.name,
          values: [
            {
              id: current.id,
              value: current.value,
              startDate: current.startDate,
              endDate: current.endDate,
              creator: { id: current.creator },
            },
          ],
        },
      ];
    }, [] as myType);

    return reducedEmissionFactors;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => EmissionFactor)
  async createEmissionFactor(
    @Ctx() { req }: MyContext,
    @Arg("emissionSourceIDs", () => [Int]) emissionSourceIDs: number[],
    @Arg("name") name: string,
    @Arg("physicalQuantityID") physicalQuantityID: number,
    @Arg("source", { nullable: true }) source: string,
    @Arg("dataSourceType", () => DataSourceType, { nullable: true })
    dataSourceType: DataSourceType,
    @Arg("geographicalCoverage", { nullable: true })
    geographicalCoverage: string,
    @Arg("startDate") startDate: number,
    @Arg("endDate") endDate: number,
    @Arg("value") value: number
  ): Promise<EmissionFactor | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const org = user.organizations[0];
    const emissionSources = await EmissionSource.findByIds(emissionSourceIDs);
    if (!emissionSources) {
      console.error("no emission sources defined");
      return undefined;
    }
    const physicalQuantity = await PhysicalQuantity.findOne(physicalQuantityID);

    const efBase: Partial<EmissionFactor> = {
      name,
      physicalQuantity,
      source,
      dataSourceType,
      geographicalArea: geographicalCoverage,
      values: [],
    };

    // SuperAdmin only creates public emission factors
    if (user.roles[0].name !== Role.SUPERADMIN) {
      efBase.creator = org;
    }

    const newEF = await EmissionFactor.create(efBase).save();
    for (let emissionSource of emissionSources) {
      (await emissionSource.emissionFactors).push(newEF);
      await emissionSource.save();
    }

    const evBase: Partial<EmissionFactorValue> = {
      value,
      startDate,
      endDate,
      emissionFactor: newEF,
    };
    if (user.roles[0].name !== Role.SUPERADMIN) {
      evBase.creator = org;
    }

    const newEfV = await EmissionFactorValue.create(evBase).save();

    console.log("created EF", newEF, "\n with values", newEfV);
    newEF.values = [...newEF.values, newEfV];
    return newEF;
  }
}
