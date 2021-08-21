import { Authorized, Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BusinessField } from "./BusinessField";
import { User } from "./User";

@ObjectType()
@Entity()
export class Organization extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Authorized("ADMIN")
  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.organizations)
  @JoinTable()
  users: User[];

  @Field()
  @Column({ nullable: false })
  businessID!: string;

  @Field(() => BusinessField)
  @ManyToOne(
    () => BusinessField,
    (businessField) => businessField.organizations
  )
  @JoinTable()
  businessField: BusinessField;
}
