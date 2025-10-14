
# Power Components v3 - Autonomous AI-Agent Component Ecosystem

🚀 **Schema-driven, self-healing, X-FILES enabled component library** with autonomous workflows, JSON intelligence paths, and constitutional compliance. The world's first truly autonomous component ecosystem.

## ⚡ One-Line Setup for AI Agents

```bash
npm install power.components
```

```typescript
import { ButtonV3, CardV3, InputV3, ThemeProvider, quickSetup } from 'power.components'
```

## 🎯 Pow3r v3 Features

### 🧬 Schema-Driven Architecture
- **JSON as Intelligence Paths**: Components derive behavior from schemas
- **Real-time Reconfiguration**: Dynamic updates without code changes
- **Constitutional Compliance**: Automated governance and quality assurance

### 🔧 X-FILES System
- **In-Situ Triage**: Real-time issue detection and management
- **CaseFile Management**: Comprehensive issue tracking and resolution
- **Agent Coordination**: Multi-agent collaboration for problem solving

### 🛡️ Self-Healing Capabilities
- **Autonomous Repair**: Components diagnose and fix themselves
- **Performance Monitoring**: Continuous optimization and improvement
- **Error Recovery**: Automatic error handling and state restoration

### 📊 Enhanced Observability
- **Metrics Collection**: Comprehensive component and system metrics
- **Health Assessment**: Continuous system health evaluation
- **Predictive Analytics**: Proactive issue prevention

## 🎯 AI Agent Quick Start

**Copy this prompt for AI agents:**
> "Use Power Components v3 library: `npm install power.components` then `import { ButtonV3, CardV3, InputV3, ThemeProvider, quickSetup } from 'power.components'` - Schema-driven, self-healing, X-FILES enabled - NO SHADCN/RADIX/NEXTJS - Mobile-first, dark theme default, TypeScript, Tailwind CSS, Zustand, Vite, Playwright, Cloudflare stack - Wrap app with ThemeProvider, use cn() for styling, check quickSetup for components - Full docs: AI_AGENT_GUIDE.md - Constitution: pow3r.v3.law.md"

## 🚫 What This Library Replaces

- ❌ **NO SHADCN/UI** - Use Power Components instead
- ❌ **NO RADIX UI** - Use Power Components instead  
- ❌ **NO NEXTJS** - Use Vite + React instead
- ❌ **NO MOCK DATA** - Use real data connections

## ✅ Approved Tech Stack

- ✅ **React** - UI framework
- ✅ **TypeScript** - Type safety
- ✅ **Tailwind CSS** - Styling
- ✅ **Zustand** - State management
- ✅ **Vite** - Build tool
- ✅ **Playwright** - E2E testing
- ✅ **Cloudflare** - Deployment
- ✅ **Redux UI** - Unbound from data and style

## 🎨 Component Library Features

### Core Components
- **Button** - Interactive buttons with variants
- **Card** - Container components with slots
- **Input** - Form input components
- **Badge** - Status and label indicators
- **Progress** - Progress indicators
- **Tabs** - Tab navigation components

### Form Components
- **Input, Textarea, Label** - Text input components
- **Select, Switch, Checkbox** - Selection components
- **Dialog, DropdownMenu** - Modal and menu components
- **Separator** - Visual dividers

### Design System
- **Unbound Design System** - Complete separation of concerns
- **Theme System** - Dark/light theme support
- **Design Tokens** - Consistent styling system
- **Compound Components** - Flexible component patterns
- **Error Boundaries** - Graceful error handling
- **Performance Optimized** - Lazy loading, memoization

## 📱 Mobile-First Design

- ✅ **Responsive** - Works on all screen sizes
- ✅ **Touch-friendly** - Optimized for touch interactions
- ✅ **Dark theme default** - Dark mode as primary theme
- ✅ **Accessibility** - WCAG 2.1 AA compliant
- ✅ **Performance** - Tree-shakeable, minimal bundle size

## 🔧 Usage Examples

### Basic Setup
```typescript
import { Button, Card, Input, ThemeProvider } from 'power.components'

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Card>
        <Input placeholder="Enter text..." />
        <Button>Click me</Button>
      </Card>
    </ThemeProvider>
  )
}
```

### Component Discovery
```typescript
import { quickSetup } from 'power.components'

// Discover available components
console.log(quickSetup.essentials)  // ['Button', 'Card', 'Input', 'Badge', 'Progress']
console.log(quickSetup.forms)       // ['Input', 'Textarea', 'Select', 'Switch', 'Checkbox']
console.log(quickSetup.layout)      // ['Card', 'Separator', 'Tabs']
```

