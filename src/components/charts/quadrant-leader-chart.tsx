/**
 * Quadrant Leader Chart Component
 * Shows performance vs cost analysis in quadrants
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { name: 'GPT-4', performance: 95, cost: 70, size: 100 },
  { name: 'Claude-3', performance: 92, cost: 80, size: 90 },
  { name: 'Gemini', performance: 88, cost: 90, size: 85 },
  { name: 'Llama-2', performance: 82, cost: 95, size: 80 },
  { name: 'PaLM', performance: 85, cost: 85, size: 75 },
  { name: 'Jurassic', performance: 78, cost: 75, size: 70 },
];

const QuadrantLeaderChartBase = () => {
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
            dataKey="cost" 
            name="Cost"
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            domain={[60, 100]}
          />
          <YAxis 
            type="number" 
            dataKey="performance" 
            name="Performance"
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            domain={[70, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              name === 'performance' ? `${value}%` : `$${value}`,
              name === 'performance' ? 'Performance' : 'Cost'
            ]}
            labelFormatter={(label) => `Model: ${label}`}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Scatter 
            dataKey="performance" 
            fill="hsl(210, 100%, 70%)"
            name="Models"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export const QuadrantLeaderChart = withErrorBoundary(withMemo(QuadrantLeaderChartBase));
export default QuadrantLeaderChart;