
import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api-client';
import { Listing } from '@/lib/types';
import { useToast } from './use-toast';

interface UseListingsReturn {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  createListing: (data: any) => Promise<boolean>;
  updateListing: (id: string, data: any) => Promise<boolean>;
  deleteListing: (id: string) => Promise<boolean>;
  refresh: () => Promise<void>;
}

export function useListings(): UseListingsReturn {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchListings = useCallback(async () => {
    // Skip session check for demo purposes
    // if (!session) return;

    try {
      setError(null);
      const response = await api.getListings('seller-001');
      
      if (response.success && response.data) {
        setListings(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch listings');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Listings fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []); // Remove session dependency for demo

  const createListing = useCallback(async (data: any): Promise<boolean> => {
    try {
      const response = await api.createListing({ ...data, sellerId: 'seller-001' });
      
      if (response.success) {
        await fetchListings(); // Refresh data
        toast({
          title: 'Listing Created',
          description: 'Your listing has been created successfully',
        });
        return true;
      } else {
        throw new Error(response.error || 'Failed to create listing');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Creation Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  }, [fetchListings, toast]);

  const updateListing = useCallback(async (id: string, data: any): Promise<boolean> => {
    try {
      const response = await api.updateListing(id, data);
      
      if (response.success) {
        await fetchListings(); // Refresh data
        toast({
          title: 'Listing Updated',
          description: 'Your listing has been updated successfully',
        });
        return true;
      } else {
        throw new Error(response.error || 'Failed to update listing');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Update Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  }, [fetchListings, toast]);

  const deleteListing = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await api.deleteListing(id);
      
      if (response.success) {
        await fetchListings(); // Refresh data
        toast({
          title: 'Listing Deleted',
          description: 'Your listing has been deleted successfully',
        });
        return true;
      } else {
        throw new Error(response.error || 'Failed to delete listing');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: 'Deletion Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  }, [fetchListings, toast]);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchListings();
  }, [fetchListings]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return {
    listings,
    loading,
    error,
    createListing,
    updateListing,
    deleteListing,
    refresh
  };
}
