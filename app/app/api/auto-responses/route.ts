
import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { AutoResponseRule } from '@/lib/types';
import { autoResponderTemplates } from '@/lib/product-data';

export const dynamic = 'force-dynamic';

// GET: Fetch auto-response rules
export async function GET(request: NextRequest) {
  try {
    // Skip auth check for demo purposes

    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('sellerId') || 'seller-001';

    let rules = storage.getAutoResponseRules().filter(r => r.sellerId === sellerId);

    // Initialize with default rules if empty
    if (rules.length === 0) {
      const defaultRules: AutoResponseRule[] = Object.entries(autoResponderTemplates).map(([key, template], index) => ({
        id: `rule-${key}`,
        sellerId,
        name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        triggers: template.trigger,
        response: template.response,
        conditions: {
          timeWindow: 60,
          maxResponses: 1,
          skipIfReplied: true,
          minInquiryLength: 5
        },
        isActive: true,
        priority: index + 1,
        platforms: ['facebook', 'offerup', 'craigslist'],
        usageCount: 0,
        successRate: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      defaultRules.forEach(rule => storage.addAutoResponseRule(rule));
      rules = defaultRules;
    }

    return NextResponse.json({
      success: true,
      data: rules,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get auto-response rules error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch auto-response rules' },
      { status: 500 }
    );
  }
}

// POST: Create new auto-response rule
export async function POST(request: NextRequest) {
  try {
    // Skip auth check for demo purposes

    const body = await request.json();
    const { name, triggers, response, conditions, platforms, sellerId = 'seller-001' } = body;

    if (!name || !triggers || !response) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newRule: AutoResponseRule = {
      id: `rule-${Date.now()}`,
      sellerId,
      name,
      triggers: Array.isArray(triggers) ? triggers : triggers.split(',').map((t: string) => t.trim().toLowerCase()),
      response,
      conditions: {
        timeWindow: 60,
        maxResponses: 1,
        skipIfReplied: true,
        minInquiryLength: 5,
        ...conditions
      },
      isActive: true,
      priority: storage.getAutoResponseRules().length + 1,
      platforms: platforms || ['facebook', 'offerup', 'craigslist'],
      usageCount: 0,
      successRate: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    storage.addAutoResponseRule(newRule);

    return NextResponse.json({
      success: true,
      data: newRule,
      message: 'Auto-response rule created successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Create auto-response rule error:', error);
    return NextResponse.json(
      { error: 'Failed to create auto-response rule' },
      { status: 500 }
    );
  }
}
