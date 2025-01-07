import { useState, useRef } from "react";
import { Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { FileAttachment } from "@/types/file";

interface MessageInputProps {
  channelId: number;
}

export const MessageInput = ({ channelId }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;
    
    // Add the message using the function we exposed on the window
    (window as any).addMessage(message.trim(), channelId, attachments);
    
    toast({
      title: "Message sent",
      description: `Message sent to channel #${channelId}`,
    });
    
    setMessage("");
    setAttachments([]);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert FileList to array and create FileAttachment objects
    const newAttachments: FileAttachment[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size,
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    toast({
      title: "Files added",
      description: `${files.length} file(s) ready to upload`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/30 backdrop-blur-md">
      {attachments.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {attachments.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-2 bg-white/5 rounded px-2 py-1 text-sm text-white/80"
            >
              <span>{file.name}</span>
              <button
                type="button"
                className="text-white/60 hover:text-white/80"
                onClick={() => setAttachments(prev => prev.filter(f => f.id !== file.id))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hover:bg-white/10 text-white/80 transition-colors"
          onClick={handleFileUpload}
        >
          <Upload className="h-5 w-5" />
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-white/5 border-white/10 text-white/90 placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-white/20"
        />
        <Button type="submit" size="icon" className="bg-white/10 hover:bg-white/20 text-white/90">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};