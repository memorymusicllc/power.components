/**
 * Custom Color Scheme - Power Components v3
 * 
 * Design specifications:
 * - Darker black for dark: 0 0 3.9% (NO Dark Blue)
 * - Line/Border width: 0.8px 81%
 * - Charts: BLUE (PRIMARY), PURPLE (SECONDARY), GREEN (TERTIARY), PINK (ACCENT)
 * 
 * Constitutional Authority: Article I, Article III, Article IX
 */

export const colorScheme = {
  // Dark mode colors
  dark: {
    background: 'hsl(0, 0%, 3.9%)', // Darker black - NO dark blue
    surface: 'hsl(0, 0%, 6%)',
    border: 'hsl(0, 0%, 12%)',
    text: {
      primary: 'hsl(0, 0%, 95%)',
      secondary: 'hsl(0, 0%, 70%)',
      muted: 'hsl(0, 0%, 50%)'
    }
  },
  
  // Light mode colors
  light: {
    background: 'hsl(0, 0%, 100%)',
    surface: 'hsl(0, 0%, 98%)',
    border: 'hsl(0, 0%, 88%)',
    text: {
      primary: 'hsl(0, 0%, 10%)',
      secondary: 'hsl(0, 0%, 30%)',
      muted: 'hsl(0, 0%, 50%)'
    }
  },
  
  // Chart colors
  charts: {
    primary: 'hsl(224.3, 76.3%, 48%)',    // BLUE
    secondary: 'hsl(272.1, 71.7%, 47.1%)', // PURPLE
    tertiary: 'hsl(175.9, 60.8%, 19%)',   // GREEN - Positive Outcome
    accent: 'hsl(172.5, 66%, 50.4%)'      // PINK
  },
  
  // Status colors
  status: {
    success: 'hsl(175.9, 60.8%, 19%)',    // GREEN
    warning: 'hsl(45, 93%, 47%)',         // YELLOW
    error: 'hsl(0, 84%, 60%)',            // RED
    info: 'hsl(224.3, 76.3%, 48%)'       // BLUE
  },
  
  // Border specifications
  borders: {
    width: '0.8px',
    opacity: 0.81,
    radius: '0.5rem'
  }
};

// CSS custom properties for easy use
export const cssVariables = `
  :root {
    /* Light mode */
    --color-bg: ${colorScheme.light.background};
    --color-surface: ${colorScheme.light.surface};
    --color-border: ${colorScheme.light.border};
    --color-text-primary: ${colorScheme.light.text.primary};
    --color-text-secondary: ${colorScheme.light.text.secondary};
    --color-text-muted: ${colorScheme.light.text.muted};
    
    /* Chart colors */
    --color-chart-primary: ${colorScheme.charts.primary};
    --color-chart-secondary: ${colorScheme.charts.secondary};
    --color-chart-tertiary: ${colorScheme.charts.tertiary};
    --color-chart-accent: ${colorScheme.charts.accent};
    
    /* Status colors */
    --color-success: ${colorScheme.status.success};
    --color-warning: ${colorScheme.status.warning};
    --color-error: ${colorScheme.status.error};
    --color-info: ${colorScheme.status.info};
    
    /* Border specifications */
    --border-width: ${colorScheme.borders.width};
    --border-opacity: ${colorScheme.borders.opacity};
    --border-radius: ${colorScheme.borders.radius};
  }
  
  .dark {
    /* Dark mode - NO dark blue, using darker black */
    --color-bg: ${colorScheme.dark.background};
    --color-surface: ${colorScheme.dark.surface};
    --color-border: ${colorScheme.dark.border};
    --color-text-primary: ${colorScheme.dark.text.primary};
    --color-text-secondary: ${colorScheme.dark.text.secondary};
    --color-text-muted: ${colorScheme.dark.text.muted};
  }
`;

// Tailwind CSS classes for the color scheme
export const tailwindClasses = {
  // Background colors
  bg: {
    light: 'bg-white',
    dark: 'bg-[hsl(0,0%,3.9%)]', // Darker black
    surface: {
      light: 'bg-gray-50',
      dark: 'bg-[hsl(0,0%,6%)]'
    }
  },
  
  // Text colors
  text: {
    primary: {
      light: 'text-gray-900',
      dark: 'text-gray-100'
    },
    secondary: {
      light: 'text-gray-600',
      dark: 'text-gray-300'
    },
    muted: {
      light: 'text-gray-500',
      dark: 'text-gray-400'
    }
  },
  
  // Border colors
  border: {
    light: 'border-gray-200',
    dark: 'border-[hsl(0,0%,12%)]'
  },
  
  // Chart colors
  chart: {
    primary: 'text-[hsl(224.3,76.3%,48%)]',
    secondary: 'text-[hsl(272.1,71.7%,47.1%)]',
    tertiary: 'text-[hsl(175.9,60.8%,19%)]',
    accent: 'text-[hsl(172.5,66%,50.4%)]'
  },
  
  // Status colors
  status: {
    success: 'text-[hsl(175.9,60.8%,19%)]',
    warning: 'text-yellow-500',
    error: 'text-red-500',
    info: 'text-[hsl(224.3,76.3%,48%)]'
  }
};

// Border specifications
export const borderSpecs = {
  width: 'border-[0.8px]',
  opacity: 'opacity-81',
  radius: 'rounded-lg'
};

export default colorScheme;
