"use client"
import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { Person, Business, LocationOn, BusinessCenter, Description, Search, LocalOffer } from '@mui/icons-material';
import Link from 'next/link';
import { Candidate, Job } from '@/libs/interfaces';
import { apiURI } from '@/libs/constants';

interface JobPageProps {
  job: Job;
}


const JobPage = ({params}:{params:{id:string}}) => {
  const [job, setJob] = useState<Job>();
  const [jobNotFound, setJobNotFound] = useState<boolean>(false);
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
    console.log("kolko se puta zove");
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
    </Card>
  );
};

export default JobPage;