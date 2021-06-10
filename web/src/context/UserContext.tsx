import { User } from "generated/graphql";
import { createContext } from "react";

interface ContextProps {
  user?: User;
}

export const UserContext = createContext<ContextProps>({});
