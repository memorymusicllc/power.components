/**
 * Performance Monitor Agent
 * Monitors and verifies performance metrics across all components
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class PerformanceMonitorAgent {
  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('⚡ Performance Monitor Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalChecks = 0;
    let passedChecks = 0;

    try {
      // Check performance optimizations
      const optimizationResults = await this.checkPerformanceOptimizations();
      totalChecks += optimizationResults.total;
      passedChecks += optimizationResults.valid;
      issues.push(...optimizationResults.issues);

      // Check bundle size impact
      const bundleResults = await this.checkBundleSizeImpact();
      totalChecks += bundleResults.total;
      passedChecks += bundleResults.valid;
      issues.push(...bundleResults.issues);

      // Check memory usage patterns
      const memoryResults = await this.checkMemoryUsagePatterns();
      totalChecks += memoryResults.total;
      passedChecks += memoryResults.valid;
      issues.push(...memoryResults.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, passedChecks, totalChecks));

      const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;

      console.log(`✅ Performance Monitor: ${passedChecks}/${totalChecks} checks passed (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Performance Monitor Agent failed:', error);
      issues.push({
        id: 'performance-agent-error',
        severity: 'critical',
        category: 'performance',
        message: `Performance monitoring failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async checkPerformanceOptimizations(): Promise<{
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
        
        // Check for React.memo usage
        const hasMemo = content.includes('React.memo') || content.includes('memo(');
        
        // Check for useMemo/useCallback usage
        const hasHooks = content.includes('useMemo') || content.includes('useCallback');
        
        // Check for lazy loading
        const hasLazyLoading = content.includes('lazy(') || content.includes('Suspense');
        
        // Check for code splitting
        const hasCodeSplitting = content.includes('import(') || content.includes('dynamic');
        
        let componentValid = true;
        
        if (!hasMemo && !hasHooks) {
          issues.push({
            id: `no-performance-optimization-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'performance',
            component: componentFile,
            message: 'Component missing performance optimizations',
            suggestion: 'Add React.memo, useMemo, or useCallback for optimization',
            autoFixable: true
          });
          componentValid = false;
        }
        
        if (componentValid) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `performance-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'performance',
          component: componentFile,
          message: `Failed to check performance: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkBundleSizeImpact(): Promise<{
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
        
        // Check for large imports
        const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
        const hasLargeImports = importLines.some(line => 
          line.includes('lodash') || line.includes('moment') || line.includes('date-fns')
        );
        
        // Check for tree shaking
        const hasTreeShaking = importLines.some(line => 
          line.includes('{') && line.includes('}') && !line.includes('*')
        );
        
        if (hasLargeImports) {
          issues.push({
            id: `large-imports-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'performance',
            component: componentFile,
            message: 'Component imports large libraries that may impact bundle size',
            suggestion: 'Consider using tree-shakable alternatives or dynamic imports',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `bundle-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'performance',
          component: componentFile,
          message: `Failed to check bundle impact: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkMemoryUsagePatterns(): Promise<{
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
        
        // Check for memory leaks
        const hasEventListeners = content.includes('addEventListener');
        const hasCleanup = content.includes('removeEventListener') || content.includes('useEffect') && content.includes('return');
        
        // Check for proper cleanup
        const hasProperCleanup = content.includes('useEffect') && content.includes('return () =>');
        
        if (hasEventListeners && !hasCleanup) {
          issues.push({
            id: `memory-leak-risk-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'performance',
            component: componentFile,
            message: 'Component may have memory leaks from event listeners',
            suggestion: 'Add proper cleanup for event listeners',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `memory-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'performance',
          component: componentFile,
          message: `Failed to check memory usage: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private generateRecommendations(issues: VerificationIssue[], passedChecks: number, totalChecks: number): string[] {
    const recommendations: string[] = [];

    if (passedChecks < totalChecks) {
      recommendations.push(`Improve performance: ${totalChecks - passedChecks} components need optimization`);
    }

    const optimizationIssues = issues.filter(i => i.message.includes('optimization'));
    if (optimizationIssues.length > 0) {
      recommendations.push('Add performance optimizations like React.memo and useMemo');
    }

    const bundleIssues = issues.filter(i => i.message.includes('bundle'));
    if (bundleIssues.length > 0) {
      recommendations.push('Optimize bundle size by using tree-shakable imports');
    }

    const memoryIssues = issues.filter(i => i.message.includes('memory'));
    if (memoryIssues.length > 0) {
      recommendations.push('Fix potential memory leaks with proper cleanup');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    const result = await this.verify({ componentId });
    return {
      agentId: 'performance-monitor',
      agentName: 'Performance Monitor',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}
