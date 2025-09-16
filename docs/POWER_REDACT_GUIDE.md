
# Power Redact Plugin v2.0 - Complete Usage Guide

Comprehensive guide for using the Power Redact Plugin to protect sensitive information in your Obsidian notes.

## 🔒 Overview

The Power Redact Plugin v2.0 is an advanced text redaction tool designed to identify, hide, and protect sensitive information in your notes. It uses intelligent pattern detection and customizable redaction styles to ensure your private data remains secure.

## 🚀 Quick Start

### Basic Redaction

1. **Select Text to Redact:**
   - Highlight the sensitive text in your note
   - Right-click and select "Redact Selected Text"
   - Or use the command palette: `Ctrl+P` → "Power Redact: Redact Selection"

2. **Automatic Pattern Detection:**
   - The plugin automatically detects common patterns:
     - Social Security Numbers (123-45-6789)
     - Email addresses (user@example.com)
     - Phone numbers (555-123-4567)
     - Credit card numbers (4532-1234-5678-9012)

3. **View Redacted Content:**
   - Redacted text appears as: `████████` (blackout style)
   - Hover over redacted text to see redaction info
   - Use "Show/Hide Redactions" to toggle visibility

## 🎯 Pattern Detection System

### Built-in Patterns

The plugin includes pre-configured patterns for common sensitive data:

#### Social Security Numbers
```regex
Pattern: \b\d{3}-\d{2}-\d{4}\b
Examples: 123-45-6789, 987-65-4321
```

#### Email Addresses
```regex
Pattern: \b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b
Examples: user@example.com, john.doe@company.org
```

#### Phone Numbers
```regex
Pattern: \b\d{3}-\d{3}-\d{4}\b
Examples: 555-123-4567, 800-555-0199
```

#### Credit Card Numbers
```regex
Pattern: \b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b
Examples: 4532-1234-5678-9012, 4532 1234 5678 9012
```

### Custom Patterns

Create your own redaction patterns for specific needs:

1. **Open Settings:**
   - Settings → Community Plugins → Power Redact Plugin → Options

2. **Add Custom Pattern:**
   ```json
   {
     "name": "Employee ID",
     "pattern": "EMP\\d{6}",
     "flags": "gi",
     "style": "hash",
     "enabled": true
   }
   ```

3. **Pattern Examples:**
   ```regex
   # IP Addresses
   \b(?:\d{1,3}\.){3}\d{1,3}\b
   
   # License Plates
   [A-Z]{3}-\d{4}
   
   # Medical Record Numbers
   MRN\d{8}
   
   # Bank Account Numbers
   \b\d{10,12}\b
   ```

### Pattern Priority System

When multiple patterns match the same text:

1. **Specific patterns** take priority over general ones
2. **Longer matches** take priority over shorter ones
3. **Custom patterns** take priority over built-in patterns
4. **Manual redactions** take priority over automatic ones

## 🎨 Redaction Styles

### Available Styles

#### 1. Blackout (Default)
```
Original: My SSN is 123-45-6789
Redacted: My SSN is ████████
```

**Configuration:**
```json
{
  "style": "blackout",
  "character": "█",
  "preserveLength": true
}
```

#### 2. Blur Effect
```
Original: My SSN is 123-45-6789
Redacted: My SSN is [blurred text]
```

**Configuration:**
```json
{
  "style": "blur",
  "blurRadius": "3px",
  "showOnHover": false
}
```

#### 3. Hash Replacement
```
Original: My SSN is 123-45-6789
Redacted: My SSN is [REDACTED-A7B9C2]
```

**Configuration:**
```json
{
  "style": "hash",
  "hashLength": 6,
  "prefix": "[REDACTED-",
  "suffix": "]"
}
```

#### 4. Custom Replacement
```
Original: My SSN is 123-45-6789
Redacted: My SSN is [PRIVATE]
```

**Configuration:**
```json
{
  "style": "custom",
  "replacement": "[PRIVATE]",
  "preserveCase": false
}
```

### Style Customization

