/**
 * Main Dashboard Application
 * Single-page dashboard with functional widgets powered by Zustand stores
 * 
 * @version 2.0.0
 * @date 2025-10-08
 */

import { useEffect } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth-context'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { DashboardCard } from '@/components/ui/dashboard-card'
import { getAppVersion } from '@/lib/version'

// Zustand Stores
import { useDashboardStore } from '@/lib/stores/dashboard.store'
import { useListingsStore } from '@/lib/stores/listings.store'
import { useAutoResponderStore } from '@/lib/stores/auto-responder.store'

// Dashboard Widget Components
import { PriceChart } from '@/components/charts/price-chart'
import { LeadsChart } from '@/components/charts/leads-chart'

// Icons
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  FileText,
  TrendingUp,
  Activity,
  RefreshCw
} from 'lucide-react'
import { Button } from './components/ui/button'

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
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Dashboard Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">pow3r.cashout</h1>
          <p className="text-muted-foreground">Dashboard Overview</p>
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

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Price Chart Widget */}
        <DashboardCard
          title="Price History"
          description="Track pricing strategy over time"
          icon={<TrendingUp className="w-5 h-5" />}
          className="lg:col-span-2"
        >
          <PriceChart />
        </DashboardCard>

        {/* Leads Chart Widget */}
        <DashboardCard
          title="Lead Pipeline"
          description="View lead status distribution"
          icon={<Users className="w-5 h-5" />}
        >
          <LeadsChart />
        </DashboardCard>

        {/* Quick Stats Widget - Connected to Store */}
        <DashboardCard
          title="Today's Activity"
          description="Real-time metrics"
          icon={<Activity className="w-5 h-5" />}
          loading={dashLoading}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{metrics.totalViews.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="text-sm text-muted-foreground">New Leads</p>
                <p className="text-2xl font-bold">{metrics.newLeads}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="text-sm text-muted-foreground">Messages</p>
                <p className="text-2xl font-bold">{metrics.messages}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </DashboardCard>

        {/* Listings Widget - Connected to Store */}
        <DashboardCard
          title="Active Listings"
          description="Your marketplace presence"
          icon={<FileText className="w-5 h-5" />}
          className="lg:col-span-2"
          loading={listingsLoading}
        >
          <div className="space-y-3">
            {listings.length > 0 ? (
              listings.slice(0, 3).map((listing, index) => (
                <div key={listing.id || index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{listing.platformId || 'Unknown Platform'}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      listing.status === 'active' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {listing.status || 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {listing.title || 'No title'} • {listing.views || 0} views
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No active listings yet
              </div>
            )}
          </div>
        </DashboardCard>

        {/* Auto-Responder Stats - Connected to Store */}
        <DashboardCard
          title="Auto-Responder"
          description="Automated response system"
          loading={rulesLoading}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="text-sm">Active Rules</span>
              <span className="text-xl font-bold">{rules.filter(r => r.isActive).length}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="text-sm">Total Rules</span>
              <span className="text-xl font-bold">{rules.length}</span>
            </div>
          </div>
        </DashboardCard>

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