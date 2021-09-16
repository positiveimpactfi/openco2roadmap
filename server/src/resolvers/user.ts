import argon2 from "argon2";
import { Organization } from "../entity/Organization";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { v4 } from "uuid";
import config from "../config";
import { User } from "../entity/User";
import { UserRole } from "../entity/UserRole";
import { MyContext } from "../types/MyContext";
import { EmailProps, sendEmail } from "../utils/sendEmail";
import { Role } from "../types/Role";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResolverResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Authorized(["SUPERADMIN", "ADMIN"])
  @Query(() => [User])
  allUsers(): Promise<User[]> {
    return User.find({});
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId, { relations: ["roles"] });
  }

  @Mutation(() => Boolean)
  async inviteUser(
    @Ctx() { redis }: MyContext,
    @Arg("email") email: string,
    @Arg("organizationID") organizationID: string,
    @Arg("role") role: string
  ) {
    const token = v4();
    await redis.set("INVITE_" + token, organizationID + "_" + role);
    const emailText = `<p>You have been invited to join OpenCO2Roadmap. Follow <span><a href=${config.CORS_ORIGIN}/register/${token} >this<a/></span> link to join! </p>`;
    const emailObject: EmailProps = {
      htmlBody: emailText,
      subject: "OpenCO2Roadmap invite",
      textBody: emailText,
    };
    await sendEmail(email, emailObject);
    return true;
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => UserResolverResponse)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("organizationID") organizationID: string,
    @Arg("role") role: Role
  ): Promise<UserResolverResponse> {
    const possibleUser = await User.findOne({ where: { email } });
    if (possibleUser) {
      return {
        errors: [
          {
            field: "email",
            message: "user already exists",
          },
        ],
      };
    }
    const org = await Organization.findOne(organizationID);
    if (!org) {
      return {
        errors: [
          {
            field: "organization",
            message: "organization does not exist",
          },
        ],
      };
    }
    const userRole = await UserRole.create({
      organizationID,
      name: role,
    }).save();
    const hashedPassword = await argon2.hash(password);
    const user = await User.create({
      email,
      password: hashedPassword,
      organizations: [org],
      roles: [userRole],
    }).save();

    return { user };
  }

  @Mutation(() => UserResolverResponse)
  async register(
    @Ctx() { redis }: MyContext,
    @Arg("token") token: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<UserResolverResponse> {
    try {
      const orgAndRole = await redis.get("INVITE_" + token);
      if (!orgAndRole) {
        return {
          errors: [
            {
              field: "token",
              message: "invalid token",
            },
          ],
        };
      }
      const orgId = orgAndRole.split("_")[0];
      const roleString = orgAndRole.split("_")[1];
      const hashedPassword = await argon2.hash(password);
      const role = await UserRole.create({
        organizationID: orgId,
        name: roleString,
      }).save();
      const organization = await Organization.findOne(orgId, {
        relations: ["users"],
      });
      if (!organization) {
        return {
          errors: [
            {
              field: "organization",
              message: "invalid organization",
            },
          ],
        };
      }
      const user = await User.create({
        email: email,
        password: hashedPassword,
        roles: [role],
      }).save();
      organization.users.push(user);
      await Organization.save(organization);
      await redis.del("INVITE_" + token);
      return { user };
    } catch (err) {
      console.log("error: ", err);
      return {
        errors: [
          {
            field: "username",
            message: "username taken",
          },
        ],
      };
    }
  }

  @Mutation(() => UserResolverResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResolverResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "user does not exist",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(process.env.COOKIE_NAME as string);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
