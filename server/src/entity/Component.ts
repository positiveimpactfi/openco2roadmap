import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { EmissionSource } from "./EmissionSource";

@ObjectType()
@Entity()
export class Component extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.components)
  category: Category;

  @Field(() => [EmissionSource], { nullable: true })
  @OneToMany(
    () => EmissionSource,
    (emissionSource) => emissionSource.component,
    { nullable: true }
  )
  emissionSources: Promise<EmissionSource[]>;
}
