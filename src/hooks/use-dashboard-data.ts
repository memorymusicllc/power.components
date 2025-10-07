
import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api-client';
import { DashboardData } from '@/lib/types';
import { useToast } from './use-toast';

interface UseDashboardDataReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  lastUpdated: string | null;
}

export function useDashboardData(autoRefresh = true, intervalMs = 60000): UseDashboardDataReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = useCallback(async (showToastOnError = false) => {
    try {
      setError(null);
      const response = await api.getDashboardData();
      
      if (response.success && response.data) {
        setData(response.data);
        setLastUpdated(response.timestamp || new Date().toISOString());
      } else {
        throw new Error(response.error || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Dashboard data fetch error:', err);
      
      if (showToastOnError) {
        toast({
          title: 'Data Refresh Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [autoRefresh, intervalMs, fetchData]);

  return {
    data,
    loading,
    error,
    refresh,
    lastUpdated
  };
}
