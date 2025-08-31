-- Previous updates for messages table and feedback
-- Create a table to log all messages for analytics
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chatbot_id UUID NOT NULL REFERENCES public.chatbots(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role public.message_role NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create the message_role ENUM type if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'message_role') THEN
    CREATE TYPE public.message_role AS ENUM ('user', 'assistant', 'system');
  END IF;
END$$;

-- Add the 'role' column with the new type (if you ran the table creation first)
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS role public.message_role;

-- Enable RLS for the new table
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for messages
-- Users can only access messages related to their own chatbots
CREATE POLICY "Allow users to manage messages for their own chatbots" ON public.messages FOR ALL USING (auth.uid() = user_id);

-- Create an ENUM type for feedback status
CREATE TYPE public.feedback_status AS ENUM ('good', 'bad');

-- Add the new feedback column to the messages table
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS feedback public.feedback_status;

-- NEW: Platform Connections Schema
-- Create an ENUM type for supported platforms
CREATE TYPE public.platform_name AS ENUM ('WhatsApp', 'Facebook', 'Instagram', 'Website');

-- Create the connections table
CREATE TABLE IF NOT EXISTS public.connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform public.platform_name NOT NULL,
  display_name TEXT NOT NULL, -- e.g., "My Business WhatsApp" or "Main FB Page"
  credentials JSONB, -- To store encrypted tokens, API keys, etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add a new column to the chatbots table to link it to a connection
ALTER TABLE public.chatbots ADD COLUMN IF NOT EXISTS connection_id UUID REFERENCES public.connections(id) ON DELETE SET NULL;

-- Add model selection column to chatbots
ALTER TABLE public.chatbots ADD COLUMN IF NOT EXISTS model TEXT;

-- Enable RLS for the new table
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for connections
CREATE POLICY "Allow users to manage their own connections" ON public.connections FOR ALL USING (auth.uid() = user_id);


-- CONVERSATIONS & INBOX SCHEMA --

-- Add a conversation_id to group messages
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS conversation_id UUID;

-- Create a new table to manage conversations
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  connection_id UUID REFERENCES public.connections(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active', -- e.g., 'active', 'resolved', 'handoff'
  last_message_at TIMESTAMPTZ DEFAULT now(),
  customer_identifier TEXT -- e.g., phone number, user ID
);

-- Add RLS policies for conversations
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to manage their own conversations" ON public.conversations;
CREATE POLICY "Allow users to manage their own conversations"
  ON public.conversations FOR ALL
  USING (auth.uid() = user_id);

-- Update the messages table to link to conversations
ALTER TABLE public.messages
  DROP CONSTRAINT IF EXISTS messages_conversation_id_fkey,
  ADD CONSTRAINT messages_conversation_id_fkey
  FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;
