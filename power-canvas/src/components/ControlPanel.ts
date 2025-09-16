
import { UIManager } from '../services/UIManager';
import { CanvasSettings } from '../types/PowerCanvas';

export class ControlPanel {
    private plugin: any;
    private uiManager: UIManager;
    private panel: HTMLElement;
    private isCollapsed = false;
    private sections: Map<string, HTMLElement> = new Map();

    constructor(plugin: any) {
        this.plugin = plugin;
        this.uiManager = plugin.getUIManager();
        this.createPanel();
    }

    private createPanel(): void {
        this.panel = document.createElement('div');
        this.panel.className = 'control-panel';
        this.panel.id = 'power-canvas-control-panel';

        // Create header
        this.createHeader();

        // Create sections
        this.createViewSection();
        this.createToolsSection();
        this.createLayersSection();
        this.createPropertiesSection();
        this.createExportSection();

        // Add to DOM
        document.body.appendChild(this.panel);
    }

    private createHeader(): void {
        const header = document.createElement('div');
        header.className = 'control-panel-header';

        const title = document.createElement('h3');
        title.className = 'control-panel-title';
        title.textContent = 'Power Canvas Controls';

        const collapseBtn = document.createElement('button');
        collapseBtn.className = 'control-panel-collapse';
        collapseBtn.innerHTML = '−';
        collapseBtn.addEventListener('click', () => this.toggleCollapse());

        header.appendChild(title);
        header.appendChild(collapseBtn);
        this.panel.appendChild(header);
    }

    private createViewSection(): void {
        const section = this.createSection('View Controls', 'view');

        // 2D/3D Toggle
        const modeGroup = this.uiManager.createFormGroup(
            'Render Mode',
            this.uiManager.createSelect([
                { value: '2d', text: '2D Canvas' },
                { value: '3d', text: '3D WebGL' }
            ], '2d')
        );
        section.appendChild(modeGroup);

        // Zoom controls
        const zoomGroup = document.createElement('div');
        zoomGroup.className = 'form-group';
        
        const zoomLabel = document.createElement('label');
        zoomLabel.className = 'form-label';
        zoomLabel.textContent = 'Zoom Level';
        
        const zoomRange = this.uiManager.createRange(0.1, 5, 1, 0.1, (value) => {
            this.updateZoom(value);
        });
        
        const zoomValue = document.createElement('span');
        zoomValue.textContent = '100%';
        zoomValue.style.fontSize = '12px';
        zoomValue.style.color = 'var(--pc-text-secondary)';
        
        zoomRange.addEventListener('input', () => {
            zoomValue.textContent = Math.round(parseFloat(zoomRange.value) * 100) + '%';
        });

        zoomGroup.appendChild(zoomLabel);
        zoomGroup.appendChild(zoomRange);
        zoomGroup.appendChild(zoomValue);
        section.appendChild(zoomGroup);

        // View buttons
        const viewButtons = document.createElement('div');
        viewButtons.className = 'button-group';

        const centerBtn = this.uiManager.createButton('Center View', 'btn', () => {
            this.plugin.getCanvasManager().centerView();
        });

        const fitBtn = this.uiManager.createButton('Fit to View', 'btn', () => {
            this.plugin.getCanvasManager().fitToView();
        });

        viewButtons.appendChild(centerBtn);
        viewButtons.appendChild(fitBtn);
        section.appendChild(viewButtons);

        // Grid and guides
        const gridGroup = this.uiManager.createFormGroup(
            'Grid & Guides',
            this.uiManager.createCheckbox('Show Grid', true, (checked) => {
                this.toggleGrid(checked);
            })
        );
        section.appendChild(gridGroup);

        const snapGroup = this.uiManager.createFormGroup(
            '',
            this.uiManager.createCheckbox('Snap to Grid', true, (checked) => {
                this.toggleSnap(checked);
            })
        );
        section.appendChild(snapGroup);
    }

