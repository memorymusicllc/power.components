/**
 * Gantt Chart Component
 * Shows project timeline and task scheduling
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { task: 'Planning', start: 1, duration: 3, progress: 100 },
  { task: 'Development', start: 4, duration: 8, progress: 75 },
  { task: 'Testing', start: 10, duration: 4, progress: 50 },
  { task: 'Deployment', start: 14, duration: 2, progress: 25 },
  { task: 'Documentation', start: 6, duration: 6, progress: 60 },
];

const GanttChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout="horizontal"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number"
            dataKey="start" 
            name="Start Day"
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            domain={[0, 20]}
          />
          <YAxis 
            type="category"
            dataKey="task" 
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              name === 'start' ? `Day ${value}` : 
              name === 'duration' ? `${value} days` : 
              `${value}%`,
              name === 'start' ? 'Start Day' : 
              name === 'duration' ? 'Duration' : 'Progress'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Bar 
            dataKey="duration" 
            fill="hsl(210, 100%, 70%)" 
            name="Duration"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GanttChart = withErrorBoundary(withMemo(GanttChartBase));
export default GanttChart;