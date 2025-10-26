import React from 'react';
import { chartData } from '../../lib/dummy-data';

interface HeatmapChartProps {
  data?: Array<{ x: string; y: string; value: number; color: string }>;
  title?: string;
  width?: number;
  height?: number;
  showLegend?: boolean;
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ 
  data = chartData.heatmapData, 
  title = "Activity Heatmap",
  width = 400,
  height = 300,
  showLegend = true
}) => {
  const xLabels = [...new Set(data.map(d => d.x))];
  const yLabels = [...new Set(data.map(d => d.y))];
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  
  const cellWidth = (width - 100) / xLabels.length;
  const cellHeight = (height - 80) / yLabels.length;
  const padding = 20;

  const getIntensity = (value: number) => {
    return (value - minValue) / (maxValue - minValue);
  };

  const getColor = (value: number) => {
    const intensity = getIntensity(value);
    if (intensity < 0.33) return '#ef4444'; // Red
    if (intensity < 0.66) return '#f59e0b'; // Yellow
    return '#10b981'; // Green
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <svg width={width} height={height} className="overflow-visible">
        {/* Y-axis labels */}
        {yLabels.map((label, index) => (
          <text
            key={label}
            x={padding}
            y={padding + 40 + index * cellHeight + cellHeight / 2}
            textAnchor="end"
            className="text-xs fill-gray-500"
            dominantBaseline="middle"
          >
            {label}
          </text>
        ))}

        {/* X-axis labels */}
        {xLabels.map((label, index) => (
          <text
            key={label}
            x={padding + 80 + index * cellWidth + cellWidth / 2}
            y={height - 10}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {label}
          </text>
        ))}

        {/* Heatmap cells */}
        {data.map((item, index) => {
          const xIndex = xLabels.indexOf(item.x);
          const yIndex = yLabels.indexOf(item.y);
          const x = padding + 80 + xIndex * cellWidth;
          const y = padding + 40 + yIndex * cellHeight;

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={cellWidth - 2}
              height={cellHeight - 2}
              fill={getColor(item.value)}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <title>{`${item.x} ${item.y}: ${item.value}`}</title>
            </rect>
          );
        })}
      </svg>
      
      {showLegend && (
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Low</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10b981' }}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">High</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatmapChart;
