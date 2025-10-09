# POW3R Style Library

This repository contains the CSS styles and theme definitions for the POW3R Cashout application - a comprehensive multi-platform selling dashboard.

## Files

- `globals-src.css` - **Basic Outline Theme** - Comprehensive theme CSS with light/dark mode support and outline-focused component styles

## Features

### globals-src.css (Basic Outline Theme)
- **Theme Name: Basic Outline Theme** - A minimalist, outline-focused theme
- **Design Philosophy**: Clean lines, reduced visual clutter, borders over solid fills
- **High Contrast**: Clear distinction between elements for better readability
- **Transparent Backgrounds**: Uses transparency for depth and modern aesthetics
- Complete theme system with light and dark modes
- Extended color palette including success, warning, and info colors
- Outline-focused component styles for transparent backgrounds with borders
- Custom animations (float, pulse-slow) and glass morphism effects
- Custom scrollbar styling
- Responsive design considerations

## Usage

These CSS files are designed to work with:
- **Vite** build tool
- **Tailwind CSS** for utility-first styling
- **Redux UI** components
- **Zustand** state management
- React applications

## Theme Variables

The Basic Outline Theme defines comprehensive CSS custom properties for:
- Background and foreground colors
- Card, popover, and component styling
- Primary, secondary, muted, and accent colors
- Border, input, and ring colors
- Success, warning, and info states

### Color System

#### Light Mode
- Background: Pure white (`0 0% 100%`)
- Foreground: Near black (`240 10% 3.9%`)
- Primary: Dark gray (`240 5.9% 10%`)
- Border: Light gray (`240 5.9% 90%`)

#### Dark Mode (Default)
- Background: Very dark (`240 10% 3.9%`)
- Foreground: Off-white (`0 0% 98%`)
- Primary: White (`0 0% 98%`)
- Border: Dark gray (`240 3.7% 15.9%`)

## Installation

Include the Basic Outline Theme CSS file in your Vite + Redux UI project:

### For Vite Projects
```bash
# Copy the CSS file to your src directory
cp globals-src.css src/styles/basic-outline-theme.css
```

Then import in your main CSS or component files:
```css
@import './styles/basic-outline-theme.css';
```

### Theme Provider Setup
```tsx
import { ThemeProvider } from '@/components/theme-provider'

function App() {
  return (
    <ThemeProvider 
      defaultTheme="dark" 
      storageKey="pow3r-cashout-theme" 
      attribute="class"
    >
      {/* Your app content */}
    </ThemeProvider>
  )
}
```

## Component Usage

The theme provides outline-focused component styles:

```css
/* Cards with transparent backgrounds */
.card {
  background-color: transparent;
  border: 1px solid hsl(var(--border));
}

/* Outline buttons */
.button-outline {
  background-color: transparent;
  border: 1px solid hsl(var(--primary));
  color: hsl(var(--primary));
}

/* Glass morphism effects */
.glass-effect {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```
