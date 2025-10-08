import { ApiResponse, Product } from './types';

// Mock data for demo purposes
const mockListings = [
  {
    id: 'listing-1',
    productId: 'product-1',
    platformId: 'facebook',
    title: 'Professional AC Unit - Perfect Condition',
    description: 'High-efficiency air conditioning unit in excellent condition. Perfect for home or office use.',
    price: 4200,
    status: 'active' as const,
    views: 47,
    inquiries: 8,
    qualifiedLeads: 3,
    sellerId: 'seller-001',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'listing-2',
    productId: 'product-2',
    platformId: 'offerup',
    title: 'AC System - Great Deal!',
    description: 'Reliable air conditioning system, well maintained and ready to install.',
    price: 3800,
    status: 'active' as const,
    views: 23,
    inquiries: 3,
    qualifiedLeads: 1,
    sellerId: 'seller-001',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'listing-3',
    productId: 'product-3',
    platformId: 'craigslist',
    title: 'Premium AC Unit - Energy Efficient',
    description: 'Top-of-the-line air conditioning unit with energy-saving features.',
    price: 4500,
    status: 'paused' as const,
    views: 89,
    inquiries: 12,
    qualifiedLeads: 5,
    sellerId: 'seller-001',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const mockAutoResponseRules = [
  {
    id: 'rule-1',
    sellerId: 'seller-001',
    name: 'Initial Inquiry Response',
    triggers: ['new_message'],
    response: 'Thanks for your interest! I\'ll get back to you shortly.',
    conditions: {
      timeWindow: 30,
      maxResponses: 1,
      skipIfReplied: true
    },
    isActive: true,
    priority: 1,
    platforms: ['facebook', 'offerup', 'craigslist'],
    usageCount: 45,
    successRate: 92.5,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rule-2',
    sellerId: 'seller-001',
    name: 'Price Inquiry Response',
    triggers: ['price_question'],
    response: 'The price is $4,200. I\'m open to reasonable offers!',
    conditions: {
      timeWindow: 15,
      maxResponses: 1,
      skipIfReplied: true
    },
    isActive: true,
    priority: 2,
    platforms: ['facebook', 'offerup', 'craigslist'],
    usageCount: 23,
    successRate: 87.0,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rule-3',
    sellerId: 'seller-001',
    name: 'Availability Check',
    triggers: ['availability'],
    response: 'Yes, it\'s still available! When would you like to see it?',
    conditions: {
      timeWindow: 60,
      maxResponses: 1,
      skipIfReplied: true
    },
    isActive: false,
    priority: 3,
    platforms: ['facebook', 'offerup', 'craigslist'],
    usageCount: 12,
    successRate: 95.0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// Mock API functions with realistic delays
export const api = {
  // Dashboard APIs
  async getDashboardData() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      data: {
        totalViews: 2847,
        newLeads: 47,
        messages: 156,
        activeListings: 3,
        conversionRate: 12.5,
        averageResponseTime: '2.3 min',
        lastActivity: 'Just now',
      },
      timestamp: new Date().toISOString(),
    };
  },

  // Product APIs
  async getProduct(id: string) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      success: true,
      data: {
        id,
        name: 'Professional AC Unit',
        price: 4200,
        condition: 'excellent',
      },
      timestamp: new Date().toISOString(),
    };
  },

  async updateProduct(id: string, data: Partial<Product>) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: { id, ...data },
      timestamp: new Date().toISOString(),
    };
  },

  // Listing APIs
  async getListings(sellerId: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: mockListings,
      timestamp: new Date().toISOString(),
    };
  },

  async createListing(data: any) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newListing = {
      id: `listing-${Date.now()}`,
      ...data,
      status: 'active' as const,
      views: 0,
      inquiries: 0,
      createdAt: new Date().toISOString(),
    };
    mockListings.push(newListing);
    return {
      success: true,
      data: newListing,
      timestamp: new Date().toISOString(),
    };
  },

  async updateListing(id: string, data: any) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockListings.findIndex(l => l.id === id);
    if (index !== -1) {
      mockListings[index] = { ...mockListings[index], ...data };
    }
    return {
      success: true,
      data: mockListings[index],
      timestamp: new Date().toISOString(),
    };
  },

  async deleteListing(id: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockListings.findIndex(l => l.id === id);
    if (index !== -1) {
      mockListings.splice(index, 1);
    }
    return {
      success: true,
      data: { id },
      timestamp: new Date().toISOString(),
    };
  },

  // Auto-Responder APIs
  async getAutoResponseRules(sellerId: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: mockAutoResponseRules,
      timestamp: new Date().toISOString(),
    };
  },

  async createAutoResponseRule(data: any) {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newRule = {
      id: `rule-${Date.now()}`,
      ...data,
      usageCount: 0,
      successRate: 0,
      createdAt: new Date().toISOString(),
    };
    mockAutoResponseRules.push(newRule);
    return {
      success: true,
      data: newRule,
      timestamp: new Date().toISOString(),
    };
  },

  async updateAutoResponseRule(id: string, data: any) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockAutoResponseRules.findIndex(r => r.id === id);
    if (index !== -1) {
      mockAutoResponseRules[index] = { ...mockAutoResponseRules[index], ...data };
    }
    return {
      success: true,
      data: mockAutoResponseRules[index],
      timestamp: new Date().toISOString(),
    };
  },

  async deleteAutoResponseRule(id: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockAutoResponseRules.findIndex(r => r.id === id);
    if (index !== -1) {
      mockAutoResponseRules.splice(index, 1);
    }
    return {
      success: true,
      data: { id },
      timestamp: new Date().toISOString(),
    };
  },

  // Lead APIs
  async getLeads(sellerId: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: [],
      timestamp: new Date().toISOString(),
    };
  },

  async updateLead(id: string, data: any) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: { id, ...data },
      timestamp: new Date().toISOString(),
    };
  },

  // Analytics APIs
  async getPerformanceMetrics(sellerId: string, timeRange: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: {
        views: 2847,
        leads: 47,
        conversions: 6,
        revenue: 25200,
      },
      timestamp: new Date().toISOString(),
    };
  },

  async getPlatformAnalytics(sellerId: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: [
        { platform: 'Facebook', views: 1200, leads: 25 },
        { platform: 'OfferUp', views: 800, leads: 15 },
        { platform: 'Craigslist', views: 847, leads: 7 },
      ],
      timestamp: new Date().toISOString(),
    };
  },

  // Settings APIs
  async getSellerSettings(sellerId: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      data: {
        notifications: true,
        autoResponse: true,
        analytics: true,
      },
      timestamp: new Date().toISOString(),
    };
  },

  async updateSellerSettings(sellerId: string, data: any) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: { sellerId, ...data },
      timestamp: new Date().toISOString(),
    };
  }
};
