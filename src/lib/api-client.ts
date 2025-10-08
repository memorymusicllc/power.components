
import { ApiResponse, Product } from './types';

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private retryAttempts: number;

  constructor(baseURL = '', timeout = 10000, retryAttempts = 3) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.retryAttempts = retryAttempts;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeoutMs = this.timeout
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    attempt = 1
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt < this.retryAttempts) {
        const backoffDelay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        await this.delay(backoffDelay);
        return this.retryRequest(requestFn, attempt + 1);
      }
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.retryRequest(async () => {
      try {
        const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        return {
          success: true,
          data: data as T,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error(`API GET ${endpoint} failed:`, error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        };
      }
    });
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.retryRequest(async () => {
      try {
        const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
          method: 'POST',
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        return {
          success: true,
          data: data as T,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error(`API POST ${endpoint} failed:`, error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        };
      }
    });
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.retryRequest(async () => {
      try {
        const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
          method: 'PUT',
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        return {
          success: true,
          data: data as T,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error(`API PUT ${endpoint} failed:`, error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        };
      }
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.retryRequest(async () => {
      try {
        const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        return {
          success: true,
          data: data as T,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error(`API DELETE ${endpoint} failed:`, error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        };
      }
    });
  }
}

// Singleton instance - pointing to real backend API
export const apiClient = new ApiClient('http://localhost:3001', 15000, 3);

// Specific API functions
export const api = {
  // Dashboard APIs
  async getDashboardData() {
    return apiClient.get<any>('/api/dashboard');
  },

  // Product APIs
  async getProduct(id: string) {
    return apiClient.get<Product>(`/api/products/${id}`);
  },

  async updateProduct(id: string, data: Partial<Product>) {
    return apiClient.put<Product>(`/api/products/${id}`, data);
  },

  // Listing APIs
  async getListings(userId: string) {
    return apiClient.get<any[]>(`/api/listings?userId=${userId}`);
  },

  async createListing(data: any) {
    return apiClient.post<any>('/api/listings', data);
  },

  async updateListing(id: string, data: any) {
    return apiClient.put<any>(`/api/listings/${id}`, data);
  },

  async deleteListing(id: string) {
    return apiClient.delete<any>(`/api/listings/${id}`);
  },

  // Auto-Responder APIs
  async getAutoResponseRules(sellerId: string) {
    return apiClient.get<any[]>(`/api/auto-responses?sellerId=${sellerId}`);
  },

  async createAutoResponseRule(data: any) {
    return apiClient.post<any>('/api/auto-responses', data);
  },

  async updateAutoResponseRule(id: string, data: any) {
    return apiClient.put<any>(`/api/auto-responses/${id}`, data);
  },

  async deleteAutoResponseRule(id: string) {
    return apiClient.delete<any>(`/api/auto-responses/${id}`);
  },

  // Lead APIs
  async getLeads(sellerId: string) {
    return apiClient.get<any[]>(`/api/leads?sellerId=${sellerId}`);
  },

  async updateLead(id: string, data: any) {
    return apiClient.put<any>(`/api/leads/${id}`, data);
  },

  // Analytics APIs
  async getPerformanceMetrics(sellerId: string, timeRange: string) {
    return apiClient.get<any>(`/api/analytics/performance?sellerId=${sellerId}&timeRange=${timeRange}`);
  },

  async getPlatformAnalytics(sellerId: string) {
    return apiClient.get<any[]>(`/api/analytics/platforms?sellerId=${sellerId}`);
  },

  // Settings APIs
  async getSellerSettings(sellerId: string) {
    return apiClient.get<any>(`/api/settings?sellerId=${sellerId}`);
  },

  async updateSellerSettings(sellerId: string, data: any) {
    return apiClient.put<any>(`/api/settings?sellerId=${sellerId}`, data);
  }
};
