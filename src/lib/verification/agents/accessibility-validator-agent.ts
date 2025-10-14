/**
 * Accessibility Validator Agent
 * Validates accessibility compliance across all components
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class AccessibilityValidatorAgent {
  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('♿ Accessibility Validator Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalComponents = 0;
    let accessibleComponents = 0;

    try {
      // Check ARIA compliance
      const ariaResults = await this.checkAriaCompliance();
      totalComponents += ariaResults.total;
      accessibleComponents += ariaResults.valid;
      issues.push(...ariaResults.issues);

      // Check keyboard navigation
      const keyboardResults = await this.checkKeyboardNavigation();
      totalComponents += keyboardResults.total;
      accessibleComponents += keyboardResults.valid;
      issues.push(...keyboardResults.issues);

      // Check semantic HTML
      const semanticResults = await this.checkSemanticHTML();
      totalComponents += semanticResults.total;
      accessibleComponents += semanticResults.valid;
      issues.push(...semanticResults.issues);

      // Check color contrast
      const contrastResults = await this.checkColorContrast();
      totalComponents += contrastResults.total;
      accessibleComponents += contrastResults.valid;
      issues.push(...contrastResults.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, accessibleComponents, totalComponents));

      const score = totalComponents > 0 ? Math.round((accessibleComponents / totalComponents) * 100) : 100;

      console.log(`✅ Accessibility Validator: ${accessibleComponents}/${totalComponents} components accessible (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Accessibility Validator Agent failed:', error);
      issues.push({
        id: 'accessibility-agent-error',
        severity: 'critical',
        category: 'accessibility',
        message: `Accessibility verification failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async checkAriaCompliance(): Promise<{
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
        const hasAriaAttributes = content.includes('aria-');
        const hasRole = content.includes('role=');
        const hasAriaLabel = content.includes('aria-label') || content.includes('aria-labelledby');
        
        // Check for proper ARIA usage
        const hasProperAria = hasAriaAttributes || hasRole || hasAriaLabel;
        
        if (!hasProperAria) {
          issues.push({
            id: `no-aria-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'accessibility',
            component: componentFile,
            message: 'Component missing ARIA attributes for accessibility',
            suggestion: 'Add appropriate ARIA attributes for screen readers',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `aria-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'accessibility',
          component: componentFile,
          message: `Failed to check ARIA compliance: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkKeyboardNavigation(): Promise<{
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
        
        // Check for keyboard event handlers
        const hasKeyboardEvents = content.includes('onKeyDown') || content.includes('onKeyUp') || 
                                 content.includes('onKeyPress');
        
        // Check for focus management
        const hasFocusManagement = content.includes('tabIndex') || content.includes('onFocus') || 
                                  content.includes('onBlur');
        
        // Check for interactive elements
        const hasInteractiveElements = content.includes('<button') || content.includes('<input') || 
                                      content.includes('<select') || content.includes('<textarea');
        
        if (hasInteractiveElements && !hasKeyboardEvents && !hasFocusManagement) {
          issues.push({
            id: `no-keyboard-nav-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'accessibility',
            component: componentFile,
            message: 'Interactive component missing keyboard navigation support',
            suggestion: 'Add keyboard event handlers and focus management',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `keyboard-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'accessibility',
          component: componentFile,
          message: `Failed to check keyboard navigation: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkSemanticHTML(): Promise<{
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
        
        // Check for semantic HTML elements
        const hasSemanticElements = content.includes('<main') || content.includes('<section') || 
                                   content.includes('<article') || content.includes('<nav') || 
                                   content.includes('<header') || content.includes('<footer');
        
        // Check for proper heading structure
        const hasHeadings = content.includes('<h1') || content.includes('<h2') || 
                           content.includes('<h3') || content.includes('<h4');
        
        // Check for proper form elements
        const hasFormElements = content.includes('<form') || content.includes('<fieldset') || 
                               content.includes('<legend');
        
        if (!hasSemanticElements && !hasHeadings && !hasFormElements) {
          issues.push({
            id: `no-semantic-html-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'accessibility',
            component: componentFile,
            message: 'Component not using semantic HTML elements',
            suggestion: 'Use semantic HTML elements for better accessibility',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `semantic-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'accessibility',
          component: componentFile,
          message: `Failed to check semantic HTML: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkColorContrast(): Promise<{
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
        
        // Check for hardcoded colors that might have contrast issues
        const hasHardcodedColors = content.match(/#[0-9a-fA-F]{3,6}|rgb\(|rgba\(|hsl\(/g);
        
        // Check for CSS custom properties (better for theming)
        const hasCSSVariables = content.includes('var(--') || content.includes('hsl(var(--');
        
        if (hasHardcodedColors && !hasCSSVariables) {
          issues.push({
            id: `hardcoded-colors-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'low',
            category: 'accessibility',
            component: componentFile,
            message: 'Component uses hardcoded colors that may have contrast issues',
            suggestion: 'Use CSS custom properties for better color contrast control',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `contrast-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'accessibility',
          component: componentFile,
          message: `Failed to check color contrast: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private generateRecommendations(issues: VerificationIssue[], accessibleComponents: number, totalComponents: number): string[] {
    const recommendations: string[] = [];

    if (accessibleComponents < totalComponents) {
      recommendations.push(`Improve accessibility: ${totalComponents - accessibleComponents} components need accessibility fixes`);
    }

    const ariaIssues = issues.filter(i => i.message.includes('ARIA'));
    if (ariaIssues.length > 0) {
      recommendations.push('Add ARIA attributes to improve screen reader support');
    }

    const keyboardIssues = issues.filter(i => i.message.includes('keyboard'));
    if (keyboardIssues.length > 0) {
      recommendations.push('Implement keyboard navigation for all interactive components');
    }

    const semanticIssues = issues.filter(i => i.message.includes('semantic'));
    if (semanticIssues.length > 0) {
      recommendations.push('Use semantic HTML elements for better accessibility');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    const result = await this.verify({ componentId });
    return {
      agentId: 'accessibility-validator',
      agentName: 'Accessibility Validator',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}
