import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import '@/app/dashboard.css';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div className={cn('dashboard-card', className)}>
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
        {icon && (
          <div className="bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
        )}
      </div>
      <div className="dashboard-card-content">
        <p className="text-2xl font-semibold">{value}</p>
        {(description || trend) && (
          <div className="flex items-center mt-2 text-sm">
            {trend && (
              <>
                {trend.isPositive ? 
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" /> : 
                  <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
                }
                <span
                  className={cn(
                    trend.isPositive ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {Math.abs(trend.value)}%
                </span>
                {trend.label && (
                  <span className="text-muted-foreground ml-2">{trend.label}</span>
                )}
              </>
            )}
            {!trend && description && (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
