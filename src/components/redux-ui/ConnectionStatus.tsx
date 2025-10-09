/**
 * Redux UI ConnectionStatus Component
 * Basic Outline Theme - Shows online/offline status
 */

import React, { useState, useEffect } from 'react';
import { Badge } from './Badge';
import { Wifi, WifiOff } from 'lucide-react';

export function ConnectionStatus() {
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

  if (isOnline) {
    return (
      <Badge variant="outline" className="bg-transparent border-green-500 text-green-500">
        <Wifi className="w-3 h-3 mr-1" />
        Online
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-transparent border-red-500 text-red-500">
      <WifiOff className="w-3 h-3 mr-1" />
      Offline
      {lastOnline && (
        <span className="text-xs ml-1">
          (since {lastOnline.toLocaleTimeString()})
        </span>
      )}
    </Badge>
  );
}
