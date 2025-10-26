import React from 'react';
import { MetricData } from '../../lib/dummy-data';

interface MetricCardProps {
  data: MetricData;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ data, className = '' }) => {
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      case 'duration':
        return `${value}ms`;
      default:
        return value.toLocaleString();
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{data.label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatValue(data.value, data.format)}
          </p>
        </div>
        <div className={`text-sm font-medium ${getTrendColor(data.trend)}`}>
          <span className="flex items-center">
            {getTrendIcon(data.trend)}
            <span className="ml-1">{Math.abs(data.change)}%</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
