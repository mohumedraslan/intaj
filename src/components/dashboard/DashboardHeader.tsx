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
    <header className="flex items-center justify-between border-b bg-gradient-to-r from-blue-50 to-white p-4 shadow-sm">
      <Link href="/dashboard" className="text-xl font-semibold text-blue-700">
        Intaj
      </Link>

      <div className="flex items-center gap-4">
        {!isSubscribed && (
          <Link href="/dashboard/pricing">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200">
              Upgrade to Pro
            </Button>
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 rounded-full px-4 py-2 border-blue-200 hover:bg-blue-50 text-blue-700 transition-all duration-200">
              <User className="h-4 w-4 text-gray-600" />
              <span className="hidden text-sm font-medium md:inline">{user.email}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-1 shadow-lg rounded-xl border-gray-200">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="w-full text-left py-2 px-1 rounded-md hover:bg-gray-50 transition-colors">
                <User className="mr-3 h-4 w-4 text-gray-600" />
                <span className="font-medium">Profile</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href="/dashboard/connections" className="w-full text-left py-2 px-1 rounded-md hover:bg-gray-50 transition-colors">
                <LinkIcon className="mr-3 h-4 w-4 text-gray-600" />
                <span className="font-medium">Platform Connections</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href="/dashboard/help" className="w-full text-left py-2 px-1 rounded-md hover:bg-gray-50 transition-colors">
                <HelpCircle className="mr-3 h-4 w-4 text-gray-600" />
                <span className="font-medium">Help & Documentation</span>
              </Link>
            </DropdownMenuItem>
            
            {isSubscribed && (
              <form action={createCustomerPortalSession}>
                <DropdownMenuItem asChild>
                  <button type="submit" className="w-full text-left py-2 px-1 rounded-md hover:bg-gray-50 transition-colors flex items-center">
                    <svg className="mr-3 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17a5 5 0 0 1 10 0c0 1.1-.9 2-2 2H4a2 2 0 0 1-2-2zm10-5a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/></svg>
                    <span className="font-medium">Manage Billing</span>
                  </button>
                </DropdownMenuItem>
              </form>
            )}
            
            <DropdownMenuSeparator className="my-1" />
            <form action="/auth/signout" method="POST">
              <DropdownMenuItem asChild>
                <button type="submit" className="w-full text-left py-2 px-1 rounded-md hover:bg-red-50 transition-colors flex items-center text-red-600">
                  <svg className="mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  <span className="font-medium">Sign Out</span>
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}


