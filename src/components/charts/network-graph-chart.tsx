/**
 * Network Graph Chart Component
 * Shows network relationships and connections
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { node: 'API Gateway', connections: 15, importance: 95, x: 50, y: 80 },
  { node: 'Database', connections: 8, importance: 90, x: 20, y: 60 },
  { node: 'Cache', connections: 12, importance: 85, x: 80, y: 60 },
  { node: 'Auth Service', connections: 6, importance: 88, x: 30, y: 30 },
  { node: 'Payment', connections: 4, importance: 82, x: 70, y: 30 },
  { node: 'Analytics', connections: 10, importance: 75, x: 50, y: 20 },
];

const NetworkGraphChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis 
            type="number" 
            dataKey="x" 
            name="X Position"
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            hide
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Y Position"
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            hide
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              name === 'connections' ? `${value} connections` : 
              name === 'importance' ? `${value}% importance` : value,
              name === 'connections' ? 'Connections' : 
              name === 'importance' ? 'Importance' : name
            ]}
            labelFormatter={(label) => `Node: ${label}`}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Scatter 
            dataKey="connections" 
            fill="hsl(210, 100%, 70%)"
            name="Network Nodes"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export const NetworkGraphChart = withErrorBoundary(withMemo(NetworkGraphChartBase));
export default NetworkGraphChart;