import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const res = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText",
    {
      prompt: { text: prompt },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GOOGLE_API_KEY!,
      },
    }
  );

  return NextResponse.json(res.data);
}
