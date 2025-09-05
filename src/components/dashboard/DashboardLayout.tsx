import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardFooter } from './DashboardFooter';
import '@/app/dashboard.css';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">
        <div className="dashboard-container-inner">
          {children}
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}
