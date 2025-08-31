'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bot, Plug, HelpCircle, User, BarChart, LifeBuoy, LogOut, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/agents', icon: Bot, label: 'My Agents' },
  { href: '/agents/templates', icon: Bot, label: 'Templates', sub: true },
  { href: '/inbox', icon: MessageSquare, label: 'Inbox' },
  { href: '/connections', icon: Plug, label: 'Connections' },
  { href: '/analytics', icon: BarChart, label: 'Analytics' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/help', icon: HelpCircle, label: 'Help' },
  { href: '/workflows', icon: BarChart, label: 'Workflows', disabled: false },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-card-bg border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="text-xl font-bold text-text">Intaj</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(item => (
          item.sub ? (
            <div key={item.href} className="ml-6">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-brand-500 text-white"
                    : "text-muted hover:bg-accent hover:text-text"
                )}
              >
                <span>{item.label}</span>
              </Link>
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.disabled ? '#' : item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                item.disabled
                  ? "text-muted/50 cursor-not-allowed"
                  : pathname === item.href
                  ? "bg-brand-500 text-white"
                  : "text-muted hover:bg-accent hover:text-text"
              )}
              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.disabled && (
                <span className="ml-auto text-xs bg-muted px-2 py-1 rounded text-text">Soon</span>
              )}
            </Link>
          )
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-border p-4 space-y-2">
        <Link
          href="/help"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-accent hover:text-text transition-colors"
        >
          <LifeBuoy className="h-5 w-5" />
          <span>Need Custom Work?</span>
        </Link>
        
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-accent hover:text-text transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
