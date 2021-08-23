import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
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
  value: number;

  @Field(() => DataEntry)
  @ManyToOne(() => DataEntry, (dataEntry) => dataEntry.calculationResults)
  dataEntry: DataEntry;
}
