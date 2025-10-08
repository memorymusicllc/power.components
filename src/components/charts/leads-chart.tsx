
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'New', value: 12, color: '#60B5FF' },
  { name: 'Contacted', value: 8, color: '#FF9149' },
  { name: 'Qualified', value: 5, color: '#72BF78' },
  { name: 'Negotiating', value: 3, color: '#FF90BB' },
  { name: 'Scheduled', value: 2, color: '#A19AD3' },
];

export function LeadsChart() {
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
}

// Component metadata
LeadsChart.metadata = {
  name: "LeadsChart",
  label: "Lead Pipeline Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Pie chart showing lead status distribution"
};
