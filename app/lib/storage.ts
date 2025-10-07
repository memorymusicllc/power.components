
import { Product, Listing, Lead, AutoResponseRule, Seller, PerformanceMetrics } from './types';

// Local Storage Management for Demo/Development
class StorageManager {
  private prefix = 'ac_selling_dashboard_';

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  private safeGetItem(key: string): string | null {
    try {
      return localStorage.getItem(this.getKey(key));
    } catch {
      return null;
    }
  }

  private safeSetItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(this.getKey(key), value);
      return true;
    } catch {
      return false;
    }
  }

  private safeRemoveItem(key: string): boolean {
    try {
      localStorage.removeItem(this.getKey(key));
      return true;
    } catch {
      return false;
    }
  }

  // Product Management
  getProduct(): Product | null {
    const data = this.safeGetItem('product');
    return data ? JSON.parse(data) : null;
  }

  saveProduct(product: Product): boolean {
    return this.safeSetItem('product', JSON.stringify(product));
  }

  // Listings Management
  getListings(): Listing[] {
    const data = this.safeGetItem('listings');
    return data ? JSON.parse(data) : [];
  }

  saveListings(listings: Listing[]): boolean {
    return this.safeSetItem('listings', JSON.stringify(listings));
  }

  addListing(listing: Listing): boolean {
    const listings = this.getListings();
    listings.push(listing);
    return this.saveListings(listings);
  }

  updateListing(id: string, updates: Partial<Listing>): boolean {
    const listings = this.getListings();
    const index = listings.findIndex(l => l.id === id);
    if (index !== -1) {
      listings[index] = { ...listings[index], ...updates, updatedAt: new Date().toISOString() };
      return this.saveListings(listings);
    }
    return false;
  }

  deleteListing(id: string): boolean {
    const listings = this.getListings();
    const filtered = listings.filter(l => l.id !== id);
    return this.saveListings(filtered);
  }

  // Auto Response Rules
  getAutoResponseRules(): AutoResponseRule[] {
    const data = this.safeGetItem('auto_response_rules');
    return data ? JSON.parse(data) : [];
  }

  saveAutoResponseRules(rules: AutoResponseRule[]): boolean {
    return this.safeSetItem('auto_response_rules', JSON.stringify(rules));
  }

  addAutoResponseRule(rule: AutoResponseRule): boolean {
    const rules = this.getAutoResponseRules();
    rules.push(rule);
    return this.saveAutoResponseRules(rules);
  }

  updateAutoResponseRule(id: string, updates: Partial<AutoResponseRule>): boolean {
    const rules = this.getAutoResponseRules();
    const index = rules.findIndex(r => r.id === id);
    if (index !== -1) {
      rules[index] = { ...rules[index], ...updates, updatedAt: new Date().toISOString() };
      return this.saveAutoResponseRules(rules);
    }
    return false;
  }

  deleteAutoResponseRule(id: string): boolean {
    const rules = this.getAutoResponseRules();
    const filtered = rules.filter(r => r.id !== id);
    return this.saveAutoResponseRules(filtered);
  }

  // Leads Management
  getLeads(): Lead[] {
    const data = this.safeGetItem('leads');
    return data ? JSON.parse(data) : [];
  }

  saveLeads(leads: Lead[]): boolean {
    return this.safeSetItem('leads', JSON.stringify(leads));
  }

  addLead(lead: Lead): boolean {
    const leads = this.getLeads();
    leads.push(lead);
    return this.saveLeads(leads);
  }

  updateLead(id: string, updates: Partial<Lead>): boolean {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updates, updatedAt: new Date().toISOString() };
      return this.saveLeads(leads);
    }
    return false;
  }

  // Seller Settings
  getSellerSettings(): Partial<Seller> | null {
    const data = this.safeGetItem('seller_settings');
    return data ? JSON.parse(data) : null;
  }

  saveSellerSettings(settings: Partial<Seller>): boolean {
    return this.safeSetItem('seller_settings', JSON.stringify(settings));
  }

  // Performance Metrics
  getPerformanceMetrics(): PerformanceMetrics[] {
    const data = this.safeGetItem('performance_metrics');
    return data ? JSON.parse(data) : [];
  }

  savePerformanceMetrics(metrics: PerformanceMetrics[]): boolean {
    return this.safeSetItem('performance_metrics', JSON.stringify(metrics));
  }

  addPerformanceMetric(metric: PerformanceMetrics): boolean {
    const metrics = this.getPerformanceMetrics();
    metrics.push(metric);
    return this.savePerformanceMetrics(metrics);
  }

  // Clear all data
  clearAllData(): boolean {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch {
      return false;
    }
  }

  // Export/Import functionality
  exportData(): string {
    const data = {
      product: this.getProduct(),
      listings: this.getListings(),
      leads: this.getLeads(),
      autoResponseRules: this.getAutoResponseRules(),
      sellerSettings: this.getSellerSettings(),
      performanceMetrics: this.getPerformanceMetrics(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.product) this.saveProduct(data.product);
      if (data.listings) this.saveListings(data.listings);
      if (data.leads) this.saveLeads(data.leads);
      if (data.autoResponseRules) this.saveAutoResponseRules(data.autoResponseRules);
      if (data.sellerSettings) this.saveSellerSettings(data.sellerSettings);
      if (data.performanceMetrics) this.savePerformanceMetrics(data.performanceMetrics);
      
      return true;
    } catch {
      return false;
    }
  }
}

