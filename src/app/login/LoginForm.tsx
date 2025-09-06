'use client';

import { useTransition, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login, getSession } from '@/app/auth/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { user } = await getSession();
      if (user) {
        router.replace('/dashboard');
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = (formData: FormData) => {
    startTransition(async () => {
      const result = await login(undefined, formData);
      if (result?.message) {
        toast.error(result.message);
      }
    });
  };

  return (
    <form action={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500"
          placeholder="name@example.com"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" name="remember" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
          >
            Remember me
          </label>
        </div>
        <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Forgot password?
        </Link>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
        disabled={isPending}
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </Button>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}
