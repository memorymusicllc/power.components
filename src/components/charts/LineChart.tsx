import React from 'react';
import { chartData } from '../../lib/dummy-data';

interface LineChartProps {
  data?: ChartDataPoint[];
  title?: string;
  width?: number;
  height?: number;
  showLegend?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data = chartData.performanceMetrics, 
  title = "Performance Metrics",
  width = 400,
  height = 200,
  showLegend = true
}) => {
  const maxY = Math.max(...data.map(d => d.y));
  const minY = Math.min(...data.map(d => d.y));
  const range = maxY - minY;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const getX = (index: number) => (index / (data.length - 1)) * chartWidth + padding;
  const getY = (value: number) => chartHeight - ((value - minY) / range) * chartHeight + padding;

  const pathData = data.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getY(point.y)}`
  ).join(' ');

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <g key={index}>
            <line
              x1={padding}
              y1={padding + ratio * chartHeight}
              x2={width - padding}
              y2={padding + ratio * chartHeight}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={padding - 10}
              y={padding + ratio * chartHeight + 4}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              {Math.round(minY + (1 - ratio) * range)}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {data.map((point, index) => (
          <text
            key={index}
            x={getX(index)}
            y={height - 5}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {point.x}
          </text>
        ))}

        {/* Line path */}
        <path
          d={pathData}
          fill="none"
          stroke={data[0]?.color || '#3b82f6'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((point, index) => (
          <circle
            key={index}
            cx={getX(index)}
            cy={getY(point.y)}
            r="4"
            fill={point.color || '#3b82f6'}
            stroke="white"
            strokeWidth="2"
          />
        ))}
      </svg>
      
      {showLegend && (
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data[0]?.color || '#3b82f6' }}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{data[0]?.label}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineChart;
