/**
 * Power Components Library
 * Standalone component library showcase for the power.components repository
 * 
 * Features:
 * - Search components
 * - Filter by phase, type, tag
 * - Light/Dark mode switcher
 * - Component metadata display
 * - Live previews
 * - Responsive design
 * 
 * @version 1.0.0
 * @date 2025-01-08
 */

import React, { useState, useMemo, useEffect } from 'react'
import { 
  Search, 
  Sun, 
  Moon, 
  Filter, 
  Package, 
  Grid3x3, 
  Download, 
  ArrowLeft,
  Calendar,
  Tag,
  Code,
  Eye
} from 'lucide-react'

// Component metadata interface
interface ComponentMetadata {
  id: string
  name: string
  label: string
  version: string
  date: string
  description: string
  phase: string
  category: string
  tags: string[]
  usage: string
  props: string[]
  example: string
  documentation?: string
  dependencies?: string[]
}

// Component data - this would typically come from a CMS or API
const componentData: ComponentMetadata[] = [
  {
    id: 'dashboard-card',
    name: 'DashboardCard',
    label: 'Dashboard Card Wrapper',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Standardized container for dashboard widgets with consistent styling and layout',
    phase: 'Core',
    category: 'Layout',
    tags: ['core', 'layout', 'container', 'dashboard'],
    usage: 'Used as a wrapper for all dashboard components to ensure consistent styling',
    props: ['title', 'description', 'children', 'className'],
    example: '<DashboardCard title="Sales" description="Monthly sales data">...</DashboardCard>',
    documentation: '/docs/dashboard-card',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'price-chart',
    name: 'PriceChart',
    label: 'Price History Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Interactive line chart showing price trends over time with zoom and pan capabilities',
    phase: 'Core',
    category: 'Visualization',
    tags: ['core', 'chart', 'analytics', 'price', 'visualization'],
    usage: 'Display price history data with interactive features',
    props: ['data', 'height', 'showLegend', 'timeRange'],
    example: '<PriceChart data={priceData} height={300} showLegend={true} />',
    documentation: '/docs/price-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'leads-chart',
    name: 'LeadsChart',
    label: 'Lead Pipeline Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Pie chart showing lead status distribution with interactive segments',
    phase: 'Core',
    category: 'Visualization',
    tags: ['core', 'chart', 'analytics', 'leads', 'pipeline'],
    usage: 'Visualize lead distribution across different statuses',
    props: ['data', 'colors', 'showLabels', 'radius'],
    example: '<LeadsChart data={leadsData} colors={customColors} />',
    documentation: '/docs/leads-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'item-details-collector',
    name: 'ItemDetailsCollector',
    label: 'Item Details Collector',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Form component for collecting product information for listings',
    phase: 'Phase 1',
    category: 'Content & Setup',
    tags: ['phase1', 'content', 'item-management', 'form', 'input'],
    usage: 'Collect detailed product information before creating listings',
    props: ['onSubmit', 'initialData', 'validation', 'fields'],
    example: '<ItemDetailsCollector onSubmit={handleSubmit} fields={requiredFields} />',
    documentation: '/docs/item-details-collector',
    dependencies: ['react', 'react-hook-form', 'tailwindcss']
  },
  {
    id: 'photo-processor',
    name: 'PhotoProcessor',
    label: 'Photo Processor',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Image upload and processing component with resize and optimization',
    phase: 'Phase 1',
    category: 'Content & Setup',
    tags: ['phase1', 'image', 'upload', 'processing', 'optimization'],
    usage: 'Handle image uploads with automatic processing and optimization',
    props: ['onUpload', 'maxSize', 'formats', 'quality'],
    example: '<PhotoProcessor onUpload={handleImageUpload} maxSize="5MB" />',
    documentation: '/docs/photo-processor',
    dependencies: ['react', 'react-dropzone', 'tailwindcss']
  },
  {
    id: 'auto-posting-engine',
    name: 'AutoPostingEngine',
    label: 'Auto Posting Engine',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Automated posting system for multiple platforms with scheduling',
    phase: 'Phase 2',
    category: 'Automation',
    tags: ['phase2', 'automation', 'posting', 'scheduling', 'multi-platform'],
    usage: 'Automatically post content to multiple platforms on schedule',
    props: ['platforms', 'schedule', 'content', 'onPost'],
    example: '<AutoPostingEngine platforms={platforms} schedule={postSchedule} />',
    documentation: '/docs/auto-posting-engine',
    dependencies: ['react', 'node-cron', 'axios', 'tailwindcss']
  },
  {
    id: 'lead-monitor',
    name: 'LeadMonitor',
    label: 'Lead Monitor',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Real-time monitoring of leads with notifications and tracking',
    phase: 'Phase 2',
    category: 'Analytics',
    tags: ['phase2', 'leads', 'monitoring', 'notifications', 'real-time'],
    usage: 'Monitor incoming leads and send notifications',
    props: ['sources', 'notifications', 'filters', 'onLead'],
    example: '<LeadMonitor sources={leadSources} notifications={true} />',
    documentation: '/docs/lead-monitor',
    dependencies: ['react', 'socket.io-client', 'tailwindcss']
  },
  {
    id: 'negotiation-manager',
    name: 'NegotiationManager',
    label: 'Negotiation Manager',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'AI-powered negotiation assistant for price discussions',
    phase: 'Phase 2',
    category: 'AI & Automation',
    tags: ['phase2', 'ai', 'negotiation', 'automation', 'pricing'],
    usage: 'Assist with price negotiations using AI',
    props: ['strategy', 'priceRange', 'onNegotiate', 'aiModel'],
    example: '<NegotiationManager strategy="competitive" priceRange={range} />',
    documentation: '/docs/negotiation-manager',
    dependencies: ['react', 'openai', 'tailwindcss']
  },
  {
    id: 'admin-panel',
    name: 'AdminPanel',
    label: 'Admin Panel',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Administrative interface for system management and configuration',
    phase: 'Admin',
    category: 'Management',
    tags: ['admin', 'management', 'configuration', 'system'],
    usage: 'Provide administrative controls and system management',
    props: ['permissions', 'modules', 'onAction', 'auditLog'],
    example: '<AdminPanel permissions={adminPermissions} modules={systemModules} />',
    documentation: '/docs/admin-panel',
    dependencies: ['react', 'react-router', 'tailwindcss']
  },
  {
    id: 'message-center',
    name: 'MessageCenter',
    label: 'Message Center',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Centralized messaging system for customer communications',
    phase: 'Communication',
    category: 'Communication',
    tags: ['communication', 'messaging', 'customer', 'centralized'],
    usage: 'Handle all customer communications in one place',
    props: ['channels', 'templates', 'onMessage', 'filters'],
    example: '<MessageCenter channels={messageChannels} templates={responseTemplates} />',
    documentation: '/docs/message-center',
    dependencies: ['react', 'socket.io-client', 'tailwindcss']
  }
]

