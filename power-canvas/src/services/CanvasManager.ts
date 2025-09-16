
import { App, TFile } from 'obsidian';
import { CanvasData, CanvasNode, CanvasEdge } from '../types/PowerCanvas';

export class CanvasManager {
    private app: App;
    private canvasData: CanvasData;
    private undoStack: CanvasData[] = [];
    private redoStack: CanvasData[] = [];
    private maxUndoLevels = 50;

    constructor(app: App) {
        this.app = app;
        this.canvasData = {
            nodes: [],
            edges: [],
            viewport: { x: 0, y: 0, zoom: 1 }
        };
    }

    // Canvas Data Management
    getCanvasData(): CanvasData {
        return this.canvasData;
    }

    setCanvasData(data: CanvasData) {
        this.saveState();
        this.canvasData = data;
    }

    // Node Operations
    addNode(node: CanvasNode): void {
        this.saveState();
        this.canvasData.nodes.push(node);
    }

    removeNode(nodeId: string): void {
        this.saveState();
        this.canvasData.nodes = this.canvasData.nodes.filter(n => n.id !== nodeId);
        // Remove connected edges
        this.canvasData.edges = this.canvasData.edges.filter(
            e => e.fromNode !== nodeId && e.toNode !== nodeId
        );
    }

    updateNode(nodeId: string, updates: Partial<CanvasNode>): void {
        this.saveState();
        const node = this.canvasData.nodes.find(n => n.id === nodeId);
        if (node) {
            Object.assign(node, updates);
        }
    }

    getNode(nodeId: string): CanvasNode | undefined {
        return this.canvasData.nodes.find(n => n.id === nodeId);
    }

    // Edge Operations
    addEdge(edge: CanvasEdge): void {
        this.saveState();
        this.canvasData.edges.push(edge);
    }

    removeEdge(edgeId: string): void {
        this.saveState();
        this.canvasData.edges = this.canvasData.edges.filter(e => e.id !== edgeId);
    }

    updateEdge(edgeId: string, updates: Partial<CanvasEdge>): void {
        this.saveState();
        const edge = this.canvasData.edges.find(e => e.id === edgeId);
        if (edge) {
            Object.assign(edge, updates);
        }
    }

    getEdge(edgeId: string): CanvasEdge | undefined {
        return this.canvasData.edges.find(e => e.id === edgeId);
    }

    // Auto-organize Algorithm
    autoOrganize(): void {
        this.saveState();
        
        const nodes = this.canvasData.nodes;
        const edges = this.canvasData.edges;
        
        if (nodes.length === 0) return;

        // Force-directed layout algorithm
        const iterations = 100;
        const k = Math.sqrt((800 * 600) / nodes.length); // Optimal distance
        const c = 0.01; // Cooling factor
        
        // Initialize positions if not set
        nodes.forEach((node, index) => {
            if (node.x === undefined || node.y === undefined) {
                node.x = Math.random() * 800;
                node.y = Math.random() * 600;
            }
        });

        for (let iter = 0; iter < iterations; iter++) {
            // Calculate repulsive forces
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].fx = 0;
                nodes[i].fy = 0;
                
                for (let j = 0; j < nodes.length; j++) {
                    if (i !== j) {
                        const dx = nodes[i].x - nodes[j].x;
                        const dy = nodes[i].y - nodes[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                        const force = (k * k) / distance;
                        
                        nodes[i].fx += (dx / distance) * force;
                        nodes[i].fy += (dy / distance) * force;
                    }
                }
            }

            // Calculate attractive forces
            edges.forEach(edge => {
                const fromNode = nodes.find(n => n.id === edge.fromNode);
                const toNode = nodes.find(n => n.id === edge.toNode);
                
                if (fromNode && toNode) {
                    const dx = fromNode.x - toNode.x;
                    const dy = fromNode.y - toNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = (distance * distance) / k;
                    
                    fromNode.fx -= (dx / distance) * force;
                    fromNode.fy -= (dy / distance) * force;
                    toNode.fx += (dx / distance) * force;
                    toNode.fy += (dy / distance) * force;
                }
            });

            // Apply forces with cooling
            const temp = c * (iterations - iter) / iterations;
            nodes.forEach(node => {
                const force = Math.sqrt(node.fx * node.fx + node.fy * node.fy) || 1;
                const displacement = Math.min(force, temp);
                
                node.x += (node.fx / force) * displacement;
                node.y += (node.fy / force) * displacement;
                
                // Keep nodes within bounds
                node.x = Math.max(50, Math.min(750, node.x));
                node.y = Math.max(50, Math.min(550, node.y));
            });
        }

