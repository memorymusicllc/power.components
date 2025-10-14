/**
 * Quality Metrics Chart Component
 * Shows quality scores and performance indicators
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { date: 'Day 1', quality: 85, relevance: 90, accuracy: 88, speed: 82 },
  { date: 'Day 2', quality: 87, relevance: 92, accuracy: 90, speed: 85 },
  { date: 'Day 3', quality: 89, relevance: 88, accuracy: 92, speed: 88 },
  { date: 'Day 4', quality: 91, relevance: 94, accuracy: 89, speed: 90 },
  { date: 'Day 5', quality: 88, relevance: 91, accuracy: 93, speed: 87 },
  { date: 'Day 6', quality: 92, relevance: 89, accuracy: 91, speed: 92 },
  { date: 'Day 7', quality: 90, relevance: 93, accuracy: 94, speed: 89 },
];

const QualityMetricsChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis 
            dataKey="date" 
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
          />
          <YAxis 
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            domain={[80, 100]}
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
              name === 'quality' ? 'Quality Score' : 
              name === 'relevance' ? 'Relevance' : 
              name === 'accuracy' ? 'Accuracy' : 'Speed'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <ReferenceLine y={90} stroke="hsl(120, 50%, 60%)" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="quality" 
            stroke="hsl(210, 100%, 70%)" 
            strokeWidth={2}
            name="Quality Score"
            dot={{ fill: 'hsl(210, 100%, 70%)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="relevance" 
            stroke="hsl(25, 100%, 60%)" 
            strokeWidth={2}
            name="Relevance"
            dot={{ fill: 'hsl(25, 100%, 60%)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="accuracy" 
            stroke="hsl(120, 50%, 60%)" 
            strokeWidth={2}
            name="Accuracy"
            dot={{ fill: 'hsl(120, 50%, 60%)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="speed" 
            stroke="hsl(330, 100%, 70%)" 
            strokeWidth={2}
            name="Speed"
            dot={{ fill: 'hsl(330, 100%, 70%)', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const QualityMetricsChart = withErrorBoundary(withMemo(QualityMetricsChartBase));
export default QualityMetricsChart;