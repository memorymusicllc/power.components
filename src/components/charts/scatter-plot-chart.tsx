/**
 * Scatter Plot Chart
 * Displays colored and annotated scatter plot with trend analysis
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/redux-ui'
import { Badge } from '@/components/redux-ui'
import { Button } from '@/components/redux-ui'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface ScatterPoint {
  id: string
  x: number
  y: number
  size?: number
  color?: string
  label?: string
  category?: string
  value?: number
}

interface ScatterPlotChartProps {
  data: ScatterPoint[]
  title?: string
  xAxisLabel?: string
  yAxisLabel?: string
  showTrend?: boolean
  showAnnotations?: boolean
  className?: string
}

export function ScatterPlotChart({
  data,
  title = "Scatter Plot Analysis",
  xAxisLabel = "X Value",
  yAxisLabel = "Y Value",
  showTrend = true,
  showAnnotations = true,
  className = ""
}: ScatterPlotChartProps) {
  // Fallback data if none provided
  const chartData = data && data.length > 0 ? data : [
    { id: '1', x: 10, y: 20, label: 'Point 1', color: '#3b82f6' },
    { id: '2', x: 30, y: 15, label: 'Point 2', color: '#10b981' },
    { id: '3', x: 5, y: 5, label: 'Point 3', color: '#f59e0b' },
    { id: '4', x: 25, y: 25, label: 'Point 4', color: '#ef4444' }
  ];
  
  const [selectedPoint, setSelectedPoint] = useState<ScatterPoint | null>(null)
  const [showTrendLine, setShowTrendLine] = useState(showTrend)

  // Chart dimensions
  const width = 500
  const height = 400
  const margin = 60
  const chartWidth = width - margin * 2
  const chartHeight = height - margin * 2

  // Calculate bounds
  const xValues = chartData.map(d => d.x)
  const yValues = chartData.map(d => d.y)
  const xMin = Math.min(...xValues)
  const xMax = Math.max(...xValues)
  const yMin = Math.min(...yValues)
  const yMax = Math.max(...yValues)

  // Add padding
  const xRange = xMax - xMin
  const yRange = yMax - yMin
  const xMinPadded = xMin - xRange * 0.1
  const xMaxPadded = xMax + xRange * 0.1
  const yMinPadded = yMin - yRange * 0.1
  const yMaxPadded = yMax + yRange * 0.1

  // Scale functions
  const scaleX = (value: number) => margin + ((value - xMinPadded) / (xMaxPadded - xMinPadded)) * chartWidth
  const scaleY = (value: number) => margin + chartHeight - ((value - yMinPadded) / (yMaxPadded - yMinPadded)) * chartHeight

  // Calculate trend line (simple linear regression)
  const calculateTrendLine = () => {
    if (chartData.length < 2) return null

    const n = chartData.length
    const sumX = chartData.reduce((sum, d) => sum + d.x, 0)
    const sumY = chartData.reduce((sum, d) => sum + d.y, 0)
    const sumXY = chartData.reduce((sum, d) => sum + d.x * d.y, 0)
    const sumXX = chartData.reduce((sum, d) => sum + d.x * d.x, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    return { slope, intercept }
  }

  const trendLine = calculateTrendLine()

  // Calculate correlation coefficient
  const calculateCorrelation = () => {
    if (chartData.length < 2) return 0

    const n = chartData.length
    const sumX = chartData.reduce((sum, d) => sum + d.x, 0)
    const sumY = chartData.reduce((sum, d) => sum + d.y, 0)
    const sumXY = chartData.reduce((sum, d) => sum + d.x * d.y, 0)
    const sumXX = chartData.reduce((sum, d) => sum + d.x * d.x, 0)
    const sumYY = chartData.reduce((sum, d) => sum + d.y * d.y, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY))

    return denominator === 0 ? 0 : numerator / denominator
  }

  const correlation = calculateCorrelation()

  // Get trend direction
  const getTrendDirection = () => {
    if (!trendLine) return 'neutral'
    if (trendLine.slope > 0.1) return 'up'
    if (trendLine.slope < -0.1) return 'down'
    return 'neutral'
  }

  const trendDirection = getTrendDirection()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          {title}
        </CardTitle>
        <CardDescription>
          Scatter plot with trend analysis and correlation insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={showTrendLine ? "default" : "outline"}
              onClick={() => setShowTrendLine(!showTrendLine)}
            >
              {showTrendLine ? "Hide" : "Show"} Trend
            </Button>
            <div className="flex items-center gap-2 text-xs">
              <span>Correlation:</span>
              <Badge variant={Math.abs(correlation) > 0.7 ? "default" : "outline"}>
                {correlation.toFixed(3)}
              </Badge>
              {trendDirection === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
              {trendDirection === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
              {trendDirection === 'neutral' && <Minus className="w-4 h-4 text-gray-500" />}
            </div>
          </div>

          {/* Chart */}
          <div className="relative">
            <svg width={width} height={height} className="border rounded">
              {/* Background */}
              <rect width={width} height={height} fill="hsl(var(--background))" />

              {/* Grid lines */}
              {[0.25, 0.5, 0.75].map(ratio => (
                <g key={ratio}>
                  <line
                    x1={margin}
                    y1={margin + ratio * chartHeight}
                    x2={margin + chartWidth}
                    y2={margin + ratio * chartHeight}
                    stroke="hsl(var(--border))"
                    strokeWidth={1}
                    opacity={0.3}
                  />
                  <line
                    x1={margin + ratio * chartWidth}
                    y1={margin}
                    x2={margin + ratio * chartWidth}
                    y2={margin + chartHeight}
                    stroke="hsl(var(--border))"
                    strokeWidth={1}
                    opacity={0.3}
                  />
                </g>
              ))}

              {/* Trend line */}
              {showTrendLine && trendLine && (
                <line
                  x1={scaleX(xMinPadded)}
                  y1={scaleY(trendLine.slope * xMinPadded + trendLine.intercept)}
                  x2={scaleX(xMaxPadded)}
                  y2={scaleY(trendLine.slope * xMaxPadded + trendLine.intercept)}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  strokeDasharray="5,5"
                />
              )}

              {/* Data points */}
              {chartData.map((point, index) => {
                const x = scaleX(point.x)
                const y = scaleY(point.y)
                const radius = point.size ? Math.max(4, point.size) : 6
                const isSelected = selectedPoint?.id === point.id

                return (
                  <g key={point.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={point.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`}
                      stroke={isSelected ? "hsl(var(--primary))" : "hsl(var(--background))"}
                      strokeWidth={isSelected ? 3 : 2}
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => setSelectedPoint(isSelected ? null : point)}
                    />
                    {showAnnotations && point.label && (
                      <text
                        x={x}
                        y={y - radius - 8}
                        textAnchor="middle"
                        className="text-xs font-medium fill-foreground"
                      >
                        {point.label}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Axes */}
              <line
                x1={margin}
                y1={margin}
                x2={margin}
                y2={margin + chartHeight}
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
              />
              <line
                x1={margin}
                y1={margin + chartHeight}
                x2={margin + chartWidth}
                y2={margin + chartHeight}
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
              />

              {/* Axis labels */}
              <text
                x={margin + chartWidth / 2}
                y={height - 10}
                textAnchor="middle"
                className="text-sm font-medium fill-foreground"
              >
                {xAxisLabel}
              </text>
              <text
                x={10}
                y={margin + chartHeight / 2}
                textAnchor="middle"
                transform={`rotate(-90, 10, ${margin + chartHeight / 2})`}
                className="text-sm font-medium fill-foreground"
              >
                {yAxisLabel}
              </text>
            </svg>
          </div>

          {/* Selected point info */}
          {selectedPoint && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">{selectedPoint.label || `Point ${selectedPoint.id}`}</div>
              <div className="text-xs text-muted-foreground">
                X: {selectedPoint.x.toFixed(2)}, Y: {selectedPoint.y.toFixed(2)}
                {selectedPoint.value && `, Value: ${selectedPoint.value}`}
                {selectedPoint.category && `, Category: ${selectedPoint.category}`}
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-medium">Data Points: {chartData.length}</div>
              <div>X Range: {xMin.toFixed(2)} - {xMax.toFixed(2)}</div>
              <div>Y Range: {yMin.toFixed(2)} - {yMax.toFixed(2)}</div>
            </div>
            <div>
              <div className="font-medium">Correlation: {correlation.toFixed(3)}</div>
              <div>Trend: {trendDirection}</div>
              {trendLine && (
                <div>Slope: {trendLine.slope.toFixed(3)}</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Metadata for component library
ScatterPlotChart.metadata = {
  name: "ScatterPlotChart",
  label: "Scatter Plot Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Scatter plot with trend analysis and correlation insights",
  phase: "Core",
  category: "Data Visualization",
  tags: ["dataviz", "scatter", "correlation", "trend", "analysis"]
}
