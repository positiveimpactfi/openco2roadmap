import {
  Arg,
  Authorized,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Municipality } from "../entity";
import { RegistrationRequest } from "../entity/RegistrationRequest";
import { SubIndustry } from "../entity/SubIndustry";

@InputType()
class RegistrationRequestInput implements Partial<RegistrationRequest> {
  @Field()
  lastName: string;

  @Field()
  firstName: string;

  @Field()
  email: string;

  @Field()
  orgName: string;

  @Field()
  businessID: string;

  @Field()
  industryCode: string;

  @Field(() => Int, { nullable: true })
  municipalityID: number;

  @Field({ nullable: true })
  comment: string;
}

@Resolver(RegistrationRequest)
export class RegistrationRequestResolver {
  @Authorized([])
  @Query(() => [RegistrationRequest])
  allRegistrationRequests() {
    return RegistrationRequest.find({
      relations: ["municipality", "industry"],
    });
  }

  @Mutation(() => RegistrationRequest)
  async createRegistrationRequest(
    @Arg("data")
    {
      lastName,
      firstName,
      email,
      orgName,
      businessID,
      industryCode,
      municipalityID,
      comment,
    }: RegistrationRequestInput
  ): Promise<RegistrationRequest | undefined> {
    const industry = await SubIndustry.findOne({ code: industryCode });
    if (!industry) return undefined;

    const municipality = await Municipality.findOne(municipalityID);
    if (!municipality) return undefined;

    const newRequest = await RegistrationRequest.create({
      lastName,
      firstName,
      email,
      orgName,
      businessID,
      industry,
      municipality,
      comment,
    }).save();
    console.log("new request created", newRequest);

    return newRequest;
  }
}
