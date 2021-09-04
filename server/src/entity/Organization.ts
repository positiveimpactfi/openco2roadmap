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

  @Field(() => BusinessField, { nullable: true })
  @ManyToOne(
    () => BusinessField,
    (businessField) => businessField.organizations,
    { eager: true }
  )
  @JoinTable()
  businessField: BusinessField;

  @Field(() => [SiteType], { nullable: true })
  @OneToMany(() => SiteType, (siteType) => siteType.organization, {
    nullable: true,
  })
  siteTypes?: SiteType[];

  @Field(() => [KPI], { nullable: true })
  @OneToMany(() => KPI, (kpi) => kpi.organization)
  kpis?: Promise<KPI[]>;
}
