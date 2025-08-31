// src/app/(dashboard)/chatbots/[chatbotId]/analytics/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/app/auth/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users } from 'lucide-react';
import { RecentConversations } from '@/components/dashboard/RecentConversations';

export default async function AnalyticsPage({ 
  params 
}: { 
  params: { chatbotId: string };
}) {
  const { user } = await getSession();
  if (!user) redirect('/login');

  const supabase = await createClient();

  // Fetch chatbot name
  const { data: chatbot } = await supabase
    .from('chatbots')
    .select('name')
    .eq('id', params.chatbotId)
    .eq('user_id', user.id)
    .single();

  if (!chatbot) notFound();

  // Fetch analytics data
  const { count: totalMessages, error: messagesError } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('chatbot_id', params.chatbotId);

  // To get unique conversations, we can count distinct session IDs in the future.
  // For now, we'll just show a placeholder.
  const totalConversations = 'N/A'; // Placeholder for now

  // NEW: Fetch the last 20 messages for this chatbot
  const { data: recentMessages } = await supabase
    .from('messages')
    .select('*')
    .eq('chatbot_id', params.chatbotId)
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics: {chatbot.name}</h1>
        <p className="text-sm text-muted-foreground">
          An overview of your agent&apos;s performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {messagesError ? 'Error' : totalMessages ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Total messages exchanged with this agent.
            </p>
            {totalMessages === 0 && (
              <p className="text-xs text-blue-600 mt-2">
                💡 Have a test conversation with your agent to see messages appear here.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversations}</div>
            <p className="text-xs text-muted-foreground">
              (Feature coming soon)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* NEW: Recent Conversations Section */}
      <RecentConversations initialMessages={recentMessages || []} />
    </div>
  );
}
