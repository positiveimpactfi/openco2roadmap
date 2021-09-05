import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipality } from "./Municipality";
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
  @ManyToOne(() => SiteType, (siteType) => siteType.sites)
  siteType: SiteType;

  @Field(() => Municipality, { nullable: true })
  @ManyToOne(() => Municipality, { eager: true })
  municipality?: Municipality;

  @Field(() => [SiteUnit], { nullable: true })
  @OneToMany(() => SiteUnit, (siteUnit) => siteUnit.site, {
    nullable: true,
    eager: true,
  })
  siteUnits: SiteUnit[];
}
