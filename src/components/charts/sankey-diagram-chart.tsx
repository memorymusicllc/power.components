/**
 * Sankey Diagram Chart
 * Displays flow and relationships between nodes
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/redux-ui'
import { Badge } from '@/components/redux-ui'
import { Button } from '@/components/redux-ui'
import { ArrowRight, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'

interface SankeyNode {
  id: string
  name: string
  value: number
  level: number
  color?: string
}

interface SankeyLink {
  source: string
  target: string
  value: number
  color?: string
}

interface SankeyDiagramChartProps {
  nodes: SankeyNode[]
  links: SankeyLink[]
  title?: string
  showValues?: boolean
  showPercentages?: boolean
  className?: string
}

export function SankeyDiagramChart({
  nodes,
  links,
  title = "Sankey Flow Diagram",
  showValues = true,
  showPercentages = true,
  className = ""
}: SankeyDiagramChartProps) {
  // Fallback data if none provided
  const chartNodes = nodes && nodes.length > 0 ? nodes : [
    { id: 'A', name: 'Source A', value: 100, level: 0, color: '#3b82f6' },
    { id: 'B', name: 'Source B', value: 80, level: 0, color: '#10b981' },
    { id: 'C', name: 'Intermediate', value: 120, level: 1, color: '#f59e0b' },
    { id: 'D', name: 'Target 1', value: 90, level: 2, color: '#ef4444' },
    { id: 'E', name: 'Target 2', value: 90, level: 2, color: '#8b5cf6' }
  ];
  
  const chartLinks = links && links.length > 0 ? links : [
    { source: 'A', target: 'C', value: 60, color: '#3b82f6' },
    { source: 'B', target: 'C', value: 40, color: '#10b981' },
    { source: 'C', target: 'D', value: 70, color: '#f59e0b' },
    { source: 'C', target: 'E', value: 50, color: '#f59e0b' }
  ];
  
  const [selectedNode, setSelectedNode] = useState<SankeyNode | null>(null)
  const [zoom, setZoom] = useState(1)

  // Chart dimensions
  const width = 600
  const height = 400
  const margin = 40
  const nodeWidth = 20
  const levelSpacing = 120

  // Get levels
  const levels = Array.from(new Set(chartNodes.map(n => n.level))).sort()
  const maxLevel = Math.max(...levels)

  // Calculate node positions
  const calculateNodePositions = () => {
    const positions: Record<string, { x: number; y: number; width: number; height: number }> = {}
    
    levels.forEach(level => {
      const levelNodes = chartNodes.filter(n => n.level === level)
      const totalValue = levelNodes.reduce((sum, n) => sum + n.value, 0)
      
      let currentY = margin
      levelNodes.forEach(node => {
        const nodeHeight = (node.value / totalValue) * (height - margin * 2)
        positions[node.id] = {
          x: margin + level * levelSpacing,
          y: currentY,
          width: nodeWidth,
          height: Math.max(nodeHeight, 20)
        }
        currentY += nodeHeight + 2
      })
    })

    return positions
  }

  const nodePositions = calculateNodePositions()

  // Calculate link paths
  const calculateLinkPaths = () => {
    return chartLinks.map(link => {
      const sourceNode = chartNodes.find(n => n.id === link.source)
      const targetNode = chartNodes.find(n => n.id === link.target)
      if (!sourceNode || !targetNode) return null

      const sourcePos = nodePositions[link.source]
      const targetPos = nodePositions[link.target]
      if (!sourcePos || !targetPos) return null

      const sourceX = sourcePos.x + sourcePos.width
      const sourceY = sourcePos.y + sourcePos.height / 2
      const targetX = targetPos.x
      const targetY = targetPos.y + targetPos.height / 2

      // Create curved path
      const controlPoint1X = sourceX + (targetX - sourceX) * 0.5
      const controlPoint1Y = sourceY
      const controlPoint2X = sourceX + (targetX - sourceX) * 0.5
      const controlPoint2Y = targetY

      const pathData = `M ${sourceX} ${sourceY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${targetX} ${targetY}`

      return {
        ...link,
        pathData,
        sourceX,
        sourceY,
        targetX,
        targetY,
        width: Math.max(2, link.value / 10)
      }
    }).filter(Boolean)
  }

  const linkPaths = calculateLinkPaths()

  // Calculate total flow
  const totalFlow = chartLinks.reduce((sum, link) => sum + link.value, 0)

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5))
  const handleReset = () => setZoom(1)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
          {title}
        </CardTitle>
        <CardDescription>
          Flow diagram showing relationships and data movement between nodes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <div className="text-xs text-muted-foreground ml-2">
              Zoom: {Math.round(zoom * 100)}%
            </div>
          </div>

          {/* Sankey Diagram */}
          <div className="relative overflow-auto">
            <svg 
              width={width * zoom} 
              height={height * zoom} 
              className="border rounded"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
            >
              {/* Background */}
              <rect width={width} height={height} fill="hsl(var(--background))" />

              {/* Links */}
              {linkPaths.map((link, index) => link && (
                <g key={index}>
                  <path
                    d={link.pathData}
                    fill="none"
                    stroke={link.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`}
                    strokeWidth={link.width}
                    opacity={0.6}
                    className="hover:opacity-100 transition-opacity"
                  />
                  {/* Link value label */}
                  {showValues && (
                    <text
                      x={(link.sourceX + link.targetX) / 2}
                      y={(link.sourceY + link.targetY) / 2}
                      textAnchor="middle"
                      className="text-xs font-medium fill-foreground"
                    >
                      {link.value}
                    </text>
                  )}
                </g>
              ))}

              {/* Nodes */}
              {chartNodes.map(node => {
                const pos = nodePositions[node.id]
                if (!pos) return null

                const isSelected = selectedNode?.id === node.id
                const scaledPos = {
                  x: pos.x * zoom,
                  y: pos.y * zoom,
                  width: pos.width * zoom,
                  height: pos.height * zoom
                }

                return (
                  <g key={node.id}>
                    <rect
                      x={scaledPos.x}
                      y={scaledPos.y}
                      width={scaledPos.width}
                      height={scaledPos.height}
                      fill={node.color || `hsl(${(node.level * 60) % 360}, 70%, 50%)`}
                      stroke={isSelected ? "hsl(var(--primary))" : "hsl(var(--background))"}
                      strokeWidth={isSelected ? 3 : 2}
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => setSelectedNode(isSelected ? null : node)}
                    />
                    <text
                      x={scaledPos.x + scaledPos.width + 5}
                      y={scaledPos.y + scaledPos.height / 2 + 4}
                      className="text-xs font-medium fill-foreground"
                    >
                      {node.name}
                    </text>
                    {showValues && (
                      <text
                        x={scaledPos.x + scaledPos.width + 5}
                        y={scaledPos.y + scaledPos.height / 2 + 16}
                        className="text-xs fill-muted-foreground"
                      >
                        {node.value}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Level labels */}
              {levels.map(level => (
                <text
                  key={level}
                  x={margin + level * levelSpacing + nodeWidth / 2}
                  y={margin - 10}
                  textAnchor="middle"
                  className="text-sm font-medium fill-foreground"
                >
                  Level {level}
                </text>
              ))}
            </svg>
          </div>

          {/* Selected node info */}
          {selectedNode && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">{selectedNode.name}</div>
              <div className="text-xs text-muted-foreground">
                Value: {selectedNode.value} | Level: {selectedNode.level}
                {showPercentages && (
                  <span> | {((selectedNode.value / totalFlow) * 100).toFixed(1)}% of total flow</span>
                )}
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-medium">Flow Statistics</div>
              <div>Total Nodes: {chartNodes.length}</div>
              <div>Total Links: {chartLinks.length}</div>
              <div>Total Flow: {totalFlow}</div>
            </div>
            <div>
              <div className="font-medium">Levels: {levels.length}</div>
              <div>Max Level: {maxLevel}</div>
              <div>Avg Flow: {(totalFlow / chartLinks.length).toFixed(1)}</div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Node Levels:</div>
            <div className="flex flex-wrap gap-2">
              {levels.map(level => {
                const levelNodes = chartNodes.filter(n => n.level === level)
                const levelColor = levelNodes[0]?.color || `hsl(${(level * 60) % 360}, 70%, 50%)`
                return (
                  <Badge
                    key={level}
                    variant="outline"
                    className="text-xs"
                    style={{ backgroundColor: levelColor, color: 'white' }}
                  >
                    Level {level} ({levelNodes.length})
                  </Badge>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Metadata for component library
SankeyDiagramChart.metadata = {
  name: "SankeyDiagramChart",
  label: "Sankey Diagram Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Flow diagram showing relationships and data movement between nodes",
  phase: "Core",
  category: "Data Visualization",
  tags: ["dataviz", "sankey", "flow", "diagram", "relationships"]
}
