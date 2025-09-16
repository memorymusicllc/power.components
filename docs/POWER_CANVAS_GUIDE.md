
# Power Canvas Plugin v1.0 - Complete Usage Guide

Comprehensive guide for using the Power Canvas Plugin to create interactive drawings and visual content in Obsidian.

## 🎨 Overview

The Power Canvas Plugin transforms Obsidian into a powerful visual workspace with advanced drawing tools, interactive elements, and professional export capabilities. Create diagrams, sketches, mind maps, and interactive visual content directly within your notes.

## 🚀 Quick Start

### Creating Your First Canvas

1. **Create New Canvas:**
   - Right-click in file explorer → "New Power Canvas"
   - Command palette: `Ctrl+P` → "Power Canvas: New Canvas"
   - Use ribbon icon (if enabled)

2. **Basic Drawing:**
   - Select the Pen tool from the toolbar
   - Click and drag to draw freehand
   - Use different colors and brush sizes
   - Add shapes and text annotations

3. **Save Your Work:**
   - Canvas auto-saves every 30 seconds
   - Manual save: `Ctrl+S`
   - Export: File menu → Export Canvas

## 🛠️ Drawing Tools

### Tool Palette

#### 1. Pen Tool
**Primary drawing tool for freehand sketching**

- **Activation:** Click pen icon or press `P`
- **Options:**
  - Brush size: 1-50px
  - Opacity: 10-100%
  - Pressure sensitivity (if supported)
  - Smoothing: Low/Medium/High

**Usage:**
```
Click and drag to draw
Hold Shift: Draw straight lines
Hold Ctrl: Constrain to angles (15°, 30°, 45°, etc.)
```

#### 2. Highlighter Tool
**Semi-transparent highlighting for emphasis**

- **Activation:** Click highlighter icon or press `H`
- **Features:**
  - Transparency: 20-80%
  - Blend modes: Normal, Multiply, Screen
  - Multiple colors available

**Best Practices:**
- Use for emphasizing text or diagrams
- Layer over existing content
- Combine with other tools for rich visuals

#### 3. Shape Tools
**Geometric shapes for diagrams and layouts**

##### Rectangle Tool
- **Activation:** Press `R`
- **Options:** Fill, stroke, rounded corners
- **Modifiers:** Hold Shift for squares

##### Circle/Ellipse Tool
- **Activation:** Press `C`
- **Options:** Fill, stroke, perfect circles
- **Modifiers:** Hold Shift for perfect circles

##### Line Tool
- **Activation:** Press `L`
- **Features:** Straight lines, arrows, connectors
- **Options:** Start/end markers, dash patterns

##### Arrow Tool
- **Activation:** Press `A`
- **Types:** Single arrow, double arrow, curved
- **Styles:** Various arrowhead styles

#### 4. Text Tool
**Add formatted text annotations**

- **Activation:** Press `T`
- **Features:**
  - Rich text formatting
  - Multiple fonts and sizes
  - Color and styling options
  - Text boxes with backgrounds

**Text Formatting:**
```
Bold: Ctrl+B
Italic: Ctrl+I
Underline: Ctrl+U
Font Size: Ctrl+Plus/Minus
```

#### 5. Selection Tool
**Select, move, and modify elements**

- **Activation:** Press `V` or `Esc`
- **Functions:**
  - Select individual elements
  - Multi-select with Ctrl+click
  - Area selection with drag
  - Move, resize, rotate elements

**Selection Operations:**
```
Move: Drag selected elements
Resize: Drag corner handles
Rotate: Drag rotation handle
Delete: Press Delete key
Copy: Ctrl+C
Paste: Ctrl+V
```

#### 6. Eraser Tool
**Remove parts of drawings**

- **Activation:** Press `E`
- **Types:**
  - Pixel eraser: Removes pixels
  - Object eraser: Removes entire objects
  - Background eraser: Removes backgrounds

