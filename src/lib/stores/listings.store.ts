/**
 * Listings Store - Zustand State Management
 * Manages all listing data and operations
 * Migrated from use-listings.ts hook
 */

import { create } from 'zustand';
import { api } from '@/lib/api-client';
import { Listing } from '@/lib/types';

interface ListingsState {
  // State
  listings: Listing[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchListings: () => Promise<void>;
  createListing: (data: any) => Promise<boolean>;
  updateListing: (id: string, data: any) => Promise<boolean>;
  deleteListing: (id: string) => Promise<boolean>;
  refresh: () => Promise<void>;
}

export const useListingsStore = create<ListingsState>((set, get) => ({
  // Initial State
  listings: [],
  loading: false,
  error: null,
  
  // Fetch Listings
  fetchListings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getListings('user-001');
      
      if (response.success && response.data) {
        const listingsArray = Array.isArray(response.data) ? response.data : [];
        set({ listings: listingsArray, loading: false });
      } else {
        throw new Error((response as any).error || 'Failed to fetch listings');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ error: errorMessage, loading: false });
      console.error('Listings fetch error:', err);
    }
  },
  
  // Create Listing
  createListing: async (data: any): Promise<boolean> => {
    try {
      const response = await api.createListing({ ...data, userId: 'user-001' });
      
      if (response.success) {
        await get().fetchListings(); // Refresh data
        return true;
      } else {
        throw new Error((response as any).error || 'Failed to create listing');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ error: errorMessage });
      return false;
    }
  },
  
  // Update Listing
  updateListing: async (id: string, data: any): Promise<boolean> => {
    try {
      const response = await api.updateListing(id, data);
      
      if (response.success) {
        await get().fetchListings(); // Refresh data
        return true;
      } else {
        throw new Error((response as any).error || 'Failed to update listing');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ error: errorMessage });
      return false;
    }
  },
  
  // Delete Listing
  deleteListing: async (id: string): Promise<boolean> => {
    try {
      const response = await api.deleteListing(id);
      
      if (response.success) {
        await get().fetchListings(); // Refresh data
        return true;
      } else {
        throw new Error((response as any).error || 'Failed to delete listing');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ error: errorMessage });
      return false;
    }
  },
  
  // Refresh
  refresh: async () => {
    await get().fetchListings();
  },
}));
