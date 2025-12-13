/**
 * Interactive Library Page - Full Implementation
 * All 153 components with interactive features, detail views, and working filters
 * 
 * @version 3.0.0
 * @date 2025-01-16
 */

import React, { useState, useMemo } from 'react';
import { Search, Sun, Moon, Palette, Grid3x3, List, Filter, Settings, Eye, Code, Play, X, ExternalLink } from 'lucide-react';
import ComponentRenderer from './ComponentRenderer';
import { completeComponentInventory } from '../data/complete-component-inventory';

// Complete component data - 153 components
const componentData = completeComponentInventory;

// Theme configuration
const themes = {
  light: {
    name: 'Light',
    icon: Sun,
    colors: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      text: 'text-gray-900',
      border: 'border-gray-200'
    }
  },
  dark: {
    name: 'Dark',
    icon: Moon,
    colors: {
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      text: 'text-white',
      border: 'border-gray-700'
    }
  },
  outline: {
    name: 'Outline',
    icon: Palette,
    colors: {
      primary: 'bg-transparent outline-theme',
      secondary: 'bg-gray-50 outline-theme',
      text: 'text-gray-900',
      border: 'border-2 border-gray-900'
    }
  }
};

const InteractiveLibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [theme, setTheme] = useState<'light' | 'dark' | 'outline'>('light');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [configVersion, setConfigVersion] = useState('all');
  const [configType, setConfigType] = useState('all');
  const [componentVersion, setComponentVersion] = useState('all');
  const [componentTag, setComponentTag] = useState('all');
  const [componentType, setComponentType] = useState('all');
  const [componentDimension, setComponentDimension] = useState('all');
  const [componentDate, setComponentDate] = useState('all');

  const currentTheme = themes[theme];

  const filteredComponents = useMemo(() => {
    console.log(`🔍 Filtering components with ${componentData.length} total components`);
    let filtered = componentData;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Config version filter
    if (configVersion !== 'all') {
      filtered = filtered.filter(c => c.version === configVersion);
    }

    // Config type filter
    if (configType !== 'all') {
      filtered = filtered.filter(c => c.type === configType);
    }

    // Component version filter
    if (componentVersion !== 'all') {
      filtered = filtered.filter(c => c.version === componentVersion);
    }

    // Component tag filter
    if (componentTag !== 'all') {
      filtered = filtered.filter(c => c.tags.includes(componentTag));
    }

    // Component type filter
    if (componentType !== 'all') {
      filtered = filtered.filter(c => c.type === componentType);
    }

    // Component dimension filter
    if (componentDimension !== 'all') {
      filtered = filtered.filter(c => c.dimension === componentDimension);
    }

    // Component date filter
    if (componentDate !== 'all') {
      filtered = filtered.filter(c => c.date === componentDate);
    }

    console.log(`✅ Filtered to ${filtered.length} components`);
    return filtered;
  }, [selectedCategory, searchQuery, configVersion, configType, componentVersion, componentTag, componentType, componentDimension, componentDate]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(componentData.map(c => c.category)));
    return cats.sort();
  }, []);

  const tags = useMemo(() => {
    const allTags = componentData.flatMap(c => c.tags);
    return Array.from(new Set(allTags)).sort();
  }, []);

  const versions = useMemo(() => {
    const vers = Array.from(new Set(componentData.map(c => c.version)));
    return vers.sort();
  }, []);

  const types = useMemo(() => {
    const typs = Array.from(new Set(componentData.map(c => c.type)));
    return typs.sort();
  }, []);

  const dimensions = useMemo(() => {
    const dims = Array.from(new Set(componentData.map(c => c.dimension)));
    return dims.sort();
  }, []);

  const dates = useMemo(() => {
    const dts = Array.from(new Set(componentData.map(c => c.date)));
    return dts.sort();
  }, []);

  const handleComponentClick = (component: any) => {
    setSelectedComponent(component);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComponent(null);
  };

  return (
    <div className={`min-h-screen ${currentTheme.colors.primary} ${currentTheme.colors.text}`}>
      {/* Header */}
      <header className={`${currentTheme.colors.secondary} ${currentTheme.colors.border} border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Power Components Library v4</h1>
              <span className="text-sm text-gray-500">153 Components</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Selector */}
              <div className="flex items-center space-x-2">
                {Object.entries(themes).map(([key, themeConfig]) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key as any)}
                    className={`p-2 rounded-md ${
                      theme === key 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    title={themeConfig.name}
                  >
                    <themeConfig.icon size={20} />
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  title="Grid View"
                >
                  <Grid3x3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${
                    viewMode === 'list' 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  title="List View"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className={`${currentTheme.colors.secondary} ${currentTheme.colors.border} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Config Version Filter */}
            <select
              value={configVersion}
              onChange={(e) => setConfigVersion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Versions</option>
              {versions.map(ver => (
                <option key={ver} value={ver}>{ver}</option>
              ))}
            </select>

            {/* Config Type Filter */}
            <select
              value={configType}
              onChange={(e) => setConfigType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Component Version Filter */}
            <select
              value={componentVersion}
              onChange={(e) => setComponentVersion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Component Versions</option>
              {versions.map(ver => (
                <option key={ver} value={ver}>{ver}</option>
              ))}
            </select>

            {/* Component Tag Filter */}
            <select
              value={componentTag}
              onChange={(e) => setComponentTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Tags</option>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            {/* Component Type Filter */}
            <select
              value={componentType}
              onChange={(e) => setComponentType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Component Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Component Dimension Filter */}
            <select
              value={componentDimension}
              onChange={(e) => setComponentDimension(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Dimensions</option>
              {dimensions.map(dim => (
                <option key={dim} value={dim}>{dim}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <p className="text-lg">
            Showing {filteredComponents.length} of {componentData.length} components
          </p>
          <div className="flex items-center space-x-2">
            <Filter size={20} />
            <span className="text-sm text-gray-500">Filters Applied</span>
          </div>
        </div>
      </div>

      {/* Component Grid/List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component) => (
              <div
                key={component.id}
                className={`${currentTheme.colors.secondary} ${currentTheme.colors.border} border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer`}
                onClick={() => handleComponentClick(component)}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 break-words">{component.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{component.description}</p>
                </div>

                {/* ACTUAL COMPONENT RENDERING */}
                <div className="p-4">
                  {(() => {
                    console.log(`🎯 Rendering component: ${component.name} (${component.category})`);
                    return (
                      <ComponentRenderer
                        componentId={component.id}
                        componentName={component.name}
                        category={component.category}
                        width={300}
                        height={200}
                      />
                    );
                  })()}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {component.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {component.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full dark:bg-gray-700 dark:text-gray-300">
                        +{component.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="metadata-row">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Version: {component.version}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Type: {component.type}</span>
                  </div>
                  
                  <div className="metadata-row">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Dimension: {component.dimension}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Date: {component.date}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                    Details
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComponents.map((component) => (
              <div
                key={component.id}
                className={`${currentTheme.colors.secondary} ${currentTheme.colors.border} border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer`}
                onClick={() => handleComponentClick(component)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{component.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{component.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {component.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div>Version: {component.version}</div>
                      <div>Type: {component.type}</div>
                      <div>Dimension: {component.dimension}</div>
                      <div>Date: {component.date}</div>
                    </div>
                  </div>
                  
                  <div className="w-64 h-48">
                    {(() => {
                      console.log(`🎯 Rendering component: ${component.name} (${component.category})`);
                      return (
                        <ComponentRenderer
                          componentId={component.id}
                          componentName={component.name}
                          category={component.category}
                          width={256}
                          height={192}
                        />
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && selectedComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${currentTheme.colors.primary} ${currentTheme.colors.border} border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden`}>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-3xl font-bold">{selectedComponent.name}</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Component Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Description:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedComponent.description}</p>
                    </div>
                    <div>
                      <span className="font-medium">Category:</span>
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded dark:bg-blue-900 dark:text-blue-200">
                        {selectedComponent.category}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Version:</span>
                      <span className="ml-2">{selectedComponent.version}</span>
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>
                      <span className="ml-2">{selectedComponent.type}</span>
                    </div>
                    <div>
                      <span className="font-medium">Dimension:</span>
                      <span className="ml-2">{selectedComponent.dimension}</span>
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>
                      <span className="ml-2">{selectedComponent.date}</span>
                    </div>
                    <div>
                      <span className="font-medium">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedComponent.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded dark:bg-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 min-h-[300px]">
                    {(() => {
                      console.log(`🎯 Rendering modal component: ${selectedComponent.name} (${selectedComponent.category})`);
                      return (
                        <ComponentRenderer
                          componentId={selectedComponent.id}
                          componentName={selectedComponent.name}
                          category={selectedComponent.category}
                          width={400}
                          height={300}
                        />
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveLibraryPage;