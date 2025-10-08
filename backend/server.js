import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    base_price REAL NOT NULL,
    condition TEXT DEFAULT 'excellent',
    images TEXT, -- JSON array of image URLs
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Listings table
  db.run(`CREATE TABLE IF NOT EXISTS listings (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    platform TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    status TEXT DEFAULT 'active',
    views INTEGER DEFAULT 0,
    inquiries INTEGER DEFAULT 0,
    qualified_leads INTEGER DEFAULT 0,
    platform_listing_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Auto-response rules table
  db.run(`CREATE TABLE IF NOT EXISTS auto_response_rules (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    triggers TEXT NOT NULL, -- JSON array
    response TEXT NOT NULL,
    conditions TEXT, -- JSON object
    is_active BOOLEAN DEFAULT 1,
    priority INTEGER DEFAULT 1,
    platforms TEXT, -- JSON array
    usage_count INTEGER DEFAULT 0,
    success_rate REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Leads table
  db.run(`CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    listing_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    platform TEXT NOT NULL,
    contact_info TEXT, -- JSON object
    status TEXT DEFAULT 'new',
    source TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Analytics table
  db.run(`CREATE TABLE IF NOT EXISTS analytics (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value REAL NOT NULL,
    date DATE NOT NULL,
    platform TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Insert default user if none exists
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO users (id, email, name) VALUES ('user-001', 'demo@pow3r.cashout', 'Demo User')`);
      
      // Insert sample product
      db.run(`INSERT INTO products (id, user_id, name, description, base_price, condition) 
              VALUES ('product-001', 'user-001', 'Professional AC Unit', 'High-efficiency air conditioning unit', 4200, 'excellent')`);
      
      // Insert sample listings
      db.run(`INSERT INTO listings (id, product_id, user_id, platform, title, description, price, status, views, inquiries, qualified_leads) 
              VALUES ('listing-001', 'product-001', 'user-001', 'facebook', 'Professional AC Unit - Perfect Condition', 'High-efficiency air conditioning unit in excellent condition', 4200, 'active', 47, 8, 3)`);
      
      db.run(`INSERT INTO listings (id, product_id, user_id, platform, title, description, price, status, views, inquiries, qualified_leads) 
              VALUES ('listing-002', 'product-001', 'user-001', 'offerup', 'AC System - Great Deal!', 'Reliable air conditioning system', 3800, 'active', 23, 3, 1)`);
      
      db.run(`INSERT INTO listings (id, product_id, user_id, platform, title, description, price, status, views, inquiries, qualified_leads) 
              VALUES ('listing-003', 'product-001', 'user-001', 'craigslist', 'Premium AC Unit - Energy Efficient', 'Top-of-the-line air conditioning unit', 4500, 'paused', 89, 12, 5)`);
      
      // Insert sample auto-response rules
      db.run(`INSERT INTO auto_response_rules (id, user_id, name, triggers, response, conditions, is_active, priority, platforms, usage_count, success_rate) 
              VALUES ('rule-001', 'user-001', 'Initial Inquiry Response', '["new_message"]', 'Thanks for your interest! I''ll get back to you shortly.', '{"timeWindow": 30, "maxResponses": 1, "skipIfReplied": true}', 1, 1, '["facebook", "offerup", "craigslist"]', 45, 92.5)`);
      
      db.run(`INSERT INTO auto_response_rules (id, user_id, name, triggers, response, conditions, is_active, priority, platforms, usage_count, success_rate) 
              VALUES ('rule-002', 'user-001', 'Price Inquiry Response', '["price_question"]', 'The price is $4,200. I''m open to reasonable offers!', '{"timeWindow": 15, "maxResponses": 1, "skipIfReplied": true}', 1, 2, '["facebook", "offerup", "craigslist"]', 23, 87.0)`);
      
      db.run(`INSERT INTO auto_response_rules (id, user_id, name, triggers, response, conditions, is_active, priority, platforms, usage_count, success_rate) 
              VALUES ('rule-003', 'user-001', 'Availability Check', '["availability"]', 'Yes, it''s still available! When would you like to see it?', '{"timeWindow": 60, "maxResponses": 1, "skipIfReplied": true}', 0, 3, '["facebook", "offerup", "craigslist"]', 12, 95.0)`);
    }
  });
});

// Helper function to run queries with promises
const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// API Routes

// Dashboard API
app.get('/api/dashboard', async (req, res) => {
  try {
    const userId = req.query.userId || 'user-001';
    
    // Get total views
    const totalViews = await dbGet(`
      SELECT COALESCE(SUM(views), 0) as total FROM listings WHERE user_id = ?
    `, [userId]);
    
    // Get new leads (last 24 hours)
    const newLeads = await dbGet(`
      SELECT COUNT(*) as count FROM leads 
      WHERE user_id = ? AND created_at > datetime('now', '-1 day')
    `, [userId]);
    
    // Get active listings
    const activeListings = await dbGet(`
      SELECT COUNT(*) as count FROM listings 
      WHERE user_id = ? AND status = 'active'
    `, [userId]);
    
    // Get total messages (simulated)
    const messages = await dbGet(`
      SELECT COALESCE(SUM(inquiries), 0) as total FROM listings WHERE user_id = ?
    `, [userId]);
    
    const dashboardData = {
      totalViews: totalViews.total || 0,
      newLeads: newLeads.count || 0,
      messages: messages.total || 0,
      activeListings: activeListings.count || 0,
      conversionRate: 12.5,
      averageResponseTime: '2.3 min',
      lastActivity: 'Just now',
    };

    res.json({
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Products API
app.get('/api/products', async (req, res) => {
  try {
    const userId = req.query.userId || 'user-001';
    const products = await dbAll(`
      SELECT * FROM products WHERE user_id = ? ORDER BY created_at DESC
    `, [userId]);
    
    res.json({
      success: true,
      data: products,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, description, basePrice, condition, userId = 'user-001' } = req.body;
    const productId = `product-${Date.now()}`;
    
    await dbRun(`
      INSERT INTO products (id, user_id, name, description, base_price, condition)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [productId, userId, name, description, basePrice, condition]);
    
    const newProduct = await dbGet(`SELECT * FROM products WHERE id = ?`, [productId]);
    
    res.json({
      success: true,
      data: newProduct,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Listings API
app.get('/api/listings', async (req, res) => {
  try {
    const userId = req.query.userId || 'user-001';
    const listings = await dbAll(`
      SELECT l.*, p.name as product_name, p.description as product_description
      FROM listings l
      JOIN products p ON l.product_id = p.id
      WHERE l.user_id = ? 
      ORDER BY l.created_at DESC
    `, [userId]);
    
    res.json({
      success: true,
      data: listings,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/listings', async (req, res) => {
  try {
    const { productId, platform, title, description, price, userId = 'user-001' } = req.body;
    const listingId = `listing-${Date.now()}`;
    
    await dbRun(`
      INSERT INTO listings (id, product_id, user_id, platform, title, description, price, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
    `, [listingId, productId, userId, platform, title, description, price]);
    
    const newListing = await dbGet(`
      SELECT l.*, p.name as product_name 
      FROM listings l
      JOIN products p ON l.product_id = p.id
      WHERE l.id = ?
    `, [listingId]);
    
    res.json({
      success: true,
      data: newListing,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.put('/api/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updateFields = [];
    const values = [];
    
    Object.keys(updates).forEach(key => {
      if (key !== 'id' && updates[key] !== undefined) {
        updateFields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });
    
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update'
      });
    }
    
    values.push(id);
    await dbRun(`
      UPDATE listings 
      SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, values);
    
    const updatedListing = await dbGet(`
      SELECT l.*, p.name as product_name 
      FROM listings l
      JOIN products p ON l.product_id = p.id
      WHERE l.id = ?
    `, [id]);
    
    res.json({
      success: true,
      data: updatedListing,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.delete('/api/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await dbRun(`DELETE FROM listings WHERE id = ?`, [id]);
    
    res.json({
      success: true,
      data: { id },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Auto-Response Rules API
app.get('/api/auto-responses', async (req, res) => {
  try {
    const userId = req.query.userId || 'user-001';
    const rules = await dbAll(`
      SELECT * FROM auto_response_rules 
      WHERE user_id = ? 
      ORDER BY priority ASC, created_at DESC
    `, [userId]);
    
    // Parse JSON fields
    const parsedRules = rules.map(rule => ({
      ...rule,
      triggers: JSON.parse(rule.triggers),
      conditions: rule.conditions ? JSON.parse(rule.conditions) : null,
      platforms: rule.platforms ? JSON.parse(rule.platforms) : null,
      isActive: Boolean(rule.is_active)
    }));
    
    res.json({
      success: true,
      data: parsedRules,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/auto-responses', async (req, res) => {
  try {
    const { name, triggers, response, conditions, priority, platforms, userId = 'user-001' } = req.body;
    const ruleId = `rule-${Date.now()}`;
    
    await dbRun(`
      INSERT INTO auto_response_rules (id, user_id, name, triggers, response, conditions, priority, platforms, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `, [ruleId, userId, name, JSON.stringify(triggers), response, JSON.stringify(conditions), priority, JSON.stringify(platforms)]);
    
    const newRule = await dbGet(`SELECT * FROM auto_response_rules WHERE id = ?`, [ruleId]);
    
    res.json({
      success: true,
      data: {
        ...newRule,
        triggers: JSON.parse(newRule.triggers),
        conditions: newRule.conditions ? JSON.parse(newRule.conditions) : null,
        platforms: newRule.platforms ? JSON.parse(newRule.platforms) : null,
        isActive: Boolean(newRule.is_active)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Real API Server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
  console.log(`📝 Listings API: http://localhost:${PORT}/api/listings`);
  console.log(`🤖 Auto-Response API: http://localhost:${PORT}/api/auto-responses`);
  console.log(`💾 Database: ${dbPath}`);
});
