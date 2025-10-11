/**
 * Analytics Dashboard Component - Phase 2 Core
 * Comprehensive analytics, reporting, and optimization insights
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import React, { useEffect, useState } from 'react'
import { useAnalyticsStore } from '@/lib/stores/analytics.store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/design-system'
import { Button } from '@/lib/design-system'
import { Badge } from '@/lib/design-system'
import { Progress } from '@/lib/design-system'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/design-system'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  MessageSquare,
  Target,
  Download,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  FileText,
  Share2,
  XCircle
} from 'lucide-react'

export function AnalyticsDashboard() {
  const {
    metrics,
    insights,
    reportTemplates,
    customDashboards,
    loading,
    generating,
    exporting,
    fetchMetrics,
    fetchInsights,
    fetchReportTemplates,
    fetchCustomDashboards,
    createInsight,
    implementInsight,
    dismissInsight,
    generateReport,
    generateCustomReport,
    createDashboard,
    exportData,
    refreshAll
  } = useAnalyticsStore()

  const [activeTab, setActiveTab] = useState('overview')
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')

  useEffect(() => {
    refreshAll()
  }, [])

  const handleCreateInsight = async () => {
    const newInsight = {
      category: 'pricing' as const,
      title: 'Optimize Pricing Strategy',
      description: 'Consider adjusting prices based on market demand and competitor analysis.',
      impact: 'high' as const,
      confidence: 0.85,
      suggestedAction: 'Reduce prices by 5-10% for faster sales',
      expectedImprovement: '15-20% increase in conversion rate',
      implementationEffort: 'low' as const,
      isImplemented: false
    }
    await createInsight(newInsight)
  }

  const handleGenerateReport = async (templateId: string) => {
    try {
      const reportUrl = await generateReport(templateId, selectedTimeRange)
      console.log('Report generated:', reportUrl)
    } catch (error) {
      console.error('Failed to generate report:', error)
    }
  }

  const handleExportData = async () => {
    try {
      const exportUrl = await exportData('excel', selectedTimeRange, ['revenue', 'leads', 'conversions'])
      console.log('Data exported:', exportUrl)
    } catch (error) {
      console.error('Failed to export data:', error)
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'destructive'
      case 'high': return 'default'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'default'
      case 'medium': return 'secondary'
      case 'high': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive analytics, reporting, and optimization insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={refreshAll} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportData} disabled={exporting}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateInsight}>
            <Lightbulb className="w-4 h-4 mr-2" />
            New Insight
          </Button>
        </div>
          </div>
          
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {metrics.revenueGrowth > 0 ? (
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
              )}
              {Math.abs(metrics.revenueGrowth)}% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics.conversionRate * 100)}%</div>
            <Progress value={metrics.conversionRate * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeListings}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.totalListings} total listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Sale Price</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.averageSalePrice.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(metrics.profitMargin * 100)}% profit margin
            </p>
          </CardContent>
        </Card>
          </div>
          
      {/* Platform Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
          <CardDescription>Performance metrics across different platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(metrics.platformBreakdown).map(([platform, data]) => (
              <div key={platform} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{platform}</span>
                  <Badge variant="outline">{data.listings} listings</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Leads:</span>
                    <span>{data.leads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales:</span>
                    <span>{data.sales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span>${data.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion:</span>
                    <span>{Math.round(data.conversionRate * 100)}%</span>
                  </div>
                </div>
            </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recent Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Performance</CardTitle>
                <CardDescription>Last 7 days performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.dailyStats.slice(-7).map((day, index) => (
                    <div key={day.date} className="flex items-center justify-between">
                      <div className="text-sm">{new Date(day.date).toLocaleDateString()}</div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>{day.listings} listings</span>
                        <span>{day.leads} leads</span>
                        <span>{day.sales} sales</span>
                        <span className="font-medium">${day.revenue}</span>
          </div>
        </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Automation Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Automation Performance</CardTitle>
                <CardDescription>AI and automation effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
          <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-Posting Success</span>
                    <div className="flex items-center gap-2">
                      <Progress value={metrics.autoPostingSuccess} className="w-20" />
                      <span className="text-sm font-medium">{Math.round(metrics.autoPostingSuccess)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-Response Success</span>
                    <div className="flex items-center gap-2">
                      <Progress value={metrics.autoResponseSuccess} className="w-20" />
                      <span className="text-sm font-medium">{Math.round(metrics.autoResponseSuccess)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Automation Efficiency</span>
                    <div className="flex items-center gap-2">
                      <Progress value={metrics.automationEfficiency} className="w-20" />
                      <span className="text-sm font-medium">{Math.round(metrics.automationEfficiency)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Optimization Insights</h3>
            <Button onClick={handleCreateInsight}>
              <Lightbulb className="w-4 h-4 mr-2" />
              New Insight
            </Button>
                </div>
                
          <div className="grid gap-4">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{insight.title}</CardTitle>
                      <CardDescription>{insight.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getImpactColor(insight.impact)}>
                        {insight.impact} impact
                      </Badge>
                      <Badge variant={getEffortColor(insight.implementationEffort)}>
                        {insight.implementationEffort} effort
                      </Badge>
                      <Badge variant={insight.isImplemented ? 'default' : 'outline'}>
                        {insight.isImplemented ? 'Implemented' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <strong>Suggested Action:</strong> {insight.suggestedAction}
                    </div>
                    <div className="text-sm">
                      <strong>Expected Improvement:</strong> {insight.expectedImprovement}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Confidence: {Math.round(insight.confidence * 100)}%
                      </div>
                      <div className="flex items-center gap-2">
                        {!insight.isImplemented && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => implementInsight(insight.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Implement
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => dismissInsight(insight.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Dismiss
                        </Button>
                      </div>
                </div>
              </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Report Templates</h3>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
          
          <div className="grid gap-4">
            {reportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{template.timeRange}</Badge>
                      <Badge variant="secondary">{template.format}</Badge>
                      <Badge variant={template.isActive ? 'default' : 'outline'}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <strong>Metrics:</strong> {template.metrics.join(', ')}
                    </div>
                    {template.schedule && (
                      <div className="text-sm">
                        <strong>Schedule:</strong> {template.schedule.frequency} at {template.schedule.time}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {template.lastGenerated ? `Last generated: ${new Date(template.lastGenerated).toLocaleString()}` : 'Never generated'}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleGenerateReport(template.id)}
                          disabled={generating}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Generate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Custom Dashboards</h3>
            <Button onClick={() => createDashboard({
              name: 'New Dashboard',
              description: 'Custom analytics dashboard',
              widgets: [],
              isPublic: false
            })}>
              <BarChart3 className="w-4 h-4 mr-2" />
              New Dashboard
            </Button>
        </div>

          <div className="grid gap-4">
            {customDashboards.map((dashboard) => (
              <Card key={dashboard.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
            <div>
                      <CardTitle className="text-base">{dashboard.name}</CardTitle>
                      <CardDescription>{dashboard.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={dashboard.isPublic ? 'default' : 'outline'}>
                        {dashboard.isPublic ? 'Public' : 'Private'}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {dashboard.widgets.length} widgets
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <strong>Widgets:</strong> {dashboard.widgets.length} configured
            </div>
                    <div className="text-sm">
                      <strong>Updated:</strong> {new Date(dashboard.updatedAt).toLocaleString()}
            </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Created: {new Date(dashboard.createdAt).toLocaleString()}
            </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}