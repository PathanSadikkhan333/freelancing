/*
import React from "react";

interface Job {
  id: string;
  title: string;
  description: string;
  // Add other fields as needed
}

interface JobPageProps {
  params: { id: string } | null;
}

async function fetchJob(id: string): Promise<Job> {
  const res = await fetch(`/api/jobs/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch job");
  }
  return res.json();
}

export default async function JobPage({ params }: JobPageProps) {
  // Handle potentially null params safely
  if (!params?.id) {
    return <div>Job ID not found.</div>;
  }
  const job = await fetchJob(params.id);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold">{job.title}</h1>
      <p className="mt-2">{job.description}</p>
    </div>
  );
}
*/

import { useRouter } from "next/router";
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
