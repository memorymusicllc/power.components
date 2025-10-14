/**
 * LLM Performance Chart Component
 * Displays LLM model performance metrics and comparisons
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { model: 'GPT-4', accuracy: 95, speed: 85, cost: 70 },
  { model: 'Claude-3', accuracy: 92, speed: 90, cost: 80 },
  { model: 'Gemini', accuracy: 88, speed: 95, cost: 90 },
  { model: 'Llama-2', accuracy: 82, speed: 75, cost: 95 },
];

const LLMPerformanceChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="model" 
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
              name === 'accuracy' ? 'Accuracy' : name === 'speed' ? 'Speed' : 'Cost Efficiency'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Bar dataKey="accuracy" fill="hsl(210, 100%, 70%)" name="Accuracy" />
          <Bar dataKey="speed" fill="hsl(25, 100%, 60%)" name="Speed" />
          <Bar dataKey="cost" fill="hsl(120, 50%, 60%)" name="Cost Efficiency" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const LLMPerformanceChart = withErrorBoundary(withMemo(LLMPerformanceChartBase));
export default LLMPerformanceChart;