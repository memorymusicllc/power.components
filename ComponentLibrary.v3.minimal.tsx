/**
 * Minimal Component Library v3 - Working Version
 * 
 * Constitutional Authority: Article I, Article III, Article IX
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  Play, 
  Pause, 
  Settings,
  Activity,
  Zap,
  Globe,
  Box,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

// Simple component data
const components = [
  {
    id: 'automation-engine-v3',
    name: 'Automation Engine v3',
    category: 'Dashboard',
    version: '3.0.0',
    status: 'active',
    description: 'AI-driven automation engine with self-healing capabilities',
    performance: { renderTime: 25, errorRate: 0.002, accessibilityScore: 0.98 },
    constitutionalCompliance: 100,
    health: 'healthy',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'ai-response-system-v3',
    name: 'AI Response System v3',
    category: 'AI',
    version: '3.0.0',
    status: 'active',
    description: 'Intelligent response system with natural language processing',
    performance: { renderTime: 18, errorRate: 0.001, accessibilityScore: 0.99 },
    constitutionalCompliance: 100,
    health: 'healthy',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'search-3d-v3',
    name: 'Search 3D v3',
    category: 'Visualization',
    version: '3.0.0',
    status: 'active',
    description: '3D visualization search engine with spatial relationships',
    performance: { renderTime: 35, errorRate: 0.005, accessibilityScore: 0.95 },
    constitutionalCompliance: 100,
    health: 'healthy',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'universal-component-container-v3',
    name: 'Universal Component Container v3',
    category: 'Container',
    version: '3.0.0',
    status: 'active',
    description: 'Universal container that can morph into any of 52 component types',
    performance: { renderTime: 22, errorRate: 0.003, accessibilityScore: 0.97 },
    constitutionalCompliance: 100,
    health: 'healthy',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'dropdown-component-v3',
    name: 'Dropdown Component v3',
    category: 'UI',
    version: '3.0.0',
    status: 'active',
    description: 'Comprehensive dropdown with multiple variants and features',
    performance: { renderTime: 15, errorRate: 0.001, accessibilityScore: 0.99 },
    constitutionalCompliance: 100,
    health: 'healthy',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'three-layer-showcase-v3',
    name: 'Three-Layer Showcase v3',
    category: 'Showcase',
    version: '3.0.0',
    status: 'active',
    description: 'Demonstrates observability, 2D view, and 3D scene layers',
    performance: { renderTime: 28, errorRate: 0.004, accessibilityScore: 0.96 },
    constitutionalCompliance: 100,
    health: 'healthy',
    lastUpdated: new Date().toISOString()
  }
];

// Simple component renderer
const renderComponent = (component: any) => {
  switch (component.id) {
    case 'automation-engine-v3':
      return (
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-bold text-white">Automation Engine v3</h3>
          </div>
          <p className="text-gray-300 mb-4">AI-driven automation engine with self-healing capabilities</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Render Time</div>
              <div className="text-green-400 font-mono">25ms</div>
            </div>
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Error Rate</div>
              <div className="text-green-400 font-mono">0.002%</div>
            </div>
          </div>
        </div>
      );
    
    case 'ai-response-system-v3':
      return (
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-purple-500" />
            <h3 className="text-xl font-bold text-white">AI Response System v3</h3>
          </div>
          <p className="text-gray-300 mb-4">Intelligent response system with natural language processing</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Render Time</div>
              <div className="text-green-400 font-mono">18ms</div>
            </div>
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Error Rate</div>
              <div className="text-green-400 font-mono">0.001%</div>
            </div>
          </div>
        </div>
      );
    
    case 'search-3d-v3':
      return (
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-green-500" />
            <h3 className="text-xl font-bold text-white">Search 3D v3</h3>
          </div>
          <p className="text-gray-300 mb-4">3D visualization search engine with spatial relationships</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Render Time</div>
              <div className="text-green-400 font-mono">35ms</div>
            </div>
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Error Rate</div>
              <div className="text-green-400 font-mono">0.005%</div>
            </div>
          </div>
        </div>
      );
    
    case 'universal-component-container-v3':
      return (
        <div className="p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-lg border border-pink-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Box className="w-8 h-8 text-pink-500" />
            <h3 className="text-xl font-bold text-white">Universal Component Container v3</h3>
          </div>
          <p className="text-gray-300 mb-4">Universal container that can morph into any of 52 component types</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Render Time</div>
              <div className="text-green-400 font-mono">22ms</div>
            </div>
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Error Rate</div>
              <div className="text-green-400 font-mono">0.003%</div>
            </div>
          </div>
        </div>
      );
    
    case 'dropdown-component-v3':
      return (
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-bold text-white">Dropdown Component v3</h3>
          </div>
          <p className="text-gray-300 mb-4">Comprehensive dropdown with multiple variants and features</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Render Time</div>
              <div className="text-green-400 font-mono">15ms</div>
            </div>
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Error Rate</div>
              <div className="text-green-400 font-mono">0.001%</div>
            </div>
          </div>
        </div>
      );
    
    case 'three-layer-showcase-v3':
      return (
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <h3 className="text-xl font-bold text-white">Three-Layer Showcase v3</h3>
          </div>
          <p className="text-gray-300 mb-4">Demonstrates observability, 2D view, and 3D scene layers</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Render Time</div>
              <div className="text-green-400 font-mono">28ms</div>
            </div>
            <div className="bg-white/5 p-3 rounded">
              <div className="text-gray-400">Error Rate</div>
              <div className="text-green-400 font-mono">0.004%</div>
            </div>
          </div>
        </div>
      );
    
    default:
      return (
        <div className="p-6 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-xl font-bold text-white mb-2">{component.name}</h3>
          <p className="text-gray-300">{component.description}</p>
        </div>
      );
  }
};

export default function ComponentLibraryV3Minimal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);

  // Filter components based on search
  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get health status color
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-[hsl(0,0%,3.9%)] text-white`}>
      {/* Header */}
      <header className="bg-[hsl(0,0%,6%)] border-b border-[0.8px] border-[hsl(0,0%,12%)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Power Components Library</h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>v3.0.0</span>
              <span>•</span>
              <span>6 Components</span>
              <span>•</span>
              <span className="text-green-500">100% Constitutional Compliance</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* System Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[hsl(0,0%,6%)] border border-[0.8px] border-[hsl(0,0%,12%)] rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-white">6</div>
                <div className="text-sm text-gray-400">Total Components</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[hsl(0,0%,6%)] border border-[0.8px] border-[hsl(0,0%,12%)] rounded-lg p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-white">6</div>
                <div className="text-sm text-gray-400">Active Components</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[hsl(0,0%,6%)] border border-[0.8px] border-[hsl(0,0%,12%)] rounded-lg p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-sm text-gray-400">Deprecated</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[hsl(0,0%,6%)] border border-[0.8px] border-[hsl(0,0%,12%)] rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Constitutional Compliance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              className="bg-[hsl(0,0%,6%)] border border-[0.8px] border-[hsl(0,0%,12%)] rounded-lg p-6 cursor-pointer hover:bg-[hsl(0,0%,8%)] transition-colors"
              onClick={() => setSelectedComponent(component)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{component.name}</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(component.health)} bg-white/5`}>
                  {component.health}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{component.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{component.category}</span>
                <span>v{component.version}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Component Preview */}
        {selectedComponent && (
          <div className="mt-8 bg-[hsl(0,0%,3.9%)] border border-[0.8px] border-[hsl(0,0%,12%)] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Component Preview</h2>
              <button
                onClick={() => setSelectedComponent(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            {renderComponent(selectedComponent)}
          </div>
        )}
      </main>
    </div>
  );
}