import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  BarChart,
  Link2,
  HelpCircle,
  Settings,
  LogOut,
  FolderOpen,
  ShoppingBag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import '@/app/dashboard.css';

export function DashboardSidebar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const mainNavigation = [
    { href: '/dashboard', title: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: '/dashboard/agents', title: 'Agents', icon: <Users className="w-5 h-5" /> },
  ];
  
  const appNavigation = [
    { href: '/dashboard/analytics', title: 'Analytics', icon: <BarChart className="w-5 h-5" /> },
    { href: '/dashboard/connections', title: 'Connections', icon: <Link2 className="w-5 h-5" /> },
    { href: '/dashboard/files', title: 'Files', icon: <FolderOpen className="w-5 h-5" /> },
  ];
  
  const otherNavigation = [
    { href: '/dashboard/profile', title: 'Profile', icon: <Users className="w-5 h-5" /> },
    { href: '/dashboard/help', title: 'Help', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  return (
    <nav
      className={cn(
        "dashboard-sidebar",
        className
      )}
      {...props}
    >
      <div className="sidebar-logo mb-6">
        <div className="logo-icon bg-primary text-white rounded-md flex items-center justify-center">
          <span className="font-bold text-lg">I</span>
        </div>
        <div className="logo-text">
          <span className="font-semibold text-lg">Intaj</span>
        </div>
      </div>
      
      {/* Main Navigation Group */}
      <div className="sidebar-nav-group mb-6">
        <div className="sidebar-section-title font-medium text-xs uppercase tracking-wider text-gray-500 mb-3 px-3">Main</div>
        
        {mainNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "sidebar-nav-item",
              item.href === '/dashboard' && "active"
            )}
          >
            <div className="nav-item-icon text-gray-600">{item.icon}</div>
            <div className="nav-item-text font-medium">{item.title}</div>
          </Link>
        ))}
      </div>
      
      {/* App Navigation Group */}
      <div className="sidebar-nav-group mb-6">
        <div className="sidebar-section-title font-medium text-xs uppercase tracking-wider text-gray-500 mb-3 px-3">App</div>
        
        {appNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="sidebar-nav-item"
          >
            <div className="nav-item-icon text-gray-600">{item.icon}</div>
            <div className="nav-item-text font-medium">{item.title}</div>
          </Link>
        ))}
      </div>
      
      {/* Other Navigation Group */}
      <div className="sidebar-nav-group mb-6">
        <div className="sidebar-section-title font-medium text-xs uppercase tracking-wider text-gray-500 mb-3 px-3">Other</div>
        
        {otherNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="sidebar-nav-item"
          >
            <div className="nav-item-icon text-gray-600">{item.icon}</div>
            <div className="nav-item-text font-medium">{item.title}</div>
          </Link>
        ))}
      </div>
      
      <div className="mt-auto border-t p-6">
        <div className="flex items-center gap-3 mb-4">
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/settings" className="w-full">
            <Button variant="outline" size="sm" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
          <Link href="/auth/signout" className="w-full">
            <Button variant="outline" size="sm" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}