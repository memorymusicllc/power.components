/**
 * Error Boundary System
 * Comprehensive error handling for component library
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { ErrorBoundaryProps, ErrorBoundaryState } from './types'

// ============================================================================
// DEFAULT ERROR FALLBACK COMPONENT
// ============================================================================

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
  componentName?: string
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  componentName = 'Component',
}) => (
  <div className="p-4 border border-error-500 rounded-lg bg-error-50">
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <span className="text-error-500 text-xl">⚠️</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-error-800">
          {componentName} Error
        </h3>
        <p className="mt-1 text-sm text-error-700">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="mt-3 flex space-x-2">
          <button
            onClick={resetError}
            className="px-3 py-1 text-xs font-medium text-error-800 bg-error-100 rounded hover:bg-error-200 focus:outline-none focus:ring-2 focus:ring-error-500"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 text-xs font-medium text-error-800 bg-error-100 rounded hover:bg-error-200 focus:outline-none focus:ring-2 focus:ring-error-500"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  </div>
)

// ============================================================================
// ERROR BOUNDARY CLASS COMPONENT
// ============================================================================

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetOnPropsChange, resetKeys } = this.props

    if (resetOnPropsChange && resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      )

      if (hasResetKeyChanged) {
        this.resetError()
      }
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId)
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      const { fallback: Fallback = DefaultErrorFallback, children, ...props } = this.props

      // Remove non-DOM props
      const { onError, resetOnPropsChange, resetKeys, ...domProps } = props

      return (
        <Fallback
          error={this.state.error!}
          resetError={this.resetError}
          componentName={domProps['data-component']}
        />
      )
    }

    return this.props.children
  }
}

// ============================================================================
// HOOK-BASED ERROR BOUNDARY
// ============================================================================

interface UseErrorBoundaryReturn {
  error: Error | null
  resetError: () => void
  captureError: (error: Error) => void
}

export const useErrorBoundary = (): UseErrorBoundaryReturn => {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const captureError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  // Throw error to be caught by ErrorBoundary
  if (error) {
    throw error
  }

  return { error, resetError, captureError }
}

// ============================================================================
// ASYNC ERROR BOUNDARY
// ============================================================================

interface AsyncErrorBoundaryProps extends Omit<ErrorBoundaryProps, 'children'> {
  children: ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export const AsyncErrorBoundary: React.FC<AsyncErrorBoundaryProps> = ({
  children,
  fallback: Fallback,
  ...props
}) => {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const handleError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  if (error) {
    if (Fallback) {
      return <Fallback error={error} resetError={resetError} />
    }
    return <DefaultErrorFallback error={error} resetError={resetError} />
  }

  return (
    <ErrorBoundary {...props} onError={handleError}>
      {children}
    </ErrorBoundary>
  )
}

// ============================================================================
// COMPONENT WRAPPER WITH ERROR BOUNDARY
// ============================================================================

interface WithErrorBoundaryOptions extends Partial<ErrorBoundaryProps> {
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
) => {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => (
    <ErrorBoundary
      fallback={options.fallback}
      onError={options.onError}
      resetOnPropsChange={options.resetOnPropsChange}
      resetKeys={options.resetKeys}
    >
      <Component {...props} ref={ref} />
    </ErrorBoundary>
  ))

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}

// ============================================================================
// ERROR REPORTING UTILITIES
// ============================================================================

interface ErrorReport {
  error: Error
  errorInfo: ErrorInfo
  componentName?: string
  timestamp: Date
  userAgent: string
  url: string
  userId?: string
}

export const reportError = async (report: ErrorReport): Promise<void> => {
  try {
    // In a real application, you would send this to your error reporting service
    console.error('Error Report:', report)
    
    // Example: Send to error reporting service
    // await fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(report),
    // })
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError)
  }
}

export const createErrorReporter = (userId?: string) => {
  return (error: Error, errorInfo: ErrorInfo, componentName?: string) => {
    const report: ErrorReport = {
      error,
      errorInfo,
      componentName,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId,
    }

    reportError(report)
  }
}

// ============================================================================
// DEVELOPMENT ERROR OVERLAY
// ============================================================================

interface ErrorOverlayProps {
  error: Error
  errorInfo: ErrorInfo
  onClose: () => void
}

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ error, errorInfo, onClose }) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-red-600">Development Error</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 overflow-auto max-h-80">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Error Message:</h3>
              <p className="text-red-600 font-mono text-sm">{error.message}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Stack Trace:</h3>
              <pre className="text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto">
                {error.stack}
              </pre>
            </div>
            
            {errorInfo.componentStack && (
              <div>
                <h3 className="font-medium text-gray-900">Component Stack:</h3>
                <pre className="text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto">
                  {errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 p-4 border-t">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// DEVELOPMENT ERROR BOUNDARY
// ============================================================================

export const DevelopmentErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
  const [showOverlay, setShowOverlay] = React.useState(false)
  const [overlayError, setOverlayError] = React.useState<{ error: Error; errorInfo: ErrorInfo } | null>(null)

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    if (process.env.NODE_ENV === 'development') {
      setOverlayError({ error, errorInfo })
      setShowOverlay(true)
    }
    
    if (props.onError) {
      props.onError(error, errorInfo)
    }
  }

  return (
    <>
      <ErrorBoundary {...props} onError={handleError} />
      {showOverlay && overlayError && (
        <ErrorOverlay
          error={overlayError.error}
          errorInfo={overlayError.errorInfo}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </>
  )
}
