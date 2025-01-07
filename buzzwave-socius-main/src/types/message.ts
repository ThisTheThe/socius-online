import type { FileAttachment } from "./file";

export interface Message {
  id: number;
  content: string;
  sender_id: string;
  channel_id: number;
  created_at: Date;
  updated_at: Date;
  attachments?: FileAttachment[];
}