// This server component will fetch conversations from the `conversations` table,
// ordered by `last_message_at`. It will render a list of <Link> components,
// each linking to `/inbox?conversationId={conv.id}`.
// Each list item should show the customer_identifier, a snippet of the last message, and the time.

export function ConversationList() {
  // TODO: Implement fetching from Supabase
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Conversations</h2>
      {/* Placeholder for conversation items */}
      <div className="space-y-2">
        {/* Example conversation item */}
        <a href="/inbox?conversationId=example-id" className="block p-3 rounded hover:bg-muted">
          <div className="font-medium">Customer #12345</div>
          <div className="text-sm text-muted-foreground">Last message snippet...</div>
          <div className="text-xs text-muted-foreground">2 min ago</div>
        </a>
      </div>
    </div>
  );
}
