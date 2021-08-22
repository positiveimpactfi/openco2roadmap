import argon2 from "argon2";
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
import { IContext } from "../types";
import { EmailProps, sendEmail } from "../utils/sendEmail";

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
  users(): Promise<User[]> {
    return User.find({});
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: IContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId, { relations: ["roles"] });
  }

  @Mutation(() => Boolean)
  async inviteUser(
    @Ctx() { redis }: IContext,
    @Arg("email") email: string,
    @Arg("organizationID") organizationID: string,
    @Arg("role") role: string
  ) {
    const token = v4();
    redis.set("INVITE_" + token, organizationID + "_" + role);
    const emailText = `<p>You have been invited to join OpenCO2Roadmap. Follow <span><a href=${config.CORS_ORIGIN}/register/${token} >this<a/></span> link to join! </p>`;
    const emailObject: EmailProps = {
      htmlBody: emailText,
      subject: "OpenCO2Roadmap invite",
      textBody: emailText,
    };
    await sendEmail(email, emailObject);
    return true;
  }

  @Mutation(() => UserResolverResponse)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<UserResolverResponse> {
    try {
      const hashedPassword = await argon2.hash(password);
      const role = await UserRole.create({}).save();
      const user = await User.create({
        email: email,
        password: hashedPassword,
        roles: [role],
      }).save();
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
    @Ctx() { req }: IContext
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
  logout(@Ctx() { req, res }: IContext) {
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
