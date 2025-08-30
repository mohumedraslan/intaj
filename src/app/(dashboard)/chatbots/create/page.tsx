import CreateChatbotForm from "@/components/dashboard/CreateChatbotForm";
import { getSession } from "@/app/auth/actions";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function CreateChatbotPage() {
  const { user } = await getSession();
  if (!user) {
    redirect("/login");
  }

  if (user.status !== "approved") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Account Pending Approval</CardTitle>
          <CardDescription>Your account is currently under review by our team.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            You will be able to create and manage AI chatbots as soon as your account is approved.
            Thank you for your patience.
          </p>
        </CardContent>
      </Card>
    );
  }

  const supabase = await createClient();
  const { count: chatbotCount } = await supabase
    .from('chatbots')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const isSubscribed = user.subscription_status === 'active' || user.subscription_status === 'trialing';
  const canCreateOnFreePlan = (chatbotCount ?? 0) < 1; // Allow 1 bot on the free plan

  // NEW LOGIC: Allow if subscribed OR if they are on the free plan and have no bots yet
  if (!isSubscribed && !canCreateOnFreePlan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Required</CardTitle>
          <CardDescription>You need an active subscription to create additional chatbots.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">The free plan allows you to create 1 chatbot. Please upgrade to create more.</p>
          <Link href="/pricing">
            <Button>View Pricing Plans</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return <CreateChatbotForm userId={user.id} />;
}


