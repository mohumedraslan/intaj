// src/app/(dashboard)/dashboard/page.tsx
import { Suspense } from 'react';
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  PlusCircle,
  MessageSquare,
  BarChart,
  Users,
  HelpCircle,
  Activity,
  TrendingUp
} from 'lucide-react';
import '@/app/dashboard.css';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { DashboardChart } from '@/components/dashboard/DashboardChart';

async function DashboardContent() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/login');
  }

  const supabase = await createClient();
  
  // Get chatbots
  const { data: chatbots, error: chatbotsError } = await supabase
    .from('chatbots')
    .select('id, name, message_count, created_at')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  // Analytics data
  const analyticsData = {
    conversations: {
      data: [120, 132, 101, 134, 90, 230, 210, 180, 160, 150, 140, 130],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    messages: {
      total: chatbots?.reduce((acc, bot) => acc + (bot.message_count || 0), 0) ?? 0,
      trend: { value: 12.5, isPositive: true },
    },
    activeUsers: {
      total: 1234,
      trend: { value: 8.2, isPositive: true },
    },
    responseRate: {
      total: 95.8,
      trend: { value: 3.1, isPositive: true },
    },
    activeAgents: {
      total: chatbots?.length ?? 0,
      trend: { value: chatbots?.length ? 100 : 0, isPositive: true },
    },
  };

  return (
    <div className="dashboard-container-inner">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-description">Overview of your AI agents and analytics</p>
        </div>
      </div>

      <div className="dashboard-card-grid">
        <StatsCard
          title="Total Conversations"
          value={analyticsData.messages.total.toString()}
          icon={<MessageSquare className="h-5 w-5" />}
          trend={{
            value: analyticsData.messages.trend.value,
            isPositive: analyticsData.messages.trend.isPositive,
            label: 'from last month',
          }}
        />
        <StatsCard
          title="Active Users"
          value={analyticsData.activeUsers.total.toString()}
          icon={<Users className="h-5 w-5" />}
          trend={{
            value: analyticsData.activeUsers.trend.value,
            isPositive: analyticsData.activeUsers.trend.isPositive,
            label: 'from last month',
          }}
        />
        <StatsCard
          title="Response Rate"
          value={`${analyticsData.responseRate.total}%`}
          icon={<Activity className="h-5 w-5" />}
          trend={{
            value: analyticsData.responseRate.trend.value,
            isPositive: analyticsData.responseRate.trend.isPositive,
            label: 'from last month',
          }}
        />
        <StatsCard
          title="Active Agents"
          value={analyticsData.activeAgents.total.toString()}
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{
            value: analyticsData.activeAgents.trend.value,
            isPositive: analyticsData.activeAgents.trend.isPositive,
            label: 'from last month',
          }}
        />
      </div>

      <div className="dashboard-card-grid-2">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title">Conversations Over Time</h3>
            <p className="text-sm text-muted-foreground">Monthly conversation volume</p>
          </div>
          <div className="dashboard-card-content">
            <DashboardChart
              data={analyticsData.conversations.data}
              labels={analyticsData.conversations.labels}
            />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title">Recent Conversations</h3>
            <p className="text-sm text-muted-foreground">Latest user interactions</p>
          </div>
          <div className="dashboard-card-content">
            <div className="space-y-4">
              {chatbots && chatbots.length > 0 ? (
                chatbots.slice(0, 5).map((bot) => (
                  <div key={bot.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{bot.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {bot.message_count ?? 0} messages
                        </p>
                      </div>
                    </div>
                    <Link href={`/agents/${bot.id}/manage`} className="text-sm text-primary hover:underline">
                      Manage
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No active agents found</p>
                  <Link href="/agents/templates" className="text-primary hover:underline mt-2 inline-block">
                    Create your first agent
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3 className="dashboard-card-title">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
          </div>
          <div className="dashboard-card-content">
            <div className="space-y-3">
              <Link href="/agents/templates" className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <PlusCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Create New Agent</p>
                  <p className="text-sm text-muted-foreground">Build a custom AI assistant</p>
                </div>
              </Link>
              
              <Link href="/analytics" className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">View Analytics</p>
                  <p className="text-sm text-muted-foreground">Track performance metrics</p>
                </div>
              </Link>
              
              <Link href="/help" className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Get Help</p>
                  <p className="text-sm text-muted-foreground">Support and documentation</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {chatbotsError && (
        <p className="text-sm text-destructive">Error loading agents: {chatbotsError.message}</p>
      )}
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