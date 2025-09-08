"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  description: string;
  // add other fields if needed
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data: Job[]) => setJobs(data))
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Latest Jobs</h1>
      <ul className="space-y-3">
        {jobs.map((job) => (
          <li key={job.id} className="p-4 bg-white shadow rounded-md">
            <h2 className="font-semibold">{job.title}</h2>
            <p>{job.description}</p>
            <Link href={`/jobs/${job.id}`} className="text-blue-600">
              View Job
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
