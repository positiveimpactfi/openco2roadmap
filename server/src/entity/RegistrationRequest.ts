import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipality } from "./Municipality";
import { SubIndustry } from "./SubIndustry";

@ObjectType()
@Entity()
export class RegistrationRequest extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  orgName: string;

  @Field()
  @Column()
  businessID: string;

  @Field(() => Municipality)
  @ManyToOne(() => Municipality)
  municipality: Municipality;

  @Field(() => SubIndustry)
  @ManyToOne(() => SubIndustry)
  industry: SubIndustry;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment: string;
}
