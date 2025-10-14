/**
 * Confusion Matrix Chart Component
 * Shows classification accuracy and errors
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { category: 'True Positive', count: 85, percentage: 85 },
  { category: 'False Positive', count: 5, percentage: 5 },
  { category: 'True Negative', count: 8, percentage: 8 },
  { category: 'False Negative', count: 2, percentage: 2 },
];

const ConfusionMatrixChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="category" 
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
              name === 'count' ? `${value} cases` : `${value}%`,
              name === 'count' ? 'Count' : 'Percentage'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Bar 
            dataKey="percentage" 
            fill="hsl(210, 100%, 70%)" 
            name="Percentage"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ConfusionMatrixChart = withErrorBoundary(withMemo(ConfusionMatrixChartBase));
export default ConfusionMatrixChart;