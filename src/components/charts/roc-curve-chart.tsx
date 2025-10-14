/**
 * ROC Curve Chart Component
 * Shows receiver operating characteristic curve
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { threshold: 0.0, tpr: 0.0, fpr: 0.0 },
  { threshold: 0.1, tpr: 0.2, fpr: 0.05 },
  { threshold: 0.2, tpr: 0.4, fpr: 0.1 },
  { threshold: 0.3, tpr: 0.6, fpr: 0.15 },
  { threshold: 0.4, tpr: 0.75, fpr: 0.2 },
  { threshold: 0.5, tpr: 0.85, fpr: 0.25 },
  { threshold: 0.6, tpr: 0.9, fpr: 0.3 },
  { threshold: 0.7, tpr: 0.95, fpr: 0.4 },
  { threshold: 0.8, tpr: 0.98, fpr: 0.5 },
  { threshold: 0.9, tpr: 1.0, fpr: 0.7 },
  { threshold: 1.0, tpr: 1.0, fpr: 1.0 },
];

const ROCCurveChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis 
            dataKey="fpr" 
            name="False Positive Rate"
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            domain={[0, 1]}
          />
          <YAxis 
            dataKey="tpr" 
            name="True Positive Rate"
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
            domain={[0, 1]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              `${(value * 100).toFixed(1)}%`,
              name === 'tpr' ? 'True Positive Rate' : 
              name === 'fpr' ? 'False Positive Rate' : name
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <ReferenceLine y={0.5} stroke="hsl(0, 0%, 50%)" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="tpr" 
            stroke="hsl(210, 100%, 70%)" 
            strokeWidth={2}
            name="ROC Curve"
            dot={{ fill: 'hsl(210, 100%, 70%)', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ROCCurveChart = withErrorBoundary(withMemo(ROCCurveChartBase));
export default ROCCurveChart;