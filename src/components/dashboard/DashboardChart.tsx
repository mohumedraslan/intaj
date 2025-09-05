'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsChart } from './AnalyticsChart';

interface DashboardChartProps {
  data: number[];
  labels: string[];
}

export function DashboardChart({ data, labels }: DashboardChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversations Overview</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <AnalyticsChart
          data={data}
          labels={labels}
        />
      </CardContent>
    </Card>
  );
}
