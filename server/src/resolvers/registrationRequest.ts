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
  allRegistrationRequests(
    @Arg("processed", { nullable: true }) processed: boolean
  ) {
    if (processed === true || processed === false) {
      return RegistrationRequest.find({
        relations: ["municipality", "industry"],
        where: { processed },
      });
    }
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

  @Authorized()
  @Mutation(() => RegistrationRequest)
  async markRequestProcessed(
    @Arg("id") id: string
  ): Promise<RegistrationRequest | undefined> {
    const regRequest = await RegistrationRequest.findOne(id);
    if (!regRequest) {
      console.log("no request found for given id", id);
      return undefined;
    }
    regRequest.processed = true;
    const updatedRequst = await regRequest.save();
    return updatedRequst;
  }
}
