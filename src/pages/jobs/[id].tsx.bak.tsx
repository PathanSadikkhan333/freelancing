/*
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function JobDetail(){
  const r = useRouter()
  const { id } = r.query
  const [job, setJob] = useState<any>(null)
  useEffect(()=>{ if (id) axios.get(/api/job?id=${id}).then(r=>setJob(r.data)) },[id])

  async function apply(){
    await axios.post('/api/applications', { jobId: id, freelancerId: 'bob-id', coverLetter: 'I can do it', price: 15000 })
    alert('applied')
  }

  if(!job) return <div>Loading...</div>
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p>{job.description}</p>
      <div className="mt-4">
        <button onClick={apply} className="btn">Apply</button>
      </div>
    </div>
  )
}

*/


import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

// Define your Job interface to type API response
interface Job {
  id: string;
  title: string;
  description: string;
  // add other fields if you have them
}

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;

  // State typed as Job or null
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!id) return;

    // Explicitly type axios response to Job
    axios
      .get<Job>(`/api/job?id=${id}`)
      .then((response) => {
        // response.data is now typed as Job
        setJob(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch job:", error);
      });
  }, [id]);

  async function apply() {
    if (!id) {
      alert("Invalid job id");
      return;
    }

    try {
      await axios.post("/api/applications", {
        jobId: id,
        freelancerId: "bob-id",
        coverLetter: "I can do it",
        price: 15000,
      });
      alert("Applied successfully");
    } catch (error) {
      console.error("Application failed:", error);
      alert("Failed to apply for job");
    }
  }

  if (!job) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p>{job.description}</p>
      <div className="mt-4">
        <button onClick={apply} className="btn">
          Apply
        </button>
      </div>
    </div>
  );
}
