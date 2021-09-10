import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmissionFactor } from "./EmissionFactor";

@ObjectType()
@Entity()
export class EmissionFactorValue extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ type: "double precision" })
  value: number;

  @Field(() => Int)
  @Column()
  startDate: number;

  @Field(() => Int)
  @Column()
  endDate: number;

  @Field(() => EmissionFactor)
  @ManyToOne(() => EmissionFactor, (emissionFactor) => emissionFactor.values)
  emissionFactor: EmissionFactor;
}
