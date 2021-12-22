import { AuthChecker } from "type-graphql";
import { getConnection } from "typeorm";
import { MyContext } from "../types/MyContext";
import { Role } from "../../../shared/types";
import { z } from "zod";

const schema = z
  .object({
    user_id: z.string(),
    role_id: z.number(),
    role_name: z.string(),
    org_id: z.string(),
  })
  .array()
  .nonempty();

export const authChecker: AuthChecker<MyContext> = async (
  { context: { req } },
  roles
) => {
  const userId = req.session.userId;
  if (!userId) {
    req.log.error({ query: req.body.query }, "Not authenticated");
    return false;
  }

  const conn = getConnection();
  const queryResult = await conn.manager.query(
    `SELECT
  	"user"."id" AS "user_id",
  	"role"."id" AS "role_id",
    "role"."name" AS "role_name",
    "role"."organizationID" AS "org_id"
  FROM
  	"user" "user"
  	LEFT JOIN "user_roles_user_role" "user_roles" ON "user"."id" = "user_roles"."userId"
  	LEFT JOIN "user_role" "role" ON "user_roles"."userRoleId" = "role"."id"
  WHERE
  	"user".id = $1`,
    [userId]
  );

  const result = schema.safeParse(queryResult);

  // validation failed
  if (!result.success) {
    req.log.error(result, "SQL statement failed");
    return false;
  }
  const data = result.data;

  if (data[0].role_name === Role.SUPERADMIN) return true;

  /**
   * currently we assume user only has one organization
   * grant access if the roles overlap
   */
  if (roles.includes(data[0].role_name)) {
    return true;
  }

  return false;
};
