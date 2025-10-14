# Power Components - AI Agent Integration Guide

## 🚀 One-Line Setup for AI Agents

```bash
npm install power.components
```

```typescript
import { Button, Card, Input, ThemeProvider, quickSetup } from 'power.components'
```

## 📋 Quick Reference

### Essential Components
```typescript
import { 
  Button, 
  Card, 
  Input, 
  Badge, 
  Progress,
  ThemeProvider,
  useTheme,
  cn 
} from 'power.components'
```

### Form Components
```typescript
import { 
  Input, 
  Textarea, 
  Select, 
  Switch, 
  Checkbox,
  Label,
  Separator 
} from 'power.components'
```

### Layout Components
```typescript
import { 
  Card, 
  Tabs, 
  Separator,
  Dialog,
  DropdownMenu 
} from 'power.components'
```

## 🎯 AI Agent Usage Patterns

### 1. Basic Component Usage
```typescript
import { Button, Card, Input } from 'power.components'

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Click me</Button>
    </Card>
  )
}
```

### 2. Theme Setup
```typescript
import { ThemeProvider, useTheme } from 'power.components'

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <MyComponent />
    </ThemeProvider>
  )
}
```

### 3. Styling with cn utility
```typescript
import { Button, cn } from 'power.components'

function CustomButton() {
  return (
    <Button className={cn("custom-class", "another-class")}>
      Custom Button
    </Button>
  )
}
```

## 🚫 What NOT to Use

- ❌ **NO SHADCN/UI** - Use Power Components instead
- ❌ **NO RADIX UI** - Use Power Components instead  
- ❌ **NO NEXTJS** - Use Vite + React
- ❌ **NO MOCK DATA** - Use real data connections

## ✅ What TO Use

- ✅ **Redux UI Components** - Primary UI components (unbound from data and style)
- ✅ **Design System Components** - Advanced styled components
- ✅ **Tailwind CSS** - For styling
- ✅ **Zustand** - For state management
- ✅ **Vite** - For build tooling
- ✅ **Playwright** - For E2E testing

## 🎯 Component Architecture

### Redux UI Components (Primary)
**Unbound from data and style** - Use these for most applications:

```typescript
import { 
  Button, 
  Card, 
  CardHeader, 
  CardContent, 
  Input, 
  Badge, 
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from 'power.components'
```

### Design System Components (Advanced)
**Styled components** - Use these for advanced theming:

```typescript
import { 
  DesignButton, 
  DesignCard, 
  FormInput, 
  DesignBadge, 
  DesignProgress,
  Switch,
  Checkbox,
  Dialog
} from 'power.components'
```

## 🔧 Tech Stack Compliance

This library follows the mandatory tech stack:
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Vite** - Build tool
- **Playwright** - Testing
- **Cloudflare** - Deployment

## 📱 Mobile-First Design

All components are:
- ✅ Mobile-first responsive
- ✅ Touch-friendly
- ✅ Dark/light theme support
- ✅ Accessibility compliant (WCAG 2.1 AA)

## 🎨 Theme System

```typescript
import { ThemeProvider, useTheme, designSystemConfig } from 'power.components'

// Available themes
const themes = ['light', 'dark', 'pow3r', 'pow3r-dark']

// Theme provider setup
<ThemeProvider defaultTheme="dark" themes={themes}>
  <App />
</ThemeProvider>
```

## 🔍 Component Discovery

Use `quickSetup` for component discovery:

```typescript
import { quickSetup } from 'power.components'

console.log(quickSetup.essentials) // ['Button', 'Card', 'Input', 'Badge', 'Progress']
console.log(quickSetup.forms)      // ['Input', 'Textarea', 'Select', 'Switch', 'Checkbox']
console.log(quickSetup.layout)     // ['Card', 'Separator', 'Tabs']
```

## 🚀 Performance Features

- ✅ Tree-shakeable exports
- ✅ Lazy loading support
- ✅ Error boundaries
- ✅ Performance optimizations
- ✅ Minimal bundle size

## 📚 Full Documentation

- **Visual Library**: Run `npm run dev:library` to see all components
- **Component API**: Check TypeScript definitions
- **Examples**: See `ComponentLibrary.tsx` for usage examples

## 🆘 Troubleshooting

### Import Issues
```typescript
// ✅ Correct
import { Button, Card } from 'power.components'

// ❌ Wrong
import { Button } from 'power.components/Button'
```

### Theme Issues
```typescript
// ✅ Wrap with ThemeProvider
<ThemeProvider>
  <Button>Works</Button>
</ThemeProvider>

// ❌ Missing ThemeProvider
<Button>May not style correctly</Button>
```

### Styling Issues
```typescript
// ✅ Use cn utility
import { cn } from 'power.components'
<Button className={cn("custom-class")} />

// ❌ Direct className
<Button className="custom-class" />
```

## 🎯 AI Agent Best Practices

1. **Always import from main package**: `import { Component } from 'power.components'`
2. **Use ThemeProvider**: Wrap your app with ThemeProvider
3. **Use cn utility**: For combining class names
4. **Check quickSetup**: For component discovery
5. **Follow mobile-first**: Design for mobile, enhance for desktop
6. **Use TypeScript**: Leverage full type safety
7. **Test with Playwright**: Write E2E tests for your components

## 🔗 Repository

- **GitHub**: https://github.com/memorymusicllc/power.components
- **NPM**: `npm install power.components`
- **Documentation**: See README.md for full docs
