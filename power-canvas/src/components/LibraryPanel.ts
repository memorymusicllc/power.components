
import { UIManager } from '../services/UIManager';
import { LibraryItem, CanvasData } from '../types/PowerCanvas';

export class LibraryPanel {
    private plugin: any;
    private uiManager: UIManager;
    private panel: HTMLElement;
    private searchInput: HTMLInputElement;
    private contentArea: HTMLElement;
    private libraryItems: LibraryItem[] = [];
    private filteredItems: LibraryItem[] = [];
    private isVisible = false;

    constructor(plugin: any) {
        this.plugin = plugin;
        this.uiManager = plugin.getUIManager();
        this.initializeLibraryItems();
        this.createPanel();
    }

    private initializeLibraryItems(): void {
        // Predefined template library
        this.libraryItems = [
            {
                id: 'flowchart-basic',
                name: 'Basic Flowchart',
                description: 'Simple flowchart with decision points',
                category: 'Flowcharts',
                tags: ['flowchart', 'process', 'decision'],
                thumbnail: '📊',
                template: this.createFlowchartTemplate(),
                metadata: {
                    author: 'Power Canvas',
                    version: '1.0',
                    created: '2024-01-01',
                    updated: '2024-01-01',
                    downloads: 150,
                    rating: 4.5
                }
            },
            {
                id: 'mind-map',
                name: 'Mind Map',
                description: 'Radial mind map structure',
                category: 'Mind Maps',
                tags: ['mindmap', 'brainstorm', 'ideas'],
                thumbnail: '🧠',
                template: this.createMindMapTemplate(),
                metadata: {
                    author: 'Power Canvas',
                    version: '1.0',
                    created: '2024-01-01',
                    updated: '2024-01-01',
                    downloads: 200,
                    rating: 4.8
                }
            },
            {
                id: 'org-chart',
                name: 'Organization Chart',
                description: 'Hierarchical organization structure',
                category: 'Organization',
                tags: ['org', 'hierarchy', 'structure'],
                thumbnail: '🏢',
                template: this.createOrgChartTemplate(),
                metadata: {
                    author: 'Power Canvas',
                    version: '1.0',
                    created: '2024-01-01',
                    updated: '2024-01-01',
                    downloads: 120,
                    rating: 4.3
                }
            },
            {
                id: 'network-diagram',
                name: 'Network Diagram',
                description: 'Network topology visualization',
                category: 'Technical',
                tags: ['network', 'topology', 'technical'],
                thumbnail: '🌐',
                template: this.createNetworkTemplate(),
                metadata: {
                    author: 'Power Canvas',
                    version: '1.0',
                    created: '2024-01-01',
                    updated: '2024-01-01',
                    downloads: 80,
                    rating: 4.2
                }
            },
            {
                id: 'timeline',
                name: 'Timeline',
                description: 'Chronological timeline layout',
                category: 'Timeline',
                tags: ['timeline', 'chronology', 'events'],
                thumbnail: '📅',
                template: this.createTimelineTemplate(),
                metadata: {
                    author: 'Power Canvas',
                    version: '1.0',
                    created: '2024-01-01',
                    updated: '2024-01-01',
                    downloads: 95,
                    rating: 4.4
                }
            },
            {
                id: 'kanban-board',
                name: 'Kanban Board',
                description: 'Task management board',
                category: 'Project Management',
                tags: ['kanban', 'tasks', 'project'],
                thumbnail: '📋',
                template: this.createKanbanTemplate(),
                metadata: {
                    author: 'Power Canvas',
                    version: '1.0',
                    created: '2024-01-01',
                    updated: '2024-01-01',
                    downloads: 180,
                    rating: 4.7
                }
            }
        ];

        this.filteredItems = [...this.libraryItems];
    }

