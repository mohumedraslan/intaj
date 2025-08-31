// src/app/(dashboard)/profile/page.tsx
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Shield, CreditCard } from 'lucide-react';
import { requestDataExport } from '@/app/(dashboard)/actions';

export default async function ProfilePage() {
  const { user } = await getSession();
  if (!user) {
    redirect('/login');
  }

  const getStatusColor = (status: string | null | undefined) => {
    if (!status) return 'default';
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending_approval':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getSubscriptionColor = (status: string | null | undefined) => {
    if (!status) return 'outline';
    switch (status) {
      case 'active':
        return 'default';
      case 'trialing':
        return 'secondary';
      case 'past_due':
        return 'destructive';
      case 'canceled':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-text">My Profile</h1>
        <p className="text-lg text-muted">
          Manage your account information and preferences
        </p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Information
          </CardTitle>
          <CardDescription>
            Your personal and subscription details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                value={user.email || 'No email provided'}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Account Status
              </Label>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(user.status)}>
                  {user.status ? user.status.replace('_', ' ') : 'Active'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Subscription Plan
              </Label>
              <div className="flex items-center gap-2">
                <Badge variant={getSubscriptionColor(user.subscription_status)}>
                  {user.subscription_status ? user.subscription_status.replace('_', ' ') : 'Free Tier'}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Customer ID</Label>
              <div className="text-sm text-muted-foreground font-mono bg-muted px-3 py-2 rounded border">
                {user.stripe_customer_id || 'Not available'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Help & Support</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                  Get help with using the platform and find answers to common questions.
                </p>
                <a 
                  href="/help" 
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  View Help Center →
                </a>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Billing Management</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                  Update your subscription, payment method, and billing information.
                </p>
                {user.subscription_status === 'active' || user.subscription_status === 'trialing' ? (
                  <form action="/api/create-customer-portal" method="POST">
                    <button 
                      type="submit"
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Manage Billing →
                    </button>
                  </form>
                ) : (
                  <a 
                    href="/pricing" 
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    View Plans →
                  </a>
                )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security & Privacy</CardTitle>
          <CardDescription>
            Your account security and data privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Badge variant="outline">Coming Soon</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Data Export</h4>
                <p className="text-sm text-muted-foreground">
                  We will compile your data and email it to you within 24 hours.
                </p>
              </div>
              <form action={requestDataExport}>
                <Button type="submit" variant="outline" size="sm">
                  Request Export
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
