/**
 * Presentation Checker Agent
 * Verifies UI consistency, accessibility, and presentation quality across all components
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class PresentationCheckerAgent {
  private designSystemCache = new Map<string, any>();

  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('🎨 Presentation Checker Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalComponents = 0;
    let validComponents = 0;

    try {
      // Load design system configuration
      const designSystem = await this.loadDesignSystem();
      
      // Verify component styling consistency
      const stylingResults = await this.verifyStylingConsistency(designSystem);
      totalComponents += stylingResults.total;
      validComponents += stylingResults.valid;
      issues.push(...stylingResults.issues);

      // Verify responsive design
      const responsiveResults = await this.verifyResponsiveDesign();
      totalComponents += responsiveResults.total;
      validComponents += responsiveResults.valid;
      issues.push(...responsiveResults.issues);

      // Verify accessibility compliance
      const accessibilityResults = await this.verifyAccessibilityCompliance();
      totalComponents += accessibilityResults.total;
      validComponents += accessibilityResults.valid;
      issues.push(...accessibilityResults.issues);

      // Verify theme consistency
      const themeResults = await this.verifyThemeConsistency();
      totalComponents += themeResults.total;
      validComponents += themeResults.valid;
      issues.push(...themeResults.issues);

      // Verify animation and interaction consistency
      const animationResults = await this.verifyAnimationConsistency();
      totalComponents += animationResults.total;
      validComponents += animationResults.valid;
      issues.push(...animationResults.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, validComponents, totalComponents));

      const score = totalComponents > 0 ? Math.round((validComponents / totalComponents) * 100) : 100;

      console.log(`✅ Presentation Checker: ${validComponents}/${totalComponents} components valid (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Presentation Checker Agent failed:', error);
      issues.push({
        id: 'presentation-agent-error',
        severity: 'critical',
        category: 'presentation',
        message: `Presentation verification failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async loadDesignSystem(): Promise<any> {
    const designSystemPath = join(process.cwd(), 'src/lib/design-system');
    const designSystem: any = {};

    try {
      // Load design system files
      const files = await glob('src/lib/design-system/**/*.{ts,tsx}', { cwd: process.cwd() });
      
      for (const file of files) {
        const content = readFileSync(join(process.cwd(), file), 'utf-8');
        const fileName = file.split('/').pop()?.replace(/\.(ts|tsx)$/, '') || '';
        designSystem[fileName] = content;
      }
    } catch (error) {
      console.warn('Failed to load design system:', error);
    }

    return designSystem;
  }

  private async verifyStylingConsistency(designSystem: any): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check component files for styling consistency
    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Check for inline styles (should use design system)
        const inlineStyleMatches = content.match(/style\s*=\s*{[\s\S]*?}/g);
        if (inlineStyleMatches && inlineStyleMatches.length > 0) {
          issues.push({
            id: `inline-styles-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'presentation',
            component: componentFile,
            message: 'Component uses inline styles instead of design system',
            suggestion: 'Replace inline styles with design system classes or CSS variables',
            autoFixable: true
          });
        }

        // Check for hardcoded colors
        const hardcodedColors = content.match(/#[0-9a-fA-F]{3,6}|rgb\(|rgba\(|hsl\(/g);
        if (hardcodedColors && hardcodedColors.length > 0) {
          issues.push({
            id: `hardcoded-colors-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'low',
            category: 'presentation',
            component: componentFile,
            message: 'Component uses hardcoded colors instead of design tokens',
            suggestion: 'Use CSS custom properties or design system color tokens',
            autoFixable: true
          });
        }

        // Check for consistent spacing
        const spacingIssues = this.checkSpacingConsistency(content, componentFile);
        issues.push(...spacingIssues);

        // Check for consistent typography
        const typographyIssues = this.checkTypographyConsistency(content, componentFile);
        issues.push(...typographyIssues);

        if (inlineStyleMatches?.length === 0 && hardcodedColors?.length === 0 && spacingIssues.length === 0 && typographyIssues.length === 0) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `styling-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'presentation',
          component: componentFile,
          message: `Failed to check styling consistency: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private checkSpacingConsistency(content: string, componentFile: string): VerificationIssue[] {
    const issues: VerificationIssue[] = [];

    // Check for inconsistent spacing patterns
    const spacingPatterns = [
      /p-\d+/g,  // padding
      /m-\d+/g,  // margin
      /gap-\d+/g, // gap
      /space-[xy]-\d+/g // space between
    ];

    const foundSpacings = new Set<string>();
    
    for (const pattern of spacingPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => foundSpacings.add(match));
      }
    }

    // Check for mixed spacing systems (e.g., both Tailwind and custom)
    const hasTailwindSpacing = Array.from(foundSpacings).some(s => /^[pm]-\d+$/.test(s));
    const hasCustomSpacing = content.includes('padding:') || content.includes('margin:');
    
    if (hasTailwindSpacing && hasCustomSpacing) {
      issues.push({
        id: `mixed-spacing-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
        severity: 'medium',
        category: 'presentation',
        component: componentFile,
        message: 'Component uses mixed spacing systems (Tailwind + custom)',
        suggestion: 'Standardize on one spacing system for consistency',
        autoFixable: true
      });
    }

    return issues;
  }

  private checkTypographyConsistency(content: string, componentFile: string): VerificationIssue[] {
    const issues: VerificationIssue[] = [];

    // Check for hardcoded font sizes
    const hardcodedFontSizes = content.match(/font-size:\s*\d+px|text-\d+/g);
    if (hardcodedFontSizes && hardcodedFontSizes.length > 0) {
      issues.push({
        id: `hardcoded-font-sizes-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
        severity: 'low',
        category: 'presentation',
        component: componentFile,
        message: 'Component uses hardcoded font sizes',
        suggestion: 'Use design system typography scale or CSS custom properties',
        autoFixable: true
      });
    }

    // Check for consistent font weight usage
    const fontWeights = content.match(/font-\w+|font-weight:\s*\w+/g);
    if (fontWeights) {
      const uniqueWeights = new Set(fontWeights);
      if (uniqueWeights.size > 3) {
        issues.push({
          id: `inconsistent-font-weights-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'low',
          category: 'presentation',
          component: componentFile,
          message: 'Component uses too many different font weights',
          suggestion: 'Limit font weights to 2-3 consistent values',
          autoFixable: true
        });
      }
    }

    return issues;
  }

  private async verifyResponsiveDesign(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Check for responsive breakpoints
        const hasResponsiveClasses = content.includes('sm:') || content.includes('md:') || 
                                   content.includes('lg:') || content.includes('xl:');
        
        // Check for mobile-first approach
        const hasMobileFirst = content.includes('mobile:') || content.includes('max-width');
        
        // Check for fixed dimensions that might break on mobile
        const hasFixedDimensions = content.match(/w-\d+|h-\d+|width:\s*\d+px|height:\s*\d+px/g);
        
        if (!hasResponsiveClasses && !hasMobileFirst) {
          issues.push({
            id: `no-responsive-design-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'presentation',
            component: componentFile,
            message: 'Component lacks responsive design considerations',
            suggestion: 'Add responsive breakpoints and mobile-first design',
            autoFixable: true
          });
        } else if (hasFixedDimensions && !hasResponsiveClasses) {
          issues.push({
            id: `fixed-dimensions-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'presentation',
            component: componentFile,
            message: 'Component uses fixed dimensions without responsive alternatives',
            suggestion: 'Add responsive alternatives for fixed dimensions',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `responsive-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'presentation',
          component: componentFile,
          message: `Failed to check responsive design: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async verifyAccessibilityCompliance(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Check for ARIA attributes
        const hasAriaAttributes = content.includes('aria-') || content.includes('role=');
        
        // Check for semantic HTML
        const hasSemanticHTML = content.includes('<button') || content.includes('<nav') || 
                               content.includes('<main') || content.includes('<section');
        
        // Check for alt text on images
        const hasImages = content.includes('<img');
        const hasAltText = content.includes('alt=');
        
        // Check for focus management
        const hasFocusManagement = content.includes('tabIndex') || content.includes('onFocus') || 
                                  content.includes('onBlur');
        
        let componentValid = true;
        
        if (hasImages && !hasAltText) {
          issues.push({
            id: `missing-alt-text-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'presentation',
            component: componentFile,
            message: 'Images missing alt text for accessibility',
            suggestion: 'Add alt text to all images',
            autoFixable: true
          });
          componentValid = false;
        }
        
        if (!hasAriaAttributes && !hasSemanticHTML) {
          issues.push({
            id: `missing-accessibility-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'presentation',
            component: componentFile,
            message: 'Component lacks accessibility attributes',
            suggestion: 'Add ARIA attributes or semantic HTML elements',
            autoFixable: true
          });
          componentValid = false;
        }
        
        if (componentValid) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `accessibility-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'presentation',
          component: componentFile,
          message: `Failed to check accessibility: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async verifyThemeConsistency(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check for theme provider
    const themeProviderPath = join(process.cwd(), 'src/lib/theme-context.tsx');
    if (!existsSync(themeProviderPath)) {
      issues.push({
        id: 'theme-provider-missing',
        severity: 'high',
        category: 'presentation',
        message: 'Theme provider not found',
        suggestion: 'Create theme provider for consistent theming',
        autoFixable: true
      });
      return { total: 0, valid: 0, issues };
    }

    total++;
    valid++;

    // Check components for theme usage
    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Check for CSS custom properties usage
        const hasCSSVariables = content.includes('var(--') || content.includes('hsl(var(--');
        
        // Check for theme context usage
        const hasThemeContext = content.includes('useTheme') || content.includes('ThemeProvider');
        
        if (!hasCSSVariables && !hasThemeContext) {
          issues.push({
            id: `no-theme-usage-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'low',
            category: 'presentation',
            component: componentFile,
            message: 'Component not using theme system',
            suggestion: 'Use CSS custom properties or theme context for theming',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `theme-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'presentation',
          component: componentFile,
          message: `Failed to check theme consistency: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async verifyAnimationConsistency(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Check for animation classes
        const hasAnimations = content.includes('animate-') || content.includes('transition-') || 
                             content.includes('duration-') || content.includes('ease-');
        
        // Check for consistent animation timing
        const animationTimings = content.match(/duration-\d+|delay-\d+/g);
        if (animationTimings) {
          const uniqueTimings = new Set(animationTimings);
          if (uniqueTimings.size > 5) {
            issues.push({
              id: `inconsistent-animation-timing-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'low',
              category: 'presentation',
              component: componentFile,
              message: 'Component uses too many different animation timings',
              suggestion: 'Standardize animation timings for consistency',
              autoFixable: true
            });
          }
        }
        
        if (hasAnimations) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `animation-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'presentation',
          component: componentFile,
          message: `Failed to check animation consistency: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private generateRecommendations(issues: VerificationIssue[], validComponents: number, totalComponents: number): string[] {
    const recommendations: string[] = [];

    if (validComponents < totalComponents) {
      recommendations.push(`Improve presentation quality: ${totalComponents - validComponents} components need presentation fixes`);
    }

    const stylingIssues = issues.filter(i => i.message.includes('style') || i.message.includes('color'));
    if (stylingIssues.length > 0) {
      recommendations.push('Standardize styling approach using design system tokens');
    }

    const responsiveIssues = issues.filter(i => i.message.includes('responsive'));
    if (responsiveIssues.length > 0) {
      recommendations.push('Implement consistent responsive design patterns');
    }

    const accessibilityIssues = issues.filter(i => i.message.includes('accessibility') || i.message.includes('alt'));
    if (accessibilityIssues.length > 0) {
      recommendations.push('Improve accessibility compliance across all components');
    }

    const themeIssues = issues.filter(i => i.message.includes('theme'));
    if (themeIssues.length > 0) {
      recommendations.push('Ensure consistent theme usage across all components');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    const result = await this.verify({ componentId });
    return {
      agentId: 'presentation-checker',
      agentName: 'Presentation Checker',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}
