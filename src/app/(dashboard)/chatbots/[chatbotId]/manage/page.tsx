// src/app/(dashboard)/chatbots/[chatbotId]/manage/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/app/auth/actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, HelpCircle } from 'lucide-react'
import { KnowledgeBaseManager } from '@/components/dashboard/KnowledgeBaseManager'
import { FaqManager } from '@/components/dashboard/FaqManager'

export default async function ManageChatbotPage({ params }: { params: { chatbotId: string } }) {
  const { user } = await getSession()
  if (!user) redirect('/login')

  const supabase = await createClient()
  const { data: chatbot, error } = await supabase
    .from('chatbots')
    .select('id, name')
    .eq('id', params.chatbotId)
    .eq('user_id', (user as any).id)
    .single()

  if (error || !chatbot) notFound()

  const { data: dataSources } = await supabase
    .from('data_sources')
    .select('*')
    .eq('chatbot_id', chatbot.id)

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('chatbot_id', chatbot.id)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Manage: {chatbot.name}</h1>
        <p className="text-sm text-muted-foreground">
          Add knowledge to your chatbot by uploading files or adding FAQs.
        </p>
      </div>

      <Tabs defaultValue="kb">
        <TabsList>
          <TabsTrigger value="kb">
            <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4" /> Knowledge Base</span>
          </TabsTrigger>
          <TabsTrigger value="faqs">
            <span className="inline-flex items-center gap-2"><HelpCircle className="h-4 w-4" /> FAQs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kb">
          <KnowledgeBaseManager chatbotId={chatbot.id} initialDataSources={(dataSources ?? []) as any} />
        </TabsContent>
        <TabsContent value="faqs">
          <FaqManager chatbotId={chatbot.id} initialFaqs={(faqs ?? []) as any} />
        </TabsContent>
      </Tabs>
    </div>
  )
}


