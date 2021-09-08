import { createContext } from "react";
import { User } from "types";

interface ContextProps {
  user?: User;
}

export const UserContext = createContext<ContextProps>({});
