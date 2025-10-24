/**
 * Simple Input Component - Legacy Style
 * Recreated in the older theme style that was lost during refactoring
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export const SimpleInput = React.forwardRef<HTMLInputElement, SimpleInputProps>(
  ({ className, variant = 'default', size = 'md', type, ...props }, ref) => {
    const baseClasses = 'flex w-full rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    
    const variants = {
      default: 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus-visible:ring-blue-500',
      outline: 'border-gray-400 bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-blue-500',
      filled: 'border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus-visible:ring-blue-500'
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-3 text-base',
      lg: 'h-12 px-4 text-lg'
    };

    return (
      <input
        type={type}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

SimpleInput.displayName = 'SimpleInput';

// Add metadata for ComponentLibrary
(SimpleInput as any).metadata = {
  name: 'SimpleInput',
  label: 'Simple Input',
  version: '1.0.0',
  date: '2025-01-16',
  description: 'Simple input component in legacy theme style',
  category: 'Form',
  tags: ['input', 'legacy', 'simple', 'theme'],
};
