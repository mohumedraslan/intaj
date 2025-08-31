// This component will take a `conversationId` prop.
// It will fetch all messages from the `messages` table where `conversation_id` matches.
// It will display the messages in a chat interface, similar to our other chat components.
// At the bottom, it will have an <textarea /> and a "Send as Human" button that calls a new server action, sendHumanReply.

import { useState } from 'react';

export function ChatPanel({ conversationId }: { conversationId: string }) {
  const [message, setMessage] = useState('');
  // TODO: Fetch messages from Supabase
  // TODO: Implement sendHumanReply action

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Placeholder for messages */}
        <div className="mb-2">AI: Hello! How can I help you?</div>
        <div className="mb-2">User: I need help with my order.</div>
      </div>
      <form className="p-4 border-t flex gap-2" onSubmit={e => { e.preventDefault(); /* TODO: sendHumanReply */ }}>
        <textarea
          className="flex-1 border rounded p-2"
          rows={2}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your reply..."
        />
        <button type="submit" className="btn btn-primary">Send as Human</button>
      </form>
    </div>
  );
}
