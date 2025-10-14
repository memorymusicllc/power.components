/**
 * Latency Distribution Chart Component
 * Shows latency distribution and performance metrics
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, Histogram, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { range: '0-50ms', count: 120, percentage: 15 },
  { range: '50-100ms', count: 280, percentage: 35 },
  { range: '100-200ms', count: 200, percentage: 25 },
  { range: '200-500ms', count: 120, percentage: 15 },
  { range: '500ms+', count: 80, percentage: 10 },
];

const LatencyDistributionChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis 
            dataKey="range" 
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
          />
          <YAxis 
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              name === 'count' ? `${value} requests` : `${value}%`,
              name === 'count' ? 'Count' : 'Percentage'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Bar 
            dataKey="count" 
            fill="hsl(210, 100%, 70%)" 
            name="Request Count"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const LatencyDistributionChart = withErrorBoundary(withMemo(LatencyDistributionChartBase));
export default LatencyDistributionChart;