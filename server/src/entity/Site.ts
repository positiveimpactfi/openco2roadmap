import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SiteType } from "./SiteType";
import { SiteUnit } from "./SiteUnit";

@ObjectType()
@Entity()
export class Site extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => SiteType)
  @OneToMany(() => SiteType, (siteType) => siteType.sites)
  siteType: SiteType;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  region: string;

  @Field(() => [SiteUnit])
  @OneToMany(() => SiteUnit, (siteUnit) => siteUnit.site)
  siteUnits: SiteUnit[];
}
