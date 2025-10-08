/**
 * Analytics Dashboard Component
 * Comprehensive data visualization and insights
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags analytics,data,visualization,insights,metrics
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { BarChart3, TrendingUp, Eye, DollarSign, Users, Calendar, Download, RefreshCw } from 'lucide-react'

interface AnalyticsDashboardProps {
  onDataRefresh?: () => void
  loading?: boolean
}

export function AnalyticsDashboard({ onDataRefresh, loading }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('all')

  const [metrics, setMetrics] = useState({
    totalRevenue: 15420,
    totalViews: 2847,
    conversionRate: 12.5,
    averagePrice: 850,
    totalListings: 15,
    activeListings: 12,
    completedSales: 18,
    pendingSales: 3
  })

  const [performanceData, setPerformanceData] = useState([
    { platform: 'eBay', views: 1200, sales: 8, revenue: 6400, conversion: 6.7 },
    { platform: 'Facebook', views: 850, sales: 5, revenue: 3200, conversion: 5.9 },
    { platform: 'Craigslist', views: 450, sales: 3, revenue: 2100, conversion: 6.7 },
    { platform: 'Amazon', views: 347, sales: 2, revenue: 3720, conversion: 5.8 }
  ])

  const [trendData, setTrendData] = useState([
    { date: '2025-10-01', revenue: 1200, views: 450, sales: 2 },
    { date: '2025-10-02', revenue: 1800, views: 520, sales: 3 },
    { date: '2025-10-03', revenue: 2100, views: 680, sales: 4 },
    { date: '2025-10-04', revenue: 1500, views: 420, sales: 2 },
    { date: '2025-10-05', revenue: 2200, views: 750, sales: 3 },
    { date: '2025-10-06', revenue: 1900, views: 580, sales: 2 },
    { date: '2025-10-07', revenue: 2500, views: 720, sales: 4 }
  ])

  const getPerformanceColor = (conversion: number) => {
    if (conversion >= 7) return 'text-green-500'
    if (conversion >= 5) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <CardTitle>Analytics Dashboard</CardTitle>
          </div>
          <Badge variant="outline">Data & Insights</Badge>
        </div>
        <CardDescription>
          Comprehensive data visualization and insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <TrendingUp className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="views">Views</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
          
          <Button size="sm" variant="outline" onClick={onDataRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-green-500/10">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Total Revenue</span>
            </div>
            <div className="text-2xl font-bold text-green-500">${metrics.totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">+12.5% from last month</div>
          </div>
          
          <div className="p-4 rounded-lg bg-blue-500/10">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Total Views</span>
            </div>
            <div className="text-2xl font-bold text-blue-500">{metrics.totalViews.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">+8.2% from last month</div>
          </div>
          
          <div className="p-4 rounded-lg bg-purple-500/10">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Conversion Rate</span>
            </div>
            <div className="text-2xl font-bold text-purple-500">{metrics.conversionRate}%</div>
            <div className="text-xs text-muted-foreground">+2.1% from last month</div>
          </div>
          
          <div className="p-4 rounded-lg bg-orange-500/10">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Active Listings</span>
            </div>
            <div className="text-2xl font-bold text-orange-500">{metrics.activeListings}</div>
            <div className="text-xs text-muted-foreground">of {metrics.totalListings} total</div>
          </div>
        </div>

        {/* Platform Performance */}
        <div className="space-y-4">
          <h4 className="font-medium">Platform Performance</h4>
          <div className="space-y-3">
            {performanceData.map((platform, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-medium">{platform.platform}</h5>
                    <p className="text-sm text-muted-foreground">
                      {platform.views} views • {platform.sales} sales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${platform.revenue.toLocaleString()}</p>
                    <p className={`text-sm ${getPerformanceColor(platform.conversion)}`}>
                      {platform.conversion}% conversion
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(platform.views / Math.max(...performanceData.map(p => p.views))) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Revenue Trend</h4>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="grid grid-cols-7 gap-2">
              {trendData.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="w-full bg-muted rounded h-16 flex items-end">
                    <div 
                      className="w-full bg-primary rounded"
                      style={{ height: `${(day.revenue / Math.max(...trendData.map(d => d.revenue))) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs font-medium mt-1">${day.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="p-4 rounded-lg bg-muted/50">
          <h4 className="font-medium mb-3">Quick Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Best Performing Platform</p>
              <p className="font-medium">eBay - 6.7% conversion rate</p>
            </div>
            <div>
              <p className="text-muted-foreground">Peak Sales Day</p>
              <p className="font-medium">Sunday - 25% of weekly sales</p>
            </div>
            <div>
              <p className="text-muted-foreground">Average Sale Price</p>
              <p className="font-medium">${metrics.averagePrice}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Sales Velocity</p>
              <p className="font-medium">2.1 sales per day</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

AnalyticsDashboard.metadata = {
  name: "AnalyticsDashboard",
  label: "Analytics Dashboard",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Comprehensive data visualization and insights",
  phase: "Core",
  category: "Data Visualization",
  tags: ["analytics", "data", "visualization", "insights", "metrics", "performance"]
}
