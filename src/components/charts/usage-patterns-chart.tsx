/**
 * Usage Patterns Chart Component
 * Shows user behavior and usage analytics
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { time: '00:00', active: 120, new: 15, returning: 105 },
  { time: '04:00', active: 80, new: 8, returning: 72 },
  { time: '08:00', active: 450, new: 45, returning: 405 },
  { time: '12:00', active: 380, new: 38, returning: 342 },
  { time: '16:00', active: 320, new: 32, returning: 288 },
  { time: '20:00', active: 200, new: 20, returning: 180 },
];

const UsagePatternsChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis 
            dataKey="time" 
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
              `${value} users`,
              name === 'active' ? 'Active Users' : 
              name === 'new' ? 'New Users' : 'Returning Users'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Area 
            type="monotone" 
            dataKey="returning" 
            stackId="1" 
            stroke="hsl(210, 100%, 70%)" 
            fill="hsl(210, 100%, 70%)" 
            name="Returning Users"
          />
          <Area 
            type="monotone" 
            dataKey="new" 
            stackId="1" 
            stroke="hsl(25, 100%, 60%)" 
            fill="hsl(25, 100%, 60%)" 
            name="New Users"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const UsagePatternsChart = withErrorBoundary(withMemo(UsagePatternsChartBase));
export default UsagePatternsChart;