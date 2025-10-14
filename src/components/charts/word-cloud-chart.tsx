/**
 * Word Cloud Chart Component
 * Shows text frequency and importance
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { word: 'AI', frequency: 100, importance: 95, x: 50, y: 80 },
  { word: 'Machine Learning', frequency: 80, importance: 90, x: 30, y: 60 },
  { word: 'Data', frequency: 70, importance: 85, x: 70, y: 60 },
  { word: 'Analytics', frequency: 60, importance: 80, x: 20, y: 40 },
  { word: 'Automation', frequency: 50, importance: 75, x: 80, y: 40 },
  { word: 'Cloud', frequency: 40, importance: 70, x: 50, y: 20 },
];

const WordCloudChartBase = () => {
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
              name === 'frequency' ? `${value} occurrences` : 
              name === 'importance' ? `${value}% importance` : value,
              name === 'frequency' ? 'Frequency' : 
              name === 'importance' ? 'Importance' : name
            ]}
            labelFormatter={(label) => `Word: ${label}`}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Scatter 
            dataKey="frequency" 
            fill="hsl(210, 100%, 70%)"
            name="Word Frequency"
          />
        </ScatterChart>
      </ResponsiveContainer>
                </div>
  );
};

export const WordCloudChart = withErrorBoundary(withMemo(WordCloudChartBase));
export default WordCloudChart;