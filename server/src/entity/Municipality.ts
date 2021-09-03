import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType({ simpleResolvers: true })
@Entity()
export class Municipality extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  stateCode: number;

  @Field()
  @Column()
  state: string;
}
