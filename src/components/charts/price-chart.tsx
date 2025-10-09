
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { date: 'Day 1', price: 4200, retail: 4573 },
  { date: 'Day 2', price: 4200, retail: 4573 },
  { date: 'Day 3', price: 4200, retail: 4573 },
  { date: 'Day 4', price: 4200, retail: 4573 },
  { date: 'Day 5', price: 4200, retail: 4573 },
  { date: 'Day 6', price: 4200, retail: 4573 },
  { date: 'Day 7', price: 4200, retail: 4573 },
];

export function PriceChart() {
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
            domain={['dataMin - 200', 'dataMax + 200']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => [
              `$${value?.toLocaleString() ?? 'N/A'}`,
              name === 'price' ? 'My Price' : 'Retail Price'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            name="My Price"
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="retail" 
            stroke="hsl(var(--destructive))" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Retail Price"
            dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Component metadata
PriceChart.metadata = {
  name: "PriceChart",
  label: "Price History Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Line chart showing price trends over time"
};
