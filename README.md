
# Power Components for Obsidian

A comprehensive suite of powerful Obsidian plugins designed to enhance your note-taking and knowledge management workflow.

## 🚀 Components Overview

This repository contains two major plugin components:

### 🔒 Power Redact Plugin v2.0
Advanced text redaction and privacy protection for sensitive information in your notes.

**Key Features:**
- Smart pattern detection (SSN, credit cards, emails, phone numbers)
- Custom redaction patterns with regex support
- Multiple redaction styles (blackout, blur, hash, custom)
- Batch processing capabilities
- Undo/redo functionality
- Export controls for redacted content

**Location:** `power-redact/`

### 🎨 Power Canvas Plugin
Enhanced canvas functionality with advanced drawing tools and interactive elements.

**Key Features:**
- Advanced drawing tools (pen, highlighter, shapes)
- Interactive elements and annotations
- Layer management system
- Export capabilities (PNG, SVG, PDF)
- Collaboration features
- Template system

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

