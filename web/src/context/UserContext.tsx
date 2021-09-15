import { createContext } from "react";
import { User } from "types/generatedTypes";

interface ContextProps {
  user?: User;
}

export const UserContext = createContext<ContextProps>({});
