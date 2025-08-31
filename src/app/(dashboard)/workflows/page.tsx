// src/app/(dashboard)/workflows/page.tsx
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Workflow, Zap, Clock } from 'lucide-react';

export default async function WorkflowsPage() {
  const { user } = await getSession();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text">AI Workflows</h1>
        <p className="text-muted">
          Automate complex business processes with intelligent AI workflows
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            Coming Soon
          </CardTitle>
          <CardDescription>
            Advanced workflow automation is currently in development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4 py-8">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Zap className="w-12 h-12 text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text">Workflow Automation</h3>
            <p className="text-muted max-w-md mx-auto">
              Soon you&apos;ll be able to create complex AI-powered workflows that automate your business processes,
              from lead qualification to customer support escalations.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted">
              <Clock className="h-4 w-4" />
              <span>Expected Q2 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
