/**
 * Redux UI Card Component
 * Enhanced with compound patterns and unbound design system
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
  AnimationProps 
} from '@/lib/design-system/types';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

export interface CardProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  BaseComponentProps,
  VariantProps,
  AnimationProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
  interactive?: boolean;
  children: React.ReactNode;
}

export interface CardHeaderProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  children: React.ReactNode;
}

export interface CardContentProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  children: React.ReactNode;
}

export interface CardFooterProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  children: React.ReactNode;
}

export interface CardTitleProps extends 
  React.HTMLAttributes<HTMLHeadingElement>,
  BaseComponentProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
}

export interface CardDescriptionProps extends 
  React.HTMLAttributes<HTMLParagraphElement>,
  BaseComponentProps {
  children: React.ReactNode;
}

const CardComponent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default',
    size = 'md',
    color = 'neutral',
    interactive = false,
    children,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    animate = true,
    animation = 'fadeIn',
    duration = 'normal',
    ...props 
  }, ref) => {
    const baseClasses = 'rounded-lg border bg-surface-50 text-text-900 shadow-sm transition-all duration-200';
    
    const variants = {
      default: 'border-border-200 bg-surface-50',
      elevated: 'border-border-100 shadow-md bg-surface-50',
      outlined: 'border-2 border-primary-200 bg-surface-50',
      filled: 'border-primary-200 bg-primary-50',
      glass: 'border-border-200 bg-surface-50/80 backdrop-blur-sm',
      gradient: 'border-border-200 bg-gradient-to-br from-primary-50 to-secondary-50'
    };
    
    const sizes = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10'
    };

    const interactiveClasses = interactive 
      ? 'cursor-pointer hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2' 
      : '';

    const animationClasses = animate ? `animate-${animation} duration-${duration}` : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          interactiveClasses,
          animationClasses,
          className
        )}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        data-component="Card"
        data-variant={variant}
        data-size={size}
        data-color={color}
        data-interactive={interactive}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardComponent.displayName = 'Card';

const CardHeaderComponent = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      data-slot="header"
      {...props}
    >
      {children}
    </div>
  )
);

CardHeaderComponent.displayName = 'CardHeader';

const CardTitleComponent = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      data-slot="title"
      {...props}
    >
      {children}
    </Component>
  )
);

CardTitleComponent.displayName = 'CardTitle';

const CardDescriptionComponent = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-text-muted-500', className)}
      data-slot="description"
      {...props}
    >
      {children}
    </p>
  )
);

CardDescriptionComponent.displayName = 'CardDescription';

const CardContentComponent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      data-slot="content"
      {...props}
    >
      {children}
    </div>
  )
);

CardContentComponent.displayName = 'CardContent';

const CardFooterComponent = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      data-slot="footer"
      {...props}
    >
      {children}
    </div>
  )
);

CardFooterComponent.displayName = 'CardFooter';

// Enhanced with error boundary and memoization
export const Card = withErrorBoundary(
  withMemo(CardComponent),
  {
    fallback: ({ error, resetError }) => (
      <div className="p-4 border border-error-500 rounded-lg bg-error-50">
        <p className="text-error-700">Card Error: {error.message}</p>
        <button onClick={resetError} className="mt-2 text-sm text-error-600 underline">
          Try Again
        </button>
      </div>
    )
  }
);

export const CardHeader = withErrorBoundary(withMemo(CardHeaderComponent));
export const CardTitle = withErrorBoundary(withMemo(CardTitleComponent));
export const CardDescription = withErrorBoundary(withMemo(CardDescriptionComponent));
export const CardContent = withErrorBoundary(withMemo(CardContentComponent));
export const CardFooter = withErrorBoundary(withMemo(CardFooterComponent));

// Compound component pattern
(Card as any).Header = CardHeader;
(Card as any).Title = CardTitle;
(Card as any).Description = CardDescription;
(Card as any).Content = CardContent;
(Card as any).Footer = CardFooter;

// Add metadata for ComponentLibrary
(Card as any).metadata = {
  name: 'Card',
  label: 'Card',
  version: '2.0.0',
  date: '2025-01-08',
  description: 'Enhanced card component with compound patterns, unbound design system, and accessibility features',
  category: 'Layout',
  tags: ['card', 'container', 'layout', 'content', 'compound', 'accessibility'],
};
