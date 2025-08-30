// src/app/(dashboard)/connections/page.tsx
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Link } from 'lucide-react';
import { ConnectionList } from '@/components/dashboard/ConnectionList';
import { type Connection } from '@/lib/types';

export default async function ConnectionsPage() {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Connections</h1>
          <p className="text-lg text-gray-600">
            Connect your chatbots to external platforms
          </p>
        </div>
        <Button disabled className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Connection
          <span className="text-xs text-gray-500 ml-2">(Coming Soon)</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Your Connected Platforms
          </CardTitle>
          <CardDescription>
            Manage your connections here. Chatbots can be assigned to any active connection.
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
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                1
              </div>
              <div>
                <h4 className="font-medium">Connect Your Platform</h4>
                <p className="text-sm text-gray-600">
                  Link your WhatsApp Business, Facebook Page, or website to Intaj
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                2
              </div>
              <div>
                <h4 className="font-medium">Assign Your Chatbot</h4>
                <p className="text-sm text-gray-600">
                  Choose which chatbot handles conversations on each platform
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                3
              </div>
              <div>
                <h4 className="font-medium">Go Live</h4>
                <p className="text-sm text-gray-600">
                  Your AI chatbot automatically responds to messages on your platforms
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
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">W</span>
              </div>
              <div>
                <h4 className="font-medium">WhatsApp Business</h4>
                <p className="text-sm text-gray-600">Connect your business WhatsApp number</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">f</span>
              </div>
              <div>
                <h4 className="font-medium">Facebook Messenger</h4>
                <p className="text-sm text-gray-600">Integrate with your Facebook Page</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">I</span>
              </div>
              <div>
                <h4 className="font-medium">Instagram</h4>
                <p className="text-sm text-gray-600">Handle Instagram Direct Messages</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-bold text-lg">🌐</span>
              </div>
              <div>
                <h4 className="font-medium">Website Widget</h4>
                <p className="text-sm text-gray-600">Embed chat widget on your website</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
