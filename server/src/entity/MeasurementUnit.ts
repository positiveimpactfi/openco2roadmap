import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PhysicalQuantity } from "./PhysicalQuantity";

@ObjectType()
@Entity()
export class MeasurementUnit extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  shorthand: string;

  @Field(() => PhysicalQuantity)
  @ManyToOne(
    () => PhysicalQuantity,
    (physicalQuantity) => physicalQuantity.units
  )
  physicalQuantity: PhysicalQuantity;

  // conversion factor to the base SI unit
  @Field(() => Float)
  @Column()
  conversionFactor: number;
}
