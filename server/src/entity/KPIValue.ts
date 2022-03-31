import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { KPI } from "./KPI";
import { Organization } from "./Organization";

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

  @Field(() => Organization, { nullable: true })
  @ManyToOne(() => Organization, {
    nullable: true,
  })
  organization: Organization;

  @Field(() => KPI)
  @ManyToOne(() => KPI, (kpi) => kpi.values)
  parent: KPI;
}
