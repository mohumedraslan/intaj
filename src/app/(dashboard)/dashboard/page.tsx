// src/app/(dashboard)/dashboard/page.tsx
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, MessageSquare, Settings, BarChart } from 'lucide-react';

export default async function DashboardPage() {
  const { user } = await getSession();
  if (!user) {
    redirect('/login');
  }

  const supabase = await createClient();
  const { data: chatbots, error } = await supabase
    .from('chatbots')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Chatbots</h1>
          <p className="text-sm text-muted-foreground">Your AI Assistants</p>
        </div>
        <Link href="/chatbots/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Chatbot
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your AI Assistants</CardTitle>
          <CardDescription>Select a chatbot to test, manage its knowledge, and view analytics.</CardDescription>
        </CardHeader>
        <CardContent>
          {chatbots && chatbots.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chatbots.map((bot) => (
                <Card key={bot.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{bot.name}</CardTitle>
                    <CardDescription>
                      Created on: {new Date(bot.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-2">
                    <Link href={`/chatbots/${bot.id}`}>
                      <Button variant="secondary" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                    </Link>
                    <Link href={`/chatbots/${bot.id}/analytics`}>
                      <Button variant="outline" size="sm">
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    </Link>
                    <Link href={`/chatbots/${bot.id}/manage`}>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p>You haven&apos;t created any chatbots yet.</p>
              <Link href="/chatbots/create">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Chatbot
                </Button>
              </Link>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600">Error loading chatbots: {error.message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


