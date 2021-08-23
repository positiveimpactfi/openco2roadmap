import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class DataEntry extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  startDate: string;

  @Field()
  @Column()
  endDate: string;

  @Field()
  @Column()
  consumptionValue: number;

  @Field()
  @Column()
  comments: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.dataEntries)
  createdBy: User;
}
