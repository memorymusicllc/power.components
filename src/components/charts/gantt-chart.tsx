/**
 * Gantt Chart
 * Displays project timeline with tasks, dependencies, and progress
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, CheckCircle, AlertCircle, Play } from 'lucide-react'

interface GanttTask {
  id: string
  name: string
  start: Date
  end: Date
  progress: number // 0-100
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed'
  dependencies?: string[]
  assignee?: string
  priority?: 'low' | 'medium' | 'high'
  color?: string
}

interface GanttChartProps {
  tasks: GanttTask[]
  title?: string
  showDependencies?: boolean
  showProgress?: boolean
  showAssignees?: boolean
  className?: string
}

export function GanttChart({
  tasks,
  title = "Gantt Chart",
  showDependencies = true,
  showProgress = true,
  showAssignees = true,
  className = ""
}: GanttChartProps) {
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(null)
  const [viewMode, setViewMode] = useState<'week' | 'month' | 'quarter'>('month')

  // Calculate date range
  const allDates = tasks.flatMap(task => [task.start, task.end])
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))

  // Chart dimensions
  const rowHeight = 40
  const headerHeight = 60
  const taskNameWidth = 200
  const chartWidth = 600
  const totalWidth = taskNameWidth + chartWidth
  const totalHeight = headerHeight + tasks.length * rowHeight

  // Calculate time scale
  const getTimeScale = () => {
    const timeRange = maxDate.getTime() - minDate.getTime()
    const scale = chartWidth / timeRange
    return (date: Date) => taskNameWidth + (date.getTime() - minDate.getTime()) * scale
  }

  const timeScale = getTimeScale()

  // Get task status styling
  const getTaskStyle = (task: GanttTask) => {
    const baseStyle = {
      backgroundColor: task.color || 'hsl(var(--primary))',
      borderColor: 'hsl(var(--background))',
      borderWidth: 2
    }

    switch (task.status) {
      case 'completed':
        return { ...baseStyle, backgroundColor: 'hsl(var(--success))' }
      case 'in-progress':
        return { ...baseStyle, backgroundColor: 'hsl(var(--warning))' }
      case 'delayed':
        return { ...baseStyle, backgroundColor: 'hsl(var(--destructive))' }
      default:
        return { ...baseStyle, backgroundColor: 'hsl(var(--muted))' }
    }
  }

  // Generate time markers
  const generateTimeMarkers = () => {
    const markers = []
    const current = new Date(minDate)
    
    while (current <= maxDate) {
      const x = timeScale(current)
      const isWeekend = current.getDay() === 0 || current.getDay() === 6
      
      markers.push({
        x,
        date: new Date(current),
        isWeekend,
        isMonthStart: current.getDate() === 1
      })
      
      // Increment based on view mode
      switch (viewMode) {
        case 'week':
          current.setDate(current.getDate() + 1)
          break
        case 'month':
          current.setDate(current.getDate() + 7)
          break
        case 'quarter':
          current.setMonth(current.getMonth() + 1)
          break
      }
    }
    
    return markers
  }

  const timeMarkers = generateTimeMarkers()

  // Calculate dependencies
  const calculateDependencies = () => {
    const dependencies: Array<{
      from: { x: number; y: number }
      to: { x: number; y: number }
      task: GanttTask
    }> = []

    tasks.forEach((task, taskIndex) => {
      if (!task.dependencies) return

      task.dependencies.forEach(depId => {
        const depTask = tasks.find(t => t.id === depId)
        if (!depTask) return

        const depIndex = tasks.findIndex(t => t.id === depId)
        const fromX = timeScale(depTask.end)
        const fromY = headerHeight + depIndex * rowHeight + rowHeight / 2
        const toX = timeScale(task.start)
        const toY = headerHeight + taskIndex * rowHeight + rowHeight / 2

        dependencies.push({
          from: { x: fromX, y: fromY },
          to: { x: toX, y: toY },
          task
        })
      })
    })

    return dependencies
  }

  const dependencies = showDependencies ? calculateDependencies() : []

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          {title}
        </CardTitle>
        <CardDescription>
          Project timeline with tasks, dependencies, and progress tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={viewMode === 'week' ? 'default' : 'outline'}
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'month' ? 'default' : 'outline'}
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'quarter' ? 'default' : 'outline'}
              onClick={() => setViewMode('quarter')}
            >
              Quarter
            </Button>
            <div className="text-xs text-muted-foreground ml-2">
              {tasks.length} tasks | {minDate.toLocaleDateString()} - {maxDate.toLocaleDateString()}
            </div>
          </div>

          {/* Gantt Chart */}
          <div className="relative overflow-auto">
            <svg width={totalWidth} height={totalHeight} className="border rounded">
              {/* Background */}
              <rect width={totalWidth} height={totalHeight} fill="hsl(var(--background))" />

              {/* Time markers */}
              {timeMarkers.map((marker, index) => (
                <g key={index}>
                  <line
                    x1={marker.x}
                    y1={headerHeight}
                    x2={marker.x}
                    y2={totalHeight}
                    stroke={marker.isWeekend ? "hsl(var(--muted))" : "hsl(var(--border))"}
                    strokeWidth={marker.isWeekend ? 2 : 1}
                    opacity={marker.isWeekend ? 0.5 : 0.3}
                  />
                  {marker.isMonthStart && (
                    <text
                      x={marker.x}
                      y={headerHeight - 10}
                      textAnchor="middle"
                      className="text-xs font-medium fill-foreground"
                    >
                      {marker.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </text>
                  )}
                </g>
              ))}

              {/* Dependencies */}
              {dependencies.map((dep, index) => (
                <g key={index}>
                  <line
                    x1={dep.from.x}
                    y1={dep.from.y}
                    x2={dep.to.x}
                    y2={dep.to.y}
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead)"
                  />
                  <circle
                    cx={dep.from.x}
                    cy={dep.from.y}
                    r={3}
                    fill="hsl(var(--muted-foreground))"
                  />
                </g>
              ))}

              {/* Arrow marker definition */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="hsl(var(--muted-foreground))"
                  />
                </marker>
              </defs>

              {/* Tasks */}
              {tasks.map((task, index) => {
                const startX = timeScale(task.start)
                const endX = timeScale(task.end)
                const taskWidth = endX - startX
                const y = headerHeight + index * rowHeight + 10
                const taskHeight = rowHeight - 20
                const isSelected = selectedTask?.id === task.id
                const style = getTaskStyle(task)

                return (
                  <g key={task.id}>
                    {/* Task bar */}
                    <rect
                      x={startX}
                      y={y}
                      width={taskWidth}
                      height={taskHeight}
                      fill={style.backgroundColor}
                      stroke={isSelected ? "hsl(var(--primary))" : style.borderColor}
                      strokeWidth={isSelected ? 3 : style.borderWidth}
                      rx={4}
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => setSelectedTask(isSelected ? null : task)}
                    />

                    {/* Progress bar */}
                    {showProgress && task.progress > 0 && (
                      <rect
                        x={startX}
                        y={y}
                        width={taskWidth * (task.progress / 100)}
                        height={taskHeight}
                        fill="hsl(var(--background))"
                        opacity={0.3}
                        rx={4}
                      />
                    )}

                    {/* Task name */}
                    <text
                      x={10}
                      y={y + taskHeight / 2 + 4}
                      className="text-xs font-medium fill-foreground"
                    >
                      {task.name}
                    </text>

                    {/* Status icon */}
                    <g transform={`translate(${startX + taskWidth - 20}, ${y + 5})`}>
                      {task.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                      {task.status === 'in-progress' && (
                        <Play className="w-4 h-4 text-yellow-600" />
                      )}
                      {task.status === 'delayed' && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                    </g>

                    {/* Progress percentage */}
                    {showProgress && (
                      <text
                        x={startX + taskWidth / 2}
                        y={y + taskHeight / 2 + 4}
                        textAnchor="middle"
                        className="text-xs font-bold fill-foreground"
                      >
                        {task.progress}%
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Header */}
              <rect
                x={0}
                y={0}
                width={totalWidth}
                height={headerHeight}
                fill="hsl(var(--muted))"
                opacity={0.1}
              />
              <text
                x={taskNameWidth / 2}
                y={headerHeight / 2 + 4}
                textAnchor="middle"
                className="text-sm font-medium fill-foreground"
              >
                Tasks
              </text>
              <text
                x={taskNameWidth + chartWidth / 2}
                y={headerHeight / 2 + 4}
                textAnchor="middle"
                className="text-sm font-medium fill-foreground"
              >
                Timeline
              </text>
            </svg>
          </div>

          {/* Selected task info */}
          {selectedTask && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">{selectedTask.name}</div>
              <div className="text-xs text-muted-foreground">
                <div>Start: {selectedTask.start.toLocaleDateString()}</div>
                <div>End: {selectedTask.end.toLocaleDateString()}</div>
                <div>Progress: {selectedTask.progress}%</div>
                <div>Status: {selectedTask.status}</div>
                {selectedTask.assignee && <div>Assignee: {selectedTask.assignee}</div>}
                {selectedTask.priority && <div>Priority: {selectedTask.priority}</div>}
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="font-medium">Tasks: {tasks.length}</div>
              <div>Completed: {tasks.filter(t => t.status === 'completed').length}</div>
              <div>In Progress: {tasks.filter(t => t.status === 'in-progress').length}</div>
            </div>
            <div>
              <div className="font-medium">Duration</div>
              <div>Start: {minDate.toLocaleDateString()}</div>
              <div>End: {maxDate.toLocaleDateString()}</div>
            </div>
            <div>
              <div className="font-medium">Progress</div>
              <div>Avg: {Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length)}%</div>
              <div>Dependencies: {dependencies.length}</div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Delayed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span>Not Started</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Metadata for component library
GanttChart.metadata = {
  name: "GanttChart",
  label: "Gantt Chart",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Project timeline with tasks, dependencies, and progress tracking",
  phase: "Core",
  category: "Data Visualization",
  tags: ["dataviz", "gantt", "timeline", "project", "tasks", "dependencies"]
}
