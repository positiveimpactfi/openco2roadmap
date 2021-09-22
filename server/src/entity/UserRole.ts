import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Role } from "../types";

@ObjectType()
@Entity()
export class UserRole extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "enum", enum: Role, default: Role.COMPANY_USER })
  name: string;

  @Field()
  @Column()
  organizationID: string;
}
