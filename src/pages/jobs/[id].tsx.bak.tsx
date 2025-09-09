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

/*
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
*/import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

// TypeScript interface for a Job
interface Job {
  id: string;
  title: string;
  description: string;
  // add other fields if you want
}

// Custom type guard to detect axios errors
function isAxiosError(error: any): error is { response?: any; message: string } {
  return error && typeof error === "object" && "message" in error && ("response" in error || error.response === undefined);
}

// Optional: runtime check to confirm Job type
function isJob(data: any): data is Job {
  return data && typeof data.id === "string" && typeof data.title === "string" && typeof data.description === "string";
}

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/job?id=${id}`)
      .then((response) => {
        const contentType = response.headers["content-type"];
        if (!contentType || !contentType.includes("application/json")) {
          setError("Server returned non-JSON response.");
          console.error("Non-JSON response:", response.data);
          setJob(null);
          return;
        }
        if (isJob(response.data)) {
          setJob(response.data);
          setError(null);
        } else {
          setError("Response data is not a valid Job object.");
          setJob(null);
        }
      })
      .catch((error: unknown) => {
        if (isAxiosError(error)) {
          const msg = error.message + (error.response ? `: ${JSON.stringify(error.response)}` : "");
          setError("Failed to fetch job: " + msg);
          console.error("Fetch error:", msg);
        } else {
          setError("Failed to fetch job (unknown error)");
          console.error("Fetch error:", error);
        }
        setJob(null);
      });
  }, [id]);

  async function apply() {
    if (!id) {
      alert("Invalid job id");
      return;
    }
    try {
      await axios.post(
        "/api/applications",
        {
          jobId: id,
          freelancerId: "bob-id",
          coverLetter: "I can do it",
          price: 15000,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Applied successfully");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const msg = error.message + (error.response ? `: ${JSON.stringify(error.response)}` : "");
        alert("Failed to apply for job: " + msg);
        console.error("Application failed:", msg);
      } else {
        alert("Failed to apply for job (unknown error)");
        console.error("Application failed:", error);
      }
    }
  }

  if (error) {
    return <div className="text-red-600 p-6">Error: {error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

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
