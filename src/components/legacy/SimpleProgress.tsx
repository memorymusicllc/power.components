/**
 * Simple Progress Component - Legacy Style
 * Recreated in the older theme style that was lost during refactoring
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface SimpleProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export const SimpleProgress = React.forwardRef<HTMLDivElement, SimpleProgressProps>(
  ({ className, value = 0, max = 100, variant = 'default', size = 'md', showValue = false, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const baseClasses = 'w-full bg-gray-200 rounded-full overflow-hidden';
    
    const variants = {
      default: 'bg-blue-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      error: 'bg-red-600'
    };
    
    const sizes = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4'
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          sizes[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-in-out',
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
        {showValue && (
          <div className="mt-1 text-sm text-gray-600 text-center">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

SimpleProgress.displayName = 'SimpleProgress';

// Add metadata for ComponentLibrary
(SimpleProgress as any).metadata = {
  name: 'SimpleProgress',
  label: 'Simple Progress',
  version: '1.0.0',
  date: '2025-01-16',
  description: 'Simple progress component in legacy theme style',
  category: 'Display',
  tags: ['progress', 'legacy', 'simple', 'theme'],
};
