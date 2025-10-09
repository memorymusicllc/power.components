# pow3r.cashout Style Guide
## For AI Agents and Human Developers

### Version: 1.0.0
### Date: 2025-10-08
### Last Updated: 2025-10-08

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Design System](#design-system)
3. [Component Architecture](#component-architecture)
4. [Code Standards](#code-standards)
5. [AI Agent Guidelines](#ai-agent-guidelines)
6. [Human Developer Guidelines](#human-developer-guidelines)
7. [Testing Standards](#testing-standards)
8. [Deployment Guidelines](#deployment-guidelines)

---

## Project Overview

**pow3r.cashout** is a comprehensive multi-platform selling dashboard built with modern web technologies. The application provides tools for listing management, lead tracking, automated responses, and analytics across multiple marketplaces.

### Core Technologies
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables
- **State Management**: Zustand
- **Testing**: Playwright E2E
- **Deployment**: Cloudflare Pages
- **UI Components**: Custom components (NO ShadCN/Next.js per project rules)

---

## Design System

### Color Palette

#### Primary Colors
```css
--primary: 240 5.9% 10%           /* Dark blue-gray */
--primary-foreground: 0 0% 98%    /* Near white */
```

#### Secondary Colors
```css
--secondary: 240 4.8% 95.9%      /* Light gray */
--secondary-foreground: 240 5.9% 10% /* Dark text */
```

#### Semantic Colors
```css
--destructive: 0 84.2% 60.2%     /* Red for errors */
--success: 120 70% 50%            /* Green for success */
--warning: 45 70% 50%             /* Yellow for warnings */
--info: 200 70% 50%               /* Blue for information */
```

#### Neutral Colors
```css
--background: 0 0% 100%            /* White */
--foreground: 240 10% 3.9%        /* Near black */
--muted: 240 4.8% 95.9%           /* Light gray */
--muted-foreground: 240 3.8% 46.1% /* Medium gray */
--border: 240 5.9% 90%            /* Light border */
```

### Typography

#### Font Hierarchy
```css
/* Headings */
h1: 2.5rem (40px) - font-bold
h2: 2rem (32px) - font-semibold  
h3: 1.5rem (24px) - font-medium
h4: 1.25rem (20px) - font-medium

/* Body Text */
body: 1rem (16px) - font-normal
small: 0.875rem (14px) - font-normal
xs: 0.75rem (12px) - font-normal
```

#### Font Weights
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Spacing System

#### Base Unit: 4px
```css
/* Spacing Scale */
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

#### Component Spacing
- **Card Padding**: `p-4 md:p-6`
- **Section Spacing**: `space-y-4 md:space-y-6`
- **Grid Gaps**: `gap-4 md:gap-6`

### Border Radius
```css
--radius: 0.5rem (8px)           /* Default radius */
sm: 0.25rem (4px)                /* Small elements */
md: 0.375rem (6px)               /* Medium elements */
lg: 0.5rem (8px)                 /* Large elements */
xl: 0.75rem (12px)               /* Extra large elements */
```

---

## Component Architecture

### Component Structure

#### 1. Dashboard Cards
```typescript
interface DashboardCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  loading?: boolean
  error?: string
}
```

#### 2. Chart Components
```typescript
interface ChartProps {
  data: any[]
  title?: string
  className?: string
  showLegend?: boolean
  interactive?: boolean
}
```

#### 3. Form Components
```typescript
interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}
```

### Component Naming Convention

#### Files
- **Components**: `PascalCase.tsx` (e.g., `DashboardCard.tsx`)
- **Hooks**: `use-kebab-case.ts` (e.g., `use-dashboard-data.ts`)
- **Utils**: `kebab-case.ts` (e.g., `format-currency.ts`)
- **Types**: `kebab-case.types.ts` (e.g., `dashboard.types.ts`)

#### Components
- **React Components**: `PascalCase` (e.g., `DashboardCard`)
- **Hooks**: `usePascalCase` (e.g., `useDashboardData`)
- **Utils**: `camelCase` (e.g., `formatCurrency`)

### Component Metadata

All components must include metadata:

```typescript
ComponentName.metadata = {
  name: "ComponentName",
  label: "Human Readable Name",
  version: "1.0.0",
  date: "YYYY-MM-DD",
  description: "Brief description of component purpose",
  phase: "Core" | "Phase 1" | "Phase 2",
  category: "Category Name",
  tags: ["tag1", "tag2", "tag3"]
}
```

---

## Code Standards

### TypeScript Configuration

#### Strict Type Checking
```json
{
  "strict": true,
  "noUnusedLocals": false,
  "noUnusedParameters": false,
  "noImplicitAny": true,
  "noImplicitReturns": true
}
```

#### Path Mapping
```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/hooks/*": ["./src/hooks/*"]
  }
}
```

### React Best Practices

#### 1. Component Structure
```typescript
// 1. Imports
import React from 'react'
import { ComponentProps } from './types'

// 2. Interface definitions
interface ComponentProps {
  // props
}

// 3. Component definition
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState()
  
  // 5. Event handlers
  const handleClick = () => {}
  
  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}

// 7. Metadata
ComponentName.metadata = {
  // metadata
}
```

#### 2. State Management
- Use Zustand for global state
- Use React state for local component state
- Prefer composition over inheritance
- Keep components pure when possible

#### 3. Event Handling
```typescript
// Good
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // handle logic
}

// Bad
const handleSubmit = (e: any) => {
  // handle logic
}
```

### CSS/Tailwind Standards

#### 1. Responsive Design
```typescript
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

#### 2. Dark Mode Support
```typescript
// Use CSS variables for theming
<div className="bg-background text-foreground border-border">
  {/* Content */}
</div>
```

#### 3. Component Styling
```typescript
// Use consistent spacing
<div className="p-4 md:p-6 space-y-4">
  <h2 className="text-xl font-semibold">Title</h2>
  <p className="text-muted-foreground">Description</p>
</div>
```

---

## AI Agent Guidelines

### 1. Code Generation Standards

#### Always Include:
- TypeScript interfaces for all props
- Proper error handling
- Loading states
- Accessibility attributes
- Responsive design
- Dark mode support

#### Example Template:
```typescript
interface ComponentProps {
  // Define all props with proper types
}

export function ComponentName({ 
  prop1, 
  prop2 
}: ComponentProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Event handlers with proper typing
  const handleAction = async () => {
    try {
      setLoading(true)
      setError(null)
      // Implementation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="component-container">
      {/* Implementation */}
    </div>
  )
}

// Always include metadata
ComponentName.metadata = {
  name: "ComponentName",
  label: "Human Readable Name",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Component description",
  phase: "Core",
  category: "Category",
  tags: ["tag1", "tag2"]
}
```

### 2. Testing Requirements

#### E2E Tests (Playwright)
```typescript
// Always create E2E tests for new components
test('should render component correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Component Title')).toBeVisible()
  // Additional assertions
})
```

#### Test Coverage
- Visual rendering
- User interactions
- Error states
- Loading states
- Responsive behavior

### 3. Documentation Standards

#### Component Documentation
```typescript
/**
 * Component Name
 * Brief description of component purpose
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @author AI Agent
 */
```

#### API Documentation
```typescript
/**
 * Function description
 * @param param1 - Description of parameter
 * @param param2 - Description of parameter
 * @returns Description of return value
 */
```

### 4. Error Handling

#### Always Implement:
- Try-catch blocks for async operations
- User-friendly error messages
- Fallback UI for error states
- Logging for debugging

```typescript
const handleAsyncOperation = async () => {
  try {
    setLoading(true)
    const result = await apiCall()
    setData(result)
  } catch (error) {
    console.error('Operation failed:', error)
    setError('Failed to load data. Please try again.')
  } finally {
    setLoading(false)
  }
}
```

---

## Human Developer Guidelines

### 1. Development Workflow

#### Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Run tests: `npm test`

#### Code Changes
1. Create feature branch
2. Make changes following style guide
3. Write/update tests
4. Run linting: `npm run lint`
5. Build project: `npm run build`
6. Create pull request

### 2. Git Commit Standards

#### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

#### Examples
```
feat(dashboard): add new analytics widget
fix(charts): resolve rendering issue on mobile
docs(api): update endpoint documentation
```

### 3. Code Review Checklist

#### Before Submitting
- [ ] Code follows TypeScript standards
- [ ] Components include proper metadata
- [ ] Tests are written and passing
- [ ] Responsive design is implemented
- [ ] Dark mode is supported
- [ ] Accessibility attributes are included
- [ ] Error handling is implemented
- [ ] Loading states are handled

#### Review Process
1. Check code quality
2. Verify functionality
3. Test responsive design
4. Validate accessibility
5. Review test coverage
6. Approve or request changes

### 4. Performance Guidelines

#### Optimization
- Use React.memo for expensive components
- Implement proper key props for lists
- Lazy load heavy components
- Optimize images and assets
- Minimize bundle size

#### Monitoring
- Use React DevTools Profiler
- Monitor bundle size
- Check Core Web Vitals
- Test on various devices

---

## Testing Standards

### 1. E2E Testing (Playwright)

#### Test Structure
```typescript
import { test, expect } from './fixtures/base'

test.describe('Component Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render correctly', async ({ page }) => {
    await expect(page.getByText('Component Title')).toBeVisible()
  })

  test('should handle user interactions', async ({ page }) => {
    await page.click('[data-testid="button"]')
    await expect(page.getByText('Success')).toBeVisible()
  })
})
```

#### Test Categories
- **Visual Rendering**: Components display correctly
- **Functionality**: User interactions work
- **Responsive**: Mobile/desktop layouts
- **Accessibility**: Screen reader compatibility
- **Performance**: Loading times and responsiveness

### 2. Unit Testing

#### Component Testing
```typescript
import { render, screen } from '@testing-library/react'
import { ComponentName } from './ComponentName'

