/**
 * Simple Card Component - Legacy Style
 * Recreated in the older theme style that was lost during refactoring
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface SimpleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const SimpleCard = React.forwardRef<HTMLDivElement, SimpleCardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseClasses = 'rounded-lg bg-white shadow-sm transition-shadow';
    
    const variants = {
      default: 'border border-gray-200',
      elevated: 'shadow-md border-0',
      outlined: 'border-2 border-gray-300'
    };
    
    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SimpleCard.displayName = 'SimpleCard';

// Add metadata for ComponentLibrary
(SimpleCard as any).metadata = {
  name: 'SimpleCard',
  label: 'Simple Card',
  version: '1.0.0',
  date: '2025-01-16',
  description: 'Simple card component in legacy theme style',
  category: 'Layout',
  tags: ['card', 'legacy', 'simple', 'theme'],
};
