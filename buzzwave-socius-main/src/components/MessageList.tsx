import { useState } from "react";
import type { Message } from "@/types/message";
import type { User } from "@/types/user";
import type { FileAttachment } from "@/types/file";

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello everyone!",
    sender_id: "john_doe",
    channel_id: 1,
    created_at: new Date("2024-01-01T09:00:00"),
    updated_at: new Date("2024-01-01T09:00:00"),
    attachments: [
      {
        id: "1",
        name: "welcome.pdf",
        url: "https://example.com/welcome.pdf",
        type: "application/pdf",
        size: 1024000,
      },
    ],
  },
  {
    id: 2,
    content: "Hi John! How are you?",
    sender_id: "jane_smith",
    channel_id: 1,
    created_at: new Date("2024-01-01T09:02:00"),
    updated_at: new Date("2024-01-01T09:02:00"),
  },
  {
    id: 3,
    content: "Welcome to the channel!",
    sender_id: "alice_johnson",
    channel_id: 2,
    created_at: new Date("2024-01-01T09:05:00"),
    updated_at: new Date("2024-01-01T09:05:00"),
  },
];

const initialUsers: User[] = [
  {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: "jane_smith",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: "alice_johnson",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
];

interface MessageListProps {
  selectedChannelId: number;
}

export const MessageList = ({ selectedChannelId }: MessageListProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [users] = useState<User[]>(initialUsers);

  const channelMessages = messages.filter(
    (message) => message.channel_id === selectedChannelId
  );

  const getUserById = (senderId: string): User | undefined => {
    return users.find((user) => user.id === senderId);
  };

  const isImageFile = (type: string) => {
    return type.startsWith('image/');
  };

  // Update the addMessage function to handle attachments
  const addMessage = (content: string, channelId: number, attachments?: FileAttachment[]) => {
    const newMessage: Message = {
      id: messages.length + 1,
      content,
      sender_id: "john_doe", // Using a default user for now
      channel_id: channelId,
      created_at: new Date(),
      updated_at: new Date(),
      attachments: attachments,
    };
    setMessages([...messages, newMessage]);
  };

  // Add this to the window object so MessageInput can access it
  (window as any).addMessage = addMessage;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {channelMessages.map((message) => {
        const user = getUserById(message.sender_id);
        return (
          <div key={message.id} className="animate-fade-in">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-sm font-medium text-white/90">
                  {user ? user.name[0].toUpperCase() : "?"}
                </span>
              </div>
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="font-medium text-white/90">
                    {user ? user.name : "Anonymous"}
                  </span>
                  <span className="text-xs text-white/50">
                    {message.created_at.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="mt-1 text-white/80">{message.content}</p>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex flex-col space-y-2"
                      >
                        {isImageFile(file.type) ? (
                          <div className="relative max-w-md overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm p-2">
                            <img
                              src={file.url}
                              alt={file.name}
                              className="w-full h-auto rounded"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-sm text-white/60 hover:text-white/80">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2"
                            >
                              <span>📎</span>
                              <span>{file.name}</span>
                              <span className="text-xs">
                                ({Math.round(file.size / 1024)}KB)
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
