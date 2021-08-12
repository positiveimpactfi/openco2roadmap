import { Authorized, Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Organization } from "./Organization";

@ObjectType()
@Entity()
export class BusinessField extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Authorized(["superadmin", "admin"])
  @Field(() => [Organization])
  @OneToMany(() => Organization, (organization) => organization.businessField)
  organizations: Organization[];
}
