// Custom hook that takes credentials from localStorage if there are any
// Tries to login user, if if fails, removes credentials
// If there are no credentials, login is not attempted

import { LoginCredentials, User } from "@/libs/interfaces";
import { UserContext, UserContextType } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { apiURI } from "@/libs/constants";

const useLocalStorageAuthentication = (redirectToLogin:boolean):User|null => {
    const router = useRouter();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<LoginCredentials|null>(null);
    const {user, setLoggedInUser, setCredentialsToLocalStorage} = useContext(UserContext) as UserContextType;

    useEffect(() => {
        if (!user && typeof window !== "undefined") {
            const credentialsFromLocalStorage = localStorage.getItem("loginCredentials");
            if(credentialsFromLocalStorage) {
                setCredentials(JSON.parse(credentialsFromLocalStorage) as LoginCredentials);
            } else {
                console.log("No credentials found in localStorage")
                if(redirectToLogin) router.replace('/login');
            }
        }
    }, [router, redirectToLogin, user])

    // Tries to get user with login credentials
    const fetchUser = useCallback(async (loginCredentials:LoginCredentials) => {
        if(!credentials) return;
        
        const response = await fetch(`${apiURI}/users/${credentials.username}/${credentials.password}`)
        const data = await response.json();
        if(data.errorMessage) {
            console.error("Credentials from local storage are not valid - user not found - deleting localStorage credentials...");
            localStorage?.removeItem("loginCredentials");
        } else {
            return data as User
        }
    },[credentials]);

    // Tries to fetch and login user
    // Executed when credentials are obtained from localStorage and user is not logged in
    useEffect(() => {
        if(!user && credentials && !isUserAuthenticated) {
            fetchUser(credentials)
            .then(foundUser => {
                if(foundUser) {
                    setLoggedInUser(foundUser);
                    setIsUserAuthenticated(true);
                    setCredentials(credentials);
                }
            })
        }
    }, [user, credentials, fetchUser, setLoggedInUser, isUserAuthenticated])

    return user;
}

export default useLocalStorageAuthentication;