    private createPanel(): void {
        this.panel = document.createElement('div');
        this.panel.className = 'library-panel';
        this.panel.id = 'power-canvas-library-panel';
        this.panel.style.display = 'none'; // Hidden by default

        this.createHeader();
        this.createContent();

        document.body.appendChild(this.panel);
    }

    private createHeader(): void {
        const header = document.createElement('div');
        header.className = 'library-header';

        // Search input
        this.searchInput = this.uiManager.createInput('text', 'Search templates...', '');
        this.searchInput.className = 'library-search';
        this.searchInput.addEventListener('input', () => this.filterItems());

        // Category filter
        const categorySelect = this.uiManager.createSelect([
            { value: 'all', text: 'All Categories' },
            { value: 'Flowcharts', text: 'Flowcharts' },
            { value: 'Mind Maps', text: 'Mind Maps' },
            { value: 'Organization', text: 'Organization' },
            { value: 'Technical', text: 'Technical' },
            { value: 'Timeline', text: 'Timeline' },
            { value: 'Project Management', text: 'Project Management' }
        ], 'all');
        categorySelect.style.minWidth = '120px';
        categorySelect.addEventListener('change', () => this.filterItems());

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'var(--pc-text-secondary)';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '18px';
        closeBtn.style.padding = '0 4px';
        closeBtn.addEventListener('click', () => this.hide());

        header.appendChild(this.searchInput);
        header.appendChild(categorySelect);
        header.appendChild(closeBtn);
        this.panel.appendChild(header);
    }

    private createContent(): void {
        this.contentArea = document.createElement('div');
        this.contentArea.className = 'library-content';

        this.renderItems();
        this.panel.appendChild(this.contentArea);
    }

    private renderItems(): void {
        this.contentArea.innerHTML = '';

        if (this.filteredItems.length === 0) {
            const noResults = document.createElement('div');
            noResults.textContent = 'No templates found';
            noResults.style.textAlign = 'center';
            noResults.style.color = 'var(--pc-text-secondary)';
            noResults.style.padding = '20px';
            noResults.style.fontSize = '12px';
            this.contentArea.appendChild(noResults);
            return;
        }

        this.filteredItems.forEach(item => {
            const itemEl = this.createLibraryItem(item);
            this.contentArea.appendChild(itemEl);
        });
    }

