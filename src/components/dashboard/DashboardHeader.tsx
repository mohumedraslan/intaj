// src/components/dashboard/DashboardHeader.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createCustomerPortalSession } from '@/app/(dashboard)/actions'
import { type UserProfile } from '@/lib/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, HelpCircle, User, Link as LinkIcon } from "lucide-react";

interface DashboardHeaderProps {
  user: UserProfile;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const isSubscribed = user.subscription_status === 'active' || user.subscription_status === 'trialing'

  return (
    <header className="flex items-center justify-between border-b bg-white p-4 shadow-sm">
      <Link href="/dashboard" className="text-xl font-semibold">
        Intaj
      </Link>

      <div className="flex items-center gap-3">
        {!isSubscribed && (
          <Link href="/pricing">
            <Button variant="default">Upgrade to Pro</Button>
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <span className="hidden text-sm md:inline">{user.email}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link href="/profile" className="w-full text-left">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href="/connections" className="w-full text-left">
                <LinkIcon className="mr-2 h-4 w-4" />
                Platform Connections
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href="/help" className="w-full text-left">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Documentation
              </Link>
            </DropdownMenuItem>
            
            {isSubscribed && (
              <form action={createCustomerPortalSession}>
                <DropdownMenuItem asChild>
                  <button type="submit" className="w-full text-left">
                    Manage Billing
                  </button>
                </DropdownMenuItem>
              </form>
            )}
            
            <DropdownMenuSeparator />
            <form action="/auth/signout" method="POST">
              <DropdownMenuItem asChild>
                <button type="submit" className="w-full text-left">
                  Sign Out
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}


