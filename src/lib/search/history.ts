/**
 * Search History Management
 * Persistent search history with navigation and storage
 */

import { SearchHistory, SearchFilter } from './types'

const STORAGE_KEY = 'universal-search-history'
const MAX_HISTORY = 50

export class SearchHistoryManager {
  private history: SearchHistory[] = []
  
  constructor() {
    this.loadHistory()
  }
  
  private loadHistory(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        this.history = JSON.parse(stored).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }))
      }
    } catch (error) {
      console.warn('Failed to load search history:', error)
      this.history = []
    }
  }
  
  private saveHistory(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history))
    } catch (error) {
      console.warn('Failed to save search history:', error)
    }
  }
  
  addSearch(query: string, resultsCount: number, filters: SearchFilter[] = []): void {
    const newEntry: SearchHistory = {
      id: `search-${Date.now()}`,
      query,
      timestamp: new Date(),
      resultsCount,
      filters
    }
    
    // Remove duplicate if exists
    this.history = this.history.filter(item => item.query !== query)
    
    // Add to beginning
    this.history.unshift(newEntry)
    
    // Limit history size
    if (this.history.length > MAX_HISTORY) {
      this.history = this.history.slice(0, MAX_HISTORY)
    }
    
    this.saveHistory()
  }
  
  getHistory(): SearchHistory[] {
    return [...this.history]
  }
  
  getRecentQueries(limit: number = 10): string[] {
    return this.history
      .slice(0, limit)
      .map(item => item.query)
  }
  
  getHistoryByQuery(query: string): SearchHistory | undefined {
    return this.history.find(item => item.query === query)
  }
  
  clearHistory(): void {
    this.history = []
    this.saveHistory()
  }
  
  removeHistoryItem(id: string): void {
    this.history = this.history.filter(item => item.id !== id)
    this.saveHistory()
  }
  
  getPopularQueries(limit: number = 5): string[] {
    const queryCounts = new Map<string, number>()
    
    this.history.forEach(item => {
      const count = queryCounts.get(item.query) || 0
      queryCounts.set(item.query, count + 1)
    })
    
    return Array.from(queryCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([query]) => query)
  }
  
  getSuggestionsFromHistory(query: string, limit: number = 5): string[] {
    if (!query.trim()) return this.getRecentQueries(limit)
    
    return this.history
      .filter(item => 
        item.query.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes(item.query.toLowerCase())
      )
      .slice(0, limit)
      .map(item => item.query)
  }
}

export const searchHistoryManager = new SearchHistoryManager()
