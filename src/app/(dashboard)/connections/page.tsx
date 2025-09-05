// src/app/(dashboard)/connections/page.tsx
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'lucide-react';
import { ConnectionList } from '@/components/dashboard/ConnectionList';
import { FacebookConnectionButton } from '@/components/dashboard/FacebookConnectionButton';

export default async function ConnectionsPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  // Convert searchParams to a regular object to avoid the error
  const params = {
    success: searchParams.success,
    error: searchParams.error
  };
  const { user } = await getSession();
  if (!user) redirect('/login');

  const supabase = await createClient();
  const { data: connections } = await supabase
    .from('connections')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      {/* Success/Error Messages */}
             {params.success && (
         <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
           <div className="flex">
             <div className="flex-shrink-0">
               <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
             </div>
             <div className="ml-3">
               <p className="text-sm font-medium text-primary">
                 Successfully connected to Facebook & Instagram!
               </p>
             </div>
           </div>
         </div>
       )}
      
             {params.error && (
         <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
           <div className="flex">
             <div className="flex-shrink-0">
               <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
               </svg>
             </div>
             <div className="ml-3">
               <p className="text-sm font-medium text-destructive">
                 Error: {searchParams.error}
               </p>
             </div>
           </div>
         </div>
       )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">Platform Connections</h1>
          <p className="text-lg text-muted">
            Connect your agents to external platforms
          </p>
        </div>
        <FacebookConnectionButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Your Connected Platforms
          </CardTitle>
          <CardDescription>
            Manage your connections here. Agents can be assigned to any active connection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConnectionList initialConnections={connections || []} />
        </CardContent>
      </Card>

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                1
              </div>
              <div>
                <h4 className="font-medium">Connect Your Platform</h4>
                <p className="text-sm text-muted-foreground">
                  Link your WhatsApp Business, Facebook Page, or website to Intaj
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                2
              </div>
              <div>
                              <h4 className="font-medium">Assign Your Agent</h4>
              <p className="text-sm text-muted-foreground">
                Choose which agent handles conversations on each platform
              </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                3
              </div>
              <div>
                <h4 className="font-medium">Go Live</h4>
                              <p className="text-sm text-muted-foreground">
                Your AI agent automatically responds to messages on your platforms
              </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supported Platforms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
                         <div className="flex items-center gap-3 p-3 border rounded-lg">
               <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                 <span className="text-primary font-bold text-lg">W</span>
               </div>
               <div>
                 <h4 className="font-medium">WhatsApp Business</h4>
                 <p className="text-sm text-muted-foreground">Connect your business WhatsApp number</p>
               </div>
             </div>
             <div className="flex items-center gap-3 p-3 border rounded-lg">
               <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                 <span className="text-primary font-bold text-lg">f</span>
               </div>
               <div>
                 <h4 className="font-medium">Facebook Messenger</h4>
                 <p className="text-sm text-muted-foreground">Integrate with your Facebook Page</p>
               </div>
             </div>
             <div className="flex items-center gap-3 p-3 border rounded-lg">
               <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                 <span className="text-primary font-bold text-lg">I</span>
               </div>
               <div>
                 <h4 className="font-medium">Instagram</h4>
                 <p className="text-sm text-muted-foreground">Handle Instagram Direct Messages</p>
               </div>
             </div>
             <div className="flex items-center gap-3 p-3 border rounded-lg">
               <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                 <span className="text-primary font-bold text-lg">🌐</span>
               </div>
               <div>
                 <h4 className="font-medium">Website Widget</h4>
                 <p className="text-sm text-muted-foreground">Embed chat widget on your website</p>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
