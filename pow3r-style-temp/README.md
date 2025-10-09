# POW3R Style Library

This repository contains the CSS styles and theme definitions for the POW3R Cashout application.

## Files

- `globals-src.css` - **Basic Outline Theme** - Comprehensive theme CSS with light/dark mode support and outline-focused component styles

## Features

### globals-src.css (Basic Outline Theme)
- **Theme Name: Basic Outline Theme** - A minimalist, outline-focused theme
- Complete theme system with light and dark modes
- Extended color palette including success, warning, and info colors
- Outline-focused component styles for transparent backgrounds with borders
- Custom animations and effects
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
