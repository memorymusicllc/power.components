/**
 * Power Components Library
 * Comprehensive component showcase for the power.components repository
 * 
 * Features:
 * - Search components
 * - Filter by phase, type, tag
 * - Light/Dark mode switcher
 * - Component metadata display
 * - Live previews
 * - Responsive design
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import React, { useState, useMemo, useEffect } from 'react'
import { 
  Search, 
  Sun, 
  Moon, 
  Package, 
  Grid3x3, 
  ArrowLeft,
  Code,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

// Extend Window interface for Power Redact
declare global {
  interface Window {
    powerRedact?: {
      showSettings: () => void
      clearAllRedactions: () => void
    }
  }
}

// Import UNBOUND design system components
import { Button } from '@/lib/design-system'
import { 
  Input, 
  Textarea, 
  Label, 
  Select, 
  Switch, 
  Checkbox, 
  Separator 
} from '@/lib/design-system/form-components'

// Component metadata interface
export interface ComponentMetadata {
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

// Comprehensive component data - 40+ primitives
const componentData: ComponentMetadata[] = [
  {
    id: 'power-redact',
    name: 'PowerRedact',
    label: 'Power Redact Plugin v2.0',
    version: '2.0.0',
    date: '2025-01-08',
    description: 'Advanced text redaction plugin with enhanced UX features, mobile optimization, and iOS integration',
    phase: 'Core',
    category: 'Privacy & Security',
    tags: ['core', 'redaction', 'privacy', 'pii', 'mobile', 'ios', 'touch'],
    usage: 'Automatically detect and redact sensitive information with cursor-based reveal behavior',
    props: ['autoRedactPII', 'customPatterns', 'excludeTerms', 'revealBehavior', 'blockStyle', 'touchSupport'],
    example: 'const redactor = new PowerRedactPlugin(); redactor.showSettings();',
    documentation: '/docs/power-redact',
    dependencies: ['vanilla-js', 'esbuild']
  },
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
    id: 'llm-performance-chart',
    name: 'LLMPerformanceChart',
    label: 'LLM Performance Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Advanced chart showing LLM performance metrics and comparison data',
    phase: 'Core',
    category: 'AI Analytics',
    tags: ['core', 'chart', 'ai', 'llm', 'performance', 'analytics'],
    usage: 'Display LLM performance metrics and comparison data',
    props: ['data', 'metrics', 'models', 'timeRange'],
    example: '<LLMPerformanceChart data={llmData} metrics={["accuracy", "latency"]} />',
    documentation: '/docs/llm-performance-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'token-usage-chart',
    name: 'TokenUsageChart',
    label: 'Token Usage Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Visualization of token usage patterns and consumption trends',
    phase: 'Core',
    category: 'AI Analytics',
    tags: ['core', 'chart', 'ai', 'tokens', 'usage', 'analytics'],
    usage: 'Track and visualize token usage patterns',
    props: ['data', 'timeRange', 'models', 'showTrends'],
    example: '<TokenUsageChart data={tokenData} timeRange="30d" />',
    documentation: '/docs/token-usage-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'model-comparison-chart',
    name: 'ModelComparisonChart',
    label: 'Model Comparison Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Side-by-side comparison of different AI models and their performance',
    phase: 'Core',
    category: 'AI Analytics',
    tags: ['core', 'chart', 'ai', 'models', 'comparison', 'analytics'],
    usage: 'Compare different AI models and their performance metrics',
    props: ['models', 'metrics', 'data', 'showDetails'],
    example: '<ModelComparisonChart models={modelList} metrics={comparisonMetrics} />',
    documentation: '/docs/model-comparison-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'error-rate-chart',
    name: 'ErrorRateChart',
    label: 'Error Rate Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Track and visualize error rates over time with alerting capabilities',
    phase: 'Core',
    category: 'Monitoring',
    tags: ['core', 'chart', 'monitoring', 'errors', 'alerts'],
    usage: 'Monitor error rates and set up alerting thresholds',
    props: ['data', 'thresholds', 'alerts', 'timeRange'],
    example: '<ErrorRateChart data={errorData} thresholds={errorThresholds} />',
    documentation: '/docs/error-rate-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'request-volume-chart',
    name: 'RequestVolumeChart',
    label: 'Request Volume Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Visualize request volume patterns and traffic trends',
    phase: 'Core',
    category: 'Monitoring',
    tags: ['core', 'chart', 'monitoring', 'requests', 'traffic'],
    usage: 'Monitor request volume and traffic patterns',
    props: ['data', 'timeRange', 'showPeaks', 'aggregation'],
    example: '<RequestVolumeChart data={requestData} timeRange="24h" />',
    documentation: '/docs/request-volume-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'latency-distribution-chart',
    name: 'LatencyDistributionChart',
    label: 'Latency Distribution Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Histogram showing latency distribution patterns and percentiles',
    phase: 'Core',
    category: 'Performance',
    tags: ['core', 'chart', 'performance', 'latency', 'distribution'],
    usage: 'Analyze latency distribution and identify performance bottlenecks',
    props: ['data', 'percentiles', 'showStats', 'timeRange'],
    example: '<LatencyDistributionChart data={latencyData} percentiles={[50, 95, 99]} />',
    documentation: '/docs/latency-distribution-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'cost-analysis-chart',
    name: 'CostAnalysisChart',
    label: 'Cost Analysis Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Breakdown of costs by service, feature, and usage patterns',
    phase: 'Core',
    category: 'Analytics',
    tags: ['core', 'chart', 'analytics', 'costs', 'breakdown'],
    usage: 'Analyze costs and identify optimization opportunities',
    props: ['data', 'breakdown', 'timeRange', 'showTrends'],
    example: '<CostAnalysisChart data={costData} breakdown="service" />',
    documentation: '/docs/cost-analysis-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'quality-metrics-chart',
    name: 'QualityMetricsChart',
    label: 'Quality Metrics Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Comprehensive quality metrics dashboard with multiple KPIs',
    phase: 'Core',
    category: 'Quality',
    tags: ['core', 'chart', 'quality', 'metrics', 'kpi'],
    usage: 'Monitor quality metrics and track improvements over time',
    props: ['metrics', 'data', 'targets', 'showTrends'],
    example: '<QualityMetricsChart metrics={qualityMetrics} targets={qualityTargets} />',
    documentation: '/docs/quality-metrics-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'usage-patterns-chart',
    name: 'UsagePatternsChart',
    label: 'Usage Patterns Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Analyze user behavior patterns and usage trends',
    phase: 'Core',
    category: 'Analytics',
    tags: ['core', 'chart', 'analytics', 'usage', 'patterns'],
    usage: 'Understand user behavior and optimize user experience',
    props: ['data', 'patterns', 'timeRange', 'segments'],
    example: '<UsagePatternsChart data={usageData} patterns={behaviorPatterns} />',
    documentation: '/docs/usage-patterns-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'quadrant-leader-chart',
    name: 'QuadrantLeaderChart',
    label: 'Quadrant Leader Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Strategic quadrant analysis for product positioning and decision making',
    phase: 'Core',
    category: 'Strategy',
    tags: ['core', 'chart', 'strategy', 'quadrant', 'positioning'],
    usage: 'Analyze product positioning and strategic decisions',
    props: ['data', 'axes', 'quadrants', 'showLabels'],
    example: '<QuadrantLeaderChart data={productData} axes={["value", "effort"]} />',
    documentation: '/docs/quadrant-leader-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'network-graph-chart',
    name: 'NetworkGraphChart',
    label: 'Network Graph Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Interactive network visualization for relationships and connections',
    phase: 'Core',
    category: 'Visualization',
    tags: ['core', 'chart', 'network', 'graph', 'relationships'],
    usage: 'Visualize complex relationships and network structures',
    props: ['nodes', 'edges', 'layout', 'interactive'],
    example: '<NetworkGraphChart nodes={networkNodes} edges={networkEdges} />',
    documentation: '/docs/network-graph-chart',
    dependencies: ['react', 'd3', 'tailwindcss']
  },
  {
    id: 'scatter-plot-chart',
    name: 'ScatterPlotChart',
    label: 'Scatter Plot Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Correlation analysis and pattern discovery through scatter plots',
    phase: 'Core',
    category: 'Analytics',
    tags: ['core', 'chart', 'analytics', 'scatter', 'correlation'],
    usage: 'Discover correlations and patterns in data',
    props: ['data', 'xAxis', 'yAxis', 'showTrendLine'],
    example: '<ScatterPlotChart data={scatterData} xAxis="price" yAxis="sales" />',
    documentation: '/docs/scatter-plot-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'bloom-graph-chart',
    name: 'BloomGraphChart',
    label: 'Bloom Graph Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Advanced graph visualization with bloom effects and animations',
    phase: 'Core',
    category: 'Visualization',
    tags: ['core', 'chart', 'graph', 'bloom', 'animations'],
    usage: 'Create stunning graph visualizations with bloom effects',
    props: ['data', 'effects', 'animations', 'interactive'],
    example: '<BloomGraphChart data={graphData} effects={bloomEffects} />',
    documentation: '/docs/bloom-graph-chart',
    dependencies: ['react', 'd3', 'tailwindcss']
  },
  {
    id: 'timeline-chart',
    name: 'TimelineChart',
    label: 'Timeline Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Chronological event visualization with milestones and dependencies',
    phase: 'Core',
    category: 'Project Management',
    tags: ['core', 'chart', 'timeline', 'events', 'milestones'],
    usage: 'Visualize project timelines and event sequences',
    props: ['events', 'milestones', 'dependencies', 'timeRange'],
    example: '<TimelineChart events={projectEvents} milestones={keyMilestones} />',
    documentation: '/docs/timeline-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'word-cloud-chart',
    name: 'WordCloudChart',
    label: 'Word Cloud Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Text analysis visualization with word frequency and importance',
    phase: 'Core',
    category: 'Text Analytics',
    tags: ['core', 'chart', 'text', 'word-cloud', 'analysis'],
    usage: 'Analyze text content and visualize word importance',
    props: ['text', 'words', 'weights', 'colors'],
    example: '<WordCloudChart text={documentText} words={wordFrequencies} />',
    documentation: '/docs/word-cloud-chart',
    dependencies: ['react', 'd3', 'tailwindcss']
  },
  {
    id: 'heatmap-chart',
    name: 'HeatmapChart',
    label: 'Heatmap Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Data density visualization with color-coded intensity mapping',
    phase: 'Core',
    category: 'Analytics',
    tags: ['core', 'chart', 'heatmap', 'density', 'intensity'],
    usage: 'Visualize data density and intensity patterns',
    props: ['data', 'xAxis', 'yAxis', 'colorScale'],
    example: '<HeatmapChart data={densityData} xAxis="time" yAxis="category" />',
    documentation: '/docs/heatmap-chart',
    dependencies: ['react', 'd3', 'tailwindcss']
  },
  {
    id: 'confusion-matrix-chart',
    name: 'ConfusionMatrixChart',
    label: 'Confusion Matrix Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Machine learning model performance visualization and analysis',
    phase: 'Core',
    category: 'ML Analytics',
    tags: ['core', 'chart', 'ml', 'confusion-matrix', 'performance'],
    usage: 'Analyze ML model performance and classification accuracy',
    props: ['matrix', 'labels', 'showStats', 'colorScheme'],
    example: '<ConfusionMatrixChart matrix={confusionMatrix} labels={classLabels} />',
    documentation: '/docs/confusion-matrix-chart',
    dependencies: ['react', 'd3', 'tailwindcss']
  },
  {
    id: 'roc-curve-chart',
    name: 'ROCCurveChart',
    label: 'ROC Curve Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Receiver Operating Characteristic curve for model evaluation',
    phase: 'Core',
    category: 'ML Analytics',
    tags: ['core', 'chart', 'ml', 'roc', 'evaluation'],
    usage: 'Evaluate ML model performance with ROC curves',
    props: ['data', 'models', 'showAUC', 'interactive'],
    example: '<ROCCurveChart data={rocData} models={modelList} />',
    documentation: '/docs/roc-curve-chart',
    dependencies: ['react', 'recharts', 'tailwindcss']
  },
  {
    id: 'sankey-diagram-chart',
    name: 'SankeyDiagramChart',
    label: 'Sankey Diagram Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Flow visualization showing data movement and transformations',
    phase: 'Core',
    category: 'Visualization',
    tags: ['core', 'chart', 'sankey', 'flow', 'transformation'],
    usage: 'Visualize data flows and transformation processes',
    props: ['nodes', 'links', 'flows', 'interactive'],
    example: '<SankeyDiagramChart nodes={flowNodes} links={flowLinks} />',
    documentation: '/docs/sankey-diagram-chart',
    dependencies: ['react', 'd3', 'tailwindcss']
  },
  {
    id: 'gantt-chart',
    name: 'GanttChart',
    label: 'Gantt Chart',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Project timeline visualization with tasks, dependencies, and milestones',
    phase: 'Core',
    category: 'Project Management',
    tags: ['core', 'chart', 'gantt', 'project', 'timeline'],
    usage: 'Manage project timelines and track task progress',
    props: ['tasks', 'dependencies', 'milestones', 'timeRange'],
    example: '<GanttChart tasks={projectTasks} dependencies={taskDependencies} />',
    documentation: '/docs/gantt-chart',
    dependencies: ['react', 'd3', 'tailwindcss']
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
  },
  {
    id: 'button',
    name: 'Button',
    label: 'Button Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Versatile button component with multiple variants and states',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'button', 'interactive', 'primitive'],
    usage: 'Primary interactive element for user actions',
    props: ['variant', 'size', 'disabled', 'onClick', 'children'],
    example: '<Button variant="primary" size="md" onClick={handleClick}>Click me</Button>',
    documentation: '/docs/button',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'input',
    name: 'Input',
    label: 'Input Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Form input component with validation and error states',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'input', 'form', 'primitive'],
    usage: 'Text input for forms and data entry',
    props: ['type', 'placeholder', 'value', 'onChange', 'error'],
    example: '<Input type="text" placeholder="Enter text" value={value} onChange={setValue} />',
    documentation: '/docs/input',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'card',
    name: 'Card',
    label: 'Card Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Container component for grouping related content',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'card', 'container', 'primitive'],
    usage: 'Group related content in a visually distinct container',
    props: ['title', 'children', 'className', 'elevation'],
    example: '<Card title="Card Title"><p>Card content</p></Card>',
    documentation: '/docs/card',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'badge',
    name: 'Badge',
    label: 'Badge Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Small status indicator with color coding and variants',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'badge', 'status', 'primitive'],
    usage: 'Display status, counts, or labels',
    props: ['variant', 'size', 'children', 'className'],
    example: '<Badge variant="success" size="sm">Active</Badge>',
    documentation: '/docs/badge',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'modal',
    name: 'Modal',
    label: 'Modal Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Overlay dialog for focused user interactions',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'modal', 'dialog', 'overlay'],
    usage: 'Display focused content or forms in an overlay',
    props: ['isOpen', 'onClose', 'title', 'children', 'size'],
    example: '<Modal isOpen={isOpen} onClose={onClose} title="Modal Title">Content</Modal>',
    documentation: '/docs/modal',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    label: 'Dropdown Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Select component with search and multi-select capabilities',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'dropdown', 'select', 'primitive'],
    usage: 'Select from a list of options with search functionality',
    props: ['options', 'value', 'onChange', 'searchable', 'multiSelect'],
    example: '<Dropdown options={options} value={value} onChange={setValue} searchable />',
    documentation: '/docs/dropdown',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'tabs',
    name: 'Tabs',
    label: 'Tabs Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Tabbed interface for organizing content sections',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'tabs', 'navigation', 'primitive'],
    usage: 'Organize content into tabbed sections',
    props: ['tabs', 'activeTab', 'onTabChange', 'children'],
    example: '<Tabs tabs={tabList} activeTab={activeTab} onTabChange={setActiveTab} />',
    documentation: '/docs/tabs',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'accordion',
    name: 'Accordion',
    label: 'Accordion Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Collapsible content sections with smooth animations',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'accordion', 'collapsible', 'primitive'],
    usage: 'Organize content in collapsible sections',
    props: ['items', 'allowMultiple', 'defaultOpen', 'onToggle'],
    example: '<Accordion items={accordionItems} allowMultiple={true} />',
    documentation: '/docs/accordion',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    label: 'Tooltip Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Contextual information overlay on hover or focus',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'tooltip', 'overlay', 'primitive'],
    usage: 'Provide contextual information on hover',
    props: ['content', 'position', 'trigger', 'children'],
    example: '<Tooltip content="Helpful information" position="top"><Button>Hover me</Button></Tooltip>',
    documentation: '/docs/tooltip',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'progress',
    name: 'Progress',
    label: 'Progress Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Progress indicator for loading states and completion tracking',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'progress', 'loading', 'primitive'],
    usage: 'Show progress of operations or completion status',
    props: ['value', 'max', 'variant', 'showLabel', 'animated'],
    example: '<Progress value={75} max={100} variant="success" showLabel />',
    documentation: '/docs/progress',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'spinner',
    name: 'Spinner',
    label: 'Spinner Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Loading spinner with customizable size and animation',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'spinner', 'loading', 'primitive'],
    usage: 'Indicate loading state during async operations',
    props: ['size', 'variant', 'color', 'animated'],
    example: '<Spinner size="md" variant="primary" animated />',
    documentation: '/docs/spinner',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'alert',
    name: 'Alert',
    label: 'Alert Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Notification component for messages and status updates',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'alert', 'notification', 'primitive'],
    usage: 'Display important messages and status updates',
    props: ['variant', 'title', 'children', 'dismissible', 'onDismiss'],
    example: '<Alert variant="warning" title="Warning" dismissible>Important message</Alert>',
    documentation: '/docs/alert',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'table',
    name: 'Table',
    label: 'Table Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Data table with sorting, filtering, and pagination',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'table', 'data', 'primitive'],
    usage: 'Display tabular data with interactive features',
    props: ['data', 'columns', 'sortable', 'filterable', 'pagination'],
    example: '<Table data={tableData} columns={columns} sortable filterable />',
    documentation: '/docs/table',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'form',
    name: 'Form',
    label: 'Form Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Form wrapper with validation and error handling',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'form', 'validation', 'primitive'],
    usage: 'Create forms with built-in validation and error handling',
    props: ['onSubmit', 'validation', 'children', 'initialValues'],
    example: '<Form onSubmit={handleSubmit} validation={validationSchema}><FormField name="email" /></Form>',
    documentation: '/docs/form',
    dependencies: ['react', 'react-hook-form', 'tailwindcss']
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    label: 'Checkbox Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Checkbox input with custom styling and states',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'checkbox', 'input', 'primitive'],
    usage: 'Boolean input for forms and selections',
    props: ['checked', 'onChange', 'label', 'disabled', 'indeterminate'],
    example: '<Checkbox checked={isChecked} onChange={setChecked} label="Accept terms" />',
    documentation: '/docs/checkbox',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'radio',
    name: 'Radio',
    label: 'Radio Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Radio button input for single selection from options',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'radio', 'input', 'primitive'],
    usage: 'Single selection from multiple options',
    props: ['value', 'onChange', 'options', 'name', 'disabled'],
    example: '<Radio value={selectedValue} onChange={setValue} options={radioOptions} />',
    documentation: '/docs/radio',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'switch',
    name: 'Switch',
    label: 'Switch Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Toggle switch for boolean values with smooth animation',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'switch', 'toggle', 'primitive'],
    usage: 'Toggle boolean values with visual feedback',
    props: ['checked', 'onChange', 'disabled', 'size', 'color'],
    example: '<Switch checked={isEnabled} onChange={setEnabled} size="md" />',
    documentation: '/docs/switch',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'slider',
    name: 'Slider',
    label: 'Slider Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Range input slider for numeric value selection',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'slider', 'range', 'primitive'],
    usage: 'Select numeric values within a range',
    props: ['value', 'onChange', 'min', 'max', 'step', 'marks'],
    example: '<Slider value={sliderValue} onChange={setValue} min={0} max={100} step={5} />',
    documentation: '/docs/slider',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'avatar',
    name: 'Avatar',
    label: 'Avatar Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'User avatar with image, initials, or icon fallback',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'avatar', 'user', 'primitive'],
    usage: 'Display user profile pictures or initials',
    props: ['src', 'alt', 'name', 'size', 'variant'],
    example: '<Avatar src={userImage} alt={userName} size="md" />',
    documentation: '/docs/avatar',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    label: 'Breadcrumb Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Navigation breadcrumb showing current page hierarchy',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'breadcrumb', 'navigation', 'primitive'],
    usage: 'Show navigation hierarchy and current location',
    props: ['items', 'separator', 'onItemClick', 'maxItems'],
    example: '<Breadcrumb items={breadcrumbItems} separator="/" />',
    documentation: '/docs/breadcrumb',
    dependencies: ['react', 'tailwindcss']
  },
  {
    id: 'pagination',
    name: 'Pagination',
    label: 'Pagination Component',
    version: '1.0.0',
    date: '2025-01-08',
    description: 'Page navigation for large datasets and content',
    phase: 'Core',
    category: 'UI Primitives',
    tags: ['core', 'ui', 'pagination', 'navigation', 'primitive'],
    usage: 'Navigate through paginated content',
    props: ['currentPage', 'totalPages', 'onPageChange', 'showSizeChanger'],
    example: '<Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />',
    documentation: '/docs/pagination',
    dependencies: ['react', 'tailwindcss']
  }
]

// Component Preview Renderer using UNBOUND design system
const ComponentPreview: React.FC<{ componentId: string }> = ({ componentId }) => {
  const [sliderValue, setSliderValue] = useState(50)
  const [switchValue, setSwitchValue] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [progressValue] = useState(66)

  const previews: Record<string, React.ReactNode> = {
    // UI Primitives
    'button': (
      <div className="flex flex-wrap gap-2">
        <Button variant="default" className="h-8 px-3 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700">Primary</Button>
        <Button variant="outline" className="h-8 px-3 text-xs border border-gray-300 rounded-md hover:bg-gray-50">Outline</Button>
        <Button variant="ghost" className="h-8 px-3 text-xs hover:bg-gray-100 rounded-md">Ghost</Button>
      </div>
    ),
    'card': (
      <div className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-3">
        <h4 className="text-sm font-semibold mb-1">Card Title</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">Card content example</p>
      </div>
    ),
    'input': (
      <Input placeholder="Enter text..." className="h-8 text-xs" />
    ),
    'badge': (
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">Default</Badge>
        <Badge className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">Success</Badge>
        <Badge className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">Error</Badge>
      </div>
    ),
    'switch': (
      <div className="flex items-center gap-2">
        <Switch checked={switchValue} onCheckedChange={setSwitchValue} />
        <span className="text-xs">{switchValue ? 'On' : 'Off'}</span>
      </div>
    ),
    'checkbox': (
      <div className="flex items-center gap-2">
        <Checkbox checked={checkboxValue} onCheckedChange={setCheckboxValue} />
        <Label className="text-xs">Accept terms</Label>
      </div>
    ),
    'slider': (
      <div className="w-full">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Value: {sliderValue}</p>
      </div>
    ),
    'progress': (
      <div className="w-full">
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressValue}%` }}></div>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{progressValue}% complete</p>
      </div>
    ),
    'alert': (
      <div className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-blue-900 dark:text-blue-100">Info Alert</p>
          <p className="text-xs text-blue-700 dark:text-blue-200">This is an alert message</p>
        </div>
      </div>
    ),
    'avatar': (
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">JD</div>
        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-semibold">AB</div>
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-semibold">CD</div>
      </div>
    ),
    'tabs': (
      <div className="w-full">
        <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700">
          <button className="px-3 py-1.5 text-xs font-medium border-b-2 border-blue-600 text-blue-600">Tab 1</button>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900">Tab 2</button>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900">Tab 3</button>
        </div>
      </div>
    ),
    'modal': (
      <button className="h-8 px-3 text-xs border border-gray-300 rounded-md hover:bg-gray-50">Open Modal</button>
    ),
    'dropdown': (
      <Select className="h-8 text-xs">
        <option>Select option</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    ),
    'accordion': (
      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-2">
        <div className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-medium">Accordion Item</span>
          <span className="text-gray-400 text-xs">▼</span>
        </div>
      </div>
    ),
    'tooltip': (
      <button className="h-8 px-3 text-xs border border-gray-300 rounded-md hover:bg-gray-50">Hover me</button>
    ),
    'spinner': (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    ),
    'table': (
      <div className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded">
        <div className="grid grid-cols-3 gap-1 p-2 bg-gray-50 dark:bg-gray-800 font-medium border-b">
          <span>Name</span>
          <span>Status</span>
          <span>Date</span>
        </div>
        <div className="grid grid-cols-3 gap-1 p-2">
          <span>Item 1</span>
          <span>Active</span>
          <span>2025-01-11</span>
        </div>
      </div>
    ),
    'form': (
      <div className="space-y-2 w-full">
        <Input placeholder="Email" className="h-8 text-xs" />
        <button className="w-full h-8 px-3 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
      </div>
    ),
    'radio': (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          </div>
          <span className="text-xs">Option 1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
          <span className="text-xs">Option 2</span>
        </div>
      </div>
    ),
    'breadcrumb': (
      <div className="flex items-center gap-1 text-xs">
        <span>Home</span>
        <span className="text-gray-400">/</span>
        <span>Components</span>
        <span className="text-gray-400">/</span>
        <span className="font-medium">Breadcrumb</span>
      </div>
    ),
    'pagination': (
      <div className="flex items-center gap-1">
        <button className="w-7 h-7 text-xs bg-blue-600 text-white rounded">1</button>
        <button className="w-7 h-7 text-xs hover:bg-gray-100 rounded">2</button>
        <button className="w-7 h-7 text-xs hover:bg-gray-100 rounded">3</button>
      </div>
    ),
    'separator': (
      <Separator className="w-full" />
    ),
    'textarea': (
      <Textarea placeholder="Enter details..." className="text-xs min-h-[60px]" />
    ),
    'label': (
      <Label className="text-xs">Form Label</Label>
    ),
    // Charts - Visual representations
    'price-chart': (
      <div className="w-full h-16 flex items-end gap-1">
        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
          <div key={i} className="flex-1 bg-blue-600 rounded-t" style={{ height: `${h}%` }}></div>
        ))}
      </div>
    ),
    'leads-chart': (
      <div className="w-16 h-16 rounded-full border-8 border-blue-600 border-t-green-600 border-r-yellow-600 border-b-red-600"></div>
    ),
    // Default preview for components without specific preview
    default: (
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 p-4">
        <Eye className="w-4 h-4" />
        <span>Live preview</span>
      </div>
    )
  }

  // Specific chart previews
  if (componentId === 'price-chart') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[100px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Price History</div>
        <div className="w-full h-12 flex items-end gap-1">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 bg-blue-600 rounded-t" style={{ height: `${h}%` }}></div>
          ))}
        </div>
        <div className="text-xs text-green-600 mt-1">+5.2%</div>
      </div>
    )
  }

  if (componentId === 'leads-chart') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[100px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-8 border-blue-600 border-t-green-600 border-r-yellow-600 border-b-red-600 mb-2"></div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Lead Distribution</div>
        </div>
      </div>
    )
  }

  // Apply default preview to other chart components
  const chartIds = [
    'llm-performance-chart', 'token-usage-chart', 'model-comparison-chart',
    'error-rate-chart', 'request-volume-chart', 'latency-distribution-chart',
    'cost-analysis-chart', 'quality-metrics-chart', 'usage-patterns-chart',
    'quadrant-leader-chart', 'network-graph-chart', 'scatter-plot-chart',
    'bloom-graph-chart', 'timeline-chart', 'word-cloud-chart', 'heatmap-chart',
    'confusion-matrix-chart', 'roc-curve-chart', 'sankey-diagram-chart', 'gantt-chart'
  ]

  if (chartIds.includes(componentId)) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-md p-4 min-h-[100px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Chart Component</p>
        </div>
      </div>
    )
  }

  // Special previews for specific components
  if (componentId === 'power-redact') {
    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-md p-3 min-h-[100px]">
        <div className="mb-2">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sample text with PII:</div>
          <div className="text-xs bg-black text-white p-2 rounded font-mono">
            Email: <span className="bg-red-500 text-white px-1 rounded">████████</span> | 
            Phone: <span className="bg-red-500 text-white px-1 rounded">████████</span>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
            Redact
          </button>
          <button className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700">
            Clear
          </button>
        </div>
      </div>
    )
  }

  if (componentId === 'dashboard-card') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 min-h-[100px]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Dashboard Card</h4>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <div className="mb-1">Value: $1,234</div>
          <div className="text-green-600">+12.5%</div>
        </div>
      </div>
    )
  }

  // Dashboard & advanced components
  const dashboardIds = [
    'item-details-collector', 'photo-processor', 'auto-posting-engine', 
    'lead-monitor', 'negotiation-manager', 'admin-panel', 'message-center'
  ]

  if (dashboardIds.includes(componentId)) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-md p-4 min-h-[100px] flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Feature Component</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-3 min-h-[100px] flex items-center justify-center">
      {previews[componentId] || previews.default}
    </div>
  )
}

// Component Card Component with live preview
const ComponentCard: React.FC<{ component: ComponentMetadata; onClick: () => void }> = ({ 
  component, 
  onClick 
}) => (
  <div 
    className="component-card bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
  >
    {/* Live Preview Section */}
    <div className="border-b border-gray-200 dark:border-slate-700 p-4">
      <ComponentPreview componentId={component.id} />
    </div>
    
    {/* Component Info Section */}
    <div className="p-4 cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {component.label}
        </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
          {component.name}
        </p>
      </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
          {component.phase}
        </span>
      </div>
    </div>
    
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
      {component.description}
    </p>
    
      <div className="flex flex-wrap gap-1 mb-3">
      {component.tags.slice(0, 3).map((tag) => (
        <span 
          key={tag}
            className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
        >
          {tag}
        </span>
      ))}
      {component.tags.length > 3 && (
          <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
          +{component.tags.length - 3}
        </span>
      )}
    </div>
    
    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <Code className="w-3 h-3" />
          {component.category}
        </span>
        <span className="flex items-center gap-1">
          <Eye className="w-3 h-3" />
          v{component.version}
        </span>
      </div>
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
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {component.name} • v{component.version}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {component.description}
            </p>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Usage
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {component.usage}
            </p>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Example
            </h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                {component.example}
              </code>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Properties
            </h3>
            <div className="space-y-2 mb-6">
              {component.props.map((prop) => (
                <div key={prop} className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                    {prop}
                  </span>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {component.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Dependencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {component.dependencies?.map((dep) => (
                <span 
                  key={dep}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                >
                  {dep}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {component.id === 'power-redact' && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Live Demo
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Try the Power Redact plugin on this sample text:
              </p>
              <div id="demo-text" className="text-gray-800 dark:text-gray-200 mb-3">
                My email is john.doe@example.com and my phone number is (555) 123-4567. 
                My SSN is 123-45-6789 and my credit card is 4532-1234-5678-9012.
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (window.powerRedact) {
                      window.powerRedact.showSettings();
                    } else {
                      alert('Power Redact plugin not loaded. Please ensure the script is included.');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Open Settings
                </button>
                <button
                  onClick={() => {
                    if (window.powerRedact) {
                      window.powerRedact.clearAllRedactions();
                    }
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Clear Redactions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)

// Main Component Library Component
export default function ComponentLibrary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [phaseFilter, setPhaseFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<ComponentMetadata | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
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
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Power Components Library
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {componentData.length} components • {filteredComponents.length} filtered
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Grid3x3 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Phases</option>
                {phases.map(phase => (
                  <option key={phase} value={phase}>{phase}</option>
                ))}
              </select>
              
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Tags</option>
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        {filteredComponents.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredComponents.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                onClick={() => setSelectedComponent(component)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No components found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>

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