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
