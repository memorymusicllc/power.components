/**
 * Smart Search Suggestions
 * Real-time suggestions with categories and metadata awareness
 */

import { SearchSuggestion, SearchResult } from './types'
import { searchHistoryManager } from './history'

export class SearchSuggestionsManager {
  private data: any[] = []
  private categories: Set<string> = new Set()
  private types: Set<string> = new Set()
  
  constructor(data: any[] = []) {
    this.setData(data)
  }
  
  setData(data: any[]): void {
    this.data = data
    this.categories.clear()
    this.types.clear()
    
    data.forEach(item => {
      if (item.category) this.categories.add(item.category)
      if (item.type) this.types.add(item.type)
    })
  }
  
  getSuggestions(query: string, limit: number = 10): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = []
    
    if (!query.trim()) {
      return this.getDefaultSuggestions(limit)
    }
    
    // Recent searches
    const recentQueries = searchHistoryManager.getSuggestionsFromHistory(query, 3)
    recentQueries.forEach((recentQuery, index) => {
      suggestions.push({
        id: `recent-${index}`,
        text: recentQuery,
        category: 'Recent',
        type: 'recent',
        icon: 'Clock'
      })
    })
    
    // Data-based suggestions
    const dataSuggestions = this.getDataSuggestions(query, limit - suggestions.length)
    suggestions.push(...dataSuggestions)
    
    // Filter suggestions
    const filterSuggestions = this.getFilterSuggestions(query, 2)
    suggestions.push(...filterSuggestions)
    
    // Operator suggestions
    const operatorSuggestions = this.getOperatorSuggestions(query, 2)
    suggestions.push(...operatorSuggestions)
    
    return suggestions.slice(0, limit)
  }
  
  private getDefaultSuggestions(limit: number): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = []
    
    // Popular queries
    const popularQueries = searchHistoryManager.getPopularQueries(3)
    popularQueries.forEach((query, index) => {
      suggestions.push({
        id: `popular-${index}`,
        text: query,
        category: 'Popular',
        type: 'suggestion',
        icon: 'TrendingUp'
      })
    })
    
    // Category suggestions
    Array.from(this.categories).slice(0, 3).forEach((category, index) => {
      suggestions.push({
        id: `category-${index}`,
        text: `category:${category}`,
        category: 'Filter',
        type: 'filter',
        icon: 'Tag'
      })
    })
    
    return suggestions.slice(0, limit)
  }
  
  private getDataSuggestions(query: string, limit: number): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = []
    const queryLower = query.toLowerCase()
    
    // Title matches
    this.data
      .filter(item => item.title?.toLowerCase().includes(queryLower))
      .slice(0, limit)
      .forEach((item, index) => {
        suggestions.push({
          id: `data-title-${index}`,
          text: item.title,
          category: item.category || 'Data',
          type: 'suggestion',
          icon: 'FileText',
          metadata: item
        })
      })
    
    // Description matches
    this.data
      .filter(item => 
        item.description?.toLowerCase().includes(queryLower) &&
        !item.title?.toLowerCase().includes(queryLower)
      )
      .slice(0, limit - suggestions.length)
      .forEach((item, index) => {
        suggestions.push({
          id: `data-desc-${index}`,
          text: item.description,
          category: item.category || 'Data',
          type: 'suggestion',
          icon: 'FileText',
          metadata: item
        })
      })
    
    return suggestions
  }
  
  private getFilterSuggestions(query: string, limit: number): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = []
    const queryLower = query.toLowerCase()
    
    // Category filters
    Array.from(this.categories)
      .filter(category => category.toLowerCase().includes(queryLower))
      .slice(0, limit)
      .forEach((category, index) => {
        suggestions.push({
          id: `filter-category-${index}`,
          text: `category:${category}`,
          category: 'Filter',
          type: 'filter',
          icon: 'Tag'
        })
      })
    
    // Type filters
    Array.from(this.types)
      .filter(type => type.toLowerCase().includes(queryLower))
      .slice(0, limit - suggestions.length)
      .forEach((type, index) => {
        suggestions.push({
          id: `filter-type-${index}`,
          text: `type:${type}`,
          category: 'Filter',
          type: 'filter',
          icon: 'Layers'
        })
      })
    
    return suggestions
  }
  
  private getOperatorSuggestions(query: string, limit: number): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = []
    const queryLower = query.toLowerCase()
    
    const operators = [
      { text: 'AND', description: 'All conditions must be true' },
      { text: 'OR', description: 'At least one condition must be true' },
      { text: 'NOT', description: 'Condition must be false' },
      { text: 'XOR', description: 'Exactly one condition must be true' }
    ]
    
    operators
      .filter(op => op.text.toLowerCase().includes(queryLower))
      .slice(0, limit)
      .forEach((op, index) => {
        suggestions.push({
          id: `operator-${index}`,
          text: op.text,
          category: 'Operator',
          type: 'operator',
          icon: 'Zap',
          metadata: { description: op.description }
        })
      })
    
    return suggestions
  }
  
  getCategorySuggestions(): SearchSuggestion[] {
    return Array.from(this.categories).map((category, index) => ({
      id: `category-${index}`,
      text: category,
      category: 'Category',
      type: 'suggestion',
      icon: 'Tag'
    }))
  }
  
  getTypeSuggestions(): SearchSuggestion[] {
    return Array.from(this.types).map((type, index) => ({
      id: `type-${index}`,
      text: type,
      category: 'Type',
      type: 'suggestion',
      icon: 'Layers'
    }))
  }
}
