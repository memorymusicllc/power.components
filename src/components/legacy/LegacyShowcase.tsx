/**
 * Legacy Component Showcase
 * Demonstrates the older theme style components
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import React from 'react';
import { SimpleButton } from './SimpleButton';
import { SimpleCard } from './SimpleCard';
import { SimpleInput } from './SimpleInput';
import { SimpleBadge } from './SimpleBadge';
import { SimpleProgress } from './SimpleProgress';

export const LegacyShowcase: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Legacy Components Showcase
          </h1>
          <p className="text-gray-600">
            Components recreated in the older theme style that was lost during refactoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buttons Section */}
          <SimpleCard>
            <h2 className="text-xl font-semibold mb-4">Buttons</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <SimpleButton variant="primary">Primary</SimpleButton>
                <SimpleButton variant="secondary">Secondary</SimpleButton>
                <SimpleButton variant="outline">Outline</SimpleButton>
                <SimpleButton variant="ghost">Ghost</SimpleButton>
              </div>
              <div className="flex flex-wrap gap-2">
                <SimpleButton size="sm">Small</SimpleButton>
                <SimpleButton size="md">Medium</SimpleButton>
                <SimpleButton size="lg">Large</SimpleButton>
              </div>
            </div>
          </SimpleCard>

          {/* Inputs Section */}
          <SimpleCard>
            <h2 className="text-xl font-semibold mb-4">Inputs</h2>
            <div className="space-y-4">
              <SimpleInput placeholder="Default input" />
              <SimpleInput variant="outline" placeholder="Outline input" />
              <SimpleInput variant="filled" placeholder="Filled input" />
              <div className="flex gap-2">
                <SimpleInput size="sm" placeholder="Small" />
                <SimpleInput size="md" placeholder="Medium" />
                <SimpleInput size="lg" placeholder="Large" />
              </div>
            </div>
          </SimpleCard>

          {/* Badges Section */}
          <SimpleCard>
            <h2 className="text-xl font-semibold mb-4">Badges</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <SimpleBadge variant="default">Default</SimpleBadge>
                <SimpleBadge variant="success">Success</SimpleBadge>
                <SimpleBadge variant="warning">Warning</SimpleBadge>
                <SimpleBadge variant="error">Error</SimpleBadge>
                <SimpleBadge variant="info">Info</SimpleBadge>
              </div>
              <div className="flex flex-wrap gap-2">
                <SimpleBadge size="sm">Small</SimpleBadge>
                <SimpleBadge size="md">Medium</SimpleBadge>
                <SimpleBadge size="lg">Large</SimpleBadge>
              </div>
            </div>
          </SimpleCard>

          {/* Progress Section */}
          <SimpleCard>
            <h2 className="text-xl font-semibold mb-4">Progress</h2>
            <div className="space-y-4">
              <SimpleProgress value={25} variant="default" showValue />
              <SimpleProgress value={50} variant="success" showValue />
              <SimpleProgress value={75} variant="warning" showValue />
              <SimpleProgress value={90} variant="error" showValue />
              <div className="space-y-2">
                <SimpleProgress value={30} size="sm" />
                <SimpleProgress value={60} size="md" />
                <SimpleProgress value={80} size="lg" />
              </div>
            </div>
          </SimpleCard>

          {/* Cards Section */}
          <SimpleCard variant="elevated">
            <h2 className="text-xl font-semibold mb-4">Card Variants</h2>
            <div className="space-y-4">
              <SimpleCard variant="default" padding="sm">
                <p className="text-sm text-gray-600">Default card with small padding</p>
              </SimpleCard>
              <SimpleCard variant="outlined" padding="md">
                <p className="text-sm text-gray-600">Outlined card with medium padding</p>
              </SimpleCard>
            </div>
          </SimpleCard>

          {/* Combined Example */}
          <SimpleCard>
            <h2 className="text-xl font-semibold mb-4">Combined Example</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <SimpleInput placeholder="Enter your name" />
                <SimpleButton variant="primary">Submit</SimpleButton>
              </div>
              <div className="flex items-center gap-2">
                <SimpleBadge variant="success">Active</SimpleBadge>
                <SimpleProgress value={65} variant="success" />
              </div>
            </div>
          </SimpleCard>
        </div>
      </div>
    </div>
  );
};

export default LegacyShowcase;
