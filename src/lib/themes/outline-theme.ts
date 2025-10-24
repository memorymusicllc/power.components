/**
 * Outline Theme Configuration
 * Transparent background with outline borders for all components
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

export const outlineTheme = {
  colors: {
    // Primary colors with outline variants
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      outline: '#3b82f6',
      outlineHover: '#2563eb',
      outlineActive: '#1d4ed8'
    },
    
    // Secondary colors
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      outline: '#64748b',
      outlineHover: '#475569',
      outlineActive: '#334155'
    },
    
    // Success colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      outline: '#22c55e',
      outlineHover: '#16a34a',
      outlineActive: '#15803d'
    },
    
    // Warning colors
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      outline: '#f59e0b',
      outlineHover: '#d97706',
      outlineActive: '#b45309'
    },
    
    // Error colors
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      outline: '#ef4444',
      outlineHover: '#dc2626',
      outlineActive: '#b91c1c'
    },
    
    // Info colors
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      outline: '#0ea5e9',
      outlineHover: '#0284c7',
      outlineActive: '#0369a1'
    }
  },
  
  // Outline theme variants
  variants: {
    default: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'var(--outline-border)',
      color: 'var(--outline-text)',
      hover: {
        background: 'var(--outline-hover-bg)',
        borderColor: 'var(--outline-hover-border)',
        color: 'var(--outline-hover-text)'
      },
      active: {
        background: 'var(--outline-active-bg)',
        borderColor: 'var(--outline-active-border)',
        color: 'var(--outline-active-text)'
      }
    },
    
    primary: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'var(--outline-primary)',
      color: 'var(--outline-primary)',
      hover: {
        background: 'var(--outline-primary-hover-bg)',
        borderColor: 'var(--outline-primary-hover)',
        color: 'var(--outline-primary-hover)'
      },
      active: {
        background: 'var(--outline-primary-active-bg)',
        borderColor: 'var(--outline-primary-active)',
        color: 'var(--outline-primary-active)'
      }
    },
    
    secondary: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'var(--outline-secondary)',
      color: 'var(--outline-secondary)',
      hover: {
        background: 'var(--outline-secondary-hover-bg)',
        borderColor: 'var(--outline-secondary-hover)',
        color: 'var(--outline-secondary-hover)'
      },
      active: {
        background: 'var(--outline-secondary-active-bg)',
        borderColor: 'var(--outline-secondary-active)',
        color: 'var(--outline-secondary-active)'
      }
    },
    
    success: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'var(--outline-success)',
      color: 'var(--outline-success)',
      hover: {
        background: 'var(--outline-success-hover-bg)',
        borderColor: 'var(--outline-success-hover)',
        color: 'var(--outline-success-hover)'
      },
      active: {
        background: 'var(--outline-success-active-bg)',
        borderColor: 'var(--outline-success-active)',
        color: 'var(--outline-success-active)'
      }
    },
    
    warning: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'var(--outline-warning)',
      color: 'var(--outline-warning)',
      hover: {
        background: 'var(--outline-warning-hover-bg)',
        borderColor: 'var(--outline-warning-hover)',
        color: 'var(--outline-warning-hover)'
      },
      active: {
        background: 'var(--outline-warning-active-bg)',
        borderColor: 'var(--outline-warning-active)',
        color: 'var(--outline-warning-active)'
      }
    },
    
    error: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'var(--outline-error)',
      color: 'var(--outline-error)',
      hover: {
        background: 'var(--outline-error-hover-bg)',
        borderColor: 'var(--outline-error-hover)',
        color: 'var(--outline-error-hover)'
      },
      active: {
        background: 'var(--outline-error-active-bg)',
        borderColor: 'var(--outline-error-active)',
        color: 'var(--outline-error-active)'
      }
    },
    
    info: {
      background: 'transparent',
      border: '1px solid',
      borderColor: 'var(--outline-info)',
      color: 'var(--outline-info)',
      hover: {
        background: 'var(--outline-info-hover-bg)',
        borderColor: 'var(--outline-info-hover)',
        color: 'var(--outline-info-hover)'
      },
      active: {
        background: 'var(--outline-info-active-bg)',
        borderColor: 'var(--outline-info-active)',
        color: 'var(--outline-info-active)'
      }
    }
  },
  
  // Component-specific outline styles
  components: {
    button: {
      base: 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      outline: 'border border-current bg-transparent text-current hover:bg-current/10 focus-visible:ring-current'
    },
    
    card: {
      base: 'rounded-lg border bg-transparent shadow-sm transition-all duration-200',
      outline: 'border border-gray-200 bg-transparent text-gray-900 hover:bg-gray-50/50 focus-visible:ring-gray-500'
    },
    
    input: {
      base: 'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      outline: 'border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-blue-500 hover:border-gray-400'
    },
    
    badge: {
      base: 'inline-flex items-center rounded-full font-medium transition-colors',
      outline: 'border border-current bg-transparent text-current hover:bg-current/10'
    },
    
    progress: {
      base: 'w-full bg-transparent rounded-full overflow-hidden',
      outline: 'border border-gray-200 bg-transparent'
    }
  }
};

// CSS custom properties for outline theme
export const outlineThemeCSS = `
  :root {
    /* Outline theme colors */
    --outline-border: ${outlineTheme.colors.secondary[300]};
    --outline-text: ${outlineTheme.colors.secondary[900]};
    --outline-hover-bg: ${outlineTheme.colors.secondary[50]};
    --outline-hover-border: ${outlineTheme.colors.secondary[400]};
    --outline-hover-text: ${outlineTheme.colors.secondary[800]};
    --outline-active-bg: ${outlineTheme.colors.secondary[100]};
    --outline-active-border: ${outlineTheme.colors.secondary[500]};
    --outline-active-text: ${outlineTheme.colors.secondary[700]};
    
    /* Primary outline */
    --outline-primary: ${outlineTheme.colors.primary.outline};
    --outline-primary-hover-bg: ${outlineTheme.colors.primary[50]};
    --outline-primary-hover: ${outlineTheme.colors.primary.outlineHover};
    --outline-primary-active-bg: ${outlineTheme.colors.primary[100]};
    --outline-primary-active: ${outlineTheme.colors.primary.outlineActive};
    
    /* Secondary outline */
    --outline-secondary: ${outlineTheme.colors.secondary.outline};
    --outline-secondary-hover-bg: ${outlineTheme.colors.secondary[50]};
    --outline-secondary-hover: ${outlineTheme.colors.secondary.outlineHover};
    --outline-secondary-active-bg: ${outlineTheme.colors.secondary[100]};
    --outline-secondary-active: ${outlineTheme.colors.secondary.outlineActive};
    
    /* Success outline */
    --outline-success: ${outlineTheme.colors.success.outline};
    --outline-success-hover-bg: ${outlineTheme.colors.success[50]};
    --outline-success-hover: ${outlineTheme.colors.success.outlineHover};
    --outline-success-active-bg: ${outlineTheme.colors.success[100]};
    --outline-success-active: ${outlineTheme.colors.success.outlineActive};
    
    /* Warning outline */
    --outline-warning: ${outlineTheme.colors.warning.outline};
    --outline-warning-hover-bg: ${outlineTheme.colors.warning[50]};
    --outline-warning-hover: ${outlineTheme.colors.warning.outlineHover};
    --outline-warning-active-bg: ${outlineTheme.colors.warning[100]};
    --outline-warning-active: ${outlineTheme.colors.warning.outlineActive};
    
    /* Error outline */
    --outline-error: ${outlineTheme.colors.error.outline};
    --outline-error-hover-bg: ${outlineTheme.colors.error[50]};
    --outline-error-hover: ${outlineTheme.colors.error.outlineHover};
    --outline-error-active-bg: ${outlineTheme.colors.error[100]};
    --outline-error-active: ${outlineTheme.colors.error.outlineActive};
    
    /* Info outline */
    --outline-info: ${outlineTheme.colors.info.outline};
    --outline-info-hover-bg: ${outlineTheme.colors.info[50]};
    --outline-info-hover: ${outlineTheme.colors.info.outlineHover};
    --outline-info-active-bg: ${outlineTheme.colors.info[100]};
    --outline-info-active: ${outlineTheme.colors.info.outlineActive};
  }
  
  .dark {
    /* Dark mode outline colors */
    --outline-border: ${outlineTheme.colors.secondary[600]};
    --outline-text: ${outlineTheme.colors.secondary[100]};
    --outline-hover-bg: ${outlineTheme.colors.secondary[800]};
    --outline-hover-border: ${outlineTheme.colors.secondary[500]};
    --outline-hover-text: ${outlineTheme.colors.secondary[200]};
    --outline-active-bg: ${outlineTheme.colors.secondary[700]};
    --outline-active-border: ${outlineTheme.colors.secondary[400]};
    --outline-active-text: ${outlineTheme.colors.secondary[300]};
  }
`;

export default outlineTheme;
