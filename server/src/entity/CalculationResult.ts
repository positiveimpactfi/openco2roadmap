import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  CategoryType,
  EmissionSourceType,
  MeasurementUnitType,
} from "../types";
import { DataEntry } from "./DataEntry";

@ObjectType()
@Entity()
export class CalculationResult extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @CreateDateColumn()
  dateCreated: Date;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @Field()
  @Column({ type: "double precision" })
  consumptionValue: number;

  @Field()
  @Column({ type: "double precision" })
  emissionFactorValue: number;

  @Field(() => MeasurementUnitType)
  @Column({
    type: "enum",
    enum: MeasurementUnitType,
  })
  measurementUnit: MeasurementUnitType;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "double precision" })
  emissionsCalculated: number;

  @Field()
  @Column()
  siteUnitID: string;

  @Field()
  @Column()
  siteID: string;

  @Field()
  @Column()
  creatorID: string;

  @Field()
  @Column()
  organizationID: string;

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

  @Field()
  @Column()
  isLatest: boolean;

  @Field(() => DataEntry)
  @ManyToOne(() => DataEntry, (dataEntry) => dataEntry.calculationResults)
  dataEntry: DataEntry;
}
