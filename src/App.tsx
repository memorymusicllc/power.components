/**
 * Main Dashboard Application
 * Single-page dashboard with functional widgets powered by Zustand stores
 * 
 * @version 2.0.0
 * @date 2025-10-08
 */

import { useEffect, useState } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth-context'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { getAppVersion } from '@/lib/version'

// Zustand Stores
import { useDashboardStore } from '@/lib/stores/dashboard.store'
import { useListingsStore } from '@/lib/stores/listings.store'
import { useAutoResponderStore } from '@/lib/stores/auto-responder.store'

// Dashboard Components Library
import { DashboardOverview } from '@/components/dashboard-overview'
import { ListingManagement } from '@/components/listing-management'
import { AutoResponderManager } from '@/components/auto-responder-manager'
import { LeadsManager } from '@/components/leads-manager'

// Phase Dashboards
import { Phase1Dashboard } from '@/components/Phase1Dashboard'
import { Phase2Dashboard } from '@/components/Phase2Dashboard'

// Navigation Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Search Components
import { SearchHeader } from '@/components/search/SearchIntegration'

// Icons
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  FileText,
  TrendingUp,
  Activity,
  RefreshCw,
  Settings,
  Home,
  List,
  UserCheck,
  Bot,
  Package,
  Zap
} from 'lucide-react'

function Dashboard() {
  // Dashboard metrics
  const { metrics, loading: dashLoading, fetchMetrics } = useDashboardStore()
  
  // Listings data
  const { listings, loading: listingsLoading, fetchListings } = useListingsStore()
  
  // Auto-responder data  
  const { rules, loading: rulesLoading, fetchRules } = useAutoResponderStore()
  
  const version = getAppVersion()

  // Fetch all data on mount
  useEffect(() => {
    fetchMetrics()
    fetchListings()
    fetchRules()
  }, [fetchMetrics, fetchListings, fetchRules])

  const handleRefreshAll = async () => {
    await Promise.all([
      fetchMetrics(),
      fetchListings(),
      fetchRules()
    ])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
              <h1 className="text-3xl font-bold">pow3r.cashout</h1>
              <p className="text-muted-foreground">Multi-Platform Selling Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-mono">{version}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshAll}
              disabled={dashLoading || listingsLoading || rulesLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${(dashLoading || listingsLoading || rulesLoading) ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

          {/* Universal Search */}
          <SearchHeader
            data={[
              ...listings.map(listing => ({
                id: listing.id,
                title: listing.title || listing.platformId,
                description: listing.description,
                category: 'listings',
                type: 'listing',
                tags: [listing.status, listing.platformId],
                timestamp: listing.updatedAt
              })),
              ...rules.map(rule => ({
                id: rule.id,
                title: rule.name,
                description: rule.conditions || '',
                category: 'automation',
                type: 'rule',
                tags: [rule.platforms.join(','), rule.triggers.join(',')],
                timestamp: rule.updatedAt
              })),
              {
                id: 'metrics',
                title: 'Dashboard Metrics',
                description: 'View dashboard statistics and analytics',
                category: 'analytics',
                type: 'metrics',
                tags: ['dashboard', 'stats'],
                timestamp: new Date()
              }
            ]}
            onResultSelect={(result) => {
              console.log('Search result selected:', result)
              // Handle search result selection
            }}
          />
        </div>
      </div>

      {/* Main Content with Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="phase1" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Phase 1</span>
            </TabsTrigger>
            <TabsTrigger value="phase2" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Phase 2</span>
            </TabsTrigger>
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Listings</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Leads</span>
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Automation</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="phase1" className="space-y-6">
            <Phase1Dashboard />
          </TabsContent>

          <TabsContent value="phase2" className="space-y-6">
            <Phase2Dashboard />
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <ListingManagement />
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <LeadsManager />
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <AutoResponderManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pow3r-cashout-theme" attribute="class">
      <AuthProvider>
        <Dashboard />
      <Toaster />
      <SonnerToaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App