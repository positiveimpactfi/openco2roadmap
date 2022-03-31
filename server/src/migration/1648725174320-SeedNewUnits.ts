import { MigrationInterface, QueryRunner } from "typeorm";
import { MeasurementUnit, PhysicalQuantity } from "../entity";
import { PhysicalEntityType } from "../types";
import { quantities } from "../../../shared/measurementUnits";

export class SeedNewUnits1648725174320 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newQuantity = await queryRunner.manager.save(PhysicalQuantity, {
      name: "Quantity",
      id: PhysicalEntityType.Quantity,
    });
    const unitsToSave = quantities.map((q) => {
      return { ...q, physicalQuantity: newQuantity };
    });
    const savedUnits = await queryRunner.manager.save(
      MeasurementUnit,
      unitsToSave
    );
    newQuantity.baseUnit = savedUnits.find((u) => u.shorthand === "kpl")!;
    await queryRunner.manager.save(PhysicalQuantity, newQuantity);
    console.log("saved new units", savedUnits);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.close();
  }
}
