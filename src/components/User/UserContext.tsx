import React from "react";
import { User } from "../../models";

const UserContext = React.createContext<{ user?: User, setUser?: (userT: User) => void }>({ user: undefined, setUser: undefined });

export default UserContext;