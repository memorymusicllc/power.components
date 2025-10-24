# Legacy Components

Components recreated in the older theme style that was lost during refactoring.

## Overview

These components are designed to match the styling approach from the older deployment at [https://25a5b9ca.cashruleseverythingaroundme.pages.dev/library](https://25a5b9ca.cashruleseverythingaroundme.pages.dev/library). They provide a simpler, more straightforward approach compared to the complex v3 system.

## Components

### SimpleButton
A basic button component with multiple variants and sizes.

```tsx
import { SimpleButton } from 'power.components/legacy';

<SimpleButton variant="primary" size="md">
  Click Me
</SimpleButton>
```

### SimpleCard
A basic card component for content containers.

```tsx
import { SimpleCard } from 'power.components/legacy';

<SimpleCard variant="default" padding="md">
  Card content
</SimpleCard>
```

### SimpleInput
A basic input component with different variants.

```tsx
import { SimpleInput } from 'power.components/legacy';

<SimpleInput placeholder="Enter text" variant="default" />
```

### SimpleBadge
A simple badge component for labels and status indicators.

```tsx
import { SimpleBadge } from 'power.components/legacy';

<SimpleBadge variant="success">Active</SimpleBadge>
```

### SimpleProgress
A progress bar component for showing completion status.

```tsx
import { SimpleProgress } from 'power.components/legacy';

<SimpleProgress value={75} variant="success" showValue />
```

## Showcase

Use the `LegacyShowcase` component to see all components in action:

```tsx
import { LegacyShowcase } from 'power.components/legacy';

<LegacyShowcase />
```

## Theme

The legacy components use a simpler theme approach with:
- Standard color palette (blue, gray, green, yellow, red)
- Basic spacing and sizing
- Simple shadows and borders
- Clean typography

## Usage

These components are designed to be:
- Simple and straightforward
- Easy to customize
- Lightweight
- Compatible with the older theme style

They provide an alternative to the complex v3 system for users who prefer the simpler approach.