#### CSS Customization
```css
/* Custom redaction styles */
.power-redact-blackout {
  background-color: #000;
  color: #000;
  border-radius: 2px;
}

.power-redact-blur {
  filter: blur(3px);
  transition: filter 0.3s ease;
}

.power-redact-blur:hover {
  filter: blur(0px);
}

.power-redact-hash {
  background-color: #ff6b6b;
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}
```

## ⚡ Batch Processing

### Process Multiple Files

1. **Select Files:**
   - Use file explorer to select multiple files
   - Or use folder selection for entire directories

2. **Configure Batch Settings:**
   ```json
   {
     "batchSize": 10,
     "patterns": ["ssn", "email", "phone"],
     "style": "blackout",
     "createBackups": true,
     "skipBinaryFiles": true
   }
   ```

3. **Run Batch Process:**
   - Command palette: "Power Redact: Batch Process Files"
   - Monitor progress in status bar
   - Review results in batch report

### Batch Processing Options

#### File Filters
```json
{
  "includeExtensions": [".md", ".txt"],
  "excludeExtensions": [".pdf", ".docx"],
  "includeFolders": ["Private", "Confidential"],
  "excludeFolders": ["Public", "Archive"],
  "maxFileSize": "10MB"
}
```

#### Processing Settings
```json
{
  "concurrent": 5,
  "timeout": 30000,
  "retryAttempts": 3,
  "skipErrors": true,
  "logLevel": "info"
}
```

### Batch Report

After processing, review the detailed report:

```
Batch Processing Report
======================
Files Processed: 45/50
Successful: 43
Failed: 2
Skipped: 5

Patterns Found:
- SSN: 12 matches
- Email: 28 matches
- Phone: 15 matches

Processing Time: 2.3 seconds
Average per File: 0.05 seconds
```

## 🔄 Undo and Redo

### Undo System

The plugin maintains a complete history of redaction operations:

1. **Undo Last Action:**
   - `Ctrl+Z` or Command palette: "Power Redact: Undo"
   - Reverts the most recent redaction

2. **Redo Action:**
   - `Ctrl+Y` or Command palette: "Power Redact: Redo"
   - Reapplies a previously undone redaction

3. **View History:**
   - Command palette: "Power Redact: Show History"
   - See all redaction operations with timestamps

### History Management

```json
{
  "historyLimit": 100,
  "persistHistory": true,
  "autoCleanup": true,
  "cleanupInterval": "7d"
}
```

### Selective Undo

Undo specific redactions without affecting others:

1. **Right-click on redacted text**
2. **Select "Undo This Redaction"**
3. **Confirm the action**

## 📤 Export and Security

### Secure Export

Control how redacted content appears in exports:

#### Export Settings
```json
{
  "exportRedacted": false,
  "exportStyle": "placeholder",
  "includeMetadata": false,
  "sanitizeOutput": true
}
```

#### Export Formats

1. **Markdown Export:**
   ```markdown
   # Original
   My SSN is 123-45-6789
   
   # Exported (redacted)
   My SSN is [REDACTED]
   ```

2. **PDF Export:**
   - Redacted text appears as black bars
   - Cannot be selected or copied
   - Maintains document formatting

3. **HTML Export:**
   ```html
   <p>My SSN is <span class="redacted">[REDACTED]</span></p>
   ```

### Security Features

#### Data Protection
- **Memory Cleanup:** Sensitive data cleared from memory
- **Secure Storage:** Patterns encrypted in settings
- **Audit Trail:** All redaction operations logged
- **Access Control:** Permission-based redaction viewing

#### Privacy Settings
```json
{
  "encryptPatterns": true,
  "clearClipboard": true,
  "disableScreenshots": false,
  "auditLogging": true,
  "sessionTimeout": 3600
}
```

## 🛠️ Advanced Configuration

### Settings Overview

Access comprehensive settings through:
Settings → Community Plugins → Power Redact Plugin → Options

#### Core Settings
```json
{
  "enabled": true,
  "autoDetect": true,
  "realTimeRedaction": false,
  "defaultStyle": "blackout",
  "showNotifications": true,
  "debugMode": false
}
```

#### Performance Settings
```json
{
  "maxFileSize": "50MB",
  "processingTimeout": 30000,
  "cacheResults": true,
  "cacheExpiry": "1h",
  "workerThreads": 2
}
```

