// src/components/dashboard/DashboardHeader.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createCustomerPortalSession } from '@/app/(dashboard)/actions'
import { type UserProfile } from '@/lib/types'

interface DashboardHeaderProps {
  user: UserProfile;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const isSubscribed = user.subscription_status === 'active' || user.subscription_status === 'trialing'

  return (
    <header className="flex items-center justify-between border-b bg-background p-4">
      <Link href="/dashboard" className="text-xl font-semibold">
        Intaj
      </Link>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-muted-foreground md:inline">{user.email}</span>

        {!isSubscribed ? (
          <Link href="/pricing">
            <Button variant="default">Upgrade</Button>
          </Link>
        ) : (
          <form action={createCustomerPortalSession}>
            <Button type="submit" variant="secondary">Manage Billing</Button>
          </form>
        )}

        <form action="/auth/signout" method="POST">
          <Button type="submit" variant="outline">Sign Out</Button>
        </form>
      </div>
    </header>
  )
}


