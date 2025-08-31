import { Suspense } from 'react';
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, MessageSquare, Settings, BarChart, Bot } from 'lucide-react';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';

async function AgentsList() {
  const { user } = await getSession();
  if (!user) {
    redirect('/login');
  }

  const supabase = await createClient();
  // Note: The prompt implies an 'agents' table.
  // The existing dashboard used 'chatbots'. We will use 'agents' here as per the new requirements.
  const { data: agents, error } = await supabase
    .from('agents')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Agents</h1>
          <p className="text-muted-foreground">Your collection of AI assistants.</p>
        </div>
        <Link href="/agents/templates">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Agent
          </Button>
        </Link>
      </div>

      {agents && agents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent: any) => (
            <Card key={agent.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bot className="w-6 h-6 text-muted-foreground" />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <CardDescription>
                      Created on: {new Date(agent.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                 <Link href={`/agents/${agent.id}/chat`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  </Link>
                  <Link href={`/agents/${agent.id}/manage`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center space-y-4 py-16 border-2 border-dashed rounded-lg">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <Bot className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">You haven't created any agents yet.</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Agents are AI assistants you can train on your data. Get started by choosing a template.
          </p>
          <Link href="/agents/templates">
            <Button className="mt-4" size="lg">
              <PlusCircle className="mr-2 h-4 w-4" />
              Browse Templates
            </Button>
          </Link>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-destructive">Error loading agents: {error.message}</p>
      )}
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Suspense fallback={<DashboardSkeleton />}>
        <AgentsList />
      </Suspense>
    </div>
  );
}
