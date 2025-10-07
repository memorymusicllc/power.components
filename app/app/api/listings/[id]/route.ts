
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { storage } from '@/lib/storage';

// PUT: Update listing
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const listingId = params.id;

    const success = storage.updateListing(listingId, body);

    if (!success) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    const updatedListing = storage.getListings().find(l => l.id === listingId);

    return NextResponse.json({
      success: true,
      data: updatedListing,
      message: 'Listing updated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Update listing error:', error);
    return NextResponse.json(
      { error: 'Failed to update listing' },
      { status: 500 }
    );
  }
}

// DELETE: Delete listing
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const listingId = params.id;
    const success = storage.deleteListing(listingId);

    if (!success) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Listing deleted successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Delete listing error:', error);
    return NextResponse.json(
      { error: 'Failed to delete listing' },
      { status: 500 }
    );
  }
}

// GET: Get specific listing
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const listingId = params.id;
    const listing = storage.getListings().find(l => l.id === listingId);

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: listing,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get listing error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listing' },
      { status: 500 }
    );
  }
}