    private createToolsSection(): void {
        const section = this.createSection('Tools', 'tools');

        // Selection tools
        const selectionGroup = document.createElement('div');
        selectionGroup.className = 'form-group';
        
        const selectionLabel = document.createElement('label');
        selectionLabel.className = 'form-label';
        selectionLabel.textContent = 'Selection Tools';
        
        const toolButtons = document.createElement('div');
        toolButtons.className = 'button-group';
        toolButtons.style.flexDirection = 'column';
        toolButtons.style.gap = '6px';

        const selectBtn = this.uiManager.createButton('Select', 'btn', () => {
            this.setTool('select');
        });

        const panBtn = this.uiManager.createButton('Pan', 'btn', () => {
            this.setTool('pan');
        });

        const zoomBtn = this.uiManager.createButton('Zoom', 'btn', () => {
            this.setTool('zoom');
        });

        toolButtons.appendChild(selectBtn);
        toolButtons.appendChild(panBtn);
        toolButtons.appendChild(zoomBtn);

        selectionGroup.appendChild(selectionLabel);
        selectionGroup.appendChild(toolButtons);
        section.appendChild(selectionGroup);

        // Node creation tools
        const nodeGroup = document.createElement('div');
        nodeGroup.className = 'form-group';
        
        const nodeLabel = document.createElement('label');
        nodeLabel.className = 'form-label';
        nodeLabel.textContent = 'Create Nodes';
        
        const nodeButtons = document.createElement('div');
        nodeButtons.className = 'button-group';
        nodeButtons.style.flexDirection = 'column';
        nodeButtons.style.gap = '6px';

        const textBtn = this.uiManager.createButton('Text Node', 'btn', () => {
            this.createNode('text');
        });

        const fileBtn = this.uiManager.createButton('File Node', 'btn', () => {
            this.createNode('file');
        });

        const linkBtn = this.uiManager.createButton('Link Node', 'btn', () => {
            this.createNode('link');
        });

        nodeButtons.appendChild(textBtn);
        nodeButtons.appendChild(fileBtn);
        nodeButtons.appendChild(linkBtn);

        nodeGroup.appendChild(nodeLabel);
        nodeGroup.appendChild(nodeButtons);
        section.appendChild(nodeGroup);

        // Auto-organize
        const organizeGroup = document.createElement('div');
        organizeGroup.className = 'form-group';
        
        const organizeBtn = this.uiManager.createButton('Auto-organize', 'btn primary', () => {
            this.plugin.getCanvasManager().autoOrganize();
            this.uiManager.showToast('Canvas auto-organized!', 'success');
        });
        organizeBtn.style.width = '100%';

        organizeGroup.appendChild(organizeBtn);
        section.appendChild(organizeGroup);
    }

    private createLayersSection(): void {
        const section = this.createSection('Layers', 'layers');

        // Layer list
        const layerList = document.createElement('div');
        layerList.className = 'layer-list';
        layerList.style.maxHeight = '150px';
        layerList.style.overflowY = 'auto';
        layerList.style.border = '1px solid var(--pc-border)';
        layerList.style.borderRadius = '4px';
        layerList.style.padding = '8px';

        // Default layers
        const layers = ['Background', 'Nodes', 'Edges', 'UI'];
        layers.forEach((layerName, index) => {
            const layerItem = document.createElement('div');
            layerItem.style.display = 'flex';
            layerItem.style.alignItems = 'center';
            layerItem.style.justifyContent = 'space-between';
            layerItem.style.padding = '4px 0';
            layerItem.style.borderBottom = index < layers.length - 1 ? '1px solid var(--pc-border)' : 'none';

            const layerInfo = document.createElement('div');
            layerInfo.style.display = 'flex';
            layerInfo.style.alignItems = 'center';
            layerInfo.style.gap = '8px';

            const visibilityBtn = document.createElement('button');
            visibilityBtn.textContent = '👁';
            visibilityBtn.style.background = 'none';
            visibilityBtn.style.border = 'none';
            visibilityBtn.style.cursor = 'pointer';
            visibilityBtn.style.fontSize = '12px';

            const layerLabel = document.createElement('span');
            layerLabel.textContent = layerName;
            layerLabel.style.fontSize = '12px';
            layerLabel.style.color = 'var(--pc-text)';

            layerInfo.appendChild(visibilityBtn);
            layerInfo.appendChild(layerLabel);

            const lockBtn = document.createElement('button');
            lockBtn.textContent = '🔓';
            lockBtn.style.background = 'none';
            lockBtn.style.border = 'none';
            lockBtn.style.cursor = 'pointer';
            lockBtn.style.fontSize = '12px';

            layerItem.appendChild(layerInfo);
            layerItem.appendChild(lockBtn);
            layerList.appendChild(layerItem);
        });

        section.appendChild(layerList);

        // Layer controls
        const layerControls = document.createElement('div');
        layerControls.className = 'button-group';
        layerControls.style.marginTop = '10px';

        const addLayerBtn = this.uiManager.createButton('Add Layer', 'btn', () => {
            this.addLayer();
        });

        const deleteLayerBtn = this.uiManager.createButton('Delete Layer', 'btn', () => {
            this.deleteLayer();
        });

        layerControls.appendChild(addLayerBtn);
        layerControls.appendChild(deleteLayerBtn);
        section.appendChild(layerControls);
    }

