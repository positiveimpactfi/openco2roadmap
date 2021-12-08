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
import { Organization, User, UserRole } from "../entity";
import { Role } from "../types";
import { MyContext } from "../types/MyContext";
import { EmailProps, sendEmail } from "../utils/sendEmail";
import { userInvitationEmail } from "../utils/templates/email/userInvitation";

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

@ObjectType()
class InvitedUser {
  @Field(() => String)
  id!: string;

  @Field()
  email!: string;

  @Field(() => Role)
  role!: Role;

  @Field(() => Organization)
  organization!: Organization;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId, { relations: ["roles"] });
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN])
  @Query(() => [User])
  allUsers(): Promise<User[]> {
    return User.find({});
  }

  @Authorized([Role.SUPERADMIN, Role.COMPANY_ADMIN])
  @Query(() => [InvitedUser])
  async allInvitedUsers(
    @Ctx() { redis, req }: MyContext
  ): Promise<InvitedUser[] | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      return undefined;
    }
    // SuperAdmin can see all invites, CompanyAdmin can only see their organization's invites
    const matchPattern =
      user.roles[0].name === Role.SUPERADMIN
        ? "INVITE;*"
        : `INVITE;${user.organizations[0].id};*`;
    // calling redis keys can become slow when there are many invites
    // TO-DO: refactor using scanStream
    const resultKeys = await redis.keys(matchPattern);
    let users: InvitedUser[] = [];
    const myPromise = Promise.all(
      resultKeys.map(async (key, i) => {
        const inviteToken = await redis.get(key);
        if (inviteToken) {
          const orgId = inviteToken.split(";")[0];
          const org = await Organization.findOne(orgId);
          if (org) {
            const userEmail = inviteToken.split(";")[1];
            const roleString = inviteToken.split(";").slice(2).join("_");
            const roleEnum = Role[roleString as keyof typeof Role];
            const newUser: InvitedUser = {
              id: resultKeys[i],
              email: userEmail,
              organization: org,
              role: roleEnum,
            };
            users.push(newUser);
          }
        }
      })
    );
    await myPromise;
    return users;
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => Boolean)
  async inviteUser(
    @Ctx() { redis, req }: MyContext,
    @Arg("email") email: string,
    @Arg("organizationID") organizationID: string,
    @Arg("role", () => Role) role: Role
  ) {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }
    const token = v4();
    await redis.set(
      "INVITE;" + organizationID + ";" + token,
      organizationID + ";" + email + ";" + role,
      "ex",
      60 * 60 * 24 * 30
    ); // 30 days

    // const emailContent = userInvitationEmail(
    //   user,
    //   organizationID + ";" + token
    // );

    // const emailObject: EmailProps = {
    //   htmlBody: emailContent,
    //   subject: "Tervetuloa matkailualan hiilijalanjälkilaskurin käyttäjäksi!",
    //   textBody: emailContent,
    // };

    // await sendEmail(email, emailObject);
    return true;
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => Boolean)
  async sendInvitationReminder(
    @Ctx() { redis, req }: MyContext,
    @Arg("token") token: string
  ) {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user");
      return undefined;
    }

    const inviteContent = await redis.get("INVITE;" + token);
    if (!inviteContent) return false;
    const parts = inviteContent.split(";");
    const email = parts[1];

    const emailContent = userInvitationEmail(user, token);

    const emailObject: EmailProps = {
      htmlBody: emailContent,
      subject:
        "Muistutus: Rekisteröidy matkailualan hiilijalanjälkilaskurin käyttäjäksi",
      textBody: emailContent,
    };

    await sendEmail(email, emailObject);
    return true;
  }

  @Authorized([Role.SUPERADMIN, Role.ADMIN, Role.COMPANY_ADMIN])
  @Mutation(() => Boolean)
  async cancelUserInvite(
    @Ctx() { redis }: MyContext,
    @Arg("token") token: string
  ) {
    const res = await redis.del("INVITE;" + token);
    if (res === 1) return true;
    return false;
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
      const orgAndRole = await redis.get("INVITE;" + token);
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
      const orgId = orgAndRole.split(";")[0];
      const roleString = orgAndRole.split(";").slice(2).join("_");
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
      await redis.del("INVITE;" + token);
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

  @Mutation(() => Boolean)
  async updateMyName(
    @Ctx() { req }: MyContext,
    @Arg("newFirstName", { nullable: true }) newFirstName: string,
    @Arg("newLastName", { nullable: true }) newLastName: string
  ): Promise<boolean | undefined> {
    const user = await User.findOne(req.session.userId, {
      relations: ["organizations"],
    });
    if (!user) {
      console.error("no user to edit");
      return false;
    }
    if (newFirstName) {
      user.firstName = newFirstName;
    }
    if (newLastName) {
      user.lastName = newLastName;
    }
    await user.save();
    return true;
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error(`invalid user requested password reset: ${email}`);
      return true;
    }

    const token = v4();

    await redis.set(
      "PASSWORD_RESET_REQUEST_" + token,
      user.id,
      "ex",
      60 * 60 * 2
    ); // 2 hours

    const emailText = `Hei, saimme pyynnön asettaa uusi salasana käyttäjätilillesi ${email}. Jos pyyntö oli tarpeeton tai et itse edes lähettänyt sitä, voit vain unohtaa tämän viestin. Mitään ei tule tapahtumaan.
    Jos haluat asettaa uuden salasanan, piipahda seuraavassa osoitteessa: ${config.CORS_ORIGIN}/change-password/${token}.
    Linkki on voimassa kolme päivää.
    Pääset kirjautumaan laskuriin osoitteessa https://app.co2roadmap.fi.
    Ystävällisin terveisin
    OpenCO2Roadmap tiimi
    `;
    const emailHtml = `
    <div>
      <div>Hei,</div>
      <br />
      <div>saimme pyynnön asettaa uusi salasana käyttäjätilillesi ${email}. Jos pyyntö oli tarpeeton tai et itse edes lähettänyt sitä, voit vain unohtaa tämän viestin. Mitään ei tule tapahtumaan.</div>
      <br />
      <div>Jos haluat asettaa uuden salasanan, piipahda seuraavassa osoitteessa:</div>
      <br />
      <div><span><a href="${config.CORS_ORIGIN}/change-password/${token}">Nollaa salasanasi</a></span></div>
      <br />
      <div>Linkki on voimassa kolme päivää.</div> 
      <br />
      <div>Pääset kirjautumaan laskuriin osoitteessa <span><a href="https://app.co2roadmap.fi">https://app.co2roadmap.fi/</a></span></div>
      <br />
      <div>Ystävallisin terveisin</div>
      <div>OpenCO2Roadmap tiimi</div>
    </div
    `;
    const emailObject: EmailProps = {
      htmlBody: emailHtml,
      subject: "OpenCO2roadmap salasanan vaihto",
      textBody: emailText,
    };
    await sendEmail(email, emailObject);

    return true;
  }

  @Mutation(() => UserResolverResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis }: MyContext
  ): Promise<UserResolverResponse> {
    if (newPassword.length <= 5) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "salasanan pitää olla vähintään 5 merkkiä pitkä",
          },
        ],
      };
    }

    const tokenInRedis = "PASSWORD_RESET_REQUEST_" + token;
    const userId = await redis.get(tokenInRedis);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "tietue epäkelpo",
          },
        ],
      };
    }

    const user = await User.findOne(userId);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "tietue epäkelpo",
          },
        ],
      };
    }

    await User.update(
      { id: userId },
      {
        password: await argon2.hash(newPassword),
      }
    );

    await redis.del(tokenInRedis);

    return { user };
  }
}
