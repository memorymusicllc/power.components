/**
 * Token Usage Chart Component
 * Displays token consumption patterns and trends
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { time: '00:00', input: 1200, output: 800, total: 2000 },
  { time: '04:00', input: 800, output: 600, total: 1400 },
  { time: '08:00', input: 2000, output: 1500, total: 3500 },
  { time: '12:00', input: 1800, output: 1200, total: 3000 },
  { time: '16:00', input: 1500, output: 1000, total: 2500 },
  { time: '20:00', input: 1000, output: 700, total: 1700 },
];

const TokenUsageChartBase = () => {
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
              `${value.toLocaleString()} tokens`,
              name === 'input' ? 'Input Tokens' : name === 'output' ? 'Output Tokens' : 'Total Tokens'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Area 
            type="monotone" 
            dataKey="input" 
            stackId="1" 
            stroke="hsl(210, 100%, 70%)" 
            fill="hsl(210, 100%, 70%)" 
            name="Input Tokens"
          />
          <Area 
            type="monotone" 
            dataKey="output" 
            stackId="1" 
            stroke="hsl(25, 100%, 60%)" 
            fill="hsl(25, 100%, 60%)" 
            name="Output Tokens"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TokenUsageChart = withErrorBoundary(withMemo(TokenUsageChartBase));
export default TokenUsageChart;