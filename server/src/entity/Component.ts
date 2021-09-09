import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Category } from "./Category";
import { EmissionSource } from "./EmissionSource";

@ObjectType()
@Entity()
export class Component extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.components)
  category: Category;

  @Field(() => [EmissionSource], { nullable: true })
  @JoinTable()
  @ManyToMany(
    () => EmissionSource,
    (emissionSource) => emissionSource.components,
    { nullable: true, eager: true }
  )
  emissionSources: EmissionSource[];
}
