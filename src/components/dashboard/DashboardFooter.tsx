// src/components/dashboard/DashboardFooter.tsx
import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const socialLinks = [
  { href: '#', icon: <Twitter className="h-4 w-4" />, label: 'Twitter' },
  { href: '#', icon: <Github className="h-4 w-4" />, label: 'GitHub' },
  { href: '#', icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn' },
];

export function DashboardFooter() {
  return (
    <footer className="dashboard-footer">
      <div className="dashboard-footer-container">
        <div className="dashboard-footer-content">
          <p className="dashboard-footer-copyright">
            &copy; {new Date().getFullYear()} Intaj AI. All rights reserved.
          </p>
          <div className="dashboard-footer-links">
            <Link href="/terms" className="dashboard-footer-link">Terms</Link>
            <Link href="/privacy" className="dashboard-footer-link">Privacy</Link>
            <Link href="/help" className="dashboard-footer-link">Help</Link>
          </div>
          <div className="dashboard-footer-social">
            {socialLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="dashboard-footer-social-link" 
                aria-label={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}