
'use client';

import { useConnectionStatus } from '@/hooks/use-real-time';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';

export function ConnectionStatus() {
  const { isOnline, lastOnline } = useConnectionStatus();

  if (isOnline) {
    return (
      <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-800 dark:text-green-200">
        <Wifi className="w-3 h-3 mr-1" />
        Online
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-800 dark:text-red-200">
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
