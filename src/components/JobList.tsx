/*
import React, { useEffect,useState} from 'react'
import axios from 'axios'
import JobCard from './JobCard'

export default function JobList() {
    const [jobs,setJobs]=useState<any[]>([])
    useEffect(()=>{axios.get('/api/jobs').then(r => setJobs(r.data))},[])

    return (
        <div className='grid grid-cols-1 gap-4'>
            {jobs.map(j => <JobCard key = {j.id} job={j}/>)}
        </div> 
    )
}
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

// Define a Job interface matching your API response structure
interface Job {
  id: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  // Add other fields as needed
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios
      .get<Job[]>("/api/jobs")
      .then((response) => {
        // Explicitly typed response.data to Job[]
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
        setJobs([]); // fallback to empty array on error
      });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
