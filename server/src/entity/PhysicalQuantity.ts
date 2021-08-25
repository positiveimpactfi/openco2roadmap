import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MeasurementUnit } from "./MeasurementUnit";

@ObjectType()
@Entity()
export class PhysicalQuantity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => MeasurementUnit)
  @OneToOne(() => MeasurementUnit)
  @JoinColumn()
  baseUnit: MeasurementUnit;

  @Field(() => [MeasurementUnit])
  @OneToMany(() => MeasurementUnit, (unit) => unit.physicalQuantity)
  units: Promise<MeasurementUnit[]>;
}