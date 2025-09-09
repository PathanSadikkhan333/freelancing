import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const res = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
        "Content-Type": "application/json",
      },
    }
  );

  return NextResponse.json(res.data);
}
