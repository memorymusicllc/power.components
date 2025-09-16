
import { App, TFile, Notice } from 'obsidian';
import { CanvasData, CanvasNode, CanvasEdge, ExportOptions, ImportOptions } from '../types/PowerCanvas';

export class FileOperations {
    private app: App;

    constructor(app: App) {
        this.app = app;
    }

    // Export Operations
    async exportCanvas(canvasData: CanvasData, options: ExportOptions): Promise<void> {
        try {
            switch (options.format) {
                case 'json':
                    await this.exportAsJSON(canvasData, options);
                    break;
                case 'png':
                    await this.exportAsPNG(canvasData, options);
                    break;
                case 'svg':
                    await this.exportAsSVG(canvasData, options);
                    break;
                case 'obj':
                    await this.exportAsOBJ(canvasData, options);
                    break;
                case 'mermaid':
                    await this.exportAsMermaid(canvasData, options);
                    break;
                case 'xml':
                    await this.exportAsXML(canvasData, options);
                    break;
                default:
                    throw new Error(`Unsupported export format: ${options.format}`);
            }
            
            new Notice(`Canvas exported as ${options.format.toUpperCase()}`);
        } catch (error) {
            console.error('Export failed:', error);
            new Notice(`Export failed: ${error.message}`);
        }
    }

    private async exportAsJSON(canvasData: CanvasData, options: ExportOptions): Promise<void> {
        const data = options.includeMetadata ? canvasData : {
            nodes: canvasData.nodes,
            edges: canvasData.edges,
            viewport: canvasData.viewport
        };

        const jsonString = JSON.stringify(data, null, 2);
        const fileName = `canvas-export-${Date.now()}.json`;
        
        await this.saveFile(fileName, jsonString);
    }

