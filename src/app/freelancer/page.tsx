"use client";
import { useEffect, useState } from "react";

export default function FreelancerDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("/api/applications?freelancerId=1") // replace with auth user ID
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <ul className="space-y-2">
        {applications.map((app: any) => (
          <li key={app.id} className="p-3 bg-white shadow rounded">
            <p>Job: {app.job.title}</p>
            <p>Status: {app.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}