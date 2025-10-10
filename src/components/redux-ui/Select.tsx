/**
 * Redux UI Select Component
 * Basic Outline Theme - Simple select dropdown
 */

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface SelectContentProps {
  children: React.ReactNode;
}

export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface SelectValueProps {
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, value, onValueChange, ...props }, ref) => (
    <select
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      {...props}
    >
      {children}
    </select>
  )
);

Select.displayName = 'Select';

export const SelectContent = ({ children }: SelectContentProps) => {
  return <>{children}</>;
};

export const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <option
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </option>
  )
);

SelectItem.displayName = 'SelectItem';

export const SelectTrigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <div
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </div>
  )
);

SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = ({ placeholder }: SelectValueProps) => {
  return <span className="text-muted-foreground">{placeholder}</span>;
};
