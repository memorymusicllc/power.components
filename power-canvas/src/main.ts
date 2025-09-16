
import { Plugin, WorkspaceLeaf, TFile } from 'obsidian';
import { PowerCanvasView, VIEW_TYPE_POWER_CANVAS } from './types/PowerCanvas';
import { CanvasManager } from './services/CanvasManager';
import { RenderEngine } from './services/RenderEngine';
import { FileOperations } from './services/FileOperations';
import { UIManager } from './services/UIManager';
import { PowerButton } from './components/PowerButton';
import { ControlPanel } from './components/ControlPanel';
import { LibraryPanel } from './components/LibraryPanel';
import { SettingsTab } from './components/SettingsTab';

export default class PowerCanvasPlugin extends Plugin {
    private canvasManager: CanvasManager;
    private renderEngine: RenderEngine;
    private fileOperations: FileOperations;
    private uiManager: UIManager;
    private powerButton: PowerButton;
    private controlPanel: ControlPanel;
    private libraryPanel: LibraryPanel;

    async onload() {
        console.log('Loading Power Canvas Plugin v2.0.0');

        // Initialize core services
        this.canvasManager = new CanvasManager(this.app);
        this.renderEngine = new RenderEngine();
        this.fileOperations = new FileOperations(this.app);
        this.uiManager = new UIManager();

        // Initialize UI components
        this.powerButton = new PowerButton(this);
        this.controlPanel = new ControlPanel(this);
        this.libraryPanel = new LibraryPanel(this);

        // Register view type
        this.registerView(
            VIEW_TYPE_POWER_CANVAS,
            (leaf) => new PowerCanvasView(leaf, this)
        );

        // Add settings tab
        this.addSettingTab(new SettingsTab(this.app, this));

        // Register commands
        this.addCommand({
            id: 'open-power-canvas',
            name: 'Open Power Canvas',
            callback: () => this.activatePowerCanvasView()
        });

        this.addCommand({
            id: 'toggle-3d-mode',
            name: 'Toggle 2D/3D Mode',
            callback: () => this.renderEngine.toggle3DMode()
        });

        this.addCommand({
            id: 'auto-organize-canvas',
            name: 'Auto-organize Canvas',
            callback: () => this.canvasManager.autoOrganize()
        });

        this.addCommand({
            id: 'export-canvas',
            name: 'Export Canvas',
            callback: () => this.fileOperations.showExportDialog()
        });

        // Register file extensions
        this.registerExtensions(['canvas', 'mermaid', 'json'], VIEW_TYPE_POWER_CANVAS);

        // Initialize WebGL context
        await this.renderEngine.initialize();

        console.log('Power Canvas Plugin loaded successfully');
    }

    async onunload() {
        console.log('Unloading Power Canvas Plugin');
        
        // Cleanup resources
        this.renderEngine?.dispose();
        this.uiManager?.cleanup();
        this.powerButton?.cleanup();
        this.controlPanel?.cleanup();
        this.libraryPanel?.cleanup();
    }

    async activatePowerCanvasView() {
        const { workspace } = this.app;
        
        let leaf: WorkspaceLeaf | null = null;
        const leaves = workspace.getLeavesOfType(VIEW_TYPE_POWER_CANVAS);

        if (leaves.length > 0) {
            leaf = leaves[0];
        } else {
            leaf = workspace.getRightLeaf(false);
            await leaf.setViewState({ type: VIEW_TYPE_POWER_CANVAS, active: true });
        }

        workspace.revealLeaf(leaf);
    }

    // Getters for component access
    getCanvasManager(): CanvasManager {
        return this.canvasManager;
    }

    getRenderEngine(): RenderEngine {
        return this.renderEngine;
    }

    getFileOperations(): FileOperations {
        return this.fileOperations;
    }

    getUIManager(): UIManager {
        return this.uiManager;
    }
}
