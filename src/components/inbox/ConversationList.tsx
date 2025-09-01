import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export async function ConversationList({ selectedConversationId }: { selectedConversationId?: string }) {
  const { user } = await getSession();
  if (!user) {
    return redirect('/login');
  }

  const supabase = await createClient();
  const { data: conversations, error } = await supabase
    .from('conversations')
    .select(`
      id,
      customer_identifier,
      last_message_at,
      messages ( content, created_at )
    `)
    .eq('user_id', user.id)
    .order('last_message_at', { ascending: false });

  if (error) {
    return <p className="p-4 text-red-500">Error loading conversations: {error.message}</p>;
  }

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="border-b">
        <CardTitle>Inbox</CardTitle>
        <CardDescription>All active conversations.</CardDescription>
      </CardHeader>
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No conversations yet.
          </div>
        ) : (
          <nav className="p-2">
            {conversations.map((conv) => {
              const lastMessage = conv.messages[0];
              return (
                <Link
                  key={conv.id}
                  href={`/inbox?conversationId=${conv.id}`}
                  className={cn(
                    'block p-3 rounded-lg transition-colors',
                    selectedConversationId === conv.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  <div className="flex justify-between items-start">
                    <p className="font-semibold truncate">{conv.customer_identifier || 'Unknown User'}</p>
                    <time className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(conv.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </time>
                  </div>
                  <p className={cn(
                    'text-sm truncate',
                    selectedConversationId === conv.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  )}>
                    {lastMessage?.content || 'No messages yet...'}
                  </p>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
}
