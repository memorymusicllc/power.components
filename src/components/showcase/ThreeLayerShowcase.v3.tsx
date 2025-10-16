/**
 * Three-Layer Showcase Component v3
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Demonstrates three distinct layers:
 * 1. Observability Layer: Real-time data monitoring and metrics
 * 2. View Layer: 2D interactive objects and visualizations
 * 3. Scene Layer: 3D objects and spatial relationships
 * 
 * @version 3.0.0
 * @date 2025-01-15
 * @schema pow3r.v3.data.json
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Activity, 
  Eye, 
  Layers, 
  BarChart3, 
  Cpu, 
  Zap, 
  Monitor,
  Globe,
  Box,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

// Observability Layer - Real-time data monitoring
interface ObservabilityData {
  timestamp: string;
  metrics: {
    cpu: number;
    memory: number;
    network: number;
    errors: number;
    requests: number;
    responseTime: number;
  };
  health: 'healthy' | 'warning' | 'critical';
  events: Array<{
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    timestamp: string;
  }>;
}

// View Layer - 2D object data
interface ViewObject {
  id: string;
  type: 'node' | 'edge' | 'cluster' | 'flow';
  position: { x: number; y: number };
  size: { width: number; height: number };
  properties: {
    label: string;
    color: string;
    opacity: number;
    connections: string[];
  };
  state: 'active' | 'inactive' | 'selected' | 'hovered';
}

// Scene Layer - 3D object data
interface SceneObject {
  id: string;
  type: 'cube' | 'sphere' | 'cylinder' | 'plane' | 'light';
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  material: {
    color: string;
    opacity: number;
    metalness: number;
    roughness: number;
  };
  animation?: {
    type: 'rotate' | 'pulse' | 'float' | 'orbit';
    speed: number;
    enabled: boolean;
  };
}

// Main Three-Layer Showcase Component
export default function ThreeLayerShowcaseV3() {
  const [activeLayer, setActiveLayer] = useState<'observability' | 'view' | 'scene'>('observability');
  const [isAnimating, setIsAnimating] = useState(true);
  const [observabilityData, setObservabilityData] = useState<ObservabilityData | null>(null);
  const [viewObjects, setViewObjects] = useState<ViewObject[]>([]);
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Initialize data
  useEffect(() => {
    initializeData();
    startRealTimeUpdates();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Initialize all three layers with sample data
  const initializeData = useCallback(() => {
    // Observability Layer Data
    setObservabilityData({
      timestamp: new Date().toISOString(),
      metrics: {
        cpu: 45,
        memory: 67,
        network: 23,
        errors: 2,
        requests: 1247,
        responseTime: 89
      },
      health: 'healthy',
      events: [
        { id: '1', type: 'success', message: 'Component initialized successfully', timestamp: new Date().toISOString() },
        { id: '2', type: 'info', message: 'Real-time monitoring started', timestamp: new Date().toISOString() },
        { id: '3', type: 'warning', message: 'Memory usage above 60%', timestamp: new Date().toISOString() }
      ]
    });

    // View Layer Data - 2D Objects
    setViewObjects([
      {
        id: 'node-1',
        type: 'node',
        position: { x: 100, y: 100 },
        size: { width: 80, height: 80 },
        properties: {
          label: 'API Gateway',
          color: '#3B82F6',
          opacity: 0.9,
          connections: ['node-2', 'node-3']
        },
        state: 'active'
      },
      {
        id: 'node-2',
        type: 'node',
        position: { x: 300, y: 150 },
        size: { width: 80, height: 80 },
        properties: {
          label: 'Database',
          color: '#10B981',
          opacity: 0.9,
          connections: ['node-1', 'node-4']
        },
        state: 'active'
      },
      {
        id: 'node-3',
        type: 'node',
        position: { x: 200, y: 250 },
        size: { width: 80, height: 80 },
        properties: {
          label: 'Cache',
          color: '#F59E0B',
          opacity: 0.9,
          connections: ['node-1', 'node-4']
        },
        state: 'active'
      },
      {
        id: 'node-4',
        type: 'node',
        position: { x: 400, y: 300 },
        size: { width: 80, height: 80 },
        properties: {
          label: 'Storage',
          color: '#EF4444',
          opacity: 0.9,
          connections: ['node-2', 'node-3']
        },
        state: 'active'
      }
    ]);

    // Scene Layer Data - 3D Objects
    setSceneObjects([
      {
        id: 'cube-1',
        type: 'cube',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        material: {
          color: '#3B82F6',
          opacity: 0.8,
          metalness: 0.3,
          roughness: 0.4
        },
        animation: {
          type: 'rotate',
          speed: 0.01,
          enabled: true
        }
      },
      {
        id: 'sphere-1',
        type: 'sphere',
        position: { x: 3, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        material: {
          color: '#10B981',
          opacity: 0.8,
          metalness: 0.5,
          roughness: 0.2
        },
        animation: {
          type: 'pulse',
          speed: 0.02,
          enabled: true
        }
      },
      {
        id: 'cylinder-1',
        type: 'cylinder',
        position: { x: -3, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        material: {
          color: '#F59E0B',
          opacity: 0.8,
          metalness: 0.4,
          roughness: 0.3
        },
        animation: {
          type: 'float',
          speed: 0.015,
          enabled: true
        }
      }
    ]);
  }, []);

  // Real-time data updates
  const startRealTimeUpdates = useCallback(() => {
    const interval = setInterval(() => {
      setObservabilityData(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          timestamp: new Date().toISOString(),
          metrics: {
            cpu: Math.max(0, Math.min(100, prev.metrics.cpu + (Math.random() - 0.5) * 10)),
            memory: Math.max(0, Math.min(100, prev.metrics.memory + (Math.random() - 0.5) * 5)),
            network: Math.max(0, Math.min(100, prev.metrics.network + (Math.random() - 0.5) * 8)),
            errors: Math.max(0, prev.metrics.errors + (Math.random() > 0.9 ? 1 : 0)),
            requests: prev.metrics.requests + Math.floor(Math.random() * 10),
            responseTime: Math.max(10, Math.min(500, prev.metrics.responseTime + (Math.random() - 0.5) * 20))
          },
          health: Math.random() > 0.95 ? 'warning' : 'healthy'
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 2D Canvas rendering for View Layer
  const render2DView = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections first
    viewObjects.forEach(obj => {
      obj.properties.connections.forEach(connectionId => {
        const targetObj = viewObjects.find(o => o.id === connectionId);
        if (targetObj) {
          ctx.beginPath();
          ctx.moveTo(obj.position.x + obj.size.width / 2, obj.position.y + obj.size.height / 2);
          ctx.lineTo(targetObj.position.x + targetObj.size.width / 2, targetObj.position.y + targetObj.size.height / 2);
          ctx.strokeStyle = '#6B7280';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    });

    // Draw nodes
    viewObjects.forEach(obj => {
      const { position, size, properties, state } = obj;
      
      // Node background
      ctx.fillStyle = properties.color;
      ctx.globalAlpha = properties.opacity;
      ctx.fillRect(position.x, position.y, size.width, size.height);
      
      // Node border
      ctx.strokeStyle = state === 'selected' ? '#1F2937' : '#374151';
      ctx.lineWidth = state === 'selected' ? 3 : 1;
      ctx.strokeRect(position.x, position.y, size.width, size.height);
      
      // Node label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(properties.label, position.x + size.width / 2, position.y + size.height / 2 + 4);
      
      ctx.globalAlpha = 1;
    });
  }, [viewObjects]);

  // 3D Scene rendering (simplified 2D representation)
  const render3DScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw 3D objects as 2D projections
    sceneObjects.forEach((obj, index) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const offsetX = obj.position.x * 50;
      const offsetY = obj.position.y * 50;
      
      const x = centerX + offsetX;
      const y = centerY + offsetY;
      const size = 40 + Math.sin(Date.now() * 0.001 + index) * 10;

      // Draw object based on type
      ctx.fillStyle = obj.material.color;
      ctx.globalAlpha = obj.material.opacity;
      
      if (obj.type === 'cube') {
        // Draw cube as rotated rectangle
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(obj.rotation.y + Date.now() * obj.animation?.speed || 0);
        ctx.fillRect(-size/2, -size/2, size, size);
        ctx.restore();
      } else if (obj.type === 'sphere') {
        // Draw sphere as circle
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2);
        ctx.fill();
      } else if (obj.type === 'cylinder') {
        // Draw cylinder as ellipse
        ctx.beginPath();
        ctx.ellipse(x, y, size/2, size/3, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalAlpha = 1;
    });
  }, [sceneObjects]);

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return;

    const animate = () => {
      if (activeLayer === 'view') {
        render2DView();
      } else if (activeLayer === 'scene') {
        render3DScene();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeLayer, isAnimating, render2DView, render3DScene]);

  // Layer switching
  const switchLayer = (layer: 'observability' | 'view' | 'scene') => {
    setActiveLayer(layer);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Get event icon
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Three-Layer Showcase v3
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Observability • View • Scene Layers
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className={`p-2 rounded-lg transition-colors ${
                isAnimating 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
              title={isAnimating ? 'Pause Animation' : 'Start Animation'}
            >
              <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Layer Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {[
            { id: 'observability', label: 'Observability', icon: Activity },
            { id: 'view', label: '2D View', icon: Eye },
            { id: 'scene', label: '3D Scene', icon: Box }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => switchLayer(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeLayer === tab.id
                    ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 h-full">
        {/* Observability Layer */}
        {activeLayer === 'observability' && observabilityData && (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'CPU', value: observabilityData.metrics.cpu, unit: '%', icon: Cpu, color: 'blue' },
                { label: 'Memory', value: observabilityData.metrics.memory, unit: '%', icon: Monitor, color: 'green' },
                { label: 'Network', value: observabilityData.metrics.network, unit: '%', icon: Globe, color: 'purple' },
                { label: 'Errors', value: observabilityData.metrics.errors, unit: '', icon: AlertTriangle, color: 'red' },
                { label: 'Requests', value: observabilityData.metrics.requests, unit: '', icon: TrendingUp, color: 'yellow' },
                { label: 'Response', value: observabilityData.metrics.responseTime, unit: 'ms', icon: Zap, color: 'indigo' }
              ].map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 text-${metric.color}-500`} />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value}{metric.unit}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className={`bg-${metric.color}-500 h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${Math.min(100, metric.value)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Health Status */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Health</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  observabilityData.health === 'healthy' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : observabilityData.health === 'warning'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {observabilityData.health.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date(observabilityData.timestamp).toLocaleTimeString()}
              </div>
            </div>

            {/* Events */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Events</h3>
              <div className="space-y-3">
                {observabilityData.events.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    {getEventIcon(event.type)}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">{event.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View Layer - 2D Objects */}
        {activeLayer === 'view' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">2D Network View</h3>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full h-96 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600"
                />
                <div className="absolute top-4 left-4 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Legend</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-gray-600 dark:text-gray-400">API Gateway</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-gray-600 dark:text-gray-400">Database</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span className="text-gray-600 dark:text-gray-400">Cache</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-gray-600 dark:text-gray-400">Storage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scene Layer - 3D Objects */}
        {activeLayer === 'scene' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">3D Scene View</h3>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-gray-200 dark:border-slate-600"
                />
                <div className="absolute top-4 left-4 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">3D Objects</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-gray-600 dark:text-gray-400">Rotating Cube</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">Pulsing Sphere</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span className="text-gray-600 dark:text-gray-400">Floating Cylinder</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Controls</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <div>• Mouse: Rotate view</div>
                    <div>• Scroll: Zoom</div>
                    <div>• Click: Select object</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
