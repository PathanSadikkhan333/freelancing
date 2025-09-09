
import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

export async function GET() {
  const client = StreamChat.getInstance(
    process.env.STREAM_API_KEY!,
    process.env.STREAM_API_SECRET || "dummy" // replace with server-side secret
  );

  // Example: create channel
  const channel = client.channel("messaging", "general", {
    members: ["user1", "user2"],
  });

  await channel.create();

  return NextResponse.json({ success: true, channelId: channel.id });
}
