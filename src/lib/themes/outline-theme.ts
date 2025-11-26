/**
 * Outline Theme - Crypto Finance Theme with AR/HUD Support
 * Following pow3r.v3.config.json schema
 * Optimized for AR glasses, HUD, and smart mirrors
 * 
 * @version 3.0.0
 * @date 2025-01-16
 */

export const outlineTheme = {
  name: 'Outline',
  variants: {
    'true-black': {
      name: 'True Black (Default)',
      description: 'High contrast, OLED-friendly, cyberpunk aesthetic for crypto trading',
      colors: {
        background: '#000000',
        surface: '#0a0a0a',
        border: '#1a1a1a',
        text: '#ffffff',
        'text-muted': '#a0a0a0',
        accent: '#00ff00',
        'accent-hover': '#00cc00',
        primary: '#3b82f6',
        secondary: '#00aaff',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
    },
    light: {
      name: 'Light',
      description: 'Clean, professional, high readability for daytime trading',
      colors: {
        background: '#ffffff',
        surface: '#f5f5f5',
        border: '#e5e5e5',
        text: '#000000',
        'text-muted': '#666666',
        accent: '#00aa00',
        'accent-hover': '#008800',
        primary: '#3b82f6',
        secondary: '#0088cc',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
    },
    glass: {
      name: 'Glass (AR/HUD/Smart Mirrors)',
      description: 'Translucent, futuristic, AR-ready with backdrop blur',
      colors: {
        background: 'rgba(0, 0, 0, 0.3)',
        surface: 'rgba(255, 255, 255, 0.1)',
        border: 'rgba(255, 255, 255, 0.2)',
        text: '#ffffff',
        'text-muted': 'rgba(255, 255, 255, 0.7)',
        accent: '#00ff00',
        'accent-hover': '#00cc00',
        primary: '#3b82f6',
        secondary: '#00aaff',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      effects: {
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      },
    },
  },
  colors: {
    // Primary colors (slate for crypto finance)
    primary: {
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
    },
    // Accent colors (crypto green)
    accent: {
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
    },
    // Semantic colors
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
    },
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
    },
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
    },
    // Neutral colors
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    }
  },
  // Typography - Crypto Finance Optimized
  typography: {
    fontFamily: {
      header: ['Rock Salt', 'cursive'], // Headers - Google Font
      body: ['Courier Prime', 'monospace'], // Default font - Google Font
      sans: ['Courier Prime', 'monospace'], // Fallback
      mono: ['Courier Prime', 'monospace'], // Monospace
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    }
  },
  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  // Component styles - Theme-aware with AR/HUD support
  components: {
    button: {
      base: 'inline-flex items-center justify-center px-4 py-2 border-2 text-sm font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
      primary: 'bg-transparent border-current text-current hover:bg-current hover:text-inverse',
      secondary: 'bg-current text-inverse border-current hover:bg-transparent hover:text-current',
      outline: 'border-2 border-current text-current hover:bg-current hover:text-inverse',
      'true-black': 'border-true-black-border text-true-black-text hover:bg-true-black-accent hover:text-true-black-bg focus:ring-true-black-accent',
      light: 'border-light-border text-light-text hover:bg-light-accent hover:text-light-bg focus:ring-light-accent',
      glass: 'border-glass-border text-glass-text backdrop-blur-md hover:bg-glass-accent/20 hover:text-glass-accent focus:ring-glass-accent',
    },
    card: {
      base: 'bg-transparent border-2 rounded-lg p-6 transition-all duration-300',
      hover: 'hover:shadow-lg hover:shadow-current/20',
      'true-black': 'border-true-black-border bg-true-black-surface/50 hover:border-true-black-accent',
      light: 'border-light-border bg-light-surface/50 hover:border-light-accent',
      glass: 'border-glass-border bg-glass-surface backdrop-blur-md hover:border-glass-accent hover:bg-glass-surface/80',
    },
    input: {
      base: 'w-full px-3 py-2 border-2 rounded-md font-mono focus:outline-none focus:ring-2 focus:border-transparent transition-all',
      'true-black': 'border-true-black-border bg-true-black-surface text-true-black-text focus:ring-true-black-accent',
      light: 'border-light-border bg-light-surface text-light-text focus:ring-light-accent',
      glass: 'border-glass-border bg-glass-surface/50 backdrop-blur-sm text-glass-text focus:ring-glass-accent',
    },
    badge: {
      base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-2',
      primary: 'bg-transparent border-current text-current',
      success: 'bg-transparent border-success text-success',
      warning: 'bg-transparent border-warning text-warning',
      error: 'bg-transparent border-error text-error',
    },
    progress: {
      base: 'w-full rounded-full h-2.5 overflow-hidden',
      fill: 'h-2.5 rounded-full transition-all duration-300',
      'true-black': 'bg-true-black-border fill:bg-true-black-accent',
      light: 'bg-light-border fill:bg-light-accent',
      glass: 'bg-glass-border/50 fill:bg-glass-accent backdrop-blur-sm',
    },
    modal: {
      overlay: 'fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm',
      content: 'border-2 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden',
      'true-black': 'overlay:bg-black/50 content:bg-true-black-surface border-true-black-border',
      light: 'overlay:bg-black/30 content:bg-light-surface border-light-border',
      glass: 'overlay:bg-black/20 content:bg-glass-surface border-glass-border backdrop-blur-md',
    },
    tooltip: {
      base: 'absolute z-10 px-2 py-1 text-xs rounded border-2 backdrop-blur-sm',
      'true-black': 'bg-true-black-surface/90 text-true-black-text border-true-black-border',
      light: 'bg-light-surface/90 text-light-text border-light-border',
      glass: 'bg-glass-surface/80 text-glass-text border-glass-border backdrop-blur-md',
    },
    // AR/HUD specific components
    hud: {
      base: 'fixed inset-0 pointer-events-none z-50',
      overlay: 'backdrop-blur-md bg-black/20',
      panel: 'backdrop-blur-lg bg-glass-surface/30 border-glass-border border-2 rounded-lg',
    },
    '3d': {
      enabled: true,
      shadow: 'drop-shadow-[0_0_10px_currentColor]',
      glow: 'shadow-[0_0_20px_currentColor]',
    },
  },
  // Icons
  icons: {
    library: 'heroicons',
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      base: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    },
  }
};

