# pow3r.cashout Component Library Documentation

## Overview

The pow3r.cashout Component Library is a best-in-class, unbound design system built with React, TypeScript, and Tailwind CSS. It provides modular, reusable, flexible, and robust components that are completely separated from design concerns, allowing for maximum customization and theming.

## Key Features

### 🎨 Unbound Design System
- **Design Tokens**: Complete token system for colors, typography, spacing, shadows, and more
- **Theme System**: Multiple themes with CSS variable injection and runtime switching
- **Design Separation**: Components are completely unbound from specific design implementations

### 🧩 Compound Component Patterns
- **Composition**: Components can be composed together for maximum flexibility
- **Slots**: Named slots for different parts of components
- **Polymorphic**: Components can render as different HTML elements

### ♿ Accessibility First
- **ARIA Support**: Full ARIA attribute support
- **Keyboard Navigation**: Complete keyboard navigation support
- **Screen Reader**: Optimized for screen readers
- **Focus Management**: Proper focus management and indicators

### ⚡ Performance Optimized
- **Error Boundaries**: Comprehensive error handling
- **Lazy Loading**: Built-in lazy loading capabilities
- **Memoization**: Automatic memoization for performance
- **Virtualization**: Virtual scrolling for large lists

### 🔧 Developer Experience
- **TypeScript**: Full TypeScript support with comprehensive types
- **IntelliSense**: Complete IntelliSense support
- **Documentation**: Comprehensive documentation and examples
- **Testing**: Built-in testing utilities

## Architecture

### Design System Structure

```
src/lib/design-system/
├── types.ts           # TypeScript type definitions
├── tokens.ts          # Design tokens
├── theme.ts           # Theme system
├── components.ts      # Component configurations
├── provider.tsx       # Theme provider and context
├── error-boundary.tsx # Error handling
├── performance.tsx    # Performance utilities
└── index.ts          # Main exports
```

### Component Structure

```
src/components/
├── redux-ui/          # Enhanced Redux UI components
│   ├── Button.tsx     # Enhanced button component
│   ├── Card.tsx       # Enhanced card component
│   └── index.ts       # Component exports
├── ui/                # ShadCN UI components
└── charts/            # Chart components
```

## Design Tokens

### Color System

The design system uses a comprehensive color token system with semantic naming:

```typescript
// Primary colors
primary: {
  50: 'hsl(210, 95%, 95%)',
  100: 'hsl(210, 90%, 90%)',
  // ... up to 950
}

// Semantic colors
success: ColorScale
warning: ColorScale
error: ColorScale
info: ColorScale
```

### Typography

```typescript
typography: {
  fontFamily: {
    sans: ['ui-sans-serif', 'system-ui', ...],
    serif: ['ui-serif', 'Georgia', ...],
    mono: ['ui-monospace', 'SFMono-Regular', ...]
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    // ... up to 9xl
  }
}
```

### Spacing & Sizing

```typescript
spacing: {
  0: '0px',
  px: '1px',
  0.5: '0.125rem',
  // ... up to 96
}

sizing: {
  button: {
    xs: { height: '1.5rem', padding: '0.25rem 0.5rem' },
    sm: { height: '2rem', padding: '0.375rem 0.75rem' },
    // ...
  }
}
```

## Theme System

### Creating Themes

```typescript
import { createTheme, createDarkTheme } from '@/lib/design-system'

// Light theme
const lightTheme = createTheme('light')

// Dark theme
const darkTheme = createDarkTheme('dark')

// Custom theme
const customTheme = createTheme('custom', {
  colors: {
    primary: {
      500: '#your-color'
    }
  }
})
```

### Using Themes

```tsx
import { ThemeProvider, useTheme } from '@/lib/design-system'

function App() {
  return (
    <ThemeProvider defaultTheme="pow3r">
      <YourApp />
    </ThemeProvider>
  )
}

function Component() {
  const { theme, setTheme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Switch to {theme.name === 'dark' ? 'light' : 'dark'} theme
    </button>
  )
}
```

## Components

### Button Component

Enhanced button component with multiple variants, sizes, and states:

```tsx
import { Button } from '@/components/redux-ui'

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="outline" size="lg">Outline Button</Button>
<Button variant="destructive" size="sm">Delete</Button>

// With icons
<Button leftIcon={<Icon />} rightIcon={<Icon />}>
  Button with Icons
</Button>

// Loading state
<Button loading>Loading...</Button>

// Accessibility
<Button aria-label="Close dialog" aria-describedby="close-description">
  ×
</Button>
```

#### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outline' \| 'ghost' \| 'destructive' \| 'success' \| 'warning' \| 'info'` | `'default'` | Button variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `color` | `'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Button color |
| `loading` | `boolean` | `false` | Loading state |
| `leftIcon` | `ReactNode` | - | Left icon |
| `rightIcon` | `ReactNode` | - | Right icon |
| `disabled` | `boolean` | `false` | Disabled state |

### Card Component

Compound card component with header, content, and footer slots:

```tsx
import { Card } from '@/components/redux-ui'

// Basic usage
<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description</Card.Description>
  </Card.Header>
  <Card.Content>
    Card content goes here
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// With variants
<Card variant="elevated" size="lg">
  <Card.Content>Elevated card</Card.Content>
</Card>

<Card variant="glass" interactive>
  <Card.Content>Interactive glass card</Card.Content>
</Card>
```

#### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled' \| 'glass' \| 'gradient'` | `'default'` | Card variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Card size |
| `interactive` | `boolean` | `false` | Interactive card |
| `color` | `'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'neutral'` | Card color |

