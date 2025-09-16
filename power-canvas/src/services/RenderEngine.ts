
import * as THREE from 'three';
import { CanvasData, CanvasNode, CanvasEdge, RenderConfig } from '../types/PowerCanvas';

export class RenderEngine {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    private renderer: THREE.WebGLRenderer;
    private canvas: HTMLCanvasElement;
    private animationId: number | null = null;
    private mode: '2d' | '3d' = '2d';
    private nodeObjects: Map<string, THREE.Object3D> = new Map();
    private edgeObjects: Map<string, THREE.Object3D> = new Map();
    private controls: any; // OrbitControls
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;

    // Lighting
    private ambientLight: THREE.AmbientLight;
    private directionalLight: THREE.DirectionalLight;
    private pointLights: THREE.PointLight[] = [];

    // Materials
    private materials: Map<string, THREE.Material> = new Map();
    private geometries: Map<string, THREE.BufferGeometry> = new Map();

    // Performance
    private lastFrameTime = 0;
    private frameCount = 0;
    private fps = 0;

    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    async initialize(canvas?: HTMLCanvasElement): Promise<void> {
        if (canvas) {
            this.canvas = canvas;
        }

        // Initialize scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1f2937);

        // Initialize camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 10);

        // Initialize renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;

        // Initialize lighting
        this.setupLighting();

        // Initialize materials and geometries
        this.initializeMaterials();
        this.initializeGeometries();

        // Setup controls (would need to import OrbitControls)
        // this.setupControls();

        // Start render loop
        this.startRenderLoop();

        console.log('RenderEngine initialized successfully');
    }

    private setupLighting(): void {
        // Ambient light
        this.ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(this.ambientLight);

        // Directional light
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        this.directionalLight.position.set(10, 10, 5);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.width = 2048;
        this.directionalLight.shadow.mapSize.height = 2048;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 50;
        this.scene.add(this.directionalLight);

        // Add helper for directional light (optional)
        // const helper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
        // this.scene.add(helper);
    }

