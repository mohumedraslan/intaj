import CreateChatbotForm from "@/components/dashboard/CreateChatbotForm";
import { getSession } from "@/app/auth/actions";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const isSubscribed = (user as any).subscription_status === 'active' || (user as any).subscription_status === 'trialing'

  if (!isSubscribed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Required</CardTitle>
          <CardDescription>You need an active subscription to create new chatbots.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Please upgrade to a paid plan to access this feature.</p>
          <Link href="/pricing">
            <Button>View Pricing Plans</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return <CreateChatbotForm userId={user.id} />;
}


