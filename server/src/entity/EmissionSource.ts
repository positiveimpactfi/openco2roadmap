import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { GHGScope } from "../types";
import { Component } from "./Component";
import { EmissionFactor } from "./EmissionFactor";

@ObjectType()
@Entity()
export class EmissionSource extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
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

  @Field(() => [Component])
  @ManyToMany(() => Component, (component) => component.emissionSources)
  components: Promise<Component[]>;

  @Field(() => GHGScope, { defaultValue: GHGScope.Scope3 })
  @Column({ type: "enum", enum: GHGScope, default: GHGScope.Scope3 })
  scope: GHGScope;
}
