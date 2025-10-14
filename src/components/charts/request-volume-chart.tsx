/**
 * Request Volume Chart Component
 * Shows API request volume and traffic patterns
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { hour: '00', requests: 120, errors: 2, latency: 150 },
  { hour: '04', requests: 80, errors: 1, latency: 120 },
  { hour: '08', requests: 450, errors: 8, latency: 200 },
  { hour: '12', requests: 380, errors: 5, latency: 180 },
  { hour: '16', requests: 320, errors: 3, latency: 160 },
  { hour: '20', requests: 200, errors: 1, latency: 140 },
];

const RequestVolumeChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="hour" 
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
          />
          <YAxis 
            tickLine={false} 
            tick={{ fontSize: 10 }}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              name === 'requests' ? `${value} requests` : 
              name === 'errors' ? `${value} errors` : 
              `${value}ms`,
              name === 'requests' ? 'Requests' : 
              name === 'errors' ? 'Errors' : 'Avg Latency'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Bar dataKey="requests" fill="hsl(210, 100%, 70%)" name="Requests" />
          <Bar dataKey="errors" fill="hsl(0, 100%, 60%)" name="Errors" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const RequestVolumeChart = withErrorBoundary(withMemo(RequestVolumeChartBase));
export default RequestVolumeChart;