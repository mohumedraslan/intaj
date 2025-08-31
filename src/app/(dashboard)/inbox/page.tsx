import { Suspense } from 'react';
import { ConversationList } from '@/components/inbox/ConversationList';
import { ChatPanel } from '@/components/inbox/ChatPanel';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function InboxPage({
  searchParams,
}: {
  searchParams: { conversationId?: string };
}) {
  const { conversationId } = searchParams;

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <Card className="h-full flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/3 xl:w-1/4 border-b lg:border-b-0 lg:border-r">
          <Suspense fallback={<ConversationListSkeleton />}>
            <ConversationList selectedConversationId={conversationId} />
          </Suspense>
        </div>
        <div className="flex-1 flex flex-col">
          {conversationId ? (
            <Suspense key={conversationId} fallback={<ChatPanelSkeleton />}>
              <ChatPanel conversationId={conversationId} />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center bg-muted/50">
              <p className="text-muted-foreground">
                Select a conversation to start messaging
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function ConversationListSkeleton() {
  return (
    <div className="p-4 space-y-3">
      <Skeleton className="h-8 w-full" />
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatPanelSkeleton() {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="flex-1 space-y-4">
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="h-16 w-3/4 ml-auto" />
        <Skeleton className="h-10 w-1/2" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}