### Tool Properties Panel

Each tool has customizable properties:

#### Pen Properties
```json
{
  "size": 3,
  "opacity": 100,
  "color": "#000000",
  "smoothing": "medium",
  "pressureSensitive": true,
  "blendMode": "normal"
}
```

#### Shape Properties
```json
{
  "fill": "#ff0000",
  "stroke": "#000000",
  "strokeWidth": 2,
  "opacity": 100,
  "cornerRadius": 0,
  "dashPattern": "solid"
}
```

## 📐 Canvas Management

### Canvas Settings

#### Canvas Size and Format
```json
{
  "width": 1920,
  "height": 1080,
  "format": "landscape",
  "preset": "A4",
  "dpi": 300,
  "backgroundColor": "#ffffff"
}
```

#### Common Presets
- **A4:** 210×297mm (2480×3508px at 300 DPI)
- **Letter:** 8.5×11in (2550×3300px at 300 DPI)
- **HD:** 1920×1080px
- **4K:** 3840×2160px
- **Square:** 1080×1080px
- **Custom:** User-defined dimensions

### Grid and Guides

#### Grid System
- **Show Grid:** View → Show Grid (`Ctrl+G`)
- **Grid Size:** 10px, 20px, 50px, or custom
- **Snap to Grid:** Enable for precise alignment
- **Grid Color:** Customizable grid line color

#### Ruler Guides
- **Show Rulers:** View → Show Rulers (`Ctrl+R`)
- **Add Guides:** Click and drag from rulers
- **Guide Snapping:** Elements snap to guides
- **Guide Management:** Right-click guides to modify

### Zoom and Navigation

#### Zoom Controls
```
Zoom In: Ctrl+Plus or mouse wheel up
Zoom Out: Ctrl+Minus or mouse wheel down
Fit to Window: Ctrl+0
Actual Size: Ctrl+1
Zoom to Selection: Ctrl+2
```

#### Pan and Navigate
```
Pan: Space+drag or middle mouse drag
Hand Tool: H key for temporary pan mode
Navigator: Minimap for large canvases
```

## 🎭 Layer Management

### Layer System

#### Layer Panel
Access through View → Layers Panel or `F7`

**Layer Operations:**
- **Add Layer:** Click "+" button
- **Delete Layer:** Select layer, click trash icon
- **Rename Layer:** Double-click layer name
- **Reorder:** Drag layers up/down

#### Layer Properties
```json
{
  "name": "Layer 1",
  "visible": true,
  "opacity": 100,
  "blendMode": "normal",
  "locked": false,
  "clipping": false
}
```

### Layer Types

#### 1. Drawing Layer
- Default layer type for freehand drawing
- Supports all drawing tools
- Raster-based content

#### 2. Shape Layer
- Vector-based geometric shapes
- Scalable without quality loss
- Editable properties

#### 3. Text Layer
- Text content with formatting
- Font and style properties
- Searchable content

#### 4. Image Layer
- Imported images and photos
- Supports PNG, JPG, SVG formats
- Transform and filter options

### Layer Blending

#### Blend Modes
- **Normal:** Default blending
- **Multiply:** Darkens underlying layers
- **Screen:** Lightens underlying layers
- **Overlay:** Combines multiply and screen
- **Soft Light:** Subtle lighting effect
- **Hard Light:** Strong lighting effect
- **Color Dodge:** Brightens colors
- **Color Burn:** Darkens colors

#### Opacity Control
- **Range:** 0-100%
- **Keyboard:** Number keys (1=10%, 2=20%, etc.)
- **Slider:** Fine control in properties panel

## 🎯 Interactive Elements

### Clickable Annotations

#### Creating Interactive Elements
1. **Select Text or Shape Tool**
2. **Create element on canvas**
3. **Right-click → Add Interaction**
4. **Configure interaction type**

#### Interaction Types

