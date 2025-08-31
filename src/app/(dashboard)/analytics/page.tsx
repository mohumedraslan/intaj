// src/app/(dashboard)/analytics/page.tsx
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, TrendingUp, Users, MessageSquare } from 'lucide-react';

export default async function AnalyticsPage() {
  const { user } = await getSession();
  if (!user) redirect('/login');

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Overall Analytics</h1>
        <p className="text-muted-foreground">
          Track your AI agents&apos; performance across all platforms
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text">Coming Soon</div>
            <p className="text-xs text-muted">
              Track conversation volume
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text">Coming Soon</div>
            <p className="text-xs text-muted">
              Monitor user engagement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text">Coming Soon</div>
            <p className="text-xs text-muted">
              Average response time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Usage</CardTitle>
            <BarChart className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text">Coming Soon</div>
            <p className="text-xs text-muted">
              Cross-platform analytics
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Analytics Coming Soon
            </h3>
            <p className="text-muted-foreground">
              We&apos;re building comprehensive analytics to help you track your AI agents&apos; performance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
