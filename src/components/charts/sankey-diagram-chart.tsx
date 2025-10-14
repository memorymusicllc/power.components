/**
 * Sankey Diagram Chart Component
 * Shows flow and relationships between entities
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { source: 'Users', target: 'API', flow: 100, x: 20, y: 50 },
  { source: 'API', target: 'Database', flow: 80, x: 50, y: 30 },
  { source: 'API', target: 'Cache', flow: 20, x: 50, y: 70 },
  { source: 'Database', target: 'Storage', flow: 60, x: 80, y: 20 },
  { source: 'Database', target: 'Backup', flow: 20, x: 80, y: 40 },
  { source: 'Cache', target: 'CDN', flow: 15, x: 80, y: 60 },
  { source: 'Cache', target: 'Storage', flow: 5, x: 80, y: 80 },
];

const SankeyDiagramChartBase = () => {
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
              name === 'flow' ? `${value} units` : value,
              name === 'flow' ? 'Flow' : 
              name === 'source' ? 'Source' : 
              name === 'target' ? 'Target' : name
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Scatter 
            dataKey="flow" 
            fill="hsl(210, 100%, 70%)"
            name="Data Flow"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SankeyDiagramChart = withErrorBoundary(withMemo(SankeyDiagramChartBase));
export default SankeyDiagramChart;