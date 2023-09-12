"use client";
import React, { useState } from "react";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
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
    const data = {...userData, isCompany}

    if(!signUpMode) {
      console.log("Contact GET to try to get user");
      console.log(data);
    } else
    {
      console.log("Contact POST to try to register user API");
      console.log(data);
    }
    
    // Reset the form
    setUserData(initialUserData);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
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
              <FormControlLabel
                control={
                  <Switch checked={isCompany} onChange={handleSwitchChange} />
                }
                label={isCompany ? "Company" : "User"}
              />
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
