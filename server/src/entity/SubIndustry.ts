import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Industry } from "./Industry";

@ObjectType()
@Entity()
export class SubIndustry extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
  nameFi: string;

  @Field()
  @Column()
  nameEn: string;

  @ManyToOne(() => Industry, (i) => i.subIndustries)
  industry: Industry;
}
