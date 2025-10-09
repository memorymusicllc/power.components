/**
 * Redux UI ResponsiveGrid Component
 * Basic Outline Theme - Simple responsive grid layout
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface GridProviderProps {
  children: React.ReactNode;
  defaultSize?: string;
}

export interface GridSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GridProvider = ({ children, defaultSize }: GridProviderProps) => {
  return <>{children}</>;
};

export const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

ResponsiveGrid.displayName = 'ResponsiveGrid';

export const GridSwitcher = React.forwardRef<HTMLDivElement, GridSwitcherProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
);

GridSwitcher.displayName = 'GridSwitcher';
