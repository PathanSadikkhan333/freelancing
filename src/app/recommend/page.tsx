"use client";

import { useState } from "react";

export default function RecommendPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("Loading...");

    const res = await fetch("/api/ai/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    if (data.success) {
      setResult(data.result);
    } else {
      setResult("Error: " + data.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Job Recommendations</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your skills (e.g. React, Node.js)"
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Get Recommendations
        </button>
      </form>
      <div className="mt-6 p-4 border rounded bg-gray-50">
        <strong>Result:</strong>
        <p className="mt-2 whitespace-pre-line">{result}</p>
      </div>
    </div>
  );
}