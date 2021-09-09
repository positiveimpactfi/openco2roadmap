import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GHGScope } from "../types/GHGScope";
import { Component } from "./Component";
import { EmissionFactor } from "./EmissionFactor";

@ObjectType()
@Entity()
export class EmissionSource extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [EmissionFactor], { defaultValue: [] })
  @JoinTable()
  @ManyToMany(
    () => EmissionFactor,
    (emissionFactor) => emissionFactor.emissionSources
  )
  emissionFactors: Promise<EmissionFactor[]>;

  @Field(() => Component)
  @ManyToMany(() => Component, (component) => component.emissionSources)
  components: Promise<Component>;

  @Field(() => GHGScope, { defaultValue: GHGScope.Scope3 })
  @Column({ default: GHGScope.Scope3 })
  scope: GHGScope;
}
