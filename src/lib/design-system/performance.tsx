/**
 * Performance Utilities
 * Lazy loading, memoization, and performance optimization components
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import React, { Suspense, lazy, memo, useMemo, useCallback, useRef, useEffect, useState, ReactNode } from 'react'
import { LazyComponentProps, VirtualizedProps, BaseComponentProps } from './types'

// ============================================================================
// LAZY LOADING COMPONENTS
// ============================================================================

export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  fallback = <div>Loading...</div>,
  delay = 0,
  ...props
}) => {
  const [shouldRender, setShouldRender] = useState(delay === 0)

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setShouldRender(true), delay)
      return () => clearTimeout(timer)
    }
  }, [delay])

  if (!shouldRender) {
    return <>{fallback}</>
  }

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

// ============================================================================
// LAZY COMPONENT FACTORY
// ============================================================================

export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode,
  delay?: number
) => {
  const LazyComponent = lazy(importFunc)
  
  return React.forwardRef<any, React.ComponentProps<T>>((props, ref) => (
    <LazyComponent ref={ref} {...(props as any)} />
  ))
}

// ============================================================================
// MEMOIZED COMPONENT WRAPPER
// ============================================================================

export const withMemo = <P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  const MemoizedComponent = memo(Component, areEqual)
  MemoizedComponent.displayName = `withMemo(${Component.displayName || Component.name})`
  return MemoizedComponent
}

// ============================================================================
// VIRTUALIZED LIST COMPONENT
// ============================================================================

interface VirtualizedListProps extends VirtualizedProps {
  renderItem: (index: number, style: React.CSSProperties) => ReactNode
  className?: string
}

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  itemCount,
  itemSize,
  overscan = 5,
  direction = 'vertical',
  renderItem,
  className = '',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [containerSize, setContainerSize] = useState(0)

  const getItemSize = useCallback((index: number) => {
    return typeof itemSize === 'function' ? itemSize(index) : itemSize
  }, [itemSize])

  const getTotalSize = useMemo(() => {
    let total = 0
    for (let i = 0; i < itemCount; i++) {
      total += getItemSize(i)
    }
    return total
  }, [itemCount, getItemSize])

  const getVisibleRange = useMemo(() => {
    const itemSizeNum = typeof itemSize === 'function' ? 50 : itemSize
    if (direction === 'vertical') {
      const start = Math.max(0, Math.floor(scrollOffset / itemSizeNum) - overscan)
      const end = Math.min(
        itemCount - 1,
        Math.ceil((scrollOffset + containerSize) / itemSizeNum) + overscan
      )
      return { start, end }
    } else {
      const start = Math.max(0, Math.floor(scrollOffset / itemSizeNum) - overscan)
      const end = Math.min(
        itemCount - 1,
        Math.ceil((scrollOffset + containerSize) / itemSizeNum) + overscan
      )
      return { start, end }
    }
  }, [scrollOffset, containerSize, itemSize, itemCount, overscan, direction])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const newOffset = direction === 'vertical' ? target.scrollTop : target.scrollLeft
    setScrollOffset(newOffset)
  }, [direction])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateSize = () => {
      const size = direction === 'vertical' ? container.clientHeight : container.clientWidth
      setContainerSize(size)
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [direction])

  const visibleItems = useMemo(() => {
    const items: ReactNode[] = []
    const { start, end } = getVisibleRange

    for (let i = start; i <= end; i++) {
      let offset = 0
      for (let j = 0; j < i; j++) {
        offset += getItemSize(j)
      }

      const style: React.CSSProperties = {
        position: 'absolute',
        [direction === 'vertical' ? 'top' : 'left']: offset,
        [direction === 'vertical' ? 'width' : 'height']: '100%',
        [direction === 'vertical' ? 'height' : 'width']: getItemSize(i),
      }

      items.push(
        <div key={i} style={style}>
          {renderItem(i, style)}
        </div>
      )
    }

    return items
  }, [getVisibleRange, getItemSize, renderItem, direction])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      onScroll={handleScroll}
      style={{
        [direction === 'vertical' ? 'height' : 'width']: containerSize || '100%',
      }}
      {...props}
    >
      <div
        style={{
          [direction === 'vertical' ? 'height' : 'width']: getTotalSize,
          position: 'relative',
        }}
      >
        {visibleItems}
      </div>
    </div>
  )
}

// ============================================================================
// PERFORMANCE MONITORING HOOK
// ============================================================================

interface PerformanceMetrics {
  renderTime: number
  mountTime: number
  updateCount: number
  lastUpdate: Date
}

export const usePerformanceMonitor = (componentName: string) => {
  const metricsRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    mountTime: 0,
    updateCount: 0,
    lastUpdate: new Date(),
  })

  const startTime = useRef<number>(0)

  useEffect(() => {
    startTime.current = performance.now()
    metricsRef.current.mountTime = startTime.current
  }, [])

  useEffect(() => {
    const endTime = performance.now()
    metricsRef.current.renderTime = endTime - startTime.current
    metricsRef.current.updateCount += 1
    metricsRef.current.lastUpdate = new Date()

    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance metrics for ${componentName}:`, metricsRef.current)
    }
  })

  return metricsRef.current
}

// ============================================================================
// DEBOUNCED COMPONENT
// ============================================================================

interface DebouncedComponentProps extends BaseComponentProps {
  delay: number
  children: ReactNode
}

export const DebouncedComponent: React.FC<DebouncedComponentProps> = ({
  delay,
  children,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay])

  if (!isVisible) {
    return null
  }

  return <div {...props}>{children}</div>
}

// ============================================================================
// THROTTLED COMPONENT
// ============================================================================

interface ThrottledComponentProps {
  throttleMs: number
  children: (throttledValue: any) => ReactNode
  value: any
  className?: string
  style?: React.CSSProperties
}

export const ThrottledComponent: React.FC<ThrottledComponentProps> = ({
  throttleMs,
  children,
  value,
  ...props
}) => {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    const now = Date.now()
    if (now - lastUpdateRef.current >= throttleMs) {
      setThrottledValue(value)
      lastUpdateRef.current = now
    } else {
      const timeout = setTimeout(() => {
        setThrottledValue(value)
        lastUpdateRef.current = Date.now()
      }, throttleMs - (now - lastUpdateRef.current))

      return () => clearTimeout(timeout)
    }
  }, [value, throttleMs])

  return <div {...props}>{children(throttledValue)}</div>
}

// ============================================================================
// INTERSECTION OBSERVER COMPONENT
// ============================================================================

interface IntersectionObserverComponentProps {
  threshold?: number | number[]
  rootMargin?: string
  children: (isIntersecting: boolean, entry: IntersectionObserverEntry | null) => ReactNode
  fallback?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const IntersectionObserverComponent: React.FC<IntersectionObserverComponentProps> = ({
  threshold = 0,
  rootMargin = '0px',
  children,
  fallback = null,
  ...props
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        setEntry(entry)
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={elementRef} {...props}>
      {isIntersecting ? children(isIntersecting, entry) : fallback}
    </div>
  )
}

// ============================================================================
// PERFORMANCE OPTIMIZED COMPONENT WRAPPER
// ============================================================================

interface PerformanceOptimizedProps extends BaseComponentProps {
  memo?: boolean
  lazy?: boolean
  virtualized?: boolean
  debounce?: number
  throttle?: number
  intersectionObserver?: boolean
  children: ReactNode
}

export const PerformanceOptimized: React.FC<PerformanceOptimizedProps> = ({
  memo = false,
  lazy = false,
  virtualized = false,
  debounce = 0,
  throttle = 0,
  intersectionObserver = false,
  children,
  ...props
}) => {
  let Component = children

  if (debounce > 0) {
    Component = <DebouncedComponent delay={debounce}>{Component}</DebouncedComponent>
  }

  if (throttle > 0) {
    Component = <ThrottledComponent throttleMs={throttle} value={Component}>{() => Component}</ThrottledComponent>
  }

  if (intersectionObserver) {
    Component = (
      <IntersectionObserverComponent>
        {(isIntersecting) => (isIntersecting ? Component : null)}
      </IntersectionObserverComponent>
    )
  }

  if (lazy) {
    Component = <LazyComponent>{Component}</LazyComponent>
  }

  if (memo) {
    Component = React.useMemo(() => Component, [Component])
  }

  return <div {...props}>{Component}</div>
}

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

export const measurePerformance = <T extends (...args: any[]) => any>(
  fn: T,
  name?: string
): T => {
  return ((...args: any[]) => {
    const start = performance.now()
    const result = fn(...args)
    const end = performance.now()
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name || 'Function'} took ${end - start} milliseconds`)
    }
    
    return result
  }) as T
}

export const createPerformanceProfiler = () => {
  const marks: Record<string, number> = {}
  
  return {
    mark: (name: string) => {
      marks[name] = performance.now()
    },
    measure: (name: string, startMark?: string) => {
      const end = performance.now()
      const start = startMark ? marks[startMark] : 0
      const duration = end - start
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${name}: ${duration.toFixed(2)}ms`)
      }
      
      return duration
    },
    clear: () => {
      Object.keys(marks).forEach(key => delete marks[key])
    }
  }
}
