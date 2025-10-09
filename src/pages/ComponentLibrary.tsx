/**
 * Advanced Component Library
 * Comprehensive component showcase with search, filters, and metadata
 * 
 * Features:
 * - Search components
 * - Filter by phase, type, tag
 * - Light/Dark mode switcher
 * - Component metadata display
 * - Live previews
 * 
 * @version 2.0.0
 * @date 2025-10-08
 */

import { useState, useMemo } from 'react'
import { useTheme } from '@/components/theme-provider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  Search, 
  Sun, 
  Moon,
  Filter,
  Calendar,
  Tag,
  Package,
  Grid3x3,
  Download
} from 'lucide-react'
import { GridProvider, ResponsiveGrid, GridSwitcher } from '@/components/ui/responsive-grid'

// Import all dashboard components
import { PriceChart } from '@/components/charts/price-chart'
import { LeadsChart } from '@/components/charts/leads-chart'
import { DashboardCard } from '@/components/ui/dashboard-card'

// Import new data visualization charts
import { LLMPerformanceChart } from '@/components/charts/llm-performance-chart'
import { TokenUsageChart } from '@/components/charts/token-usage-chart'
import { ModelComparisonChart } from '@/components/charts/model-comparison-chart'
import { ErrorRateChart } from '@/components/charts/error-rate-chart'
import { RequestVolumeChart } from '@/components/charts/request-volume-chart'
import { LatencyDistributionChart } from '@/components/charts/latency-distribution-chart'
import { CostAnalysisChart } from '@/components/charts/cost-analysis-chart'
import { QualityMetricsChart } from '@/components/charts/quality-metrics-chart'
import { UsagePatternsChart } from '@/components/charts/usage-patterns-chart'

// Import comprehensive data visualization charts
import { QuadrantLeaderChart } from '@/components/charts/quadrant-leader-chart'
import { NetworkGraphChart } from '@/components/charts/network-graph-chart'
import { ScatterPlotChart } from '@/components/charts/scatter-plot-chart'
import { BloomGraphChart } from '@/components/charts/bloom-graph-chart'
import { TimelineChart } from '@/components/charts/timeline-chart'
import { WordCloudChart } from '@/components/charts/word-cloud-chart'
import { HeatmapChart } from '@/components/charts/heatmap-chart'
import { ConfusionMatrixChart } from '@/components/charts/confusion-matrix-chart'
import { ROCCurveChart } from '@/components/charts/roc-curve-chart'
import { SankeyDiagramChart } from '@/components/charts/sankey-diagram-chart'
import { GanttChart } from '@/components/charts/gantt-chart'

// Import new dashboard components
import { LLMSwitcher } from '@/components/dashboard/LLMSwitcher'
import { CodeEditor } from '@/components/ui/code-editor'
import { PromptTemplatesManager } from '@/components/dashboard/PromptTemplatesManager'
import { ResponseTemplatesManager } from '@/components/dashboard/ResponseTemplatesManager'
import { UIElementsFilter } from '@/components/ui/ui-elements-filter'

// Phase 1 Components
import { ItemDetailsCollector } from '@/components/dashboard/ItemDetailsCollector'
import { PhotoProcessor } from '@/components/dashboard/PhotoProcessor'
import { PriceResearcher } from '@/components/dashboard/PriceResearcher'
import { ContentGenerator } from '@/components/dashboard/ContentGenerator'
import { PlatformSelector } from '@/components/dashboard/PlatformSelector'
import { PostingStrategy } from '@/components/dashboard/PostingStrategy'

// Phase 2 Components
import { AutoPostingEngine } from '@/components/dashboard/AutoPostingEngine'
import { LeadMonitor } from '@/components/dashboard/LeadMonitor'
import { NegotiationManager } from '@/components/dashboard/NegotiationManager'
import { SaleProcessor } from '@/components/dashboard/SaleProcessor'

// Admin Components
import { AdminPanel } from '@/components/dashboard/AdminPanel'
import { UserManager } from '@/components/dashboard/UserManager'

// Communication Components
import { MessageCenter } from '@/components/dashboard/MessageCenter'

// Data Visualization Components
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard'

interface ComponentItem {
  component: React.ComponentType<any>
  metadata: {
    name: string
    label: string
    version: string
    date: string
    description: string
    phase?: string
    category?: string
    tags?: string[]
  }
  defaultProps?: Record<string, any>
}

