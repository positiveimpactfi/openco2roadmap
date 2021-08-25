import { Connection } from "typeorm";
import { Component } from "../entity/Component";
import { Category } from "../entity/Category";
import { emissionComponents } from "./data/components";

export const seedComponents = async (conn: Connection) => {
  console.log("==============COMPONENT SEED STARTED ===================");
  emissionComponents.forEach(async (component) => {
    const cat = await conn.manager.findOne(Category, component.categoryID, {
      relations: ["components"],
    });
    if (cat) {
      const newComponent = new Component();
      newComponent.name = component.name;
      newComponent.category = cat;
      const savedComponent = await conn.manager.save(Component, newComponent);
      console.log("saved component", savedComponent);
    } else {
      console.log("category not found!");
    }
  });
};
