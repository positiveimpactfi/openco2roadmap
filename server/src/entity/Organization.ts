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

  @Field(() => BusinessField)
  @ManyToOne(
    () => BusinessField,
    (businessField) => businessField.organizations
  )
  @JoinTable()
  businessField: BusinessField;

  @Field(() => [SiteType])
  @OneToMany(() => SiteType, (siteType) => siteType.organization, {
    nullable: true,
  })
  siteTypes: SiteType[];

  @Field(() => [KPI])
  @OneToMany(() => KPI, (kpi) => kpi.organization)
  kpis: Promise<KPI[]>;
}