        // Clean up temporary properties
        nodes.forEach(node => {
            delete node.fx;
            delete node.fy;
        });
    }

    // Collision Detection
    checkCollisions(): { node1: CanvasNode; node2: CanvasNode }[] {
        const collisions: { node1: CanvasNode; node2: CanvasNode }[] = [];
        const nodes = this.canvasData.nodes;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const node1 = nodes[i];
                const node2 = nodes[j];
                
                const dx = Math.abs(node1.x - node2.x);
                const dy = Math.abs(node1.y - node2.y);
                const minDistance = (node1.width + node2.width) / 2 + 10; // 10px padding
                
                if (dx < minDistance && dy < minDistance) {
                    collisions.push({ node1, node2 });
                }
            }
        }

        return collisions;
    }

    // Resolve overlapping nodes
    resolveOverlaps(): void {
        this.saveState();
        
        const collisions = this.checkCollisions();
        
        collisions.forEach(({ node1, node2 }) => {
            const dx = node2.x - node1.x;
            const dy = node2.y - node1.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDistance = (node1.width + node2.width) / 2 + 20;
            
            if (distance < minDistance) {
                const overlap = minDistance - distance;
                const moveX = (dx / distance) * (overlap / 2);
                const moveY = (dy / distance) * (overlap / 2);
                
                node1.x -= moveX;
                node1.y -= moveY;
                node2.x += moveX;
                node2.y += moveY;
            }
        });
    }

    // Viewport Operations
    setViewport(x: number, y: number, zoom: number): void {
        if (!this.canvasData.viewport) {
            this.canvasData.viewport = { x: 0, y: 0, zoom: 1 };
        }
        
        this.canvasData.viewport.x = x;
        this.canvasData.viewport.y = y;
        this.canvasData.viewport.zoom = Math.max(0.1, Math.min(5, zoom));
    }

    getViewport() {
        return this.canvasData.viewport || { x: 0, y: 0, zoom: 1 };
    }

    // Undo/Redo Operations
    private saveState(): void {
        this.undoStack.push(JSON.parse(JSON.stringify(this.canvasData)));
        
        if (this.undoStack.length > this.maxUndoLevels) {
            this.undoStack.shift();
        }
        
        // Clear redo stack when new action is performed
        this.redoStack = [];
    }

    undo(): boolean {
        if (this.undoStack.length > 0) {
            this.redoStack.push(JSON.parse(JSON.stringify(this.canvasData)));
            this.canvasData = this.undoStack.pop()!;
            return true;
        }
        return false;
    }

    redo(): boolean {
        if (this.redoStack.length > 0) {
            this.undoStack.push(JSON.parse(JSON.stringify(this.canvasData)));
            this.canvasData = this.redoStack.pop()!;
            return true;
        }
        return false;
    }

    canUndo(): boolean {
        return this.undoStack.length > 0;
    }

    canRedo(): boolean {
        return this.redoStack.length > 0;
    }

    // Selection Management
    private selectedNodes: Set<string> = new Set();
    private selectedEdges: Set<string> = new Set();

    selectNode(nodeId: string, addToSelection = false): void {
        if (!addToSelection) {
            this.selectedNodes.clear();
            this.selectedEdges.clear();
        }
        this.selectedNodes.add(nodeId);
    }

    selectEdge(edgeId: string, addToSelection = false): void {
        if (!addToSelection) {
            this.selectedNodes.clear();
            this.selectedEdges.clear();
        }
        this.selectedEdges.add(edgeId);
    }

    deselectAll(): void {
        this.selectedNodes.clear();
        this.selectedEdges.clear();
    }

    getSelectedNodes(): CanvasNode[] {
        return this.canvasData.nodes.filter(n => this.selectedNodes.has(n.id));
    }

    getSelectedEdges(): CanvasEdge[] {
        return this.canvasData.edges.filter(e => this.selectedEdges.has(e.id));
    }

    isNodeSelected(nodeId: string): boolean {
        return this.selectedNodes.has(nodeId);
    }

    isEdgeSelected(edgeId: string): boolean {
        return this.selectedEdges.has(edgeId);
    }

    // Utility Methods
    generateNodeId(): string {
        return 'node_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateEdgeId(): string {
        return 'edge_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getBounds(): { minX: number; minY: number; maxX: number; maxY: number } {
        if (this.canvasData.nodes.length === 0) {
            return { minX: 0, minY: 0, maxX: 800, maxY: 600 };
        }

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        this.canvasData.nodes.forEach(node => {
            minX = Math.min(minX, node.x - node.width / 2);
            minY = Math.min(minY, node.y - node.height / 2);
            maxX = Math.max(maxX, node.x + node.width / 2);
            maxY = Math.max(maxY, node.y + node.height / 2);
        });

        return { minX, minY, maxX, maxY };
    }

    centerView(): void {
        const bounds = this.getBounds();
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        
        this.setViewport(-centerX + 400, -centerY + 300, 1);
    }

    fitToView(): void {
        const bounds = this.getBounds();
        const width = bounds.maxX - bounds.minX;
        const height = bounds.maxY - bounds.minY;
        
        const scaleX = 800 / (width + 100); // Add padding
        const scaleY = 600 / (height + 100);
        const scale = Math.min(scaleX, scaleY, 2); // Max zoom of 2x
        
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        
        this.setViewport(-centerX + 400, -centerY + 300, scale);
    }
}
