import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Minimal build configuration for core v.3 components
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v3: resolve(__dirname, 'ComponentLibrary.v3.tsx'),
      },
      external: [
        // Exclude problematic dependencies
        'framer-motion',
        'react-router-dom',
        'recharts',
        'react-three-fiber',
        'react-flow-renderer',
      ],
    },
  },
  define: {
    // Define environment variables
    'import.meta.env.VITE_ENVIRONMENT': JSON.stringify(process.env.NODE_ENV || 'development'),
    'import.meta.env.CF_PAGES_COMMIT_SHA': JSON.stringify('local'),
    'import.meta.env.CF_PAGES_BRANCH': JSON.stringify('local'),
  },
})
