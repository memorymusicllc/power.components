
import { App, PluginSettingTab, Setting } from 'obsidian';
import { CanvasSettings } from '../types/PowerCanvas';

export class SettingsTab extends PluginSettingTab {
    plugin: any;

    constructor(app: App, plugin: any) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Power Canvas Settings' });

        // Rendering Settings
        this.createRenderingSection(containerEl);
        
        // UI Settings
        this.createUISection(containerEl);
        
        // Behavior Settings
        this.createBehaviorSection(containerEl);
        
        // Export Settings
        this.createExportSection(containerEl);
        
        // Performance Settings
        this.createPerformanceSection(containerEl);
    }

    private createRenderingSection(containerEl: HTMLElement): void {
        containerEl.createEl('h3', { text: 'Rendering' });

        new Setting(containerEl)
            .setName('Default render mode')
            .setDesc('Choose the default rendering mode for new canvases')
            .addDropdown(dropdown => dropdown
                .addOption('2d', '2D Canvas')
                .addOption('3d', '3D WebGL')
                .setValue('2d')
                .onChange(async (value) => {
                    // Save setting
                    console.log('Render mode changed to:', value);
                }));

        new Setting(containerEl)
            .setName('Enable antialiasing')
            .setDesc('Smooth edges in 3D rendering (may impact performance)')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Antialiasing:', value);
                }));

        new Setting(containerEl)
            .setName('Enable shadows')
            .setDesc('Render shadows in 3D mode')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Shadows:', value);
                }));

        new Setting(containerEl)
            .setName('Ambient light intensity')
            .setDesc('Adjust the ambient lighting in 3D scenes')
            .addSlider(slider => slider
                .setLimits(0, 1, 0.1)
                .setValue(0.6)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    console.log('Ambient light:', value);
                }));

        new Setting(containerEl)
            .setName('Directional light intensity')
            .setDesc('Adjust the directional lighting in 3D scenes')
            .addSlider(slider => slider
                .setLimits(0, 2, 0.1)
                .setValue(0.8)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    console.log('Directional light:', value);
                }));
    }

    private createUISection(containerEl: HTMLElement): void {
        containerEl.createEl('h3', { text: 'User Interface' });

        new Setting(containerEl)
            .setName('Theme')
            .setDesc('Choose the UI theme')
            .addDropdown(dropdown => dropdown
                .addOption('dark', 'Dark Theme')
                .addOption('light', 'Light Theme')
                .addOption('auto', 'Auto (Follow Obsidian)')
                .setValue('dark')
                .onChange(async (value) => {
                    console.log('Theme changed to:', value);
                }));

        new Setting(containerEl)
            .setName('Control panel position')
            .setDesc('Position of the floating control panel')
            .addDropdown(dropdown => dropdown
                .addOption('top-right', 'Top Right')
                .addOption('top-left', 'Top Left')
                .addOption('bottom-right', 'Bottom Right')
                .addOption('bottom-left', 'Bottom Left')
                .setValue('top-right')
                .onChange(async (value) => {
                    console.log('Control panel position:', value);
                }));

        new Setting(containerEl)
            .setName('Show grid by default')
            .setDesc('Display grid lines when opening a canvas')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Show grid:', value);
                }));

        new Setting(containerEl)
            .setName('Show ruler')
            .setDesc('Display ruler guides around the canvas')
            .addToggle(toggle => toggle
                .setValue(false)
                .onChange(async (value) => {
                    console.log('Show ruler:', value);
                }));

        new Setting(containerEl)
            .setName('Show minimap')
            .setDesc('Display a minimap for navigation')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Show minimap:', value);
                }));

        new Setting(containerEl)
            .setName('Grid size')
            .setDesc('Size of grid cells in pixels')
            .addSlider(slider => slider
                .setLimits(10, 50, 5)
                .setValue(20)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    console.log('Grid size:', value);
                }));
    }

    private createBehaviorSection(containerEl: HTMLElement): void {
        containerEl.createEl('h3', { text: 'Behavior' });

        new Setting(containerEl)
            .setName('Auto-save')
            .setDesc('Automatically save canvas changes')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Auto-save:', value);
                }));

        new Setting(containerEl)
            .setName('Auto-save interval')
            .setDesc('How often to auto-save (in seconds)')
            .addSlider(slider => slider
                .setLimits(5, 300, 5)
                .setValue(30)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    console.log('Auto-save interval:', value);
                }));

        new Setting(containerEl)
            .setName('Undo levels')
            .setDesc('Number of undo operations to remember')
            .addSlider(slider => slider
                .setLimits(10, 100, 5)
                .setValue(50)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    console.log('Undo levels:', value);
                }));

        new Setting(containerEl)
            .setName('Smooth animations')
            .setDesc('Enable smooth transitions and animations')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Smooth animations:', value);
                }));

        new Setting(containerEl)
            .setName('Snap to grid')
            .setDesc('Automatically align nodes to grid')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Snap to grid:', value);
                }));

        new Setting(containerEl)
            .setName('Collision detection')
            .setDesc('Prevent nodes from overlapping')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Collision detection:', value);
                }));

        new Setting(containerEl)
            .setName('Magnetic snapping')
            .setDesc('Snap nodes to nearby edges and centers')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Magnetic snapping:', value);
                }));
    }

    private createExportSection(containerEl: HTMLElement): void {
        containerEl.createEl('h3', { text: 'Export' });

        new Setting(containerEl)
            .setName('Default export format')
            .setDesc('Default format for canvas exports')
            .addDropdown(dropdown => dropdown
                .addOption('png', 'PNG Image')
                .addOption('svg', 'SVG Vector')
                .addOption('json', 'JSON Data')
                .addOption('obj', '3D Model (OBJ)')
                .setValue('png')
                .onChange(async (value) => {
                    console.log('Default export format:', value);
                }));

        new Setting(containerEl)
            .setName('Export quality')
            .setDesc('Quality for image exports (0.1 - 1.0)')
            .addSlider(slider => slider
                .setLimits(0.1, 1, 0.1)
                .setValue(0.9)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    console.log('Export quality:', value);
                }));

        new Setting(containerEl)
            .setName('Include metadata')
            .setDesc('Include canvas metadata in exports')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Include metadata:', value);
                }));

        new Setting(containerEl)
            .setName('Enable compression')
            .setDesc('Compress exported files when possible')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Enable compression:', value);
                }));
    }

    private createPerformanceSection(containerEl: HTMLElement): void {
        containerEl.createEl('h3', { text: 'Performance' });

        new Setting(containerEl)
            .setName('Maximum nodes')
            .setDesc('Maximum number of nodes per canvas')
            .addSlider(slider => slider
                .setLimits(100, 5000, 100)
                .setValue(1000)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    console.log('Maximum nodes:', value);
                }));

        new Setting(containerEl)
            .setName('Enable culling')
            .setDesc('Hide objects outside the viewport to improve performance')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Enable culling:', value);
                }));

        new Setting(containerEl)
            .setName('Level of detail (LOD)')
            .setDesc('Reduce detail for distant objects')
            .addToggle(toggle => toggle
                .setValue(true)
                .onChange(async (value) => {
                    console.log('Enable LOD:', value);
                }));

        new Setting(containerEl)
            .setName('Render distance')
            .setDesc('Maximum distance for rendering objects')
            .addSlider(slider => slider
                .setLimits(50, 500, 25)
                .setValue(100)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    console.log('Render distance:', value);
                }));

        new Setting(containerEl)
            .setName('Target FPS')
            .setDesc('Target frames per second for animations')
            .addDropdown(dropdown => dropdown
                .addOption('30', '30 FPS')
                .addOption('60', '60 FPS')
                .addOption('120', '120 FPS')
                .setValue('60')
                .onChange(async (value) => {
                    console.log('Target FPS:', value);
                }));

        // Performance monitoring
        containerEl.createEl('h4', { text: 'Performance Monitor' });
        
        const perfContainer = containerEl.createDiv();
        perfContainer.style.background = 'var(--background-secondary)';
        perfContainer.style.padding = '10px';
        perfContainer.style.borderRadius = '4px';
        perfContainer.style.marginTop = '10px';

        const fpsDisplay = perfContainer.createDiv();
        fpsDisplay.textContent = 'FPS: --';
        fpsDisplay.style.fontFamily = 'monospace';
        fpsDisplay.style.fontSize = '12px';

        const memoryDisplay = perfContainer.createDiv();
        memoryDisplay.textContent = 'Memory: --';
        memoryDisplay.style.fontFamily = 'monospace';
        memoryDisplay.style.fontSize = '12px';

        const nodesDisplay = perfContainer.createDiv();
        nodesDisplay.textContent = 'Nodes: --';
        nodesDisplay.style.fontFamily = 'monospace';
        nodesDisplay.style.fontSize = '12px';

        // Update performance stats periodically
        const updateStats = () => {
            const renderEngine = this.plugin.getRenderEngine();
            if (renderEngine) {
                fpsDisplay.textContent = `FPS: ${renderEngine.getFPS()}`;
            }

            const canvasManager = this.plugin.getCanvasManager();
            if (canvasManager) {
                const canvasData = canvasManager.getCanvasData();
                nodesDisplay.textContent = `Nodes: ${canvasData.nodes.length}`;
            }

            // Memory usage (if available)
            if (performance.memory) {
                const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
                memoryDisplay.textContent = `Memory: ${used} MB`;
            }
        };

        // Update every second
        const statsInterval = setInterval(updateStats, 1000);
        
        // Cleanup interval when settings are closed
        this.register(() => clearInterval(statsInterval));

        // Reset settings button
        containerEl.createEl('h4', { text: 'Reset Settings' });
        
        new Setting(containerEl)
            .setName('Reset to defaults')
            .setDesc('Reset all Power Canvas settings to their default values')
            .addButton(button => button
                .setButtonText('Reset Settings')
                .setWarning()
                .onClick(async () => {
                    // Show confirmation dialog
                    const confirmed = confirm('Are you sure you want to reset all Power Canvas settings to their defaults? This action cannot be undone.');
                    
                    if (confirmed) {
                        // Reset settings logic would go here
                        console.log('Settings reset to defaults');
                        
                        // Refresh the settings display
                        this.display();
                    }
                }));
    }

    // Helper method to get current settings
    private getCurrentSettings(): CanvasSettings {
        // This would return the current settings from the plugin
        return {
            rendering: {
                mode: '2d',
                renderer: 'webgl',
                antialias: true,
                shadows: true,
                lighting: {
                    ambient: { color: '#404040', intensity: 0.6 },
                    directional: { color: '#ffffff', intensity: 0.8, position: { x: 10, y: 10, z: 5 }, castShadow: true }
                },
                camera: {
                    type: 'perspective',
                    fov: 75,
                    near: 0.1,
                    far: 1000,
                    position: { x: 0, y: 0, z: 10 },
                    target: { x: 0, y: 0, z: 0 },
                    controls: {
                        enabled: true,
                        autoRotate: false,
                        enableZoom: true,
                        enablePan: true,
                        enableRotate: true
                    }
                },
                effects: []
            },
            ui: {
                theme: {
                    primary: '#8b5cf6',
                    secondary: '#6366f1',
                    accent: '#f59e0b',
                    background: '#1f2937',
                    surface: '#374151',
                    text: '#f9fafb',
                    textSecondary: '#d1d5db',
                    border: '#4b5563',
                    shadow: 'rgba(0, 0, 0, 0.25)',
                    success: '#10b981',
                    warning: '#f59e0b',
                    error: '#ef4444'
                },
                controlPanel: {
                    position: 'top-right',
                    collapsed: false,
                    sections: {
                        view: true,
                        tools: true,
                        layers: true,
                        properties: true
                    }
                },
                showGrid: true,
                showRuler: false,
                showMinimap: true,
                snapToGrid: true,
                gridSize: 20
            },
            behavior: {
                autoSave: true,
                autoSaveInterval: 30000,
                undoLevels: 50,
                smoothAnimations: true,
                collisionDetection: true,
                magneticSnapping: true
            },
            export: {
                defaultFormat: 'png',
                quality: 0.9,
                includeMetadata: true,
                compression: true
            },
            performance: {
                maxNodes: 1000,
                cullingEnabled: true,
                lodEnabled: true,
                renderDistance: 100,
                targetFPS: 60
            }
        };
    }
}
