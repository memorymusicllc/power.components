/**
 * Enhanced Library Page with Component Filtering and Theme Selection
 * Supports all 139 components with filtering and outline theme
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid3x3, 
  List, 
  Sun, 
  Moon, 
  Palette,
  Eye,
  Code,
  Download,
  Star,
  Tag,
  Layers,
  BarChart3,
  Settings,
  Zap,
  Shield,
  Cpu,
  Network,
  Monitor,
  Play,
  Activity
} from 'lucide-react';
import { ThemeProvider, useTheme, ThemeSelector } from '../lib/themes/ThemeProvider';

// Component categories from COMPONENT_INVENTORY.md
const componentCategories = {
  dashboard: { name: 'Dashboard', icon: Monitor, count: 19, color: 'blue' },
  charts: { name: 'Charts', icon: BarChart3, count: 22, color: 'green' },
  workflows: { name: 'Workflows', icon: Settings, count: 10, color: 'purple' },
  search: { name: 'Search', icon: Search, count: 5, color: 'orange' },
  ui: { name: 'UI Components', icon: Layers, count: 52, color: 'gray' },
  'redux-ui': { name: 'Redux UI', icon: Zap, count: 13, color: 'red' },
  pow3r: { name: 'Pow3r', icon: Shield, count: 5, color: 'indigo' },
  features: { name: 'Features', icon: Activity, count: 13, color: 'pink' }
};

// Sample component data (in a real app, this would come from the actual components)
const sampleComponents = [
  // Dashboard Components
  { id: 'admin-panel', name: 'AdminPanel', category: 'dashboard', description: 'System administration and oversight', tags: ['admin', 'management', 'system'], version: '1.0.0' },
  { id: 'ai-response-system', name: 'AIResponseSystem', category: 'dashboard', description: 'AI-powered auto-responses and templates', tags: ['ai', 'automation', 'phase2'], version: '2.0.0' },
  { id: 'analytics-dashboard', name: 'AnalyticsDashboard', category: 'dashboard', description: 'Analytics and metrics visualization', tags: ['analytics', 'metrics', 'phase2'], version: '1.0.0' },
  
  // Chart Components
  { id: 'leads-chart', name: 'LeadsChart', category: 'charts', description: 'Lead pipeline pie chart', tags: ['chart', 'leads', 'analytics'], version: '2.0.0' },
  { id: 'bloom-graph-chart', name: 'BloomGraphChart', category: 'charts', description: 'Bloom filter visualization', tags: ['chart', 'visualization'], version: '1.0.0' },
  { id: 'confusion-matrix-chart', name: 'ConfusionMatrixChart', category: 'charts', description: 'ML confusion matrix', tags: ['chart', 'ml', 'analytics'], version: '1.0.0' },
  
  // UI Components
  { id: 'button', name: 'Button', category: 'ui', description: 'Interactive button component', tags: ['ui', 'interactive', 'button'], version: '1.0.0' },
  { id: 'card', name: 'Card', category: 'ui', description: 'Content container card', tags: ['ui', 'container', 'card'], version: '1.0.0' },
  { id: 'input', name: 'Input', category: 'ui', description: 'Text input component', tags: ['ui', 'form', 'input'], version: '1.0.0' },
  
  // Redux UI Components
  { id: 'redux-button', name: 'Button', category: 'redux-ui', description: 'Redux UI button', tags: ['redux-ui', 'button', 'interactive'], version: '1.0.0' },
  { id: 'redux-card', name: 'Card', category: 'redux-ui', description: 'Redux UI card', tags: ['redux-ui', 'card', 'container'], version: '1.0.0' },
  
  // Add more components as needed...
];

export interface LibraryPageProps {
  className?: string;
}

const LibraryPageContent: React.FC<LibraryPageProps> = ({ className }) => {
  const { theme, variant, isOutline } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'version'>('name');
  const [showFavorites, setShowFavorites] = useState(false);

  // Filter and sort components
  const filteredComponents = useMemo(() => {
    let filtered = sampleComponents;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(component =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(component => component.category === selectedCategory);
    }

    // Favorites filter
    if (showFavorites) {
      // In a real app, this would check a favorites list
      filtered = filtered.filter(component => component.tags.includes('favorite'));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'version':
          return b.version.localeCompare(a.version);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, showFavorites, sortBy]);

  const getCategoryColor = (category: string) => {
    const categoryInfo = componentCategories[category as keyof typeof componentCategories];
    return categoryInfo?.color || 'gray';
  };

  const getOutlineClasses = (baseClasses: string, variant: string = 'default') => {
    if (!isOutline) return baseClasses;
    
    const outlineVariants = {
      default: 'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-50',
      primary: 'border border-blue-500 bg-transparent text-blue-600 hover:bg-blue-50',
      secondary: 'border border-gray-500 bg-transparent text-gray-600 hover:bg-gray-50',
      success: 'border border-green-500 bg-transparent text-green-600 hover:bg-green-50',
      warning: 'border border-yellow-500 bg-transparent text-yellow-600 hover:bg-yellow-50',
      error: 'border border-red-500 bg-transparent text-red-600 hover:bg-red-50',
      info: 'border border-blue-500 bg-transparent text-blue-600 hover:bg-blue-50'
    };
    
    return `${baseClasses} ${outlineVariants[variant as keyof typeof outlineVariants] || outlineVariants.default}`;
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Power Components Library
              </h1>
              <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                139 Components
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={getOutlineClasses(
                    "w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                    variant
                  )}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={getOutlineClasses(
                  "px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  variant
                )}
              >
                <option value="all">All Categories</option>
                {Object.entries(componentCategories).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={getOutlineClasses(
                  "px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  variant
                )}
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
                <option value="version">Sort by Version</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredComponents.length} of {sampleComponents.length} components
            {selectedCategory !== 'all' && ` in ${componentCategories[selectedCategory as keyof typeof componentCategories]?.name}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Components Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component) => {
              const categoryInfo = componentCategories[component.category as keyof typeof componentCategories];
              const IconComponent = categoryInfo?.icon || Layers;
              
              return (
                <div
                  key={component.id}
                  className={getOutlineClasses(
                    "p-6 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer",
                    variant
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${getCategoryColor(component.category)}-100`}>
                        <IconComponent className={`h-5 w-5 text-${getCategoryColor(component.category)}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {component.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {categoryInfo?.name}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      v{component.version}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {component.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {component.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {component.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium text-gray-500">
                        +{component.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Code className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-yellow-500">
                      <Star className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComponents.map((component) => {
              const categoryInfo = componentCategories[component.category as keyof typeof componentCategories];
              const IconComponent = categoryInfo?.icon || Layers;
              
              return (
                <div
                  key={component.id}
                  className={getOutlineClasses(
                    "p-4 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer",
                    variant
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg bg-${getCategoryColor(component.category)}-100`}>
                        <IconComponent className={`h-5 w-5 text-${getCategoryColor(component.category)}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {component.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {component.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {categoryInfo?.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            v{component.version}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {component.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Code className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-yellow-500">
                          <Star className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No components found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const LibraryPage: React.FC<LibraryPageProps> = (props) => {
  return (
    <ThemeProvider>
      <LibraryPageContent {...props} />
    </ThemeProvider>
  );
};

export default LibraryPage;
