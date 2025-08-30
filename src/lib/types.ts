// src/lib/types.ts

// The user object, combining Supabase Auth and our profiles table
export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string | null;
  role?: 'user' | 'admin' | null;
  status?: 'pending_approval' | 'approved' | 'rejected' | null;
  // Stripe fields
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  stripe_price_id?: string | null;
  subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | null;
}

// The chatbot object
export interface Chatbot {
  id: string;
  user_id: string;
  name: string;
  initial_prompt: string | null;
  created_at: string;
  updated_at: string | null;
}

// A conversation message
export interface Message {
  id?: string; // Messages from the DB will have an ID
  role: 'user' | 'assistant' | 'system';
  content: string;
  feedback?: 'good' | 'bad' | null; // Feedback is optional
}

// Platform connection
export interface Connection {
  id: string;
  user_id: string;
  platform: 'WhatsApp' | 'Facebook' | 'Instagram' | 'Website';
  display_name: string;
  credentials?: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
}

// Update Chatbot interface to include connection and model
export interface Chatbot {
  id: string;
  user_id: string;
  name: string;
  initial_prompt: string | null;
  connection_id?: string | null;
  model?: string | null;
  created_at: string;
  updated_at: string | null;
}

// FAQ object
export interface Faq {
  id: string;
  chatbot_id: string;
  user_id: string;
  question: string;
  answer: string;
  created_at: string;
}

// Data source object
export interface DataSource {
  id: string;
  chatbot_id: string;
  user_id: string;
  file_name: string;
  status: 'pending' | 'processed' | 'failed';
  created_at: string;
}


