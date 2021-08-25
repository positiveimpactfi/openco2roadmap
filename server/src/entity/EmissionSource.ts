import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Component } from "./Component";
import { EmissionFactor } from "./EmissionFactor";

@ObjectType()
@Entity()
export class EmissionSource extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [EmissionFactor])
  @JoinTable()
  @ManyToMany(
    () => EmissionFactor,
    (emissionFactor) => emissionFactor.emissionSources
  )
  emissionFactors: Promise<EmissionFactor[]>;

  @Field(() => Component)
  @ManyToOne(() => Component, (component) => component.emissionSources)
  component: Promise<Component>;
}
