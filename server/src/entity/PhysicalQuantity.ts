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
import { EmissionFactor } from "./EmissionFactor";
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
  @OneToOne(() => MeasurementUnit, { eager: true })
  @JoinColumn()
  baseUnit: MeasurementUnit;

  @Field(() => [MeasurementUnit])
  @OneToMany(() => MeasurementUnit, (unit) => unit.physicalQuantity)
  units: Promise<MeasurementUnit[]>;

  @Field(() => [EmissionFactor], { defaultValue: [] })
  @OneToMany(
    () => EmissionFactor,
    (emissionFactor) => emissionFactor.physicalQuantity
  )
  emissionFactors: Promise<EmissionFactor[]>;
}
