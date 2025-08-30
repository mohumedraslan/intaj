-- Create an ENUM type for feedback status
CREATE TYPE public.feedback_status AS ENUM ('good', 'bad');

-- Add the new feedback column to the messages table
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS feedback public.feedback_status;
