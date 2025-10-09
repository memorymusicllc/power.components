/**
 * Quadrant Leader Chart
 * Displays data in a 2x2 matrix with quadrants for strategic analysis
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/redux-ui'
import { Badge } from '@/components/redux-ui'

interface QuadrantData {
  id: string
  name: string
  x: number
  y: number
  size?: number
  color?: string
  category?: string
}

interface QuadrantLeaderChartProps {
  data: QuadrantData[]
  title?: string
  xAxisLabel?: string
  yAxisLabel?: string
  quadrants?: {
    topRight: string
    topLeft: string
    bottomRight: string
    bottomLeft: string
  }
  className?: string
}

export function QuadrantLeaderChart({
  data,
  title = "Strategic Analysis",
  xAxisLabel = "Performance",
  yAxisLabel = "Potential",
  quadrants = {
    topRight: "Stars",
    topLeft: "Question Marks", 
    bottomRight: "Cash Cows",
    bottomLeft: "Dogs"
  },
  className = ""
}: QuadrantLeaderChartProps) {
  // Fallback data if none provided
  const chartData = data && data.length > 0 ? data : [
    { id: '1', name: 'Product A', x: 10, y: 20, size: 5, color: '#3b82f6', category: 'High Value' },
    { id: '2', name: 'Product B', x: 30, y: 15, size: 3, color: '#10b981', category: 'High Volume' },
    { id: '3', name: 'Product C', x: 5, y: 5, size: 2, color: '#f59e0b', category: 'Low Value' },
    { id: '4', name: 'Product D', x: 25, y: 25, size: 4, color: '#ef4444', category: 'High Value' }
  ];
  // Calculate chart dimensions
  const width = 400
  const height = 300
  const margin = 40
  const chartWidth = width - margin * 2
  const chartHeight = height - margin * 2

  // Find data bounds
  const xValues = chartData.map(d => d.x)
  const yValues = chartData.map(d => d.y)
  const xMin = Math.min(...xValues)
  const xMax = Math.max(...xValues)
  const yMin = Math.min(...yValues)
  const yMax = Math.max(...yValues)

  // Scale functions
  const scaleX = (value: number) => margin + ((value - xMin) / (xMax - xMin)) * chartWidth
  const scaleY = (value: number) => margin + chartHeight - ((value - yMin) / (yMax - yMin)) * chartHeight

  // Calculate quadrant lines
  const xMid = margin + chartWidth / 2
  const yMid = margin + chartHeight / 2

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          {title}
        </CardTitle>
        <CardDescription>
          Strategic positioning analysis with quadrant classification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart */}
          <div className="relative" style={{ width, height }}>
            <svg width={width} height={height} className="border rounded">
              {/* Background */}
              <rect width={width} height={height} fill="hsl(var(--background))" />
              
              {/* Quadrant lines */}
              <line
                x1={xMid}
                y1={margin}
                x2={xMid}
                y2={margin + chartHeight}
                stroke="hsl(var(--border))"
                strokeWidth={2}
                strokeDasharray="5,5"
              />
              <line
                x1={margin}
                y1={yMid}
                x2={margin + chartWidth}
                y2={yMid}
                stroke="hsl(var(--border))"
                strokeWidth={2}
                strokeDasharray="5,5"
              />

              {/* Quadrant labels */}
              <text
                x={margin + chartWidth * 0.75}
                y={margin + 20}
                textAnchor="middle"
                className="text-xs font-medium fill-foreground"
              >
                {quadrants.topRight}
              </text>
              <text
                x={margin + chartWidth * 0.25}
                y={margin + 20}
                textAnchor="middle"
                className="text-xs font-medium fill-foreground"
              >
                {quadrants.topLeft}
              </text>
              <text
                x={margin + chartWidth * 0.75}
                y={margin + chartHeight - 10}
                textAnchor="middle"
                className="text-xs font-medium fill-foreground"
              >
                {quadrants.bottomRight}
              </text>
              <text
                x={margin + chartWidth * 0.25}
                y={margin + chartHeight - 10}
                textAnchor="middle"
                className="text-xs font-medium fill-foreground"
              >
                {quadrants.bottomLeft}
              </text>

              {/* Data points */}
              {chartData.map((point, index) => {
                const x = scaleX(point.x)
                const y = scaleY(point.y)
                const radius = point.size ? Math.max(4, point.size * 2) : 6
                
                return (
                  <g key={point.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={point.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                      className="drop-shadow-sm"
                    />
                    <text
                      x={x}
                      y={y - radius - 8}
                      textAnchor="middle"
                      className="text-xs font-medium fill-foreground"
                    >
                      {point.name}
                    </text>
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
                className="text-xs fill-muted-foreground"
              >
                {xAxisLabel}
              </text>
              <text
                x={10}
                y={margin + chartHeight / 2}
                textAnchor="middle"
                transform={`rotate(-90, 10, ${margin + chartHeight / 2})`}
                className="text-xs fill-muted-foreground"
              >
                {yAxisLabel}
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-2">
            {chartData.map((point, index) => (
              <Badge
                key={point.id}
                variant="outline"
                className="text-xs"
                style={{ 
                  backgroundColor: point.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
                  color: 'white'
                }}
              >
                {point.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Metadata for component library
QuadrantLeaderChart.metadata = {
  name: "QuadrantLeaderChart",
  label: "Quadrant Leader Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Strategic analysis using 2x2 matrix with quadrant classification",
  phase: "Core",
  category: "Data Visualization",
  tags: ["dataviz", "strategy", "matrix", "quadrant", "analysis"]
}
