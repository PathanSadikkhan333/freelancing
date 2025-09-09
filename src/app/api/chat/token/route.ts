

import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const serverClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY!,
    process.env.STREAM_API_SECRET!
  );

  // Create or get user
  await serverClient.upsertUser({ id: userId, name: userId });

  // Create a user token
  const token = serverClient.createToken(userId);

  return NextResponse.json({
    token,
    apiKey: process.env.STREAM_API_KEY,
    userId,
  });
}