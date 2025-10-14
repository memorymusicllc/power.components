/**
 * Heatmap Chart Component
 * Shows data density and patterns in a grid
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { x: 0, y: 0, value: 85, intensity: 'high' },
  { x: 1, y: 0, value: 70, intensity: 'medium' },
  { x: 2, y: 0, value: 45, intensity: 'low' },
  { x: 0, y: 1, value: 60, intensity: 'medium' },
  { x: 1, y: 1, value: 90, intensity: 'high' },
  { x: 2, y: 1, value: 75, intensity: 'medium' },
  { x: 0, y: 2, value: 30, intensity: 'low' },
  { x: 1, y: 2, value: 55, intensity: 'medium' },
  { x: 2, y: 2, value: 80, intensity: 'high' },
];

const HeatmapChartBase = () => {
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
            name="X Position"
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            domain={[-0.5, 2.5]}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Y Position"
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            domain={[-0.5, 2.5]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              name === 'value' ? `${value}%` : value,
              name === 'value' ? 'Value' : 
              name === 'intensity' ? 'Intensity' : name
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Scatter 
            dataKey="value" 
            fill="hsl(210, 100%, 70%)"
            name="Heatmap Data"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export const HeatmapChart = withErrorBoundary(withMemo(HeatmapChartBase));
export default HeatmapChart;