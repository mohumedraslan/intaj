// src/app/(dashboard)/chatbots/[chatbotId]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/app/auth/actions'
import ChatInterface from '@/components/dashboard/ChatInterface'
import type { Chatbot } from '@/lib/types'

export default async function ChatbotPage({ params }: { params: { chatbotId: string } }) {
  const { user } = await getSession()
  if (!user) {
    redirect('/login')
  }

  const supabase = await createClient()
  const { data: chatbot, error } = await supabase
    .from('chatbots')
    .select('*')
    .eq('id', params.chatbotId)
    .eq('user_id', user.id)
    .single()

  if (error || !chatbot) {
    notFound()
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{(chatbot as Chatbot).name}</h1>
        <p className="text-sm text-muted-foreground">Live testing environment</p>
      </div>
      <ChatInterface chatbot={chatbot as Chatbot} />
    </div>
  )
}


