/**
 * Network Graph Chart
 * Displays nodes and edges in a network visualization
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefreshCw, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface Node {
  id: string
  label: string
  x: number
  y: number
  size: number
  color: string
  type?: string
  group?: string
}

interface Edge {
  id: string
  source: string
  target: string
  weight: number
  type?: string
  color?: string
}

interface NetworkGraphChartProps {
  nodes: Node[]
  edges: Edge[]
  title?: string
  className?: string
}

export function NetworkGraphChart({
  nodes,
  edges,
  title = "Network Analysis",
  className = ""
}: NetworkGraphChartProps) {
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Chart dimensions
  const width = 500
  const height = 400
  const centerX = width / 2
  const centerY = height / 2

  // Scale nodes and edges
  const scaledNodes = nodes.map(node => ({
    ...node,
    x: centerX + (node.x * zoom) + offset.x,
    y: centerY + (node.y * zoom) + offset.y,
    size: Math.max(8, node.size * zoom)
  }))

  const scaledEdges = edges.map(edge => {
    const sourceNode = scaledNodes.find(n => n.id === edge.source)
    const targetNode = scaledNodes.find(n => n.id === edge.target)
    return {
      ...edge,
      sourceNode,
      targetNode
    }
  }).filter(edge => edge.sourceNode && edge.targetNode)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3))
  const handleReset = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          {title}
        </CardTitle>
        <CardDescription>
          Interactive network visualization with nodes and connections
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

          {/* Network Graph */}
          <div className="relative overflow-hidden border rounded-lg">
            <svg
              width={width}
              height={height}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="cursor-grab active:cursor-grabbing"
              style={{ background: 'hsl(var(--background))' }}
            >
              {/* Edges */}
              {scaledEdges.map(edge => (
                <line
                  key={edge.id}
                  x1={edge.sourceNode!.x}
                  y1={edge.sourceNode!.y}
                  x2={edge.targetNode!.x}
                  y2={edge.targetNode!.y}
                  stroke={edge.color || 'hsl(var(--muted-foreground))'}
                  strokeWidth={Math.max(1, edge.weight * zoom)}
                  opacity={0.6}
                />
              ))}

              {/* Nodes */}
              {scaledNodes.map(node => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill={node.color}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                    className="drop-shadow-sm cursor-pointer hover:opacity-80"
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className="text-xs font-medium fill-foreground pointer-events-none"
                    style={{ fontSize: Math.max(10, 12 * zoom) }}
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Node Types:</div>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(nodes.map(n => n.type || 'default'))).map(type => (
                <Badge key={type} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>
            <div className="text-sm font-medium">Network Stats:</div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>Nodes: {nodes.length}</div>
              <div>Edges: {edges.length}</div>
              <div>Density: {((edges.length * 2) / (nodes.length * (nodes.length - 1)) * 100).toFixed(1)}%</div>
              <div>Components: {new Set(edges.map(e => e.source)).size}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Metadata for component library
NetworkGraphChart.metadata = {
  name: "NetworkGraphChart",
  label: "Network Graph Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Interactive network visualization with nodes and connections",
  phase: "Core",
  category: "Data Visualization",
  tags: ["dataviz", "network", "graph", "nodes", "edges", "interactive"]
}
