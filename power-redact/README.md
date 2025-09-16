
# Power Redact Plugin v2.0

Advanced text redaction plugin with enhanced UX features, mobile optimization, and iOS integration.

## 🚀 New in v2.0

### Enhanced UX Features
- **Cursor-based reveal behavior**: Redacted content stays revealed until cursor exits the element
- **Touch device support**: Optimized controls with edit lock icon (🔒) for mobile devices
- **iOS Format menu integration**: Native text selection redaction through iOS Format menu
- **Redesigned settings interface**: Clean, modern design with collapsible Advanced section

### Smart Redaction
- **Auto Redact PII**: Toggle-based personally identifiable information detection
- **Custom patterns**: User-defined keywords and phrases for targeted redaction
- **Exclude terms**: Smart filtering to prevent over-redaction of important terms
- **Block style default**: Improved visual consistency with hidden inline options

## 📱 Mobile-First Design

Power Redact v2.0 is built with mobile devices as a priority:

- **Touch-optimized controls**: Large, accessible touch targets
- **Responsive settings panel**: Adapts to screen size and orientation
- **iOS Format menu**: Seamless integration with native iOS text selection
- **Edit lock indicator**: Visual feedback for touch-revealed content
- **Gesture support**: Intuitive touch interactions

## 🛠️ Installation

### Direct Integration
```html
<link rel="stylesheet" href="styles.css">
<script src="main-source.js"></script>
```

### Module Import
```javascript
import PowerRedactPlugin from './main-source.js';
const redactor = new PowerRedactPlugin();
```

### Build from Source
```bash
npm install
npm run build
```

## 🎯 Usage

### Basic Usage
The plugin automatically initializes and begins scanning for PII patterns:

```javascript
// Plugin auto-initializes
// Access global instance
window.powerRedact.showSettings();
```

### Manual Redaction
```javascript
// Redact specific text
const redactedElement = powerRedact.redactText("sensitive information");

// Clear all redactions
powerRedact.clearAllRedactions();

// Export redacted content
const exportedContent = powerRedact.exportRedactedContent();
```

### Settings Configuration
```javascript
// Programmatic settings update
powerRedact.settings.autoRedactPII = true;
powerRedact.settings.customPatterns.push("confidential");
powerRedact.settings.excludeTerms.push("public");
powerRedact.saveSettings();
```

## ⚙️ Features

### Automatic PII Detection
- **Social Security Numbers**: `XXX-XX-XXXX` format
- **Credit Card Numbers**: 16-digit card numbers with various separators
- **Email Addresses**: Standard email format validation
- **Phone Numbers**: US phone number formats

### Custom Pattern Support
- **Keywords**: Simple text matching
- **Regular Expressions**: Advanced pattern matching
- **Exclude Terms**: Prevent false positives

### Reveal Behaviors
- **Cursor-based** (default): Reveal on hover, hide on cursor exit
- **Click-based**: Toggle reveal on click
- **Touch-optimized**: Tap to reveal with lock indicator

## 🎨 Styling & Customization

### CSS Custom Properties
```css
:root {
  --redact-bg-color: #000;
  --redact-reveal-color: rgba(255, 255, 0, 0.3);
  --redact-border-radius: 3px;
  --redact-transition: all 0.2s ease;
}
```

### Theme Support
- **Light/Dark mode**: Automatic detection and adaptation
- **High contrast**: Enhanced visibility for accessibility
- **Reduced motion**: Respects user motion preferences

## 📱 Mobile Integration

### iOS Format Menu
When text is selected on iOS devices, a "Redact" option appears in the Format menu:

1. Select text you want to redact
2. Tap "Redact" in the Format menu
3. Text is immediately redacted with block styling

### Touch Controls
- **Tap to reveal**: Touch redacted content to reveal
- **Lock indicator**: 🔒 icon shows content is revealed
- **Tap again to hide**: Second tap hides content

## ⌨️ Keyboard Shortcuts

- **Ctrl+Shift+R**: Open settings panel
- **Escape**: Close settings panel

## 🔧 API Reference

### Methods

#### `redactText(text)`
Manually redact specific text content.
```javascript
const element = powerRedact.redactText("sensitive data");
document.body.appendChild(element);
```

#### `clearAllRedactions()`
Remove all redactions from the page.
```javascript
powerRedact.clearAllRedactions();
```

#### `exportRedactedContent()`
Export page content with redactions replaced by block characters.
```javascript
const redactedHTML = powerRedact.exportRedactedContent();
```

#### `showSettings()`
Programmatically open the settings panel.
```javascript
powerRedact.showSettings();
```

#### `hideSettings()`
Programmatically close the settings panel.
```javascript
powerRedact.hideSettings();
```

### Settings Object

```javascript
{
  enabled: true,              // Plugin enabled state
  autoRedactPII: true,        // Auto-detect PII
  customPatterns: [],         // User-defined patterns
  excludeTerms: [],           // Terms to exclude from redaction
  revealBehavior: 'cursor',   // 'cursor', 'click', 'hover'
  blockStyle: true,           // Use block-style redaction
  touchSupport: true          // Enable touch optimizations
}
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Coverage Report
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test:watch
```

## 🏗️ Build System

### Production Build
```bash
npm run build
```

### Development Build
```bash
npm run build:watch
```

### Multiple Targets
- **Modern**: ES2020+ with full features
- **Legacy**: ES2015 for older browsers
- **Standalone**: Unbundled ESM version

## 🌐 Browser Support

### Desktop
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Mobile
- iOS Safari 13+
- Chrome Mobile 80+
- Android WebView 8+

## 🔒 Privacy & Security

- **Local storage only**: Settings stored locally, never transmitted
- **No external dependencies**: Self-contained plugin
- **Reversible redaction**: Original content preserved for authorized reveal
- **Export control**: Redacted content export with configurable replacement

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📞 Support

For issues, feature requests, or questions:
- GitHub Issues: [Report a bug](https://github.com/memorymusicllc/power.components/issues)
- Documentation: [Full documentation](https://github.com/memorymusicllc/power.components/tree/main/power-redact)

## 🗺️ Roadmap

### v2.1 (Planned)
- **AI-powered PII detection**: Machine learning-based pattern recognition
- **Batch redaction**: Process multiple documents simultaneously
- **Audit trail**: Track redaction history and changes

### v2.2 (Planned)
- **Cloud sync**: Optional settings synchronization
- **Team collaboration**: Shared redaction patterns
- **Advanced export**: Multiple format support (PDF, DOCX, etc.)

---

**Power Redact Plugin v2.0** - Redefining text redaction with enhanced UX and mobile-first design.