## Error Handling

### Error Boundaries

All components are wrapped with error boundaries for robust error handling:

```tsx
import { ErrorBoundary, withErrorBoundary } from '@/lib/design-system'

// Using ErrorBoundary component
<ErrorBoundary
  fallback={({ error, resetError }) => (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={resetError}>Try Again</button>
    </div>
  )}
>
  <YourComponent />
</ErrorBoundary>

// Using HOC
const SafeComponent = withErrorBoundary(YourComponent, {
  fallback: ({ error, resetError }) => <ErrorFallback error={error} resetError={resetError} />
})
```

### Error Reporting

```tsx
import { createErrorReporter } from '@/lib/design-system'

const errorReporter = createErrorReporter('user-id')

// Report errors
errorReporter(error, errorInfo, 'ComponentName')
```

## Performance

### Lazy Loading

```tsx
import { LazyComponent, createLazyComponent } from '@/lib/design-system'

// Lazy component with fallback
<LazyComponent fallback={<div>Loading...</div>} delay={300}>
  <ExpensiveComponent />
</LazyComponent>

// Lazy component factory
const LazyChart = createLazyComponent(
  () => import('./Chart'),
  <div>Loading chart...</div>,
  500
)
```

### Virtualization

```tsx
import { VirtualizedList } from '@/lib/design-system'

<VirtualizedList
  itemCount={10000}
  itemSize={50}
  renderItem={(index, style) => (
    <div style={style}>Item {index}</div>
  )}
/>
```

### Memoization

```tsx
import { withMemo, usePerformanceMonitor } from '@/lib/design-system'

// Memoized component
const MemoizedComponent = withMemo(ExpensiveComponent)

// Performance monitoring
function Component() {
  const metrics = usePerformanceMonitor('ComponentName')
  // metrics.renderTime, metrics.updateCount, etc.
}
```

## Accessibility

### ARIA Support

All components support comprehensive ARIA attributes:

```tsx
<Button
  aria-label="Close dialog"
  aria-describedby="close-description"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
>
  Close
</Button>
```

### Keyboard Navigation

```tsx
// Automatic keyboard navigation support
<Card
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Interactive Card
</Card>
```

### Focus Management

```tsx
// Focus indicators and management
<Button
  className="focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  onFocus={handleFocus}
  onBlur={handleBlur}
>
  Button with Focus Management
</Button>
```

## Best Practices

### 1. Use Design Tokens

```tsx
// ✅ Good - Using design tokens
<Button className="bg-primary-500 text-primary-50 hover:bg-primary-600">

// ❌ Bad - Hardcoded values
<Button className="bg-blue-500 text-white hover:bg-blue-600">
```

### 2. Leverage Compound Patterns

```tsx
// ✅ Good - Using compound components
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>

// ❌ Bad - Manual composition
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Title</h3>
  </div>
  <div className="card-content">Content</div>
</div>
```

### 3. Provide Accessibility

```tsx
// ✅ Good - With accessibility
<Button
  aria-label="Delete item"
  aria-describedby="delete-warning"
  onClick={handleDelete}
>
  Delete
</Button>

// ❌ Bad - Without accessibility
<Button onClick={handleDelete}>Delete</Button>
```

### 4. Use Error Boundaries

```tsx
// ✅ Good - With error boundary
const SafeComponent = withErrorBoundary(Component, {
  fallback: ({ error, resetError }) => <ErrorFallback error={error} resetError={resetError} />
})

// ❌ Bad - Without error handling
<Component />
```

### 5. Optimize Performance

```tsx
// ✅ Good - Memoized component
const MemoizedComponent = withMemo(ExpensiveComponent)

// ✅ Good - Lazy loading
const LazyComponent = createLazyComponent(() => import('./Component'))

// ❌ Bad - No optimization
<ExpensiveComponent />
```

## Migration Guide

### From Basic Components

1. **Update imports**:
   ```tsx
   // Old
   import { Button } from '@/components/ui/button'
   
   // New
   import { Button } from '@/components/redux-ui'
   ```

2. **Add theme provider**:
   ```tsx
   import { ThemeProvider } from '@/lib/design-system'
   
   function App() {
     return (
       <ThemeProvider>
         <YourApp />
       </ThemeProvider>
     )
   }
   ```

3. **Use new props**:
   ```tsx
   // Old
   <Button variant="outline" size="sm">
   
   // New - same API, enhanced features
   <Button variant="outline" size="sm" loading={isLoading}>
   ```

## Testing

### Component Testing

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/redux-ui'

test('renders button with correct text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
})

test('handles loading state', () => {
  render(<Button loading>Loading</Button>)
  expect(screen.getByRole('button')).toBeDisabled()
})
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe'

test('button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## Contributing

### Adding New Components

1. Create component in `src/components/redux-ui/`
2. Follow the established patterns:
   - Use TypeScript interfaces
   - Implement error boundaries
   - Add accessibility features
   - Include performance optimizations
   - Add comprehensive metadata

3. Update exports in `index.ts`
4. Add documentation
5. Write tests

### Design Token Guidelines

1. Use semantic naming
2. Provide all scale values (50-950)
3. Include both light and dark variants
4. Document usage examples

## Support

For questions, issues, or contributions:

- **Documentation**: This file and inline code comments
- **Examples**: Component Library page in the application
- **Issues**: GitHub issues
- **Discussions**: GitHub discussions

## License

This component library is part of the pow3r.cashout project and follows the same licensing terms.
