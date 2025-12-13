/**
 * C4: Accessibility Modes for XMAP Visualization
 * 
 * - Color blind mode (deuteranopia, protanopia, tritanopia, achromatopsia)
 * - Reduced motion mode
 * - High contrast mode
 * - Screen reader support
 */

export interface AccessibilityConfig {
  colorBlindMode: ColorBlindConfig;
  reducedMotion: ReducedMotionConfig;
  highContrast: HighContrastConfig;
  screenReader: ScreenReaderConfig;
}

export interface ColorBlindConfig {
  enabled: boolean;
  type: 'deuteranopia' | 'protanopia' | 'tritanopia' | 'achromatopsia';
  patterns: Record<string, string>;
  shapes: Record<string, string>;
}

export interface ReducedMotionConfig {
  enabled: boolean;
  particleSpeedMultiplier: number;
  disableBloom: boolean;
  disableStreaks: boolean;
  disableWaveforms: boolean;
}

export interface HighContrastConfig {
  enabled: boolean;
  contrastRatio: number;
  backgroundColor: string;
  foregroundColor: string;
}

export interface ScreenReaderConfig {
  enabled: boolean;
  verbosity: 'minimal' | 'normal' | 'verbose';
}

export interface AccessibleSignal {
  originalColor: string;
  adjustedColor: string;
  pattern: string;
  shape: string;
  ariaLabel: string;
}

// Color-safe palettes for different color vision deficiencies
const COLOR_PALETTES: Record<string, Record<string, string>> = {
  deuteranopia: {
    '#00FFFF': '#00B7EB', '#FF00FF': '#E9967A', '#00FF88': '#40E0D0',
    '#0088FF': '#1E90FF', '#FF8800': '#DEB887', '#FF0000': '#FF6B6B',
    '#8800FF': '#9370DB', '#FFD700': '#FFD700', '#00FFCC': '#48D1CC', '#FFFFFF': '#FFFFFF',
  },
  protanopia: {
    '#00FFFF': '#00CED1', '#FF00FF': '#DDA0DD', '#00FF88': '#3CB371',
    '#0088FF': '#4169E1', '#FF8800': '#F0E68C', '#FF0000': '#DC143C',
    '#8800FF': '#9932CC', '#FFD700': '#FFA500', '#00FFCC': '#20B2AA', '#FFFFFF': '#FFFFFF',
  },
  tritanopia: {
    '#00FFFF': '#87CEEB', '#FF00FF': '#FF69B4', '#00FF88': '#98FB98',
    '#0088FF': '#6495ED', '#FF8800': '#FA8072', '#FF0000': '#FF4500',
    '#8800FF': '#DA70D6', '#FFD700': '#FFA07A', '#00FFCC': '#66CDAA', '#FFFFFF': '#FFFFFF',
  },
  achromatopsia: {
    '#00FFFF': '#A0A0A0', '#FF00FF': '#808080', '#00FF88': '#C0C0C0',
    '#0088FF': '#696969', '#FF8800': '#B8B8B8', '#FF0000': '#505050',
    '#8800FF': '#909090', '#FFD700': '#D0D0D0', '#00FFCC': '#989898', '#FFFFFF': '#FFFFFF',
  },
};

const DEFAULT_PATTERNS: Record<string, string> = {
  audio: 'dashed',
  video: 'dotted',
  'text-docs': 'solid',
  'data-service': 'solid',
  'api-request': 'short-dash',
  'api-response': 'long-dash',
  error: 'zigzag',
  observation: 'dotted',
  research: 'solid',
  'xstream-event': 'dashed',
  healing: 'wave',
};

const DEFAULT_SHAPES: Record<string, string> = {
  audio: 'circle',
  video: 'square',
  'text-docs': 'triangle',
  'data-service': 'triangle',
  'api-request': 'pentagon',
  'api-response': 'hexagon',
  error: 'diamond',
  observation: 'circle',
  research: 'star',
  'xstream-event': 'wave',
  healing: 'cross',
};

const ARIA_LABELS: Record<string, string> = {
  audio: 'Audio signal stream',
  video: 'Video signal stream',
  'text-docs': 'Text document signal',
  'data-service': 'Data service connection',
  'api-request': 'API request outbound',
  'api-response': 'API response incoming',
  error: 'Error signal - attention required',
  observation: 'Observation data stream',
  research: 'Research insight signal',
  'xstream-event': 'X-Stream event pulse',
  healing: 'Self-healing action',
};

export class AccessibilityService {
  private config: AccessibilityConfig;
  private listeners: ((config: AccessibilityConfig) => void)[] = [];

  constructor(initial?: Partial<AccessibilityConfig>) {
    this.config = this.createDefault(initial);
    this.detectSystemPreferences();
  }

  private createDefault(overrides?: Partial<AccessibilityConfig>): AccessibilityConfig {
    return {
      colorBlindMode: {
        enabled: false,
        type: 'deuteranopia',
        patterns: DEFAULT_PATTERNS,
        shapes: DEFAULT_SHAPES,
        ...overrides?.colorBlindMode,
      },
      reducedMotion: {
        enabled: false,
        particleSpeedMultiplier: 0.2,
        disableBloom: true,
        disableStreaks: true,
        disableWaveforms: true,
        ...overrides?.reducedMotion,
      },
      highContrast: {
        enabled: false,
        contrastRatio: 7.0,
        backgroundColor: '#000000',
        foregroundColor: '#FFFFFF',
        ...overrides?.highContrast,
      },
      screenReader: {
        enabled: false,
        verbosity: 'normal',
        ...overrides?.screenReader,
      },
    };
  }

