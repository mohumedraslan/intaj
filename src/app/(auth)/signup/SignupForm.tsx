'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signup } from '@/app/auth/actions';
import { toast } from 'sonner';

export default function SignupForm() {
  const [isPending, startTransition] = useTransition();

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
      <form action={handleSignup} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
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
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1"
            placeholder="Create a password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="mt-1"
            placeholder="Confirm your password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
}
