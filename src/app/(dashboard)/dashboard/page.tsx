// src/app/(dashboard)/dashboard/page.tsx
import { Suspense } from 'react';
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, MessageSquare, Settings, BarChart } from 'lucide-react';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { OnboardingGuide } from '@/components/dashboard/OnboardingGuide';
import { DashboardDemoAgent } from '@/components/dashboard/DashboardDemoAgent';
import { AiNewsFeed } from '@/components/dashboard/AiNewsFeed';
import { SuccessStories } from '@/components/dashboard/SuccessStories';
import { ConsultingServices } from '@/components/dashboard/ConsultingServices';

// Create a new async component for the main content
async function DashboardContent() {
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
      {/* NEW: Display the onboarding guide */}
      <OnboardingGuide chatbotCount={chatbots?.length ?? 0} />
      
      {/* NEW: Dashboard Demo Agent */}
      <DashboardDemoAgent />
      
      {/* Dynamic Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AiNewsFeed />
        </div>
        <div>
          <SuccessStories />
        </div>
      </div>
      
      {/* Consulting Services */}
      <ConsultingServices />
      
      <div className="flex items-center justify-between">
        <div>
                  <h1 className="text-2xl font-bold">My Agents</h1>
        <p className="text-sm text-muted-foreground">Your AI Assistants</p>
        </div>
        {/* Only show the create button here if they are past the onboarding */}
        {(chatbots?.length ?? 0) > 0 && (
          <div className="flex gap-3">
            <Link href="/agents/create">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Agent
              </Button>
            </Link>
            <Button variant="outline" disabled>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Automation (Coming Soon)
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
                  <CardTitle>Your AI Agents</CardTitle>
        <CardDescription>Select an agent to test, manage its knowledge, and view analytics.</CardDescription>
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
                    <Link href={`/agents/${bot.id}`}>
                      <Button variant="secondary" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                    </Link>
                    <Link href={`/agents/${bot.id}/analytics`}>
                      <Button variant="outline" size="sm">
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    </Link>
                    <Link href={`/agents/${bot.id}/manage`}>
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
                <MessageSquare className="w-12 h-12 text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No agents yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Create your first AI agent to start building intelligent conversations and providing value to your users.
              </p>
              <Link href="/agents/create">
                <Button className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First AI Agent
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

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}


