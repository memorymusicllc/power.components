/**
 * Scatter Plot Chart Component
 * Shows correlation between two variables
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { x: 100, y: 200, z: 200, category: 'A' },
  { x: 120, y: 100, z: 260, category: 'B' },
  { x: 170, y: 300, z: 400, category: 'A' },
  { x: 140, y: 250, z: 280, category: 'B' },
  { x: 150, y: 400, z: 500, category: 'A' },
  { x: 110, y: 280, z: 200, category: 'B' },
  { x: 200, y: 150, z: 300, category: 'A' },
  { x: 180, y: 350, z: 450, category: 'B' },
];

const ScatterPlotChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="X Value"
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Y Value"
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
              value,
              name === 'x' ? 'X Value' : 
              name === 'y' ? 'Y Value' : 
              name === 'z' ? 'Z Value' : name
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Scatter 
            dataKey="y" 
            fill="hsl(210, 100%, 70%)"
            name="Data Points"
          />
        </ScatterChart>
      </ResponsiveContainer>
          </div>
  );
};

export const ScatterPlotChart = withErrorBoundary(withMemo(ScatterPlotChartBase));
export default ScatterPlotChart;