import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { KPIValue } from "./KPIValue";
import { Organization } from "./Organization";

@ObjectType()
@Entity()
export class KPI extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.kpis)
  organization: Promise<Organization>;

  @Field(() => [KPIValue])
  @OneToMany(() => KPIValue, (value) => value.parentKPI)
  values: Promise<KPIValue[]>;
}