import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  CategoryType,
  EmissionSourceType,
  MeasurementUnitType,
} from "../types";
import { CalculationResult } from "./CalculationResult";
import { EmissionFactorValue } from "./EmissionFactorValue";
import { SiteUnit } from "./SiteUnit";
import { User } from "./User";

@ObjectType()
@Entity()
export class DataEntry extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @Field()
  @Column({ type: "double precision" })
  consumptionValue: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comments: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.dataEntries)
  createdBy: User;

  @Field(() => [CalculationResult])
  @OneToMany(
    () => CalculationResult,
    (calculationResult) => calculationResult.dataEntry
  )
  calculationResults: CalculationResult[];

  @Field(() => SiteUnit)
  @ManyToOne(() => SiteUnit, (siteUnit) => siteUnit.dataEntries)
  siteUnit: SiteUnit;

  @Field(() => EmissionFactorValue)
  @ManyToOne(() => EmissionFactorValue)
  emissionFactorValue: EmissionFactorValue;

  @Field(() => MeasurementUnitType)
  @Column({
    type: "enum",
    enum: MeasurementUnitType,
  })
  measurementUnit: MeasurementUnitType;

  @Field(() => EmissionSourceType)
  @Column({
    type: "enum",
    enum: EmissionSourceType,
  })
  emissionSource: EmissionSourceType;

  @Field(() => CategoryType)
  @Column({
    type: "enum",
    enum: CategoryType,
  })
  category: CategoryType;
}
