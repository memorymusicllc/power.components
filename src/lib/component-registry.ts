/**
 * Component Registry
 * Central registry for all dashboard components with metadata
 */

export interface ComponentMetadata {
  name: string
  label: string
  version: string
  date: string
  description?: string
}

export interface DashboardComponent {
  component: React.ComponentType<any>
  metadata: ComponentMetadata
  defaultProps?: Record<string, any>
}

// This will be populated by components as they're refactored
export const dashboardComponents: Map<string, DashboardComponent> = new Map()
