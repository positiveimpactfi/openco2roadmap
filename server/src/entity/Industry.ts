import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SubIndustry } from "./SubIndustry";

@ObjectType()
@Entity()
export class Industry extends BaseEntity {
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

  @Field(() => [SubIndustry])
  @OneToMany(() => SubIndustry, (s) => s.industry)
  subIndustries: SubIndustry[];
}
