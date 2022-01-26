import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Industry } from "./Industry";

@ObjectType()
@Entity()
export class SubIndustry extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
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

  @Field(() => Industry)
  @ManyToOne(() => Industry, (i) => i.subIndustries)
  industry: Industry;
}