    private async exportAsPNG(canvasData: CanvasData, options: ExportOptions): Promise<void> {
        // This would integrate with the RenderEngine to capture the canvas
        const canvas = document.createElement('canvas');
        canvas.width = options.width || 1920;
        canvas.height = options.height || 1080;
        
        const ctx = canvas.getContext('2d')!;
        
        // Set background
        if (options.background && !options.transparent) {
            ctx.fillStyle = options.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Render nodes and edges
        await this.renderCanvasToContext(ctx, canvasData, canvas.width, canvas.height);

        // Convert to blob and save
        canvas.toBlob(async (blob) => {
            if (blob) {
                const fileName = `canvas-export-${Date.now()}.png`;
                await this.saveBlobAsFile(fileName, blob);
            }
        }, 'image/png', options.quality || 0.9);
    }

    private async exportAsSVG(canvasData: CanvasData, options: ExportOptions): Promise<void> {
        const width = options.width || 1920;
        const height = options.height || 1080;
        
        let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
        
        if (options.background && !options.transparent) {
            svg += `<rect width="100%" height="100%" fill="${options.background}"/>`;
        }

        // Add definitions for gradients, patterns, etc.
        svg += '<defs>';
        svg += '<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">';
        svg += '<polygon points="0 0, 10 3.5, 0 7" fill="#666"/>';
        svg += '</marker>';
        svg += '</defs>';

        // Render edges first (so they appear behind nodes)
        canvasData.edges.forEach(edge => {
            const fromNode = canvasData.nodes.find(n => n.id === edge.fromNode);
            const toNode = canvasData.nodes.find(n => n.id === edge.toNode);
            
            if (fromNode && toNode) {
                const color = edge.color || '#666';
                const strokeWidth = edge.width || 2;
                const markerEnd = edge.arrow ? 'url(#arrowhead)' : '';
                
                svg += `<line x1="${fromNode.x}" y1="${fromNode.y}" x2="${toNode.x}" y2="${toNode.y}" `;
                svg += `stroke="${color}" stroke-width="${strokeWidth}" marker-end="${markerEnd}"/>`;
                
                if (edge.label) {
                    const midX = (fromNode.x + toNode.x) / 2;
                    const midY = (fromNode.y + toNode.y) / 2;
                    svg += `<text x="${midX}" y="${midY}" text-anchor="middle" fill="${color}" font-size="12">${edge.label}</text>`;
                }
            }
        });

        // Render nodes
        canvasData.nodes.forEach(node => {
            const x = node.x - node.width / 2;
            const y = node.y - node.height / 2;
            const fill = node.backgroundColor || '#8b5cf6';
            const stroke = node.borderColor || '#6366f1';
            const opacity = node.opacity || 1;

            svg += `<rect x="${x}" y="${y}" width="${node.width}" height="${node.height}" `;
            svg += `fill="${fill}" stroke="${stroke}" opacity="${opacity}" rx="4"/>`;

            if (node.text) {
                const textX = node.x;
                const textY = node.y + 5; // Slight offset for better centering
                const fontSize = node.fontSize || 14;
                const textColor = node.color || '#ffffff';
                
                svg += `<text x="${textX}" y="${textY}" text-anchor="middle" fill="${textColor}" `;
                svg += `font-size="${fontSize}" font-family="${node.fontFamily || 'Arial'}">${node.text}</text>`;
            }
        });

        svg += '</svg>';

        const fileName = `canvas-export-${Date.now()}.svg`;
        await this.saveFile(fileName, svg);
    }

    private async exportAsOBJ(canvasData: CanvasData, options: ExportOptions): Promise<void> {
        let obj = '# Power Canvas 3D Export\n';
        obj += '# Generated by Power Canvas Plugin\n\n';

        let vertexIndex = 1;
        const nodeVertices: Map<string, number[]> = new Map();

        // Generate vertices for each node (as boxes)
        canvasData.nodes.forEach(node => {
            const x = node.x / 100; // Scale down
            const y = -node.y / 100; // Flip Y
            const z = node.z || 0;
            const w = node.width / 200; // Half width
            const h = node.height / 200; // Half height
            const d = (node.depth || 10) / 200; // Half depth

            // 8 vertices for a box
            const vertices = [
                [x - w, y - h, z - d], // 0
                [x + w, y - h, z - d], // 1
                [x + w, y + h, z - d], // 2
                [x - w, y + h, z - d], // 3
                [x - w, y - h, z + d], // 4
                [x + w, y - h, z + d], // 5
                [x + w, y + h, z + d], // 6
                [x - w, y + h, z + d]  // 7
            ];

            const startIndex = vertexIndex;
            vertices.forEach(vertex => {
                obj += `v ${vertex[0]} ${vertex[1]} ${vertex[2]}\n`;
                vertexIndex++;
            });

            nodeVertices.set(node.id, [startIndex, startIndex + 7]);
        });

        obj += '\n';

        // Generate faces for each node
        canvasData.nodes.forEach(node => {
            const [start] = nodeVertices.get(node.id)!;
            
            obj += `g node_${node.id}\n`;
            
            // Define faces (quads)
            const faces = [
                [0, 1, 2, 3], // front
                [4, 7, 6, 5], // back
                [0, 4, 5, 1], // bottom
                [2, 6, 7, 3], // top
                [0, 3, 7, 4], // left
                [1, 5, 6, 2]  // right
            ];

            faces.forEach(face => {
                obj += `f ${face.map(i => start + i).join(' ')}\n`;
            });
        });

        const fileName = `canvas-export-${Date.now()}.obj`;
        await this.saveFile(fileName, obj);
    }

    private async exportAsMermaid(canvasData: CanvasData, options: ExportOptions): Promise<void> {
        let mermaid = 'graph TD\n';

        // Add nodes
        canvasData.nodes.forEach(node => {
            const nodeId = node.id.replace(/[^a-zA-Z0-9]/g, '_');
            const text = node.text || node.id;
            
            switch (node.type) {
                case 'text':
                    mermaid += `    ${nodeId}[${text}]\n`;
                    break;
                case 'file':
                    mermaid += `    ${nodeId}{{${text}}}\n`;
                    break;
                case 'link':
                    mermaid += `    ${nodeId}(${text})\n`;
                    break;
                default:
                    mermaid += `    ${nodeId}[${text}]\n`;
            }

            // Add styling if specified
            if (node.color || node.backgroundColor) {
                const fillColor = node.backgroundColor || '#8b5cf6';
                const textColor = node.color || '#ffffff';
                mermaid += `    style ${nodeId} fill:${fillColor},color:${textColor}\n`;
            }
        });

        // Add edges
        canvasData.edges.forEach(edge => {
            const fromId = edge.fromNode.replace(/[^a-zA-Z0-9]/g, '_');
            const toId = edge.toNode.replace(/[^a-zA-Z0-9]/g, '_');
            const label = edge.label ? `|${edge.label}|` : '';
            
            if (edge.arrow) {
                mermaid += `    ${fromId} -->${label} ${toId}\n`;
            } else {
                mermaid += `    ${fromId} ---${label} ${toId}\n`;
            }
        });

        const fileName = `canvas-export-${Date.now()}.mmd`;
        await this.saveFile(fileName, mermaid);
    }

    private async exportAsXML(canvasData: CanvasData, options: ExportOptions): Promise<void> {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<canvas>\n';

        if (canvasData.viewport) {
            xml += '  <viewport>\n';
            xml += `    <x>${canvasData.viewport.x}</x>\n`;
            xml += `    <y>${canvasData.viewport.y}</y>\n`;
            xml += `    <zoom>${canvasData.viewport.zoom}</zoom>\n`;
            xml += '  </viewport>\n';
        }

        xml += '  <nodes>\n';
        canvasData.nodes.forEach(node => {
            xml += `    <node id="${node.id}" type="${node.type}">\n`;
            xml += `      <position x="${node.x}" y="${node.y}"${node.z ? ` z="${node.z}"` : ''}/>\n`;
            xml += `      <size width="${node.width}" height="${node.height}"${node.depth ? ` depth="${node.depth}"` : ''}/>\n`;
            
            if (node.text) xml += `      <text>${this.escapeXML(node.text)}</text>\n`;
            if (node.file) xml += `      <file>${this.escapeXML(node.file)}</file>\n`;
            if (node.url) xml += `      <url>${this.escapeXML(node.url)}</url>\n`;
            if (node.color) xml += `      <color>${node.color}</color>\n`;
            if (node.backgroundColor) xml += `      <backgroundColor>${node.backgroundColor}</backgroundColor>\n`;
            
            xml += '    </node>\n';
        });
        xml += '  </nodes>\n';

        xml += '  <edges>\n';
        canvasData.edges.forEach(edge => {
            xml += `    <edge id="${edge.id}">\n`;
            xml += `      <from>${edge.fromNode}</from>\n`;
            xml += `      <to>${edge.toNode}</to>\n`;
            if (edge.label) xml += `      <label>${this.escapeXML(edge.label)}</label>\n`;
            if (edge.color) xml += `      <color>${edge.color}</color>\n`;
            if (edge.width) xml += `      <width>${edge.width}</width>\n`;
            xml += '    </edge>\n';
        });
        xml += '  </edges>\n';

        xml += '</canvas>\n';

        const fileName = `canvas-export-${Date.now()}.xml`;
        await this.saveFile(fileName, xml);
    }

    // Import Operations
    async importCanvas(file: TFile, options: ImportOptions): Promise<CanvasData | null> {
        try {
            const content = await this.app.vault.read(file);
            
            switch (options.format) {
                case 'json':
                    return this.importFromJSON(content, options);
                case 'mermaid':
                    return this.importFromMermaid(content, options);
                case 'xml':
                    return this.importFromXML(content, options);
                case 'canvas':
                    return this.importFromCanvas(content, options);
                default:
                    throw new Error(`Unsupported import format: ${options.format}`);
            }
        } catch (error) {
            console.error('Import failed:', error);
            new Notice(`Import failed: ${error.message}`);
            return null;
        }
    }

    private importFromJSON(content: string, options: ImportOptions): CanvasData {
        const data = JSON.parse(content);
        
        if (options.validateSchema) {
            this.validateCanvasSchema(data);
        }

        if (options.autoOrganize) {
            // Apply auto-organization logic
            this.autoOrganizeImportedData(data);
        }

        return data;
    }

    private importFromMermaid(content: string, options: ImportOptions): CanvasData {
        const canvasData: CanvasData = {
            nodes: [],
            edges: [],
            viewport: { x: 0, y: 0, zoom: 1 }
        };

        // Parse Mermaid syntax (simplified parser)
        const lines = content.split('\n').map(line => line.trim()).filter(line => line);
        
        lines.forEach(line => {
            // Parse node definitions
            const nodeMatch = line.match(/(\w+)\[(.*?)\]/);
            if (nodeMatch) {
                const [, id, text] = nodeMatch;
                canvasData.nodes.push({
                    id,
                    type: 'text',
                    x: Math.random() * 800,
                    y: Math.random() * 600,
                    width: 120,
                    height: 60,
                    text
                });
            }

            // Parse edge definitions
            const edgeMatch = line.match(/(\w+)\s*--[->]*\s*(\w+)/);
            if (edgeMatch) {
                const [, fromNode, toNode] = edgeMatch;
                canvasData.edges.push({
                    id: `${fromNode}_${toNode}`,
                    fromNode,
                    toNode,
                    arrow: line.includes('-->')
                });
            }
        });

        if (options.autoOrganize) {
            this.autoOrganizeImportedData(canvasData);
        }

        return canvasData;
    }

    private importFromXML(content: string, options: ImportOptions): CanvasData {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/xml');
        
        const canvasData: CanvasData = {
            nodes: [],
            edges: [],
            viewport: { x: 0, y: 0, zoom: 1 }
        };

        // Parse viewport
        const viewportEl = doc.querySelector('viewport');
        if (viewportEl) {
            canvasData.viewport = {
                x: parseFloat(viewportEl.querySelector('x')?.textContent || '0'),
                y: parseFloat(viewportEl.querySelector('y')?.textContent || '0'),
                zoom: parseFloat(viewportEl.querySelector('zoom')?.textContent || '1')
            };
        }

        // Parse nodes
        const nodeElements = doc.querySelectorAll('node');
        nodeElements.forEach(nodeEl => {
            const id = nodeEl.getAttribute('id')!;
            const type = nodeEl.getAttribute('type') as any || 'text';
            
            const positionEl = nodeEl.querySelector('position');
            const sizeEl = nodeEl.querySelector('size');
            
            const node: CanvasNode = {
                id,
                type,
                x: parseFloat(positionEl?.getAttribute('x') || '0'),
                y: parseFloat(positionEl?.getAttribute('y') || '0'),
                width: parseFloat(sizeEl?.getAttribute('width') || '120'),
                height: parseFloat(sizeEl?.getAttribute('height') || '60')
            };

            const textEl = nodeEl.querySelector('text');
            if (textEl) node.text = textEl.textContent || '';

            const colorEl = nodeEl.querySelector('color');
            if (colorEl) node.color = colorEl.textContent || '';

            canvasData.nodes.push(node);
        });

        // Parse edges
        const edgeElements = doc.querySelectorAll('edge');
        edgeElements.forEach(edgeEl => {
            const id = edgeEl.getAttribute('id')!;
            const fromNode = edgeEl.querySelector('from')?.textContent!;
            const toNode = edgeEl.querySelector('to')?.textContent!;
            
            const edge: CanvasEdge = {
                id,
                fromNode,
                toNode
            };

            const labelEl = edgeEl.querySelector('label');
            if (labelEl) edge.label = labelEl.textContent || '';

            const colorEl = edgeEl.querySelector('color');
            if (colorEl) edge.color = colorEl.textContent || '';

            canvasData.edges.push(edge);
        });

        return canvasData;
    }

    private importFromCanvas(content: string, options: ImportOptions): CanvasData {
        // Import from Obsidian's native canvas format
        return JSON.parse(content);
    }

    // Utility Methods
    private async renderCanvasToContext(
        ctx: CanvasRenderingContext2D, 
        canvasData: CanvasData, 
        width: number, 
        height: number
    ): Promise<void> {
        // Simple 2D rendering for export
        ctx.clearRect(0, 0, width, height);

        // Render edges first
        canvasData.edges.forEach(edge => {
            const fromNode = canvasData.nodes.find(n => n.id === edge.fromNode);
            const toNode = canvasData.nodes.find(n => n.id === edge.toNode);
            
            if (fromNode && toNode) {
                ctx.strokeStyle = edge.color || '#666';
                ctx.lineWidth = edge.width || 2;
                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.stroke();
            }
        });

        // Render nodes
        canvasData.nodes.forEach(node => {
            const x = node.x - node.width / 2;
            const y = node.y - node.height / 2;

            // Draw node background
            ctx.fillStyle = node.backgroundColor || '#8b5cf6';
            ctx.fillRect(x, y, node.width, node.height);

            // Draw node border
            if (node.borderColor) {
                ctx.strokeStyle = node.borderColor;
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, node.width, node.height);
            }

            // Draw node text
            if (node.text) {
                ctx.fillStyle = node.color || '#ffffff';
                ctx.font = `${node.fontSize || 14}px ${node.fontFamily || 'Arial'}`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.text, node.x, node.y);
            }
        });
    }

    private validateCanvasSchema(data: any): void {
        if (!data.nodes || !Array.isArray(data.nodes)) {
            throw new Error('Invalid canvas data: missing or invalid nodes array');
        }
        
        if (!data.edges || !Array.isArray(data.edges)) {
            throw new Error('Invalid canvas data: missing or invalid edges array');
        }

        // Validate node structure
        data.nodes.forEach((node: any, index: number) => {
            if (!node.id || typeof node.id !== 'string') {
                throw new Error(`Invalid node at index ${index}: missing or invalid id`);
            }
            if (typeof node.x !== 'number' || typeof node.y !== 'number') {
                throw new Error(`Invalid node at index ${index}: missing or invalid position`);
            }
        });

        // Validate edge structure
        data.edges.forEach((edge: any, index: number) => {
            if (!edge.id || typeof edge.id !== 'string') {
                throw new Error(`Invalid edge at index ${index}: missing or invalid id`);
            }
            if (!edge.fromNode || !edge.toNode) {
                throw new Error(`Invalid edge at index ${index}: missing fromNode or toNode`);
            }
        });
    }

    private autoOrganizeImportedData(data: CanvasData): void {
        // Simple grid layout for imported data
        const cols = Math.ceil(Math.sqrt(data.nodes.length));
        const spacing = 150;

        data.nodes.forEach((node, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            
            node.x = col * spacing + 100;
            node.y = row * spacing + 100;
        });
    }

    private escapeXML(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    private async saveFile(fileName: string, content: string): Promise<void> {
        const file = await this.app.vault.create(fileName, content);
        console.log(`File saved: ${file.path}`);
    }

    private async saveBlobAsFile(fileName: string, blob: Blob): Promise<void> {
        // Convert blob to array buffer
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Save as binary file
        await this.app.vault.createBinary(fileName, uint8Array);
        console.log(`Binary file saved: ${fileName}`);
    }

    // Show export dialog
    showExportDialog(): void {
        // This would show a modal dialog for export options
        // For now, just export as JSON
        const canvasData: CanvasData = {
            nodes: [],
            edges: [],
            viewport: { x: 0, y: 0, zoom: 1 }
        };

        this.exportCanvas(canvasData, {
            format: 'json',
            includeMetadata: true
        });
    }
}
