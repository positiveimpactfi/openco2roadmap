import { Field, ObjectType } from "type-graphql";
import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export class MyBaseEntity extends BaseEntity {
  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;
}
