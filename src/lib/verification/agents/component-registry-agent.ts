/**
 * Component Registry Agent
 * Verifies that all components are properly registered and discoverable
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class ComponentRegistryAgent {
  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('📋 Component Registry Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalComponents = 0;
    let registeredComponents = 0;

    try {
      // Check component registry files
      const registryResults = await this.verifyRegistryFiles();
      totalComponents += registryResults.total;
      registeredComponents += registryResults.valid;
      issues.push(...registryResults.issues);

      // Check component metadata
      const metadataResults = await this.verifyComponentMetadata();
      totalComponents += metadataResults.total;
      registeredComponents += metadataResults.valid;
      issues.push(...metadataResults.issues);

      // Check component exports
      const exportResults = await this.verifyComponentExports();
      totalComponents += exportResults.total;
      registeredComponents += exportResults.valid;
      issues.push(...exportResults.issues);

      // Check component discovery
      const discoveryResults = await this.verifyComponentDiscovery();
      totalComponents += discoveryResults.total;
      registeredComponents += discoveryResults.valid;
      issues.push(...discoveryResults.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, registeredComponents, totalComponents));

      const score = totalComponents > 0 ? Math.round((registeredComponents / totalComponents) * 100) : 100;

      console.log(`✅ Component Registry: ${registeredComponents}/${totalComponents} components registered (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Component Registry Agent failed:', error);
      issues.push({
        id: 'registry-agent-error',
        severity: 'critical',
        category: 'integration',
        message: `Component registry verification failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async verifyRegistryFiles(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check for component registry files
    const registryFiles = [
      'src/lib/component-registry.ts',
      'src/lib/component-metadata.ts'
    ];

    for (const registryFile of registryFiles) {
      total++;
      
      if (!existsSync(join(process.cwd(), registryFile))) {
        issues.push({
          id: `registry-file-missing-${registryFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'integration',
          message: `Component registry file missing: ${registryFile}`,
          suggestion: `Create ${registryFile} for component registration`,
          autoFixable: true
        });
      } else {
        valid++;
        
        // Check registry file content
        try {
          const content = readFileSync(join(process.cwd(), registryFile), 'utf-8');
          
          if (!content.includes('registerComponent') && !content.includes('allComponents')) {
            issues.push({
              id: `registry-content-incomplete-${registryFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'medium',
              category: 'integration',
              message: `Registry file ${registryFile} missing required functions`,
              suggestion: 'Add registerComponent and allComponents to registry',
              autoFixable: true
            });
          }
        } catch (error) {
          issues.push({
            id: `registry-read-error-${registryFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'integration',
            message: `Failed to read registry file: ${(error as Error).message}`,
            autoFixable: false
          });
        }
      }
    }

    return { total, valid, issues };
  }

  private async verifyComponentMetadata(): Promise<{
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
        
        // Check for metadata annotation
        const metadataMatch = content.match(/\.metadata\s*=\s*({[\s\S]*?});/);
        
        if (!metadataMatch) {
          issues.push({
            id: `metadata-missing-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'integration',
            component: componentFile,
            message: 'Component missing metadata annotation',
            suggestion: 'Add metadata object with component information',
            autoFixable: true
          });
        } else {
          // Validate metadata structure
          try {
            const metadata = JSON.parse(metadataMatch[1]);
            const requiredFields = ['name', 'version', 'description'];
            const missingFields = requiredFields.filter(field => !metadata[field]);
            
            if (missingFields.length > 0) {
              issues.push({
                id: `metadata-incomplete-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
                severity: 'low',
                category: 'integration',
                component: componentFile,
                message: `Metadata missing fields: ${missingFields.join(', ')}`,
                suggestion: 'Add missing metadata fields',
                autoFixable: true
              });
            } else {
              valid++;
            }
          } catch (error) {
            issues.push({
              id: `metadata-invalid-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'medium',
              category: 'integration',
              component: componentFile,
              message: 'Invalid metadata JSON format',
              suggestion: 'Fix metadata JSON syntax',
              autoFixable: true
            });
          }
        }

      } catch (error) {
        issues.push({
          id: `metadata-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'integration',
          component: componentFile,
          message: `Failed to check metadata: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async verifyComponentExports(): Promise<{
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
        
        // Check for proper exports
        const hasDefaultExport = content.includes('export default');
        const hasNamedExport = content.includes('export const') || content.includes('export function');
        const hasDisplayName = content.includes('displayName');
        
        if (!hasDefaultExport && !hasNamedExport) {
          issues.push({
            id: `no-export-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'integration',
            component: componentFile,
            message: 'Component not properly exported',
            suggestion: 'Add default or named export for component',
            autoFixable: true
          });
        }
        
        if (!hasDisplayName) {
          issues.push({
            id: `no-display-name-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'low',
            category: 'integration',
            component: componentFile,
            message: 'Component missing displayName',
            suggestion: 'Add displayName for better debugging',
            autoFixable: true
          });
        }
        
        if ((hasDefaultExport || hasNamedExport) && hasDisplayName) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `export-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'integration',
          component: componentFile,
          message: `Failed to check exports: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async verifyComponentDiscovery(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check for component index files
    const indexFiles = [
      'src/components/index.ts',
      'src/index.ts'
    ];

    for (const indexFile of indexFiles) {
      total++;
      
      if (!existsSync(join(process.cwd(), indexFile))) {
        issues.push({
          id: `index-file-missing-${indexFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'medium',
          category: 'integration',
          message: `Index file missing: ${indexFile}`,
          suggestion: `Create ${indexFile} for component discovery`,
          autoFixable: true
        });
      } else {
        valid++;
        
        // Check index file content
        try {
          const content = readFileSync(join(process.cwd(), indexFile), 'utf-8');
          
          if (!content.includes('export') || content.trim().length < 10) {
            issues.push({
              id: `index-content-empty-${indexFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'medium',
              category: 'integration',
              message: `Index file ${indexFile} is empty or missing exports`,
              suggestion: 'Add component exports to index file',
              autoFixable: true
            });
          }
        } catch (error) {
          issues.push({
            id: `index-read-error-${indexFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'integration',
            message: `Failed to read index file: ${(error as Error).message}`,
            autoFixable: false
          });
        }
      }
    }

    return { total, valid, issues };
  }

  private generateRecommendations(issues: VerificationIssue[], registeredComponents: number, totalComponents: number): string[] {
    const recommendations: string[] = [];

    if (registeredComponents < totalComponents) {
      recommendations.push(`Improve component registration: ${totalComponents - registeredComponents} components need registration fixes`);
    }

    const metadataIssues = issues.filter(i => i.message.includes('metadata'));
    if (metadataIssues.length > 0) {
      recommendations.push('Add comprehensive metadata to all components for better discoverability');
    }

    const exportIssues = issues.filter(i => i.message.includes('export'));
    if (exportIssues.length > 0) {
      recommendations.push('Ensure all components are properly exported and discoverable');
    }

    const registryIssues = issues.filter(i => i.message.includes('registry'));
    if (registryIssues.length > 0) {
      recommendations.push('Maintain centralized component registry for better organization');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    const result = await this.verify({ componentId });
    return {
      agentId: 'component-registry',
      agentName: 'Component Registry',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}
