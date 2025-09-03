"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Zap, HeartHandshake, Info, Mail, Rocket } from 'lucide-react';

const navItems = [
  { href: '#home', label: 'Home', icon: <Home className="h-5 w-5" /> },
  { href: '#features', label: 'Features', icon: <Zap className="h-5 w-5" /> },
  { href: '#solutions', label: 'Solutions', icon: <HeartHandshake className="h-5 w-5" /> },
  { href: '#about', label: 'About', icon: <Info className="h-5 w-5" /> },
  { href: '#contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

export default function LandingSidebar() {
  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-secondary/30 border-r border-border p-6 flex-col justify-between hidden lg:flex">
      <div>
        <div className="flex items-center space-x-2 mb-10">
          <span className="text-xl font-bold text-foreground">Intaj AI</span>
        </div>
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground transition-colors duration-200"
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto">
        <Link href="/signup">
          <Button className="w-full group">
            <Rocket className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Create your first AI agent
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          No credit card required.
        </p>
      </div>
    </aside>
  );
}
