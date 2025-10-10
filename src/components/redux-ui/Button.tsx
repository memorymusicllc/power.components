/**
 * Redux UI Button Component
 * Enhanced with unbound design system and compound patterns
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  BaseComponentProps, 
  VariantProps, 
  AccessibilityProps, 
  AnimationProps,
  ForwardRefComponent 
} from '@/lib/design-system/types';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

export interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  BaseComponentProps,
  Omit<VariantProps, 'state'>,
  AnimationProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
  state?: 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    color = 'primary',
    state = 'default',
    loading = false,
    leftIcon,
    rightIcon,
    children, 
    disabled,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    'aria-disabled': ariaDisabled,
    animate = true,
    animation = 'fadeIn',
    duration = 'normal',
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading || state === 'disabled';
    const currentState = loading ? 'loading' : state;

    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-primary-500 text-primary-50 hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-500',
      outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500',
      ghost: 'text-primary-500 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500',
      destructive: 'bg-error-500 text-error-50 hover:bg-error-600 active:bg-error-700 focus-visible:ring-error-500',
      success: 'bg-success-500 text-success-50 hover:bg-success-600 active:bg-success-700 focus-visible:ring-success-500',
      warning: 'bg-warning-500 text-warning-50 hover:bg-warning-600 active:bg-warning-700 focus-visible:ring-warning-500',
      info: 'bg-info-500 text-info-50 hover:bg-info-600 active:bg-info-700 focus-visible:ring-info-500'
    };
    
    const sizes = {
      xs: 'h-6 px-2 text-xs gap-1',
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 text-base gap-2',
      lg: 'h-12 px-6 text-lg gap-2.5',
      xl: 'h-14 px-8 text-xl gap-3'
    };

    const states = {
      disabled: 'opacity-50 cursor-not-allowed',
      loading: 'opacity-75 cursor-wait',
      default: '',
      hover: '',
      active: '',
      focus: ''
    };

    const animationClasses = animate ? `animate-${animation} duration-${duration}` : '';

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          states[currentState],
          animationClasses,
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-disabled={isDisabled}
        data-component="Button"
        data-variant={variant}
        data-size={size}
        data-color={color}
        data-state={currentState}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className="flex-1">{children}</span>
        {!loading && rightIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

ButtonComponent.displayName = 'Button';

// Enhanced with error boundary and memoization
export const Button = withErrorBoundary(
  withMemo(ButtonComponent),
  {
    fallback: ({ error, resetError }) => (
      <button
        onClick={resetError}
        className="inline-flex items-center justify-center rounded-md font-medium bg-error-500 text-error-50 px-4 py-2"
      >
        Error: {error.message}
      </button>
    )
  }
);

// Add metadata for ComponentLibrary
(Button as any).metadata = {
  name: 'Button',
  label: 'Button',
  version: '2.0.0',
  date: '2025-01-08',
  description: 'Enhanced button component with unbound design system, accessibility, and performance optimization',
  category: 'Interactive',
  tags: ['button', 'interactive', 'form', 'action', 'accessibility', 'performance'],
};
