// src/components/dashboard/RecentConversations.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { type Message } from "@/lib/types";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { submitMessageFeedback } from "@/app/(dashboard)/actions";
import { toast } from "sonner";

interface RecentConversationsProps {
  initialMessages: Message[];
}

export function RecentConversations({ initialMessages }: RecentConversationsProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [isPending, startTransition] = useTransition();

  const handleFeedback = (messageId: string, feedback: 'good' | 'bad') => {
    startTransition(async () => {
      await submitMessageFeedback({ messageId, feedback });
      // Optimistically update the UI
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, feedback } : m));
      toast.success("Thank you for your feedback!");
    });
  };

  if (messages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>
            Review the latest interactions and provide feedback to improve your AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600">No conversations yet.</p>
            <p className="text-sm text-gray-500 mt-1">
              Have a test chat with your bot to see the history here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Conversations</CardTitle>
        <CardDescription>
          Review the latest interactions and provide feedback to improve your AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 uppercase">
                  {msg.role}
                </span>
                {msg.feedback && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    msg.feedback === 'good' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {msg.feedback === 'good' ? '👍 Good' : '👎 Bad'}
                  </span>
                )}
              </div>
              
              <p className="text-gray-900">{msg.content}</p>
              
              {msg.role === 'assistant' && !msg.feedback && (
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback(msg.id!, 'good')}
                    disabled={isPending}
                    className="text-green-600 hover:text-green-700"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Good
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback(msg.id!, 'bad')}
                    disabled={isPending}
                    className="text-red-600 hover:text-red-700"
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Bad
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
