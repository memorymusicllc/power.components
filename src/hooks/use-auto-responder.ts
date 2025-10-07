
import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api-client';
import { AutoResponseRule } from '@/lib/types';
import { useToast } from './use-toast';
import { useSession } from 'next-auth/react';

interface UseAutoResponderReturn {
  rules: AutoResponseRule[];
  loading: boolean;
  error: string | null;
  isActive: boolean;
  createRule: (data: any) => Promise<boolean>;
  updateRule: (id: string, data: any) => Promise<boolean>;
  deleteRule: (id: string) => Promise<boolean>;
  toggleRule: (id: string) => Promise<boolean>;
  toggleSystem: () => Promise<boolean>;
  refresh: () => Promise<void>;
  stats: {
    totalRules: number;
    activeRules: number;
    totalUsage: number;
    averageSuccessRate: number;
  };
}

export function useAutoResponder(): UseAutoResponderReturn {
  const [rules, setRules] = useState<AutoResponseRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const { toast } = useToast();
  const { data: session } = useSession() || {};

  const fetchRules = useCallback(async () => {
    // Skip session check for demo purposes
    // if (!session) return;

    try {
      setError(null);
      const response = await api.getAutoResponseRules('seller-001');
      
      if (response.success && response.data) {
        // Ensure response.data is an array
        const rulesArray = Array.isArray(response.data) ? response.data : [];
        setRules(rulesArray);
        // Check if system is active (at least one rule is active)
        setIsActive(rulesArray.some((rule: AutoResponseRule) => rule.isActive));
      } else {
        throw new Error(response.error || 'Failed to fetch auto-response rules');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Auto-responder fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []); // Remove session dependency for demo

  const createRule = useCallback(async (data: any): Promise<boolean> => {
    try {
      const response = await api.createAutoResponseRule({ ...data, sellerId: 'seller-001' });
      
      if (response.success) {
        await fetchRules(); // Refresh data
        toast({
          title: 'Rule Created',
          description: 'Auto-response rule has been created successfully',
        });
        return true;
      } else {
        throw new Error(response.error || 'Failed to create rule');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Creation Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  }, [fetchRules, toast]);

  const updateRule = useCallback(async (id: string, data: any): Promise<boolean> => {
    try {
      const response = await api.updateAutoResponseRule(id, data);
      
      if (response.success) {
        await fetchRules(); // Refresh data
        toast({
          title: 'Rule Updated',
          description: 'Auto-response rule has been updated successfully',
        });
        return true;
      } else {
        throw new Error(response.error || 'Failed to update rule');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Update Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  }, [fetchRules, toast]);

  const deleteRule = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await api.deleteAutoResponseRule(id);
      
      if (response.success) {
        await fetchRules(); // Refresh data
        toast({
          title: 'Rule Deleted',
          description: 'Auto-response rule has been deleted successfully',
        });
        return true;
      } else {
        throw new Error(response.error || 'Failed to delete rule');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Deletion Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  }, [fetchRules, toast]);

  const toggleRule = useCallback(async (id: string): Promise<boolean> => {
    const rule = rules.find(r => r.id === id);
    if (!rule) return false;

    return updateRule(id, { isActive: !rule.isActive });
  }, [rules, updateRule]);

  const toggleSystem = useCallback(async (): Promise<boolean> => {
    try {
      const newActiveState = !isActive;
      
      // Update all rules to match system state
      const updatePromises = rules.map(rule => 
        updateRule(rule.id, { isActive: newActiveState })
      );
      
      await Promise.all(updatePromises);
      setIsActive(newActiveState);
      
      toast({
        title: newActiveState ? 'Auto-Responder Activated' : 'Auto-Responder Deactivated',
        description: newActiveState ? 
          'All auto-response rules are now active' : 
          'All auto-response rules have been paused',
      });
      
      return true;
    } catch (err) {
      toast({
        title: 'System Toggle Failed',
        description: 'Failed to toggle auto-responder system',
        variant: 'destructive',
      });
      return false;
    }
  }, [isActive, rules, updateRule, toast]);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchRules();
  }, [fetchRules]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const stats = {
    totalRules: Array.isArray(rules) ? rules.length : 0,
    activeRules: Array.isArray(rules) ? rules.filter(r => r?.isActive).length : 0,
    totalUsage: Array.isArray(rules) ? rules.reduce((sum, r) => sum + (r?.usageCount || 0), 0) : 0,
    averageSuccessRate: Array.isArray(rules) && rules.length > 0 ? 
      rules.reduce((sum, r) => sum + (r?.successRate || 0), 0) / rules.length : 0
  };

  return {
    rules,
    loading,
    error,
    isActive,
    createRule,
    updateRule,
    deleteRule,
    toggleRule,
    toggleSystem,
    refresh,
    stats
  };
}
