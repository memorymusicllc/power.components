/**
 * Timeline Chart Component
 * Shows events and milestones over time
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { date: '2024-01', events: 5, milestones: 2, issues: 1 },
  { date: '2024-02', events: 8, milestones: 3, issues: 2 },
  { date: '2024-03', events: 12, milestones: 4, issues: 1 },
  { date: '2024-04', events: 15, milestones: 5, issues: 3 },
  { date: '2024-05', events: 18, milestones: 6, issues: 2 },
  { date: '2024-06', events: 22, milestones: 7, issues: 1 },
  { date: '2024-07', events: 25, milestones: 8, issues: 4 },
];

const TimelineChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis 
            dataKey="date" 
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
              `${value}`,
              name === 'events' ? 'Events' : 
              name === 'milestones' ? 'Milestones' : 'Issues'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Line 
            type="monotone" 
            dataKey="events" 
            stroke="hsl(210, 100%, 70%)" 
            strokeWidth={2}
            name="Events"
            dot={{ fill: 'hsl(210, 100%, 70%)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="milestones" 
            stroke="hsl(25, 100%, 60%)" 
            strokeWidth={2}
            name="Milestones"
            dot={{ fill: 'hsl(25, 100%, 60%)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="issues" 
            stroke="hsl(0, 100%, 60%)" 
            strokeWidth={2}
            name="Issues"
            dot={{ fill: 'hsl(0, 100%, 60%)', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
          </div>
  );
};

export const TimelineChart = withErrorBoundary(withMemo(TimelineChartBase));
export default TimelineChart;