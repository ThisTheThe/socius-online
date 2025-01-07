import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import type { Channel } from "@/types/channel";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const initialChannels: Channel[] = [
  {
    id: 1,
    name: "general",
    description: "General discussion",
    created_by: "system",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "random",
    description: "Random topics",
    created_by: "system",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "introductions",
    description: "Introduce yourself",
    created_by: "system",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
];

interface ChannelListProps {
  selectedChannelId: number;
  onChannelSelect: (channelId: number) => void;
}

export const ChannelList = ({
  selectedChannelId,
  onChannelSelect,
}: ChannelListProps) => {
  const { toast } = useToast();
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [newChannelName, setNewChannelName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddChannel = () => {
    if (!newChannelName.trim()) return;

    const newChannel: Channel = {
      id: channels.length + 1,
      name: newChannelName.trim(),
      description: isPrivate ? "Private channel" : "Public channel",
      created_by: "user",
      created_at: new Date(),
      updated_at: new Date(),
    };

    setChannels([...channels, newChannel]);
    setNewChannelName("");
    setIsPrivate(false);
    setIsOpen(false);
    
    toast({
      title: "Channel created",
      description: `Created #${newChannel.name}`,
    });
  };

  const handleChannelSelect = (channelId: number) => {
    onChannelSelect(channelId);
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between px-4 mb-2">
        <h2 className="text-sm font-semibold text-white/60 uppercase">
          Channels
        </h2>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-white/10 text-white/60"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-72 bg-black/30 backdrop-blur-md border-white/10 text-white"
            sideOffset={5}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="channel-name" className="text-white/60">Channel name</Label>
                <Input
                  id="channel-name"
                  placeholder="new-channel"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddChannel();
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="private"
                  checked={isPrivate}
                  onCheckedChange={(checked) => setIsPrivate(checked as boolean)}
                  className="border-white/30 data-[state=checked]:bg-white/20 data-[state=checked]:border-white/50"
                />
                <Label htmlFor="private" className="text-white/60">
                  Private channel
                </Label>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <ul className="space-y-1">
        {channels.map((channel) => (
          <li key={channel.id}>
            <button
              className={`w-full px-4 py-1.5 text-left text-sm hover:bg-white/10 transition-colors rounded-md ${
                selectedChannelId === channel.id
                  ? "bg-white/10 text-white"
                  : "text-white/80"
              }`}
              onClick={() => handleChannelSelect(channel.id)}
            >
              # {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};