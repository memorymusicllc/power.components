/**
 * Word Cloud Chart
 * Displays patterns using small color rectangles in sequences instead of words
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefreshCw, Shuffle, Filter } from 'lucide-react'

interface PatternItem {
  id: string
  label: string
  value: number
  color: string
  category: string
  frequency: number
}

interface WordCloudChartProps {
  data: PatternItem[]
  title?: string
  layout?: 'spiral' | 'grid' | 'random' | 'hierarchical'
  showCategories?: boolean
  className?: string
}

export function WordCloudChart({
  data,
  title = "Pattern Cloud Analysis",
  layout = 'spiral',
  showCategories = true,
  className = ""
}: WordCloudChartProps) {
  const [patternItems, setPatternItems] = useState<PatternItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [shuffleKey, setShuffleKey] = useState(0)

  // Chart dimensions
  const width = 500
  const height = 400
  const centerX = width / 2
  const centerY = height / 2

  // Generate pattern rectangles
  useEffect(() => {
    const generatePatterns = () => {
      const filteredData = selectedCategory === 'all' 
        ? data 
        : data.filter(item => item.category === selectedCategory)

      const patterns: PatternItem[] = []
      
      filteredData.forEach(item => {
        // Create multiple rectangles for each item based on frequency
        for (let i = 0; i < Math.min(item.frequency, 20); i++) {
          patterns.push({
            ...item,
            id: `${item.id}-${i}`,
            value: item.value + (Math.random() - 0.5) * 0.2 // Add slight variation
          })
        }
      })

      setPatternItems(patterns)
    }

    generatePatterns()
  }, [data, selectedCategory, shuffleKey])

  // Calculate positions based on layout
  const calculatePositions = (items: PatternItem[]) => {
    const positions: Array<{ item: PatternItem; x: number; y: number; size: number; rotation: number }> = []
    
    items.forEach((item, index) => {
      let x, y, size, rotation

      switch (layout) {
        case 'spiral':
          const angle = (index * 137.5) % 360 // Golden angle
          const radius = Math.sqrt(index) * 8
          x = centerX + Math.cos(angle * Math.PI / 180) * radius
          y = centerY + Math.sin(angle * Math.PI / 180) * radius
          size = Math.max(8, Math.min(24, item.value * 2))
          rotation = angle
          break

        case 'grid':
          const cols = Math.ceil(Math.sqrt(items.length))
          const row = Math.floor(index / cols)
          const col = index % cols
          x = 50 + col * 25
          y = 50 + row * 25
          size = Math.max(8, Math.min(20, item.value * 2))
          rotation = 0
          break

        case 'random':
          x = 50 + Math.random() * (width - 100)
          y = 50 + Math.random() * (height - 100)
          size = Math.max(6, Math.min(20, item.value * 2))
          rotation = Math.random() * 360
          break

        case 'hierarchical':
          const level = Math.floor(Math.log2(index + 1))
          const levelIndex = index - (Math.pow(2, level) - 1)
          const levelWidth = Math.pow(2, level)
          x = centerX + (levelIndex - levelWidth / 2) * 30
          y = centerY + level * 40 - 100
          size = Math.max(6, Math.min(18, item.value * 2))
          rotation = 0
          break

        default:
          x = centerX
          y = centerY
          size = 10
          rotation = 0
      }

      positions.push({ item, x, y, size, rotation })
    })

    return positions
  }

  const positions = calculatePositions(patternItems)

  // Get unique categories
  const categories = Array.from(new Set(data.map(d => d.category)))

  const handleShuffle = () => {
    setShuffleKey(prev => prev + 1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
          {title}
        </CardTitle>
        <CardDescription>
          Pattern visualization using color rectangles and sequences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleShuffle}>
              <Shuffle className="w-4 h-4 mr-1" />
              Shuffle
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShuffleKey(prev => prev + 1)}>
              <RefreshCw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <div className="text-xs text-muted-foreground ml-2">
              Layout: {layout} | Items: {patternItems.length}
            </div>
          </div>

          {/* Category Filter */}
          {showCategories && categories.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Category:</span>
              <Button
                size="sm"
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => handleCategoryChange('all')}
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  size="sm"
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}

          {/* Pattern Cloud */}
          <div className="relative overflow-hidden border rounded-lg">
            <svg
              width={width}
              height={height}
              style={{ background: 'hsl(var(--background))' }}
            >
              {/* Background grid for reference */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Pattern rectangles */}
              {positions.map(({ item, x, y, size, rotation }) => (
                <g key={item.id}>
                  <rect
                    x={x - size / 2}
                    y={y - size / 2}
                    width={size}
                    height={size * 0.6} // Make rectangles more rectangular
                    fill={item.color}
                    stroke="hsl(var(--background))"
                    strokeWidth={1}
                    opacity={0.8}
                    transform={`rotate(${rotation} ${x} ${y})`}
                    className="hover:opacity-100 transition-opacity cursor-pointer"
                  />
                  {/* Frequency indicator */}
                  {item.frequency > 5 && (
                    <circle
                      cx={x + size / 2 - 2}
                      cy={y - size / 2 + 2}
                      r={3}
                      fill="hsl(var(--destructive))"
                      opacity={0.8}
                    />
                  )}
                </g>
              ))}

              {/* Center reference point */}
              <circle
                cx={centerX}
                cy={centerY}
                r={2}
                fill="hsl(var(--muted-foreground))"
                opacity={0.5}
              />
            </svg>
          </div>

          {/* Pattern Statistics */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-medium">Total Patterns: {data.length}</div>
              <div>Displayed: {patternItems.length}</div>
              <div>Categories: {categories.length}</div>
            </div>
            <div>
              <div className="font-medium">Avg Value: {(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(2)}</div>
              <div>Max Frequency: {Math.max(...data.map(d => d.frequency))}</div>
              <div>Layout: {layout}</div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Pattern Categories:</div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const categoryData = data.filter(d => d.category === category)
                const avgColor = categoryData.length > 0 
                  ? categoryData[0].color 
                  : 'hsl(var(--muted-foreground))'
                
                return (
                  <Badge
                    key={category}
                    variant="outline"
                    className="text-xs"
                    style={{ backgroundColor: avgColor, color: 'white' }}
                  >
                    {category} ({categoryData.length})
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Pattern Sequences */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Pattern Sequences:</div>
            <div className="flex flex-wrap gap-1">
              {data.slice(0, 10).map((item, index) => (
                <div
                  key={item.id}
                  className="w-3 h-2 rounded-sm"
                  style={{ backgroundColor: item.color }}
                  title={`${item.label}: ${item.value}`}
                />
              ))}
              {data.length > 10 && (
                <div className="text-xs text-muted-foreground">
                  +{data.length - 10} more...
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Metadata for component library
WordCloudChart.metadata = {
  name: "WordCloudChart",
  label: "Word Cloud Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Pattern visualization using color rectangles and sequences",
  phase: "Core",
  category: "Data Visualization",
  tags: ["dataviz", "patterns", "cloud", "rectangles", "sequences"]
}
