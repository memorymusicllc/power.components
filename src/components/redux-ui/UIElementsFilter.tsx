/**
 * Redux UI UIElementsFilter Component
 * Basic Outline Theme - Simple filter component
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './Input';
import { Button } from './Button';

export interface UIElementsFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilterChange?: (filter: string) => void;
  placeholder?: string;
}

export const UIElementsFilter = React.forwardRef<HTMLDivElement, UIElementsFilterProps>(
  ({ className, onFilterChange, placeholder = "Filter components...", ...props }, ref) => {
    const [filter, setFilter] = React.useState('');

    const handleFilterChange = (value: string) => {
      setFilter(value);
      onFilterChange?.(value);
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        <Input
          placeholder={placeholder}
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="flex-1"
        />
        {filter && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('')}
          >
            Clear
          </Button>
        )}
      </div>
    );
  }
);

UIElementsFilter.displayName = 'UIElementsFilter';

// Add metadata for ComponentLibrary
(UIElementsFilter as any).metadata = {
  name: 'UIElementsFilter',
  label: 'UI Elements Filter',
  version: '1.0.0',
  date: '2025-10-09',
  description: 'A filter component for UI elements with transparent background and outline borders'
};
