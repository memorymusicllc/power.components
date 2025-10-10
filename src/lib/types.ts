
// Core Types
export interface Product {
  id: string;
  model: string;
  brand: string;
  fullName: string;
  condition: 'new' | 'used' | 'refurbished';
  specs: ProductSpecs;
  pricing: ProductPricing;
  location: ProductLocation;
  features: string[];
  targetAudience: string[];
  images: ProductImages;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSpecs {
  coolingCapacity: string;
  voltage: string;
  currentDraw: string;
  systemType: string;
  construction: string;
  refrigerant: string;
  weight: string;
  applications: string[];
}

export interface ProductPricing {
  retailPrice: number;
  shippingCost: number;
  totalRetailCost: number;
  askingPrice: number;
  savings: number;
  savingsPercentage: number;
  priceHistory: PriceHistoryEntry[];
  lastPriceUpdate: string;
}

export interface PriceHistoryEntry {
  price: number;
  date: string;
  reason: string;
}

export interface ProductLocation {
  area: string;
  zipCode: string;
  pickupOnly: boolean;
  publicMeeting: boolean;
  preferredLocations: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ProductImages {
  mainUnit: string;
  evaporator: string;
  remote: string;
  systemOverview: string;
  installation: string;
  additional?: string[];
}

// Platform Management
export interface Platform {
  id: string;
  name: string;
  displayName: string;
  description: string;
  config: PlatformConfig;
  isActive: boolean;
  lastPosted?: string;
  status: 'active' | 'pending' | 'paused' | 'error';
}

export interface PlatformConfig {
  autoPost: boolean;
  responseAutomation: boolean;
  maxListings: number;
  refreshInterval: number; // hours
  apiKey?: string;
  credentials?: Record<string, any>;
}

// Listing Management
export interface Listing {
  id: string;
  productId: string;
  platformId: string;
  title: string;
  description: string;
  price: number;
  status: 'draft' | 'active' | 'paused' | 'sold' | 'expired' | 'deleted';
  views: number;
  inquiries: number;
  qualifiedLeads: number;
  externalId?: string; // Platform-specific listing ID
  url?: string;
  postedAt?: string;
  lastRefreshed?: string;
  expiresAt?: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

// Auto-Responder System
export interface AutoResponseRule {
  id: string;
  sellerId: string;
  name: string;
  triggers: string[];
  response: string;
  conditions: ResponseConditions;
  isActive: boolean;
  priority: number;
  platforms: string[];
  usageCount: number;
  successRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseConditions {
  timeWindow?: number; // minutes
  maxResponses?: number;
  excludeKeywords?: string[];
  requireKeywords?: string[];
  minInquiryLength?: number;
  skipIfReplied?: boolean;
}

export interface AutoResponse {
  id: string;
  ruleId: string;
  inquiryId: string;
  response: string;
  sentAt: string;
  platform: string;
  success: boolean;
  errorMessage?: string;
}

// Lead Management
export interface Lead {
  id: string;
  sellerId: string;
  productId: string;
  platform: string;
  status: 'new' | 'contacted' | 'qualified' | 'negotiating' | 'scheduled' | 'closed' | 'lost';
  priority: 'low' | 'medium' | 'high';
  contactInfo: ContactInfo;
  inquiries: Inquiry[];
  notes: string[];
  estimatedValue: number;
  scheduledMeeting?: ScheduledMeeting;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastContactAt?: string;
}

export interface ContactInfo {
  name?: string;
  platform: string;
  platformHandle: string;
  phone?: string;
  email?: string;
  verified: boolean;
}

export interface Inquiry {
  id: string;
  message: string;
  timestamp: string;
  platform: string;
  responded: boolean;
  autoResponse?: string;
  manualResponse?: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  qualified: boolean;
}

export interface ScheduledMeeting {
  datetime: string;
  location: string;
  confirmed: boolean;
  reminderSent: boolean;
  notes?: string;
}

// User/Seller Management
export interface Seller {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferences: SellerPreferences;
  subscription: SellerSubscription;
  stats: SellerStats;
  createdAt: string;
  updatedAt: string;
}

export interface SellerPreferences {
  timezone: string;
  currency: string;
  notifications: NotificationSettings;
  automation: AutomationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  newInquiry: boolean;
  qualifiedLead: boolean;
  priceAlert: boolean;
  systemUpdates: boolean;
}

export interface AutomationSettings {
  autoResponse: boolean;
  autoRefresh: boolean;
  autoRepost: boolean;
  smartPricing: boolean;
  leadScoring: boolean;
}

export interface PrivacySettings {
  showPhoneNumber: boolean;
  showExactLocation: boolean;
  allowDataAnalytics: boolean;
}

export interface SellerSubscription {
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  expiresAt?: string;
  features: string[];
}

export interface SellerStats {
  totalListings: number;
  activeListings: number;
  totalSales: number;
  totalRevenue: number;
  averageTimeToSale: number;
  averagePriceAchieved: number;
  responseRate: number;
  conversionRate: number;
}

// Analytics and Performance
export interface PerformanceMetrics {
  id: string;
  productId: string;
  date: string;
  views: number;
  inquiries: number;
  responses: number;
  qualifiedLeads: number;
  platform: string;
  conversionRate: number;
  responseTime: number; // seconds
}

export interface PlatformAnalytics {
  platform: string;
  totalViews: number;
  totalInquiries: number;
  conversionRate: number;
  averageResponseTime: number;
  topPerformingHours: string[];
  leadQuality: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// UI Component Props
export interface DashboardData {
  totalViews: number;
  totalInquiries: number;
  activeLeads: number;
  conversionRate: number;
  currentPrice: number;
  daysListed: number;
  autoResponsesActive: boolean;
  lastActivity: string;
  trend: 'up' | 'down' | 'stable';
}

export interface ListingFormData {
  title: string;
  description: string;
  price: number;
  platforms: string[];
  scheduledDate?: string;
  autoRefresh: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Configuration Types
export interface AppConfig {
  features: {
    autoResponder: boolean;
    crossPosting: boolean;
    priceMonitoring: boolean;
    leadScoring: boolean;
    analytics: boolean;
  };
  limits: {
    maxListings: number;
    maxAutoRules: number;
    maxPlatforms: number;
    apiCallsPerMinute: number;
  };
  timeouts: {
    apiRequest: number;
    autoResponse: number;
    platformSync: number;
  };
}