// Component Card Component
const ComponentCard: React.FC<{ component: ComponentMetadata; onClick: () => void }> = ({ 
  component, 
  onClick 
}) => (
  <div 
    className="component-card bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    onClick={onClick}
  >
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {component.label}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
          {component.name}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
          {component.phase}
        </span>
        <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
          v{component.version}
        </span>
      </div>
    </div>
    
    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
      {component.description}
    </p>
    
    <div className="flex flex-wrap gap-1 mb-3">
      {component.tags.slice(0, 3).map(tag => (
        <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
          {tag}
        </span>
      ))}
      {component.tags.length > 3 && (
        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
          +{component.tags.length - 3}
        </span>
      )}
    </div>
    
    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
      <span>{component.category}</span>
      <span>{component.date}</span>
    </div>
  </div>
)

// Component Detail Modal
const ComponentDetail: React.FC<{ 
  component: ComponentMetadata; 
  onClose: () => void 
}> = ({ component, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {component.label}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {component.name} • v{component.version}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {component.description}
            </p>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5" />
              Usage
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {component.usage}
            </p>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {component.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <Code className="w-5 h-5" />
              Props
            </h3>
            <div className="space-y-2 mb-6">
              {component.props.map(prop => (
                <div key={prop} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                    {prop}
                  </code>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <Code className="w-5 h-5" />
              Example
            </h3>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
              <code className="text-gray-800 dark:text-gray-200">
                {component.example}
              </code>
            </pre>
            
            {component.dependencies && (
              <>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white mt-6">
                  Dependencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {component.dependencies.map(dep => (
                    <span key={dep} className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
                      {dep}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        {component.documentation && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            <a
              href={component.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              View Documentation
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
)

// Main Component Library Component
const ComponentLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [phaseFilter, setPhaseFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<ComponentMetadata | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Filter components based on search and filters
  const filteredComponents = useMemo(() => {
    return componentData.filter(component => {
      const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesPhase = phaseFilter === 'all' || component.phase === phaseFilter
      const matchesTag = tagFilter === 'all' || component.tags.includes(tagFilter)
      
      return matchesSearch && matchesPhase && matchesTag
    })
  }, [searchQuery, phaseFilter, tagFilter])

  // Get unique phases and tags for filters
  const phases = [...new Set(componentData.map(c => c.phase))]
  const tags = [...new Set(componentData.flatMap(c => c.tags))]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Power Components Library
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Comprehensive component showcase
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Phases</option>
                {phases.map(phase => (
                  <option key={phase} value={phase}>{phase}</option>
                ))}
              </select>
              
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Tags</option>
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredComponents.length} of {componentData.length} components
            </p>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {phaseFilter !== 'all' && `Phase: ${phaseFilter}`}
                {tagFilter !== 'all' && ` • Tag: ${tagFilter}`}
              </span>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredComponents.map(component => (
            <ComponentCard 
              key={component.id} 
              component={component} 
              onClick={() => setSelectedComponent(component)}
            />
          ))}
        </div>
        
        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No components found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Component Detail Modal */}
      {selectedComponent && (
        <ComponentDetail 
          component={selectedComponent} 
          onClose={() => setSelectedComponent(null)} 
        />
      )}
    </div>
  )
}

export default ComponentLibrary