    private createLibraryItem(item: LibraryItem): HTMLElement {
        const itemEl = document.createElement('div');
        itemEl.className = 'library-item';
        itemEl.addEventListener('click', () => this.selectTemplate(item));

        // Thumbnail and title
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.gap = '8px';
        header.style.marginBottom = '4px';

        const thumbnail = document.createElement('span');
        thumbnail.textContent = item.thumbnail;
        thumbnail.style.fontSize = '16px';

        const title = document.createElement('div');
        title.className = 'library-item-title';
        title.textContent = item.name;

        const rating = document.createElement('div');
        rating.style.marginLeft = 'auto';
        rating.style.fontSize = '10px';
        rating.style.color = 'var(--pc-accent)';
        rating.textContent = '★'.repeat(Math.floor(item.metadata.rating)) + 
                           (item.metadata.rating % 1 >= 0.5 ? '☆' : '');

        header.appendChild(thumbnail);
        header.appendChild(title);
        header.appendChild(rating);

        // Description
        const description = document.createElement('div');
        description.className = 'library-item-description';
        description.textContent = item.description;

        // Tags
        const tags = document.createElement('div');
        tags.style.display = 'flex';
        tags.style.gap = '4px';
        tags.style.marginTop = '6px';
        tags.style.flexWrap = 'wrap';

        item.tags.slice(0, 3).forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.textContent = tag;
            tagEl.style.fontSize = '9px';
            tagEl.style.background = 'var(--pc-border)';
            tagEl.style.color = 'var(--pc-text-secondary)';
            tagEl.style.padding = '2px 6px';
            tagEl.style.borderRadius = '8px';
            tags.appendChild(tagEl);
        });

        // Stats
        const stats = document.createElement('div');
        stats.style.display = 'flex';
        stats.style.justifyContent = 'space-between';
        stats.style.marginTop = '6px';
        stats.style.fontSize = '9px';
        stats.style.color = 'var(--pc-text-secondary)';

        const downloads = document.createElement('span');
        downloads.textContent = `${item.metadata.downloads} downloads`;

        const author = document.createElement('span');
        author.textContent = item.metadata.author;

        stats.appendChild(downloads);
        stats.appendChild(author);

        itemEl.appendChild(header);
        itemEl.appendChild(description);
        itemEl.appendChild(tags);
        itemEl.appendChild(stats);

        return itemEl;
    }

    private filterItems(): void {
        const searchTerm = this.searchInput.value.toLowerCase();
        const categoryFilter = (this.panel.querySelector('select') as HTMLSelectElement)?.value || 'all';

        this.filteredItems = this.libraryItems.filter(item => {
            const matchesSearch = !searchTerm || 
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });

        this.renderItems();
    }

    private selectTemplate(item: LibraryItem): void {
        // Show confirmation dialog
        const content = document.createElement('div');
        content.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-size: 32px; margin-bottom: 10px;">${item.thumbnail}</div>
                <h4 style="margin: 0 0 5px 0; color: var(--pc-text);">${item.name}</h4>
                <p style="margin: 0; color: var(--pc-text-secondary); font-size: 13px;">${item.description}</p>
            </div>
            <div style="background: var(--pc-background); padding: 10px; border-radius: 4px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: var(--pc-text-secondary); margin-bottom: 5px;">Template includes:</div>
                <div style="font-size: 11px; color: var(--pc-text);">
                    • ${item.template.nodes.length} nodes<br>
                    • ${item.template.edges.length} connections<br>
                    • Pre-configured layout
                </div>
            </div>
            <div style="font-size: 11px; color: var(--pc-text-secondary); text-align: center;">
                This will replace your current canvas. Continue?
            </div>
        `;

        this.uiManager.showModal(
            'Apply Template',
            content,
            [
                {
                    text: 'Cancel',
                    onClick: () => {}
                },
                {
                    text: 'Apply Template',
                    onClick: () => this.applyTemplate(item),
                    primary: true
                }
            ]
        );
    }

    private applyTemplate(item: LibraryItem): void {
        // Apply the template to the canvas
        const canvasManager = this.plugin.getCanvasManager();
        canvasManager.setCanvasData(item.template);

        // Update metadata
        item.metadata.downloads++;

        // Show success message
        this.uiManager.showToast(`Template "${item.name}" applied successfully!`, 'success');

        // Hide library panel
        this.hide();

        // Auto-organize if needed
        setTimeout(() => {
            canvasManager.autoOrganize();
        }, 100);
    }

    // Template creation methods
    private createFlowchartTemplate(): CanvasData {
        return {
            nodes: [
                { id: 'start', type: 'text', x: 400, y: 100, width: 120, height: 60, text: 'Start', backgroundColor: '#10b981' },
                { id: 'process1', type: 'text', x: 400, y: 200, width: 120, height: 60, text: 'Process', backgroundColor: '#6366f1' },
                { id: 'decision', type: 'text', x: 400, y: 300, width: 120, height: 60, text: 'Decision?', backgroundColor: '#f59e0b' },
                { id: 'process2', type: 'text', x: 250, y: 400, width: 120, height: 60, text: 'Yes Path', backgroundColor: '#6366f1' },
                { id: 'process3', type: 'text', x: 550, y: 400, width: 120, height: 60, text: 'No Path', backgroundColor: '#6366f1' },
                { id: 'end', type: 'text', x: 400, y: 500, width: 120, height: 60, text: 'End', backgroundColor: '#ef4444' }
            ],
            edges: [
                { id: 'e1', fromNode: 'start', toNode: 'process1', arrow: true },
                { id: 'e2', fromNode: 'process1', toNode: 'decision', arrow: true },
                { id: 'e3', fromNode: 'decision', toNode: 'process2', arrow: true, label: 'Yes' },
                { id: 'e4', fromNode: 'decision', toNode: 'process3', arrow: true, label: 'No' },
                { id: 'e5', fromNode: 'process2', toNode: 'end', arrow: true },
                { id: 'e6', fromNode: 'process3', toNode: 'end', arrow: true }
            ],
            viewport: { x: 0, y: 0, zoom: 1 }
        };
    }

    private createMindMapTemplate(): CanvasData {
        const centerX = 400, centerY = 300;
        const radius = 150;
        const branches = 6;
        
        const nodes = [
            { id: 'center', type: 'text', x: centerX, y: centerY, width: 140, height: 70, text: 'Central Idea', backgroundColor: '#8b5cf6' }
        ];
        
        const edges = [];
        
        for (let i = 0; i < branches; i++) {
            const angle = (i * 2 * Math.PI) / branches;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            const nodeId = `branch${i + 1}`;
            
            nodes.push({
                id: nodeId,
                type: 'text',
                x: Math.round(x),
                y: Math.round(y),
                width: 100,
                height: 50,
                text: `Branch ${i + 1}`,
                backgroundColor: '#6366f1'
            });
            
            edges.push({
                id: `e${i + 1}`,
                fromNode: 'center',
                toNode: nodeId,
                arrow: false
            });
        }
        
        return { nodes, edges, viewport: { x: 0, y: 0, zoom: 1 } };
    }

    private createOrgChartTemplate(): CanvasData {
        return {
            nodes: [
                { id: 'ceo', type: 'text', x: 400, y: 100, width: 120, height: 60, text: 'CEO', backgroundColor: '#8b5cf6' },
                { id: 'cto', type: 'text', x: 250, y: 200, width: 120, height: 60, text: 'CTO', backgroundColor: '#6366f1' },
                { id: 'cfo', type: 'text', x: 550, y: 200, width: 120, height: 60, text: 'CFO', backgroundColor: '#6366f1' },
                { id: 'dev1', type: 'text', x: 150, y: 300, width: 120, height: 60, text: 'Developer 1', backgroundColor: '#10b981' },
                { id: 'dev2', type: 'text', x: 350, y: 300, width: 120, height: 60, text: 'Developer 2', backgroundColor: '#10b981' },
                { id: 'acc1', type: 'text', x: 550, y: 300, width: 120, height: 60, text: 'Accountant', backgroundColor: '#10b981' }
            ],
            edges: [
                { id: 'e1', fromNode: 'ceo', toNode: 'cto', arrow: true },
                { id: 'e2', fromNode: 'ceo', toNode: 'cfo', arrow: true },
                { id: 'e3', fromNode: 'cto', toNode: 'dev1', arrow: true },
                { id: 'e4', fromNode: 'cto', toNode: 'dev2', arrow: true },
                { id: 'e5', fromNode: 'cfo', toNode: 'acc1', arrow: true }
            ],
            viewport: { x: 0, y: 0, zoom: 1 }
        };
    }

    private createNetworkTemplate(): CanvasData {
        return {
            nodes: [
                { id: 'router', type: 'text', x: 400, y: 200, width: 100, height: 60, text: 'Router', backgroundColor: '#f59e0b' },
                { id: 'switch1', type: 'text', x: 250, y: 300, width: 100, height: 60, text: 'Switch 1', backgroundColor: '#6366f1' },
                { id: 'switch2', type: 'text', x: 550, y: 300, width: 100, height: 60, text: 'Switch 2', backgroundColor: '#6366f1' },
                { id: 'pc1', type: 'text', x: 150, y: 400, width: 80, height: 50, text: 'PC 1', backgroundColor: '#10b981' },
                { id: 'pc2', type: 'text', x: 250, y: 400, width: 80, height: 50, text: 'PC 2', backgroundColor: '#10b981' },
                { id: 'pc3', type: 'text', x: 350, y: 400, width: 80, height: 50, text: 'PC 3', backgroundColor: '#10b981' },
                { id: 'server', type: 'text', x: 550, y: 400, width: 100, height: 60, text: 'Server', backgroundColor: '#ef4444' }
            ],
            edges: [
                { id: 'e1', fromNode: 'router', toNode: 'switch1', arrow: false },
                { id: 'e2', fromNode: 'router', toNode: 'switch2', arrow: false },
                { id: 'e3', fromNode: 'switch1', toNode: 'pc1', arrow: false },
                { id: 'e4', fromNode: 'switch1', toNode: 'pc2', arrow: false },
                { id: 'e5', fromNode: 'switch1', toNode: 'pc3', arrow: false },
                { id: 'e6', fromNode: 'switch2', toNode: 'server', arrow: false }
            ],
            viewport: { x: 0, y: 0, zoom: 1 }
        };
    }

    private createTimelineTemplate(): CanvasData {
        const events = [
            { year: '2020', event: 'Project Start' },
            { year: '2021', event: 'Alpha Release' },
            { year: '2022', event: 'Beta Testing' },
            { year: '2023', event: 'Public Launch' },
            { year: '2024', event: 'Version 2.0' }
        ];
        
        const nodes = [];
        const edges = [];
        
        events.forEach((event, index) => {
            const x = 150 + index * 150;
            const y = 300;
            
            nodes.push({
                id: `event${index}`,
                type: 'text',
                x,
                y,
                width: 120,
                height: 80,
                text: `${event.year}\n${event.event}`,
                backgroundColor: '#6366f1'
            });
            
            if (index > 0) {
                edges.push({
                    id: `timeline${index}`,
                    fromNode: `event${index - 1}`,
                    toNode: `event${index}`,
                    arrow: true
                });
            }
        });
        
        return { nodes, edges, viewport: { x: 0, y: 0, zoom: 1 } };
    }

    private createKanbanTemplate(): CanvasData {
        const columns = ['To Do', 'In Progress', 'Review', 'Done'];
        const nodes = [];
        const edges = [];
        
        // Create column headers
        columns.forEach((column, index) => {
            const x = 150 + index * 200;
            nodes.push({
                id: `col${index}`,
                type: 'text',
                x,
                y: 100,
                width: 150,
                height: 50,
                text: column,
                backgroundColor: '#8b5cf6'
            });
            
            // Add sample tasks
            for (let task = 0; task < 2; task++) {
                const taskId = `task${index}_${task}`;
                nodes.push({
                    id: taskId,
                    type: 'text',
                    x,
                    y: 200 + task * 80,
                    width: 150,
                    height: 60,
                    text: `Task ${task + 1}`,
                    backgroundColor: '#6366f1'
                });
            }
        });
        
        return { nodes, edges, viewport: { x: 0, y: 0, zoom: 1 } };
    }

    // Public methods
    show(): void {
        this.panel.style.display = 'flex';
        this.isVisible = true;
        
        // Focus search input
        setTimeout(() => {
            this.searchInput.focus();
        }, 100);
    }

    hide(): void {
        this.panel.style.display = 'none';
        this.isVisible = false;
    }

    toggle(): void {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    addCustomTemplate(template: LibraryItem): void {
        this.libraryItems.push(template);
        this.filterItems();
    }

    removeTemplate(templateId: string): void {
        this.libraryItems = this.libraryItems.filter(item => item.id !== templateId);
        this.filterItems();
    }

    getTemplates(): LibraryItem[] {
        return [...this.libraryItems];
    }

    cleanup(): void {
        if (this.panel && this.panel.parentNode) {
            this.panel.parentNode.removeChild(this.panel);
        }
    }
}
