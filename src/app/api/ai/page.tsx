/*

"use client";
import { useState } from "react";

export default function AIPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const callAI = async (provider: string) => {
    const res = await fetch(/api/ai/${provider}, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">AI Playground</h1>
      <textarea
        className="border p-2 w-full my-2"
        placeholder="Ask something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="space-x-2">
        <button onClick={() => callAI("google")} className="bg-blue-500 text-white px-3 py-1 rounded">Google AI</button>
        <button onClick={() => callAI("openrouter")} className="bg-green-500 text-white px-3 py-1 rounded">OpenRouter</button>
        <button onClick={() => callAI("groq")} className="bg-red-500 text-white px-3 py-1 rounded">Groq</button>
      </div>
      <pre className="bg-gray-100 p-4 mt-4 rounded">{response}</pre>
    </div>
  );
}
  */


import React, { useState } from 'react';

export default function AIPage() {
  const [count, setCount] = useState(0);

  // Example safe arithmetic operation
  const newCount = count + 1;

  // Dummy async function simulating AI call
  async function callAI(service: 'google' | 'openrouter' | 'groq') {
    console.log(`Calling AI service: ${service}`);
    // Implement actual API calls here
  }

  return (
    <>
      <div>
        <h1>First Div</h1>
        <p>Count value: {newCount}</p>
        <button onClick={() => setCount(newCount)}>Increment</button>
      </div>

      <div>
        <h2>Second Div</h2>
        <p>This is the second div content.</p>

        <button
          onClick={() => callAI('google')}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Google AI
        </button>
        <button
          onClick={() => callAI('openrouter')}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          OpenRouter
        </button>
        <button
          onClick={() => callAI('groq')}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Groq
        </button>
      </div>
    </>
  );
}
