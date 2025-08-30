// src/components/landing/PublicChatInterface.tsx
'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { getPublicAiResponse } from '@/app/actions'; // This will be a new, public server action
import { type Message } from '@/lib/types';

export function PublicChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant' as const,
      content: "Hello! I'm a demo chatbot powered by Intaj. Ask me anything about our platform!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const result = await getPublicAiResponse({ history: [...messages, userMessage] });
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.response || "An error occurred."
      };
      setMessages(prev => [...prev, assistantMessage]);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border">
      <div className="p-4 border-b bg-gray-50 rounded-t-lg">
        <h3 className="font-semibold text-gray-900">Intaj Demo Bot</h3>
        <p className="text-sm text-gray-600">Ask me about our AI chatbot platform!</p>
        <div className="mt-2 flex flex-wrap gap-1">
          <button
            onClick={() => setInput("What can Intaj do?")}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
          >
            What can Intaj do?
          </button>
          <button
            onClick={() => setInput("How much does it cost?")}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
          >
            How much does it cost?
          </button>
          <button
            onClick={() => setInput("How do I get started?")}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
          >
            How do I get started?
          </button>
        </div>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        
        {isPending && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">Intaj AI is thinking...</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isPending && handleSendMessage()}
            placeholder="Ask a question..."
            disabled={isPending}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isPending || !input.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
