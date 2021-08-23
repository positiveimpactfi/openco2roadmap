import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Organization } from "./Organization";
import { Site } from "./Site";

@ObjectType()
@Entity()
export class SiteType extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.siteTypes)
  organization: Organization;

  @Field(() => [Site])
  @OneToMany(() => Site, (site) => site.siteType)
  sites: Site[];
}