test('renders component with props', () => {
  render(<ComponentName title="Test" />)
  expect(screen.getByText('Test')).toBeInTheDocument()
})
```

### 3. Visual Regression Testing

#### Screenshot Testing
```typescript
test('visual regression - component', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('component.png')
})
```

---

## Deployment Guidelines

### 1. Cloudflare Pages Deployment

#### Build Process
```bash
# Install dependencies
npm install

# Build project
npm run pages:build

# Deploy to Cloudflare Pages
npm run pages:deploy
```

#### Environment Variables
```bash
# Production
ENVIRONMENT=production
VERSION_PREFIX=PROD

# Preview
ENVIRONMENT=preview
VERSION_PREFIX=DEV
```

### 2. Version Management

#### Version Format
```
v.{ENVIRONMENT}.{YYYYMMDD.HH.MM}.{CLOUDFLARE_DEPLOYMENT_ID}
```

#### Examples
- Production: `v.PROD.20251008.14.30.abc123`
- Development: `v.DEV.20251008.14.30.def456`

### 3. Quality Gates

#### Pre-deployment Checks
- [ ] All tests pass
- [ ] Build succeeds without errors
- [ ] No TypeScript errors
- [ ] Linting passes
- [ ] E2E tests pass on deployment

#### Post-deployment Verification
- [ ] Application loads correctly
- [ ] All features work as expected
- [ ] Performance metrics are acceptable
- [ ] No console errors
- [ ] Mobile responsiveness verified

---

## Accessibility Standards

### 1. WCAG 2.1 AA Compliance

#### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order is logical and intuitive
- Focus indicators are visible

#### Screen Reader Support
- Semantic HTML elements
- ARIA labels and descriptions
- Alt text for images
- Form labels and error messages

#### Color Contrast
- Minimum 4.5:1 ratio for normal text
- Minimum 3:1 ratio for large text
- Color is not the only means of conveying information

### 2. Implementation Examples

#### Accessible Buttons
```typescript
<button
  type="button"
  aria-label="Close dialog"
  onClick={handleClose}
  className="p-2 rounded-md hover:bg-muted"
