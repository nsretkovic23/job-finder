"use client"
import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField,
  Box,
} from '@mui/material';
import { Person, Business, LocationOn, BusinessCenter, Description, Search, LocalOffer, ApiRounded } from '@mui/icons-material';
import Link from 'next/link';
import { Candidate, Job } from '@/libs/interfaces';
import { apiURI } from '@/libs/constants';
import { UserContext, UserContextType } from '@/context/user-context';
import { useRouter } from 'next/navigation';

interface JobPageProps {
  job: Job;
}


const JobPage = ({params}:{params:{id:string}}) => {
  const [job, setJob] = useState<Job>();
  const [jobNotFound, setJobNotFound] = useState<boolean>(false);
  const {user} = useContext(UserContext) as UserContextType;
  const [isEditActive, setEditActive] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newSeniority, setNewSeniority] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newLookingFor, setNewLookingFor] = useState<string>("");
  const [newCompanyOffers, setNewCompanyOffers] = useState<string>("");
  const router = useRouter(); 

  // TODO: REMOVE TEST CANDIDATES
  const [testCandidates, setTestCand] = useState<Candidate[]>([{
    userId:"6501c251f1d2853e5340c693",
    username:"nsretkovic"
  },{
    userId:"6501c251f1d2853e5340c693",
    username:"nsretkovic2"
  },{
    userId:"6501c251f1d2853e5340c693",
    username:"nsretkovic3"
  },
  {
    userId:"6501c251f1d2853e5340c693",
    username:"nsretkovic4"
  },
  {
    userId:"6501c251f1d2853e5340c693",
    username:"nsretkovic5"
  },
  {
    userId:"6501c251f1d2853e5340c693",
    username:"nsretkovic6"
  },
  {
    userId:"6501c251f1d2853e5340c693",
    username:"nsretkovic7"
  },])

  useEffect(() => {
    if(job) {
      setNewTitle(job.title);
      setNewSeniority(job.seniority);
      setNewDescription(job.description);
      setNewLookingFor(job.lookingForDescription);
      setNewCompanyOffers(job.companyOffersDescription);
    }
  }, [job])

  const isInputValid = ():boolean => {
    if(newTitle === "" 
    || newSeniority === "" 
    || newDescription === "" 
    || newLookingFor === "" 
    || newCompanyOffers === "") {
      return false;
    }
    return true;
  }

  const deleteJob = () => {
    fetch(`${apiURI}/jobs/${job?._id}`, {method:'DELETE'})
    .then(res => res.json())
    .then(data => {
      if(data.errorMessage) {
        alert(data.errorMessage);
        return;
      }

      router.replace('/');
    })
  }

  const updateJob = () => {
    if(!isInputValid()) {
      alert("Invalid input")
      return;
    } else {
      setEditActive(false);
    }
    if(!job) return;

    const updatedJob = {
      title:newTitle,
      seniority:newSeniority,
      companyInfo:job.companyInfo,
      tagName:job.tagName,
      description:newDescription,
      lookingForDescription:newLookingFor,
      companyOffersDescription:newCompanyOffers,
      location:job.location,
      candidates:job.candidates
    } satisfies Job;

    fetch(`${apiURI}/jobs/${job._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJob),
    })
    .then(res => res.json())
    .then(data => {
      if(data.errorMessage) {
        alert(data.errorMessage)
      } else {
        setJob(data);
      }
    })
  }

  useEffect(() => {
    fetch(`${apiURI}/jobs/${params.id}`)
    .then(response => response.json())
    .then(data => {
        if(data.errorMessage) {
          setJobNotFound(true);
        } else {
          testCandidates.forEach(cand => data.candidates.push(cand));
          setJob(data);
        }
    })
  }, [params.id, testCandidates])

  if(jobNotFound) {
    return (<h3 style={{ maxWidth: 500, margin: "0 auto", marginTop: "2rem" }}>
        {`Job with id ${params.id} not found`}
        </h3>)
  }

  if(!job) {
    return(<h3 style={{ maxWidth: 500, margin: "0 auto", marginTop: "2rem" }}>
    {`Loading...`}
    </h3>)
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', marginTop: '2rem' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Business /> Company:
          <Link href={`/user/${job.companyInfo[0].companyId}`}>{job.companyInfo[0].companyName}</Link>
        </Typography>
        <Divider sx={{marginTop:"5px", marginBottom:"5px"}} flexItem/>
        <Typography variant="body2" color="text.secondary">
          <LocationOn /> Location: {job.location}
        </Typography>
        <Divider sx={{marginTop:"5px", marginBottom:"5px"}} flexItem/>
        <Typography variant="body2" color="text.secondary">
          <BusinessCenter /> Seniority: {job.seniority}
        </Typography>
        <Divider sx={{marginTop:"5px", marginBottom:"5px"}} flexItem/>
        <Typography variant="body2" color="text.secondary">
          <Description /> Description: {job.description}
        </Typography>
        <Divider sx={{marginTop:"5px", marginBottom:"5px"}} flexItem/>
        <Typography variant="body2" color="text.secondary">
          <Search/> Looking For: {job.lookingForDescription}
        </Typography>
        <Divider sx={{marginTop:"5px", marginBottom:"5px"}} flexItem/>
        <Typography variant="body2" color="text.secondary">
          <LocalOffer/>Company Offers: {job.companyOffersDescription}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" component="div">
          Candidates {job.candidates.length > 0 ? "" : "- Nobody applied yet"}
        </Typography>
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
          <List>
            {job.candidates.map((candidate:Candidate) => (
              <ListItem
                key={candidate.userId + candidate.username}
                component={Link}
                href={`/user/${candidate.userId}`}
                sx={{border:"1px solid gray", borderRadius:3, marginBottom:"3px"}}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={`${candidate.username}`} />
              </ListItem>
            ))}
          </List>
        </div>
      </CardContent>
        {job.companyInfo[0].companyId === user?._id ?
          <div>
            <Button variant="contained" sx={{marginRight:1, marginLeft:2,marginBottom:1}} onClick={() => setEditActive(true)}>Edit Job</Button>
            <Button variant="contained" color="error" sx={{marginRight:1, marginLeft:2,marginBottom:1}} onClick={() => deleteJob()}>Delete Job</Button>
          </div>
        : null}

{isEditActive ? 
      <Box style={{marginLeft:15, marginTop:10, marginRight:15}}>
        <TextField
            fullWidth
            label="New title"
            name="New title"
            value={newTitle}
            onChange={(event) => {setNewTitle(event?.target.value as string);}}
            margin="normal"
        />
        <TextField
            fullWidth
            label="New seniority"
            name="New seniority"
            value={newSeniority}
            onChange={(event) => {setNewSeniority(event?.target.value as string);}}
            margin="normal"
        />
        <TextField
            fullWidth
            label="New Full Name"
            name="New Full Name"
            value={newDescription}
            onChange={(event) => {setNewDescription(event?.target.value as string);}}
            margin="normal"
        />
        <TextField
            fullWidth
            label="New bio"
            name="New bio"
            value={newLookingFor}
            onChange={(event) => {setNewLookingFor(event?.target.value as string);}}
            margin="normal"
        />
        <TextField
            fullWidth
            label="New company offer"
            name="New company offer"
            value={newCompanyOffers}
            onChange={(event) => {setNewCompanyOffers(event?.target.value as string);}}
            margin="normal"
        />
        <Button variant="contained" color="success" sx={{marginRight:1, marginLeft:0, marginBottom:1}} onClick={() => updateJob()}>Confirm Edit</Button>
        <Button variant="contained" color="error" sx={{marginBottom:1}} onClick={() => setEditActive(false)}>Cancel Edit</Button>
      </Box>
      : null}
    </Card>
  );
};

export default JobPage;