import { Connection } from "typeorm";
import { Component } from "../entity/Component";
import { Category } from "../entity/Category";
import { emissionComponents } from "./data/components";

export const seedComponents = async (conn: Connection) => {
  console.log("==============COMPONENT SEED STARTED ===================");
  for (let component of emissionComponents) {
    const cat = await conn.manager.findOne(Category, component.categoryID, {
      relations: ["components"],
    });
    if (cat) {
      const savedComponent = await conn.manager
        .create(Component, {
          id: component.id,
          name: component.name,
          category: cat,
        })
        .save();
      console.log("saved component", savedComponent);
    } else {
      console.log("category not found!");
    }
  }
  console.log("=====COMPONENT SEED ENDED ===============");
};
