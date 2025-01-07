import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/Navbar";
import { ChannelList } from "@/components/ChannelList";
import { MessageList } from "@/components/MessageList";
import { MessageInput } from "@/components/MessageInput";
import { useState } from "react";

const Index = () => {
  const [selectedChannelId, setSelectedChannelId] = useState<number>(1);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <aside className="w-64 bg-black/30 backdrop-blur-md fixed left-0 top-0 bottom-0 z-40 border-r border-white/10">
          <div className="flex flex-col h-full pt-16">
            <ChannelList
              selectedChannelId={selectedChannelId}
              onChannelSelect={setSelectedChannelId}
            />
          </div>
        </aside>
        <main className="flex-1 ml-64">
          <Navbar />
          <div className="flex flex-col h-[calc(100vh-4rem)] pt-16">
            <MessageList selectedChannelId={selectedChannelId} />
            <MessageInput channelId={selectedChannelId} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;