/**
 * Bloom Graph Chart Component
 * Shows hierarchical data relationships
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { name: 'AI/ML', size: 400, color: 'hsl(210, 100%, 70%)' },
  { name: 'Web Development', size: 300, color: 'hsl(25, 100%, 60%)' },
  { name: 'Mobile Apps', size: 200, color: 'hsl(120, 50%, 60%)' },
  { name: 'Data Science', size: 150, color: 'hsl(330, 100%, 70%)' },
  { name: 'DevOps', size: 100, color: 'hsl(45, 100%, 60%)' },
  { name: 'Security', size: 80, color: 'hsl(280, 50%, 60%)' },
];

const BloomGraphChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4/3}
          stroke="#fff"
          fill="#8884d8"
        >
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              `${value} projects`,
              name
            ]}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export const BloomGraphChart = withErrorBoundary(withMemo(BloomGraphChartBase));
export default BloomGraphChart;