    private createPropertiesSection(): void {
        const section = this.createSection('Properties', 'properties');

        // Node properties (shown when node is selected)
        const nodeProps = document.createElement('div');
        nodeProps.id = 'node-properties';
        nodeProps.style.display = 'none';

        // Position
        const positionGroup = document.createElement('div');
        positionGroup.className = 'form-group';
        
        const positionLabel = document.createElement('label');
        positionLabel.className = 'form-label';
        positionLabel.textContent = 'Position';
        
        const positionInputs = document.createElement('div');
        positionInputs.style.display = 'flex';
        positionInputs.style.gap = '8px';

        const xInput = this.uiManager.createInput('number', 'X', '0');
        xInput.style.flex = '1';
        const yInput = this.uiManager.createInput('number', 'Y', '0');
        yInput.style.flex = '1';

        positionInputs.appendChild(xInput);
        positionInputs.appendChild(yInput);
        positionGroup.appendChild(positionLabel);
        positionGroup.appendChild(positionInputs);
        nodeProps.appendChild(positionGroup);

        // Size
        const sizeGroup = document.createElement('div');
        sizeGroup.className = 'form-group';
        
        const sizeLabel = document.createElement('label');
        sizeLabel.className = 'form-label';
        sizeLabel.textContent = 'Size';
        
        const sizeInputs = document.createElement('div');
        sizeInputs.style.display = 'flex';
        sizeInputs.style.gap = '8px';

        const widthInput = this.uiManager.createInput('number', 'Width', '120');
        widthInput.style.flex = '1';
        const heightInput = this.uiManager.createInput('number', 'Height', '60');
        heightInput.style.flex = '1';

        sizeInputs.appendChild(widthInput);
        sizeInputs.appendChild(heightInput);
        sizeGroup.appendChild(sizeLabel);
        sizeGroup.appendChild(sizeInputs);
        nodeProps.appendChild(sizeGroup);

        // Color
        const colorGroup = this.uiManager.createFormGroup(
            'Background Color',
            this.uiManager.createInput('color', '', '#8b5cf6')
        );
        nodeProps.appendChild(colorGroup);

        section.appendChild(nodeProps);

        // Default message when nothing is selected
        const defaultMsg = document.createElement('div');
        defaultMsg.id = 'properties-default';
        defaultMsg.textContent = 'Select a node or edge to edit properties';
        defaultMsg.style.fontSize = '12px';
        defaultMsg.style.color = 'var(--pc-text-secondary)';
        defaultMsg.style.textAlign = 'center';
        defaultMsg.style.padding = '20px';
        section.appendChild(defaultMsg);
    }

    private createExportSection(): void {
        const section = this.createSection('Export', 'export');

        // Export format
        const formatGroup = this.uiManager.createFormGroup(
            'Export Format',
            this.uiManager.createSelect([
                { value: 'png', text: 'PNG Image' },
                { value: 'svg', text: 'SVG Vector' },
                { value: 'json', text: 'JSON Data' },
                { value: 'obj', text: '3D Model (OBJ)' },
                { value: 'mermaid', text: 'Mermaid Diagram' },
                { value: 'xml', text: 'XML Data' }
            ], 'png')
        );
        section.appendChild(formatGroup);

        // Export quality
        const qualityGroup = document.createElement('div');
        qualityGroup.className = 'form-group';
        
        const qualityLabel = document.createElement('label');
        qualityLabel.className = 'form-label';
        qualityLabel.textContent = 'Quality';
        
        const qualityRange = this.uiManager.createRange(0.1, 1, 0.9, 0.1);
        const qualityValue = document.createElement('span');
        qualityValue.textContent = '90%';
        qualityValue.style.fontSize = '12px';
        qualityValue.style.color = 'var(--pc-text-secondary)';
        
        qualityRange.addEventListener('input', () => {
            qualityValue.textContent = Math.round(parseFloat(qualityRange.value) * 100) + '%';
        });

        qualityGroup.appendChild(qualityLabel);
        qualityGroup.appendChild(qualityRange);
        qualityGroup.appendChild(qualityValue);
        section.appendChild(qualityGroup);

        // Export options
        const optionsGroup = document.createElement('div');
        optionsGroup.className = 'form-group';
        
        const includeMetadata = this.uiManager.createCheckbox('Include Metadata', true);
        const transparentBg = this.uiManager.createCheckbox('Transparent Background', false);
        
        optionsGroup.appendChild(includeMetadata);
        optionsGroup.appendChild(transparentBg);
        section.appendChild(optionsGroup);

        // Export button
        const exportBtn = this.uiManager.createButton('Export Canvas', 'btn primary', () => {
            this.exportCanvas();
        });
        exportBtn.style.width = '100%';
        exportBtn.style.marginTop = '10px';
        section.appendChild(exportBtn);
    }