// CSS for outline theme with AR/HUD support
export const outlineThemeCSS = `
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Rock+Salt&family=Courier+Prime:wght@400;700&display=swap');
  
  /* True Black Theme (Default) */
  .outline-theme.true-black,
  .outline-theme {
    --color-background: #000000;
    --color-surface: #0a0a0a;
    --color-border: #1a1a1a;
    --color-text: #ffffff;
    --color-text-muted: #a0a0a0;
    --color-accent: #00ff00;
    --color-accent-hover: #00cc00;
    --color-primary: #3b82f6;
    --color-secondary: #00aaff;
    --color-success: #22c55e;
    --color-warning: #f59e0b;
    --color-error: #ef4444;
  }
  
  /* Light Theme */
  .outline-theme.light {
    --color-background: #ffffff;
    --color-surface: #f5f5f5;
    --color-border: #e5e5e5;
    --color-text: #000000;
    --color-text-muted: #666666;
    --color-accent: #00aa00;
    --color-accent-hover: #008800;
    --color-primary: #3b82f6;
    --color-secondary: #0088cc;
    --color-success: #22c55e;
    --color-warning: #f59e0b;
    --color-error: #ef4444;
  }
  
  /* Glass Theme (AR/HUD/Smart Mirrors) */
  .outline-theme.glass {
    --color-background: rgba(0, 0, 0, 0.3);
    --color-surface: rgba(255, 255, 255, 0.1);
    --color-border: rgba(255, 255, 255, 0.2);
    --color-text: #ffffff;
    --color-text-muted: rgba(255, 255, 255, 0.7);
    --color-accent: #00ff00;
    --color-accent-hover: #00cc00;
    --color-primary: #3b82f6;
    --color-secondary: #00aaff;
    --color-success: #22c55e;
    --color-warning: #f59e0b;
    --color-error: #ef4444;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  /* Typography */
  .outline-theme {
    font-family: 'Courier Prime', monospace;
  }
  
  .outline-theme h1,
  .outline-theme h2,
  .outline-theme h3,
  .outline-theme h4,
  .outline-theme h5,
  .outline-theme h6,
  .outline-theme .font-header {
    font-family: 'Rock Salt', cursive;
  }
  
  .outline-theme .font-body,
  .outline-theme .font-mono {
    font-family: 'Courier Prime', monospace;
  }
  
  /* Buttons - Theme-aware */
  .outline-theme .outline-button {
    @apply inline-flex items-center justify-center px-4 py-2 border-2 text-sm font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2;
    border-color: var(--color-border);
    color: var(--color-text);
  }
  
  .outline-theme.true-black .outline-button,
  .outline-theme .outline-button {
    border-color: var(--color-border);
    color: var(--color-text);
  }
  
  .outline-theme.true-black .outline-button:hover,
  .outline-theme .outline-button:hover {
    background-color: var(--color-accent);
    color: var(--color-background);
    border-color: var(--color-accent);
  }
  
  .outline-theme.light .outline-button {
    border-color: var(--color-border);
    color: var(--color-text);
  }
  
  .outline-theme.light .outline-button:hover {
    background-color: var(--color-accent);
    color: var(--color-background);
    border-color: var(--color-accent);
  }
  
  .outline-theme.glass .outline-button {
    border-color: var(--color-border);
    color: var(--color-text);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  .outline-theme.glass .outline-button:hover {
    background-color: var(--color-accent);
    background-color: rgba(0, 255, 0, 0.2);
    color: var(--color-accent);
    border-color: var(--color-accent);
  }
  
  /* Cards - Theme-aware with AR support */
  .outline-theme .outline-card {
    @apply bg-transparent border-2 rounded-lg p-6 transition-all duration-300;
    border-color: var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text);
  }
  
  .outline-theme.glass .outline-card {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  .outline-theme .outline-card:hover {
    border-color: var(--color-accent);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  }
  
  /* Inputs - Theme-aware */
  .outline-theme .outline-input {
    @apply w-full px-3 py-2 border-2 rounded-md font-mono focus:outline-none focus:ring-2 focus:border-transparent transition-all;
    border-color: var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text);
  }
  
  .outline-theme.glass .outline-input {
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
  
  .outline-theme .outline-input:focus {
    ring-color: var(--color-accent);
    border-color: var(--color-accent);
  }
  
  /* Badges - Theme-aware */
  .outline-theme .outline-badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-2;
    background-color: transparent;
  }
  
  .outline-theme .outline-badge-primary {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
  
  .outline-theme .outline-badge-success {
    border-color: var(--color-success);
    color: var(--color-success);
  }
  
  .outline-theme .outline-badge-warning {
    border-color: var(--color-warning);
    color: var(--color-warning);
  }
  
  .outline-theme .outline-badge-error {
    border-color: var(--color-error);
    color: var(--color-error);
  }
  
  /* Progress bars - Theme-aware */
  .outline-theme .outline-progress {
    @apply w-full rounded-full h-2.5 overflow-hidden;
    background-color: var(--color-border);
  }
  
  .outline-theme .outline-progress-fill {
    @apply h-2.5 rounded-full transition-all duration-300;
    background-color: var(--color-accent);
  }
  
  .outline-theme.glass .outline-progress {
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
  
  /* Modals - Theme-aware with AR support */
  .outline-theme .outline-modal-overlay {
    @apply fixed inset-0 flex items-center justify-center z-50;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .outline-theme.glass .outline-modal-overlay {
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  .outline-theme .outline-modal-content {
    @apply border-2 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden;
    border-color: var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text);
  }
  
  .outline-theme.glass .outline-modal-content {
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  }
  
  /* Tooltips - Theme-aware */
  .outline-theme .outline-tooltip {
    @apply absolute z-10 px-2 py-1 text-xs rounded border-2;
    border-color: var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  /* AR/HUD specific styles */
  .outline-theme .outline-hud {
    @apply fixed inset-0 pointer-events-none z-50;
  }
  
  .outline-theme .outline-hud-panel {
    @apply backdrop-blur-lg border-2 rounded-lg;
    background-color: var(--color-surface);
    border-color: var(--color-border);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  }
  
  /* 3D effects and shadows */
  .outline-theme .outline-3d-shadow {
    filter: drop-shadow(0 0 10px currentColor);
  }
  
  .outline-theme .outline-3d-glow {
    box-shadow: 0 0 20px currentColor;
  }
  
  /* Dynamic light/shadow for crypto finance */
  .outline-theme .outline-price-up {
    color: var(--color-success);
    text-shadow: 0 0 10px var(--color-success);
  }
  
  .outline-theme .outline-price-down {
    color: var(--color-error);
    text-shadow: 0 0 10px var(--color-error);
  }
`;

export default outlineTheme;