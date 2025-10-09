/**
 * Heatmap Chart
 * Displays correlation matrix and heatmap visualization
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/redux-ui'
import { Badge } from '@/components/redux-ui'
import { Button } from '@/components/redux-ui'
import { Thermometer, Minus, Plus } from 'lucide-react'

interface HeatmapData {
  x: string
  y: string
  value: number
  label?: string
}

interface HeatmapChartProps {
  data: HeatmapData[]
  title?: string
  showValues?: boolean
  showLabels?: boolean
  colorScheme?: 'blue' | 'red' | 'green' | 'purple' | 'orange'
  className?: string
}

export function HeatmapChart({
  data,
  title = "Heatmap Analysis",
  showValues = true,
  showLabels = true,
  colorScheme = 'blue',
  className = ""
}: HeatmapChartProps) {
  const [selectedCell, setSelectedCell] = useState<HeatmapData | null>(null)
  const [showGrid, setShowGrid] = useState(true)

  // Get unique x and y labels
  const xLabels = Array.from(new Set(data.map(d => d.x))).sort()
  const yLabels = Array.from(new Set(data.map(d => d.y))).sort()

  // Chart dimensions
  const cellSize = 40
  const margin = 60
  const width = xLabels.length * cellSize + margin * 2
  const height = yLabels.length * cellSize + margin * 2

  // Calculate value range
  const values = data.map(d => d.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const valueRange = maxValue - minValue

  // Color scheme functions
  const getColor = (value: number) => {
    const normalizedValue = valueRange === 0 ? 0.5 : (value - minValue) / valueRange
    
    switch (colorScheme) {
      case 'blue':
        return `hsl(${240 - normalizedValue * 120}, 70%, ${50 + normalizedValue * 30}%)`
      case 'red':
        return `hsl(${0 + normalizedValue * 60}, 70%, ${50 + normalizedValue * 30}%)`
      case 'green':
        return `hsl(${120 - normalizedValue * 60}, 70%, ${50 + normalizedValue * 30}%)`
      case 'purple':
        return `hsl(${270 - normalizedValue * 120}, 70%, ${50 + normalizedValue * 30}%)`
      case 'orange':
        return `hsl(${30 + normalizedValue * 60}, 70%, ${50 + normalizedValue * 30}%)`
      default:
        return `hsl(${240 - normalizedValue * 120}, 70%, ${50 + normalizedValue * 30}%)`
    }
  }

  // Get cell data
  const getCellData = (x: string, y: string) => {
    return data.find(d => d.x === x && d.y === y)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          {title}
        </CardTitle>
        <CardDescription>
          Correlation matrix and heatmap visualization with interactive cells
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={showGrid ? "default" : "outline"}
              onClick={() => setShowGrid(!showGrid)}
            >
              <Thermometer className="w-4 h-4 mr-1" />
              {showGrid ? 'Hide' : 'Show'} Grid
            </Button>
            <div className="text-xs text-muted-foreground ml-2">
              Range: {minValue.toFixed(2)} - {maxValue.toFixed(2)}
            </div>
          </div>

          {/* Heatmap */}
          <div className="relative overflow-auto">
            <svg width={width} height={height} className="border rounded">
              {/* Background */}
              <rect width={width} height={height} fill="hsl(var(--background))" />

              {/* Grid lines */}
              {showGrid && (
                <>
                  {xLabels.map((_, index) => (
                    <line
                      key={`v-${index}`}
                      x1={margin + index * cellSize}
                      y1={margin}
                      x2={margin + index * cellSize}
                      y2={margin + yLabels.length * cellSize}
                      stroke="hsl(var(--border))"
                      strokeWidth={1}
                      opacity={0.3}
                    />
                  ))}
                  {yLabels.map((_, index) => (
                    <line
                      key={`h-${index}`}
                      x1={margin}
                      y1={margin + index * cellSize}
                      x2={margin + xLabels.length * cellSize}
                      y2={margin + index * cellSize}
                      stroke="hsl(var(--border))"
                      strokeWidth={1}
                      opacity={0.3}
                    />
                  ))}
                </>
              )}

              {/* Heatmap cells */}
              {xLabels.map((xLabel, xIndex) =>
                yLabels.map((yLabel, yIndex) => {
                  const cellData = getCellData(xLabel, yLabel)
                  if (!cellData) return null

                  const x = margin + xIndex * cellSize
                  const y = margin + yIndex * cellSize
                  const isSelected = selectedCell?.x === xLabel && selectedCell?.y === yLabel

                  return (
                    <g key={`${xLabel}-${yLabel}`}>
                      <rect
                        x={x}
                        y={y}
                        width={cellSize}
                        height={cellSize}
                        fill={getColor(cellData.value)}
                        stroke={isSelected ? "hsl(var(--primary))" : "hsl(var(--background))"}
                        strokeWidth={isSelected ? 3 : 1}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCell(isSelected ? null : cellData)}
                      />
                      {showValues && (
                        <text
                          x={x + cellSize / 2}
                          y={y + cellSize / 2 + 4}
                          textAnchor="middle"
                          className="text-xs font-medium fill-foreground"
                          style={{ 
                            fill: cellData.value > (minValue + maxValue) / 2 ? 'white' : 'black'
                          }}
                        >
                          {cellData.value.toFixed(2)}
                        </text>
                      )}
                    </g>
                  )
                })
              )}

              {/* X-axis labels */}
              {showLabels && xLabels.map((label, index) => (
                <text
                  key={`x-${label}`}
                  x={margin + index * cellSize + cellSize / 2}
                  y={margin - 10}
                  textAnchor="middle"
                  className="text-xs fill-foreground"
                  transform={`rotate(-45, ${margin + index * cellSize + cellSize / 2}, ${margin - 10})`}
                >
                  {label}
                </text>
              ))}

              {/* Y-axis labels */}
              {showLabels && yLabels.map((label, index) => (
                <text
                  key={`y-${label}`}
                  x={margin - 10}
                  y={margin + index * cellSize + cellSize / 2 + 4}
                  textAnchor="end"
                  className="text-xs fill-foreground"
                >
                  {label}
                </text>
              ))}
            </svg>
          </div>

          {/* Selected cell info */}
          {selectedCell && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">
                {selectedCell.x} × {selectedCell.y}
              </div>
              <div className="text-xs text-muted-foreground">
                Value: {selectedCell.value.toFixed(3)}
                {selectedCell.label && ` | ${selectedCell.label}`}
              </div>
            </div>
          )}

          {/* Color legend */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Value Scale:</div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground">Low</div>
              <div className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => {
                  const value = minValue + (valueRange * i) / 9
                  return (
                    <div
                      key={i}
                      className="w-4 h-4 border rounded"
                      style={{ backgroundColor: getColor(value) }}
                      title={`${value.toFixed(2)}`}
                    />
                  )
                })}
              </div>
              <div className="text-xs text-muted-foreground">High</div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-medium">Matrix Size: {xLabels.length} × {yLabels.length}</div>
              <div>Total Cells: {data.length}</div>
              <div>Color Scheme: {colorScheme}</div>
            </div>
            <div>
              <div className="font-medium">Value Range: {valueRange.toFixed(3)}</div>
              <div>Min: {minValue.toFixed(3)}</div>
              <div>Max: {maxValue.toFixed(3)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Metadata for component library
HeatmapChart.metadata = {
  name: "HeatmapChart",
  label: "Heatmap Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Correlation matrix and heatmap visualization with interactive cells",
  phase: "Core",
  category: "Data Visualization",
  tags: ["dataviz", "heatmap", "correlation", "matrix", "interactive"]
}
