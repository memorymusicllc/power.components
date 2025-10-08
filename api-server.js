import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3004;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockListings = [
  {
    id: 'listing-1',
    title: 'Professional AC Unit - Perfect Condition',
    description: 'High-efficiency air conditioning unit in excellent condition. Perfect for home or office use.',
    price: 4200,
    platformId: 'facebook',
    status: 'active',
    views: 47,
    inquiries: 8,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'listing-2', 
    title: 'AC System - Great Deal!',
    description: 'Reliable air conditioning system, well maintained and ready to install.',
    price: 3800,
    platformId: 'offerup',
    status: 'active',
    views: 23,
    inquiries: 3,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'listing-3',
    title: 'Premium AC Unit - Energy Efficient',
    description: 'Top-of-the-line air conditioning unit with energy-saving features.',
    price: 4500,
    platformId: 'craigslist',
    status: 'paused',
    views: 89,
    inquiries: 12,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const mockAutoResponseRules = [
  {
    id: 'rule-1',
    name: 'Initial Inquiry Response',
    triggers: ['new_message'],
    response: 'Thanks for your interest! I\'ll get back to you shortly.',
    isActive: true,
    usageCount: 45,
    successRate: 92.5,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rule-2',
    name: 'Price Inquiry Response',
    triggers: ['price_question'],
    response: 'The price is $4,200. I\'m open to reasonable offers!',
    isActive: true,
    usageCount: 23,
    successRate: 87.0,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rule-3',
    name: 'Availability Check',
    triggers: ['availability'],
    response: 'Yes, it\'s still available! When would you like to see it?',
    isActive: false,
    usageCount: 12,
    successRate: 95.0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// Dashboard API
app.get('/api/dashboard', (req, res) => {
  const dashboardData = {
    totalViews: 2847,
    newLeads: 47,
    messages: 156,
    activeListings: 3,
    conversionRate: 12.5,
    averageResponseTime: '2.3 min',
    lastActivity: 'Just now',
  };

  res.json({
    success: true,
    data: dashboardData,
    timestamp: new Date().toISOString()
  });
});

// Listings API
app.get('/api/listings', (req, res) => {
  const sellerId = req.query.sellerId || 'seller-001';
  const filteredListings = mockListings.filter(l => l.sellerId === sellerId || !l.sellerId);
  
  res.json({
    success: true,
    data: filteredListings,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/listings', (req, res) => {
  const { title, description, price, platforms, sellerId = 'seller-001' } = req.body;
  
  if (!title || !description || !price) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  const newListings = platforms.map(platformId => ({
    id: `listing-${Date.now()}-${platformId}`,
    title,
    description,
    price,
    platformId,
    status: 'active',
    views: 0,
    inquiries: 0,
    sellerId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  // Add to mock data
  mockListings.push(...newListings);

  res.json({
    success: true,
    data: newListings,
    message: `Created ${newListings.length} listing(s)`,
    timestamp: new Date().toISOString()
  });
});

app.put('/api/listings/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const index = mockListings.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Listing not found'
    });
  }

  mockListings[index] = { ...mockListings[index], ...updates, updatedAt: new Date().toISOString() };

  res.json({
    success: true,
    data: mockListings[index],
    timestamp: new Date().toISOString()
  });
});

app.delete('/api/listings/:id', (req, res) => {
  const { id } = req.params;
  
  const index = mockListings.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Listing not found'
    });
  }

  mockListings.splice(index, 1);

  res.json({
    success: true,
    data: { id },
    timestamp: new Date().toISOString()
  });
});

// Auto-Response API
app.get('/api/auto-responses', (req, res) => {
  const sellerId = req.query.sellerId || 'seller-001';
  
  res.json({
    success: true,
    data: mockAutoResponseRules,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/auto-responses', (req, res) => {
  const { name, triggers, response, sellerId = 'seller-001' } = req.body;
  
  if (!name || !triggers || !response) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  const newRule = {
    id: `rule-${Date.now()}`,
    name,
    triggers: Array.isArray(triggers) ? triggers : triggers.split(',').map(t => t.trim().toLowerCase()),
    response,
    isActive: true,
    usageCount: 0,
    successRate: 0,
    sellerId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  mockAutoResponseRules.push(newRule);

  res.json({
    success: true,
    data: newRule,
    message: 'Auto-response rule created successfully',
    timestamp: new Date().toISOString()
  });
});

app.put('/api/auto-responses/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const index = mockAutoResponseRules.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Rule not found'
    });
  }

  mockAutoResponseRules[index] = { ...mockAutoResponseRules[index], ...updates, updatedAt: new Date().toISOString() };

  res.json({
    success: true,
    data: mockAutoResponseRules[index],
    timestamp: new Date().toISOString()
  });
});

app.delete('/api/auto-responses/:id', (req, res) => {
  const { id } = req.params;
  
  const index = mockAutoResponseRules.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Rule not found'
    });
  }

  mockAutoResponseRules.splice(index, 1);

  res.json({
    success: true,
    data: { id },
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
  console.log(`Dashboard API: http://localhost:${PORT}/api/dashboard`);
  console.log(`Listings API: http://localhost:${PORT}/api/listings`);
  console.log(`Auto-Response API: http://localhost:${PORT}/api/auto-responses`);
});
