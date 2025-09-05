'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { signup } from '@/app/auth/actions';
import { toast } from 'sonner';

export default function SignupForm() {
  const [isPending, startTransition] = useTransition();

  const handleSignup = (formData: FormData) => {
    startTransition(async () => {
      const result = await signup(undefined, formData);
      if (result?.message) {
        if (result.message.includes('successfully')) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      <form action={handleSignup} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              className="mt-1"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              className="mt-1"
              placeholder="Doe"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1"
            placeholder="you@example.com"
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
            autoComplete="new-password"
            className="mt-1"
            placeholder="••••••••"
          />
          <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            className="mt-1"
            placeholder="••••••••"
          />
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <Checkbox id="terms" name="terms" required className="h-4 w-4" />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-600">
              I agree to the{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-md hover:shadow-lg" 
          disabled={isPending}
        >
          {isPending ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
}
