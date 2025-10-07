
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseRealTimeOptions {
  interval: number;
  enabled: boolean;
  onUpdate?: () => void;
  onError?: (error: Error) => void;
}

interface UseRealTimeReturn {
  isActive: boolean;
  lastUpdate: Date | null;
  start: () => void;
  stop: () => void;
  toggle: () => void;
}

export function useRealTime(
  updateFunction: () => Promise<void> | void,
  options: UseRealTimeOptions
): UseRealTimeReturn {
  const [isActive, setIsActive] = useState(options.enabled);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  const executeUpdate = useCallback(async () => {
    if (!mountedRef.current) return;

    try {
      await updateFunction();
      if (mountedRef.current) {
        setLastUpdate(new Date());
        options.onUpdate?.();
      }
    } catch (error) {
      if (mountedRef.current) {
        console.error('Real-time update error:', error);
        options.onError?.(error as Error);
      }
    }
  }, [updateFunction, options]);

  const start = useCallback(() => {
    if (intervalRef.current) return; // Already running

    setIsActive(true);
    executeUpdate(); // Initial update

    intervalRef.current = setInterval(() => {
      executeUpdate();
    }, options.interval);
  }, [executeUpdate, options.interval]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
  }, []);

  const toggle = useCallback(() => {
    if (isActive) {
      stop();
    } else {
      start();
    }
  }, [isActive, start, stop]);

  useEffect(() => {
    if (options.enabled) {
      start();
    } else {
      stop();
    }

    return () => {
      stop();
    };
  }, [options.enabled, start, stop]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      stop();
    };
  }, [stop]);

  return {
    isActive,
    lastUpdate,
    start,
    stop,
    toggle
  };
}

// Specialized hook for dashboard updates
export function useDashboardRealTime() {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const triggerUpdate = useCallback(() => {
    setUpdateTrigger(prev => prev + 1);
  }, []);

  return useRealTime(
    triggerUpdate,
    {
      interval: 30000, // 30 seconds
      enabled: true,
      onUpdate: () => {
        console.log('Dashboard updated:', new Date().toLocaleTimeString());
      },
      onError: (error) => {
        console.error('Dashboard real-time error:', error);
      }
    }
  );
}

// Connection status monitoring
export function useConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [lastOnline, setLastOnline] = useState<Date | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnline(new Date());
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    setIsOnline(navigator.onLine);
    if (navigator.onLine) {
      setLastOnline(new Date());
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, lastOnline };
}
