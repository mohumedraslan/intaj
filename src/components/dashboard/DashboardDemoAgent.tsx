'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot } from 'lucide-react';
import { getDashboardDemoResponse } from '@/app/(dashboard)/actions';
import { type Message } from '@/lib/types';

export function DashboardDemoAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Welcome to your dashboard! I'm a demo agent. Ask me how to get started or what you can build." 
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
      const result = await getDashboardDemoResponse({ history: [...messages, userMessage] });
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.response || "An error occurred."
      };
      setMessages(prev => [...prev, assistantMessage]);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-lg border border-border">
      <div className="p-4 border-b border-border bg-muted/50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Dashboard Demo Agent</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Ask me anything about getting started with Intaj!
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          <button
            onClick={() => setInput("How do I create my first agent?")}
            className="text-xs bg-primary/20 text-primary px-2 py-1 rounded hover:bg-primary/30 transition-colors"
          >
            How do I create my first agent?
          </button>
          <button
            onClick={() => setInput("What can I do with Intaj?")}
            className="text-xs bg-primary/20 text-primary px-2 py-1 rounded hover:bg-primary/30 transition-colors"
          >
            What can I do with Intaj?
          </button>
          <button
            onClick={() => setInput("How do I connect to social media?")}
            className="text-xs bg-primary/20 text-primary px-2 py-1 rounded hover:bg-primary/30 transition-colors"
          >
            How do I connect to social media?
          </button>
        </div>
      </div>
      
      <div className="h-64 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        
        {isPending && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">Intaj AI is thinking...</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-border bg-muted/50 rounded-b-lg">
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
