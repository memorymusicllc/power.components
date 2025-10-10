/**
 * Component System
 * Unbound component system with compound patterns and design separation
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import React from 'react'
import { 
  ComponentConfig, 
  ComponentVariant, 
  ComponentStyles, 
  ComponentSlots,
  CompoundVariant,
  BaseComponentProps,
  VariantProps,
  AccessibilityProps,
  AnimationProps,
  PolymorphicProps,
  ForwardRefComponent
} from './types'

// ============================================================================
// COMPONENT CREATION UTILITIES
// ============================================================================

export const createComponent = <T extends React.ElementType = 'div'>(
  config: ComponentConfig
) => {
  const Component = React.forwardRef<
    React.ElementRef<T>,
    PolymorphicProps<T> & VariantProps & AccessibilityProps & AnimationProps
  >(({ as: Component = 'div' as T, variant, size, color, state, className, style, children, ...props }, ref) => {
    const variantConfig = config.variants.find(v => v.name === variant) || config.variants[0]
    const styles = variantConfig?.styles || { base: '' }
    
    // Build class names from variant styles
    const classNames = [
      styles.base,
      variant && styles.variants?.[variant],
      state && styles.states?.[state],
      className
    ].filter(Boolean).join(' ')

    return React.createElement(
      Component,
      {
        ref,
        className: classNames,
        style,
        'data-component': config.name,
        'data-variant': variant,
        'data-size': size,
        'data-color': color,
        'data-state': state,
        ...props,
      },
      children
    )
  })

  Component.displayName = config.name
  return Component as ForwardRefComponent<T, PolymorphicProps<T> & VariantProps & AccessibilityProps & AnimationProps>
}

export const createCompoundComponent = <T extends React.ElementType = 'div'>(
  config: ComponentConfig & { slots: ComponentSlots }
) => {
  const Root = createComponent<T>(config)
  
  const slots: Record<string, any> = {}
  
  Object.entries(config.slots).forEach(([slotName, slotConfig]) => {
    const SlotComponent = React.forwardRef<
      React.ElementRef<T>,
      PolymorphicProps<T> & BaseComponentProps
    >(({ as: Component = 'div' as T, className, ...props }, ref) => {
      return React.createElement(
        Component,
        {
          ref,
          className: [slotConfig.base, className].filter(Boolean).join(' '),
          'data-slot': slotName,
          ...props,
        }
      )
    })
    
    SlotComponent.displayName = `${config.name}.${slotName}`
    slots[slotName] = SlotComponent
  })

  // Attach slots to root component
  Object.assign(Root, slots)
  
  return Root as typeof Root & typeof slots
}

// ============================================================================
// STYLE UTILITIES
// ============================================================================

export const createStyles = (styles: ComponentStyles): ComponentStyles => styles

export const createVariant = (name: string, styles: ComponentStyles): ComponentVariant => ({
  name,
  styles,
})

export const createCompoundVariant = (
  condition: Record<string, any>,
  styles: string
): CompoundVariant => ({
  condition,
  styles,
})

// ============================================================================
// COMPONENT CONFIGURATIONS
// ============================================================================

export const buttonConfig: ComponentConfig = {
  name: 'Button',
  defaultVariant: 'default',
  variants: [
    createVariant('default', createStyles({
      base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variants: {
        default: 'bg-primary-500 text-primary-50 hover:bg-primary-600 active:bg-primary-700',
        outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100',
        ghost: 'text-primary-500 hover:bg-primary-50 active:bg-primary-100',
        destructive: 'bg-error-500 text-error-50 hover:bg-error-600 active:bg-error-700',
      },
      states: {
        disabled: 'opacity-50 cursor-not-allowed',
        loading: 'opacity-75 cursor-wait',
      },
    })),
    createVariant('size', createStyles({
      base: '',
      variants: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl',
      },
    })),
  ],
  compoundVariants: [
    createCompoundVariant(
      { variant: 'default', size: 'xs' },
      'h-6 px-2 text-xs'
    ),
    createCompoundVariant(
      { variant: 'outline', size: 'sm' },
      'h-8 px-3 text-sm border'
    ),
  ],
}

export const cardConfig: ComponentConfig = {
  name: 'Card',
  defaultVariant: 'default',
  variants: [
    createVariant('default', createStyles({
      base: 'rounded-lg border bg-surface-50 text-text-900 shadow-sm',
      variants: {
        default: 'border-border-200',
        elevated: 'border-border-100 shadow-md',
        outlined: 'border-2 border-primary-200',
        filled: 'bg-primary-50 border-primary-200',
      },
    })),
  ],
  slots: {
    header: {
      base: 'flex flex-col space-y-1.5 p-6',
    },
    content: {
      base: 'p-6 pt-0',
    },
    footer: {
      base: 'flex items-center p-6 pt-0',
    },
    title: {
      base: 'text-2xl font-semibold leading-none tracking-tight',
    },
    description: {
      base: 'text-sm text-text-muted-500',
    },
  },
}

export const inputConfig: ComponentConfig = {
  name: 'Input',
  defaultVariant: 'default',
  variants: [
    createVariant('default', createStyles({
      base: 'flex h-10 w-full rounded-md border border-border-300 bg-surface-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      variants: {
        default: 'border-border-300',
        error: 'border-error-500 focus-visible:ring-error-500',
        success: 'border-success-500 focus-visible:ring-success-500',
        warning: 'border-warning-500 focus-visible:ring-warning-500',
      },
      states: {
        disabled: 'opacity-50 cursor-not-allowed',
        readonly: 'bg-surface-100 cursor-default',
      },
    })),
  ],
}

export const badgeConfig: ComponentConfig = {
  name: 'Badge',
  defaultVariant: 'default',
  variants: [
    createVariant('default', createStyles({
      base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      variants: {
        default: 'border-transparent bg-primary-500 text-primary-50 hover:bg-primary-600',
        secondary: 'border-transparent bg-secondary-500 text-secondary-50 hover:bg-secondary-600',
        destructive: 'border-transparent bg-error-500 text-error-50 hover:bg-error-600',
        outline: 'text-text-900 border-border-300',
        success: 'border-transparent bg-success-500 text-success-50 hover:bg-success-600',
        warning: 'border-transparent bg-warning-500 text-warning-50 hover:bg-warning-600',
        info: 'border-transparent bg-info-500 text-info-50 hover:bg-info-600',
      },
    })),
  ],
}

export const progressConfig: ComponentConfig = {
  name: 'Progress',
  defaultVariant: 'default',
  variants: [
    createVariant('default', createStyles({
      base: 'relative h-4 w-full overflow-hidden rounded-full bg-surface-200',
      variants: {
        default: 'bg-surface-200',
        success: 'bg-success-100',
        warning: 'bg-warning-100',
        error: 'bg-error-100',
      },
    })),
  ],
  slots: {
    indicator: {
      base: 'h-full w-full flex-1 bg-primary-500 transition-all',
      variants: {
        success: 'bg-success-500',
        warning: 'bg-warning-500',
        error: 'bg-error-500',
      },
    },
  },
}

export const tabsConfig: ComponentConfig = {
  name: 'Tabs',
  defaultVariant: 'default',
  variants: [
    createVariant('default', createStyles({
      base: 'w-full',
      variants: {
        default: '',
        pills: 'rounded-lg bg-surface-100 p-1',
        underline: 'border-b border-border-200',
      },
    })),
  ],
  slots: {
    list: {
      base: 'inline-flex h-10 items-center justify-center rounded-md bg-surface-100 p-1 text-text-muted-500',
    },
    trigger: {
      base: 'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-surface-50 data-[state=active]:text-text-900 data-[state=active]:shadow-sm',
    },
    content: {
      base: 'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    },
  },
}

// ============================================================================
// COMPONENT EXPORTS
// ============================================================================

export const Button = createComponent(buttonConfig)
export const Card = createCompoundComponent({ ...cardConfig, slots: cardConfig.slots! })
export const Input = createComponent(inputConfig)
export const Badge = createComponent(badgeConfig)
export const Progress = createCompoundComponent({ ...progressConfig, slots: progressConfig.slots! })
export const Tabs = createCompoundComponent({ ...tabsConfig, slots: tabsConfig.slots! })

// ============================================================================
// COMPONENT METADATA
// ============================================================================

export const componentMetadata = {
  Button: {
    name: 'Button',
    label: 'Button',
    version: '2.0.0',
    date: '2025-01-08',
    description: 'Unbound button component with compound variants and design separation',
    category: 'Interactive',
    tags: ['button', 'interactive', 'form', 'action'],
  },
  Card: {
    name: 'Card',
    label: 'Card',
    version: '2.0.0',
    date: '2025-01-08',
    description: 'Compound card component with header, content, and footer slots',
    category: 'Layout',
    tags: ['card', 'container', 'layout', 'content'],
  },
  Input: {
    name: 'Input',
    label: 'Input',
    version: '2.0.0',
    date: '2025-01-08',
    description: 'Flexible input component with validation states',
    category: 'Form',
    tags: ['input', 'form', 'text', 'validation'],
  },
  Badge: {
    name: 'Badge',
    label: 'Badge',
    version: '2.0.0',
    date: '2025-01-08',
    description: 'Status and label badge component',
    category: 'Display',
    tags: ['badge', 'status', 'label', 'indicator'],
  },
  Progress: {
    name: 'Progress',
    label: 'Progress',
    version: '2.0.0',
    date: '2025-01-08',
    description: 'Progress indicator with compound slots',
    category: 'Feedback',
    tags: ['progress', 'loading', 'indicator', 'feedback'],
  },
  Tabs: {
    name: 'Tabs',
    label: 'Tabs',
    version: '2.0.0',
    date: '2025-01-08',
    description: 'Tab navigation with compound components',
    category: 'Navigation',
    tags: ['tabs', 'navigation', 'content', 'switching'],
  },
}
