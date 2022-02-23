import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { KPI } from "./KPI";

@ObjectType()
@Entity()
export class KPIValue extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Int)
  @Column()
  year: number;

  @Field()
  @Column({ type: "double precision" })
  value: number;

  @Field(() => KPI)
  @ManyToOne(() => KPI, (kpi) => kpi.values)
  parent: KPI;
}
