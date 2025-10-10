
import { DashboardData, PerformanceMetrics, Lead, Inquiry } from '../types';

// Real-time data simulation for development
export class DataGenerator {
  private static instance: DataGenerator;
  private startTime: number;
  private baseMetrics: any;

  constructor() {
    this.startTime = Date.now();
    this.baseMetrics = {
      totalViews: 0,
      totalInquiries: 0,
      activeLeads: 0,
      conversionRate: 0
    };
  }

  static getInstance(): DataGenerator {
    if (!DataGenerator.instance) {
      DataGenerator.instance = new DataGenerator();
    }
    return DataGenerator.instance;
  }

  // Generate realistic dashboard data based on time since start
  generateDashboardData(): DashboardData {
    const hoursSinceStart = (Date.now() - this.startTime) / (1000 * 60 * 60);
    const daysSinceStart = Math.floor(hoursSinceStart / 24);
    
    // Realistic growth curves
    const viewsPerHour = 20 + Math.sin(hoursSinceStart * 0.1) * 5; // Varies throughout day
    const totalViews = Math.floor(hoursSinceStart * viewsPerHour);
    
    const inquiryRate = 0.027; // 2.7% conversion rate from views to inquiries
    const totalInquiries = Math.floor(totalViews * inquiryRate);
    
    const leadQualificationRate = 0.24; // 24% of inquiries become qualified leads
    const activeLeads = Math.floor(totalInquiries * leadQualificationRate);
    
    const conversionRate = totalViews > 0 ? (totalInquiries / totalViews) * 100 : 0;

    return {
      totalViews,
      totalInquiries,
      activeLeads,
      conversionRate,
      currentPrice: 4200,
      daysListed: Math.max(1, daysSinceStart),
      autoResponsesActive: true,
      lastActivity: this.getLastActivity(),
      trend: this.getTrend(totalViews, totalInquiries)
    };
  }

  private getLastActivity(): string {
    const activities = [
      'New inquiry on Facebook Marketplace',
      'Auto-response sent to qualified lead',
      'Price check from RV forum visitor', 
      'Listing refreshed on OfferUp',
      'Follow-up response sent'
    ];
    
    const lastActivityTime = Math.floor(Math.random() * 45) + 5; // 5-50 minutes ago
    const activity = activities[Math.floor(Math.random() * activities.length)];
    
    return `${activity} • ${lastActivityTime} minutes ago`;
  }

  private getTrend(views: number, inquiries: number): 'up' | 'down' | 'stable' {
    const rate = inquiries / Math.max(views, 1);
    if (rate > 0.03) return 'up';
    if (rate < 0.02) return 'down';
    return 'stable';
  }

