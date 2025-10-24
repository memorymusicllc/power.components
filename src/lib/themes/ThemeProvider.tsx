/**
 * Enhanced Theme Provider with Outline Theme Support
 * Supports multiple themes including the new Outline theme
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { outlineTheme, outlineThemeCSS } from './outline-theme';

export type Theme = 'light' | 'dark' | 'outline' | 'auto';
export type ThemeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

interface ThemeContextType {
  theme: Theme;
  variant: ThemeVariant;
  setTheme: (theme: Theme) => void;
  setVariant: (variant: ThemeVariant) => void;
  isOutline: boolean;
  isDark: boolean;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultVariant?: ThemeVariant;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'outline',
  defaultVariant = 'default',
  storageKey = 'power-components-theme'
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [variant, setVariantState] = useState<ThemeVariant>(defaultVariant);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    const storedVariant = localStorage.getItem(`${storageKey}-variant`) as ThemeVariant;
    
    if (storedTheme) {
      setThemeState(storedTheme);
    }
    if (storedVariant) {
      setVariantState(storedVariant);
    }
  }, [storageKey]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark', 'outline');
    
    // Apply current theme
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
    
    // Apply outline theme CSS if needed
    if (theme === 'outline') {
      const styleId = 'outline-theme-css';
      let styleElement = document.getElementById(styleId);
      
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }
      
      styleElement.textContent = outlineThemeCSS;
    } else {
      // Remove outline theme CSS
      const styleElement = document.getElementById('outline-theme-css');
      if (styleElement) {
        styleElement.remove();
      }
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  const setVariant = (newVariant: ThemeVariant) => {
    setVariantState(newVariant);
    localStorage.setItem(`${storageKey}-variant`, newVariant);
  };

  const isOutline = theme === 'outline';
  const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isLight = theme === 'light' || (theme === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);

  const value: ThemeContextType = {
    theme,
    variant,
    setTheme,
    setVariant,
    isOutline,
    isDark,
    isLight
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme selector component
export const ThemeSelector: React.FC = () => {
  const { theme, variant, setTheme, setVariant } = useTheme();

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex items-center gap-2">
        <label htmlFor="theme-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Theme:
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="outline">Outline</option>
          <option value="auto">Auto</option>
        </select>
      </div>
      
      {theme === 'outline' && (
        <div className="flex items-center gap-2">
          <label htmlFor="variant-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Variant:
          </label>
          <select
            id="variant-select"
            value={variant}
            onChange={(e) => setVariant(e.target.value as ThemeVariant)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
          >
            <option value="default">Default</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="info">Info</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default ThemeProvider;