>
  <X className="w-4 h-4" />
</button>
```

#### Accessible Forms
```typescript
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    className="w-full px-3 py-2 border rounded-md"
  />
  {error && (
    <p id="email-error" className="text-sm text-destructive">
      {error}
    </p>
  )}
</div>
```

---

## Performance Standards

### 1. Core Web Vitals

#### Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

#### Optimization Strategies
- Lazy load images and components
- Minimize JavaScript bundle size
- Use efficient CSS
- Implement proper caching
- Optimize images (WebP format)

### 2. Bundle Size Management

#### Targets
- Initial bundle: < 500KB
- Chunk size: < 200KB
- Total assets: < 2MB

#### Optimization Techniques
- Code splitting
- Tree shaking
- Dynamic imports
- Asset optimization

---

## Security Guidelines

### 1. Data Protection

#### Input Validation
- Sanitize all user inputs
- Validate data types and formats
- Prevent XSS attacks
- Use proper encoding

#### API Security
- Validate all API responses
- Handle errors gracefully
- Implement rate limiting
- Use HTTPS for all communications

### 2. Best Practices

#### Code Security
```typescript
// Good: Sanitize user input
const sanitizedInput = DOMPurify.sanitize(userInput)

// Bad: Direct user input usage
const htmlContent = userInput
```

---

## Maintenance Guidelines

### 1. Regular Updates

#### Dependencies
- Update monthly
- Test thoroughly after updates
- Keep security patches current
- Document breaking changes

#### Code Maintenance
- Refactor legacy code
- Remove unused dependencies
- Update documentation
- Improve performance

### 2. Monitoring

#### Application Monitoring
- Error tracking (Sentry)
- Performance monitoring
- User analytics
- Uptime monitoring

#### Code Quality
- Regular code reviews
- Automated testing
- Performance audits
- Security scans

---

## Conclusion

This style guide serves as the definitive reference for all development work on pow3r.cashout. Both AI agents and human developers should follow these standards to ensure consistency, quality, and maintainability.

### Key Principles
1. **Consistency**: Follow established patterns and conventions
2. **Quality**: Write clean, maintainable, and tested code
3. **Accessibility**: Ensure inclusive design for all users
4. **Performance**: Optimize for speed and efficiency
5. **Security**: Protect user data and application integrity

### Updates
This style guide should be updated whenever:
- New patterns or conventions are established
- Technology stack changes
- Best practices evolve
- Issues are discovered and resolved

---

**Last Updated**: 2025-10-08  
**Version**: 1.0.0  
**Maintainer**: pow3r.cashout Development Team
