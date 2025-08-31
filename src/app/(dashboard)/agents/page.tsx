// src/app/(dashboard)/agents/page.tsx
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, MessageSquare, Settings, BarChart } from 'lucide-react';

export default async function AgentsPage() {
  const { user } = await getSession();
  if (!user) {
    redirect('/login');
  }

  const supabase = await createClient();
  const { data: agents, error } = await supabase
    .from('chatbots')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My AI Agents</h1>
          <p className="text-lg text-muted-foreground">
            Manage and interact with your intelligent AI assistants
          </p>
        </div>
        <Link href="/agents/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Agent
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your AI Agents</CardTitle>
          <CardDescription>Select an agent to test, manage its knowledge, and view analytics.</CardDescription>
        </CardHeader>
        <CardContent>
          {agents && agents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => (
                <Card key={agent.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{agent.name}</CardTitle>
                    <CardDescription>
                      Created on: {new Date(agent.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-2">
                    <Link href={`/agents/${agent.id}`}>
                      <Button variant="secondary" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                    </Link>
                    <Link href={`/agents/${agent.id}/analytics`}>
                      <Button variant="outline" size="sm">
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    </Link>
                    <Link href={`/agents/${agent.id}/manage`}>
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
            <div className="text-center space-y-4 py-8">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No agents yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Create your first AI agent to start building intelligent conversations and providing value to your users.
              </p>
              <Link href="/agents/create">
                <Button className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Agent
                </Button>
              </Link>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-destructive">Error loading agents: {error.message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
