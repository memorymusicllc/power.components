/**
 * Integration Verifier Agent
 * Verifies that all components are properly integrated with their data sources,
 * APIs, and other components according to their config schemas
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class IntegrationVerifierAgent {
  private integrationCache = new Map<string, any>();

  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('🔗 Integration Verifier Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalIntegrations = 0;
    let validIntegrations = 0;

    try {
      // Load main config to understand component relationships
      const mainConfig = await this.loadMainConfig();
      if (!mainConfig) {
        issues.push({
          id: 'integration-main-config-missing',
          severity: 'critical',
          category: 'integration',
          message: 'Main configuration not found for integration verification',
          autoFixable: false
        });
        return { score: 0, issues, recommendations };
      }

      // Verify component-to-component integrations
      const componentIntegrations = await this.verifyComponentIntegrations(mainConfig);
      totalIntegrations += componentIntegrations.total;
      validIntegrations += componentIntegrations.valid;
      issues.push(...componentIntegrations.issues);

      // Verify data source integrations
      const dataIntegrations = await this.verifyDataIntegrations();
      totalIntegrations += dataIntegrations.total;
      validIntegrations += dataIntegrations.valid;
      issues.push(...dataIntegrations.issues);

      // Verify API integrations
      const apiIntegrations = await this.verifyApiIntegrations();
      totalIntegrations += apiIntegrations.total;
      validIntegrations += apiIntegrations.valid;
      issues.push(...apiIntegrations.issues);

      // Verify workflow integrations
      const workflowIntegrations = await this.verifyWorkflowIntegrations(mainConfig);
      totalIntegrations += workflowIntegrations.total;
      validIntegrations += workflowIntegrations.valid;
      issues.push(...workflowIntegrations.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, validIntegrations, totalIntegrations));

      const score = totalIntegrations > 0 ? Math.round((validIntegrations / totalIntegrations) * 100) : 100;

      console.log(`✅ Integration Verifier: ${validIntegrations}/${totalIntegrations} integrations valid (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Integration Verifier Agent failed:', error);
      issues.push({
        id: 'integration-agent-error',
        severity: 'critical',
        category: 'integration',
        message: `Integration verification failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async loadMainConfig(): Promise<any> {
    const configPath = join(process.cwd(), 'pow3r.v3.config.json');
    if (!existsSync(configPath)) {
      return null;
    }

    try {
      const configContent = readFileSync(configPath, 'utf-8');
      return JSON.parse(configContent);
    } catch (error) {
      console.error('Failed to load main config:', error);
      return null;
    }
  }

  private async verifyComponentIntegrations(mainConfig: any): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    if (!mainConfig.edges || !Array.isArray(mainConfig.edges)) {
      issues.push({
        id: 'integration-no-edges',
        severity: 'high',
        category: 'integration',
        message: 'No component edges defined in main config',
        suggestion: 'Define component relationships in edges array',
        autoFixable: true
      });
      return { total: 0, valid: 0, issues };
    }

    for (const edge of mainConfig.edges) {
      total++;
      
      // Verify edge structure
      if (!edge.from || !edge.to) {
        issues.push({
          id: `integration-invalid-edge-${total}`,
          severity: 'high',
          category: 'integration',
          message: 'Invalid edge structure - missing from/to properties',
          suggestion: 'Ensure all edges have from and to properties',
          autoFixable: true
        });
        continue;
      }

      // Verify source component exists
      const sourceNode = mainConfig.nodes?.find((n: any) => n.id === edge.from.nodeId);
      if (!sourceNode) {
        issues.push({
          id: `integration-source-missing-${edge.from.nodeId}`,
          severity: 'critical',
          category: 'integration',
          message: `Source component '${edge.from.nodeId}' not found`,
          suggestion: `Add component '${edge.from.nodeId}' to nodes array`,
          autoFixable: true
        });
        continue;
      }

      // Verify target component exists
      const targetNode = mainConfig.nodes?.find((n: any) => n.id === edge.to.nodeId);
      if (!targetNode) {
        issues.push({
          id: `integration-target-missing-${edge.to.nodeId}`,
          severity: 'critical',
          category: 'integration',
          message: `Target component '${edge.to.nodeId}' not found`,
          suggestion: `Add component '${edge.to.nodeId}' to nodes array`,
          autoFixable: true
        });
        continue;
      }

      // Verify port compatibility
      const portIssues = this.verifyPortCompatibility(edge, sourceNode, targetNode);
      issues.push(...portIssues);

      if (portIssues.length === 0) {
        valid++;
      }
    }

    return { total, valid, issues };
  }

  private verifyPortCompatibility(edge: any, sourceNode: any, targetNode: any): VerificationIssue[] {
    const issues: VerificationIssue[] = [];

    // Check if source port exists
    const sourceOutput = sourceNode.io?.outputs?.find((o: any) => o.name === edge.from.port);
    if (!sourceOutput) {
      issues.push({
        id: `integration-source-port-missing-${edge.from.nodeId}-${edge.from.port}`,
        severity: 'high',
        category: 'integration',
        message: `Source port '${edge.from.port}' not found in component '${edge.from.nodeId}'`,
        suggestion: `Add output port '${edge.from.port}' to component '${edge.from.nodeId}'`,
        autoFixable: true
      });
    }

    // Check if target port exists
    const targetInput = targetNode.io?.inputs?.find((i: any) => i.name === edge.to.port);
    if (!targetInput) {
      issues.push({
        id: `integration-target-port-missing-${edge.to.nodeId}-${edge.to.port}`,
        severity: 'high',
        category: 'integration',
        message: `Target port '${edge.to.port}' not found in component '${edge.to.nodeId}'`,
        suggestion: `Add input port '${edge.to.port}' to component '${edge.to.nodeId}'`,
        autoFixable: true
      });
    }

    // Check data type compatibility
    if (sourceOutput && targetInput) {
      if (sourceOutput.dtype !== targetInput.dtype) {
        issues.push({
          id: `integration-type-mismatch-${edge.from.nodeId}-${edge.to.nodeId}`,
          severity: 'medium',
          category: 'integration',
          message: `Data type mismatch: ${sourceOutput.dtype} -> ${targetInput.dtype}`,
          suggestion: 'Ensure compatible data types between connected components',
          autoFixable: false
        });
      }
    }

    return issues;
  }

  private async verifyDataIntegrations(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check chart components for data integration
    const chartFiles = await glob('src/components/charts/*.tsx', { cwd: process.cwd() });
    
    for (const chartFile of chartFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), chartFile), 'utf-8');
        
        // Check for hardcoded data vs dynamic data
        const hasHardcodedData = content.includes('const data = [') || content.includes('const data = {');
        const hasDynamicData = content.includes('useState') || content.includes('useEffect') || content.includes('props.data');
        
        if (hasHardcodedData && !hasDynamicData) {
          issues.push({
            id: `data-hardcoded-${chartFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'integration',
            component: chartFile,
            message: 'Chart component uses hardcoded data instead of dynamic data source',
            suggestion: 'Implement dynamic data loading from props or API',
            autoFixable: true
          });
        } else {
          valid++;
        }

        // Check for data validation
        if (!content.includes('validation') && !content.includes('validate')) {
          issues.push({
            id: `data-validation-missing-${chartFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'low',
            category: 'integration',
            component: chartFile,
            message: 'Chart component missing data validation',
            suggestion: 'Add data validation to ensure data integrity',
            autoFixable: true
          });
        }

      } catch (error) {
        issues.push({
          id: `data-integration-error-${chartFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'integration',
          component: chartFile,
          message: `Failed to verify data integration: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async verifyApiIntegrations(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check for API client usage
    const apiClientPath = join(process.cwd(), 'src/lib/api-client.ts');
    if (!existsSync(apiClientPath)) {
      issues.push({
        id: 'api-client-missing',
        severity: 'high',
        category: 'integration',
        message: 'API client not found',
        suggestion: 'Create API client for external service integration',
        autoFixable: true
      });
      return { total: 0, valid: 0, issues };
    }

    total++;
    valid++;

    // Check components that should use API client
    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Check for direct fetch calls instead of API client
        if (content.includes('fetch(') && !content.includes('api-client')) {
          issues.push({
            id: `api-direct-fetch-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'integration',
            component: componentFile,
            message: 'Component uses direct fetch instead of API client',
            suggestion: 'Use centralized API client for consistency and error handling',
            autoFixable: true
          });
        }

        // Check for error handling in API calls
        if (content.includes('fetch(') && !content.includes('catch') && !content.includes('try')) {
          issues.push({
            id: `api-error-handling-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'integration',
            component: componentFile,
            message: 'API calls missing error handling',
            suggestion: 'Add proper error handling for API calls',
            autoFixable: true
          });
        }

      } catch (error) {
        console.warn(`Failed to check API integration for ${componentFile}:`, error);
      }
    }

    return { total, valid, issues };
  }

  private async verifyWorkflowIntegrations(mainConfig: any): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Find workflow components
    const workflowNodes = mainConfig.nodes?.filter((n: any) => n.type?.includes('workflow')) || [];
    
    for (const workflowNode of workflowNodes) {
      total++;
      
      if (!workflowNode.props?.workflows || !Array.isArray(workflowNode.props.workflows)) {
        issues.push({
          id: `workflow-missing-${workflowNode.id}`,
          severity: 'high',
          category: 'integration',
          message: `Workflow component '${workflowNode.id}' missing workflows definition`,
          suggestion: 'Add workflows array to workflow component props',
          autoFixable: true
        });
        continue;
      }

      // Verify each workflow
      for (const workflow of workflowNode.props.workflows) {
        if (!workflow.steps || !Array.isArray(workflow.steps)) {
          issues.push({
            id: `workflow-steps-missing-${workflow.id}`,
            severity: 'high',
            category: 'integration',
            message: `Workflow '${workflow.id}' missing steps definition`,
            suggestion: 'Add steps array to workflow definition',
            autoFixable: true
          });
          continue;
        }

        // Verify step integrations
        for (const step of workflow.steps) {
          if (!step.component) {
            issues.push({
              id: `workflow-step-component-missing-${step.id}`,
              severity: 'high',
              category: 'integration',
              message: `Workflow step '${step.id}' missing component reference`,
              suggestion: 'Add component reference to workflow step',
              autoFixable: true
            });
          }
        }
      }

      valid++;
    }

    return { total, valid, issues };
  }

  private generateRecommendations(issues: VerificationIssue[], validIntegrations: number, totalIntegrations: number): string[] {
    const recommendations: string[] = [];

    if (validIntegrations < totalIntegrations) {
      recommendations.push(`Improve integration quality: ${totalIntegrations - validIntegrations} integrations need fixes`);
    }

    const criticalIssues = issues.filter(i => i.severity === 'critical');
    if (criticalIssues.length > 0) {
      recommendations.push(`Address ${criticalIssues.length} critical integration issues immediately`);
    }

    const componentIssues = issues.filter(i => i.message.includes('component'));
    if (componentIssues.length > 0) {
      recommendations.push('Review component relationships and ensure all referenced components exist');
    }

    const dataIssues = issues.filter(i => i.message.includes('data'));
    if (dataIssues.length > 0) {
      recommendations.push('Implement dynamic data loading and validation across all components');
    }

    const apiIssues = issues.filter(i => i.message.includes('API'));
    if (apiIssues.length > 0) {
      recommendations.push('Standardize API integration using centralized API client');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    // Implementation for single component verification
    const result = await this.verify({ componentId });
    return {
      agentId: 'integration-verifier',
      agentName: 'Integration Verifier',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}
