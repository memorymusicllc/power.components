
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { storage } from '@/lib/storage';

export const dynamic = 'force-dynamic';

// GET: Fetch seller settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('sellerId') || 'seller-001';

    const settings = storage.getSellerSettings();

    return NextResponse.json({
      success: true,
      data: settings,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT: Update seller settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const success = storage.saveSellerSettings({
      ...body,
      updatedAt: new Date().toISOString()
    });

    if (!success) {
      throw new Error('Failed to save settings');
    }

    return NextResponse.json({
      success: true,
      data: storage.getSellerSettings(),
      message: 'Settings updated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
