/**
 * Universal Search System Types
 * Comprehensive type definitions for the advanced search functionality
 */

export interface SearchResult {
  id: string
  title: string
  description?: string
  category: string
  type: string
  relevanceScore: number
  metadata: Record<string, any>
  url?: string
  tags: string[]
  timestamp?: Date
}

export interface SearchSuggestion {
  id: string
  text: string
  category: string
  type: 'recent' | 'suggestion' | 'filter' | 'operator'
  icon?: string
  metadata?: Record<string, any>
}

export interface SearchFilter {
  id: string
  label: string
  value: string
  category: string
  color: string
  removable: boolean
}

export interface LogicOperator {
  id: string
  symbol: string
  label: string
  description: string
  color: string
  glowColor: string
  keyboard: string
}

export interface SearchHistory {
  id: string
  query: string
  timestamp: Date
  resultsCount: number
  filters: SearchFilter[]
}

export interface SearchAlgorithm {
  name: string
  description: string
  weight: number
  function: (query: string, data: any[], field: string) => SearchResult[]
}

export interface SearchConfig {
  algorithms: SearchAlgorithm[]
  maxSuggestions: number
  maxHistory: number
  debounceMs: number
  enable3D: boolean
  enableKeyboard: boolean
  enableOperators: boolean
}

export interface SearchState {
  query: string
  suggestions: SearchSuggestion[]
  results: SearchResult[]
  filters: SearchFilter[]
  history: SearchHistory[]
  selectedIndex: number
  isOpen: boolean
  isLoading: boolean
  error?: string
}

export interface SearchContext {
  data: any[]
  config: SearchConfig
  onResultSelect: (result: SearchResult) => void
  onFilterAdd: (filter: SearchFilter) => void
  onFilterRemove: (filterId: string) => void
  onQueryChange: (query: string) => void
}

// 3D Search specific types
export interface Scene3DNode {
  id: string
  name: string
  type: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  metadata: Record<string, any>
}

export interface Search3DResult extends SearchResult {
  node: Scene3DNode
  distance: number
  boundingBox: {
    min: [number, number, number]
    max: [number, number, number]
  }
}

// React Flow integration types
export interface FlowNode {
  id: string
  type: string
  data: Record<string, any>
  position: { x: number; y: number }
}

export interface SearchFlowResult extends SearchResult {
  node: FlowNode
  connections: string[]
}
