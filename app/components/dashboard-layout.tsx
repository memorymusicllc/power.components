
'use client';

import { Sidebar } from './sidebar';
import { MobileNav } from './ui/mobile-nav';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { storage, initializeDefaultData } from '@/lib/storage';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();

  useEffect(() => {
    // Initialize default data when layout mounts
    if (typeof window !== 'undefined') {
      initializeDefaultData();
    }
  }, []);

  // For demo purposes, allow access without strict authentication
  // In production, you would uncomment the authentication checks below
  
  /*
  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }
  */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="lg:pl-80">
        <main className="min-h-screen overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
