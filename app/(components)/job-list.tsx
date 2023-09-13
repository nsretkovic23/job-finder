import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, IconButton, Divider } from '@mui/material';
import { ArrowForward, PermIdentity, PersonSearch, Place, Work } from '@mui/icons-material';
import { Job } from '@/libs/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const router = useRouter();

  return (
    <div style={{ width:"100%", overflowY:"auto", height:"100%"}} >
      {jobs.map((job) => (
        <Card key={job._id} sx={{ height: 250, margin: '1rem', display: 'flex', flexDirection: 'column' }} elevation={4}>
          <CardContent>
            <Typography variant="h6" sx={{margin:0}}><Work sx = {{marginRight:1}}/>{job.title}</Typography>
            <Divider flexItem/>
            <Card sx={{marginTop:1}} elevation={5}>
                <CardContent sx={{height: 30, display:"flex", alignItems:'center'}}>
                    <PersonSearch/>
                    <Typography variant="body2" color="text.secondary">
                        Seniority: {job.seniority}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{marginTop:1}} elevation={5}>
                <CardContent sx={{height: 30, display:"flex", alignItems:'center'}}>
                    <Place/>
                    <Typography variant="body2" color="text.secondary">
                        Location: {job.location}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{marginTop:1}} elevation={5}>
                <CardContent sx={{height: 30, display:"flex", alignItems:'center'}}>
                    <PermIdentity/>
                    <Typography variant="body2" color="text.secondary">
                        Candidates: {job.candidates.length}
                    </Typography>
                </CardContent>
            </Card>
          </CardContent>
          <CardActions sx={{display:'flex', justifyContent:"flex-end", marginTop: '-10px' }}>
            <Button
              variant='contained'
              sx={{backgroundColor:"#9A3B3B", ":hover":{backgroundColor:"#C08261"}}}
              onClick={() => router.push(`/job/${job._id}`)}
              endIcon={<ArrowForward />}
            >
              Details
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default JobList;