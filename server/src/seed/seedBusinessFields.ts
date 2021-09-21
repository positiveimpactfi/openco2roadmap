import { Connection } from "typeorm";
import { BusinessField } from "../entity/BusinessField";
import { businessFields } from "../../../shared/businessFields";

export const seedBusinessFields = async (conn: Connection) => {
  const res = await conn.manager.save(BusinessField, businessFields);
  console.log("seeded business fields", res);
};
