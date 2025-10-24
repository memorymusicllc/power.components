/**
 * Simple Button Component - Legacy Style
 * Recreated in the older theme style that was lost during refactoring
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const SimpleButton = React.forwardRef<HTMLButtonElement, SimpleButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-500',
      outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500'
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg'
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SimpleButton.displayName = 'SimpleButton';

// Add metadata for ComponentLibrary
(SimpleButton as any).metadata = {
  name: 'SimpleButton',
  label: 'Simple Button',
  version: '1.0.0',
  date: '2025-01-16',
  description: 'Simple button component in legacy theme style',
  category: 'Interactive',
  tags: ['button', 'legacy', 'simple', 'theme'],
};
