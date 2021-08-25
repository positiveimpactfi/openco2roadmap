import { Category } from "../entity/Category";
import { Connection } from "typeorm";
import { emissionCategories } from "./data/categories";

export const seedCategories = async (conn: Connection) => {
  const res = await conn.manager.save(Category, emissionCategories);
  console.log("seeded categories", res);
};
