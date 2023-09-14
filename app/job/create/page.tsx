"use client";
import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  WorkOutline,
  BusinessCenter,
  Description,
  LocalOffer,
  Room,
  Send,
  DatasetRounded,
} from '@mui/icons-material';
import { Job, ShortJobInfo, Tag } from '@/libs/interfaces';
import { UserContext, UserContextType } from "@/context/user-context";
import { apiURI } from '@/libs/constants';
import { useRouter } from 'next/navigation';


interface JobInputFields {
    title: string,
    seniority: string,
    description: string,
    lookingForDescription: string,
    companyOffersDescription: string,
    location: string,
}

const JobCreation = () => {
  const [jobData, setJobData] = useState<JobInputFields>({
    title: '',
    seniority: '',
    description: '',
    lookingForDescription: '',
    companyOffersDescription: '',
    location: '',
  });
  const {user, setLoggedInUser} = useContext(UserContext) as UserContextType;
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("Other");
  const router = useRouter();

  useEffect(() => {
    fetch(`${apiURI}/tags`)
    .then(response => response.json())
    .then(data => {
        setTags(data);
    })
  },[])

  if(!user) {
    return(<h3 style={{ textAlign:"center", margin: "0 auto", marginTop: "2rem" }}>
    {`Login to create a job`}
    </h3>)
  }

  if(user.isCompany === false) {
    return(<h3 style={{ textAlign:"center", margin: "0 auto", marginTop: "2rem" }}>
    {`You need to register as a company to create a job`}
    </h3>)
  }

  const tagNames: string[] = tags.map((tag) => tag.name).sort();
  const tagOptions: Array<JSX.Element> = [];
  tagNames.forEach((value, key) => {
    const tagHTML = (
      <MenuItem key={key} value={value}>
        {value}
      </MenuItem>
    );
    tagOptions.push(tagHTML);
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJobData((prevJobData) => ({
      ...prevJobData,
      [name]: value,
    }));
  };

  const isInputValid = () => {
    if(jobData.title === "" || jobData.seniority === "" || jobData.description === ""
    || jobData.lookingForDescription === "" || jobData.companyOffersDescription === ""
    || jobData.location === "") {
        return false;
    }

    return true;
  }

  const handleCreateJob = () => {
    if(!isInputValid()) {
        alert("Make sure to enter all information")
        return;
    }

    const newJob = {
        ...jobData,
        companyInfo:[{
            companyId:user._id,
            companyName:user.fullName
        }],
        tagName:selectedTag,
        candidates:[]
    } satisfies Job;
    console.log(newJob);
    
    const createJobAndUpdateTagAndUser = async () => {
      const response = await fetch(`${apiURI}/jobs/`, {
        method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newJob),
        });
        
        const data = await response.json();
        if(data.errorMessage) {
          alert(data.errorMessage);
          return;
        } 

        const tag = tags.find(t => t.name === selectedTag);
        if(tag) {
          tag.jobs.push(data?._id);
          const tagResponse = await fetch(`${apiURI}/tags/${tag._id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(tag),
          })

          const updatedTag = await tagResponse.json();
          if(updatedTag.errorMessage) {
            alert(updatedTag.errorMessage);
            return;
          }
        }

        user.postedJobs.push({
          jobId:data._id,
          jobTitle:data.title
        } satisfies ShortJobInfo);

        const userResponse = await fetch(`${apiURI}/users/${user._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })

        const updatedUser = await userResponse.json();
        if(updatedUser.errorMessage) {
          alert(updatedUser.errorMessage);
          return;
        }
          
        router.push(`/job/${data?._id}`);
    }

    createJobAndUpdateTagAndUser();
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', marginTop: '2rem' }}>
      <CardContent>
        <Typography sx={{marginBottom:2}} variant="h5" component="div" gutterBottom>
          Create a Job
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="title"
                value={jobData.title}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <WorkOutline color="action" fontSize="small" />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Seniority"
                name="seniority"
                value={jobData.seniority}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <BusinessCenter color="action" fontSize="small" />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={jobData.location}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <Room color="action" fontSize="small" />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                name="description"
                multiline
                rows={4}
                value={jobData.description}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <Description color="action" fontSize="small" />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="We Are Looking For"
                name="lookingForDescription"
                multiline
                rows={4}
                value={jobData.lookingForDescription}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <LocalOffer color="action" fontSize="small" />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Offers Description"
                name="companyOffersDescription"
                multiline
                rows={4}
                value={jobData.companyOffersDescription}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <LocalOffer color="action" fontSize="small" />
                  ),
                }}
              />
            </Grid>
          </Grid>
          <FormControl sx={{marginTop:3}} fullWidth>
          <InputLabel>Select Tag</InputLabel>
          <Select
            label={"Select tag"}
            value={selectedTag}
            onChange={(event) => setSelectedTag(event.target.value as string)}
            sx={{ maxHeight: "200px", overflowY: "auto", marginRight: "10px" }}
            MenuProps={{
              PaperProps: {
                style: { maxHeight: "200px" },
              },
            }}
          >
            {tagOptions}
          </Select>
        </FormControl>
          <Box mt={2} sx={{display:'flex', justifyContent:"flex-end"}}>
            <Button
              variant="contained"
              color="success"
              endIcon={<Send />}
              onClick={handleCreateJob}
            >
              Create Job
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobCreation;