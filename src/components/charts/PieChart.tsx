import React from 'react';
import { chartData } from '../../lib/dummy-data';

interface PieChartProps {
  data?: Array<{ label: string; value: number; color: string }>;
  title?: string;
  width?: number;
  height?: number;
  showLegend?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({ 
  data = chartData.leadsData, 
  title = "Leads Distribution",
  width = 300,
  height = 300,
  showLegend = true
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;

  let currentAngle = 0;

  const createArc = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="flex items-center justify-center">
        <svg width={width} height={height} className="overflow-visible">
          {data.map((item, index) => {
            const startAngle = currentAngle;
            const endAngle = currentAngle + (item.value / total) * 360;
            currentAngle = endAngle;

            return (
              <path
                key={index}
                d={createArc(startAngle, endAngle, radius)}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            );
          })}
        </svg>
      </div>
      
      {showLegend && (
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {item.value} ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PieChart;