// Singleton instance
export const storage = new StorageManager();

// Initialize with default data if empty
export const initializeDefaultData = () => {
  if (typeof window === 'undefined') return;

  // Initialize product data if not exists
  if (!storage.getProduct()) {
    const product: Product = {
      id: 'ac-001',
      model: 'CNCUSA-HD-12L',
      brand: 'Cruise N Comfort USA',
      fullName: 'CNCUSA-HD-12L 12V DC Mini-Split Air Conditioner',
      condition: 'new',
      specs: {
        coolingCapacity: '10,000 BTU/hr',
        voltage: '12V DC (10-15 VDC operating range)',
        currentDraw: '38-55 AMPS',
        systemType: 'Split system with remote condenser',
        construction: 'Stainless steel for harsh environments',
        refrigerant: 'R134a (requires professional charging)',
        weight: '~69 lbs',
        applications: ['Van conversions', 'RVs', 'Boats', 'Off-grid applications', 'Skoolies', 'Tiny homes']
      },
      pricing: {
        retailPrice: 4398,
        shippingCost: 174.50,
        totalRetailCost: 4572.50,
        askingPrice: 4200,
        savings: 372.50,
        savingsPercentage: 8.2,
        priceHistory: [
          {
            price: 4200,
            date: new Date().toISOString(),
            reason: 'Initial listing'
          }
        ],
        lastPriceUpdate: new Date().toISOString()
      },
      location: {
        area: 'Mid-Wilshire, Los Angeles',
        zipCode: '90036',
        pickupOnly: true,
        publicMeeting: true,
        preferredLocations: ['Police station parking lot', 'Major retail center']
      },
      features: [
        'No inverter required - direct 12V DC operation',
        'Professional-grade construction for harsh environments',
        'Split system design for quiet operation',
        'Perfect for battery-powered systems',
        'Compatible with solar charging systems',
        'American-made quality and support',
        'Heavy-duty stainless steel components'
      ],
      targetAudience: [
        'Van life enthusiasts',
        'RV owners and builders',
        'Off-grid living enthusiasts',
        'Boat/marine applications',
        'Custom vehicle builders',
        'Overland vehicle outfitters',
        'Solar power system users'
      ],
      images: {
        mainUnit: '/images/ac-main-unit.png',
        evaporator: '/images/ac-evaporator.jpg',
        remote: '/images/ac-remote.jpeg',
        systemOverview: '/images/ac-system-overview.jpeg',
        installation: '/images/ac-installation.jpeg'
      },
      sellerId: 'seller-001',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    storage.saveProduct(product);
  }

  // Initialize default seller settings if not exists
  if (!storage.getSellerSettings()) {
    const defaultSettings = {
      id: 'seller-001',
      email: 'seller@example.com',
      firstName: 'AC',
      lastName: 'Seller',
      preferences: {
        timezone: 'America/Los_Angeles',
        currency: 'USD',
        notifications: {
          email: true,
          sms: false,
          push: true,
          newInquiry: true,
          qualifiedLead: true,
          priceAlert: true,
          systemUpdates: false
        },
        automation: {
          autoResponse: true,
          autoRefresh: true,
          autoRepost: false,
          smartPricing: false,
          leadScoring: true
        },
        privacy: {
          showPhoneNumber: false,
          showExactLocation: false,
          allowDataAnalytics: true
        }
      },
      subscription: {
        plan: 'free' as const,
        status: 'active' as const,
        features: ['basic_listing', 'auto_response', 'lead_management']
      },
      stats: {
        totalListings: 0,
        activeListings: 0,
        totalSales: 0,
        totalRevenue: 0,
        averageTimeToSale: 0,
        averagePriceAchieved: 0,
        responseRate: 0,
        conversionRate: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    storage.saveSellerSettings(defaultSettings);
  }
};
