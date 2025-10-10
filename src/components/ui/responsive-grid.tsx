/**
 * Responsive Grid System
 * Supports 1/4, 1/3, 1/2, 2/3, 3/4 widths with 520px desktop max
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import { useState, createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

type GridSize = '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | 'full'

interface GridContextType {
  gridSize: GridSize
  setGridSize: (size: GridSize) => void
}

const GridContext = createContext<GridContextType | undefined>(undefined)

export function useGridSize() {
  const context = useContext(GridContext)
  if (!context) {
    throw new Error('useGridSize must be used within a GridProvider')
  }
  return context
}

interface GridProviderProps {
  children: React.ReactNode
  defaultSize?: GridSize
}

export function GridProvider({ children, defaultSize = '1/2' }: GridProviderProps) {
  const [gridSize, setGridSize] = useState<GridSize>(defaultSize)

  return (
    <GridContext.Provider value={{ gridSize, setGridSize }}>
      {children}
    </GridContext.Provider>
  )
}

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveGrid({ children, className }: ResponsiveGridProps) {
  const { gridSize } = useGridSize()

  const getGridClasses = (size: GridSize) => {
    const baseClasses = "w-full"
    
    switch (size) {
      case '1/4':
        return `${baseClasses} max-w-[260px] mx-auto`
      case '1/3':
        return `${baseClasses} max-w-[347px] mx-auto`
      case '1/2':
        return `${baseClasses} max-w-[520px] mx-auto`
      case '2/3':
        return `${baseClasses} max-w-[693px] mx-auto`
      case '3/4':
        return `${baseClasses} max-w-[780px] mx-auto`
      case 'full':
        return `${baseClasses} max-w-none`
      default:
        return `${baseClasses} max-w-[520px] mx-auto`
    }
  }

  return (
    <div className={cn(getGridClasses(gridSize), className)}>
      {children}
    </div>
  )
}

interface GridSwitcherProps {
  className?: string
}

export function GridSwitcher({ className }: GridSwitcherProps) {
  const { gridSize, setGridSize } = useGridSize()

  const sizes: { value: GridSize; label: string; icon: string }[] = [
    { value: '1/4', label: '1/4', icon: '⊞' },
    { value: '1/3', label: '1/3', icon: '⊟' },
    { value: '1/2', label: '1/2', icon: '⊠' },
    { value: '2/3', label: '2/3', icon: '⊡' },
    { value: '3/4', label: '3/4', icon: '⊢' },
    { value: 'full', label: 'Full', icon: '⊣' }
  ]

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {sizes.map((size) => (
        <button
          key={size.value}
          onClick={() => setGridSize(size.value)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-md border transition-colors",
            gridSize === size.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background hover:bg-muted border-border"
          )}
          title={`Switch to ${size.label} width`}
        >
          <span className="text-sm font-medium">{size.icon}</span>
        </button>
      ))}
    </div>
  )
}