  // Generate realistic lead data
  generateLeads(): Lead[] {
    const leadTemplates = [
      {
        platform: 'Facebook Marketplace',
        contactInfo: { name: 'Mike Rodriguez', platformHandle: 'mike_van_life' },
        status: 'qualified' as const,
        priority: 'high' as const,
        estimatedValue: 4200,
        tags: ['van life', 'experienced buyer', 'cash ready']
      },
      {
        platform: 'OfferUp',
        contactInfo: { name: 'Sarah Chen', platformHandle: 'solar_enthusiast' },
        status: 'negotiating' as const,
        priority: 'medium' as const,
        estimatedValue: 4000,
        tags: ['off grid', 'technical questions', 'price conscious']
      },
      {
        platform: 'Craigslist',
        contactInfo: { name: 'RV Builder LA', platformHandle: 'rv_builder_la' },
        status: 'contacted' as const,
        priority: 'high' as const,
        estimatedValue: 4200,
        tags: ['professional buyer', 'bulk potential', 'referrals']
      },
      {
        platform: 'Facebook Marketplace',
        contactInfo: { name: 'Jenny Martinez', platformHandle: 'tiny_home_dreams' },
        status: 'new' as const,
        priority: 'medium' as const,
        estimatedValue: 3800,
        tags: ['tiny home', 'first time buyer', 'needs guidance']
      }
    ];

    return leadTemplates.map((template, index) => ({
      id: `lead-${index + 1}`,
      sellerId: 'seller-001',
      productId: 'ac-001',
      platform: template.platform,
      status: template.status,
      priority: template.priority,
      contactInfo: {
        ...template.contactInfo,
        platform: template.platform,
        verified: Math.random() > 0.3
      },
      inquiries: this.generateInquiriesForLead(index + 1),
      notes: [],
      estimatedValue: template.estimatedValue,
      tags: template.tags,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      lastContactAt: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000).toISOString()
    }));
  }

  private generateInquiriesForLead(leadIndex: number): Inquiry[] {
    const inquiryTemplates: Record<number, string[]> = {
      1: [
        "Hi! Is this 12V AC still available? I'm building out a van and this looks perfect.",
        "Yes, I can pick up this week and the price looks good. When can we meet?"
      ],
      2: [
        "What's the exact power consumption? I have a 400Ah LiFePO4 bank.",
        "Can you tell me more about the installation requirements?"
      ],
      3: [
        "I run a van conversion shop. Is this unit still available?",
        "We might be interested in purchasing multiple units if you have more."
      ],
      4: [
        "Is this good for a tiny home? What size space will it cool?",
        "Do you know any installers in the LA area?"
      ]
    };

    const messages = inquiryTemplates[leadIndex] || ["Is this still available?"];
    
    return messages.map((message, index) => ({
      id: `inquiry-${leadIndex}-${index + 1}`,
      message,
      timestamp: new Date(Date.now() - (messages.length - index) * 60 * 60 * 1000).toISOString(),
      platform: 'Facebook Marketplace',
      responded: true,
      autoResponse: this.getAutoResponseForMessage(message),
      sentiment: this.getSentiment(message),
      qualified: this.isMessageQualified(message)
    }));
  }

  private getAutoResponseForMessage(message: string): string {
    if (message.toLowerCase().includes('still available')) {
      return "Hello! Yes, the brand new CNCUSA-HD-12L air conditioner is still available. The price is firm at $4,200, and it is for local pickup only in Mid-Wilshire, Los Angeles.";
    }
    if (message.toLowerCase().includes('power') || message.toLowerCase().includes('amps')) {
      return "The unit draws 38-55 AMPS at 12V DC (10-15 VDC operating range). It's designed for battery systems and works great with 400Ah+ banks.";
    }
    if (message.toLowerCase().includes('installation')) {
      return "This requires professional installation with evacuation and R134a refrigerant charging. It's not a plug-and-play unit.";
    }
    return "Thank you for your interest! Please let me know if you have any specific questions about the unit.";
  }

  private getSentiment(message: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['perfect', 'great', 'interested', 'good', 'excellent'];
    const negativeWords = ['too expensive', 'cheap', 'problem', 'issue', 'broken'];
    
    const lowerMessage = message.toLowerCase();
    
    if (positiveWords.some(word => lowerMessage.includes(word))) return 'positive';
    if (negativeWords.some(word => lowerMessage.includes(word))) return 'negative';
    return 'neutral';
  }

  private isMessageQualified(message: string): boolean {
    const qualifiedKeywords = [
      'can pick up', 'price is good', 'cash ready', 'this week',
      'van conversion', 'off grid', 'solar', 'professional',
      'multiple units', 'when can we meet'
    ];
    
    return qualifiedKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  }

  // Generate performance metrics over time
  generatePerformanceHistory(days: number): PerformanceMetrics[] {
    const metrics: PerformanceMetrics[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
      
      // Simulate platform-specific performance
      const platforms = ['Facebook Marketplace', 'OfferUp', 'Craigslist'];
      
      platforms.forEach(platform => {
        const baseViews = platform === 'Facebook Marketplace' ? 80 : 
                         platform === 'OfferUp' ? 40 : 25;
        
        const views = Math.floor(baseViews + Math.random() * 30 - 15);
        const inquiries = Math.floor(views * (0.02 + Math.random() * 0.03));
        const responses = Math.floor(inquiries * (0.85 + Math.random() * 0.15));
        const qualified = Math.floor(inquiries * (0.2 + Math.random() * 0.15));
        
        metrics.push({
          id: `metric-${platform}-${i}`,
          productId: 'ac-001',
          date: date.toISOString().split('T')[0],
          views,
          inquiries,
          responses,
          qualifiedLeads: qualified,
          platform,
          conversionRate: views > 0 ? (inquiries / views) * 100 : 0,
          responseTime: Math.floor(300 + Math.random() * 600) // 5-15 minutes
        });
      });
    }
    
    return metrics;
  }

  // Reset and regenerate all data
  regenerateAllData(): void {
    const dashboardData = this.generateDashboardData();
    const leads = this.generateLeads();
    const performanceHistory = this.generatePerformanceHistory(7);
    
    // Store generated data
    if (typeof window !== 'undefined') {
      localStorage.setItem('ac_selling_dashboard_generated_data', JSON.stringify({
        dashboard: dashboardData,
        leads,
        performance: performanceHistory,
        lastGenerated: new Date().toISOString()
      }));
    }
  }
}

export const dataGenerator = DataGenerator.getInstance();