##### 1. Link to Note
```json
{
  "type": "note-link",
  "target": "[[My Note]]",
  "openIn": "current-tab"
}
```

##### 2. External URL
```json
{
  "type": "url",
  "target": "https://example.com",
  "openIn": "new-tab"
}
```

##### 3. Canvas Navigation
```json
{
  "type": "canvas-jump",
  "target": "canvas-section-2",
  "animation": "smooth-scroll"
}
```

##### 4. Show/Hide Elements
```json
{
  "type": "toggle-visibility",
  "targets": ["layer-2", "shape-group-1"],
  "animation": "fade"
}
```

### Hover Effects

#### Tooltip System
```json
{
  "tooltip": {
    "text": "This is a tooltip",
    "position": "top",
    "delay": 500,
    "style": "default"
  }
}
```

#### Hover Animations
- **Scale:** Element grows on hover
- **Glow:** Adds glow effect
- **Color Change:** Changes color on hover
- **Opacity:** Fades in/out on hover

### Dynamic Content

#### Variables and Expressions
```javascript
// Dynamic text content
${date.now}           // Current date
${note.title}         // Current note title
${canvas.layer.count} // Number of layers
${user.name}          // User name
```

#### Conditional Visibility
```javascript
// Show element based on conditions
visible: ${note.tags.includes('important')}
color: ${theme.isDark ? '#ffffff' : '#000000'}
```

## 📤 Export System

### Export Formats

#### 1. PNG Export
**High-quality raster images**

```json
{
  "format": "png",
  "width": 1920,
  "height": 1080,
  "dpi": 300,
  "quality": 100,
  "transparent": false,
  "backgroundColor": "#ffffff"
}
```

**Use Cases:**
- Social media graphics
- Presentations
- Print materials
- Web images

#### 2. SVG Export
**Scalable vector graphics**

```json
{
  "format": "svg",
  "includeText": true,
  "embedFonts": true,
  "optimized": true,
  "precision": 2
}
```

**Benefits:**
- Infinite scalability
- Small file sizes
- Web-friendly
- Editable in other tools

#### 3. PDF Export
**Professional document format**

```json
{
  "format": "pdf",
  "pageSize": "A4",
  "orientation": "portrait",
  "margins": {
    "top": 20,
    "right": 20,
    "bottom": 20,
    "left": 20
  },
  "embedFonts": true
}
```

**Features:**
- Multi-page support
- Vector and raster content
- Print-ready quality
- Searchable text

#### 4. JSON Export
**Canvas data for backup/sharing**

```json
{
  "format": "json",
  "includeMetadata": true,
  "compressData": true,
  "version": "1.0"
}
```

### Batch Export

#### Export Multiple Canvases
1. **Select Canvases:** Use file explorer multi-select
2. **Configure Export:** Set format and options
3. **Run Batch Export:** Process all selected files

#### Export Settings
```json
{
  "batchExport": {
    "format": "png",
    "naming": "canvas-{name}-{date}",
    "destination": "exports/",
    "overwrite": false,
    "parallel": 3
  }
}
```

### Export Quality Settings

#### High Quality (Print)
```json
{
  "dpi": 300,
  "quality": 100,
  "antialiasing": true,
  "colorProfile": "sRGB"
}
```

#### Web Optimized
```json
{
  "dpi": 72,
  "quality": 85,
  "progressive": true,
  "optimize": true
}
```

#### Fast Preview
```json
{
  "dpi": 150,
  "quality": 70,
  "antialiasing": false,
  "fastMode": true
}
```

## 🎨 Templates and Presets

### Canvas Templates

#### Built-in Templates

##### 1. Mind Map Template
- Central topic node
- Branch structure
- Color-coded categories
- Connection lines

##### 2. Flowchart Template
- Decision diamonds
- Process rectangles
- Flow arrows
- Start/end ovals

##### 3. Wireframe Template
- UI elements library
- Grid layout
- Placeholder content
- Annotation tools

