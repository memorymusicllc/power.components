
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { storage } from '@/lib/storage';
import { dataGenerator } from '@/lib/utils/data-generator';

// GET: Fetch leads
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('sellerId') || 'seller-001';
    const status = searchParams.get('status');
    const platform = searchParams.get('platform');

    let leads = storage.getLeads().filter(l => l.sellerId === sellerId);

    // Initialize with generated leads if empty
    if (leads.length === 0) {
      const generatedLeads = dataGenerator.generateLeads();
      generatedLeads.forEach(lead => storage.addLead(lead));
      leads = generatedLeads;
    }

    // Apply filters
    if (status) {
      leads = leads.filter(l => l.status === status);
    }
    if (platform) {
      leads = leads.filter(l => l.platform.toLowerCase() === platform.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      data: leads,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get leads error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST: Create new lead (from inquiry)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { platform, contactInfo, inquiry, sellerId = 'seller-001' } = body;

    if (!platform || !contactInfo || !inquiry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      sellerId,
      productId: 'ac-001',
      platform,
      status: 'new' as const,
      priority: 'medium' as const,
      contactInfo: {
        ...contactInfo,
        verified: false
      },
      inquiries: [inquiry],
      notes: [],
      estimatedValue: 4200,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    storage.addLead(newLead);

    return NextResponse.json({
      success: true,
      data: newLead,
      message: 'Lead created successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Create lead error:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