export default function ComponentLibrary() {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [phaseFilter, setPhaseFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')

  // Component registry - ALL COMPONENTS
  const components: ComponentItem[] = useMemo(() => [
    // Core Components
    {
      component: DashboardCard,
      metadata: DashboardCard.metadata || {
        name: "DashboardCard",
        label: "Dashboard Card Wrapper",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Standardized container for dashboard widgets",
        phase: "Core",
        category: "Layout",
        tags: ["core", "layout", "container"]
      }
    },
    {
      component: PriceChart,
      metadata: PriceChart.metadata || {
        name: "PriceChart",
        label: "Price History Chart",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Line chart showing price trends over time",
        phase: "Core",
        category: "Visualization",
        tags: ["core", "chart", "analytics", "price"]
      }
    },
    {
      component: LeadsChart,
      metadata: LeadsChart.metadata || {
        name: "LeadsChart",
        label: "Lead Pipeline Chart",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Pie chart showing lead status distribution",
        phase: "Core",
        category: "Visualization",
        tags: ["core", "chart", "analytics", "leads"]
      }
    },

    // Phase 1 Components
    {
      component: ItemDetailsCollector,
      metadata: ItemDetailsCollector.metadata || {
        name: "ItemDetailsCollector",
        label: "Item Details Collector",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Collects product information for listings",
        phase: "Phase 1",
        category: "Content & Setup",
        tags: ["phase1", "content", "item-management", "form"]
      }
    },
    {
      component: PhotoProcessor,
      metadata: PhotoProcessor.metadata || {
        name: "PhotoProcessor",
        label: "Photo Processor",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Upload, optimize, and manage product photos",
        phase: "Phase 1",
        category: "Content & Setup",
        tags: ["phase1", "content", "photo-management", "upload"]
      }
    },
    {
      component: PriceResearcher,
      metadata: PriceResearcher.metadata || {
        name: "PriceResearcher",
        label: "Price Researcher",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Research competitive pricing across marketplaces",
        phase: "Phase 1",
        category: "Content & Setup",
        tags: ["phase1", "content", "pricing", "research", "analysis"]
      }
    },
    {
      component: ContentGenerator,
      metadata: ContentGenerator.metadata || {
        name: "ContentGenerator",
        label: "Content Generator",
        version: "1.0.0",
        date: "2025-10-08",
        description: "AI-powered content generation for listings",
        phase: "Phase 1",
        category: "Content & Setup",
        tags: ["phase1", "content", "ai", "generation", "seo"]
      }
    },
    {
      component: PlatformSelector,
      metadata: PlatformSelector.metadata || {
        name: "PlatformSelector",
        label: "Platform Selector",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Select and configure marketplace platforms",
        phase: "Phase 1",
        category: "Content & Setup",
        tags: ["phase1", "content", "platform", "marketplace", "configuration"]
      }
    },
    {
      component: PostingStrategy,
      metadata: PostingStrategy.metadata || {
        name: "PostingStrategy",
        label: "Posting Strategy",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Configure posting schedule and optimization strategy",
        phase: "Phase 1",
        category: "Content & Setup",
        tags: ["phase1", "content", "strategy", "scheduling", "optimization"]
      }
    },

    // Phase 2 Components
    {
      component: AutoPostingEngine,
      metadata: AutoPostingEngine.metadata || {
        name: "AutoPostingEngine",
        label: "Auto Posting Engine",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Automated posting across multiple platforms",
        phase: "Phase 2",
        category: "Automation",
        tags: ["phase2", "automation", "posting", "engine", "scheduling"]
      }
    },
    {
      component: LeadMonitor,
      metadata: {
        name: "LeadMonitor",
        label: "Lead Monitor",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Monitor and track leads across platforms",
        phase: "Phase 2",
        category: "Automation",
        tags: ["phase2", "automation", "leads", "monitoring", "tracking"]
      }
    },
    {
      component: NegotiationManager,
      metadata: {
        name: "NegotiationManager",
        label: "Negotiation Manager",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Manage price negotiations and offers",
        phase: "Phase 2",
        category: "Automation",
        tags: ["phase2", "automation", "negotiation", "offers", "pricing"]
      }
    },
    {
      component: SaleProcessor,
      metadata: SaleProcessor.metadata || {
        name: "SaleProcessor",
        label: "Sale Processor",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Process completed sales and transactions",
        phase: "Phase 2",
        category: "Automation",
        tags: ["phase2", "automation", "sales", "transactions", "revenue"]
      }
    },

    // Admin Components
    {
      component: AdminPanel,
      metadata: AdminPanel.metadata || {
        name: "AdminPanel",
        label: "Admin Panel",
        version: "1.0.0",
        date: "2025-10-08",
        description: "System administration and oversight",
        phase: "Core",
        category: "Admin",
        tags: ["admin", "management", "system", "oversight", "control"]
      }
    },
    {
      component: UserManager,
      metadata: UserManager.metadata || {
        name: "UserManager",
        label: "User Manager",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Manage users and their permissions",
        phase: "Core",
        category: "Admin",
        tags: ["user", "management", "profiles", "administration", "permissions"]
      }
    },

    // Communication Components
    {
      component: MessageCenter,
      metadata: MessageCenter.metadata || {
        name: "MessageCenter",
        label: "Message Center",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Centralized messaging and communication",
        phase: "Core",
        category: "Communication",
        tags: ["messaging", "communication", "chat", "notifications", "real-time"]
      }
    },

    // Data Visualization Components
    {
      component: AnalyticsDashboard,
      metadata: {
        name: "AnalyticsDashboard",
        label: "Analytics Dashboard",
        version: "1.0.0",
        date: "2025-10-08",
        description: "Comprehensive data visualization and insights",
        phase: "Core",
        category: "Data Visualization",
        tags: ["analytics", "data", "visualization", "insights", "metrics", "performance"]
      }
    },

    // New Data Visualization Charts
    {
      component: LLMPerformanceChart,
      metadata: LLMPerformanceChart.metadata
    },
    {
      component: TokenUsageChart,
      metadata: TokenUsageChart.metadata
    },
    {
      component: ModelComparisonChart,
      metadata: ModelComparisonChart.metadata
    },
    {
      component: ErrorRateChart,
      metadata: ErrorRateChart.metadata
    },
    {
      component: RequestVolumeChart,
      metadata: RequestVolumeChart.metadata
    },
    {
      component: LatencyDistributionChart,
      metadata: LatencyDistributionChart.metadata
    },
    {
      component: CostAnalysisChart,
      metadata: CostAnalysisChart.metadata
    },
    {
      component: QualityMetricsChart,
      metadata: QualityMetricsChart.metadata
    },
    {
      component: UsagePatternsChart,
      metadata: UsagePatternsChart.metadata
    },

    // Comprehensive Data Visualization Charts
    {
      component: QuadrantLeaderChart,
      metadata: QuadrantLeaderChart.metadata
    },
    {
      component: NetworkGraphChart,
      metadata: NetworkGraphChart.metadata
    },
    {
      component: ScatterPlotChart,
      metadata: ScatterPlotChart.metadata
    },
    {
      component: BloomGraphChart,
      metadata: BloomGraphChart.metadata
    },
    {
      component: TimelineChart,
      metadata: TimelineChart.metadata
    },
    {
      component: WordCloudChart,
      metadata: WordCloudChart.metadata
    },
    {
      component: HeatmapChart,
      metadata: HeatmapChart.metadata
    },
    {
      component: ConfusionMatrixChart,
      metadata: ConfusionMatrixChart.metadata
    },
    {
      component: ROCCurveChart,
      metadata: ROCCurveChart.metadata
    },
    {
      component: SankeyDiagramChart,
      metadata: SankeyDiagramChart.metadata
    },
    {
      component: GanttChart,
      metadata: GanttChart.metadata
    },

    // New Dashboard Components
    {
      component: LLMSwitcher,
      metadata: LLMSwitcher.metadata
    },
    {
      component: CodeEditor,
      metadata: CodeEditor.metadata
    },
    {
      component: PromptTemplatesManager,
      metadata: PromptTemplatesManager.metadata
    },
    {
      component: ResponseTemplatesManager,
      metadata: ResponseTemplatesManager.metadata
    },
    {
      component: UIElementsFilter,
      metadata: UIElementsFilter.metadata
    }
  ], [])

  // Filter and search logic
  const filteredComponents = useMemo(() => {
    return components.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.metadata.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.metadata.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.metadata.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.metadata.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesPhase = phaseFilter === 'all' || item.metadata.phase === phaseFilter
      const matchesTag = tagFilter === 'all' || (item.metadata.tags || []).includes(tagFilter)

      return matchesSearch && matchesPhase && matchesTag
    })
  }, [components, searchQuery, phaseFilter, tagFilter])

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    components.forEach(c => {
      (c.metadata.tags || []).forEach(t => tags.add(t))
    })
    return Array.from(tags).sort()
  }, [components])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const downloadTheme = () => {
    // Get computed CSS variables
    const computedStyle = getComputedStyle(document.documentElement)
    const getCSSVariable = (varName: string) => computedStyle.getPropertyValue(varName).trim()
    
    const themeData = {
      name: 'pow3r.cashout-theme',
      version: '1.0.0',
      buildDate: new Date().toISOString(),
      theme: theme,
      buildInfo: {
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      colors: {
        // Core colors
        primary: getCSSVariable('--primary'),
        primaryForeground: getCSSVariable('--primary-foreground'),
        secondary: getCSSVariable('--secondary'),
        secondaryForeground: getCSSVariable('--secondary-foreground'),
        background: getCSSVariable('--background'),
        foreground: getCSSVariable('--foreground'),
        
        // Card colors
        card: getCSSVariable('--card'),
        cardForeground: getCSSVariable('--card-foreground'),
        popover: getCSSVariable('--popover'),
        popoverForeground: getCSSVariable('--popover-foreground'),
        
        // Muted colors
        muted: getCSSVariable('--muted'),
        mutedForeground: getCSSVariable('--muted-foreground'),
        accent: getCSSVariable('--accent'),
        accentForeground: getCSSVariable('--accent-foreground'),
        
        // Semantic colors
        destructive: getCSSVariable('--destructive'),
        destructiveForeground: getCSSVariable('--destructive-foreground'),
        success: getCSSVariable('--success'),
        successForeground: getCSSVariable('--success-foreground'),
        warning: getCSSVariable('--warning'),
        warningForeground: getCSSVariable('--warning-foreground'),
        info: getCSSVariable('--info'),
        infoForeground: getCSSVariable('--info-foreground'),
        
        // UI colors
        border: getCSSVariable('--border'),
        input: getCSSVariable('--input'),
        ring: getCSSVariable('--ring'),
        radius: getCSSVariable('--radius')
      },
      css: {
        computed: document.documentElement.style.cssText,
            allVariables: Object.fromEntries(
              Array.from(document.styleSheets)
                .flatMap(sheet => {
                  try {
                    return Array.from(sheet.cssRules)
                      .filter(rule => rule.type === CSSRule.STYLE_RULE)
                      .flatMap(rule => {
                        const styleRule = rule as CSSStyleRule
                        return Array.from(styleRule.style)
                      })
                      .filter((prop: string) => prop.startsWith('--'))
                      .map((prop: string) => [prop, getCSSVariable(prop)])
                  } catch (e) {
                    return []
                  }
                })
            )
      },
      components: {
        total: components.length,
        filtered: filteredComponents.length,
        categories: Array.from(new Set(components.map(c => c.metadata.category))),
        phases: Array.from(new Set(components.map(c => c.metadata.phase))),
        tags: allTags
      }
    }
    
    // Create both JSON and CSS exports
    const jsonBlob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' })
    const cssContent = `/* pow3r.cashout Theme Export - ${theme} */
/* Generated: ${new Date().toISOString()} */
/* Build: ${themeData.buildInfo.timestamp} */

:root {
${Object.entries(themeData.colors)
  .filter(([key]) => !key.includes('Foreground'))
  .map(([key, value]) => `  --${key}: ${value};`)
  .join('\n')}
}

.dark {
${Object.entries(themeData.colors)
  .filter(([key]) => !key.includes('Foreground'))
  .map(([key, value]) => `  --${key}: ${value};`)
  .join('\n')}
}

/* Component Library Info */
/* Total Components: ${themeData.components.total} */
/* Filtered Components: ${themeData.components.filtered} */
/* Categories: ${themeData.components.categories.join(', ')} */
/* Phases: ${themeData.components.phases.join(', ')} */
`
    
    const cssBlob = new Blob([cssContent], { type: 'text/css' })
    
    // Download JSON
    const jsonUrl = URL.createObjectURL(jsonBlob)
    const jsonLink = document.createElement('a')
    jsonLink.href = jsonUrl
    jsonLink.download = `pow3r-cashout-theme-${theme}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(jsonLink)
    jsonLink.click()
    document.body.removeChild(jsonLink)
    URL.revokeObjectURL(jsonUrl)
    
    // Download CSS
    const cssUrl = URL.createObjectURL(cssBlob)
    const cssLink = document.createElement('a')
    cssLink.href = cssUrl
    cssLink.download = `pow3r-cashout-theme-${theme}-${new Date().toISOString().split('T')[0]}.css`
    document.body.appendChild(cssLink)
    cssLink.click()
    document.body.removeChild(cssLink)
    URL.revokeObjectURL(cssUrl)
  }

  return (
    <GridProvider defaultSize="1/2">
      <div className="min-h-screen bg-background">
        {/* Fixed Header with Search, Filters, and Controls */}
        <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 md:px-8">
            {/* Main Header Row */}
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/'}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <h1 className="text-xl font-bold">Component Library</h1>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline">{filteredComponents.length} components</Badge>
                <GridSwitcher />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Light
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Dark
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadTheme}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Theme
                </Button>
              </div>
            </div>

            {/* Search and Filters Row */}
            <div className="pb-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search components..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Phase Filter */}
                <div>
                  <Select value={phaseFilter} onValueChange={setPhaseFilter}>
                    <SelectTrigger>
                      <Package className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Phases</SelectItem>
                      <SelectItem value="Core">Core</SelectItem>
                      <SelectItem value="Phase 1">Phase 1</SelectItem>
                      <SelectItem value="Phase 2">Phase 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tag Filter */}
                <div>
                  <Select value={tagFilter} onValueChange={setTagFilter}>
                    <SelectTrigger>
                      <Tag className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      {allTags.map(tag => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchQuery || phaseFilter !== 'all' || tagFilter !== 'all') && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {searchQuery && (
                    <Badge variant="secondary" className="text-xs">
                      Search: {searchQuery}
                    </Badge>
                  )}
                  {phaseFilter !== 'all' && (
                    <Badge variant="outline" className="text-xs">
                      Phase: {phaseFilter}
                    </Badge>
                  )}
                  {tagFilter !== 'all' && (
                    <Badge variant="outline" className="text-xs">
                      Tag: {tagFilter}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('')
                      setPhaseFilter('all')
                      setTagFilter('all')
                    }}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spacer to account for fixed header */}
        <div className="h-32"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8">

        {/* Component Grid */}
        <ResponsiveGrid>
          <div className="space-y-12">
            {filteredComponents.length > 0 ? (
              filteredComponents.map((item, index) => (
                <section key={item.metadata.name} id={item.metadata.name}>
                  {/* Component Metadata Card */}
                  <Card className="mb-4">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-2xl">{item.metadata.label}</CardTitle>
                            <Badge variant="outline">v{item.metadata.version}</Badge>
                            {item.metadata.phase && (
                              <Badge variant={item.metadata.phase === 'Phase 1' ? 'default' : item.metadata.phase === 'Phase 2' ? 'secondary' : 'outline'}>
                                {item.metadata.phase}
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{item.metadata.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                            <Package className="w-3 h-3" />
                            <span className="text-xs">Component</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{item.metadata.name}</code>
                        </div>
                        <div>
                          <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                            <Calendar className="w-3 h-3" />
                            <span className="text-xs">Updated</span>
                          </div>
                          <p className="text-xs">{item.metadata.date}</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                            <Grid3x3 className="w-3 h-3" />
                            <span className="text-xs">Category</span>
                          </div>
                          <p className="text-xs">{item.metadata.category || 'General'}</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                            <Tag className="w-3 h-3" />
                            <span className="text-xs">Tags</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {(item.metadata.tags || []).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Component Preview */}
                  <div className="border rounded-lg p-6 bg-card">
                    <h3 className="text-sm font-medium mb-4 text-muted-foreground flex items-center space-x-2">
                      <Grid3x3 className="w-4 h-4" />
                      <span>Component Preview</span>
                    </h3>
                    <div className="min-h-[200px]">
                      <item.component {...(item.defaultProps || {})} />
                    </div>
                  </div>

                  {index < filteredComponents.length - 1 && <Separator className="my-12" />}
                </section>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No components match your search criteria</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('')
                    setPhaseFilter('all')
                    setTagFilter('all')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </ResponsiveGrid>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            pow3r.cashout Component Library • {components.length} Total Components
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Built with React + Vite + Tailwind CSS + Zustand
          </p>
        </div>
      </div>
    </GridProvider>
  )
}
