/**
 * Power Components Library - Version Router
 * Routes between v2 (archived) and v3 (latest) versions
 * 
 * @version 3.0.0
 * @date 2025-01-11
 */

import React, { useState } from 'react'

// Import all versions
import ComponentLibraryV2 from './ComponentLibrary.v2'
import ComponentLibraryV3 from './ComponentLibrary.v3'
import ComponentLibraryV4 from './ComponentLibrary.v4'

// Version Router Component
const VersionRouter: React.FC = () => {
  const [version, setVersion] = useState<'v2' | 'v3' | 'v4'>('v4')
  const [showVersionSelector, setShowVersionSelector] = useState(false)

  const VersionSelector = () => (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Select Version</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setVersion('v2')
              setShowVersionSelector(false)
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              version === 'v2'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <div className="font-medium">v2.0.0 (Archived)</div>
            <div className="text-xs opacity-75">Classic component showcase</div>
          </button>
          <button
            onClick={() => {
              setVersion('v3')
              setShowVersionSelector(false)
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              version === 'v3'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <div className="font-medium">v3.0.0 (AI-Driven)</div>
            <div className="text-xs opacity-75">AI-driven transformation engine</div>
          </button>
          <button
            onClick={() => {
              setVersion('v4')
              setShowVersionSelector(false)
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              version === 'v4'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <div className="font-medium">v4.0.0 (Enhanced)</div>
            <div className="text-xs opacity-75">139 components with outline theme</div>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Version Toggle Button */}
      <button
        onClick={() => setShowVersionSelector(!showVersionSelector)}
        className="fixed top-4 right-4 z-40 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg transition-colors text-sm font-medium"
      >
        {version.toUpperCase()} • Switch
      </button>

      {/* Version Selector Modal */}
      {showVersionSelector && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowVersionSelector(false)}
          />
          <VersionSelector />
        </>
      )}

      {/* Render Selected Version */}
      {version === 'v2' && <ComponentLibraryV2 />}
      {version === 'v3' && <ComponentLibraryV3 />}
      {version === 'v4' && <ComponentLibraryV4 />}
    </>
  )
}

// Main Component Library Component (Version Router)
export default function ComponentLibrary() {
  return <VersionRouter />
}