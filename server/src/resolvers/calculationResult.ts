import {
  Authorized,
  Ctx,
  Field,
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

const schema = z
  .object({
    categoryid: z.string(),
    yearlysums: z.record(z.number()),
  })
  .array();

@ObjectType()
class Return {
  @Field({ nullable: true })
  categoryid: string;

  @Field(() => String, { nullable: true })
  yearlysums: string;
}
console.log(Return);

@Resolver(CalculationResult)
export class CalculationResultResolver {
  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [CalculationResult])
  allCalculationResults(): Promise<CalculationResult[] | undefined> {
    return CalculationResult.find({ relations: ["dataEntry"] });
  }

  @Authorized([Role.ADMIN, Role.COMPANY_ADMIN, Role.COMPANY_USER])
  @Query(() => [Return])
  async myOrganizationEmissionsByCategoryAndYear(
    @Ctx() { req }: MyContext
  ): Promise<Return[] | undefined> {
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

    const parsed = schema.safeParse(res);
    if (!parsed.success) {
      return undefined;
    }
    console.log("data", parsed.data);
    const mappedData = parsed.data.map((d) => {
      return { ...d, yearlysums: JSON.stringify(d.yearlysums) };
    });
    console.log(mappedData);
    return mappedData;
  }
}
