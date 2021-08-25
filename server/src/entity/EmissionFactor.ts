import { DataSourceType } from "../enums/DataSourceType";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmissionFactorValue } from "./EmissionFactorValue";
import { EmissionSource } from "./EmissionSource";

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

  @Field()
  @Column()
  geographicalArea: string;

  @Field(() => [EmissionSource])
  @ManyToMany(
    () => EmissionSource,
    (emissionSource) => emissionSource.emissionFactors
  )
  emissionSources: Promise<EmissionSource[]>;

  @Field(() => [EmissionFactorValue], { nullable: true })
  @OneToMany(() => EmissionFactorValue, (value) => value.emissionFactor, {
    nullable: true,
  })
  values: Promise<EmissionFactorValue[]>;

  @Field(() => DataSourceType)
  @Column({ default: DataSourceType.Secondary })
  dataSourceType: DataSourceType;
}
