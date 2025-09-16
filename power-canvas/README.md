
# Power Canvas Plugin

Advanced 3D visualization canvas with WebGL rendering, multi-format support, and professional UI components for Obsidian.

## Features

### 🎨 Advanced Visualization
- **WebGL/THREE.js 3D Rendering**: Hardware-accelerated 3D graphics with professional lighting and shadows
- **Seamless 2D/3D Switching**: Toggle between traditional 2D canvas and immersive 3D visualization
- **Dynamic Lighting System**: Ambient, directional, and point lighting with real-time shadows
- **Professional Materials**: PBR materials with realistic surface properties

### 🔧 Canvas Management
- **Auto-organize Algorithm**: Force-directed layout prevents node overlap and creates optimal arrangements
- **Collision Detection**: Intelligent node positioning with magnetic snapping
- **Multi-layer Support**: Organize content across multiple layers with visibility controls
- **Unlimited Undo/Redo**: Comprehensive history management with 50+ undo levels

### 📊 Multi-format Support
- **Import Formats**: JSON, Mermaid diagrams, XML, native Canvas files
- **Export Formats**: PNG, SVG, OBJ (3D models), JSON, Mermaid, XML
- **Schema Validation**: Automatic validation of imported data structures
- **Metadata Preservation**: Complete metadata support across all formats

### 🎯 Professional UI
- **Purple Power Button**: Distinctive power mode activation with visual feedback
- **Floating Control Panel**: Comprehensive controls for view, tools, layers, and properties
- **Template Library**: Pre-built templates for flowcharts, mind maps, org charts, and more
- **dat.GUI Integration**: Professional parameter controls for 3D scene manipulation

### ⚡ Power Mode Features
- **3D Visualization Engine**: Full WebGL rendering with scene management
- **Advanced Animations**: Floating, rotation, pulsing, and custom animations
- **Particle Effects**: Dynamic visual effects for enhanced presentations
- **Performance Optimization**: LOD system, culling, and adaptive quality

## Installation

1. Download the plugin files
2. Place in your Obsidian plugins directory: `.obsidian/plugins/power-canvas/`
3. Enable the plugin in Obsidian settings
4. Access via Command Palette: "Open Power Canvas"

## Usage

### Basic Canvas Operations
```typescript
// Create a new node
const node = {
    id: 'unique-id',
    type: 'text',
    x: 100, y: 100,
    width: 120, height: 60,
    text: 'My Node'
};

// Add to canvas
canvasManager.addNode(node);
```

### 3D Mode Activation
1. Click the **⚡ Power Canvas** button in the toolbar
2. Or use Command Palette: "Toggle 2D/3D Mode"
3. Enjoy hardware-accelerated 3D visualization

### Template Usage
1. Open the Library Panel (bottom-left)
2. Browse available templates by category
3. Click to preview and apply templates
4. Customize as needed

### Export Options
1. Open Control Panel (top-right)
2. Navigate to Export section
3. Choose format: PNG, SVG, OBJ, JSON, Mermaid, XML
4. Configure quality and options
5. Click "Export Canvas"

## Templates

### Available Templates
- **Basic Flowchart**: Process flow with decision points
- **Mind Map**: Radial brainstorming structure
- **Organization Chart**: Hierarchical org structure
- **Network Diagram**: Technical network topology
- **Timeline**: Chronological event sequence
- **Kanban Board**: Task management layout

### Custom Templates
Create your own templates by:
1. Designing your canvas layout
2. Exporting as JSON
3. Adding to template library via settings

## 3D Features

### Camera Controls
- **Orbit**: Click and drag to rotate view
- **Pan**: Right-click and drag to pan
- **Zoom**: Mouse wheel to zoom in/out
- **Focus**: Double-click node to focus camera

### Lighting System
- **Ambient Light**: Overall scene illumination
- **Directional Light**: Sun-like directional lighting with shadows
- **Point Lights**: Localized light sources (optional)

### Materials and Effects
- **Node Materials**: Lambertian shading with color customization
- **Edge Rendering**: Anti-aliased lines with arrow support
- **Shadow Mapping**: Real-time shadow casting
- **Post-processing**: Optional bloom, outline, and SSAO effects

## Performance

### Optimization Features
- **Frustum Culling**: Only render visible objects
- **Level of Detail (LOD)**: Reduce complexity for distant objects
- **Adaptive Quality**: Automatic quality adjustment based on performance
- **Memory Management**: Efficient geometry and texture handling

### Performance Settings
- Maximum nodes: 1000 (configurable)
- Target FPS: 60 (30/60/120 options)
- Render distance: 100 units (configurable)
- Auto-culling: Enabled by default

## API Reference

### Core Classes
- `PowerCanvasPlugin`: Main plugin class
- `CanvasManager`: Canvas data and operations
- `RenderEngine`: 3D rendering and WebGL management
- `FileOperations`: Import/export functionality
- `UIManager`: Interface and theme management

### Key Methods
```typescript
// Canvas Management
canvasManager.addNode(node)
canvasManager.autoOrganize()
canvasManager.setViewport(x, y, zoom)

// 3D Rendering
renderEngine.toggle3DMode()
renderEngine.exportAsImage(width, height)
renderEngine.updateAnimations(time)

// File Operations
fileOperations.exportCanvas(data, options)
fileOperations.importCanvas(file, options)
```

## Configuration

### Settings Categories
- **Rendering**: 3D engine, lighting, shadows, antialiasing
- **UI**: Theme, panel positions, grid, minimap
- **Behavior**: Auto-save, undo levels, animations, snapping
- **Export**: Default formats, quality, metadata, compression
- **Performance**: Node limits, culling, LOD, target FPS

### Theme Customization
The plugin supports full theme customization with CSS variables:
```css
.power-canvas-container {
    --pc-primary: #8b5cf6;
    --pc-secondary: #6366f1;
    --pc-accent: #f59e0b;
    /* ... more variables */
}
```

## Troubleshooting

### Common Issues
1. **WebGL not supported**: Ensure your browser/device supports WebGL 2.0
2. **Performance issues**: Reduce node count or disable shadows/antialiasing
3. **Import failures**: Validate file format and schema compliance
4. **Memory warnings**: Enable culling and LOD in performance settings

### Debug Information
Access debug info via:
- Settings → Performance → Performance Monitor
- Browser DevTools → Console for detailed logs
- FPS counter in performance monitor

## Development

### Building from Source
```bash
npm install
npm run build
```

### Development Mode
```bash
npm run dev
```

### Dependencies
- THREE.js: 3D rendering engine
- dat.GUI: Parameter controls
- Obsidian API: Plugin integration
- TypeScript: Type safety

## License

MIT License - see LICENSE file for details.

## Support

For issues, feature requests, or contributions:
- GitHub: [memorymusicllc/power.components](https://github.com/memorymusicllc/power.components)
- Documentation: [Power Canvas Wiki](https://github.com/memorymusicllc/power.components/wiki)

## Changelog

### Version 2.0.0
- Complete 3D visualization system with WebGL/THREE.js
- Multi-format import/export support
- Professional UI with floating panels
- Template library with 6 pre-built templates
- Auto-organize algorithm with collision detection
- Power mode with advanced features
- Comprehensive settings and customization
- Performance optimization and monitoring

---

**⚡ Power Canvas - Elevate your visual thinking with 3D canvas visualization**
