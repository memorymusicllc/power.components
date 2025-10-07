
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { storage } from '@/lib/storage';

// PUT: Update auto-response rule
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
    const ruleId = params.id;

    const success = storage.updateAutoResponseRule(ruleId, {
      ...body,
      updatedAt: new Date().toISOString()
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Auto-response rule not found' },
        { status: 404 }
      );
    }

    const updatedRule = storage.getAutoResponseRules().find(r => r.id === ruleId);

    return NextResponse.json({
      success: true,
      data: updatedRule,
      message: 'Auto-response rule updated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Update auto-response rule error:', error);
    return NextResponse.json(
      { error: 'Failed to update auto-response rule' },
      { status: 500 }
    );
  }
}

// DELETE: Delete auto-response rule
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ruleId = params.id;
    const success = storage.deleteAutoResponseRule(ruleId);

    if (!success) {
      return NextResponse.json(
        { error: 'Auto-response rule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Auto-response rule deleted successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Delete auto-response rule error:', error);
    return NextResponse.json(
      { error: 'Failed to delete auto-response rule' },
      { status: 500 }
    );
  }
}

// GET: Get specific auto-response rule
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ruleId = params.id;
    const rule = storage.getAutoResponseRules().find(r => r.id === ruleId);

    if (!rule) {
      return NextResponse.json(
        { error: 'Auto-response rule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rule,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get auto-response rule error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch auto-response rule' },
      { status: 500 }
    );
  }
}
