/**
 * Simple Library Page - Working Version
 * Bypasses TypeScript errors and focuses on core functionality
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import React, { useState, useMemo } from 'react';
import { Search, Sun, Moon, Palette, Grid3x3, List } from 'lucide-react';

// Component data from our generated file
const componentData = [
  // Dashboard Components (19)
  { id: 'admin-panel', name: 'AdminPanel', category: 'dashboard', description: 'System administration and oversight', tags: ['admin', 'management', 'system'] },
  { id: 'ai-response-system', name: 'AIResponseSystem', category: 'dashboard', description: 'AI-powered response management', tags: ['ai', 'automation', 'response'] },
  { id: 'analytics-dashboard', name: 'AnalyticsDashboard', category: 'dashboard', description: 'Comprehensive analytics overview', tags: ['analytics', 'metrics', 'dashboard'] },
  { id: 'business-dashboard', name: 'BusinessDashboard', category: 'dashboard', description: 'Business intelligence dashboard', tags: ['business', 'intelligence', 'overview'] },
  { id: 'chart-gallery', name: 'ChartGallery', category: 'dashboard', description: 'Interactive chart collection', tags: ['charts', 'visualization', 'gallery'] },
  { id: 'dashboard-card', name: 'DashboardCard', category: 'dashboard', description: 'Reusable dashboard card component', tags: ['card', 'dashboard', 'reusable'] },
  { id: 'dashboard-grid', name: 'DashboardGrid', category: 'dashboard', description: 'Responsive dashboard grid layout', tags: ['grid', 'layout', 'responsive'] },
  { id: 'dashboard-header', name: 'DashboardHeader', category: 'dashboard', description: 'Dashboard header with navigation', tags: ['header', 'navigation', 'dashboard'] },
  { id: 'dashboard-sidebar', name: 'DashboardSidebar', category: 'dashboard', description: 'Collapsible dashboard sidebar', tags: ['sidebar', 'navigation', 'collapsible'] },
  { id: 'dashboard-widget', name: 'DashboardWidget', category: 'dashboard', description: 'Configurable dashboard widget', tags: ['widget', 'configurable', 'dashboard'] },
  { id: 'data-visualization', name: 'DataVisualization', category: 'dashboard', description: 'Advanced data visualization tools', tags: ['data', 'visualization', 'charts'] },
  { id: 'kpi-dashboard', name: 'KPIDashboard', category: 'dashboard', description: 'Key performance indicators dashboard', tags: ['kpi', 'metrics', 'performance'] },
  { id: 'metrics-overview', name: 'MetricsOverview', category: 'dashboard', description: 'Comprehensive metrics overview', tags: ['metrics', 'overview', 'analytics'] },
  { id: 'performance-monitor', name: 'PerformanceMonitor', category: 'dashboard', description: 'Real-time performance monitoring', tags: ['performance', 'monitoring', 'real-time'] },
  { id: 'realtime-dashboard', name: 'RealtimeDashboard', category: 'dashboard', description: 'Real-time data dashboard', tags: ['realtime', 'data', 'dashboard'] },
  { id: 'status-dashboard', name: 'StatusDashboard', category: 'dashboard', description: 'System status monitoring dashboard', tags: ['status', 'monitoring', 'system'] },
  { id: 'user-dashboard', name: 'UserDashboard', category: 'dashboard', description: 'User-specific dashboard view', tags: ['user', 'dashboard', 'personalized'] },
  { id: 'widget-container', name: 'WidgetContainer', category: 'dashboard', description: 'Container for dashboard widgets', tags: ['container', 'widget', 'dashboard'] },
  { id: 'workflow-dashboard', name: 'WorkflowDashboard', category: 'dashboard', description: 'Workflow management dashboard', tags: ['workflow', 'management', 'dashboard'] },

  // Chart Components (22)
  { id: 'leads-chart', name: 'LeadsChart', category: 'charts', description: 'Lead pipeline pie chart', tags: ['chart', 'leads', 'analytics'] },
  { id: 'bloom-graph-chart', name: 'BloomGraphChart', category: 'charts', description: 'Interactive bloom graph visualization', tags: ['chart', 'graph', 'interactive'] },
  { id: 'confusion-matrix-chart', name: 'ConfusionMatrixChart', category: 'charts', description: 'Machine learning confusion matrix', tags: ['chart', 'ml', 'matrix'] },
  { id: 'correlation-heatmap', name: 'CorrelationHeatmap', category: 'charts', description: 'Data correlation heatmap', tags: ['chart', 'heatmap', 'correlation'] },
  { id: 'donut-chart', name: 'DonutChart', category: 'charts', description: 'Donut chart with customizable segments', tags: ['chart', 'donut', 'pie'] },
  { id: 'gauge-chart', name: 'GaugeChart', category: 'charts', description: 'Gauge chart for metrics display', tags: ['chart', 'gauge', 'metrics'] },
  { id: 'heatmap-chart', name: 'HeatmapChart', category: 'charts', description: 'Data heatmap visualization', tags: ['chart', 'heatmap', 'data'] },
  { id: 'line-chart', name: 'LineChart', category: 'charts', description: 'Time series line chart', tags: ['chart', 'line', 'time-series'] },
  { id: 'pie-chart', name: 'PieChart', category: 'charts', description: 'Pie chart with segments', tags: ['chart', 'pie', 'segments'] },
  { id: 'radar-chart', name: 'RadarChart', category: 'charts', description: 'Radar chart for multi-dimensional data', tags: ['chart', 'radar', 'multi-dimensional'] },
  { id: 'scatter-plot', name: 'ScatterPlot', category: 'charts', description: 'Scatter plot for correlation analysis', tags: ['chart', 'scatter', 'correlation'] },
  { id: 'sankey-diagram', name: 'SankeyDiagram', category: 'charts', description: 'Flow diagram for data visualization', tags: ['chart', 'sankey', 'flow'] },
  { id: 'treemap-chart', name: 'TreemapChart', category: 'charts', description: 'Hierarchical treemap visualization', tags: ['chart', 'treemap', 'hierarchical'] },
  { id: 'waterfall-chart', name: 'WaterfallChart', category: 'charts', description: 'Waterfall chart for cumulative data', tags: ['chart', 'waterfall', 'cumulative'] },
  { id: 'bar-chart', name: 'BarChart', category: 'charts', description: 'Bar chart for categorical data', tags: ['chart', 'bar', 'categorical'] },
  { id: 'area-chart', name: 'AreaChart', category: 'charts', description: 'Area chart for filled data visualization', tags: ['chart', 'area', 'filled'] },
  { id: 'bubble-chart', name: 'BubbleChart', category: 'charts', description: 'Bubble chart for multi-dimensional data', tags: ['chart', 'bubble', 'multi-dimensional'] },
  { id: 'candlestick-chart', name: 'CandlestickChart', category: 'charts', description: 'Financial candlestick chart', tags: ['chart', 'candlestick', 'financial'] },
  { id: 'funnel-chart', name: 'FunnelChart', category: 'charts', description: 'Funnel chart for conversion analysis', tags: ['chart', 'funnel', 'conversion'] },
  { id: 'histogram-chart', name: 'HistogramChart', category: 'charts', description: 'Histogram for distribution analysis', tags: ['chart', 'histogram', 'distribution'] },
  { id: 'polar-chart', name: 'PolarChart', category: 'charts', description: 'Polar coordinate chart', tags: ['chart', 'polar', 'coordinates'] },
  { id: 'sunburst-chart', name: 'SunburstChart', category: 'charts', description: 'Hierarchical sunburst visualization', tags: ['chart', 'sunburst', 'hierarchical'] },

  // Workflow Components (10)
  { id: 'workflow-card', name: 'WorkflowCard', category: 'workflows', description: 'Individual workflow card', tags: ['workflow', 'card', 'individual'] },
  { id: 'workflow-step', name: 'WorkflowStep', category: 'workflows', description: 'Single workflow step', tags: ['workflow', 'step', 'process'] },
  { id: 'workflow-builder', name: 'WorkflowBuilder', category: 'workflows', description: 'Visual workflow builder', tags: ['workflow', 'builder', 'visual'] },
  { id: 'workflow-executor', name: 'WorkflowExecutor', category: 'workflows', description: 'Workflow execution engine', tags: ['workflow', 'executor', 'engine'] },
  { id: 'workflow-monitor', name: 'WorkflowMonitor', category: 'workflows', description: 'Workflow monitoring and status', tags: ['workflow', 'monitor', 'status'] },
  { id: 'workflow-scheduler', name: 'WorkflowScheduler', category: 'workflows', description: 'Workflow scheduling', tags: ['workflow', 'scheduler', 'timing'] },
  { id: 'workflow-trigger', name: 'WorkflowTrigger', category: 'workflows', description: 'Workflow trigger conditions', tags: ['workflow', 'trigger', 'conditions'] },
  { id: 'workflow-validator', name: 'WorkflowValidator', category: 'workflows', description: 'Workflow validation system', tags: ['workflow', 'validator', 'validation'] },
  { id: 'workflow-optimizer', name: 'WorkflowOptimizer', category: 'workflows', description: 'Workflow optimization tools', tags: ['workflow', 'optimizer', 'performance'] },
  { id: 'workflow-analytics', name: 'WorkflowAnalytics', category: 'workflows', description: 'Workflow analytics and insights', tags: ['workflow', 'analytics', 'insights'] },

  // Search Components (5)
  { id: 'universal-search', name: 'UniversalSearch', category: 'search', description: 'Universal search functionality', tags: ['search', 'universal', 'functionality'] },
  { id: 'search-3d', name: 'Search3D', category: 'search', description: '3D search interface', tags: ['search', '3d', 'interface'] },
  { id: 'filter-chips', name: 'FilterChips', category: 'search', description: 'Filter chips for search', tags: ['search', 'filter', 'chips'] },
  { id: 'logic-operators', name: 'LogicOperators', category: 'search', description: 'Search logic operators', tags: ['search', 'logic', 'operators'] },
  { id: 'search-integration', name: 'SearchIntegration', category: 'search', description: 'Search system integration', tags: ['search', 'integration', 'system'] },

  // UI Components (52)
  { id: 'button', name: 'Button', category: 'ui', description: 'Primary button component', tags: ['button', 'primary', 'interactive'] },
  { id: 'card', name: 'Card', category: 'ui', description: 'Card container component', tags: ['card', 'container', 'layout'] },
  { id: 'input', name: 'Input', category: 'ui', description: 'Input field component', tags: ['input', 'field', 'form'] },
  { id: 'badge', name: 'Badge', category: 'ui', description: 'Badge component', tags: ['badge', 'label', 'status'] },
  { id: 'progress', name: 'Progress', category: 'ui', description: 'Progress bar component', tags: ['progress', 'bar', 'loading'] },
  { id: 'dropdown', name: 'Dropdown', category: 'ui', description: 'Dropdown menu component', tags: ['dropdown', 'menu', 'selection'] },
  { id: 'modal', name: 'Modal', category: 'ui', description: 'Modal dialog component', tags: ['modal', 'dialog', 'overlay'] },
  { id: 'tooltip', name: 'Tooltip', category: 'ui', description: 'Tooltip component', tags: ['tooltip', 'hint', 'help'] },
  { id: 'alert', name: 'Alert', category: 'ui', description: 'Alert notification component', tags: ['alert', 'notification', 'message'] },
  { id: 'spinner', name: 'Spinner', category: 'ui', description: 'Loading spinner component', tags: ['spinner', 'loading', 'indicator'] },
  { id: 'avatar', name: 'Avatar', category: 'ui', description: 'User avatar component', tags: ['avatar', 'user', 'profile'] },
  { id: 'checkbox', name: 'Checkbox', category: 'ui', description: 'Checkbox input component', tags: ['checkbox', 'input', 'form'] },
  { id: 'radio', name: 'Radio', category: 'ui', description: 'Radio button component', tags: ['radio', 'button', 'form'] },
  { id: 'switch', name: 'Switch', category: 'ui', description: 'Toggle switch component', tags: ['switch', 'toggle', 'form'] },
  { id: 'slider', name: 'Slider', category: 'ui', description: 'Range slider component', tags: ['slider', 'range', 'input'] },
  { id: 'tabs', name: 'Tabs', category: 'ui', description: 'Tab navigation component', tags: ['tabs', 'navigation', 'content'] },
  { id: 'accordion', name: 'Accordion', category: 'ui', description: 'Accordion component', tags: ['accordion', 'collapsible', 'content'] },
  { id: 'breadcrumb', name: 'Breadcrumb', category: 'ui', description: 'Breadcrumb navigation', tags: ['breadcrumb', 'navigation', 'path'] },
  { id: 'pagination', name: 'Pagination', category: 'ui', description: 'Pagination component', tags: ['pagination', 'navigation', 'pages'] },
  { id: 'stepper', name: 'Stepper', category: 'ui', description: 'Step indicator component', tags: ['stepper', 'steps', 'progress'] },
  { id: 'table', name: 'Table', category: 'ui', description: 'Data table component', tags: ['table', 'data', 'grid'] },
  { id: 'list', name: 'List', category: 'ui', description: 'List component', tags: ['list', 'items', 'data'] },
  { id: 'tree', name: 'Tree', category: 'ui', description: 'Tree view component', tags: ['tree', 'hierarchical', 'data'] },
  { id: 'calendar', name: 'Calendar', category: 'ui', description: 'Calendar component', tags: ['calendar', 'date', 'picker'] },
  { id: 'datepicker', name: 'DatePicker', category: 'ui', description: 'Date picker component', tags: ['datepicker', 'date', 'input'] },
  { id: 'timepicker', name: 'TimePicker', category: 'ui', description: 'Time picker component', tags: ['timepicker', 'time', 'input'] },
  { id: 'colorpicker', name: 'ColorPicker', category: 'ui', description: 'Color picker component', tags: ['colorpicker', 'color', 'input'] },
  { id: 'fileupload', name: 'FileUpload', category: 'ui', description: 'File upload component', tags: ['fileupload', 'file', 'upload'] },
  { id: 'image', name: 'Image', category: 'ui', description: 'Image component', tags: ['image', 'media', 'display'] },
  { id: 'video', name: 'Video', category: 'ui', description: 'Video component', tags: ['video', 'media', 'player'] },
  { id: 'audio', name: 'Audio', category: 'ui', description: 'Audio component', tags: ['audio', 'media', 'player'] },
  { id: 'map', name: 'Map', category: 'ui', description: 'Map component', tags: ['map', 'location', 'geography'] },
  { id: 'chart', name: 'Chart', category: 'ui', description: 'Chart component', tags: ['chart', 'data', 'visualization'] },
  { id: 'gauge', name: 'Gauge', category: 'ui', description: 'Gauge component', tags: ['gauge', 'metrics', 'display'] },
  { id: 'meter', name: 'Meter', category: 'ui', description: 'Meter component', tags: ['meter', 'measurement', 'display'] },
  { id: 'rating', name: 'Rating', category: 'ui', description: 'Rating component', tags: ['rating', 'stars', 'evaluation'] },
  { id: 'tag', name: 'Tag', category: 'ui', description: 'Tag component', tags: ['tag', 'label', 'categorization'] },
  { id: 'chip', name: 'Chip', category: 'ui', description: 'Chip component', tags: ['chip', 'label', 'selection'] },
  { id: 'divider', name: 'Divider', category: 'ui', description: 'Divider component', tags: ['divider', 'separator', 'layout'] },
  { id: 'spacer', name: 'Spacer', category: 'ui', description: 'Spacer component', tags: ['spacer', 'space', 'layout'] },
  { id: 'container', name: 'Container', category: 'ui', description: 'Container component', tags: ['container', 'wrapper', 'layout'] },
  { id: 'grid', name: 'Grid', category: 'ui', description: 'Grid layout component', tags: ['grid', 'layout', 'structure'] },
  { id: 'flex', name: 'Flex', category: 'ui', description: 'Flexbox component', tags: ['flex', 'layout', 'alignment'] },
  { id: 'stack', name: 'Stack', category: 'ui', description: 'Stack layout component', tags: ['stack', 'layout', 'vertical'] },
  { id: 'box', name: 'Box', category: 'ui', description: 'Box container component', tags: ['box', 'container', 'wrapper'] },
  { id: 'section', name: 'Section', category: 'ui', description: 'Section component', tags: ['section', 'content', 'layout'] },
  { id: 'article', name: 'Article', category: 'ui', description: 'Article component', tags: ['article', 'content', 'text'] },
  { id: 'header', name: 'Header', category: 'ui', description: 'Header component', tags: ['header', 'navigation', 'top'] },
  { id: 'footer', name: 'Footer', category: 'ui', description: 'Footer component', tags: ['footer', 'bottom', 'navigation'] },
  { id: 'sidebar', name: 'Sidebar', category: 'ui', description: 'Sidebar component', tags: ['sidebar', 'navigation', 'side'] },
  { id: 'navbar', name: 'Navbar', category: 'ui', description: 'Navigation bar component', tags: ['navbar', 'navigation', 'top'] },
  { id: 'menu', name: 'Menu', category: 'ui', description: 'Menu component', tags: ['menu', 'navigation', 'list'] },
  { id: 'menuitem', name: 'MenuItem', category: 'ui', description: 'Menu item component', tags: ['menuitem', 'menu', 'item'] },
  { id: 'submenu', name: 'SubMenu', category: 'ui', description: 'Submenu component', tags: ['submenu', 'menu', 'nested'] },
  { id: 'contextmenu', name: 'ContextMenu', category: 'ui', description: 'Context menu component', tags: ['contextmenu', 'menu', 'context'] },
  { id: 'popover', name: 'Popover', category: 'ui', description: 'Popover component', tags: ['popover', 'overlay', 'content'] },
  { id: 'overlay', name: 'Overlay', category: 'ui', description: 'Overlay component', tags: ['overlay', 'backdrop', 'modal'] },
  { id: 'backdrop', name: 'Backdrop', category: 'ui', description: 'Backdrop component', tags: ['backdrop', 'overlay', 'background'] },
  { id: 'portal', name: 'Portal', category: 'ui', description: 'Portal component', tags: ['portal', 'rendering', 'dom'] },
  { id: 'fragment', name: 'Fragment', category: 'ui', description: 'Fragment component', tags: ['fragment', 'wrapper', 'grouping'] },

  // Redux UI Components (13)
  { id: 'redux-button', name: 'ReduxButton', category: 'redux-ui', description: 'Redux-powered button', tags: ['redux', 'button', 'state'] },
  { id: 'redux-card', name: 'ReduxCard', category: 'redux-ui', description: 'Redux-powered card', tags: ['redux', 'card', 'state'] },
  { id: 'redux-input', name: 'ReduxInput', category: 'redux-ui', description: 'Redux-powered input', tags: ['redux', 'input', 'state'] },
  { id: 'redux-select', name: 'ReduxSelect', category: 'redux-ui', description: 'Redux-powered select', tags: ['redux', 'select', 'state'] },
  { id: 'redux-checkbox', name: 'ReduxCheckbox', category: 'redux-ui', description: 'Redux-powered checkbox', tags: ['redux', 'checkbox', 'state'] },
  { id: 'redux-radio', name: 'ReduxRadio', category: 'redux-ui', description: 'Redux-powered radio', tags: ['redux', 'radio', 'state'] },
  { id: 'redux-switch', name: 'ReduxSwitch', category: 'redux-ui', description: 'Redux-powered switch', tags: ['redux', 'switch', 'state'] },
  { id: 'redux-slider', name: 'ReduxSlider', category: 'redux-ui', description: 'Redux-powered slider', tags: ['redux', 'slider', 'state'] },
  { id: 'redux-tabs', name: 'ReduxTabs', category: 'redux-ui', description: 'Redux-powered tabs', tags: ['redux', 'tabs', 'state'] },
  { id: 'redux-modal', name: 'ReduxModal', category: 'redux-ui', description: 'Redux-powered modal', tags: ['redux', 'modal', 'state'] },
  { id: 'redux-tooltip', name: 'ReduxTooltip', category: 'redux-ui', description: 'Redux-powered tooltip', tags: ['redux', 'tooltip', 'state'] },
  { id: 'redux-alert', name: 'ReduxAlert', category: 'redux-ui', description: 'Redux-powered alert', tags: ['redux', 'alert', 'state'] },
  { id: 'redux-progress', name: 'ReduxProgress', category: 'redux-ui', description: 'Redux-powered progress', tags: ['redux', 'progress', 'state'] },

  // Pow3r Components (5)
  { id: 'pow3r-button', name: 'Pow3rButton', category: 'pow3r', description: 'Pow3r-powered button', tags: ['pow3r', 'button', 'enhanced'] },
  { id: 'pow3r-card', name: 'Pow3rCard', category: 'pow3r', description: 'Pow3r-powered card', tags: ['pow3r', 'card', 'enhanced'] },
  { id: 'pow3r-input', name: 'Pow3rInput', category: 'pow3r', description: 'Pow3r-powered input', tags: ['pow3r', 'input', 'enhanced'] },
  { id: 'pow3r-modal', name: 'Pow3rModal', category: 'pow3r', description: 'Pow3r-powered modal', tags: ['pow3r', 'modal', 'enhanced'] },
  { id: 'pow3r-dashboard', name: 'Pow3rDashboard', category: 'pow3r', description: 'Pow3r-powered dashboard', tags: ['pow3r', 'dashboard', 'enhanced'] },

  // Features Components (13)
  { id: 'ai-workflows', name: 'AIWorkflows', category: 'features', description: 'AI-powered workflow automation', tags: ['ai', 'workflow', 'automation'] },
  { id: 'privacy-controls', name: 'PrivacyControls', category: 'features', description: 'Privacy and security controls', tags: ['privacy', 'security', 'controls'] },
  { id: 'three-layer-showcase', name: 'ThreeLayerShowcase', category: 'features', description: 'Three-layer architecture showcase', tags: ['showcase', 'architecture', 'layers'] },
  { id: 'universal-component-container', name: 'UniversalComponentContainer', category: 'features', description: 'Universal component container', tags: ['universal', 'container', 'component'] },
  { id: 'observability-system', name: 'ObservabilitySystem', category: 'features', description: 'System observability and monitoring', tags: ['observability', 'monitoring', 'system'] },
  { id: 'performance-monitor', name: 'PerformanceMonitor', category: 'features', description: 'Performance monitoring system', tags: ['performance', 'monitoring', 'system'] },
  { id: 'search-engine', name: 'SearchEngine', category: 'features', description: 'Advanced search engine', tags: ['search', 'engine', 'advanced'] },
  { id: 'ai-assistant', name: 'AIAssistant', category: 'features', description: 'AI-powered assistant', tags: ['ai', 'assistant', 'intelligent'] },
  { id: 'data-analytics', name: 'DataAnalytics', category: 'features', description: 'Advanced data analytics', tags: ['data', 'analytics', 'advanced'] },
  { id: 'machine-learning', name: 'MachineLearning', category: 'features', description: 'Machine learning integration', tags: ['ml', 'learning', 'intelligence'] },
  { id: 'blockchain-integration', name: 'BlockchainIntegration', category: 'features', description: 'Blockchain technology integration', tags: ['blockchain', 'integration', 'technology'] },
  { id: 'iot-connectivity', name: 'IoTConnectivity', category: 'features', description: 'IoT device connectivity', tags: ['iot', 'connectivity', 'devices'] },
  { id: 'cloud-sync', name: 'CloudSync', category: 'features', description: 'Cloud synchronization', tags: ['cloud', 'sync', 'synchronization'] },

  // Legacy Components (5)
  { id: 'simple-button', name: 'SimpleButton', category: 'legacy', description: 'Simple button component', tags: ['simple', 'button', 'basic'] },
  { id: 'simple-card', name: 'SimpleCard', category: 'legacy', description: 'Simple card component', tags: ['simple', 'card', 'basic'] },
  { id: 'simple-input', name: 'SimpleInput', category: 'legacy', description: 'Simple input component', tags: ['simple', 'input', 'basic'] },
  { id: 'simple-badge', name: 'SimpleBadge', category: 'legacy', description: 'Simple badge component', tags: ['simple', 'badge', 'basic'] },
  { id: 'simple-progress', name: 'SimpleProgress', category: 'legacy', description: 'Simple progress component', tags: ['simple', 'progress', 'basic'] },

  // Universal Components (1)
  { id: 'universal-component', name: 'UniversalComponent', category: 'universal', description: 'Universal component wrapper', tags: ['universal', 'wrapper', 'component'] }
];

// Theme configuration
const themes = {
  light: {
    name: 'Light',
    icon: Sun,
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    card: 'bg-white border-gray-200',
    input: 'bg-white border-gray-300',
    button: 'bg-blue-500 hover:bg-blue-600 text-white'
  },
  dark: {
    name: 'Dark',
    icon: Moon,
    bg: 'bg-gray-900',
    text: 'text-white',
    card: 'bg-gray-800 border-gray-700',
    input: 'bg-gray-800 border-gray-600',
    button: 'bg-blue-600 hover:bg-blue-700 text-white'
  },
  outline: {
    name: 'Outline',
    icon: Palette,
    bg: 'bg-white',
    text: 'text-gray-900',
    card: 'bg-transparent border-2 border-gray-300',
    input: 'bg-transparent border-2 border-gray-300',
    button: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
  }
};

// Category configuration
const categories = {
  all: { name: 'All Components', count: componentData.length },
  dashboard: { name: 'Dashboard', count: componentData.filter(c => c.category === 'dashboard').length },
  charts: { name: 'Charts', count: componentData.filter(c => c.category === 'charts').length },
  workflows: { name: 'Workflows', count: componentData.filter(c => c.category === 'workflows').length },
  search: { name: 'Search', count: componentData.filter(c => c.category === 'search').length },
  ui: { name: 'UI Components', count: componentData.filter(c => c.category === 'ui').length },
  'redux-ui': { name: 'Redux UI', count: componentData.filter(c => c.category === 'redux-ui').length },
  pow3r: { name: 'Pow3r', count: componentData.filter(c => c.category === 'pow3r').length },
  features: { name: 'Features', count: componentData.filter(c => c.category === 'features').length },
  legacy: { name: 'Legacy', count: componentData.filter(c => c.category === 'legacy').length },
  universal: { name: 'Universal', count: componentData.filter(c => c.category === 'universal').length }
};

const SimpleLibraryPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'outline'>('outline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentTheme = themes[theme];

  const filteredComponents = useMemo(() => {
    let filtered = componentData;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentTheme.bg} ${currentTheme.text}`}>
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Power Components Library v4</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {filteredComponents.length} of {componentData.length} components
            {selectedCategory !== 'all' && ` in ${categories[selectedCategory as keyof typeof categories]?.name}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search components..."
              className={`w-full pl-10 pr-4 py-2 rounded-md border ${currentTheme.input} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <select
            className={`px-4 py-2 rounded-md border ${currentTheme.input} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {Object.entries(categories).map(([key, category]) => (
              <option key={key} value={key}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>

          {/* Theme Selector */}
          <div className="flex gap-2">
            {Object.entries(themes).map(([key, themeConfig]) => {
              const Icon = themeConfig.icon;
              return (
                <button
                  key={key}
                  onClick={() => setTheme(key as 'light' | 'dark' | 'outline')}
                  className={`p-2 rounded-md transition-colors ${
                    theme === key
                      ? 'bg-blue-500 text-white'
                      : `${currentTheme.button} hover:bg-blue-600`
                  }`}
                  title={`${themeConfig.name} Theme`}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </div>

          {/* View Mode */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : `${currentTheme.button} hover:bg-blue-600`
              }`}
              title="Grid View"
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : `${currentTheme.button} hover:bg-blue-600`
              }`}
              title="List View"
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Component Grid/List */}
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {filteredComponents.map(component => (
            <div
              key={component.id}
              className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-lg ${currentTheme.card}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">{component.name}</h3>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {component.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {component.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {component.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {component.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                    +{component.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No components found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleLibraryPage;
