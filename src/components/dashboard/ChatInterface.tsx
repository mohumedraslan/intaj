// src/components/dashboard/ChatInterface.tsx
'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { getAiResponse } from '@/app/(dashboard)/actions'
import type { Chatbot } from '@/lib/types'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatInterface({ chatbot }: { chatbot: Chatbot }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isPending, startTransition] = useTransition()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return
    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    startTransition(async () => {
      const result = await getAiResponse({
        chatbotId: chatbot.id, // <-- ADD THIS LINE
        prompt: chatbot.initial_prompt || 'You are a helpful assistant.',
        history: [...messages, userMessage],
      })
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.response || 'An error occurred.',
      }
      setMessages((prev) => [...prev, assistantMessage])
    })
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-md border">
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === 'user'
                ? 'ml-auto max-w-[80%] rounded-lg bg-primary px-3 py-2 text-primary-foreground'
                : 'mr-auto max-w-[80%] rounded-lg bg-muted px-3 py-2'
            }
          >
            {msg.content}
          </div>
        ))}
        {isPending && (
          <div className="mr-auto max-w-[80%] rounded-lg bg-muted px-3 py-2 text-muted-foreground">
            Assistant is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2 border-t p-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isPending && handleSendMessage()}
          placeholder="Type your message to test the bot..."
          disabled={isPending}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={isPending || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}


