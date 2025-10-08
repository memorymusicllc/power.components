/**
 * Dashboard Store - Zustand State Management
 * Manages dashboard data and real-time updates
 * Centralizes all dashboard state
 */

import { create } from 'zustand';

interface DashboardMetrics {
  totalViews: number;
  newLeads: number;
  messages: number;
  activeListings: number;
  conversionRate: number;
  averageResponseTime: string;
  lastActivity: string;
}

interface DashboardState {
  // State
  metrics: DashboardMetrics;
  loading: boolean;
  error: string | null;
  lastUpdated: string;
  isRealTimeActive: boolean;
  
  // Actions
  fetchMetrics: () => Promise<void>;
  updateMetrics: (metrics: Partial<DashboardMetrics>) => void;
  setRealTimeStatus: (active: boolean) => void;
  refresh: () => Promise<void>;
}

// Mock data for demo
const defaultMetrics: DashboardMetrics = {
  totalViews: 2847,
  newLeads: 47,
  messages: 156,
  activeListings: 3,
  conversionRate: 12.5,
  averageResponseTime: '2.3 min',
  lastActivity: 'Just now',
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial State
  metrics: defaultMetrics,
  loading: false,
  error: null,
  lastUpdated: new Date().toLocaleTimeString(),
  isRealTimeActive: true,
  
  // Fetch Metrics
  fetchMetrics: async () => {
    set({ loading: true, error: null });
    try {
      // In real app, this would call an API
      // For now, simulate with default data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        metrics: defaultMetrics, 
        loading: false,
        lastUpdated: new Date().toLocaleTimeString()
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
    }
  },
  
  // Update Metrics
  updateMetrics: (metrics: Partial<DashboardMetrics>) => {
    set(state => ({
      metrics: { ...state.metrics, ...metrics },
      lastUpdated: new Date().toLocaleTimeString()
    }));
  },
  
  // Set Real-Time Status
  setRealTimeStatus: (active: boolean) => {
    set({ isRealTimeActive: active });
  },
  
  // Refresh
  refresh: async () => {
    await get().fetchMetrics();
  },
}));
