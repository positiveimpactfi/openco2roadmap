import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DataSourceType } from "../types";
import { EmissionFactorValue } from "./EmissionFactorValue";
import { EmissionSource } from "./EmissionSource";
import { Organization } from "./Organization";
import { PhysicalQuantity } from "./PhysicalQuantity";

@ObjectType()
@Entity()
export class EmissionFactor extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  source?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  geographicalArea: string;

  @Field(() => [EmissionSource])
  @ManyToMany(
    () => EmissionSource,
    (emissionSource) => emissionSource.emissionFactors
  )
  emissionSources: Promise<EmissionSource[]>;

  @Field(() => Organization, { nullable: true })
  @ManyToOne(() => Organization)
  creator: Organization;

  @Field(() => [EmissionFactorValue], { defaultValue: [] })
  @OneToMany(() => EmissionFactorValue, (value) => value.emissionFactor, {
    nullable: true,
  })
  values: EmissionFactorValue[];

  @Field(() => DataSourceType)
  @Column({
    type: "enum",
    enum: DataSourceType,
    default: DataSourceType.Secondary,
  })
  dataSourceType: DataSourceType;

  @Field(() => PhysicalQuantity)
  @ManyToOne(
    () => PhysicalQuantity,
    (physicalQuantity) => physicalQuantity.emissionFactors
  )
  physicalQuantity: PhysicalQuantity;
}
