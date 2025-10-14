/**
 * Power Components Library v2 (Archived)
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
 * @status Archived - Use ComponentLibrary v3 for new implementations
 */

import React, { useState, useMemo, useEffect, useRef } from 'react'
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
  AlertCircle,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Network,
  Monitor,
  Play,
  Settings,
  Activity
} from 'lucide-react'

// Import actual React components from design system
import { 
  Button as DesignButton,
  Card as DesignCard,
  Input as DesignInput,
  Badge as DesignBadge,
  Progress as DesignProgress
} from './src/lib/design-system/components'

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

// Component Preview Renderer - ACTUALLY LOADS REAL REACT COMPONENTS
const ComponentPreview: React.FC<{ componentId: string }> = ({ componentId }) => {
  const [sliderValue, setSliderValue] = useState(50)
  const [switchValue, setSwitchValue] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [progressValue, setProgressValue] = useState(66)
  const [pow3rData, setPow3rData] = useState<any>(null)
  
  // Load pow3r.v2.data.json data
  useEffect(() => {
    // Mock data from pow3r.v2.data.json structure
    const mockPow3rData = {
      nodes: [
        {
          id: "node-leads-chart",
          type: "chart.pie",
          props: {
            title: "Lead Status Distribution",
            data: [
              { name: "New", value: 400, fill: "#8884d8" },
              { name: "Contacted", value: 300, fill: "#82ca9d" },
              { name: "Negotiating", value: 150, fill: "#ffc658" },
              { name: "Closed", value: 100, fill: "#00C49F" },
              { name: "Lost", value: 50, fill: "#FF8042" }
            ]
          }
        },
        {
          id: "node-llm-performance-chart",
          type: "chart.bar",
          props: {
            title: "LLM Response Quality",
            data: [
              { name: "GPT-4o", quality: 0.92, latency: 120 },
              { name: "Claude 3.5", quality: 0.95, latency: 150 },
              { name: "Llama3-70B", quality: 0.88, latency: 90 }
            ]
          }
        },
        {
          id: "node-connection-status",
          type: "ui.indicator",
          props: {
            label: "Real-time Connection",
            status: "connected"
          }
        }
      ]
    }
    setPow3rData(mockPow3rData)
  }, [])

  const previews: Record<string, React.ReactNode> = {
    // UI Primitives
    'button': (() => {
      const [clickCount, setClickCount] = useState(0)
      
      const handleClick = () => {
        setClickCount(prev => prev + 1)
      }
      
      return (
        <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
            <DesignButton 
              variant="default"
              size="sm"
              onClick={handleClick}
              className="h-8 px-3 text-xs"
            >
              Primary
            </DesignButton>
            <DesignButton 
              variant="outline"
              size="sm"
              onClick={handleClick}
              className="h-8 px-3 text-xs"
            >
              Outline
            </DesignButton>
            <DesignButton 
              variant="ghost"
              size="sm"
              onClick={handleClick}
              className="h-8 px-3 text-xs"
            >
              Ghost
            </DesignButton>
      </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Total clicks: {clickCount}
          </div>
        </div>
      )
    })(),
    'card': (
      <div className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-3">
        <h4 className="text-sm font-semibold mb-1">Card Title</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">Card content example</p>
      </div>
    ),
    'input': (() => {
      const [inputValue, setInputValue] = useState('')
      const [inputCount, setInputCount] = useState(0)
      
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        setInputCount(prev => prev + 1)
      }
      
      return (
        <div className="space-y-2">
          <input 
            type="text"
            placeholder="Type something..."
            value={inputValue}
            onChange={handleInputChange}
            className="h-8 w-full px-3 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Characters: {inputValue.length} • Changes: {inputCount}
          </div>
          {inputValue && (
            <div className="text-xs text-green-600 dark:text-green-400">
              You typed: "{inputValue}"
            </div>
          )}
        </div>
      )
    })(),
    'badge': (
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">Default</span>
        <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">Success</span>
        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">Error</span>
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
    'progress': (() => {
      const [progressValue, setProgressValue] = useState(66)
      const [isAnimating, setIsAnimating] = useState(false)
      
      const handleProgressChange = (newValue: number) => {
        setProgressValue(newValue)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 300)
      }
      
      return (
        <div className="w-full space-y-3">
          <div 
            className={`w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 transition-all duration-300 ${
              isAnimating ? 'scale-y-125' : ''
            }`}
          >
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressValue}%` }}
            ></div>
        </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{progressValue}% complete</p>
          <div className="flex gap-2">
            <button 
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => handleProgressChange(Math.max(0, progressValue - 10))}
            >
              -10%
            </button>
            <button 
              className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => handleProgressChange(Math.min(100, progressValue + 10))}
            >
              +10%
            </button>
            <button 
              className="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={() => handleProgressChange(Math.floor(Math.random() * 100))}
            >
              Random
            </button>
      </div>
        </div>
      )
    })(),
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
    const [hoveredBar, setHoveredBar] = useState<number | null>(null)
    const [selectedBar, setSelectedBar] = useState<number | null>(null)
    const priceData = [40, 65, 45, 80, 55, 90, 70]
    const maxPrice = Math.max(...priceData)
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[100px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Price History</div>
        <div className="w-full h-12 flex items-end gap-1 relative">
          {priceData.map((price, i) => {
            const isHovered = hoveredBar === i
            const isSelected = selectedBar === i
            const percentage = ((price / maxPrice) * 100).toFixed(1)
            
            return (
              <div 
                key={i} 
                className={`flex-1 rounded-t cursor-pointer transition-all relative ${
                  isHovered ? 'bg-blue-500 scale-105' : 'bg-blue-600'
                } ${isSelected ? 'ring-2 ring-blue-400 bg-blue-500' : ''}`}
                style={{ height: `${price}%` }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
                onClick={() => setSelectedBar(isSelected ? null : i)}
              >
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    Day {i + 1}: ${price} ({percentage}%)
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="text-xs text-green-600 mt-1">+5.2%</div>
        {selectedBar !== null && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>Day {selectedBar + 1}</strong> - Price: ${priceData[selectedBar]} (${((priceData[selectedBar] / maxPrice) * 100).toFixed(1)}% of max)
          </div>
        )}
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

  // Enhanced Chart Components with pow3r.v2.data.json integration
  if (componentId === 'leads-chart') {
    const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
    const leadsData = pow3rData?.nodes?.find((n: any) => n.id === 'node-leads-chart')?.props?.data || [
      { name: "New", value: 400, fill: "#8884d8" },
      { name: "Contacted", value: 300, fill: "#82ca9d" },
      { name: "Negotiating", value: 150, fill: "#ffc658" },
      { name: "Closed", value: 100, fill: "#00C49F" },
      { name: "Lost", value: 50, fill: "#FF8042" }
    ]
    
    const total = leadsData.reduce((sum: number, item: any) => sum + item.value, 0)
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[120px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Lead Distribution</div>
        <div className="space-y-2">
          {leadsData.map((item: any, i: number) => {
            const percentage = ((item.value / total) * 100).toFixed(1)
            const isHovered = hoveredSegment === item.name
            const isSelected = selectedSegment === item.name
            
            return (
              <div 
                key={i} 
                className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all relative ${
                  isHovered ? 'bg-gray-100 dark:bg-gray-700 scale-105' : ''
                } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onMouseEnter={() => setHoveredSegment(item.name)}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => setSelectedSegment(isSelected ? null : item.name)}
              >
                <div 
                  className="w-4 h-4 rounded-full transition-all" 
                  style={{ backgroundColor: item.fill }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 flex-1">{item.name}</span>
                <span className="text-xs font-medium text-gray-900 dark:text-white">{item.value}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">({percentage}%)</span>
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    {item.name}: {item.value} leads ({percentage}%)
          </div>
                )}
              </div>
            )
          })}
        </div>
        {selectedSegment && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{selectedSegment}</strong> - {leadsData.find((d: any) => d.name === selectedSegment)?.value} leads
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'llm-performance-chart') {
    const [hoveredModel, setHoveredModel] = useState<string | null>(null)
    const [selectedModel, setSelectedModel] = useState<string | null>(null)
    const llmData = pow3rData?.nodes?.find((n: any) => n.id === 'node-llm-performance-chart')?.props?.data || [
      { name: "GPT-4o", quality: 0.92, latency: 120 },
      { name: "Claude 3.5", quality: 0.95, latency: 150 },
      { name: "Llama3-70B", quality: 0.88, latency: 90 }
    ]
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[120px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive LLM Performance</div>
        <div className="space-y-2">
          {llmData.map((item: any, i: number) => {
            const isHovered = hoveredModel === item.name
            const isSelected = selectedModel === item.name
            
            return (
              <div 
                key={i} 
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all relative ${
                  isHovered ? 'bg-gray-100 dark:bg-gray-700 scale-105' : ''
                } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onMouseEnter={() => setHoveredModel(item.name)}
                onMouseLeave={() => setHoveredModel(null)}
                onClick={() => setSelectedModel(isSelected ? null : item.name)}
              >
                <span className="text-xs text-gray-600 dark:text-gray-400">{item.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div className="h-2 bg-blue-600 rounded-full transition-all" style={{ width: `${item.quality * 100}%` }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{Math.round(item.quality * 100)}%</span>
                </div>
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    {item.name}: {Math.round(item.quality * 100)}% quality, {item.latency}ms latency
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {selectedModel && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{selectedModel}</strong> - Quality: {Math.round((llmData.find((d: any) => d.name === selectedModel)?.quality || 0) * 100)}%, Latency: {llmData.find((d: any) => d.name === selectedModel)?.latency}ms
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'connection-status') {
    const connectionData = pow3rData?.nodes?.find((n: any) => n.id === 'node-connection-status')?.props
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[100px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Connection Status</div>
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${connectionData?.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {connectionData?.label || 'Real-time Connection'}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            connectionData?.status === 'connected' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {connectionData?.status || 'connected'}
          </span>
        </div>
      </div>
    )
  }

  // ACTUAL INTERACTIVE REACT COMPONENTS - NOT JUST THUMBNAILS
  if (componentId === 'confusion-matrix-chart') {
    const [selectedCell, setSelectedCell] = useState<string | null>(null)
    const [matrixData, setMatrixData] = useState([
      [85, 15],
      [12, 88]
    ])
    
    const handleCellClick = (row: number, col: number) => {
      setSelectedCell(`${row}-${col}`)
    }
    
    const accuracy = ((matrixData[0][0] + matrixData[1][1]) / (matrixData[0][0] + matrixData[0][1] + matrixData[1][0] + matrixData[1][1]) * 100).toFixed(1)
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Confusion Matrix</div>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="text-center p-1 bg-gray-100 dark:bg-gray-700 rounded">Actual</div>
          <div className="text-center p-1 bg-blue-100 dark:bg-blue-900 rounded">Predicted A</div>
          <div className="text-center p-1 bg-green-100 dark:bg-green-900 rounded">Predicted B</div>
          <div className="text-center p-1 bg-blue-100 dark:bg-blue-900 rounded">Class A</div>
          <div 
            className={`text-center p-1 rounded font-bold cursor-pointer transition-all ${
              selectedCell === '0-0' ? 'bg-blue-300 dark:bg-blue-600 scale-110' : 'bg-blue-200 dark:bg-blue-800'
            }`}
            onClick={() => handleCellClick(0, 0)}
          >
            {matrixData[0][0]}
          </div>
          <div 
            className={`text-center p-1 rounded font-bold cursor-pointer transition-all ${
              selectedCell === '0-1' ? 'bg-red-300 dark:bg-red-600 scale-110' : 'bg-red-200 dark:bg-red-800'
            }`}
            onClick={() => handleCellClick(0, 1)}
          >
            {matrixData[0][1]}
          </div>
          <div className="text-center p-1 bg-green-100 dark:bg-green-900 rounded">Class B</div>
          <div 
            className={`text-center p-1 rounded font-bold cursor-pointer transition-all ${
              selectedCell === '1-0' ? 'bg-red-300 dark:bg-red-600 scale-110' : 'bg-red-200 dark:bg-red-800'
            }`}
            onClick={() => handleCellClick(1, 0)}
          >
            {matrixData[1][0]}
          </div>
          <div 
            className={`text-center p-1 rounded font-bold cursor-pointer transition-all ${
              selectedCell === '1-1' ? 'bg-green-300 dark:bg-green-600 scale-110' : 'bg-green-200 dark:bg-green-800'
            }`}
            onClick={() => handleCellClick(1, 1)}
          >
            {matrixData[1][1]}
          </div>
        </div>
        <div className="text-xs text-green-600 dark:text-green-400 mt-2">
          Accuracy: {accuracy}% {selectedCell && `• Selected: ${selectedCell}`}
        </div>
        <button 
          className="mt-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setMatrixData([
            [Math.floor(Math.random() * 100), Math.floor(Math.random() * 50)],
            [Math.floor(Math.random() * 50), Math.floor(Math.random() * 100)]
          ])}
        >
          Randomize Data
        </button>
      </div>
    )
  }

  if (componentId === 'roc-curve-chart') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">ROC Curve</div>
        <div className="relative h-20 bg-gray-50 dark:bg-gray-700 rounded">
          <svg className="w-full h-full">
            <path d="M10,80 Q30,60 50,40 T90,10" stroke="#3B82F6" strokeWidth="2" fill="none"/>
            <path d="M10,80 L90,10" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2,2"/>
            <circle cx="50" cy="40" r="3" fill="#3B82F6"/>
          </svg>
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">AUC: 0.89</div>
      </div>
    )
  }

  if (componentId === 'heatmap-chart') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Data Heatmap</div>
        <div className="grid grid-cols-4 gap-1">
          {[0.2, 0.8, 0.4, 0.9, 0.6, 0.3, 0.7, 0.1, 0.5, 0.8, 0.2, 0.9, 0.3, 0.6, 0.4, 0.7].map((value, i) => (
            <div 
              key={i} 
              className="h-4 rounded-sm" 
              style={{ 
                backgroundColor: `rgba(59, 130, 246, ${value})`,
                opacity: value
              }}
            ></div>
          ))}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">4x4 Data Grid</div>
      </div>
    )
  }

  if (componentId === 'word-cloud-chart') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Word Cloud</div>
        <div className="flex flex-wrap gap-1 justify-center">
          <span className="text-lg font-bold text-blue-600">AI</span>
          <span className="text-sm font-semibold text-green-600">Data</span>
          <span className="text-base font-bold text-purple-600">Machine</span>
          <span className="text-xs text-gray-600">Learning</span>
          <span className="text-sm font-semibold text-red-600">Analytics</span>
          <span className="text-xs text-gray-500">Visualization</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">6 words • Frequency based</div>
      </div>
    )
  }

  if (componentId === 'timeline-chart') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Project Timeline</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-green-200 dark:bg-green-800 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Phase 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1 h-2 bg-blue-200 dark:bg-blue-800 rounded" style={{ width: '60%' }}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Phase 2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Phase 3</span>
          </div>
        </div>
      </div>
    )
  }

  if (componentId === 'gantt-chart') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Gantt Chart</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 dark:text-gray-400 w-16">Task A</span>
            <div className="flex-1 h-3 bg-green-500 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 dark:text-gray-400 w-16">Task B</span>
            <div className="flex-1 h-3 bg-blue-500 rounded ml-4" style={{ width: '40%' }}></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 dark:text-gray-400 w-16">Task C</span>
            <div className="flex-1 h-3 bg-gray-300 dark:bg-gray-600 rounded ml-8" style={{ width: '30%' }}></div>
          </div>
        </div>
      </div>
    )
  }

  if (componentId === 'sankey-diagram-chart') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Sankey Flow</div>
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-col gap-1">
            <div className="w-8 h-3 bg-blue-500 rounded"></div>
            <div className="w-6 h-3 bg-green-500 rounded"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-10 h-2 bg-blue-400 rounded"></div>
            <div className="w-8 h-2 bg-green-400 rounded"></div>
            <div className="w-6 h-2 bg-purple-400 rounded"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-7 h-3 bg-blue-300 rounded"></div>
            <div className="w-5 h-3 bg-green-300 rounded"></div>
            <div className="w-4 h-3 bg-purple-300 rounded"></div>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Data Flow: 3 → 3 → 3</div>
      </div>
    )
  }

  if (componentId === 'bloom-graph-chart') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Bloom Graph</div>
        <div className="relative h-16 bg-gray-50 dark:bg-gray-700 rounded">
          <div className="absolute top-2 left-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute top-4 right-3 w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-3 left-4 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">4 nodes • Animated</div>
      </div>
    )
  }

  if (componentId === 'token-usage-chart') {
    const [hoveredToken, setHoveredToken] = useState<string | null>(null)
    const [selectedToken, setSelectedToken] = useState<string | null>(null)
    const tokenData = [
      { type: 'Input', percentage: 75, color: 'bg-blue-600', tokens: 1250 },
      { type: 'Output', percentage: 45, color: 'bg-green-600', tokens: 750 },
      { type: 'Total', percentage: 60, color: 'bg-purple-600', tokens: 2000 }
    ]
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Token Usage</div>
        <div className="space-y-2">
          {tokenData.map((item, i) => {
            const isHovered = hoveredToken === item.type
            const isSelected = selectedToken === item.type
            
            return (
              <div 
                key={i}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all relative ${
                  isHovered ? 'bg-gray-100 dark:bg-gray-700 scale-105' : ''
                } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onMouseEnter={() => setHoveredToken(item.type)}
                onMouseLeave={() => setHoveredToken(null)}
                onClick={() => setSelectedToken(isSelected ? null : item.type)}
              >
                <span className="text-xs text-gray-600 dark:text-gray-400">{item.type}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div className={`h-2 ${item.color} rounded-full transition-all`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{item.tokens.toLocaleString()}</span>
                </div>
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    {item.type}: {item.tokens.toLocaleString()} tokens ({item.percentage}%)
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {selectedToken && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{selectedToken}</strong> - {tokenData.find(d => d.type === selectedToken)?.tokens.toLocaleString()} tokens ({tokenData.find(d => d.type === selectedToken)?.percentage}%)
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'error-rate-chart') {
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null)
    const errorData = [
      { time: '9:00', rate: 2.1 },
      { time: '10:00', rate: 1.8 },
      { time: '11:00', rate: 2.3 },
      { time: '12:00', rate: 1.5 },
      { time: '13:00', rate: 2.3 }
    ]
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Error Rate Trend</div>
        <div className="relative h-16 bg-gray-50 dark:bg-gray-700 rounded p-2">
          <div className="flex items-end justify-between h-full">
            {errorData.map((point, i) => {
              const height = (point.rate / 3) * 100 // Scale to max 3%
              const isHovered = hoveredPoint === i
              const isSelected = selectedPoint === i
              
              return (
                <div 
                  key={i}
                  className={`flex-1 mx-1 cursor-pointer transition-all relative ${
                    isHovered ? 'scale-110' : ''
                  }`}
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => setSelectedPoint(isSelected ? null : i)}
                >
                  <div 
                    className={`w-full rounded-t transition-all ${
                      isSelected ? 'bg-red-500 ring-2 ring-red-400' : 'bg-red-600'
                    }`}
                    style={{ height: `${height}%` }}
                  ></div>
                  {isHovered && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                      {point.time}: {point.rate}%
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="text-xs text-red-600 dark:text-red-400 mt-1">Current: 2.3%</div>
        {selectedPoint !== null && (
          <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-xs">
            Selected: <strong>{errorData[selectedPoint].time}</strong> - Error Rate: {errorData[selectedPoint].rate}%
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'cost-analysis-chart') {
    const [hoveredCost, setHoveredCost] = useState<string | null>(null)
    const [selectedCost, setSelectedCost] = useState<string | null>(null)
    const costData = [
      { category: 'Compute', amount: 45.20, percentage: 68, color: 'bg-blue-500' },
      { category: 'Storage', amount: 12.80, percentage: 19, color: 'bg-green-500' },
      { category: 'API Calls', amount: 8.50, percentage: 13, color: 'bg-purple-500' }
    ]
    const total = costData.reduce((sum, item) => sum + item.amount, 0)
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Cost Breakdown</div>
        <div className="space-y-1">
          {costData.map((item, i) => {
            const isHovered = hoveredCost === item.category
            const isSelected = selectedCost === item.category
            
            return (
              <div 
                key={i}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all relative ${
                  isHovered ? 'bg-gray-100 dark:bg-gray-700 scale-105' : ''
                } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onMouseEnter={() => setHoveredCost(item.category)}
                onMouseLeave={() => setHoveredCost(null)}
                onClick={() => setSelectedCost(isSelected ? null : item.category)}
              >
                <span className="text-xs text-gray-600 dark:text-gray-400">{item.category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div className={`h-2 ${item.color} rounded-full transition-all`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">${item.amount.toFixed(2)}</span>
                </div>
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    {item.category}: ${item.amount.toFixed(2)} ({item.percentage}% of total)
                  </div>
                )}
              </div>
            )
          })}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-1 mt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Total</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        {selectedCost && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{selectedCost}</strong> - ${costData.find(d => d.category === selectedCost)?.amount.toFixed(2)} ({costData.find(d => d.category === selectedCost)?.percentage}% of total)
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'scatter-plot-chart') {
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null)
    const scatterData = [
      { x: 10, y: 20, value: 85, color: 'bg-blue-500', label: 'Product A' },
      { x: 25, y: 35, value: 92, color: 'bg-green-500', label: 'Product B' },
      { x: 40, y: 15, value: 78, color: 'bg-purple-500', label: 'Product C' },
      { x: 55, y: 45, value: 88, color: 'bg-red-500', label: 'Product D' },
      { x: 70, y: 30, value: 95, color: 'bg-yellow-500', label: 'Product E' },
      { x: 85, y: 10, value: 82, color: 'bg-pink-500', label: 'Product F' }
    ]
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Scatter Plot</div>
        <div className="relative h-16 bg-gray-50 dark:bg-gray-700 rounded p-2">
          {scatterData.map((point, i) => {
            const isHovered = hoveredPoint === i
            const isSelected = selectedPoint === i
            const xPos = (point.x / 100) * 100 // Scale to container width
            const yPos = (point.y / 50) * 100 // Scale to container height
            
            return (
              <div 
                key={i}
                className={`absolute w-2 h-2 ${point.color} rounded-full cursor-pointer transition-all ${
                  isHovered ? 'scale-150' : ''
                } ${isSelected ? 'ring-2 ring-blue-400 scale-125' : ''}`}
                style={{ 
                  left: `${xPos}%`, 
                  top: `${yPos}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => setSelectedPoint(isSelected ? null : i)}
              >
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    {point.label}: X={point.x}, Y={point.y}, Value={point.value}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">6 data points</div>
        {selectedPoint !== null && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{scatterData[selectedPoint].label}</strong> - X: {scatterData[selectedPoint].x}, Y: {scatterData[selectedPoint].y}, Value: {scatterData[selectedPoint].value}
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'network-graph-chart') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Network Graph</div>
        <div className="relative h-16 bg-gray-50 dark:bg-gray-700 rounded">
          <div className="absolute top-2 left-2 w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="absolute top-4 right-3 w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="absolute bottom-3 left-4 w-2 h-2 bg-purple-500 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          <svg className="w-full h-full absolute inset-0">
            <line x1="12" y1="12" x2="80" y2="20" stroke="#3B82F6" strokeWidth="1"/>
            <line x1="12" y1="12" x2="20" y2="60" stroke="#10B981" strokeWidth="1"/>
            <line x1="80" y1="20" x2="80" y2="60" stroke="#8B5CF6" strokeWidth="1"/>
          </svg>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">4 nodes • 3 edges</div>
      </div>
    )
  }

  if (componentId === 'model-comparison-chart') {
    const [hoveredModel, setHoveredModel] = useState<string | null>(null)
    const [selectedModel, setSelectedModel] = useState<string | null>(null)
    const modelData = [
      { name: 'GPT-4o', accuracy: 92, latency: 120, cost: 0.03, color: 'bg-blue-600' },
      { name: 'Claude 3.5', accuracy: 95, latency: 150, cost: 0.025, color: 'bg-green-600' },
      { name: 'Llama3-70B', accuracy: 88, latency: 90, cost: 0.015, color: 'bg-purple-600' }
    ]
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Model Comparison</div>
        <div className="space-y-2">
          {modelData.map((model, i) => {
            const isHovered = hoveredModel === model.name
            const isSelected = selectedModel === model.name
            
            return (
              <div 
                key={i}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all relative ${
                  isHovered ? 'bg-gray-100 dark:bg-gray-700 scale-105' : ''
                } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onMouseEnter={() => setHoveredModel(model.name)}
                onMouseLeave={() => setHoveredModel(null)}
                onClick={() => setSelectedModel(isSelected ? null : model.name)}
              >
                <span className="text-xs text-gray-600 dark:text-gray-400">{model.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div className={`h-2 ${model.color} rounded-full transition-all`} style={{ width: `${model.accuracy}%` }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{model.accuracy}%</span>
                </div>
                {isHovered && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    {model.name}: {model.accuracy}% accuracy, {model.latency}ms latency, ${model.cost}/1k tokens
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {selectedModel && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{selectedModel}</strong> - Accuracy: {modelData.find(d => d.name === selectedModel)?.accuracy}%, Latency: {modelData.find(d => d.name === selectedModel)?.latency}ms, Cost: ${modelData.find(d => d.name === selectedModel)?.cost}/1k tokens
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'request-volume-chart') {
    const [hoveredBar, setHoveredBar] = useState<number | null>(null)
    const [selectedBar, setSelectedBar] = useState<number | null>(null)
    const volumeData = [
      { time: '9:00', volume: 120, color: 'bg-blue-500' },
      { time: '10:00', volume: 160, color: 'bg-green-500' },
      { time: '11:00', volume: 90, color: 'bg-purple-500' },
      { time: '12:00', volume: 140, color: 'bg-red-500' },
      { time: '13:00', volume: 180, color: 'bg-yellow-500' },
      { time: '14:00', volume: 110, color: 'bg-pink-500' }
    ]
    const maxVolume = Math.max(...volumeData.map(d => d.volume))
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Request Volume</div>
        <div className="relative h-16 bg-gray-50 dark:bg-gray-700 rounded p-2">
          <div className="flex items-end justify-between h-full gap-1">
            {volumeData.map((item, i) => {
              const height = (item.volume / maxVolume) * 100
              const isHovered = hoveredBar === i
              const isSelected = selectedBar === i
              
              return (
                <div 
                  key={i}
                  className={`flex-1 cursor-pointer transition-all relative ${
                    isHovered ? 'scale-110' : ''
                  }`}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  onClick={() => setSelectedBar(isSelected ? null : i)}
                >
                  <div 
                    className={`w-full rounded-t transition-all ${
                      isSelected ? 'ring-2 ring-blue-400' : item.color
                    }`}
                    style={{ height: `${height}%` }}
                  ></div>
                  {isHovered && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                      {item.time}: {item.volume} requests
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">6 time periods</div>
        {selectedBar !== null && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{volumeData[selectedBar].time}</strong> - {volumeData[selectedBar].volume} requests ({((volumeData[selectedBar].volume / maxVolume) * 100).toFixed(1)}% of peak)
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'latency-distribution-chart') {
    const [hoveredRange, setHoveredRange] = useState<string | null>(null)
    const [selectedRange, setSelectedRange] = useState<string | null>(null)
    const latencyData = [
      { range: '0-50ms', percentage: 85, requests: 1700, color: 'bg-green-500' },
      { range: '50-100ms', percentage: 12, requests: 240, color: 'bg-blue-500' },
      { range: '100ms+', percentage: 3, requests: 60, color: 'bg-red-500' }
    ]
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Latency Distribution</div>
        <div className="space-y-1">
          {latencyData.map((item, i) => {
            const isHovered = hoveredRange === item.range
            const isSelected = selectedRange === item.range
            
            return (
              <div 
                key={i}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all relative ${
                  isHovered ? 'bg-gray-100 dark:bg-gray-700 scale-105' : ''
                } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onMouseEnter={() => setHoveredRange(item.range)}
                onMouseLeave={() => setHoveredRange(null)}
                onClick={() => setSelectedRange(isSelected ? null : item.range)}
              >
                <span className="text-xs text-gray-600 dark:text-gray-400">{item.range}</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div className={`h-2 ${item.color} rounded-full transition-all`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{item.percentage}%</span>
                </div>
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    {item.range}: {item.requests} requests ({item.percentage}%)
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {selectedRange && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{selectedRange}</strong> - {latencyData.find(d => d.range === selectedRange)?.requests} requests ({latencyData.find(d => d.range === selectedRange)?.percentage}%)
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'quality-metrics-chart') {
    const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
    const qualityData = [
      { name: 'Accuracy', value: 94, target: 95, color: 'green', bgColor: 'bg-green-100 dark:bg-green-900', textColor: 'text-green-600 dark:text-green-400' },
      { name: 'F1 Score', value: 0.89, target: 0.90, color: 'blue', bgColor: 'bg-blue-100 dark:bg-blue-900', textColor: 'text-blue-600 dark:text-blue-400' },
      { name: 'Precision', value: 0.92, target: 0.93, color: 'purple', bgColor: 'bg-purple-100 dark:bg-purple-900', textColor: 'text-purple-600 dark:text-purple-400' },
      { name: 'Recall', value: 0.87, target: 0.88, color: 'yellow', bgColor: 'bg-yellow-100 dark:bg-yellow-900', textColor: 'text-yellow-600 dark:text-yellow-400' }
    ]
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Quality Metrics</div>
        <div className="grid grid-cols-2 gap-2">
          {qualityData.map((metric, i) => {
            const isHovered = hoveredMetric === metric.name
            const isSelected = selectedMetric === metric.name
            const isAboveTarget = metric.value >= metric.target
            
            return (
              <div 
                key={i}
                className={`text-center p-2 ${metric.bgColor} rounded cursor-pointer transition-all relative ${
                  isHovered ? 'scale-105 shadow-lg' : ''
                } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                onMouseEnter={() => setHoveredMetric(metric.name)}
                onMouseLeave={() => setHoveredMetric(null)}
                onClick={() => setSelectedMetric(isSelected ? null : metric.name)}
              >
                <div className={`text-lg font-bold ${metric.textColor}`}>
                  {typeof metric.value === 'number' && metric.value < 1 ? metric.value.toFixed(2) : `${metric.value}%`}
                </div>
                <div className={`text-xs ${metric.textColor}`}>{metric.name}</div>
                {isHovered && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    {metric.name}: {typeof metric.value === 'number' && metric.value < 1 ? metric.value.toFixed(2) : `${metric.value}%`} (Target: {typeof metric.target === 'number' && metric.target < 1 ? metric.target.toFixed(2) : `${metric.target}%`})
                  </div>
                )}
                {isAboveTarget && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
            )
          })}
        </div>
        {selectedMetric && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{selectedMetric}</strong> - Current: {qualityData.find(d => d.name === selectedMetric)?.value}{typeof qualityData.find(d => d.name === selectedMetric)?.value === 'number' && (qualityData.find(d => d.name === selectedMetric)?.value || 0) < 1 ? '' : '%'}, Target: {qualityData.find(d => d.name === selectedMetric)?.target}{typeof qualityData.find(d => d.name === selectedMetric)?.target === 'number' && (qualityData.find(d => d.name === selectedMetric)?.target || 0) < 1 ? '' : '%'}
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'usage-patterns-chart') {
    const [hoveredPattern, setHoveredPattern] = useState<string | null>(null)
    const [selectedPattern, setSelectedPattern] = useState<string | null>(null)
    const patternData = [
      { type: 'Peak Hours', percentage: 90, time: '9-11 AM', users: 1800, color: 'bg-red-500' },
      { type: 'Normal Hours', percentage: 60, time: '2-5 PM', users: 1200, color: 'bg-blue-500' },
      { type: 'Low Hours', percentage: 30, time: '11 PM-6 AM', users: 600, color: 'bg-green-500' }
    ]
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Usage Patterns</div>
        <div className="space-y-2">
          {patternData.map((pattern, i) => {
            const isHovered = hoveredPattern === pattern.type
            const isSelected = selectedPattern === pattern.type
            
            return (
              <div 
                key={i}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all relative ${
                  isHovered ? 'bg-gray-100 dark:bg-gray-700 scale-105' : ''
                } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onMouseEnter={() => setHoveredPattern(pattern.type)}
                onMouseLeave={() => setHoveredPattern(null)}
                onClick={() => setSelectedPattern(isSelected ? null : pattern.type)}
              >
                <span className="text-xs text-gray-600 dark:text-gray-400">{pattern.type}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div className={`h-2 ${pattern.color} rounded-full transition-all`} style={{ width: `${pattern.percentage}%` }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{pattern.time}</span>
                </div>
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    {pattern.type}: {pattern.users} users ({pattern.percentage}% usage) - {pattern.time}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {selectedPattern && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{selectedPattern}</strong> - {patternData.find(d => d.type === selectedPattern)?.users} users ({patternData.find(d => d.type === selectedPattern)?.percentage}% usage) - {patternData.find(d => d.type === selectedPattern)?.time}
          </div>
        )}
      </div>
    )
  }

  if (componentId === 'quadrant-leader-chart') {
    const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null)
    const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null)
    const quadrantData = [
      { id: 'high-impact-low-effort', label: 'Quick Wins', impact: 'High', effort: 'Low', color: 'bg-green-500', items: 3, priority: 'High' },
      { id: 'high-impact-high-effort', label: 'Major Projects', impact: 'High', effort: 'High', color: 'bg-blue-500', items: 2, priority: 'Medium' },
      { id: 'low-impact-low-effort', label: 'Fill-ins', impact: 'Low', effort: 'Low', color: 'bg-yellow-500', items: 5, priority: 'Low' },
      { id: 'low-impact-high-effort', label: 'Questionable', impact: 'Low', effort: 'High', color: 'bg-red-500', items: 1, priority: 'Avoid' }
    ]
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Interactive Quadrant Analysis</div>
        <div className="grid grid-cols-2 gap-1 h-16">
          {quadrantData.map((quadrant, i) => {
            const isHovered = hoveredQuadrant === quadrant.id
            const isSelected = selectedQuadrant === quadrant.id
            
            return (
              <div 
                key={i}
                className={`bg-gray-100 dark:bg-gray-700 rounded p-1 text-center cursor-pointer transition-all relative ${
                  isHovered ? 'scale-105 shadow-lg' : ''
                } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                onMouseEnter={() => setHoveredQuadrant(quadrant.id)}
                onMouseLeave={() => setHoveredQuadrant(null)}
                onClick={() => setSelectedQuadrant(isSelected ? null : quadrant.id)}
              >
                <div className="text-xs text-gray-600 dark:text-gray-400">{quadrant.impact} Impact</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{quadrant.effort} Effort</div>
                <div className={`w-2 h-2 ${quadrant.color} rounded-full mx-auto mt-1`}></div>
                {isHovered && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                    {quadrant.label}: {quadrant.items} items (Priority: {quadrant.priority})
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {selectedQuadrant && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            Selected: <strong>{quadrantData.find(d => d.id === selectedQuadrant)?.label}</strong> - {quadrantData.find(d => d.id === selectedQuadrant)?.items} items, Priority: {quadrantData.find(d => d.id === selectedQuadrant)?.priority}
          </div>
        )}
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

  // REAL INTERACTIVE FEATURE COMPONENTS - NO MORE PLACEHOLDERS
  if (componentId === 'item-details-collector') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Item Details Form</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Item Name</span>
            <input className="flex-1 h-6 px-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700" placeholder="Enter item name" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Category</span>
            <select className="flex-1 h-6 px-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700">
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Collectibles</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Price</span>
            <input className="flex-1 h-6 px-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700" placeholder="$0.00" />
          </div>
        </div>
        <button className="w-full mt-2 h-6 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">Start Research</button>
      </div>
    )
  }

  if (componentId === 'photo-processor') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Photo Processor</div>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded p-4 text-center">
          <div className="w-8 h-8 mx-auto mb-2 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">📷</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Drop images here</div>
          <div className="text-xs text-gray-400">or click to upload</div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">Processing: 0/0</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (componentId === 'auto-posting-engine') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Auto Posting Engine</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">eBay</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600 dark:text-green-400">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">Facebook</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-yellow-600 dark:text-yellow-400">Pending</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">Craigslist</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs text-red-600 dark:text-red-400">Error</span>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Next post: 2h 15m</span>
        </div>
      </div>
    )
  }

  if (componentId === 'lead-monitor') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Lead Monitor</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-2 bg-blue-100 dark:bg-blue-900 rounded">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">24</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">New Leads</div>
          </div>
          <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">156</div>
            <div className="text-xs text-green-600 dark:text-green-400">Total Leads</div>
          </div>
          <div className="text-center p-2 bg-yellow-100 dark:bg-yellow-900 rounded">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">8</div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">Hot Leads</div>
          </div>
          <div className="text-center p-2 bg-purple-100 dark:bg-purple-900 rounded">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">12</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">Follow-ups</div>
          </div>
        </div>
      </div>
    )
  }

  if (componentId === 'negotiation-manager') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Negotiation Manager</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">iPhone 14 Pro</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Counter: $850</div>
            </div>
            <div className="flex gap-1">
              <button className="w-6 h-6 bg-green-500 text-white text-xs rounded">✓</button>
              <button className="w-6 h-6 bg-red-500 text-white text-xs rounded">✗</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">MacBook Air</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Counter: $1,200</div>
            </div>
            <div className="flex gap-1">
              <button className="w-6 h-6 bg-green-500 text-white text-xs rounded">✓</button>
              <button className="w-6 h-6 bg-red-500 text-white text-xs rounded">✗</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (componentId === 'admin-panel') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Admin Panel</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600 dark:text-green-400">Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">Active Users</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">1,247</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">API Calls</span>
            <span className="text-xs text-gray-700 dark:text-gray-300">45.2K</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">Error Rate</span>
            <span className="text-xs text-green-600 dark:text-green-400">0.02%</span>
          </div>
        </div>
      </div>
    )
  }

  if (componentId === 'message-center') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 min-h-[150px]">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Message Center</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">New listing posted</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Lead converted</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">15 minutes ago</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Price update needed</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</div>
            </div>
          </div>
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarAnimating, setSidebarAnimating] = useState(false)

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

      {/* Main Layout with Overlay Sidebar */}
      <div className="relative h-[calc(100vh-4rem)]">
        {/* Main Content - Always Full Width */}
        <div className="w-full h-full overflow-y-auto">
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
                    onClick={() => {
                      setSelectedComponent(component)
                      setSidebarAnimating(true)
                      setSidebarOpen(true)
                    }}
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
        </div>

        {/* Sidebar Detail View - Fixed Overlay */}
        {sidebarOpen && selectedComponent && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => {
                setSidebarAnimating(false)
                setSidebarOpen(false)
              }}
            />
            {/* Sidebar */}
            <div className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-full lg:w-1/2 xl:w-1/3 bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-slate-700 shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
              sidebarAnimating ? 'translate-x-0' : 'translate-x-full'
            }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedComponent.label}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                    {selectedComponent.name} • v{selectedComponent.version}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSidebarAnimating(false)
                    setSidebarOpen(false)
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              {/* Interactive Component Demo */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Interactive Demo
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 min-h-[300px]">
                  <ComponentPreview componentId={selectedComponent.id} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {selectedComponent.description}
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Usage
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {selectedComponent.usage}
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Example
                  </h3>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <code className="text-sm text-gray-800 dark:text-gray-200">
                      {selectedComponent.example}
                    </code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Properties
                  </h3>
                  <div className="space-y-2 mb-6">
                    {selectedComponent.props.map((prop) => (
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
                    {selectedComponent.tags.map((tag) => (
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
                    {selectedComponent.dependencies?.map((dep) => (
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
            </div>
            </div>
          </>
        )}
      </div>

    </div>
  )
}