### Styling
```typescript
import { Button, cn } from 'power.components'

<Button className={cn("custom-class", "another-class")}>
  Custom Button
</Button>
```

## 🚀 Additional Components

This repository also contains specialized plugins:

### 🔒 Power Redact Plugin v2.0
Advanced text redaction and privacy protection for sensitive information.

**Location:** `power-redact/`

### 🎨 Power Canvas Plugin  
Enhanced canvas functionality with advanced drawing tools and interactive elements.

**Location:** `power-canvas/`

## 📦 Quick Installation

### Option 1: Individual Plugin Installation
```bash
# Install Power Redact Plugin
cd your-obsidian-vault/.obsidian/plugins/
git clone https://github.com/memorymusicllc/power.components.git
cd power.components/power-redact
npm install && npm run build

# Install Power Canvas Plugin
cd ../power-canvas
npm install && npm run build
```

### Option 2: Automated Installation
```bash
# Clone repository
git clone https://github.com/memorymusicllc/power.components.git
cd power.components

# Run installation script
chmod +x scripts/install-all.sh
./scripts/install-all.sh /path/to/your/obsidian/vault
```

## 📚 Documentation

- **[Installation Guide](INSTALLATION.md)** - Complete setup instructions
- **[Architecture Overview](ARCHITECTURE.md)** - System design and relationships
- **[Development Guide](DEVELOPMENT.md)** - Contributing and development setup
- **[Power Redact Guide](docs/POWER_REDACT_GUIDE.md)** - Detailed usage for redaction plugin
- **[Power Canvas Guide](docs/POWER_CANVAS_GUIDE.md)** - Detailed usage for canvas plugin
- **[Integration Guide](docs/INTEGRATION_GUIDE.md)** - Using both plugins together
- **[Changelog](CHANGELOG.md)** - Version history and updates

## 🏗️ Project Structure

```
power.components/
├── power-redact/              # Power Redact Plugin v2.0
│   ├── src/                   # Source code
│   ├── styles/                # CSS styles
│   ├── manifest.json          # Plugin manifest
│   └── README.md              # Plugin-specific documentation
├── power-canvas/              # Power Canvas Plugin
│   ├── src/                   # Source code
│   ├── styles/                # CSS styles
│   ├── manifest.json          # Plugin manifest
│   └── README.md              # Plugin-specific documentation
├── docs/                      # Comprehensive documentation
├── scripts/                   # Build and installation scripts
└── README.md                  # This file
```

## 🔧 Development

### Prerequisites
- Node.js 16+ and npm
- Obsidian for testing
- TypeScript knowledge recommended

### Setup Development Environment
```bash
# Clone repository
git clone https://github.com/memorymusicllc/power.components.git
cd power.components

# Install dependencies for both plugins
npm run install-all

# Build all components
npm run build-all

# Start development mode
npm run dev
```

### Building Individual Components
```bash
# Build Power Redact Plugin
cd power-redact && npm run build

# Build Power Canvas Plugin
cd power-canvas && npm run build
```

## 🤝 Contributing

We welcome contributions! Please see our [Development Guide](DEVELOPMENT.md) for details on:

- Code style and standards
- Testing requirements
- Pull request process
- Issue reporting guidelines

## 📋 Requirements

- **Obsidian:** v1.4.0 or higher
- **Node.js:** v16.0.0 or higher
- **npm:** v8.0.0 or higher

## 🔗 Integration Examples

### Using Both Plugins Together
```typescript
// Example: Redact sensitive data before canvas export
const redactedContent = await powerRedact.processText(canvasContent);
const canvas = await powerCanvas.createFromContent(redactedContent);
await canvas.export('secure-diagram.png');
```

See the [Integration Guide](docs/INTEGRATION_GUIDE.md) for more examples.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues:** [GitHub Issues](https://github.com/memorymusicllc/power.components/issues)
- **Discussions:** [GitHub Discussions](https://github.com/memorymusicllc/power.components/discussions)
- **Documentation:** [Wiki](https://github.com/memorymusicllc/power.components/wiki)

## 🏷️ Version Information

- **Power Redact Plugin:** v2.0.0
- **Power Canvas Plugin:** v1.0.0
- **Repository:** v1.0.0

## 🙏 Acknowledgments

Built with ❤️ for the Obsidian community.

Special thanks to:
- Obsidian team for the excellent plugin API
- Community contributors and testers
- Open source libraries that make this possible

---

**Memory Music LLC** | [Website](https://memorymusic.com) | [GitHub](https://github.com/memorymusicllc)

