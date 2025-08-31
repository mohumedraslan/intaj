// src/app/(dashboard)/agents/[agentId]/manage/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/app/auth/actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, HelpCircle, BarChart, Link as LinkIcon, Cpu } from 'lucide-react'
import { KnowledgeBaseManager } from '@/components/dashboard/KnowledgeBaseManager'
import { FaqManager } from '@/components/dashboard/FaqManager'
import { type DataSource, type Faq } from '@/lib/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { assignChatbotToConnection, updateChatbotModel } from '@/app/(dashboard)/actions'

export default async function ManageAgentPage({ 
  params 
}: { 
  params: { agentId: string };
}) {
  const { user } = await getSession()
  if (!user) redirect('/login')

  const supabase = await createClient()
  const { data: agent, error } = await supabase
    .from('chatbots')
    .select('id, name')
    .eq('id', params.agentId)
    .eq('user_id', user.id)
    .single()

  if (error || !agent) notFound()

  const { data: dataSources } = await supabase
    .from('data_sources')
    .select('*')
    .eq('chatbot_id', agent.id)

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('chatbot_id', agent.id)

  // Fetch connections for platform assignment
  const { data: connections } = await supabase
    .from('connections')
    .select('id, display_name, platform')
    .eq('user_id', user.id)
    .eq('is_active', true)

  // Fetch current agent data including connection and model
  const { data: agentData } = await supabase
    .from('chatbots')
    .select('connection_id, model')
    .eq('id', agent.id)
    .single()

  const availableModels = [
    { id: "mistralai/mistral-7b-instruct:free", name: "Mistral 7B (Free)" },
    { id: "openai/gpt-3.5-turbo", name: "OpenAI GPT-3.5 Turbo" },
    { id: "google/gemini-pro", name: "Google Gemini Pro" },
    { id: "anthropic/claude-3-haiku", name: "Anthropic Claude 3 Haiku" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage: {agent.name}</h1>
          <p className="text-sm text-muted-foreground">
            Add knowledge to your agent by uploading files or adding FAQs.
          </p>
        </div>
        <Link href={`/agents/${agent.id}/analytics`}>
          <Button variant="outline" size="sm">
            <BarChart className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </Link>
      </div>

      {/* Platform Connection Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Assign to Platform
          </CardTitle>
          <CardDescription>
            Connect this agent to one of your platforms to make it live.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={assignChatbotToConnection} className="space-y-4">
            <input type="hidden" name="chatbotId" value={agent.id} />
            <div className="space-y-2">
              <Label htmlFor="connection">Select a Connection</Label>
              <Select name="connectionId" defaultValue={agentData?.connection_id || 'null'}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a platform connection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">No Platform (Test Mode)</SelectItem>
                  {connections?.map((conn) => (
                    <SelectItem key={conn.id} value={conn.id}>
                      {conn.display_name} ({conn.platform})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" size="sm">
              Save Connection
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* AI Model Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            AI Model Configuration
          </CardTitle>
          <CardDescription>
            Choose which AI model powers your agent&apos;s responses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateChatbotModel} className="space-y-4">
            <input type="hidden" name="chatbotId" value={agent.id} />
            <div className="space-y-2">
              <Label htmlFor="model">Select AI Model</Label>
              <Select name="model" defaultValue={agentData?.model || availableModels[0].id}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an AI model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" size="sm">
              Update Model
            </Button>
          </form>
        </CardContent>
      </Card>

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
          <KnowledgeBaseManager chatbotId={agent.id} initialDataSources={(dataSources ?? []) as DataSource[]} />
        </TabsContent>
        <TabsContent value="faqs">
          <FaqManager chatbotId={agent.id} initialFaqs={(faqs ?? []) as Faq[]} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