##### 4. Diagram Template
- Technical diagrams
- Network layouts
- System architecture
- Component relationships

#### Creating Custom Templates

1. **Design Your Template:**
   - Create canvas with desired elements
   - Set up layers and structure
   - Add placeholder content

2. **Save as Template:**
   - File → Save as Template
   - Name your template
   - Add description and tags

3. **Template Configuration:**
   ```json
   {
     "name": "My Custom Template",
     "description": "Template for project planning",
     "category": "Business",
     "tags": ["planning", "project", "business"],
     "thumbnail": "template-thumb.png",
     "variables": {
       "projectName": "string",
       "startDate": "date",
       "teamSize": "number"
     }
   }
   ```

### Element Libraries

#### Shape Libraries
- **Basic Shapes:** Rectangles, circles, lines
- **Arrows:** Various arrow styles and directions
- **Flowchart:** Decision, process, data symbols
- **UML:** Class diagrams, sequence diagrams
- **Network:** Servers, routers, connections
- **UI Elements:** Buttons, forms, layouts

#### Icon Libraries
- **Material Design:** Google's icon set
- **Font Awesome:** Popular web icons
- **Feather:** Simple, beautiful icons
- **Custom Icons:** Import your own SVG icons

#### Creating Custom Libraries

1. **Design Elements:**
   - Create reusable elements
   - Organize by category
   - Set consistent styling

2. **Save to Library:**
   - Select elements
   - Right-click → Add to Library
   - Choose category and name

3. **Library Management:**
   - Import/export libraries
   - Share with team members
   - Version control for libraries

## 🔧 Advanced Features

### Scripting and Automation

#### Canvas Scripts
```javascript
// Example: Auto-arrange elements
function autoArrange() {
  const elements = canvas.getSelectedElements();
  const spacing = 50;
  
  elements.forEach((element, index) => {
    element.position.x = index * spacing;
    element.position.y = 100;
  });
  
  canvas.refresh();
}

// Register script
canvas.registerScript('auto-arrange', autoArrange);
```

#### Event Handlers
```javascript
// Handle element selection
canvas.on('element-selected', (element) => {
  console.log('Selected:', element.id);
  updatePropertiesPanel(element);
});

// Handle canvas changes
canvas.on('canvas-modified', () => {
  markAsUnsaved();
  updateHistory();
});
```

### Plugin Integration

#### Dataview Integration
```dataview
TABLE WITHOUT ID
  file.name as "Canvas",
  PowerCanvas.getElementCount(file) as "Elements",
  PowerCanvas.getLastModified(file) as "Modified"
FROM "Canvases"
WHERE PowerCanvas.isCanvas(file)
```

#### Templater Integration
```javascript
// Templater script for canvas creation
<%*
const canvasName = await tp.system.prompt("Canvas name:");
const template = await tp.system.suggester(
  ["Mind Map", "Flowchart", "Wireframe"],
  ["mindmap", "flowchart", "wireframe"]
);

await tp.file.create_new(
  `${canvasName}.canvas`,
  `power-canvas-template:${template}`
);
%>
```

### Performance Optimization

#### Large Canvas Handling
```json
{
  "performance": {
    "virtualRendering": true,
    "levelOfDetail": true,
    "maxElements": 1000,
    "cacheSize": "100MB",
    "backgroundProcessing": true
  }
}
```

#### Memory Management
- **Automatic cleanup** of unused resources
- **Lazy loading** of off-screen elements
- **Efficient caching** of rendered content
- **Memory monitoring** and alerts

## 🎯 Use Cases and Examples

### 1. Mind Mapping

#### Creating a Mind Map
1. **Start with Central Topic:**
   - Add text element in center
   - Use large, bold font
   - Apply distinctive color

2. **Add Main Branches:**
   - Draw lines from center
   - Add topic labels
   - Use consistent colors per branch

