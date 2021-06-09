import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Organization } from "./Organization";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles!: Role[];

  @ManyToMany(() => Organization, (organization) => organization.users)
  @JoinTable()
  organizations!: Organization[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;
}

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ default: "system_user" }) name: string;
}