    private createSection(title: string, id: string): HTMLElement {
        const section = document.createElement('div');
        section.className = 'control-panel-section';
        section.id = `section-${id}`;

        const header = document.createElement('div');
        header.className = 'section-header';
        header.textContent = title;
        header.addEventListener('click', () => this.toggleSection(id));

        const content = document.createElement('div');
        content.className = 'section-content expanded';
        content.id = `content-${id}`;

        section.appendChild(header);
        section.appendChild(content);
        this.panel.appendChild(section);

        this.sections.set(id, content);
        return content;
    }

    private toggleSection(sectionId: string): void {
        const content = document.getElementById(`content-${sectionId}`);
        if (content) {
            content.classList.toggle('expanded');
        }
    }

    private toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
        
        const sections = this.panel.querySelectorAll('.control-panel-section');
        const collapseBtn = this.panel.querySelector('.control-panel-collapse') as HTMLButtonElement;
        
        if (this.isCollapsed) {
            sections.forEach(section => {
                (section as HTMLElement).style.display = 'none';
            });
            collapseBtn.innerHTML = '+';
            this.panel.style.height = 'auto';
        } else {
            sections.forEach(section => {
                (section as HTMLElement).style.display = 'block';
            });
            collapseBtn.innerHTML = '−';
            this.panel.style.height = '';
        }
    }

    // Event handlers
    private updateZoom(value: number): void {
        const canvasManager = this.plugin.getCanvasManager();
        const viewport = canvasManager.getViewport();
        canvasManager.setViewport(viewport.x, viewport.y, value);
    }

    private toggleGrid(show: boolean): void {
        // Implementation would toggle grid visibility
        console.log('Toggle grid:', show);
    }

    private toggleSnap(snap: boolean): void {
        // Implementation would toggle snap to grid
        console.log('Toggle snap:', snap);
    }

    private setTool(tool: string): void {
        // Update active tool
        const toolButtons = this.panel.querySelectorAll('.button-group .btn');
        toolButtons.forEach(btn => btn.classList.remove('active'));
        
        // Find and activate the clicked tool button
        const activeBtn = Array.from(toolButtons).find(btn => 
            btn.textContent?.toLowerCase().includes(tool)
        );
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        console.log('Set tool:', tool);
    }

    private createNode(type: string): void {
        const canvasManager = this.plugin.getCanvasManager();
        const nodeId = canvasManager.generateNodeId();
        
        const node = {
            id: nodeId,
            type: type as any,
            x: Math.random() * 400 + 200,
            y: Math.random() * 300 + 150,
            width: 120,
            height: 60,
            text: `New ${type} node`
        };
        
        canvasManager.addNode(node);
        this.uiManager.showToast(`${type} node created!`, 'success');
    }

    private addLayer(): void {
        // Implementation would add a new layer
        this.uiManager.showToast('Layer added!', 'success');
    }

    private deleteLayer(): void {
        // Implementation would delete selected layer
        this.uiManager.showToast('Layer deleted!', 'info');
    }

    private exportCanvas(): void {
        this.plugin.getFileOperations().showExportDialog();
    }

    // Public methods
    show(): void {
        this.panel.style.display = 'block';
    }

    hide(): void {
        this.panel.style.display = 'none';
    }

    toggle(): void {
        const isVisible = this.panel.style.display !== 'none';
        if (isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    updateNodeProperties(node: any): void {
        const nodeProps = document.getElementById('node-properties');
        const defaultMsg = document.getElementById('properties-default');
        
        if (node) {
            if (nodeProps) nodeProps.style.display = 'block';
            if (defaultMsg) defaultMsg.style.display = 'none';
            
            // Update input values
            const xInput = nodeProps?.querySelector('input[placeholder="X"]') as HTMLInputElement;
            const yInput = nodeProps?.querySelector('input[placeholder="Y"]') as HTMLInputElement;
            const widthInput = nodeProps?.querySelector('input[placeholder="Width"]') as HTMLInputElement;
            const heightInput = nodeProps?.querySelector('input[placeholder="Height"]') as HTMLInputElement;
            
            if (xInput) xInput.value = node.x.toString();
            if (yInput) yInput.value = node.y.toString();
            if (widthInput) widthInput.value = node.width.toString();
            if (heightInput) heightInput.value = node.height.toString();
        } else {
            if (nodeProps) nodeProps.style.display = 'none';
            if (defaultMsg) defaultMsg.style.display = 'block';
        }
    }

    cleanup(): void {
        if (this.panel && this.panel.parentNode) {
            this.panel.parentNode.removeChild(this.panel);
        }
        this.sections.clear();
    }
}
