import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY!}`,
        "Content-Type": "application/json",
      },
    }
  );

  return NextResponse.json(res.data);
}
