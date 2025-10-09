/**
 * Bloom Graph Chart
 * Displays hierarchical data in a bloom/flower-like visualization
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RotateCcw, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react'

interface BloomNode {
  id: string
  label: string
  value: number
  color: string
  children?: BloomNode[]
  level: number
  angle?: number
  radius?: number
  x?: number
  y?: number
}

interface BloomGraphChartProps {
  data: BloomNode[]
  title?: string
  className?: string
}

export function BloomGraphChart({
  data,
  title = "Bloom Graph Analysis",
  className = ""
}: BloomGraphChartProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [selectedNode, setSelectedNode] = useState<BloomNode | null>(null)

  // Chart dimensions
  const width = 500
  const height = 500
  const centerX = width / 2
  const centerY = height / 2
  const maxRadius = 180

  // Calculate node positions
  const calculateNodePositions = (nodes: BloomNode[], level: number = 0): BloomNode[] => {
    if (level === 0) {
      // Center node
      return [{
        ...nodes[0],
        x: centerX,
        y: centerY,
        radius: 20 * zoom,
        angle: 0
      }]
    }

    const parentNode = nodes[0]
    const children = nodes.slice(1)
    const angleStep = (2 * Math.PI) / children.length

    return children.map((child, index) => {
      const angle = (index * angleStep) + (rotation * Math.PI / 180)
      const radius = (level * 80 + 40) * zoom
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      return {
        ...child,
        x,
        y,
        radius: Math.max(8, child.value * 2 * zoom),
        angle: angle * 180 / Math.PI
      }
    })
  }

  const positionedNodes = calculateNodePositions(data)

  // Calculate connections
  const connections = data.slice(1).map((child, index) => {
    const parent = data[0]
    const childNode = positionedNodes[index + 1]
    return {
      x1: centerX,
      y1: centerY,
      x2: childNode.x,
      y2: childNode.y,
      weight: child.value,
      color: child.color
    }
  })

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5))
  const handleRotate = () => setRotation(prev => (prev + 30) % 360)
  const handleReset = () => {
    setZoom(1)
    setRotation(0)
    setSelectedNode(null)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          {title}
        </CardTitle>
        <CardDescription>
          Hierarchical bloom visualization with interactive controls
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
            <Button size="sm" variant="outline" onClick={handleRotate}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <div className="text-xs text-muted-foreground ml-2">
              Zoom: {Math.round(zoom * 100)}% | Rot: {rotation}°
            </div>
          </div>

          {/* Bloom Graph */}
          <div className="relative overflow-hidden border rounded-lg">
            <svg
              width={width}
              height={height}
              style={{ background: 'hsl(var(--background))' }}
            >
              {/* Connections */}
              {connections.map((conn, index) => (
                <line
                  key={index}
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  stroke={conn.color}
                  strokeWidth={Math.max(1, conn.weight / 10)}
                  opacity={0.6}
                />
              ))}

              {/* Nodes */}
              {positionedNodes.map((node, index) => {
                const isSelected = selectedNode?.id === node.id
                const isCenter = index === 0

                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius}
                      fill={node.color}
                      stroke={isSelected ? "hsl(var(--primary))" : "hsl(var(--background))"}
                      strokeWidth={isSelected ? 3 : 2}
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => setSelectedNode(isSelected ? null : node)}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      className="text-xs font-medium fill-foreground pointer-events-none"
                      style={{ 
                        fontSize: isCenter ? Math.max(10, 12 * zoom) : Math.max(8, 10 * zoom),
                        fontWeight: isCenter ? 'bold' : 'normal'
                      }}
                    >
                      {node.label}
                    </text>
                  </g>
                )
              })}

              {/* Center ring */}
              <circle
                cx={centerX}
                cy={centerY}
                r={25 * zoom}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth={2}
                strokeDasharray="5,5"
                opacity={0.5}
              />
            </svg>
          </div>

          {/* Selected node info */}
          {selectedNode && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">{selectedNode.label}</div>
              <div className="text-xs text-muted-foreground">
                Value: {selectedNode.value} | Level: {selectedNode.level}
                {selectedNode.angle && ` | Angle: ${selectedNode.angle.toFixed(1)}°`}
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-medium">Total Nodes: {data.length}</div>
              <div>Center Value: {data[0]?.value || 0}</div>
              <div>Max Value: {Math.max(...data.map(d => d.value))}</div>
            </div>
            <div>
              <div className="font-medium">Levels: {Math.max(...data.map(d => d.level)) + 1}</div>
              <div>Total Value: {data.reduce((sum, d) => sum + d.value, 0)}</div>
              <div>Avg Value: {(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1)}</div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Node Categories:</div>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(data.map(d => d.label))).map(label => {
                const node = data.find(d => d.label === label)
                return (
                  <Badge
                    key={label}
                    variant="outline"
                    className="text-xs"
                    style={{ backgroundColor: node?.color, color: 'white' }}
                  >
                    {label}
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
BloomGraphChart.metadata = {
  name: "BloomGraphChart",
  label: "Bloom Graph Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Hierarchical bloom visualization with interactive controls",
  phase: "Core",
  category: "Data Visualization",
  tags: ["dataviz", "bloom", "hierarchical", "interactive", "radial"]
}
