/**
 * Simple Badge Component - Legacy Style
 * Recreated in the older theme style that was lost during refactoring
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface SimpleBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const SimpleBadge = React.forwardRef<HTMLSpanElement, SimpleBadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center rounded-full font-medium';
    
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800'
    };
    
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-base'
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SimpleBadge.displayName = 'SimpleBadge';

// Add metadata for ComponentLibrary
(SimpleBadge as any).metadata = {
  name: 'SimpleBadge',
  label: 'Simple Badge',
  version: '1.0.0',
  date: '2025-01-16',
  description: 'Simple badge component in legacy theme style',
  category: 'Display',
  tags: ['badge', 'legacy', 'simple', 'theme'],
};
