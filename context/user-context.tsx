"use client";

import { LoginCredentials, User } from "@/libs/interfaces";
import { createContext, useCallback, useState } from "react";

export type UserContextType = {
    user: User | null;
    setCredentialsToLocalStorage: (credentials: LoginCredentials) => void;
    setLoggedInUser: (loggedInUser:User) => void;
    logoutUser: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
  
    const setCredentialsToLocalStorage = useCallback(
      (credentials: LoginCredentials) => {
        localStorage.setItem("loginCredentials", JSON.stringify(credentials));
        setUser(user);
      },
      [user]
    );

    const setLoggedInUser = useCallback((loggedInUser:User) => {
        setUser(loggedInUser);
    }, []);
  
    const logoutUser = useCallback (() => {
      localStorage.removeItem("loginCredentials");
      window.location.reload();
    }, []);
  
    return (
      <UserContext.Provider value={{ user, setCredentialsToLocalStorage, setLoggedInUser, logoutUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;