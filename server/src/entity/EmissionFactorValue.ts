import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmissionFactor } from "./EmissionFactor";

@ObjectType()
@Entity()
export class EmissionFactorValue extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ type: "double precision" })
  value: number;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @Field(() => EmissionFactor)
  @ManyToOne(() => EmissionFactor, (emissionFactor) => emissionFactor.values)
  emissionFactor: Promise<EmissionFactor>;
}
