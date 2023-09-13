"use client";
import React, { useEffect, useState } from "react";
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


// TODO: Use this code for creating user - data returned is user if success
// useEffect(() => {
//     const create = {
//         fullName: "Nikola Sretkovic",
//         username: "nsretkovic",
//         password: "nikola",
//         description: "Hello I'm nikola, Unity developer",
//         isCompany: false,
//         rating: [3, 4, 5, 5],
//         postedJobs: [
//           {
//             jobId: "6500f7edc6bc6c78bdae00b0",
//             jobTitle: "Unity Game Dev",
//           },
//           {
//             jobId: "6500f855c6bc6c78bdae00b3",
//             jobTitle: "Node js backend dev",
//           },
//         ],
//         jobsApplied: [
//           {
//             jobId: "6500f7edc6bc6c78bdae00b0",
//             jobTitle: "Unity Game Dev",
//           },
//           {
//             jobId: "6500f855c6bc6c78bdae00b3",
//             jobTitle: "Node js backend dev",
//           },
//         ],
//       } satisfies User;

//       fetch(`${apiURI}/users/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(create),
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//       })
//   }, [])


function UserInformation({params}:{params:{id:string}}) {
  const [user, setUser] = useState<User>();
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const [newFullName, setNewFullName] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isEditActive, setEditActive] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${apiURI}/users/${params.id}`)
    .then(response => response.json())
    .then(data => {
        if(data.errorMessage) {
            setUserNotFound(true);
        } else {
            setUser(data);
        }
    })
  }, [params.id])

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

  if(!user) {
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
    if(!user) return;

    const updatedUser = {
      fullName:newFullName,
      username:newUsername,
      password:newPassword,
      description:newBio,
      isCompany:user.isCompany,
      rating:user.rating,
      postedJobs:user.postedJobs,
      jobsApplied:user.jobsApplied
    } satisfies User;

    console.log(updatedUser);
    fetch(`${apiURI}/users/${user._id}`, {
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
        {user.isCompany ? (
          <Typography variant="h5" component="div">
            <Business /> Company <br />
            <Divider flexItem sx={{marginTop: "3px", marginBottom:"3px"}}/>
            {user.fullName} - @{user.username}
          </Typography>
        ) : (
          <Typography variant="h5" component="div">
            <AccountCircle /> Developer <br />
            <Divider flexItem sx={{marginTop: "3px", marginBottom:"3px"}}/>
            {user.fullName} - @{user.username}
          </Typography>
        )}
        <Divider flexItem />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 2 }}
        >
          <Description/> Bio: {user.description}
        </Typography>

        <Divider flexItem sx={{marginTop: 2}}/>

        {user.isCompany ? (
          <div>
            <Typography
              variant="h6"
              component="div"
              sx={{marginTop: "1rem"}}
            >
              Posted Jobs
            </Typography>
            <List>
              {user.postedJobs.map((job) => (
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
              {user.jobsApplied.map((job) => (
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
      <div>
        <Button variant="contained" sx={{marginRight:1, marginLeft:2,marginBottom:1}} onClick={() => setEditActive(true)}>Edit Profile</Button>
        <Button variant="contained" color="error" sx={{marginBottom:1}}>Delete Profile</Button>
      </div>
      {isEditActive ? 
      <Box style={{marginLeft:15, marginTop:10, marginRight:15}}>
        <TextField
            fullWidth
            label="New username"
            name="New username"
            value={newUsername}
            onChange={(event) => {setNewUsername(event?.target.value as string); console.log(newUsername)}}
            margin="normal"
        />
        <TextField
            fullWidth
            label="New Full Name"
            name="New Full Name"
            value={newFullName}
            onChange={(event) => {setNewFullName(event?.target.value as string); console.log(newFullName)}}
            margin="normal"
        />
        <TextField
            fullWidth
            label="New bio"
            name="New bio"
            value={newBio}
            onChange={(event) => {setNewBio(event?.target.value as string); console.log(newBio)}}
            margin="normal"
        />
        <TextField
            fullWidth
            label="New password"
            name="New password"
            type="password"
            value={newPassword}
            onChange={(event) => {setNewPassword(event?.target.value as string); console.log(newPassword)}}
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
