import { AuthChecker } from "type-graphql";
import { User } from "./entity/User";
import { IContext } from "./types";

export const authChecker: AuthChecker<IContext> = async (
  { context: { req } },
  roles
) => {
  const userId = req.session.userId;
  if (!userId) {
    return false;
  }
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return false;
  }

  if (user.roles.some((role) => roles.includes(role.name))) {
    // grant access if the roles overlap
    return true;
  }

  return false;
};
