/**
 * Confusion Matrix Chart
 * Displays classification performance with confusion matrix
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Target, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

interface ConfusionMatrixData {
  actual: string
  predicted: string
  count: number
  percentage?: number
}

interface ConfusionMatrixChartProps {
  data: ConfusionMatrixData[]
  title?: string
  showPercentages?: boolean
  showMetrics?: boolean
  className?: string
}

export function ConfusionMatrixChart({
  data,
  title = "Confusion Matrix",
  showPercentages = true,
  showMetrics = true,
  className = ""
}: ConfusionMatrixChartProps) {
  const [selectedCell, setSelectedCell] = useState<ConfusionMatrixData | null>(null)

  // Get unique classes
  const classes = Array.from(new Set([
    ...data.map(d => d.actual),
    ...data.map(d => d.predicted)
  ])).sort()

  // Calculate total for percentages
  const total = data.reduce((sum, d) => sum + d.count, 0)
  const dataWithPercentages = data.map(d => ({
    ...d,
    percentage: (d.count / total) * 100
  }))

  // Calculate metrics
  const calculateMetrics = () => {
    const metrics: Record<string, any> = {}
    
    classes.forEach(actualClass => {
      const actualData = data.filter(d => d.actual === actualClass)
      const truePositives = actualData.find(d => d.predicted === actualClass)?.count || 0
      const falsePositives = data.filter(d => d.predicted === actualClass && d.actual !== actualClass)
        .reduce((sum, d) => sum + d.count, 0)
      const falseNegatives = actualData.filter(d => d.predicted !== actualClass)
        .reduce((sum, d) => sum + d.count, 0)
      const trueNegatives = total - truePositives - falsePositives - falseNegatives

      const precision = truePositives + falsePositives > 0 ? truePositives / (truePositives + falsePositives) : 0
      const recall = truePositives + falseNegatives > 0 ? truePositives / (truePositives + falseNegatives) : 0
      const f1Score = precision + recall > 0 ? 2 * (precision * recall) / (precision + recall) : 0
      const accuracy = (truePositives + trueNegatives) / total

      metrics[actualClass] = {
        precision: precision * 100,
        recall: recall * 100,
        f1Score: f1Score * 100,
        accuracy: accuracy * 100,
        truePositives,
        falsePositives,
        falseNegatives,
        trueNegatives
      }
    })

    return metrics
  }

  const metrics = calculateMetrics()

  // Chart dimensions
  const cellSize = 60
  const margin = 80
  const width = classes.length * cellSize + margin * 2
  const height = classes.length * cellSize + margin * 2

  // Get cell data
  const getCellData = (actual: string, predicted: string) => {
    return dataWithPercentages.find(d => d.actual === actual && d.predicted === predicted)
  }

  // Get cell color based on position
  const getCellColor = (actual: string, predicted: string, count: number) => {
    if (actual === predicted) {
      // Diagonal - correct predictions
      const maxCount = Math.max(...data.map(d => d.count))
      const intensity = count / maxCount
      return `hsl(120, ${50 + intensity * 30}%, ${70 - intensity * 20}%)`
    } else {
      // Off-diagonal - incorrect predictions
      const maxCount = Math.max(...data.map(d => d.count))
      const intensity = count / maxCount
      return `hsl(0, ${50 + intensity * 30}%, ${70 - intensity * 20}%)`
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
          {title}
        </CardTitle>
        <CardDescription>
          Classification performance matrix with precision, recall, and F1 scores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Confusion Matrix */}
          <div className="relative overflow-auto">
            <svg width={width} height={height} className="border rounded">
              {/* Background */}
              <rect width={width} height={height} fill="hsl(var(--background))" />

              {/* Grid lines */}
              {classes.map((_, index) => (
                <g key={index}>
                  <line
                    x1={margin}
                    y1={margin + index * cellSize}
                    x2={margin + classes.length * cellSize}
                    y2={margin + index * cellSize}
                    stroke="hsl(var(--border))"
                    strokeWidth={1}
                  />
                  <line
                    x1={margin + index * cellSize}
                    y1={margin}
                    x2={margin + index * cellSize}
                    y2={margin + classes.length * cellSize}
                    stroke="hsl(var(--border))"
                    strokeWidth={1}
                  />
                </g>
              ))}

              {/* Matrix cells */}
              {classes.map((actualClass, actualIndex) =>
                classes.map((predictedClass, predictedIndex) => {
                  const cellData = getCellData(actualClass, predictedClass)
                  if (!cellData) return null

                  const x = margin + predictedIndex * cellSize
                  const y = margin + actualIndex * cellSize
                  const isSelected = selectedCell?.actual === actualClass && selectedCell?.predicted === predictedClass
                  const isDiagonal = actualClass === predictedClass

                  return (
                    <g key={`${actualClass}-${predictedClass}`}>
                      <rect
                        x={x}
                        y={y}
                        width={cellSize}
                        height={cellSize}
                        fill={getCellColor(actualClass, predictedClass, cellData.count)}
                        stroke={isSelected ? "hsl(var(--primary))" : "hsl(var(--background))"}
                        strokeWidth={isSelected ? 3 : 2}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCell(isSelected ? null : cellData)}
                      />
                      <text
                        x={x + cellSize / 2}
                        y={y + cellSize / 2 - 8}
                        textAnchor="middle"
                        className="text-sm font-bold fill-foreground"
                      >
                        {cellData.count}
                      </text>
                      {showPercentages && (
                        <text
                          x={x + cellSize / 2}
                          y={y + cellSize / 2 + 8}
                          textAnchor="middle"
                          className="text-xs fill-muted-foreground"
                        >
                          {cellData.percentage.toFixed(1)}%
                        </text>
                      )}
                      {isDiagonal && (
                        <CheckCircle className="absolute w-4 h-4 text-green-600" style={{ left: x + cellSize - 20, top: y + 5 }} />
                      )}
                    </g>
                  )
                })
              )}

              {/* Axis labels */}
              <text
                x={margin + classes.length * cellSize / 2}
                y={margin - 20}
                textAnchor="middle"
                className="text-sm font-medium fill-foreground"
              >
                Predicted
              </text>
              <text
                x={margin - 20}
                y={margin + classes.length * cellSize / 2}
                textAnchor="middle"
                transform={`rotate(-90, ${margin - 20}, ${margin + classes.length * cellSize / 2})`}
                className="text-sm font-medium fill-foreground"
              >
                Actual
              </text>

              {/* Class labels */}
              {classes.map((className, index) => (
                <g key={className}>
                  <text
                    x={margin + index * cellSize + cellSize / 2}
                    y={margin - 5}
                    textAnchor="middle"
                    className="text-xs fill-foreground"
                  >
                    {className}
                  </text>
                  <text
                    x={margin - 5}
                    y={margin + index * cellSize + cellSize / 2 + 4}
                    textAnchor="end"
                    className="text-xs fill-foreground"
                  >
                    {className}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Selected cell info */}
          {selectedCell && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">
                Actual: {selectedCell.actual} → Predicted: {selectedCell.predicted}
              </div>
              <div className="text-xs text-muted-foreground">
                Count: {selectedCell.count} ({selectedCell.percentage?.toFixed(1)}%)
              </div>
            </div>
          )}

          {/* Metrics */}
          {showMetrics && (
            <div className="space-y-3">
              <div className="text-sm font-medium">Performance Metrics:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(metrics).map(([className, metric]) => (
                  <div key={className} className="p-3 border rounded-lg">
                    <div className="text-sm font-medium mb-2">{className}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Precision: {metric.precision.toFixed(1)}%</div>
                      <div>Recall: {metric.recall.toFixed(1)}%</div>
                      <div>F1-Score: {metric.f1Score.toFixed(1)}%</div>
                      <div>Accuracy: {metric.accuracy.toFixed(1)}%</div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      TP: {metric.truePositives} | FP: {metric.falsePositives} | FN: {metric.falseNegatives}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Correct Predictions</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Incorrect Predictions</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Metadata for component library
ConfusionMatrixChart.metadata = {
  name: "ConfusionMatrixChart",
  label: "Confusion Matrix Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Classification performance matrix with precision, recall, and F1 scores",
  phase: "Core",
  category: "Data Visualization",
  tags: ["dataviz", "confusion", "matrix", "classification", "metrics"]
}