3. **Add Sub-branches:**
   - Extend from main branches
   - Use smaller text
   - Apply hierarchical styling

#### Mind Map Best Practices
- **Color Coding:** Use colors to categorize topics
- **Visual Hierarchy:** Size and style indicate importance
- **Consistent Layout:** Maintain visual balance
- **Interactive Elements:** Add links to related notes

### 2. Flowcharts and Diagrams

#### Process Flowchart
```
Start (Oval) → Decision (Diamond) → Process (Rectangle) → End (Oval)
```

#### Diagram Elements
- **Shapes:** Consistent shape meanings
- **Arrows:** Clear flow direction
- **Labels:** Descriptive text
- **Colors:** Status or category indication

### 3. UI/UX Wireframes

#### Wireframe Components
- **Layout Grids:** Structure and alignment
- **Placeholder Content:** Lorem ipsum text
- **Interactive Elements:** Buttons, forms, menus
- **Annotations:** Notes and specifications

#### Design Process
1. **Low-fidelity sketches** for concept exploration
2. **Medium-fidelity wireframes** for structure
3. **High-fidelity mockups** for final design
4. **Interactive prototypes** for user testing

### 4. Educational Content

#### Concept Diagrams
- **Scientific processes:** Step-by-step illustrations
- **Mathematical concepts:** Visual representations
- **Historical timelines:** Chronological layouts
- **Language learning:** Visual vocabulary

#### Interactive Learning
- **Clickable elements** for exploration
- **Progressive disclosure** of information
- **Quiz elements** with immediate feedback
- **Multimedia integration** with audio/video

## 🛠️ Customization and Settings

### Interface Customization

#### Toolbar Configuration
```json
{
  "toolbar": {
    "position": "top",
    "size": "medium",
    "tools": [
      "select", "pen", "highlighter", "shapes", 
      "text", "eraser", "zoom", "layers"
    ],
    "customizable": true,
    "shortcuts": true
  }
}
```

#### Panel Layout
```json
{
  "panels": {
    "properties": { "position": "right", "width": 300 },
    "layers": { "position": "right", "width": 250 },
    "library": { "position": "left", "width": 200 },
    "navigator": { "position": "bottom", "height": 150 }
  }
}
```

### Theme Integration

#### Dark Mode Support
```css
/* Dark theme canvas styles */
.power-canvas.theme-dark {
  --canvas-bg: #1e1e1e;
  --canvas-grid: #333333;
  --canvas-text: #ffffff;
  --canvas-selection: #007acc;
}
```

#### Custom Themes
```json
{
  "theme": {
    "name": "Custom Theme",
    "colors": {
      "background": "#f5f5f5",
      "grid": "#e0e0e0",
      "selection": "#ff6b6b",
      "text": "#333333"
    },
    "fonts": {
      "ui": "Inter",
      "canvas": "Roboto"
    }
  }
}
```

### Keyboard Shortcuts

#### Default Shortcuts
```
Tools:
V - Select tool
P - Pen tool
H - Highlighter tool
R - Rectangle tool
C - Circle tool
L - Line tool
A - Arrow tool
T - Text tool
E - Eraser tool

Canvas:
Ctrl+N - New canvas
Ctrl+S - Save canvas
Ctrl+Z - Undo
Ctrl+Y - Redo
Ctrl+A - Select all
Delete - Delete selected
Ctrl+D - Duplicate
Ctrl+G - Group elements
Ctrl+Shift+G - Ungroup elements

View:
Ctrl+0 - Fit to window
Ctrl+1 - Actual size
Ctrl+Plus - Zoom in
Ctrl+Minus - Zoom out
F7 - Toggle layers panel
F8 - Toggle properties panel
```

#### Custom Shortcuts
```json
{
  "shortcuts": {
    "quick-export": "Ctrl+E",
    "toggle-grid": "Ctrl+G",
    "toggle-rulers": "Ctrl+R",
    "new-layer": "Ctrl+Shift+N",
    "merge-layers": "Ctrl+Shift+M"
  }
}
```

