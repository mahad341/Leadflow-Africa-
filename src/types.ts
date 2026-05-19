export type Role = "admin" | "agent" | "viewer";
export type LeadStage = "new" | "contacted" | "interested" | "negotiation" | "paid" | "closed" | "lost";
export type MessageSenderType = "customer" | "agent" | "system";
export type MessageType = "text" | "image" | "document" | "audio" | "location";

export interface Organization {
  id: string;
  name: string;
  industry: string;
  subscriptionPlan: "free" | "pro" | "enterprise";
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: Role;
  organizationId: string;
}

export interface Customer {
  id: string;
  phone: string;
  name: string;
  organizationId: string;
  labels: string[];
  notes?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  customerId: string;
  organizationId: string;
  stage: LeadStage;
  score: number;
  value: number;
  currency: string;
  assignedTo?: string;
  aiSummary?: string;
  lastActivityAt: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderType: MessageSenderType;
  senderId: string;
  content: string;
  type: MessageType;
  status: "sent" | "delivered" | "read" | "failed";
  isAiGenerated?: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  customerId: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  status: "active" | "archived";
}
