# Power Components Library

A comprehensive React component library with unbound design system, built with TypeScript and Tailwind CSS.

## 🚀 Features

- **Comprehensive Component Library**: Over 50+ production-ready components
- **Unbound Design System**: Complete separation of design concerns from functionality
- **TypeScript Support**: Full type safety and IntelliSense support
- **Dark Mode**: Built-in dark/light theme switching
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Accessibility**: WCAG 2.1 AA compliant components
- **Performance Optimized**: Lazy loading, memoization, and error boundaries
- **Developer Experience**: Comprehensive documentation and examples

## 📦 Installation

```bash
npm install power-components
# or
yarn add power-components
# or
pnpm add power-components
```

## 🎯 Quick Start

### Standalone Library

The easiest way to explore the component library is through our standalone HTML version:

```bash
# Clone the repository
git clone https://github.com/memorymusicllc/power.components.git
cd power.components

# Serve the standalone library
npm run serve-library
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080/standalone-library.html` in your browser.

### React Integration

```tsx
import React from 'react'
import { ComponentLibrary } from 'power-components'

function App() {
  return (
    <div className="App">
      <ComponentLibrary />
    </div>
  )
}

export default App
```

## 🏗️ Development

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/memorymusicllc/power.components.git
cd power.components

# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Run tests
npm test

# Run Storybook
npm run storybook
```

## 📚 Component Categories

### Core Components
- **DashboardCard**: Standardized container for dashboard widgets
- **PriceChart**: Interactive price history visualization
- **LeadsChart**: Lead pipeline distribution charts

### Phase 1 Components
- **ItemDetailsCollector**: Product information collection forms
- **PhotoProcessor**: Image upload and processing
- **PriceResearcher**: Automated price research tools

### Phase 2 Components
- **AutoPostingEngine**: Multi-platform posting automation
- **LeadMonitor**: Real-time lead monitoring
- **NegotiationManager**: AI-powered negotiation assistance

### Admin Components
- **AdminPanel**: System administration interface
- **UserManager**: User management and permissions

### Communication Components
- **MessageCenter**: Centralized messaging system

## 🎨 Design System

The Power Components library uses an unbound design system that separates design concerns from functionality:

- **Design Tokens**: Complete token system for colors, typography, spacing
- **Theme System**: Multiple themes with CSS variable injection
- **Compound Components**: Flexible composition patterns
- **Polymorphic Components**: Render as different HTML elements

## 🔧 Configuration

### Tailwind CSS

The library is built with Tailwind CSS and includes a comprehensive configuration:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
}
```

### TypeScript

Full TypeScript support with comprehensive type definitions:

```tsx
import { ComponentMetadata } from 'power-components'

interface MyComponentProps {
  title: string
  description?: string
  children: React.ReactNode
}
```

## 📖 Documentation

- [Component Library](standalone-library.html) - Interactive component showcase
- [API Documentation](./docs/api.md) - Complete API reference
- [Design System](./docs/design-system.md) - Design tokens and theming
- [Contributing](./CONTRIBUTING.md) - How to contribute to the library

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

## 📞 Support

- 📧 Email: support@powercomponents.dev
- 🐛 Issues: [GitHub Issues](https://github.com/memorymusicllc/power.components/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/memorymusicllc/power.components/discussions)

---

Made with ❤️ by the Power Components Team