## 🔍 Troubleshooting

### Common Issues

#### Performance Problems
**Symptoms:** Slow drawing, lag, freezing

**Solutions:**
1. **Reduce Canvas Size:** Use smaller dimensions
2. **Limit Elements:** Keep element count reasonable
3. **Optimize Images:** Compress imported images
4. **Clear Cache:** Reset canvas cache
5. **Update Hardware:** Ensure adequate GPU/RAM

#### Export Issues
**Symptoms:** Failed exports, corrupted files

**Solutions:**
1. **Check File Permissions:** Ensure write access
2. **Reduce Export Size:** Lower DPI or dimensions
3. **Simplify Content:** Remove complex elements
4. **Update Obsidian:** Use latest version
5. **Clear Temp Files:** Clean temporary directories

#### Tool Problems
**Symptoms:** Tools not working, missing features

**Solutions:**
1. **Restart Plugin:** Disable and re-enable
2. **Check Settings:** Verify tool configuration
3. **Reset Preferences:** Restore default settings
4. **Update Plugin:** Install latest version
5. **Check Conflicts:** Disable other plugins temporarily

### Error Messages

#### "Canvas Too Large"
```
Error: Canvas dimensions exceed maximum size (8192x8192)
```
**Fix:** Reduce canvas width/height in settings

#### "Export Failed"
```
Error: Unable to export canvas - insufficient memory
```
**Fix:** Close other applications, reduce export quality

#### "Tool Not Available"
```
Error: Selected tool is not available in current mode
```
**Fix:** Switch to appropriate canvas mode or tool

### Debug Information

#### Enable Debug Mode
```json
{
  "debug": {
    "enabled": true,
    "logLevel": "verbose",
    "showPerformance": true,
    "trackMemory": true
  }
}
```

#### Debug Console Commands
```javascript
// Canvas information
PowerCanvas.getCanvasInfo();

// Performance metrics
PowerCanvas.getPerformanceStats();

// Memory usage
PowerCanvas.getMemoryUsage();

// Element debugging
PowerCanvas.debugElement(elementId);
```

## 📚 Additional Resources

### Learning Resources
- **Video Tutorials:** Step-by-step guides
- **Example Canvases:** Download sample files
- **Community Gallery:** User-created content
- **Best Practices:** Tips from experienced users

### Integration Guides
- [Power Redact Integration](INTEGRATION_GUIDE.md)
- [Templater Scripts](https://github.com/memorymusicllc/power.components/wiki/Templater)
- [Dataview Queries](https://github.com/memorymusicllc/power.components/wiki/Dataview)
- [CSS Customization](https://github.com/memorymusicllc/power.components/wiki/CSS)

### Community
- **Discord Server:** Real-time help and discussion
- **GitHub Discussions:** Feature requests and feedback
- **Reddit Community:** r/ObsidianMD power canvas posts
- **YouTube Channel:** Tutorial videos and tips

---

## 📝 Quick Reference

### Essential Shortcuts
```
Select: V          Pen: P           Text: T
Shapes: R/C/L/A    Zoom: Ctrl+0/1   Save: Ctrl+S
Undo: Ctrl+Z       Redo: Ctrl+Y     Export: Ctrl+E
```

### Tool Properties
- **Size:** Brush/stroke width
- **Opacity:** Transparency level
- **Color:** Fill and stroke colors
- **Blend Mode:** How layers interact

### Export Formats
- **PNG:** High-quality images
- **SVG:** Scalable vectors
- **PDF:** Print-ready documents
- **JSON:** Canvas data backup

---

**Ready to create?** Check out the [Integration Guide](INTEGRATION_GUIDE.md) to learn how to combine Power Canvas with Power Redact for secure visual workflows.

