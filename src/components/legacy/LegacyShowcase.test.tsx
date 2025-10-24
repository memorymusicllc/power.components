/**
 * Legacy Showcase Test
 * Tests the legacy components to ensure they work correctly
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { SimpleButton } from './SimpleButton';
import { SimpleCard } from './SimpleCard';
import { SimpleInput } from './SimpleInput';
import { SimpleBadge } from './SimpleBadge';
import { SimpleProgress } from './SimpleProgress';
import { LegacyShowcase } from './LegacyShowcase';

describe('Legacy Components', () => {
  test('SimpleButton renders correctly', () => {
    render(<SimpleButton>Test Button</SimpleButton>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('SimpleCard renders correctly', () => {
    render(<SimpleCard>Test Card</SimpleCard>);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  test('SimpleInput renders correctly', () => {
    render(<SimpleInput placeholder="Test Input" />);
    expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument();
  });

  test('SimpleBadge renders correctly', () => {
    render(<SimpleBadge>Test Badge</SimpleBadge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  test('SimpleProgress renders correctly', () => {
    render(<SimpleProgress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('LegacyShowcase renders without errors', () => {
    render(<LegacyShowcase />);
    expect(screen.getByText('Legacy Components Showcase')).toBeInTheDocument();
  });
});
