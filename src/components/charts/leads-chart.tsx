
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { name: 'New', value: 12, color: 'hsl(210, 100%, 70%)' },
  { name: 'Contacted', value: 8, color: 'hsl(25, 100%, 60%)' },
  { name: 'Qualified', value: 5, color: 'hsl(120, 50%, 60%)' },
  { name: 'Negotiating', value: 3, color: 'hsl(330, 100%, 70%)' },
  { name: 'Scheduled', value: 2, color: 'hsl(250, 30%, 70%)' },
];

const LeadsChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              `${value} leads`,
              name
            ]}
          />
          <Legend 
            verticalAlign="top"
            wrapperStyle={{ fontSize: 11 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Enhanced with error boundary and memoization
export const LeadsChart = withErrorBoundary(
  withMemo(LeadsChartBase),
  {
    fallback: ({ error, resetError }) => (
      <div className="p-4 border border-error-500 rounded-lg bg-error-50">
        <p className="text-error-700">Chart Error: {error.message}</p>
        <button onClick={resetError} className="mt-2 text-sm text-error-600 underline">
          Try Again
        </button>
      </div>
    )
  }
);

// Component metadata
(LeadsChart as any).metadata = {
  name: "LeadsChart",
  label: "Lead Pipeline Chart",
  version: "2.0.0",
  date: "2025-01-08",
  description: "Enhanced pie chart showing lead status distribution with error handling and performance optimization",
  category: "Visualization",
  tags: ["chart", "leads", "analytics", "accessibility", "performance"],
};
