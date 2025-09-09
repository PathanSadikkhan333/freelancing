/*
"use client";
import { useEffect, useState } from "react";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const postJob = async (e: any) => {
    e.preventDefault();
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, employerId: 1 }), // replace with auth user
    });
    setTitle("");
    setDescription("");
    alert("Job Posted!");
  };

  useEffect(() => {
    fetch("/api/jobs?employerId=1")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>

      <form onSubmit={postJob} className="mb-6 p-4 bg-white shadow rounded">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Post Job
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">My Jobs</h2>
      <ul className="space-y-2">
        {jobs.map((job: any) => (
          <li key={job.id} className="p-3 bg-white shadow rounded">
            {job.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
  */


"use client";
import { useEffect, useState } from "react";

type Job = {
  id: number | string;
  title: string;
  description?: string;
};

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const postJob = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, employerId: 1 }), // replace with auth user
    });
    setTitle("");
    setDescription("");
    alert("Job Posted!");
    fetchJobs();
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs?employerId=1");
      const data = await res.json();
      if (Array.isArray(data)) {
        setJobs(data);
      } else if (Array.isArray(data.jobs)) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>

      <form onSubmit={postJob} className="mb-6 p-4 bg-white shadow rounded">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Post Job
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">My Jobs</h2>
      <ul className="space-y-2">
        {jobs.length === 0 ? (
          <li>No jobs found</li>
        ) : (
          jobs.map((job) => (
            <li key={job.id} className="p-3 bg-white shadow rounded">
              {job.title}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
