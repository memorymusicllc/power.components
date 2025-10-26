import React from 'react';
import { chartData } from '../../lib/dummy-data';

interface BarChartProps {
  data?: ChartDataPoint[];
  title?: string;
  width?: number;
  height?: number;
  showLegend?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data = chartData.monthlyRevenue, 
  title = "Monthly Revenue",
  width = 400,
  height = 200,
  showLegend = true
}) => {
  const maxY = Math.max(...data.map(d => d.y));
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / data.length * 0.8;
  const barSpacing = chartWidth / data.length * 0.2;

  const getX = (index: number) => padding + (index * (barWidth + barSpacing)) + barSpacing / 2;
  const getY = (value: number) => padding + chartHeight - (value / maxY) * chartHeight;
  const getBarHeight = (value: number) => (value / maxY) * chartHeight;

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
              {Math.round(maxY * (1 - ratio))}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((item, index) => (
          <g key={index}>
            <rect
              x={getX(index)}
              y={getY(item.y)}
              width={barWidth}
              height={getBarHeight(item.y)}
              fill={item.color || '#3b82f6'}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
            <text
              x={getX(index) + barWidth / 2}
              y={height - 5}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {item.x}
            </text>
            <text
              x={getX(index) + barWidth / 2}
              y={getY(item.y) - 5}
              textAnchor="middle"
              className="text-xs fill-gray-700 dark:fill-gray-300 font-medium"
            >
              {item.y.toLocaleString()}
            </text>
          </g>
        ))}
      </svg>
      
      {showLegend && (
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: data[0]?.color || '#3b82f6' }}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarChart;
