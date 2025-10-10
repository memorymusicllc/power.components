/**
 * Redux UI CodeEditor Component
 * Basic Outline Theme - Simple code editor placeholder
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface CodeEditorProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  language?: string;
}

export const CodeEditor = React.forwardRef<HTMLTextAreaElement, CodeEditorProps>(
  ({ className, value, onChange, language, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[200px] w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    />
  )
);

CodeEditor.displayName = 'CodeEditor';

// Add metadata for ComponentLibrary
(CodeEditor as any).metadata = {
  name: 'CodeEditor',
  label: 'Code Editor',
  version: '1.0.0',
  date: '2025-10-09',
  description: 'A simple code editor component with transparent background and outline borders'
};
