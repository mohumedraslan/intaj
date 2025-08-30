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
