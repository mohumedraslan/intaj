
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bot, Plug, HelpCircle, User, BarChart, LifeBuoy, LogOut, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/agents', icon: Bot, label: 'My Agents' },
  { href: '/agents/templates', icon: Bot, label: 'Templates', sub: true },
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/inbox', icon: MessageSquare, label: 'Inbox' },
  { href: '/connections', icon: Plug, label: 'Connections' },
  { href: '/analytics', icon: BarChart, label: 'Analytics' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/help', icon: HelpCircle, label: 'Help' },
  { href: '/workflows', icon: BarChart, label: 'Workflows', disabled: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-gray-900 border-r border-border text-white transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
      aria-label="Sidebar navigation"
    >
      {/* Mobile Toggle */}
      <button
        className="md:hidden absolute top-4 left-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-blue-100 shadow"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? <Home className="h-5 w-5 text-blue-600" /> : <Bot className="h-5 w-5 text-blue-600" />}
      </button>

      {/* Logo */}
      <div className={cn("flex items-center border-b border-border px-6", collapsed ? "h-16 justify-center" : "h-16")}
        aria-label="Intaj logo section"
      >
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          {!collapsed && <span className="text-xl font-bold text-white">Intaj</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1 space-y-1 px-4 py-6", collapsed && "p-2")}
        aria-label="Main navigation"
      >
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.disabled ? '#' : item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              collapsed ? "justify-center px-2" : "",
              item.disabled
                ? "text-gray-400 cursor-not-allowed"
                : pathname === item.href
                ? "bg-blue-600 text-white shadow"
                : "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
            )}
            aria-current={pathname === item.href ? "page" : undefined}
            tabIndex={item.disabled ? -1 : 0}
            onClick={item.disabled ? (e) => e.preventDefault() : undefined}
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
            {!collapsed && <span>{item.label}</span>}
            {item.disabled && !collapsed && (
              <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Soon</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className={cn("border-t border-border px-4 py-6 space-y-2", collapsed && "p-2")}
        aria-label="Sidebar bottom section"
      >
        <Link
          href="/help"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200",
            collapsed ? "justify-center px-2" : ""
          )}
        >
          <LifeBuoy className="h-5 w-5" />
          {!collapsed && <span>Need Custom Work?</span>}
        </Link>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200",
              collapsed ? "justify-center px-2" : ""
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
