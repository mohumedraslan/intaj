import { ConversationList } from '@/components/inbox/ConversationList';
import { ChatPanel } from '@/components/inbox/ChatPanel';

export default function InboxPage({ searchParams }: { searchParams: { conversationId?: string } }) {
  const { conversationId } = searchParams;
  return (
    <div className="flex h-full">
      <aside className="w-80 border-r">
        <ConversationList />
      </aside>
      <main className="flex-1">
        {conversationId ? (
          <ChatPanel conversationId={conversationId} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a conversation to view
          </div>
        )}
      </main>
    </div>
  );
}