#### UI Settings
```json
{
  "showStatusBar": true,
  "showProgressBar": true,
  "contextMenuEnabled": true,
  "keyboardShortcuts": true,
  "tooltips": true
}
```

### Keyboard Shortcuts

Default shortcuts (customizable):

| Action | Shortcut | Description |
|--------|----------|-------------|
| Redact Selection | `Ctrl+Shift+R` | Redact selected text |
| Toggle Redactions | `Ctrl+Shift+T` | Show/hide all redactions |
| Undo Redaction | `Ctrl+Z` | Undo last redaction |
| Redo Redaction | `Ctrl+Y` | Redo last undone redaction |
| Quick Settings | `Ctrl+Shift+S` | Open quick settings panel |

### Command Palette Commands

All available commands:

- **Power Redact: Redact Selection** - Redact selected text
- **Power Redact: Redact All Patterns** - Auto-redact all detected patterns
- **Power Redact: Toggle Redactions** - Show/hide redacted content
- **Power Redact: Undo Last** - Undo most recent redaction
- **Power Redact: Redo Last** - Redo most recent undo
- **Power Redact: Clear History** - Clear undo/redo history
- **Power Redact: Batch Process** - Process multiple files
- **Power Redact: Export Settings** - Export plugin configuration
- **Power Redact: Import Settings** - Import plugin configuration
- **Power Redact: Reset Settings** - Reset to default settings

## 🔍 Troubleshooting

### Common Issues

#### Pattern Not Detected
**Problem:** Custom pattern doesn't match expected text

**Solutions:**
1. **Test Regex:** Use online regex tester to validate pattern
2. **Check Flags:** Ensure correct flags (g, i, m) are set
3. **Escape Characters:** Properly escape special regex characters
4. **Pattern Priority:** Check if other patterns are taking precedence

**Example Fix:**
```regex
# Wrong
\d{3}-\d{2}-\d{4}

# Correct
\\b\\d{3}-\\d{2}-\\d{4}\\b
```

#### Performance Issues
**Problem:** Slow redaction on large files

**Solutions:**
1. **Reduce File Size:** Split large files into smaller ones
2. **Disable Real-time:** Turn off real-time redaction
3. **Limit Patterns:** Use only necessary patterns
4. **Increase Timeout:** Adjust processing timeout settings

#### Redaction Not Visible
**Problem:** Redacted text appears normal

**Solutions:**
1. **Check Style Settings:** Verify redaction style is configured
2. **CSS Conflicts:** Check for theme CSS conflicts
3. **Plugin Conflicts:** Disable other plugins temporarily
4. **Refresh View:** Reload the note or restart Obsidian

### Error Messages

#### "Pattern Compilation Failed"
```
Error: Invalid regular expression: Unterminated character class
```
**Fix:** Check regex syntax, especially character classes `[...]`

#### "File Too Large"
```
Error: File exceeds maximum size limit (50MB)
```
**Fix:** Increase `maxFileSize` setting or split the file

#### "Permission Denied"
```
Error: Cannot write to file - permission denied
```
**Fix:** Check file permissions and Obsidian vault access

### Debug Mode

Enable debug mode for detailed logging:

1. **Enable Debug Mode:**
   ```json
   {
     "debugMode": true,
     "logLevel": "debug"
   }
   ```

2. **View Debug Logs:**
   - Open Developer Console (`Ctrl+Shift+I`)
   - Look for "PowerRedact" log entries
   - Copy relevant logs for support requests

3. **Debug Information:**
   ```javascript
   // Console commands for debugging
   PowerRedact.getPatterns();
   PowerRedact.getSettings();
   PowerRedact.testPattern("your-regex-here", "test text");
   ```

## 🤝 Integration with Other Plugins

### Compatible Plugins

#### Templater Integration
```javascript
// Templater script for automatic redaction
<%*
const redactedContent = await app.plugins.plugins['power-redact'].api.processText(tp.file.content);
await tp.file.rename(tp.file.title + " (Redacted)");
%>
```

#### Dataview Integration
```dataview
TABLE WITHOUT ID
  file.name as "File",
  PowerRedact.getRedactionCount(file) as "Redactions"
FROM "Private"
WHERE PowerRedact.hasRedactions(file)
```

