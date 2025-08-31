import { createClient } from '@/lib/supabase/server';
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { sendHumanReply } from '@/app/(dashboard)/actions';
import { cn } from '@/lib/utils';

async function getConversationDetails(conversationId: string, userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      id,
      customer_identifier,
      messages ( id, role, content, created_at )
    `)
    .eq('id', conversationId)
    .eq('user_id', userId)
    .order('created_at', { referencedTable: 'messages', ascending: true })
    .single();

  if (error) {
    console.error('Error fetching conversation:', error);
    return null;
  }
  return data;
}

export async function ChatPanel({ conversationId }: { conversationId: string }) {
  const { user } = await getSession();
  if (!user) {
    return redirect('/login');
  }

  const conversation = await getConversationDetails(conversationId, user.id);

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Conversation not found or access denied.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center gap-4 p-4 border-b bg-muted/50">
        <Avatar>
          <AvatarFallback>{conversation.customer_identifier?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{conversation.customer_identifier || 'Unknown User'}</h2>
          <p className="text-sm text-muted-foreground">Active conversation</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            )}
          >
            {message.role === 'assistant' && (
              <Avatar className="w-8 h-8">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                'p-3 rounded-lg max-w-xs lg:max-w-md',
                message.role === 'assistant'
                  ? 'bg-muted'
                  : 'bg-primary text-primary-foreground'
              )}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs text-right mt-1 opacity-70">
                {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
             {message.role !== 'assistant' && (
              <Avatar className="w-8 h-8">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </main>

      <footer className="p-4 border-t bg-muted/50">
        <form action={sendHumanReply}>
          <div className="relative">
            <input type="hidden" name="conversationId" value={conversationId} />
            <Textarea
              name="content"
              placeholder="Type your reply as a human..."
              className="pr-20"
              rows={2}
              required
            />
            <Button type="submit" size="icon" className="absolute top-1/2 right-3 -translate-y-1/2">
              <Send className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
}
