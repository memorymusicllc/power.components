# Component Library Workflow

## Overview

This document outlines the workflow for creating, validating, and pushing components to the dedicated component repository at `git@github.com:memorymusicllc/power.components.git`.

## Quick Start

### 1. Create a New Component

```bash
# Create your component in the appropriate directory
touch src/components/redux-ui/NewComponent.tsx
```

### 2. Follow the Component Template

```tsx
/**
 * NewComponent - Brief description
 * Enhanced with unbound design system and compound patterns
 * 
 * @version 1.0.0
 * @date 2025-01-08
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  BaseComponentProps, 
  VariantProps, 
  AnimationProps 
} from '@/lib/design-system/types';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

export interface NewComponentProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  BaseComponentProps,
  VariantProps,
  AnimationProps {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const NewComponentBase = React.forwardRef<HTMLDivElement, NewComponentProps>(
  ({ 
    className, 
    variant = 'default',
    size = 'md',
    children,
    'aria-label': ariaLabel,
    animate = true,
    animation = 'fadeIn',
    duration = 'normal',
    ...props 
  }, ref) => {
    const baseClasses = 'base-component-classes';
    
    const variants = {
      default: 'default-variant-classes',
      primary: 'primary-variant-classes',
      secondary: 'secondary-variant-classes'
    };
    
    const sizes = {
      sm: 'small-size-classes',
      md: 'medium-size-classes',
      lg: 'large-size-classes'
    };

    const animationClasses = animate ? `animate-${animation} duration-${duration}` : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          animationClasses,
          className
        )}
        aria-label={ariaLabel}
        data-component="NewComponent"
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NewComponentBase.displayName = 'NewComponent';

// Enhanced with error boundary and memoization
export const NewComponent = withErrorBoundary(
  withMemo(NewComponentBase),
  {
    fallback: ({ error, resetError }) => (
      <div className="p-4 border border-error-500 rounded-lg bg-error-50">
        <p className="text-error-700">Component Error: {error.message}</p>
        <button onClick={resetError} className="mt-2 text-sm text-error-600 underline">
          Try Again
        </button>
      </div>
    )
  }
);

// Add metadata for ComponentLibrary
(NewComponent as any).metadata = {
  name: 'NewComponent',
  label: 'New Component',
  version: '1.0.0',
  date: '2025-01-08',
  description: 'Enhanced component with unbound design system, accessibility, and performance optimization',
  category: 'UI',
  tags: ['component', 'ui', 'accessibility', 'performance'],
};
```

### 3. Validate Your Component

```bash
# Run the validation script
./scripts/push-component.sh src/components/redux-ui/NewComponent.tsx "feat: add new component"
```

### 4. Manual Push (Alternative)

```bash
# Add and commit your changes
git add src/components/redux-ui/NewComponent.tsx
git commit -m "feat: add new component"

# Push to component repository
git push components component-library
```

## Component Requirements

### Mandatory Features

1. **TypeScript Interfaces**: Comprehensive type definitions
2. **Error Boundaries**: Built-in error handling
3. **Performance Optimization**: Memoization and lazy loading
4. **Accessibility**: ARIA attributes and keyboard navigation
5. **Design System Integration**: Use design tokens and theme system
6. **Metadata**: Component metadata for the library
7. **Documentation**: JSDoc comments and usage examples

### Design System Integration

```tsx
// ✅ Correct - Using design tokens
className="bg-primary-500 text-primary-50 hover:bg-primary-600"

// ❌ Incorrect - Hardcoded values
className="bg-blue-500 text-white hover:bg-blue-600"
```

### Accessibility Requirements

```tsx
// ✅ Correct - With accessibility
<button
  aria-label="Close dialog"
  aria-describedby="close-description"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Close
</button>

// ❌ Incorrect - Without accessibility
<button onClick={handleClick}>Close</button>
```

## Validation Process

### Automated Checks

1. **TypeScript Compilation**: Ensures type safety
2. **ESLint**: Code quality and style
3. **Tests**: Unit and integration tests
4. **Build Process**: Ensures components build correctly
5. **Accessibility**: ARIA and keyboard navigation checks
6. **Performance**: Memoization and optimization checks

### Manual Review

1. **Design System Compliance**: Proper use of design tokens
2. **Accessibility**: WCAG 2.1 AA compliance
3. **Documentation**: Complete and accurate documentation
4. **Performance**: Optimization and best practices
5. **Security**: Security best practices

## Repository Structure

```
power.components/
├── src/
│   ├── components/
│   │   └── redux-ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── NewComponent.tsx
│   └── lib/
│       └── design-system/
│           ├── types.ts
│           ├── tokens.ts
│           ├── theme.ts
│           ├── components.ts
│           ├── provider.tsx
│           ├── error-boundary.tsx
│           ├── performance.tsx
│           └── index.ts
├── scripts/
│   └── push-component.sh
├── .github/
│   └── workflows/
│       └── component-validation.yml
├── .cursor/
│   └── rules/
│       ├── component-library-policies.md
│       └── enforcement-mechanisms.md
├── COMPONENT_LIBRARY_DOCUMENTATION.md
└── COMPONENT_WORKFLOW.md
```

## Best Practices

### 1. Component Naming

```tsx
// ✅ Good - Descriptive and clear
export const DataTable = ...
export const UserProfile = ...
export const SearchInput = ...

// ❌ Bad - Unclear or generic
export const Component1 = ...
export const Widget = ...
export const Thing = ...
```

### 2. Props Interface

```tsx
// ✅ Good - Comprehensive and well-documented
export interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  BaseComponentProps,
  VariantProps,
  AnimationProps {
  /** Button variant style */
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Loading state */
  loading?: boolean;
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right icon element */
  rightIcon?: React.ReactNode;
  /** Button content */
  children: React.ReactNode;
}

// ❌ Bad - Minimal or unclear
export interface ButtonProps {
  variant?: string;
  children: React.ReactNode;
}
```

### 3. Error Handling

```tsx
// ✅ Good - Comprehensive error boundary
export const Component = withErrorBoundary(
  withMemo(ComponentBase),
  {
    fallback: ({ error, resetError }) => (
      <div className="error-fallback">
        <p>Error: {error.message}</p>
        <button onClick={resetError}>Try Again</button>
      </div>
    )
  }
);

// ❌ Bad - No error handling
export const Component = ComponentBase;
```

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure all props are properly typed
2. **Design System Import**: Import from `@/lib/design-system`
3. **Accessibility**: Include ARIA attributes and keyboard support
4. **Performance**: Use memoization and lazy loading
5. **Documentation**: Include comprehensive JSDoc comments

### Getting Help

1. Check the component library documentation
2. Review existing components for patterns
3. Run the validation script for specific errors
4. Check the GitHub Actions workflow for automated feedback

## Enforcement

### Automatic Enforcement

- **GitHub Actions**: Automated validation on every push
- **Pre-commit Hooks**: Local validation before commits
- **CI/CD Pipeline**: Continuous integration checks

### Manual Enforcement

- **Code Review**: Manual review of all component changes
- **Policy Compliance**: Adherence to component library policies
- **Documentation Review**: Verification of documentation quality

## Contributing

1. Follow the component template
2. Implement all mandatory features
3. Run validation scripts
4. Create pull request
5. Address review feedback
6. Merge after approval

## Support

For questions or issues with the component library workflow:

1. Check this documentation
2. Review existing components
3. Run validation scripts
4. Create an issue in the component repository
5. Contact the development team
