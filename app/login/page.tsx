"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import useLocalStorageAuthentication from '@/context/useLocalStorageAuthentication';
import { UserContext, UserContextType } from '@/context/user-context';
import {
  Container,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
} from "@mui/material";
import { apiURI } from "@/libs/constants";
import { LoginCredentials, User } from "@/libs/interfaces";
import { AltRoute } from "@mui/icons-material";

interface UserData {
  name: string;
  username: string;
  password: string;
  isCompany: boolean;
}

const initialUserData: UserData = {
  name: "",
  username: "",
  password: "",
  isCompany: false,
};

function Login() {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isCompany, setIsCompany] = useState<boolean>(false);
  const [signUpMode, setSignUpMode] = useState<boolean>(false);
  const fetchedUser = useLocalStorageAuthentication(false);
  const {user, setLoggedInUser, setCredentialsToLocalStorage} = useContext(UserContext) as UserContextType;
  const router = useRouter();

  useEffect(() => {
    if(!user && fetchedUser) {
      setLoggedInUser(fetchedUser);
      router.push('/')
    } else if(user) {
      router.push('/');
    }
  },[fetchedUser, router, user, setLoggedInUser])

  const loginUser = () => {
    if(userData.username === "" || userData.password === "") {
      alert("Enter username and password");
      return;
    }

    fetch(`${apiURI}/users/${userData.username}/${userData.password}`)
    .then(res => res.json())
    .then(data => {
      if(data.errorMessage) {
        alert("Wrong Credentials");
      } else {
        setLoggedInUser(data);
        setCredentialsToLocalStorage({username:data.username, password:data.password} satisfies LoginCredentials);
        router.push('/');
      }
    })
  }

  const signUpUser = () => {
    if(userData.username === "" || userData.password === "" || userData.name === "") {
      alert("Provide information");
      return;
    }

    const createdUser = {
      fullName:userData.name,
      username:userData.username,
      password:userData.password,
      isCompany:userData.isCompany,
      description:"",
      rating:[],
      postedJobs:[],
      jobsApplied:[]
    } satisfies User;

    fetch(`${apiURI}/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createdUser),
      })
      .then(res => res.json())
      .then(data => {
      if(data.errorMessage) {
        alert(data.errorMessage)
      } else {
        console.log(data);
        setLoggedInUser(data);
        setCredentialsToLocalStorage({username:data.username, password:data.password} satisfies LoginCredentials);
        router.push('/');
      }
      })
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSwitchChange = () => {
    setIsCompany(!isCompany);
  };

  const handleModeSwitch = () => {
    setSignUpMode(!signUpMode);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(!signUpMode) {
      loginUser();
    } else
    {
      console.log("Contact POST to try to register user API");
      signUpUser()
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card elevation={3}>
        <CardContent>
          <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
              {signUpMode ? "Sign Up" : "Sign In"}
            </Typography>
            <form onSubmit={handleSubmit}>
              {signUpMode && (
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  margin="normal"
                />
              )}
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleInputChange}
                margin="normal"
              />
              {
                signUpMode ?
                <FormControlLabel
                  control={
                    <Switch checked={isCompany} onChange={handleSwitchChange} />
                  }
                  label={isCompany ? "Company" : "User"}
                />: null
              }
              
              <Button type="submit" variant="contained" color="primary">
                {signUpMode ? "Sign Up" : "Sign In"}
              </Button>
              <p
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  marginTop: "1rem",
                }}
                onClick={handleModeSwitch}
              >
                {signUpMode
                  ? "Have an account? Sign In"
                  : "No account? Sign Up!"}
              </p>
            </form>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
