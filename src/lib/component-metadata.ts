/**
 * Component Metadata Registry
 * Central registry for all dashboard components with complete metadata
 */

export interface ComponentMetadata {
  name: string
  label: string
  version: string
  date: string
  description: string
  phase: 'Phase 1' | 'Phase 2' | 'Core'
  category: string
  tags: string[]
  component: React.ComponentType<any>
}

export const allComponents: ComponentMetadata[] = []

export function registerComponent(metadata: ComponentMetadata) {
  allComponents.push(metadata)
}

export function searchComponents(query: string): ComponentMetadata[] {
  const q = query.toLowerCase()
  return allComponents.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.label.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.tags.some(t => t.toLowerCase().includes(q))
  )
}

export function filterByPhase(phase: string): ComponentMetadata[] {
  return allComponents.filter(c => c.phase === phase)
}

export function filterByTag(tag: string): ComponentMetadata[] {
  return allComponents.filter(c => c.tags.includes(tag))
}
