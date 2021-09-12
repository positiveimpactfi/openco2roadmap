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
import { EmissionFactor } from "../entity/EmissionFactor";
import { EmissionFactorValue } from "../entity/EmissionFactorValue";
import { EmissionSource } from "../entity/EmissionSource";
import { PhysicalQuantity } from "../entity/PhysicalQuantity";
import { User } from "../entity/User";
import { DataSourceType } from "../types/DataSourceType";
import { MyContext } from "../types/MyContext";
import { Role } from "../types/Role";
import { z } from "zod";

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
    return EmissionFactor.find({ relations: ["physicalQuantity", "creator"] });
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN])
  @Query(() => [EmissionFactor])
  allPublicEmissionFactors(): Promise<EmissionFactor[]> {
    return EmissionFactor.find({
      where: { creator: null },
      relations: ["physicalQuantity"],
    });
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
    ev. "creatorId" IS NOT NULL
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

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => EmissionFactor)
  async createEmissionFactor(
    @Ctx() { req }: MyContext,
    @Arg("emissionSourceIDs", () => [Int]) emissionSourceIDs: number[],
    @Arg("name") name: string,
    @Arg("physicalQuantityID") physicalQuantityID: number,
    @Arg("source", { nullable: true }) source: string,
    @Arg("dataSourceType", () => DataSourceType, { nullable: true })
    dataSourceType: DataSourceType
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
    const newEF = await EmissionFactor.create({
      name,
      physicalQuantity,
      source,
      dataSourceType,
      creator: org,
    }).save();
    for (let emissionSource of emissionSources) {
      (await emissionSource.emissionFactors).push(newEF);
      await emissionSource.save();
    }
    console.log("created EF", newEF);

    return newEF;
  }
}
