
# Installation Guide - Power Components

Complete installation instructions for both Power Redact Plugin v2.0 and Power Canvas Plugin.

## 📋 Prerequisites

Before installing, ensure you have:

- **Obsidian:** Version 1.4.0 or higher
- **Node.js:** Version 16.0.0 or higher (for development)
- **npm:** Version 8.0.0 or higher (for development)
- **Git:** For cloning the repository

## 🚀 Installation Methods

### Method 1: Automated Installation (Recommended)

The easiest way to install both plugins:

```bash
# 1. Clone the repository
git clone https://github.com/memorymusicllc/power.components.git
cd power.components

# 2. Make installation script executable
chmod +x scripts/install-all.sh

# 3. Run installation script
./scripts/install-all.sh /path/to/your/obsidian/vault

# Example:
./scripts/install-all.sh ~/Documents/MyVault
```

The script will:
- Install both plugins to your vault's `.obsidian/plugins/` directory
- Install all dependencies
- Build both plugins
- Enable plugins in Obsidian settings

### Method 2: Manual Installation

#### Step 1: Clone Repository
```bash
git clone https://github.com/memorymusicllc/power.components.git
cd power.components
```

#### Step 2: Install Power Redact Plugin
```bash
# Navigate to your Obsidian vault's plugins directory
cd /path/to/your/vault/.obsidian/plugins/

# Create plugin directory
mkdir -p power-redact

# Copy Power Redact files
cp -r /path/to/power.components/power-redact/* power-redact/

# Install dependencies and build
cd power-redact
npm install
npm run build
```

#### Step 3: Install Power Canvas Plugin
```bash
# From your vault's plugins directory
mkdir -p power-canvas

# Copy Power Canvas files
cp -r /path/to/power.components/power-canvas/* power-canvas/

# Install dependencies and build
cd power-canvas
npm install
npm run build
```

#### Step 4: Enable Plugins in Obsidian
1. Open Obsidian
2. Go to Settings → Community Plugins
3. Disable Safe Mode (if enabled)
4. Click "Refresh" to detect new plugins
5. Enable "Power Redact Plugin" and "Power Canvas Plugin"

### Method 3: Development Installation

For developers who want to contribute or modify the plugins:

```bash
# 1. Clone and setup
git clone https://github.com/memorymusicllc/power.components.git
cd power.components

# 2. Install root dependencies
npm install

# 3. Install all plugin dependencies
npm run install-all

# 4. Build all plugins
npm run build-all

# 5. Link to Obsidian vault (development)
npm run link-vault /path/to/your/vault

# 6. Start development mode
npm run dev
```

## 🔧 Configuration

### Power Redact Plugin Configuration

After installation, configure the plugin:

1. **Open Plugin Settings:**
   - Settings → Community Plugins → Power Redact Plugin → Options

2. **Configure Redaction Patterns:**
   ```json
   {
     "patterns": {
       "ssn": "\\b\\d{3}-\\d{2}-\\d{4}\\b",
       "email": "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b",
       "phone": "\\b\\d{3}-\\d{3}-\\d{4}\\b"
     },
     "defaultStyle": "blackout",
     "exportRedacted": false
   }
   ```

3. **Set Redaction Styles:**
   - Blackout: `████████`
   - Blur: CSS blur effect
   - Hash: `[REDACTED-HASH]`
   - Custom: User-defined replacement

### Power Canvas Plugin Configuration

Configure canvas settings:

1. **Open Plugin Settings:**
   - Settings → Community Plugins → Power Canvas Plugin → Options

2. **Configure Canvas Options:**
   ```json
   {
     "defaultTool": "pen",
     "canvasSize": "A4",
     "exportFormat": "png",
     "enableCollaboration": true,
     "autoSave": true,
     "saveInterval": 30000
   }
   ```

## 🔍 Verification

### Verify Power Redact Installation

1. **Check Plugin Status:**
   - Settings → Community Plugins
   - Ensure "Power Redact Plugin" is enabled

