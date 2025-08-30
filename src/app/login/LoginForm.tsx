'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login, signup } from '@/app/auth/actions';
import { toast } from 'sonner';

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const handleLogin = (formData: FormData) => {
    startTransition(async () => {
      const result = await login(undefined, formData);
      if (result?.message) {
        toast.error(result.message);
      }
    });
  };

  const handleSignup = (formData: FormData) => {
    startTransition(async () => {
      const result = await signup(undefined, formData);
      if (result?.message) {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-4">
      <form action={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1"
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <div className="mt-6">
          <form action={handleSignup}>
            <Button type="submit" variant="outline" className="w-full" disabled={isPending}>
              {isPending ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
