/**
 * Error Rate Chart Component
 * Displays error rates and failure patterns over time
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { time: '00:00', errors: 2, warnings: 5, success: 98 },
  { time: '04:00', errors: 1, warnings: 3, success: 99 },
  { time: '08:00', errors: 8, warnings: 12, success: 92 },
  { time: '12:00', errors: 5, warnings: 8, success: 95 },
  { time: '16:00', errors: 3, warnings: 6, success: 97 },
  { time: '20:00', errors: 1, warnings: 4, success: 99 },
];

const ErrorRateChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              `${value}%`,
              name === 'errors' ? 'Error Rate' : name === 'warnings' ? 'Warning Rate' : 'Success Rate'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <ReferenceLine y={95} stroke="hsl(120, 50%, 60%)" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="errors" 
            stroke="hsl(0, 100%, 60%)" 
            strokeWidth={2}
            name="Error Rate"
            dot={{ fill: 'hsl(0, 100%, 60%)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="warnings" 
            stroke="hsl(45, 100%, 60%)" 
            strokeWidth={2}
            name="Warning Rate"
            dot={{ fill: 'hsl(45, 100%, 60%)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="success" 
            stroke="hsl(120, 50%, 60%)" 
            strokeWidth={2}
            name="Success Rate"
            dot={{ fill: 'hsl(120, 50%, 60%)', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ErrorRateChart = withErrorBoundary(withMemo(ErrorRateChartBase));
export default ErrorRateChart;