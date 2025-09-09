"use client";
import { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  ChannelList,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/v2/index.css";
import { useUser } from "@clerk/nextjs";

export default function ChatPage() {
  const { user } = useUser();
  const [client, setClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    if (!user) return;

    const initChat = async () => {
      const userId = user.id;

      const res = await fetch("/api/chat/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      const chatClient = StreamChat.getInstance(data.apiKey);

      await chatClient.connectUser(
        {
          id: data.userId,
          name: user.fullName || "Anonymous",
          image: user.imageUrl, // Clerk avatar
        },
        data.token
      );

      // Removed 'name' property since 'ChannelData' type does not allow it
      const channel = chatClient.channel("messaging", "workconnect-room", {
        members: [userId, "employer-1"], // Example: connect with another role
      });

      await channel.watch();
      setClient(chatClient);
    };

    initChat();

    return () => {
      client?.disconnectUser();
    };
  }, [user]);

  if (!user) return <p className="p-6">Please log in to use chat.</p>;
  if (!client) return <p className="p-6">Loading chat...</p>;

  return (
    <div className="h-[90vh] p-4 bg-gray-50">
      <Chat client={client} theme="str-chat__theme-light">
        <ChannelList />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      </Chat>
    </div>
  );
}
