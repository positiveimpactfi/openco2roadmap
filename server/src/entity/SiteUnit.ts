import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Site } from "./Site";

@ObjectType()
@Entity()
export class SiteUnit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => Site)
  @ManyToOne(() => Site, (site) => site.siteUnits)
  site: Site;
}
