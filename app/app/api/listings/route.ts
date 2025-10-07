
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { storage } from '@/lib/storage';
import { Listing } from '@/lib/types';

export const dynamic = 'force-dynamic';

// GET: Fetch all listings for a seller
export async function GET(request: NextRequest) {
  try {
    // Skip auth check for demo purposes
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('sellerId') || 'seller-001';

    const listings = storage.getListings().filter(l => l.sellerId === sellerId);

    return NextResponse.json({
      success: true,
      data: listings,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get listings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

// POST: Create new listing
export async function POST(request: NextRequest) {
  try {
    // Skip auth check for demo purposes
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const { title, description, price, platforms, autoRefresh, sellerId = 'seller-001' } = body;

    if (!title || !description || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create listings for each platform
    const listings: Listing[] = platforms.map((platformId: string) => ({
      id: `listing-${Date.now()}-${platformId}`,
      productId: 'ac-001',
      platformId,
      title,
      description,
      price,
      status: 'draft' as const,
      views: 0,
      inquiries: 0,
      qualifiedLeads: 0,
      sellerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    // Save listings
    listings.forEach(listing => storage.addListing(listing));

    return NextResponse.json({
      success: true,
      data: listings,
      message: `Created ${listings.length} listing(s)`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Create listing error:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}