#### Advanced Tables Integration
- Redact sensitive data in table cells
- Batch process tables with personal information
- Export tables with redacted content

### API for Developers

```typescript
// Plugin API interface
interface PowerRedactAPI {
  processText(text: string, patterns?: string[]): Promise<string>;
  addPattern(name: string, pattern: RegExp): void;
  removePattern(name: string): void;
  getPatterns(): Pattern[];
  redactSelection(): void;
  toggleRedactions(): void;
  undo(): void;
  redo(): void;
}

// Usage example
const api = app.plugins.plugins['power-redact'].api;
const redacted = await api.processText("SSN: 123-45-6789");
```

## 📊 Usage Analytics

### Redaction Statistics

View detailed statistics about your redaction usage:

1. **Access Statistics:**
   - Command palette: "Power Redact: Show Statistics"
   - Or Settings → Power Redact → Statistics tab

2. **Available Metrics:**
   ```
   Total Redactions: 1,247
   Files Processed: 89
   Patterns Used:
   - SSN: 45 (3.6%)
   - Email: 523 (41.9%)
   - Phone: 234 (18.8%)
   - Custom: 445 (35.7%)
   
   Most Active Day: Monday
   Average per File: 14 redactions
   ```

3. **Export Statistics:**
   - Export as CSV for analysis
   - Generate reports for compliance
   - Track redaction trends over time

## 🔐 Compliance and Legal

### Regulatory Compliance

The Power Redact Plugin helps with various compliance requirements:

#### GDPR (General Data Protection Regulation)
- **Right to Erasure:** Redact personal data on request
- **Data Minimization:** Hide unnecessary personal information
- **Privacy by Design:** Automatic detection of personal data

#### HIPAA (Health Insurance Portability and Accountability Act)
- **PHI Protection:** Redact protected health information
- **Audit Trails:** Track all redaction operations
- **Access Controls:** Limit who can view redacted content

#### SOX (Sarbanes-Oxley Act)
- **Financial Data:** Redact sensitive financial information
- **Document Retention:** Maintain redacted versions for compliance
- **Audit Support:** Generate compliance reports

### Best Practices

1. **Regular Audits:** Review redaction patterns monthly
2. **Staff Training:** Ensure team knows how to use redaction properly
3. **Backup Strategy:** Maintain both original and redacted versions
4. **Access Logging:** Monitor who accesses redacted content
5. **Pattern Updates:** Keep redaction patterns current with regulations

## 📚 Additional Resources

### Documentation Links
- [Installation Guide](../INSTALLATION.md)
- [Architecture Overview](../ARCHITECTURE.md)
- [Development Guide](../DEVELOPMENT.md)
- [Integration Guide](INTEGRATION_GUIDE.md)

### Community Resources
- [GitHub Issues](https://github.com/memorymusicllc/power.components/issues)
- [GitHub Discussions](https://github.com/memorymusicllc/power.components/discussions)
- [Plugin Wiki](https://github.com/memorymusicllc/power.components/wiki)

### Support Channels
- **Bug Reports:** GitHub Issues
- **Feature Requests:** GitHub Discussions
- **General Help:** Community Discord
- **Enterprise Support:** enterprise@memorymusic.com

---

## 📝 Quick Reference

### Essential Commands
```
Redact Selection: Ctrl+Shift+R
Toggle Redactions: Ctrl+Shift+T
Undo: Ctrl+Z
Redo: Ctrl+Y
Settings: Ctrl+Shift+S
```

### Common Patterns
```regex
SSN: \\b\\d{3}-\\d{2}-\\d{4}\\b
Email: \\b[\\w._%+-]+@[\\w.-]+\\.[A-Z|a-z]{2,}\\b
Phone: \\b\\d{3}-\\d{3}-\\d{4}\\b
Credit Card: \\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b
```

### Style Options
- **blackout:** `████████`
- **blur:** CSS blur effect
- **hash:** `[REDACTED-A7B9C2]`
- **custom:** User-defined replacement

---

**Need more help?** Check the [Integration Guide](INTEGRATION_GUIDE.md) to learn how to use Power Redact with Power Canvas and other plugins.

