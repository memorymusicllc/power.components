/**
 * Auto Responder Store - Zustand State Management
 * Manages auto-response rules and system state
 * Migrated from use-auto-responder.ts hook
 */

import { create } from 'zustand';
import { api } from '@/lib/api-client';
import { AutoResponseRule } from '@/lib/types';

interface AutoResponderState {
  // State
  rules: AutoResponseRule[];
  loading: boolean;
  error: string | null;
  isActive: boolean;
  
  // Computed Stats
  stats: {
    totalRules: number;
    activeRules: number;
    totalUsage: number;
    averageSuccessRate: number;
  };
  
  // Actions
  fetchRules: () => Promise<void>;
  createRule: (data: any) => Promise<boolean>;
  updateRule: (id: string, data: any) => Promise<boolean>;
  deleteRule: (id: string) => Promise<boolean>;
  toggleRule: (id: string) => Promise<boolean>;
  toggleSystem: () => Promise<boolean>;
  refresh: () => Promise<void>;
}

export const useAutoResponderStore = create<AutoResponderState>((set, get) => ({
  // Initial State
  rules: [],
  loading: false,
  error: null,
  isActive: true,
  
  stats: {
    totalRules: 0,
    activeRules: 0,
    totalUsage: 0,
    averageSuccessRate: 0,
  },
  
  // Fetch Rules
  fetchRules: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getAutoResponseRules('user-001');
      
      if (response.success && response.data) {
        const rulesArray = Array.isArray(response.data) ? response.data : [];
        const isActive = rulesArray.some((rule: AutoResponseRule) => rule.isActive);
        
        // Calculate stats
        const stats = {
          totalRules: rulesArray.length,
          activeRules: rulesArray.filter(r => r?.isActive).length,
          totalUsage: rulesArray.reduce((sum, r) => sum + (r?.usageCount || 0), 0),
          averageSuccessRate: rulesArray.length > 0 ? 
            rulesArray.reduce((sum, r) => sum + (r?.successRate || 0), 0) / rulesArray.length : 0
        };
        
        set({ rules: rulesArray, isActive, stats, loading: false });
      } else {
        throw new Error((response as any).error || 'Failed to fetch auto-response rules');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
      console.error('Auto-responder fetch error:', err);
    }
  },
  
  // Create Rule
  createRule: async (data: any): Promise<boolean> => {
    try {
      const response = await api.createAutoResponseRule({ ...data, userId: 'user-001' });
      
      if (response.success) {
        await get().fetchRules();
        return true;
      } else {
        throw new Error((response as any).error || 'Failed to create rule');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ error: errorMessage });
      return false;
    }
  },
  
  // Update Rule
  updateRule: async (id: string, data: any): Promise<boolean> => {
    try {
      const response = await api.updateAutoResponseRule(id, data);
      
      if (response.success) {
        await get().fetchRules();
        return true;
      } else {
        throw new Error((response as any).error || 'Failed to update rule');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ error: errorMessage });
      return false;
    }
  },
  
  // Delete Rule
  deleteRule: async (id: string): Promise<boolean> => {
    try {
      const response = await api.deleteAutoResponseRule(id);
      
      if (response.success) {
        await get().fetchRules();
        return true;
      } else {
        throw new Error((response as any).error || 'Failed to delete rule');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ error: errorMessage });
      return false;
    }
  },
  
  // Toggle Rule
  toggleRule: async (id: string): Promise<boolean> => {
    const rule = get().rules.find(r => r.id === id);
    if (!rule) return false;
    
    return await get().updateRule(id, { isActive: !rule.isActive });
  },
  
  // Toggle System
  toggleSystem: async (): Promise<boolean> => {
    const { isActive, rules } = get();
    const newActiveState = !isActive;
    
    try {
      // Update all rules to match system state
      const updatePromises = rules.map(rule => 
        get().updateRule(rule.id, { isActive: newActiveState })
      );
      
      await Promise.all(updatePromises);
      set({ isActive: newActiveState });
      return true;
    } catch (err) {
      return false;
    }
  },
  
  // Refresh
  refresh: async () => {
    await get().fetchRules();
  },
}));