2. **Test Basic Functionality:**
   ```markdown
   Test SSN: 123-45-6789
   Test Email: user@example.com
   ```
   - Select text and use redaction command
   - Verify redaction works correctly

3. **Check Command Palette:**
   - Press `Ctrl+P` (or `Cmd+P` on Mac)
   - Search for "Power Redact"
   - Should see available commands

### Verify Power Canvas Installation

1. **Check Plugin Status:**
   - Settings → Community Plugins
   - Ensure "Power Canvas Plugin" is enabled

2. **Test Canvas Creation:**
   - Use command palette: "Power Canvas: New Canvas"
   - Verify canvas interface opens
   - Test drawing tools

3. **Check File Menu:**
   - Right-click in file explorer
   - Should see "New Power Canvas" option

## 🛠️ Troubleshooting

### Common Issues

#### Plugin Not Appearing
```bash
# Check if files are in correct location
ls ~/.obsidian/plugins/power-redact/
ls ~/.obsidian/plugins/power-canvas/

# Should contain: main.js, manifest.json, styles.css
```

#### Build Errors
```bash
# Clear node modules and reinstall
cd power-redact
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Permission Issues
```bash
# Fix permissions
chmod -R 755 ~/.obsidian/plugins/power-redact/
chmod -R 755 ~/.obsidian/plugins/power-canvas/
```

### Plugin-Specific Issues

#### Power Redact Issues

**Patterns Not Working:**
1. Check regex syntax in settings
2. Verify pattern flags are correct
3. Test patterns in regex validator

**Performance Issues:**
1. Reduce batch processing size
2. Disable real-time redaction for large files
3. Check memory usage in developer tools

#### Power Canvas Issues

**Canvas Not Loading:**
1. Check browser compatibility
2. Verify WebGL support
3. Clear Obsidian cache

**Export Failures:**
1. Check available disk space
2. Verify export permissions
3. Try different export formats

### Getting Help

If you encounter issues:

1. **Check Documentation:**
   - [Power Redact Guide](docs/POWER_REDACT_GUIDE.md)
   - [Power Canvas Guide](docs/POWER_CANVAS_GUIDE.md)

2. **Enable Debug Mode:**
   ```bash
   # Add to Obsidian developer console
   localStorage.setItem('power-components-debug', 'true');
   ```

3. **Report Issues:**
   - [GitHub Issues](https://github.com/memorymusicllc/power.components/issues)
   - Include system information and error logs

## 📱 Platform-Specific Notes

### Windows
- Use PowerShell or Git Bash for commands
- Ensure Node.js is in PATH
- May need to run as Administrator

### macOS
- Use Terminal for commands
- May need to install Xcode Command Line Tools
- Check Gatekeeper settings for unsigned plugins

### Linux
- Ensure proper permissions on plugin directories
- May need to install build-essential package
- Check AppImage vs native Obsidian installation

## 🔄 Updates

### Automatic Updates
Both plugins support automatic updates through Obsidian's plugin manager.

### Manual Updates
```bash
# Update repository
cd power.components
git pull origin main

# Rebuild plugins
npm run build-all

# Copy updated files to vault
./scripts/install-all.sh /path/to/your/vault
```

## 🗑️ Uninstallation

### Remove Plugins
```bash
# Remove from Obsidian plugins directory
rm -rf ~/.obsidian/plugins/power-redact/
rm -rf ~/.obsidian/plugins/power-canvas/

# Or use uninstall script
./scripts/uninstall-all.sh /path/to/your/vault
```

### Clean Uninstall
1. Disable plugins in Obsidian settings
2. Remove plugin directories
3. Clear plugin data from Obsidian settings
4. Restart Obsidian

---

## 📞 Support

For installation support:
- **Documentation:** [GitHub Wiki](https://github.com/memorymusicllc/power.components/wiki)
- **Issues:** [GitHub Issues](https://github.com/memorymusicllc/power.components/issues)
- **Discussions:** [GitHub Discussions](https://github.com/memorymusicllc/power.components/discussions)

---

**Next Steps:** After installation, see the [Integration Guide](docs/INTEGRATION_GUIDE.md) to learn how to use both plugins together effectively.

