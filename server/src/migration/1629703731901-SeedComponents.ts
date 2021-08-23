import { MigrationInterface, QueryRunner } from "typeorm";
import { Component } from "../entity/Component";
import { Category } from "../entity/Category";
import { emissionComponents } from "../seed/components";

export class SeedComponents1629703731901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    emissionComponents.forEach(async (component) => {
      const cat = await queryRunner.manager.findOne(
        Category,
        component.categoryID,
        { relations: ["components"] }
      );
      if (cat) {
        const newComponent = new Component();
        newComponent.name = component.name;
        newComponent.category = cat;
        const savedComponent = await queryRunner.manager.save(
          Component,
          newComponent
        );
        cat.components.push(newComponent);
        const savedCat = await queryRunner.manager.save(Category, cat);
        console.log("modified category", savedCat, "component", savedComponent);
      } else {
        console.log("category not found!");
      }
    });
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
