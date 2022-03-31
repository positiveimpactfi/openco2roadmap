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
import { MeasurementUnit } from "./MeasurementUnit";
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

  @Field(() => Organization, { nullable: true })
  @ManyToOne(() => Organization, (organization) => organization.kpis, {
    nullable: true,
  })
  organization: Organization;

  @Field(() => [KPIValue], { defaultValue: [] })
  @OneToMany(() => KPIValue, (value) => value.parent)
  values: KPIValue[];

  @Field(() => MeasurementUnit, { nullable: true })
  @ManyToOne(() => MeasurementUnit, { nullable: true })
  unit: MeasurementUnit;
}