    private initializeMaterials(): void {
        // Node materials
        this.materials.set('node-default', new THREE.MeshLambertMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.9
        }));

        this.materials.set('node-selected', new THREE.MeshLambertMaterial({
            color: 0xf59e0b,
            transparent: true,
            opacity: 0.9
        }));

        this.materials.set('node-text', new THREE.MeshLambertMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.8
        }));

        this.materials.set('node-file', new THREE.MeshLambertMaterial({
            color: 0x10b981,
            transparent: true,
            opacity: 0.8
        }));

        // Edge materials
        this.materials.set('edge-default', new THREE.LineBasicMaterial({
            color: 0x4b5563,
            linewidth: 2
        }));

        this.materials.set('edge-selected', new THREE.LineBasicMaterial({
            color: 0xf59e0b,
            linewidth: 3
        }));
    }

    private initializeGeometries(): void {
        // Node geometries
        this.geometries.set('box', new THREE.BoxGeometry(1, 1, 0.1));
        this.geometries.set('sphere', new THREE.SphereGeometry(0.5, 16, 16));
        this.geometries.set('cylinder', new THREE.CylinderGeometry(0.5, 0.5, 0.1, 16));
        this.geometries.set('plane', new THREE.PlaneGeometry(1, 1));

        // Edge geometries will be created dynamically
    }

    private startRenderLoop(): void {
        const animate = (time: number) => {
            this.animationId = requestAnimationFrame(animate);

            // Calculate FPS
            this.frameCount++;
            if (time - this.lastFrameTime >= 1000) {
                this.fps = this.frameCount;
                this.frameCount = 0;
                this.lastFrameTime = time;
            }

            // Update controls
            if (this.controls) {
                this.controls.update();
            }

            // Update animations
            this.updateAnimations(time);

            // Render scene
            this.renderer.render(this.scene, this.camera);
        };

        animate(0);
    }

    private updateAnimations(time: number): void {
        // Update node animations
        this.nodeObjects.forEach((object, nodeId) => {
            // Example: floating animation
            if (object.userData.animation?.type === 'float') {
                const amplitude = 0.2;
                const frequency = 0.001;
                object.position.y += Math.sin(time * frequency) * amplitude * 0.01;
            }

            // Example: rotation animation
            if (object.userData.animation?.type === 'rotate') {
                object.rotation.z += 0.01;
            }
        });
    }

    renderCanvas(canvasData: CanvasData): void {
        // Clear existing objects
        this.clearScene();

        // Render nodes
        canvasData.nodes.forEach(node => {
            this.renderNode(node);
        });

        // Render edges
        canvasData.edges.forEach(edge => {
            this.renderEdge(edge, canvasData.nodes);
        });

        // Update camera position based on viewport
        if (canvasData.viewport) {
            this.updateViewport(canvasData.viewport);
        }
    }

    private renderNode(node: CanvasNode): void {
        let geometry: THREE.BufferGeometry;
        let material: THREE.Material;

        // Select geometry based on node type
        switch (node.type) {
            case 'text':
                geometry = this.geometries.get('plane')!.clone();
                material = this.materials.get('node-text')!.clone();
                break;
            case 'file':
                geometry = this.geometries.get('box')!.clone();
                material = this.materials.get('node-file')!.clone();
                break;
            default:
                geometry = this.geometries.get('box')!.clone();
                material = this.materials.get('node-default')!.clone();
        }

        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);

        // Set position
        mesh.position.set(
            node.x / 100, // Scale down for 3D view
            -node.y / 100, // Flip Y axis
            node.z || 0
        );

        // Set scale based on node dimensions
        mesh.scale.set(
            node.width / 100,
            node.height / 100,
            node.depth || 0.1
        );

        // Set rotation if specified
        if (node.rotation) {
            mesh.rotation.set(
                node.rotation.x || 0,
                node.rotation.y || 0,
                node.rotation.z || 0
            );
        }

        // Set color if specified
        if (node.color && material instanceof THREE.MeshLambertMaterial) {
            material.color.setHex(parseInt(node.color.replace('#', '0x')));
        }

        // Set opacity
        if (node.opacity !== undefined && material instanceof THREE.MeshLambertMaterial) {
            material.opacity = node.opacity;
        }

        // Store animation data
        if (node.animation) {
            mesh.userData.animation = node.animation;
        }

        // Store node reference
        mesh.userData.nodeId = node.id;
        mesh.userData.nodeType = 'canvas-node';

        // Enable shadows
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Add to scene and store reference
        this.scene.add(mesh);
        this.nodeObjects.set(node.id, mesh);
    }

    private renderEdge(edge: CanvasEdge, nodes: CanvasNode[]): void {
        const fromNode = nodes.find(n => n.id === edge.fromNode);
        const toNode = nodes.find(n => n.id === edge.toNode);

        if (!fromNode || !toNode) return;

        // Create line geometry
        const points = [
            new THREE.Vector3(fromNode.x / 100, -fromNode.y / 100, fromNode.z || 0),
            new THREE.Vector3(toNode.x / 100, -toNode.y / 100, toNode.z || 0)
        ];

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = this.materials.get('edge-default')!.clone() as THREE.LineBasicMaterial;

        // Set edge color if specified
        if (edge.color) {
            material.color.setHex(parseInt(edge.color.replace('#', '0x')));
        }

        // Create line
        const line = new THREE.Line(geometry, material);
        line.userData.edgeId = edge.id;
        line.userData.nodeType = 'canvas-edge';

        // Add to scene and store reference
        this.scene.add(line);
        this.edgeObjects.set(edge.id, line);

        // Add arrow if specified
        if (edge.arrow) {
            this.addArrowToEdge(line, fromNode, toNode);
        }
    }

    private addArrowToEdge(line: THREE.Line, fromNode: CanvasNode, toNode: CanvasNode): void {
        // Create arrow geometry
        const arrowGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
        const arrowMaterial = this.materials.get('edge-default')!.clone();
        const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);

        // Position arrow at the end of the line
        const direction = new THREE.Vector3(
            toNode.x - fromNode.x,
            -(toNode.y - fromNode.y),
            (toNode.z || 0) - (fromNode.z || 0)
        ).normalize();

        arrow.position.set(
            toNode.x / 100,
            -toNode.y / 100,
            toNode.z || 0
        );

        // Orient arrow towards the direction
        arrow.lookAt(
            arrow.position.x + direction.x,
            arrow.position.y + direction.y,
            arrow.position.z + direction.z
        );

        this.scene.add(arrow);
    }

    private clearScene(): void {
        // Remove all node and edge objects
        this.nodeObjects.forEach(object => {
            this.scene.remove(object);
            if (object instanceof THREE.Mesh) {
                object.geometry.dispose();
                if (Array.isArray(object.material)) {
                    object.material.forEach(mat => mat.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });

        this.edgeObjects.forEach(object => {
            this.scene.remove(object);
            if (object instanceof THREE.Line) {
                object.geometry.dispose();
                if (Array.isArray(object.material)) {
                    object.material.forEach(mat => mat.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });

        this.nodeObjects.clear();
        this.edgeObjects.clear();
    }

    private updateViewport(viewport: any): void {
        if (this.mode === '2d') {
            // For 2D mode, adjust camera position
            this.camera.position.set(
                viewport.x / 100,
                -viewport.y / 100,
                10 / viewport.zoom
            );
        } else {
            // For 3D mode, use orbit controls or similar
            // This would be handled by the controls system
        }
    }

    toggle3DMode(): void {
        this.mode = this.mode === '2d' ? '3d' : '2d';

        if (this.mode === '3d') {
            // Switch to perspective camera if not already
            if (!(this.camera instanceof THREE.PerspectiveCamera)) {
                this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            }
            this.camera.position.set(5, 5, 10);
            this.camera.lookAt(0, 0, 0);
        } else {
            // Switch to orthographic for 2D-like view
            this.camera.position.set(0, 0, 10);
            this.camera.lookAt(0, 0, 0);
        }

        console.log(`Switched to ${this.mode.toUpperCase()} mode`);
    }

    // Mouse interaction
    onMouseMove(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Update raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Check intersections
        const allObjects = [...this.nodeObjects.values(), ...this.edgeObjects.values()];
        const intersects = this.raycaster.intersectObjects(allObjects);

        // Handle hover effects
        this.handleHover(intersects);
    }

    private handleHover(intersects: THREE.Intersection[]): void {
        // Reset all materials to default
        this.nodeObjects.forEach(object => {
            if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshLambertMaterial) {
                object.material.emissive.setHex(0x000000);
            }
        });

        // Highlight hovered object
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshLambertMaterial) {
                object.material.emissive.setHex(0x333333);
            }
        }
    }

    // Selection
    selectNode(nodeId: string): void {
        const object = this.nodeObjects.get(nodeId);
        if (object instanceof THREE.Mesh) {
            const selectedMaterial = this.materials.get('node-selected')!.clone();
            object.material = selectedMaterial;
        }
    }

    deselectNode(nodeId: string): void {
        const object = this.nodeObjects.get(nodeId);
        if (object instanceof THREE.Mesh) {
            const defaultMaterial = this.materials.get('node-default')!.clone();
            object.material = defaultMaterial;
        }
    }

    // Export
    exportAsImage(width: number = 1920, height: number = 1080): string {
        const originalSize = this.renderer.getSize(new THREE.Vector2());
        
        // Temporarily resize renderer
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        // Render
        this.renderer.render(this.scene, this.camera);
        
        // Get image data
        const dataURL = this.renderer.domElement.toDataURL('image/png');
        
        // Restore original size
        this.renderer.setSize(originalSize.x, originalSize.y);
        this.camera.aspect = originalSize.x / originalSize.y;
        this.camera.updateProjectionMatrix();
        
        return dataURL;
    }

    // Cleanup
    dispose(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        this.clearScene();

        // Dispose materials
        this.materials.forEach(material => material.dispose());
        this.materials.clear();

        // Dispose geometries
        this.geometries.forEach(geometry => geometry.dispose());
        this.geometries.clear();

        // Dispose renderer
        this.renderer.dispose();

        console.log('RenderEngine disposed');
    }

    // Getters
    getMode(): '2d' | '3d' {
        return this.mode;
    }

    getFPS(): number {
        return this.fps;
    }

    getRenderer(): THREE.WebGLRenderer {
        return this.renderer;
    }

    getScene(): THREE.Scene {
        return this.scene;
    }

    getCamera(): THREE.Camera {
        return this.camera;
    }
}
