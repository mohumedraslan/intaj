// src/app/login/page.tsx
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const { user } = await getSession();
  
  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text">Intaj</h1>
          <p className="mt-2 text-sm text-muted">
            Sign in to your account to continue
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your AI agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

                <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="font-medium text-brand-500 hover:text-brand-500/80">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
