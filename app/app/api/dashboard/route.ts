
import { NextRequest, NextResponse } from 'next/server';
import { dataGenerator } from '@/lib/utils/data-generator';

export const dynamic = 'force-dynamic';

const CACHE_DURATION = 60 * 1000; // 1 minute cache
let lastFetch = 0;
let cachedData: any = null;

export async function GET(request: NextRequest) {
  try {
    // Skip auth check for demo purposes - in production you'd check session here
    
    // Check cache
    const now = Date.now();
    if (cachedData && (now - lastFetch) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
        timestamp: new Date().toISOString()
      });
    }

    // Generate fresh data
    const dashboardData = dataGenerator.generateDashboardData();
    
    // Update cache
    cachedData = dashboardData;
    lastFetch = now;

    return NextResponse.json({
      success: true,
      data: dashboardData,
      cached: false,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to fetch dashboard data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
