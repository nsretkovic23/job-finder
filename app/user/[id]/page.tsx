"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { AccountCircle, Business, Description, Star } from "@mui/icons-material";
import { User } from "@/libs/interfaces";
import Link from "next/link";
import { apiURI } from "@/libs/constants";
import { UserContext, UserContextType } from "@/context/user-context";

function UserInformation({params}:{params:{id:string}}) {
  const [fetchedUser, setFetchedUser] = useState<User>();
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const [newFullName, setNewFullName] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isEditActive, setEditActive] = useState<boolean>(false);
  const {user} = useContext(UserContext) as UserContextType;

  useEffect(() => {
    fetch(`${apiURI}/users/${params.id}`)
    .then(response => response.json())
    .then(data => {
        if(data.errorMessage) {
            setUserNotFound(true);
        } else {
          setFetchedUser(data);
        }
    })
  }, [params.id])

  useEffect(() =>{
    if(fetchedUser) {
      setNewUsername(fetchedUser.username);
      setNewFullName(fetchedUser.fullName);
      setNewBio(fetchedUser.description);
      setNewPassword(fetchedUser.password);
    }
  },[fetchedUser])

  function isInputValid() :boolean {
    if(newUsername === "" || newFullName === "" || newPassword === "") {
      return false;
    }
    return true;
  }

  if(userNotFound) {
    return (<h3 style={{ textAlign:"center", margin: "0 auto", marginTop: "2rem" }}>
        {`User/Company with id ${params.id} not found`}
        </h3>)
  }

  if(!fetchedUser) {
    return(<h3 style={{ textAlign:"center", margin: "0 auto", marginTop: "2rem" }}>
    {`Loading...`}
    </h3>)
  }

  function updateProfile() {
    if(!isInputValid()) {
      alert("Invalid input")
      return;
    } else {
      setEditActive(false);
    }
    if(!fetchedUser) return;

    const updatedUser = {
      fullName:newFullName,
      username:newUsername,
      password:newPassword,
      description:newBio,
      isCompany:fetchedUser.isCompany,
      rating:fetchedUser.rating,
      postedJobs:fetchedUser.postedJobs,
      jobsApplied:fetchedUser.jobsApplied
    } satisfies User;

    console.log(updatedUser);
    fetch(`${apiURI}/users/${fetchedUser._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
    })
    .then(res => res.json())
    .then(data => {
      if(data.errorMessage) {
        alert(data.errorMessage)
      } else {
        window.location.reload();
      }
    })
}

  return (
    <Card
      sx={{ maxWidth: 500, margin: "0 auto", marginTop: "2rem" }}
      elevation={3}
    >
      <CardContent>
        {fetchedUser.isCompany ? (
          <Typography variant="h5" component="div">
            <Business /> Company <br />
            <Divider flexItem sx={{marginTop: "3px", marginBottom:"3px"}}/>
            {fetchedUser.fullName} - @{fetchedUser.username}
          </Typography>
        ) : (
          <Typography variant="h5" component="div">
            <AccountCircle /> Developer <br />
            <Divider flexItem sx={{marginTop: "3px", marginBottom:"3px"}}/>
            {fetchedUser.fullName} - @{fetchedUser.username}
          </Typography>
        )}
        <Divider flexItem />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 2 }}
        >
          <Description/> Bio: {fetchedUser.description}
        </Typography>

        <Divider flexItem sx={{marginTop: 2}}/>

        {fetchedUser.isCompany ? (
          <div>
            <Typography
              variant="h6"
              component="div"
              sx={{marginTop: "1rem"}}
            >
              Posted Jobs
            </Typography>
            <List>
              {fetchedUser.postedJobs.map((job) => (
                <ListItem
                  key={job.jobId}
                  component={Link}
                  href={`/job/${job.jobId}`}
                  sx={{
                    border: "1px solid grey",
                    borderRadius: 2,
                    marginTop: 1,
                  }}
                >
                  <ListItemIcon>
                    <Star color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ textDecoration: "none" }}
                    primary={job.jobTitle}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          <div>
            <Typography
              variant="h6"
              component="div"
              sx={{ marginTop: "1rem" }}
            >
              Jobs Applied
            </Typography>
            <List>
              {fetchedUser.jobsApplied.map((job) => (
                <ListItem
                  key={job.jobId}
                  component={Link}
                  href={`/job/${job.jobId}`}
                  sx={{
                    border: "1px solid grey",
                    borderRadius: 2,
                    marginTop: 1,
                  }}
                >
                  <ListItemIcon>
                    <Star color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ textDecoration: "none" }}
                    primary={job.jobTitle}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </CardContent>
      {fetchedUser._id === user?._id ? 
      <div>
        <Button variant="contained" sx={{marginRight:1, marginLeft:2,marginBottom:1}} onClick={() => setEditActive(true)}>Edit Profile</Button>
      </div> : null}
      
      {isEditActive ? 
      <Box style={{marginLeft:15, marginTop:10, marginRight:15}}>
        <TextField
            fullWidth
            label="New username"
            name="New username"
            value={newUsername}
            onChange={(event) => {setNewUsername(event?.target.value as string);}}
            margin="normal"
        />
        <TextField
            fullWidth
            label="New Full Name"
            name="New Full Name"
            value={newFullName}
            onChange={(event) => {setNewFullName(event?.target.value as string);}}
            margin="normal"
        />
        <TextField
            fullWidth
            label="New bio"
            name="New bio"
            value={newBio}
            onChange={(event) => {setNewBio(event?.target.value as string);}}
            margin="normal"
        />
        <TextField
            fullWidth
            label="New password"
            name="New password"
            type="password"
            value={newPassword}
            onChange={(event) => {setNewPassword(event?.target.value as string);}}
            margin="normal"
        />
        <Button variant="contained" color="success" sx={{marginRight:1, marginLeft:0, marginBottom:1}} onClick={() => updateProfile()}>Confirm Edit</Button>
        <Button variant="contained" color="error" sx={{marginBottom:1}} onClick={() => setEditActive(false)}>Cancel Edit</Button>
      </Box>
      : null}
    </Card>
  );
}

export default UserInformation;
