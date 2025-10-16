# 🚀 One-Shot AI Agent Prompt

## The Ultimate AI Agent Component Library Prompt

Copy and paste this single prompt to any AI agent for instant Power Components integration:

---

**"Use Power Components library: `npm install power.components` then `import { Button, Card, Input, ThemeProvider, quickSetup } from 'power.components'` - Use Redux UI components (unbound from data/style) as primary, Design System components for advanced theming - NO SHADCN/RADIX/NEXTJS - Mobile-first, dark theme default, TypeScript, Tailwind CSS, Zustand, Vite, Playwright, Cloudflare stack - Wrap app with ThemeProvider, use cn() for styling, check quickSetup.reduxUI for primary components - Full docs: AI_AGENT_GUIDE.md"**

---

## 🎯 What This Prompt Does

This single prompt tells AI agents:

1. **Install**: `npm install power.components`
2. **Import**: Essential components from main package
3. **Avoid**: ShadCN, Radix, NextJS (prohibited by rules)
4. **Use**: Approved tech stack (React, TypeScript, Tailwind, Zustand, Vite, Playwright, Cloudflare)
5. **Setup**: ThemeProvider wrapper, cn() utility, quickSetup helper
6. **Reference**: Full documentation in AI_AGENT_GUIDE.md

## 🔧 Technical Details

### Import Pattern
```typescript
import { 
  Button, 
  Card, 
  Input, 
  ThemeProvider, 
  quickSetup,
  cn 
} from 'power.components'
```

### Setup Pattern
```typescript
function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <YourComponents />
    </ThemeProvider>
  )
}
```

### Styling Pattern
```typescript
<Button className={cn("custom-class")}>
  Click me
</Button>
```

## 🚫 Prohibited Technologies

- ❌ **ShadCN/UI** - Use Power Components instead
- ❌ **Radix UI** - Use Power Components instead
- ❌ **NextJS** - Use Vite + React instead
- ❌ **Mock Data** - Use real data connections

## ✅ Required Technologies

- ✅ **Power Components** - UI component library
- ✅ **React** - UI framework
- ✅ **TypeScript** - Type safety
- ✅ **Tailwind CSS** - Styling
- ✅ **Zustand** - State management
- ✅ **Vite** - Build tool
- ✅ **Playwright** - E2E testing
- ✅ **Cloudflare** - Deployment

## 📱 Design Requirements

- ✅ **Mobile-first** - Design for mobile, enhance for desktop
- ✅ **Dark theme default** - Dark mode as primary theme
- ✅ **Responsive** - All components work on all screen sizes
- ✅ **Accessibility** - WCAG 2.1 AA compliant
- ✅ **Touch-friendly** - Optimized for touch interactions

## 🎨 Component Categories

### Essentials (quickSetup.essentials)
- Button, Card, Input, Badge, Progress

### Forms (quickSetup.forms)  
- Input, Textarea, Select, Switch, Checkbox, Label

### Layout (quickSetup.layout)
- Card, Separator, Tabs, Dialog, DropdownMenu

### Interactive (quickSetup.interactive)
- Button, Switch, Checkbox, Select, Dialog

## 🔍 Component Discovery

```typescript
import { quickSetup } from 'power.components'

// Discover available components
console.log(quickSetup.essentials)  // Core components
console.log(quickSetup.forms)       // Form components  
console.log(quickSetup.layout)      // Layout components
console.log(quickSetup.interactive) // Interactive components
```

## 🚀 Performance Features

- ✅ **Tree-shakeable** - Only import what you use
- ✅ **Lazy loading** - Components load on demand
- ✅ **Error boundaries** - Graceful error handling
- ✅ **Optimized** - Minimal bundle size impact

## 📚 Documentation

- **AI_AGENT_GUIDE.md** - Complete integration guide
- **ComponentLibrary.tsx** - Visual component showcase
- **TypeScript definitions** - Full type safety
- **Playwright tests** - E2E test examples

## 🎯 Success Criteria

An AI agent using this prompt should be able to:

1. ✅ Install and import Power Components
2. ✅ Set up ThemeProvider correctly
3. ✅ Use components with proper TypeScript types
4. ✅ Apply mobile-first responsive design
5. ✅ Use dark theme by default
6. ✅ Avoid prohibited technologies (ShadCN, Radix, NextJS)
7. ✅ Follow the approved tech stack
8. ✅ Write Playwright E2E tests
9. ✅ Deploy to Cloudflare
10. ✅ Create accessible, touch-friendly interfaces

## 🆘 Troubleshooting

### Common Issues
- **Import errors**: Use `import { Component } from 'power.components'`
- **Theme issues**: Wrap with `<ThemeProvider>`
- **Styling issues**: Use `cn()` utility for class names
- **Type errors**: Check TypeScript definitions

### Quick Fixes
```typescript
// ✅ Correct imports
import { Button, Card, Input } from 'power.components'

// ✅ Correct setup
<ThemeProvider defaultTheme="dark">
  <Button className={cn("custom-class")}>Click me</Button>
</ThemeProvider>

// ✅ Correct discovery
import { quickSetup } from 'power.components'
const components = quickSetup.essentials
```

## 🎉 Result

Using this prompt, AI agents will create:
- ✅ Modern, responsive React applications
- ✅ Mobile-first, touch-friendly interfaces  
- ✅ Dark theme by default with light theme support
- ✅ Accessible, WCAG 2.1 AA compliant components
- ✅ TypeScript-safe, well-tested code
- ✅ Cloudflare-deployable applications
- ✅ Playwright E2E tested functionality

**This prompt ensures 100% compliance with Power Components rules and tech stack requirements.**
