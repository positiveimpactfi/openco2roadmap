import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BusinessField } from "./BusinessField";
import { KPI } from "./KPI";
import { Municipality } from "./Municipality";
import { SiteType } from "./SiteType";
import { SubIndustry } from "./SubIndustry";
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

  @ManyToMany(() => User, (user) => user.organizations)
  @JoinTable()
  users: User[];

  @Field()
  @Column({ nullable: false })
  businessID!: string;

  @Field(() => Municipality, { nullable: true })
  @ManyToOne(() => Municipality, { eager: true })
  municipality?: Municipality;

  @Field(() => BusinessField, {
    nullable: true,
  })
  @ManyToOne(() => BusinessField, { nullable: true })
  businessField: BusinessField;

  @Field(() => SubIndustry, { nullable: true })
  @ManyToOne(() => SubIndustry, { nullable: true, eager: true })
  industry: SubIndustry;

  @Field(() => [SiteType], { nullable: true })
  @OneToMany(() => SiteType, (siteType) => siteType.organization, {
    nullable: true,
  })
  siteTypes?: Promise<SiteType[]>;

  @Field(() => [KPI], { nullable: true })
  @OneToMany(() => KPI, (kpi) => kpi.organization)
  kpis?: Promise<KPI[]>;
}
