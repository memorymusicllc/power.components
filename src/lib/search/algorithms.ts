/**
 * Search Algorithms
 * Multiple search algorithms with different matching strategies
 */

import { SearchResult, SearchAlgorithm } from './types'

export const searchAlgorithms: SearchAlgorithm[] = [
  {
    name: 'exact',
    description: 'Exact string matching',
    weight: 1.0,
    function: (query: string, data: any[], field: string) => {
      return data
        .filter(item => item[field]?.toLowerCase() === query.toLowerCase())
        .map((item, index) => ({
          id: item.id || `exact-${index}`,
          title: item[field] || '',
          description: item.description || '',
          category: item.category || 'general',
          type: item.type || 'item',
          relevanceScore: 1.0,
          metadata: item,
          tags: item.tags || [],
          timestamp: item.timestamp ? new Date(item.timestamp) : new Date()
        }))
    }
  },
  {
    name: 'startsWith',
    description: 'Starts with matching',
    weight: 0.9,
    function: (query: string, data: any[], field: string) => {
      return data
        .filter(item => item[field]?.toLowerCase().startsWith(query.toLowerCase()))
        .map((item, index) => ({
          id: item.id || `startsWith-${index}`,
          title: item[field] || '',
          description: item.description || '',
          category: item.category || 'general',
          type: item.type || 'item',
          relevanceScore: 0.9,
          metadata: item,
          tags: item.tags || [],
          timestamp: item.timestamp ? new Date(item.timestamp) : new Date()
        }))
    }
  },
  {
    name: 'contains',
    description: 'Contains matching',
    weight: 0.8,
    function: (query: string, data: any[], field: string) => {
      return data
        .filter(item => item[field]?.toLowerCase().includes(query.toLowerCase()))
        .map((item, index) => ({
          id: item.id || `contains-${index}`,
          title: item[field] || '',
          description: item.description || '',
          category: item.category || 'general',
          type: item.type || 'item',
          relevanceScore: 0.8,
          metadata: item,
          tags: item.tags || [],
          timestamp: item.timestamp ? new Date(item.timestamp) : new Date()
        }))
    }
  },
  {
    name: 'fuzzy',
    description: 'Fuzzy matching with Levenshtein distance',
    weight: 0.7,
    function: (query: string, data: any[], field: string) => {
      const fuzzyMatch = (str: string, pattern: string): number => {
        const matrix = Array(pattern.length + 1).fill(null).map(() => Array(str.length + 1).fill(null))
        
        for (let i = 0; i <= str.length; i++) matrix[0][i] = i
        for (let j = 0; j <= pattern.length; j++) matrix[j][0] = j
        
        for (let j = 1; j <= pattern.length; j++) {
          for (let i = 1; i <= str.length; i++) {
            const indicator = str[i - 1] === pattern[j - 1] ? 0 : 1
            matrix[j][i] = Math.min(
              matrix[j][i - 1] + 1,
              matrix[j - 1][i] + 1,
              matrix[j - 1][i - 1] + indicator
            )
          }
        }
        
        return matrix[pattern.length][str.length]
      }

      return data
        .map(item => ({
          item,
          distance: fuzzyMatch(item[field]?.toLowerCase() || '', query.toLowerCase())
        }))
        .filter(({ distance }) => distance <= Math.max(2, Math.floor(query.length / 3)))
        .sort((a, b) => a.distance - b.distance)
        .map(({ item, distance }, index) => ({
          id: item.id || `fuzzy-${index}`,
          title: item[field] || '',
          description: item.description || '',
          category: item.category || 'general',
          type: item.type || 'item',
          relevanceScore: Math.max(0.1, 1 - (distance / Math.max(query.length, 1))),
          metadata: item,
          tags: item.tags || [],
          timestamp: item.timestamp ? new Date(item.timestamp) : new Date()
        }))
    }
  },
  {
    name: 'semantic',
    description: 'Semantic matching using word similarity',
    weight: 0.6,
    function: (query: string, data: any[], field: string) => {
      const queryWords = query.toLowerCase().split(/\s+/)
      
      return data
        .map(item => {
          const text = item[field]?.toLowerCase() || ''
          const textWords = text.split(/\s+/)
          
          let score = 0
          queryWords.forEach(queryWord => {
            textWords.forEach((textWord: string) => {
              if (textWord.includes(queryWord) || queryWord.includes(textWord)) {
                score += 1
              }
            })
          })
          
          return { item, score: score / queryWords.length }
        })
        .filter(({ score }) => score > 0.3)
        .sort((a, b) => b.score - a.score)
        .map(({ item, score }, index) => ({
          id: item.id || `semantic-${index}`,
          title: item[field] || '',
          description: item.description || '',
          category: item.category || 'general',
          type: item.type || 'item',
          relevanceScore: score,
          metadata: item,
          tags: item.tags || [],
          timestamp: item.timestamp ? new Date(item.timestamp) : new Date()
        }))
    }
  }
]

export function calculateWeightedResults(results: SearchResult[], algorithms: SearchAlgorithm[]): SearchResult[] {
  const resultMap = new Map<string, SearchResult>()
  
  results.forEach(result => {
    const existing = resultMap.get(result.id)
    if (existing) {
      existing.relevanceScore = Math.max(existing.relevanceScore, result.relevanceScore)
    } else {
      resultMap.set(result.id, result)
    }
  })
  
  return Array.from(resultMap.values())
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
}
