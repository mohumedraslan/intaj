import { Suspense } from 'react';
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, MessageSquare, Settings, Bot } from 'lucide-react';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const categoryColors: { [key: string]: string } = {
  Support: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
  Sales: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
  Marketing: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
  Content: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
  Default: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200',
};

async function AgentsList() {
  const { user } = await getSession();
  if (!user) {
    redirect('/login');
  }

  const supabase = await createClient();
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
          <p className="text-muted-foreground">Your collection of AI assistants, organized by category.</p>
        </div>
        <Link href="/agents/create">
          <Button size="lg">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Agent
          </Button>
        </Link>
      </div>

      {agents && agents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {agents.map((agent: any) => (
            <Card key={agent.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <Badge className={cn(categoryColors[agent.category] || categoryColors.Default)}>
                        {agent.category || 'General'}
                    </Badge>
                </div>
                <CardDescription>
                  Created on: {new Date(agent.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                <div className="flex flex-wrap gap-2">
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
                </div>
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
            Agents are AI assistants you can train on your data. Get started by choosing a category.
          </p>
          <Link href="/agents/create">
            <Button className="mt-4" size="lg">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Agent
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
