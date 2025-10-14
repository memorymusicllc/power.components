/**
 * Cost Analysis Chart Component
 * Displays cost breakdown and spending patterns
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { name: 'Compute', value: 45, color: 'hsl(210, 100%, 70%)' },
  { name: 'Storage', value: 25, color: 'hsl(25, 100%, 60%)' },
  { name: 'API Calls', value: 20, color: 'hsl(120, 50%, 60%)' },
  { name: 'Data Transfer', value: 10, color: 'hsl(330, 100%, 70%)' },
];

const CostAnalysisChartBase = () => {
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
              `$${value}`,
              name
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CostAnalysisChart = withErrorBoundary(withMemo(CostAnalysisChartBase));
export default CostAnalysisChart;