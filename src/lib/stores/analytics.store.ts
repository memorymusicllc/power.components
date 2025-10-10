/**
 * Analytics Store - Phase 2 Core
 * Handles comprehensive analytics, reporting, and optimization insights
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import { create } from 'zustand'
import { api } from '@/lib/api-client'

export interface PerformanceMetrics {
  // Listing Performance
  totalListings: number
  activeListings: number
  soldListings: number
  averageTimeToSale: number
  averagePriceReduction: number
  
  // Lead Performance
  totalLeads: number
  qualifiedLeads: number
  conversionRate: number
  averageLeadScore: number
  responseTime: number
  
  // Revenue Metrics
  totalRevenue: number
  averageSalePrice: number
  profitMargin: number
  revenueGrowth: number
  
  // Platform Performance
  platformBreakdown: Record<string, {
    listings: number
    leads: number
    sales: number
    revenue: number
    conversionRate: number
  }>
  
  // Automation Performance
  autoPostingSuccess: number
  autoResponseSuccess: number
  automationEfficiency: number
  
  // Time-based metrics
  dailyStats: Array<{
    date: string
    listings: number
    leads: number
    sales: number
    revenue: number
  }>
  
  weeklyStats: Array<{
    week: string
    listings: number
    leads: number
    sales: number
    revenue: number
  }>
  
  monthlyStats: Array<{
    month: string
    listings: number
    leads: number
    sales: number
    revenue: number
  }>
  
  lastUpdated: string
}

export interface OptimizationInsight {
  id: string
  category: 'pricing' | 'content' | 'timing' | 'platform' | 'automation'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  suggestedAction: string
  expectedImprovement: string
  implementationEffort: 'low' | 'medium' | 'high'
  isImplemented: boolean
  createdAt: string
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  metrics: string[]
  timeRange: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  format: 'dashboard' | 'pdf' | 'excel' | 'csv'
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    time: string
    recipients: string[]
  }
  isActive: boolean
  lastGenerated?: string
}

export interface CustomDashboard {
  id: string
  name: string
  description: string
  widgets: Array<{
    id: string
    type: 'chart' | 'metric' | 'table' | 'gauge'
    title: string
    dataSource: string
    config: any
    position: { x: number; y: number; w: number; h: number }
  }>
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface AnalyticsConfig {
  dataRetentionDays: number
  realTimeUpdates: boolean
  alertThresholds: {
    lowConversionRate: number
    highLeadVolume: number
    lowRevenue: number
    systemErrors: number
  }
  reportingSchedule: {
    daily: boolean
    weekly: boolean
    monthly: boolean
  }
  exportFormats: string[]
}

interface AnalyticsState {
  // Core data
  metrics: PerformanceMetrics
  insights: OptimizationInsight[]
  reportTemplates: ReportTemplate[]
  customDashboards: CustomDashboard[]
  
  // Configuration
  config: AnalyticsConfig
  
  // Loading states
  loading: boolean
  generating: boolean
  exporting: boolean
  
  // Real-time updates
  isConnected: boolean
  lastUpdate: string
  
  // Actions
  fetchMetrics: () => Promise<void>
  fetchInsights: () => Promise<void>
  fetchReportTemplates: () => Promise<void>
  fetchCustomDashboards: () => Promise<void>
  
  // Insights management
  createInsight: (insight: Omit<OptimizationInsight, 'id' | 'createdAt'>) => Promise<void>
  updateInsight: (id: string, updates: Partial<OptimizationInsight>) => Promise<void>
  implementInsight: (id: string) => Promise<void>
  dismissInsight: (id: string) => Promise<void>
  
  // Report generation
  generateReport: (templateId: string, timeRange?: string) => Promise<string>
  generateCustomReport: (metrics: string[], timeRange: string, format: string) => Promise<string>
  scheduleReport: (templateId: string, schedule: ReportTemplate['schedule']) => Promise<void>
  
  // Dashboard management
  createDashboard: (dashboard: Omit<CustomDashboard, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateDashboard: (id: string, updates: Partial<CustomDashboard>) => Promise<void>
  deleteDashboard: (id: string) => Promise<void>
  shareDashboard: (id: string, isPublic: boolean) => Promise<void>
  
  // Data export
  exportData: (format: string, timeRange: string, metrics: string[]) => Promise<string>
  exportInsights: (format: string) => Promise<string>
  exportTransactions: (format: string, timeRange: string) => Promise<string>
  
  // Configuration
  updateConfig: (config: Partial<AnalyticsConfig>) => Promise<void>
  
  // Real-time updates
  startRealTimeUpdates: () => void
  stopRealTimeUpdates: () => void
  
  // Utility
  refreshAll: () => Promise<void>
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  // Initial state
  metrics: {
    totalListings: 0,
    activeListings: 0,
    soldListings: 0,
    averageTimeToSale: 0,
    averagePriceReduction: 0,
    totalLeads: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
    averageLeadScore: 0,
    responseTime: 0,
    totalRevenue: 0,
    averageSalePrice: 0,
    profitMargin: 0,
    revenueGrowth: 0,
    platformBreakdown: {},
    autoPostingSuccess: 0,
    autoResponseSuccess: 0,
    automationEfficiency: 0,
    dailyStats: [],
    weeklyStats: [],
    monthlyStats: [],
    lastUpdated: new Date().toISOString()
  },
  insights: [],
  reportTemplates: [],
  customDashboards: [],
  config: {
    dataRetentionDays: 365,
    realTimeUpdates: true,
    alertThresholds: {
      lowConversionRate: 0.1,
      highLeadVolume: 100,
      lowRevenue: 1000,
      systemErrors: 5
    },
    reportingSchedule: {
      daily: true,
      weekly: true,
      monthly: true
    },
    exportFormats: ['pdf', 'excel', 'csv', 'json']
  },
  loading: false,
  generating: false,
  exporting: false,
  isConnected: false,
  lastUpdate: new Date().toISOString(),

  // Core data fetching
  fetchMetrics: async () => {
    set({ loading: true })
    try {
      const response = await api.getAnalyticsMetrics()
      set({ 
        metrics: response.data,
        loading: false,
        lastUpdate: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to fetch analytics metrics:', error)
      set({ loading: false })
    }
  },

  fetchInsights: async () => {
    try {
      const response = await api.getOptimizationInsights()
      set({ insights: Array.isArray(response.data) ? response.data : [] })
    } catch (error) {
      console.error('Failed to fetch optimization insights:', error)
    }
  },

  fetchReportTemplates: async () => {
    try {
      const response = await api.getReportTemplates()
      set({ reportTemplates: Array.isArray(response.data) ? response.data : [] })
    } catch (error) {
      console.error('Failed to fetch report templates:', error)
    }
  },

  fetchCustomDashboards: async () => {
    try {
      const response = await api.getCustomDashboards()
      set({ customDashboards: Array.isArray(response.data) ? response.data : [] })
    } catch (error) {
      console.error('Failed to fetch custom dashboards:', error)
    }
  },

  // Insights management
  createInsight: async (insightData) => {
    try {
      const newInsight = {
        ...insightData,
        id: `insight-${Date.now()}`,
        createdAt: new Date().toISOString()
      }
      
      const response = await api.createOptimizationInsight(newInsight)
      set(state => ({
        insights: [...state.insights, response.data]
      }))
    } catch (error) {
      console.error('Failed to create optimization insight:', error)
    }
  },

  updateInsight: async (id, updates) => {
    try {
      const response = await api.updateOptimizationInsight(id, updates)
      set(state => ({
        insights: state.insights.map(insight => 
          insight.id === id ? { ...insight, ...response.data } : insight
        )
      }))
    } catch (error) {
      console.error('Failed to update optimization insight:', error)
    }
  },

  implementInsight: async (id) => {
    try {
      const response = await api.implementOptimizationInsight(id)
      set(state => ({
        insights: state.insights.map(insight => 
          insight.id === id ? { ...insight, isImplemented: true } : insight
        )
      }))
    } catch (error) {
      console.error('Failed to implement optimization insight:', error)
    }
  },

  dismissInsight: async (id) => {
    try {
      await api.dismissOptimizationInsight(id)
      set(state => ({
        insights: state.insights.filter(insight => insight.id !== id)
      }))
    } catch (error) {
      console.error('Failed to dismiss optimization insight:', error)
    }
  },

  // Report generation
  generateReport: async (templateId, timeRange) => {
    set({ generating: true })
    try {
      const response = await api.generateReport(templateId, timeRange)
      set({ generating: false })
      return response.data.url
    } catch (error) {
      console.error('Failed to generate report:', error)
      set({ generating: false })
      throw error
    }
  },

  generateCustomReport: async (metrics, timeRange, format) => {
    set({ generating: true })
    try {
      const response = await api.generateCustomReport({ metrics, timeRange, format })
      set({ generating: false })
      return response.data.url
    } catch (error) {
      console.error('Failed to generate custom report:', error)
      set({ generating: false })
      throw error
    }
  },

  scheduleReport: async (templateId, schedule) => {
    try {
      const response = await api.scheduleReport(templateId, schedule)
      set(state => ({
        reportTemplates: state.reportTemplates.map(template => 
          template.id === templateId ? { ...template, schedule: response.data } : template
        )
      }))
    } catch (error) {
      console.error('Failed to schedule report:', error)
    }
  },

  // Dashboard management
  createDashboard: async (dashboardData) => {
    try {
      const newDashboard = {
        ...dashboardData,
        id: `dashboard-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const response = await api.createCustomDashboard(newDashboard)
      set(state => ({
        customDashboards: [...state.customDashboards, response.data]
      }))
    } catch (error) {
      console.error('Failed to create custom dashboard:', error)
    }
  },

  updateDashboard: async (id, updates) => {
    try {
      const response = await api.updateCustomDashboard(id, {
        ...updates,
        updatedAt: new Date().toISOString()
      })
      set(state => ({
        customDashboards: state.customDashboards.map(dashboard => 
          dashboard.id === id ? { ...dashboard, ...response.data } : dashboard
        )
      }))
    } catch (error) {
      console.error('Failed to update custom dashboard:', error)
    }
  },

  deleteDashboard: async (id) => {
    try {
      await api.deleteCustomDashboard(id)
      set(state => ({
        customDashboards: state.customDashboards.filter(dashboard => dashboard.id !== id)
      }))
    } catch (error) {
      console.error('Failed to delete custom dashboard:', error)
    }
  },

  shareDashboard: async (id, isPublic) => {
    try {
      const response = await api.shareCustomDashboard(id, isPublic)
      set(state => ({
        customDashboards: state.customDashboards.map(dashboard => 
          dashboard.id === id ? { ...dashboard, isPublic: response.data.isPublic } : dashboard
        )
      }))
    } catch (error) {
      console.error('Failed to share dashboard:', error)
    }
  },

  // Data export
  exportData: async (format, timeRange, metrics) => {
    set({ exporting: true })
    try {
      const response = await api.exportAnalyticsData({ format, timeRange, metrics })
      set({ exporting: false })
      return response.data.url
    } catch (error) {
      console.error('Failed to export data:', error)
      set({ exporting: false })
      throw error
    }
  },

  exportInsights: async (format) => {
    set({ exporting: true })
    try {
      const response = await api.exportOptimizationInsights(format)
      set({ exporting: false })
      return response.data.url
    } catch (error) {
      console.error('Failed to export insights:', error)
      set({ exporting: false })
      throw error
    }
  },

  exportTransactions: async (format, timeRange) => {
    set({ exporting: true })
    try {
      const response = await api.exportTransactionData({ format, timeRange })
      set({ exporting: false })
      return response.data.url
    } catch (error) {
      console.error('Failed to export transactions:', error)
      set({ exporting: false })
      throw error
    }
  },

  // Configuration
  updateConfig: async (config) => {
    try {
      const response = await api.updateAnalyticsConfig(config)
      set({ config: { ...get().config, ...response.data } })
    } catch (error) {
      console.error('Failed to update analytics config:', error)
    }
  },

  // Real-time updates
  startRealTimeUpdates: () => {
    set({ isConnected: true })
    // Implement WebSocket or polling for real-time updates
    const interval = setInterval(() => {
      get().fetchMetrics()
      get().fetchInsights()
    }, 60000) // Update every minute
    
    // Store interval ID for cleanup
    ;(get() as any).updateInterval = interval
  },

  stopRealTimeUpdates: () => {
    set({ isConnected: false })
    const interval = (get() as any).updateInterval
    if (interval) {
      clearInterval(interval)
    }
  },

  // Utility
  refreshAll: async () => {
    await Promise.all([
      get().fetchMetrics(),
      get().fetchInsights(),
      get().fetchReportTemplates(),
      get().fetchCustomDashboards()
    ])
  }
}))
