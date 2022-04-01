import {
  Authorized,
  Ctx,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { z } from "zod";
import { CalculationResult } from "../entity/CalculationResult";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";
import { Role } from "../types/Role";

const yearlySchema = z
  .object({
    categoryid: z.string(),
    yearlysums: z.record(z.number()),
  })
  .array();

const monthlySchema = z
  .object({
    categoryid: z.string(),
    year: z.number(),
    monthlysums: z.record(z.number()),
  })
  .array();

const scopesSchema = z
  .object({
    scope: z.string(),
    values: z.record(z.number()),
  })
  .array();

@ObjectType()
class YearlyCalculationSummary {
  @Field({ nullable: true })
  categoryid: string;

  @Field(() => String, { nullable: true })
  yearlysums: string;
}

@ObjectType()
class MonthlyCalculationSummary {
  @Field({ nullable: true })
  categoryid: string;

  @Field(() => Int, { nullable: true })
  year: number;

  @Field(() => String, { nullable: true })
  monthlysums: string;
}

@ObjectType()
class ScopeSummary {
  @Field()
  scope: string;

  @Field()
  values: string;
}

@Resolver(CalculationResult)
export class CalculationResultResolver {
  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [CalculationResult])
  allCalculationResults(): Promise<CalculationResult[] | undefined> {
    return CalculationResult.find({ relations: ["dataEntry"] });
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Query(() => [YearlyCalculationSummary])
  async myOrganizationEmissionsByCategoryAndYear(
    @Ctx() { req }: MyContext
  ): Promise<YearlyCalculationSummary[] | undefined> {
    const user = await User.findOne(req.session.userId);
    if (!user) return undefined;
    const conn = getConnection();
    const res = await conn.manager.query(
      `
    with categoryCTE (myCat, myYear, mySum) as (select cr.category,
      date_part('year', cr."startDate") as year,
      sum(cr."emissionsCalculated")
      from calculation_result as cr
      where cr."organizationID" = $1
      and cr."isLatest" is true
      group by cr.category, year)
    select myCat as categoryID, json_object_agg(myYear, mySum) as yearlySums
    from categoryCTE
    group by categoryID
    order by categoryID;
    `,
      [user.organizations[0].id]
    );

    const parsed = yearlySchema.safeParse(res);
    if (!parsed.success) {
      return undefined;
    }
    const mappedData = parsed.data.map((d) => {
      return { ...d, yearlysums: JSON.stringify(d.yearlysums) };
    });
    return mappedData;
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Query(() => [MonthlyCalculationSummary])
  async myOrganizationEmissionsByCategoryAndMonth(
    @Ctx() { req }: MyContext
  ): Promise<MonthlyCalculationSummary[] | undefined> {
    const user = await User.findOne(req.session.userId);
    if (!user) return undefined;
    const conn = getConnection();
    const res = await conn.manager.query(
      `
      with categoryCTE (myCat, myMonth, myYear, mySum) as (select cr.category,
        date_part('month', cr."startDate") as month,
        date_part('year', cr."startDate") as year,
        sum(cr."emissionsCalculated")
        from calculation_result as cr
        where cr."organizationID" = $1
        and cr."isLatest" is true
        group by cr.category, month, year)
      select myCat as categoryID, myYear as year, json_object_agg(myMonth, mySum) as monthlySums 
      from categoryCTE
      group by year, categoryID
      order by year, categoryID;
    `,
      [user.organizations[0].id]
    );

    const parsed = monthlySchema.safeParse(res);
    if (!parsed.success) {
      return undefined;
    }
    const mappedData = parsed.data.map((d) => {
      return { ...d, monthlysums: JSON.stringify(d.monthlysums) };
    });
    return mappedData;
  }

  @Authorized([Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Query(() => [ScopeSummary])
  async myOrganizationEmissionsByScope(
    @Ctx() { req }: MyContext
  ): Promise<ScopeSummary[] | undefined> {
    const user = await User.findOne(req.session.userId);
    if (!user) return undefined;
    const conn = getConnection();
    const res = await conn.manager.query(
      `
      WITH scopes (
        scope,
        year,
        emissions
      ) AS (
        SELECT
          es.scope AS scope,
          date_part('year', cr."startDate") AS year,
          sum(cr."emissionsCalculated") AS emissions
        FROM
          calculation_result cr
          JOIN emission_source es ON es.id::text::calculation_result_emissionsource_enum = cr."emissionSource"
        WHERE
          "isLatest" IS TRUE
          AND cr."organizationID" = $1
        GROUP BY
          scope,
          year
        ORDER BY
          scope
      )
      SELECT
        scope,
        json_object_agg(year, emissions) AS
      VALUES
        FROM scopes
      GROUP BY
        scope;
      `,
      [user.organizations[0].id]
    );
    const parsed = scopesSchema.safeParse(res);
    if (!parsed.success) {
      console.log("error", parsed.error);
      return undefined;
    }
    const mappedData = parsed.data.map((d) => {
      return { scope: d.scope, values: JSON.stringify(d.values) };
    });
    return mappedData;
  }
}
