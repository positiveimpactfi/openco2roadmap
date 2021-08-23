import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { DataEntry } from "./DataEntry";
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field(() => [UserRole])
  @ManyToMany(() => UserRole, { eager: true })
  @JoinTable()
  roles!: UserRole[];

  @Field(() => [Organization], { nullable: true })
  @ManyToMany(() => Organization, (organization) => organization.users, {
    eager: true,
  })
  organizations!: Organization[];

  @Field(() => [DataEntry])
  @OneToMany(() => DataEntry, (dataEntry) => dataEntry.createdBy)
  dataEntries: DataEntry[];
}
