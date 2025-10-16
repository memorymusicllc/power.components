/**
 * Color Chart Component - Using specified color scheme
 * 
 * Colors:
 * - BLUE (PRIMARY): hsl(224.3, 76.3%, 48%)
 * - PURPLE (SECONDARY): hsl(272.1, 71.7%, 47.1%)
 * - GREEN (TERTIARY): hsl(175.9, 60.8%, 19%)
 * - PINK (ACCENT): hsl(172.5, 66%, 50.4%)
 * 
 * Constitutional Authority: Article I, Article III, Article IX
 */

import React from 'react';

interface ColorChartProps {
  data: Array<{
    name: string;
    value: number;
    color: 'primary' | 'secondary' | 'tertiary' | 'accent';
  }>;
  className?: string;
}

const ColorChart: React.FC<ColorChartProps> = ({ data, className = '' }) => {
  const colorMap = {
    primary: 'hsl(224.3, 76.3%, 48%)',    // BLUE
    secondary: 'hsl(272.1, 71.7%, 47.1%)', // PURPLE
    tertiary: 'hsl(175.9, 60.8%, 19%)',   // GREEN
    accent: 'hsl(172.5, 66%, 50.4%)'      // PINK
  };

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className={`bg-white dark:bg-[hsl(0,0%,6%)] border border-[0.8px] border-gray-200 dark:border-[hsl(0,0%,12%)] rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Performance Metrics
      </h3>
      
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colorMap[item.color] }}
            ></div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.name}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.value}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[hsl(0,0%,12%)] rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: colorMap[item.color],
                    width: `${(item.value / maxValue) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Color Legend */}
      <div className="mt-6 pt-4 border-t border-[0.8px] border-gray-200 dark:border-[hsl(0,0%,12%)]">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Color Scheme
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colorMap.primary }}
            ></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Primary (Blue)</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colorMap.secondary }}
            ></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Secondary (Purple)</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colorMap.tertiary }}
            ></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Tertiary (Green)</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colorMap.accent }}
            ></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Accent (Pink)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorChart;
