import { createContext } from "react";

interface ContextProps {
  user?: User;
}

interface User {
  id: number;
  email: string;
  roles?: Role[];
}

interface Role {
  name: string;
}

export const UserContext = createContext<ContextProps>({});
