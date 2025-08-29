// src/app/(dashboard)/dashboard/page.tsx
import { getSession } from '@/app/auth/actions'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusCircle, MessageSquare } from 'lucide-react'

export default async function DashboardPage() {
  const { user } = await getSession()
  if (!user) {
    redirect('/login')
  }

  const supabase = await createClient()
  const { data: chatbots, error } = await supabase
    .from('chatbots')
    .select('*')
    .eq('user_id', (user as any).id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Chatbots</h1>
          <p className="text-sm text-muted-foreground">Your AI Assistants</p>
        </div>
        <Button asChild>
          <Link href="/chatbots/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Chatbot
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your AI Assistants</CardTitle>
          <CardDescription>Select a chatbot to test and manage it.</CardDescription>
        </CardHeader>
        <CardContent>
          {chatbots && chatbots.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chatbots.map((bot: any) => (
                <Card key={bot.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{bot.name}</CardTitle>
                    <CardDescription>
                      Created on: {new Date(bot.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="secondary">
                      <Link href={`/chatbots/${bot.id}`}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p>You haven't created any chatbots yet.</p>
              <Button asChild>
                <Link href="/chatbots/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Chatbot
                </Link>
              </Button>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600">Error loading chatbots: {error.message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


