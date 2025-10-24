/**
 * Generate pow3r.v3.config.json files for all 139 components
 * Based on COMPONENT_INVENTORY.md structure
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Component categories from COMPONENT_INVENTORY.md
const componentCategories = {
  dashboard: {
    count: 19,
    components: [
      { name: 'AdminPanel', description: 'System administration and oversight', tags: ['admin', 'management', 'system'] },
      { name: 'AIResponseSystem', description: 'AI-powered auto-responses and templates', tags: ['ai', 'automation', 'phase2'] },
      { name: 'AnalyticsDashboard', description: 'Analytics and metrics visualization', tags: ['analytics', 'metrics', 'phase2'] },
      { name: 'AutomationEngine', description: 'Task automation and scheduling', tags: ['automation', 'workflow'] },
      { name: 'AutoPostingEngine', description: 'Automated cross-platform posting', tags: ['posting', 'automation', 'phase2'] },
      { name: 'ContentGenerator', description: 'AI content generation for posts', tags: ['ai', 'content', 'generation'] },
      { name: 'ItemDetailsCollector', description: 'Item information collection', tags: ['items', 'data-collection'] },
      { name: 'LeadMonitor', description: 'Lead tracking and monitoring', tags: ['leads', 'monitoring', 'phase2'] },
      { name: 'LLMSwitcher', description: 'AI model switcher', tags: ['ai', 'llm', 'configuration'] },
      { name: 'MessageCenter', description: 'Central message management', tags: ['messaging', 'communication'] },
      { name: 'NegotiationManager', description: 'Price negotiation management', tags: ['negotiation', 'pricing', 'phase2'] },
      { name: 'PhotoProcessor', description: 'Image processing and optimization', tags: ['images', 'processing'] },
      { name: 'PlatformSelector', description: 'Multi-platform selector', tags: ['platforms', 'selection'] },
      { name: 'PostingStrategy', description: 'Posting strategy configuration', tags: ['strategy', 'posting', 'phase2'] },
      { name: 'PriceResearcher', description: 'Market price research', tags: ['pricing', 'research'] },
      { name: 'PromptTemplatesManager', description: 'AI prompt template manager', tags: ['ai', 'prompts', 'templates'] },
      { name: 'ResponseTemplatesManager', description: 'Response template manager', tags: ['responses', 'templates'] },
      { name: 'SaleProcessor', description: 'Sales transaction processing', tags: ['sales', 'transactions'] },
      { name: 'UserManager', description: 'User management interface', tags: ['users', 'management', 'admin'] }
    ]
  },
  charts: {
    count: 22,
    components: [
      { name: 'LeadsChart', description: 'Lead pipeline pie chart', tags: ['chart', 'leads', 'analytics'] },
      { name: 'BloomGraphChart', description: 'Bloom filter visualization', tags: ['chart', 'visualization'] },
      { name: 'ConfusionMatrixChart', description: 'ML confusion matrix', tags: ['chart', 'ml', 'analytics'] },
      { name: 'CostAnalysisChart', description: 'Cost breakdown analysis', tags: ['chart', 'cost', 'financial'] },
      { name: 'ErrorRateChart', description: 'Error rate tracking', tags: ['chart', 'errors', 'monitoring'] },
      { name: 'GanttChart', description: 'Project timeline gantt', tags: ['chart', 'timeline', 'project'] },
      { name: 'HeatmapChart', description: 'Activity heatmap', tags: ['chart', 'heatmap', 'activity'] },
      { name: 'LatencyDistributionChart', description: 'API latency distribution', tags: ['chart', 'performance'] },
      { name: 'LLMPerformanceChart', description: 'AI model performance', tags: ['chart', 'ai', 'performance'] },
      { name: 'ModelComparisonChart', description: 'AI model comparison', tags: ['chart', 'ai', 'comparison'] },
      { name: 'NetworkGraphChart', description: 'Network relationship graph', tags: ['chart', 'network', 'graph'] },
      { name: 'PriceChart', description: 'Price trend chart', tags: ['chart', 'pricing', 'trends'] },
      { name: 'QuadrantLeaderChart', description: 'Quadrant analysis', tags: ['chart', 'quadrant', 'strategy'] },
      { name: 'QualityMetricsChart', description: 'Quality metrics dashboard', tags: ['chart', 'quality', 'metrics'] },
      { name: 'RequestVolumeChart', description: 'API request volume', tags: ['chart', 'api', 'volume'] },
      { name: 'RocCurveChart', description: 'ROC curve for ML', tags: ['chart', 'ml', 'roc'] },
      { name: 'SankeyDiagramChart', description: 'Sankey flow diagram', tags: ['chart', 'flow', 'sankey'] },
      { name: 'ScatterPlotChart', description: 'Scatter plot visualization', tags: ['chart', 'scatter'] },
      { name: 'TimelineChart', description: 'Event timeline', tags: ['chart', 'timeline', 'events'] },
      { name: 'TokenUsageChart', description: 'AI token usage tracking', tags: ['chart', 'ai', 'tokens'] },
      { name: 'UsagePatternsChart', description: 'Usage pattern analysis', tags: ['chart', 'usage', 'patterns'] },
      { name: 'WordCloudChart', description: 'Word cloud visualization', tags: ['chart', 'wordcloud', 'text'] }
    ]
  },
  workflows: {
    count: 10,
    components: [
      { name: 'WorkflowDashboard', description: 'Main workflow dashboard', tags: ['workflow', 'dashboard', 'phase2'] },
      { name: 'WorkflowCard', description: 'Workflow card display', tags: ['workflow', 'card'] },
      { name: 'WorkflowStep', description: 'Single workflow step', tags: ['workflow', 'step'] },
      { name: 'WorkflowProgress', description: 'Progress tracker', tags: ['workflow', 'progress'] },
      { name: 'WorkflowStatus', description: 'Status indicator', tags: ['workflow', 'status'] },
      { name: 'WorkflowActions', description: 'Action controls', tags: ['workflow', 'actions'] },
      { name: 'FlowModificationWorkflow', description: 'Flow editing workflow', tags: ['workflow', 'modification'] },
      { name: 'MessageReviewWorkflow', description: 'Message review workflow', tags: ['workflow', 'messages'] },
      { name: 'PostManagementWorkflow', description: 'Post management workflow', tags: ['workflow', 'posts'] },
      { name: 'ProjectManagementWorkflow', description: 'Project workflow', tags: ['workflow', 'projects'] }
    ]
  },
  search: {
    count: 5,
    components: [
      { name: 'UniversalSearch', description: 'Advanced universal search', tags: ['search', 'filter', 'operators'] },
      { name: 'Search3D', description: '3D spatial search', tags: ['search', '3d', 'visualization'] },
      { name: 'FilterChips', description: 'Search filter chips', tags: ['search', 'filters', 'chips'] },
      { name: 'LogicOperators', description: 'Search logic operators', tags: ['search', 'logic', 'operators'] },
      { name: 'SearchIntegration', description: 'Integrated search', tags: ['search', 'integration'] }
    ]
  },
  ui: {
    count: 52,
    components: [
      { name: 'Button', description: 'Interactive button component', tags: ['ui', 'interactive', 'button'] },
      { name: 'Card', description: 'Content container card', tags: ['ui', 'container', 'card'] },
      { name: 'Badge', description: 'Status badge component', tags: ['ui', 'status', 'badge'] },
      { name: 'Input', description: 'Text input component', tags: ['ui', 'form', 'input'] },
      { name: 'Textarea', description: 'Multi-line text input', tags: ['ui', 'form', 'textarea'] },
      { name: 'Select', description: 'Dropdown selection', tags: ['ui', 'form', 'select'] },
      { name: 'Checkbox', description: 'Checkbox input', tags: ['ui', 'form', 'checkbox'] },
      { name: 'Switch', description: 'Toggle switch', tags: ['ui', 'form', 'switch'] },
      { name: 'Tabs', description: 'Tab navigation', tags: ['ui', 'navigation', 'tabs'] },
      { name: 'Dialog', description: 'Modal dialog', tags: ['ui', 'modal', 'dialog'] },
      { name: 'Alert', description: 'Alert notification', tags: ['ui', 'notification', 'alert'] },
      { name: 'AlertDialog', description: 'Alert dialog', tags: ['ui', 'modal', 'alert'] },
      { name: 'Progress', description: 'Progress indicator', tags: ['ui', 'progress', 'indicator'] },
      { name: 'Separator', description: 'Visual separator', tags: ['ui', 'layout', 'separator'] },
      { name: 'Tooltip', description: 'Tooltip overlay', tags: ['ui', 'overlay', 'tooltip'] },
      { name: 'Popover', description: 'Popover overlay', tags: ['ui', 'overlay', 'popover'] },
      { name: 'DropdownMenu', description: 'Dropdown menu', tags: ['ui', 'menu', 'dropdown'] },
      { name: 'ContextMenu', description: 'Context menu', tags: ['ui', 'menu', 'context'] },
      { name: 'Accordion', description: 'Collapsible accordion', tags: ['ui', 'collapsible', 'accordion'] },
      { name: 'Table', description: 'Data table', tags: ['ui', 'data', 'table'] },
      { name: 'ScrollArea', description: 'Scrollable area', tags: ['ui', 'scroll', 'area'] },
      { name: 'Sheet', description: 'Side sheet', tags: ['ui', 'sheet', 'side'] },
      { name: 'Drawer', description: 'Drawer component', tags: ['ui', 'drawer', 'side'] },
      { name: 'Calendar', description: 'Calendar component', tags: ['ui', 'calendar', 'date'] },
      { name: 'DateRangePicker', description: 'Date range picker', tags: ['ui', 'date', 'picker'] },
      { name: 'Label', description: 'Form label', tags: ['ui', 'form', 'label'] },
      { name: 'Form', description: 'Form container', tags: ['ui', 'form', 'container'] },
      { name: 'Slider', description: 'Range slider', tags: ['ui', 'form', 'slider'] },
      { name: 'RadioGroup', description: 'Radio button group', tags: ['ui', 'form', 'radio'] },
      { name: 'Toggle', description: 'Toggle button', tags: ['ui', 'form', 'toggle'] },
      { name: 'ToggleGroup', description: 'Toggle group', tags: ['ui', 'form', 'toggle'] },
      { name: 'HoverCard', description: 'Hover card', tags: ['ui', 'overlay', 'hover'] },
      { name: 'Avatar', description: 'User avatar', tags: ['ui', 'user', 'avatar'] },
      { name: 'AspectRatio', description: 'Aspect ratio container', tags: ['ui', 'layout', 'aspect'] },
      { name: 'Resizable', description: 'Resizable panel', tags: ['ui', 'layout', 'resizable'] },
      { name: 'Collapsible', description: 'Collapsible content', tags: ['ui', 'collapsible', 'content'] },
      { name: 'Breadcrumb', description: 'Breadcrumb navigation', tags: ['ui', 'navigation', 'breadcrumb'] },
      { name: 'NavigationMenu', description: 'Navigation menu', tags: ['ui', 'navigation', 'menu'] },
      { name: 'Menubar', description: 'Menu bar', tags: ['ui', 'navigation', 'menubar'] },
      { name: 'Pagination', description: 'Pagination controls', tags: ['ui', 'navigation', 'pagination'] },
      { name: 'Command', description: 'Command palette', tags: ['ui', 'command', 'palette'] },
      { name: 'Carousel', description: 'Image carousel', tags: ['ui', 'media', 'carousel'] },
      { name: 'InputOTP', description: 'OTP input', tags: ['ui', 'form', 'otp'] },
      { name: 'Skeleton', description: 'Loading skeleton', tags: ['ui', 'loading', 'skeleton'] },
      { name: 'Toast', description: 'Toast notification', tags: ['ui', 'notification', 'toast'] },
      { name: 'Toaster', description: 'Toast container', tags: ['ui', 'notification', 'toaster'] },
      { name: 'Sonner', description: 'Sonner toast', tags: ['ui', 'notification', 'sonner'] },
      { name: 'DashboardCard', description: 'Dashboard card', tags: ['ui', 'dashboard', 'card'] },
      { name: 'TaskCard', description: 'Task card', tags: ['ui', 'task', 'card'] },
      { name: 'ConnectionStatus', description: 'Connection status', tags: ['ui', 'status', 'connection'] },
      { name: 'CodeEditor', description: 'Code editor', tags: ['ui', 'editor', 'code'] },
      { name: 'ResponsiveGrid', description: 'Responsive grid', tags: ['ui', 'layout', 'grid'] },
      { name: 'MobileNav', description: 'Mobile navigation', tags: ['ui', 'navigation', 'mobile'] },
      { name: 'UIElementsFilter', description: 'UI elements filter', tags: ['ui', 'filter', 'elements'] }
    ]
  },
  'redux-ui': {
    count: 13,
    components: [
      { name: 'Button', description: 'Redux UI button', tags: ['redux-ui', 'button', 'interactive'] },
      { name: 'Card', description: 'Redux UI card', tags: ['redux-ui', 'card', 'container'] },
      { name: 'Badge', description: 'Redux UI badge', tags: ['redux-ui', 'badge', 'status'] },
      { name: 'Input', description: 'Redux UI input', tags: ['redux-ui', 'input', 'form'] },
      { name: 'Select', description: 'Redux UI select', tags: ['redux-ui', 'select', 'form'] },
      { name: 'Tabs', description: 'Redux UI tabs', tags: ['redux-ui', 'tabs', 'navigation'] },
      { name: 'Progress', description: 'Redux UI progress', tags: ['redux-ui', 'progress', 'indicator'] },
      { name: 'Separator', description: 'Redux UI separator', tags: ['redux-ui', 'separator', 'layout'] },
      { name: 'DashboardCard', description: 'Redux UI dashboard card', tags: ['redux-ui', 'dashboard', 'card'] },
      { name: 'ConnectionStatus', description: 'Redux UI connection status', tags: ['redux-ui', 'status', 'connection'] },
      { name: 'CodeEditor', description: 'Redux UI code editor', tags: ['redux-ui', 'editor', 'code'] },
      { name: 'ResponsiveGrid', description: 'Redux UI responsive grid', tags: ['redux-ui', 'grid', 'layout'] },
      { name: 'UIElementsFilter', description: 'Redux UI elements filter', tags: ['redux-ui', 'filter', 'elements'] }
    ]
  },
  pow3r: {
    count: 5,
    components: [
      { name: 'WorkflowCard', description: 'Workflow display card', tags: ['pow3r', 'workflow', 'card'] },
      { name: 'WorkflowStep', description: 'Workflow step component', tags: ['pow3r', 'workflow', 'step'] },
      { name: 'WorkflowProgress', description: 'Progress visualization', tags: ['pow3r', 'workflow', 'progress'] },
      { name: 'WorkflowStatus', description: 'Status badge', tags: ['pow3r', 'workflow', 'status'] },
      { name: 'WorkflowActions', description: 'Action buttons', tags: ['pow3r', 'workflow', 'actions'] }
    ]
  },
  features: {
    count: 13,
    components: [
      { name: 'NewPostFlow', description: 'Multi-step post creation', tags: ['feature', 'post', 'flow'] },
      { name: 'Phase1Dashboard', description: 'Phase 1 interface', tags: ['feature', 'dashboard', 'phase1'] },
      { name: 'Phase2Dashboard', description: 'Phase 2 interface', tags: ['feature', 'dashboard', 'phase2'] },
      { name: 'DashboardLayout', description: 'Main layout wrapper', tags: ['feature', 'layout', 'dashboard'] },
      { name: 'DashboardOverview', description: 'Dashboard home', tags: ['feature', 'dashboard', 'overview'] },
      { name: 'Sidebar', description: 'Side navigation', tags: ['feature', 'navigation', 'sidebar'] },
      { name: 'ListingGenerator', description: 'Listing creation', tags: ['feature', 'listing', 'generator'] },
      { name: 'ListingManagement', description: 'Listing admin', tags: ['feature', 'listing', 'management'] },
      { name: 'LeadsManager', description: 'Lead management', tags: ['feature', 'leads', 'manager'] },
      { name: 'AutoResponderManager', description: 'Auto-responder config', tags: ['feature', 'auto-responder', 'manager'] },
      { name: 'ResponseMonitor', description: 'Response tracking', tags: ['feature', 'response', 'monitor'] },
      { name: 'MetadataDisplay', description: 'Metadata viewer', tags: ['feature', 'metadata', 'display'] },
      { name: 'ThemeProvider', description: 'Theme context', tags: ['feature', 'theme', 'provider'] }
    ]
  }
};

// Generate pow3r.v3.config.json for a component
function generatePow3rConfig(component, category, type) {
  const config = {
    id: `${category}-${component.name.toLowerCase()}`,
    type: type,
    version: "3.0.0",
    io: {
      inputs: [
        {
          name: "variant",
          dtype: "string",
          validationRule: "isOneOf:default,outline,ghost,filled",
          defaultValue: "default",
          description: "Component variant style"
        },
        {
          name: "size",
          dtype: "string",
          validationRule: "isOneOf:sm,md,lg",
          defaultValue: "md",
          description: "Component size"
        },
        {
          name: "theme",
          dtype: "string",
          validationRule: "isOneOf:light,dark,auto",
          defaultValue: "auto",
          description: "Theme mode"
        }
      ],
      outputs: [
        {
          name: "onClick",
          dtype: "function",
          description: "Click event handler"
        },
        {
          name: "onChange",
          dtype: "function",
          description: "Change event handler"
        }
      ]
    },
    observability: {
      metrics: ["renderTime", "errorRate", "accessibilityScore", "userInteraction"],
      logging: {
        level: "info",
        enabled: true
      },
      performance: {
        maxRenderTime: 100,
        memoryThreshold: 50
      }
    },
    props: {
      defaultValues: {
        variant: "default",
        size: "md",
        theme: "auto"
      },
      accessibility: {
        ariaLabel: "required",
        keyboardNavigation: "enabled",
        screenReader: "supported"
      },
      performance: {
        memoization: true,
        lazyLoading: false,
        virtualization: false
      }
    },
    agentDirectives: {
      constitutionRef: "https://github.com/memorymusicllc/power.components/blob/main/.cursor/Project%20Constitution.md#article-iv",
      requiredTests: [
        {
          description: `Verify ${component.name} renders with default props`,
          testType: "e2e-playwright",
          expectedOutcome: `${component.name} renders correctly with default styling`,
          priority: "high"
        },
        {
          description: `Verify ${component.name} supports outline theme`,
          testType: "e2e-playwright",
          expectedOutcome: `${component.name} applies outline theme styling correctly`,
          priority: "high"
        },
        {
          description: `Verify ${component.name} accessibility features`,
          testType: "e2e-playwright",
          expectedOutcome: `${component.name} meets WCAG 2.1 AA accessibility standards`,
          priority: "critical"
        }
      ],
      selfHealing: {
        enabled: true,
        monitoredMetrics: ["renderTime", "errorRate", "accessibilityScore"],
        failureCondition: "renderTime > 100ms OR errorRate > 0.05 for 5m",
        repairPrompt: `${component.name} component performance degraded. Render time: {renderTime}ms, Error rate: {errorRate}. Optimize component rendering and error handling.`,
        repairTimeout: 300
      },
      xFiles: {
        enabled: true,
        triggerPosition: "bottom-right",
        caseTypes: ["BugReport", "FeatureRequest", "PerformanceIssue", "AccessibilityIssue"]
      }
    }
  };

  return config;
}

// Create directory structure and generate configs
function generateAllConfigs() {
  const baseDir = path.join(__dirname, '..', 'src', 'components');
  
  // Create directories if they don't exist
  const categories = ['dashboard', 'charts', 'workflows', 'search', 'ui', 'redux-ui', 'pow3r', 'features'];
  categories.forEach(category => {
    const dir = path.join(baseDir, category);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  let totalGenerated = 0;

  // Generate configs for each category
  Object.entries(componentCategories).forEach(([category, data]) => {
    const categoryDir = path.join(baseDir, category);
    
    data.components.forEach(component => {
      const type = category === 'charts' ? 'ChartComponent' : 
                   category === 'dashboard' ? 'DashboardComponent' :
                   category === 'search' ? 'SearchComponent' : 'ReactComponent';
      
      const config = generatePow3rConfig(component, category, type);
      const configPath = path.join(categoryDir, `${component.name}.pow3r.v3.config.json`);
      
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      totalGenerated++;
    });
  });

  console.log(`✅ Generated ${totalGenerated} pow3r.v3.config.json files`);
  console.log(`📁 Categories: ${Object.keys(componentCategories).join(', ')}`);
  console.log(`📊 Total components: ${totalGenerated}`);
}

// Run the generator
generateAllConfigs();