  private detectSystemPreferences(): void {
    if (typeof window === 'undefined') return;

    // Reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      this.config.reducedMotion.enabled = true;
      console.log('[Accessibility] Reduced motion preference detected');
    }
    motionQuery.addEventListener('change', (e) => this.setReducedMotion(e.matches));

    // High contrast
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');
    if (contrastQuery.matches) {
      this.config.highContrast.enabled = true;
      console.log('[Accessibility] High contrast preference detected');
    }
    contrastQuery.addEventListener('change', (e) => this.setHighContrast(e.matches));
  }

  getConfig(): AccessibilityConfig {
    return { ...this.config };
  }

  setColorBlindMode(enabled: boolean, type?: ColorBlindConfig['type']): void {
    this.config.colorBlindMode.enabled = enabled;
    if (type) this.config.colorBlindMode.type = type;
    this.notify();
  }

  setReducedMotion(enabled: boolean): void {
    this.config.reducedMotion.enabled = enabled;
    this.notify();
  }

  setHighContrast(enabled: boolean): void {
    this.config.highContrast.enabled = enabled;
    this.notify();
  }

  setScreenReader(enabled: boolean, verbosity?: ScreenReaderConfig['verbosity']): void {
    this.config.screenReader.enabled = enabled;
    if (verbosity) this.config.screenReader.verbosity = verbosity;
    this.notify();
  }

  /**
   * Get accessible properties for a signal type
   */
  getAccessibleSignal(signalType: string, originalColor: string): AccessibleSignal {
    let adjustedColor = originalColor;

    if (this.config.colorBlindMode.enabled) {
      const palette = COLOR_PALETTES[this.config.colorBlindMode.type];
      adjustedColor = palette[originalColor.toUpperCase()] || originalColor;
    }

    if (this.config.highContrast.enabled) {
      adjustedColor = this.enhanceContrast(adjustedColor);
    }

    return {
      originalColor,
      adjustedColor,
      pattern: this.config.colorBlindMode.patterns[signalType] || DEFAULT_PATTERNS[signalType] || 'solid',
      shape: this.config.colorBlindMode.shapes[signalType] || DEFAULT_SHAPES[signalType] || 'circle',
      ariaLabel: ARIA_LABELS[signalType] || `${signalType} signal`,
    };
  }

  /**
   * Get motion parameters respecting reduced motion preference
   */
  getMotionParams(): {
    speedMultiplier: number;
    enableBloom: boolean;
    enableStreaks: boolean;
    enableWaveforms: boolean;
  } {
    if (this.config.reducedMotion.enabled) {
      return {
        speedMultiplier: this.config.reducedMotion.particleSpeedMultiplier,
        enableBloom: !this.config.reducedMotion.disableBloom,
        enableStreaks: !this.config.reducedMotion.disableStreaks,
        enableWaveforms: !this.config.reducedMotion.disableWaveforms,
      };
    }
    return { speedMultiplier: 1.0, enableBloom: true, enableStreaks: true, enableWaveforms: true };
  }

  /**
   * Get ARIA attributes for a node
   */
  getNodeAria(node: { id: string; metadata: { title: string; description?: string }; developmentStatus: { phase: string; completion: number } }): Record<string, string> {
    const { screenReader } = this.config;
    let label = node.metadata.title;

    if (screenReader.enabled) {
      if (screenReader.verbosity === 'verbose') {
        label = `${node.metadata.title}. ${node.metadata.description || ''}. Status: ${node.developmentStatus.phase}, ${Math.round(node.developmentStatus.completion * 100)}% complete.`;
      } else if (screenReader.verbosity === 'normal') {
        label = `${node.metadata.title}. ${node.developmentStatus.phase}.`;
      }
    }

    return {
      'aria-label': label,
      role: 'img',
      tabindex: '0',
    };
  }

  /**
   * Get ARIA attributes for an edge
   */
  getEdgeAria(edge: { id: string; metadata: { label: string }; from: { nodeId: string }; to: { nodeId: string }; status: string }): Record<string, string> {
    const { screenReader } = this.config;
    let label = edge.metadata.label;

    if (screenReader.enabled && screenReader.verbosity === 'verbose') {
      label = `${edge.metadata.label}. From ${edge.from.nodeId} to ${edge.to.nodeId}. Status: ${edge.status}.`;
    }

    return {
      'aria-label': label,
      role: 'img',
    };
  }

  subscribe(listener: (config: AccessibilityConfig) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const idx = this.listeners.indexOf(listener);
      if (idx > -1) this.listeners.splice(idx, 1);
    };
  }

  private enhanceContrast(color: string): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const factor = luminance > 0.5 ? 0.7 : 1.5;
    const newR = Math.min(255, Math.round(r * factor));
    const newG = Math.min(255, Math.round(g * factor));
    const newB = Math.min(255, Math.round(b * factor));
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`.toUpperCase();
  }

  private notify(): void {
    this.listeners.forEach(l => l(this.config));
  }
}

let instance: AccessibilityService | null = null;

export function getAccessibilityService(initial?: Partial<AccessibilityConfig>): AccessibilityService {
  if (!instance) {
    instance = new AccessibilityService(initial);
  }
  return instance;
}
