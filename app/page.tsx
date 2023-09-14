"use client";
import Filters from './(components)/filters';
import { Job, Tag } from '@/libs/interfaces';
import { useContext, useEffect, useState } from 'react';
import { apiURI } from '@/libs/constants';
import JobList from './(components)/job-list';
import useLocalStorageAuthentication from '@/context/useLocalStorageAuthentication';
import { UserContext, UserContextType } from '@/context/user-context';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const fetchedUser = useLocalStorageAuthentication(false);
  const {user, setCredentialsToLocalStorage, setLoggedInUser, logoutUser} = useContext(UserContext) as UserContextType;

  useEffect(() => {
    if(!user && fetchedUser) {
      setLoggedInUser(fetchedUser);
    }
  },[fetchedUser, user, setLoggedInUser])

  useEffect(() => {
    fetch(`${apiURI}/jobs`)
    .then(response => response.json())
    .then(data => {
        setJobs(data);
    })
  },[])

  const fetchAllJobs = () => {
    fetch(`${apiURI}/jobs`)
    .then(response => response.json())
    .then(data => {
        setJobs(data);
    })
  }

  const fetchJobsByTagId = (tagId:string|undefined) => {
    if(!tagId) return;

    fetch(`${apiURI}/jobs/tag/${tagId}`)
    .then(response => response.json())
    .then(data => {
        setJobs(data);
    })
  }

  const onFilterClick = (tag:Tag|null) => {
    if(!tag) {
      fetchAllJobs();
    } else {
      fetchJobsByTagId(tag?._id)
    }
  } 

  return (
    <main style={{flex:1, display: 'flex', flexDirection:"column", alignItems: 'center', height:"100%"}}>
      <div style={{ flex:1, display: 'flex', flexDirection:'column', alignItems: 'center', maxWidth: "1200px", height: "100%"}}>
        <Filters onFilterClick={onFilterClick}/>
        <div style={{ width:"100%", overflowY:"auto", height:'calc(100vh - 180px)'}}>
          <JobList jobs={jobs}/>
        </div>
      </div>
    </main>
  )
}
