import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmissionSource } from "./EmissionSource";

@ObjectType()
@Entity()
export class EmissionFactor extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  source?: string;

  @Field()
  @Column()
  geographicalArea: string;

  @Field(() => [EmissionSource])
  @ManyToMany(
    () => EmissionSource,
    (emissionSource) => emissionSource.emissionFactors
  )
  emissionSources: Promise<EmissionSource[]>;
}
