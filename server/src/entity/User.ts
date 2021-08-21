import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Organization } from "./Organization";
import { UserRole } from "./UserRole";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => [UserRole])
  @ManyToMany(() => UserRole, { eager: true })
  @JoinTable()
  roles!: UserRole[];

  @ManyToMany(() => Organization, (organization) => organization.users)
  organizations!: Organization[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;
}
