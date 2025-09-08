/*

import { NextResponse } from "next/server";
import { HuggingFaceInference } from "langchain/llms/hf";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const model = new HuggingFaceInference({
      model: "gpt2", // simple free model
      apiKey: process.env.HF_API_KEY,
    });

    const result = await model.call(
      Suggest freelance jobs in India for: ${query}
    );

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

*/