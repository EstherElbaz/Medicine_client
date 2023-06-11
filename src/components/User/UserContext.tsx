import {createContext,useContext} from "react";
import { User } from "../../models";

export const UserContext = createContext<{ user?: User, setUser?: (userT: User) => void }>({ user: undefined, setUser: undefined });

export const useUserContext = () => useContext(UserContext);