import { Connection } from "typeorm";
import { Municipality } from "../entity/Municipality";
import { municipalities } from "./data/municipalities";

export const seedMunicipalities = async (conn: Connection) => {
  const res = await conn.manager.save(Municipality, municipalities);
  console.log("seeded municipalities", res);
};
