// Power Components Library - Main Export File
// This file exports all components from the library

// Core Components
export { default as ComponentLibrary } from '../ComponentLibrary'

// Component Library Types
export type { ComponentMetadata } from '../ComponentLibrary'

// Legacy Components - Older Theme Style
export * from './components/legacy'

// Re-export commonly used utilities
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export { clsx, twMerge }

// Utility function for combining class names
export const cn = (...inputs: any[]) => {
  return twMerge(clsx(inputs))
}

// Version information
export const version = '1.0.0'

// Library metadata
export const libraryInfo = {
  name: 'Power Components',
  version: '1.0.0',
  description: 'A comprehensive React component library with unbound design system',
  author: 'Power Components Team',
  license: 'MIT',
  repository: 'https://github.com/memorymusicllc/power.components',
  homepage: 'https://github.com/memorymusicllc/power.components#readme'
}
