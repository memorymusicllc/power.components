/**
 * Self-Healing Validator Agent
 * Validates self-healing capabilities across all components
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class SelfHealingValidatorAgent {
  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('🔧 Self-Healing Validator Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalComponents = 0;
    let selfHealingComponents = 0;

    try {
      // Check self-healing configuration
      const configResults = await this.checkSelfHealingConfiguration();
      totalComponents += configResults.total;
      selfHealingComponents += configResults.valid;
      issues.push(...configResults.issues);

      // Check error recovery mechanisms
      const recoveryResults = await this.checkErrorRecoveryMechanisms();
      totalComponents += recoveryResults.total;
      selfHealingComponents += recoveryResults.valid;
      issues.push(...recoveryResults.issues);

      // Check monitoring and metrics
      const monitoringResults = await this.checkMonitoringAndMetrics();
      totalComponents += monitoringResults.total;
      selfHealingComponents += monitoringResults.valid;
      issues.push(...monitoringResults.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, selfHealingComponents, totalComponents));

      const score = totalComponents > 0 ? Math.round((selfHealingComponents / totalComponents) * 100) : 100;

      console.log(`✅ Self-Healing Validator: ${selfHealingComponents}/${totalComponents} components self-healing (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Self-Healing Validator Agent failed:', error);
      issues.push({
        id: 'self-healing-agent-error',
        severity: 'critical',
        category: 'schema',
        message: `Self-healing verification failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async checkSelfHealingConfiguration(): Promise<{
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
        
        // Check for self-healing configuration
        const hasSelfHealingConfig = content.includes('selfHealing') || content.includes('SELF_HEALING');
        
        // Check for failure conditions
        const hasFailureConditions = content.includes('failureCondition') || content.includes('FAILURE_CONDITION');
        
        // Check for repair prompts
        const hasRepairPrompts = content.includes('repairPrompt') || content.includes('REPAIR_PROMPT');
        
        // Check for monitored metrics
        const hasMonitoredMetrics = content.includes('monitoredMetrics') || content.includes('MONITORED_METRICS');
        
        if (!hasSelfHealingConfig) {
          issues.push({
            id: `no-self-healing-config-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'schema',
            component: componentFile,
            message: 'Component missing self-healing configuration',
            suggestion: 'Add self-healing configuration for automated error recovery',
            autoFixable: true
          });
        }
        
        if (!hasFailureConditions) {
          issues.push({
            id: `no-failure-conditions-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'schema',
            component: componentFile,
            message: 'Component missing failure condition definitions',
            suggestion: 'Define failure conditions for self-healing triggers',
            autoFixable: true
          });
        }
        
        if (!hasRepairPrompts) {
          issues.push({
            id: `no-repair-prompts-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'schema',
            component: componentFile,
            message: 'Component missing repair prompt definitions',
            suggestion: 'Add repair prompts for automated error resolution',
            autoFixable: true
          });
        }
        
        if (hasSelfHealingConfig && hasFailureConditions && hasRepairPrompts && hasMonitoredMetrics) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `self-healing-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'schema',
          component: componentFile,
          message: `Failed to check self-healing configuration: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkErrorRecoveryMechanisms(): Promise<{
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
        
        // Check for error boundaries
        const hasErrorBoundary = content.includes('ErrorBoundary') || content.includes('withErrorBoundary');
        
        // Check for try-catch blocks
        const hasTryCatch = content.includes('try') && content.includes('catch');
        
        // Check for fallback UI
        const hasFallbackUI = content.includes('fallback') || content.includes('Fallback');
        
        // Check for retry mechanisms
        const hasRetryMechanism = content.includes('retry') || content.includes('Retry');
        
        if (!hasErrorBoundary && !hasTryCatch) {
          issues.push({
            id: `no-error-recovery-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'schema',
            component: componentFile,
            message: 'Component missing error recovery mechanisms',
            suggestion: 'Add error boundaries or try-catch blocks for error recovery',
            autoFixable: true
          });
        }
        
        if (!hasFallbackUI) {
          issues.push({
            id: `no-fallback-ui-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'schema',
            component: componentFile,
            message: 'Component missing fallback UI for error states',
            suggestion: 'Add fallback UI for better error handling',
            autoFixable: true
          });
        }
        
        if ((hasErrorBoundary || hasTryCatch) && hasFallbackUI) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `error-recovery-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'schema',
          component: componentFile,
          message: `Failed to check error recovery: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkMonitoringAndMetrics(): Promise<{
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
        
        // Check for metrics tracking
        const hasMetrics = content.includes('metrics') || content.includes('Metrics');
        
        // Check for observability
        const hasObservability = content.includes('observability') || content.includes('Observability');
        
        // Check for performance monitoring
        const hasPerformanceMonitoring = content.includes('performance') || content.includes('Performance');
        
        // Check for health checks
        const hasHealthChecks = content.includes('health') || content.includes('Health');
        
        if (!hasMetrics && !hasObservability) {
          issues.push({
            id: `no-monitoring-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'schema',
            component: componentFile,
            message: 'Component missing monitoring and metrics',
            suggestion: 'Add metrics tracking and observability for self-healing',
            autoFixable: true
          });
        }
        
        if (!hasPerformanceMonitoring) {
          issues.push({
            id: `no-performance-monitoring-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'low',
            category: 'schema',
            component: componentFile,
            message: 'Component missing performance monitoring',
            suggestion: 'Add performance monitoring for self-healing triggers',
            autoFixable: true
          });
        }
        
        if ((hasMetrics || hasObservability) && hasPerformanceMonitoring) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `monitoring-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'schema',
          component: componentFile,
          message: `Failed to check monitoring: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private generateRecommendations(issues: VerificationIssue[], selfHealingComponents: number, totalComponents: number): string[] {
    const recommendations: string[] = [];

    if (selfHealingComponents < totalComponents) {
      recommendations.push(`Improve self-healing: ${totalComponents - selfHealingComponents} components need self-healing capabilities`);
    }

    const configIssues = issues.filter(i => i.message.includes('configuration'));
    if (configIssues.length > 0) {
      recommendations.push('Add self-healing configuration to all components');
    }

    const recoveryIssues = issues.filter(i => i.message.includes('recovery'));
    if (recoveryIssues.length > 0) {
      recommendations.push('Implement error recovery mechanisms across all components');
    }

    const monitoringIssues = issues.filter(i => i.message.includes('monitoring'));
    if (monitoringIssues.length > 0) {
      recommendations.push('Add monitoring and metrics for self-healing triggers');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    const result = await this.verify({ componentId });
    return {
      agentId: 'self-healing-validator',
      agentName: 'Self-Healing Validator',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}

