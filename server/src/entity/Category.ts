import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Component } from "./Component";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Component])
  @OneToMany(() => Component, (component) => component.category)
  components: Component[];
}
