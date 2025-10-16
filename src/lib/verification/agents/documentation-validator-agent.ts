/**
 * Documentation Validator Agent
 * Validates documentation completeness and quality across all components
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class DocumentationValidatorAgent {
  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('📚 Documentation Validator Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalComponents = 0;
    let documentedComponents = 0;

    try {
      // Check component documentation
      const componentDocs = await this.checkComponentDocumentation();
      totalComponents += componentDocs.total;
      documentedComponents += componentDocs.valid;
      issues.push(...componentDocs.issues);

      // Check API documentation
      const apiDocs = await this.checkApiDocumentation();
      totalComponents += apiDocs.total;
      documentedComponents += apiDocs.valid;
      issues.push(...apiDocs.issues);

      // Check README files
      const readmeDocs = await this.checkReadmeFiles();
      totalComponents += readmeDocs.total;
      documentedComponents += readmeDocs.valid;
      issues.push(...readmeDocs.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, documentedComponents, totalComponents));

      const score = totalComponents > 0 ? Math.round((documentedComponents / totalComponents) * 100) : 100;

      console.log(`✅ Documentation Validator: ${documentedComponents}/${totalComponents} components documented (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Documentation Validator Agent failed:', error);
      issues.push({
        id: 'documentation-agent-error',
        severity: 'critical',
        category: 'documentation',
        message: `Documentation verification failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async checkComponentDocumentation(): Promise<{
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
        
        // Check for JSDoc comments
        const hasJSDoc = content.includes('/**') && content.includes('*/');
        
        // Check for component description
        const hasDescription = content.includes('@description') || content.includes('Description:');
        
        // Check for prop documentation
        const hasPropDocs = content.includes('@param') || content.includes('Props:');
        
        // Check for example usage
        const hasExamples = content.includes('@example') || content.includes('Example:');
        
        if (!hasJSDoc) {
          issues.push({
            id: `no-jsdoc-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'documentation',
            component: componentFile,
            message: 'Component missing JSDoc documentation',
            suggestion: 'Add JSDoc comments for better documentation',
            autoFixable: true
          });
        }
        
        if (!hasDescription) {
          issues.push({
            id: `no-description-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'low',
            category: 'documentation',
            component: componentFile,
            message: 'Component missing description',
            suggestion: 'Add component description in JSDoc',
            autoFixable: true
          });
        }
        
        if (!hasPropDocs) {
          issues.push({
            id: `no-prop-docs-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'documentation',
            component: componentFile,
            message: 'Component missing prop documentation',
            suggestion: 'Document all component props with JSDoc',
            autoFixable: true
          });
        }
        
        if (hasJSDoc && hasDescription && hasPropDocs) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `doc-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'documentation',
          component: componentFile,
          message: `Failed to check documentation: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkApiDocumentation(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check for API documentation files
    const apiDocFiles = [
      'docs/INTEGRATION_GUIDE.md',
      'docs/POWER_CANVAS_GUIDE.md',
      'docs/POWER_REDACT_GUIDE.md'
    ];

    for (const docFile of apiDocFiles) {
      total++;
      
      if (!existsSync(join(process.cwd(), docFile))) {
        issues.push({
          id: `api-doc-missing-${docFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'medium',
          category: 'documentation',
          message: `API documentation missing: ${docFile}`,
          suggestion: `Create ${docFile} for API documentation`,
          autoFixable: true
        });
      } else {
        valid++;
      }
    }

    return { total, valid, issues };
  }

  private async checkReadmeFiles(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check for README files
    const readmeFiles = [
      'README.md',
      'power-canvas/README.md',
      'power-redact/README.md'
    ];

    for (const readmeFile of readmeFiles) {
      total++;
      
      if (!existsSync(join(process.cwd(), readmeFile))) {
        issues.push({
          id: `readme-missing-${readmeFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'medium',
          category: 'documentation',
          message: `README file missing: ${readmeFile}`,
          suggestion: `Create ${readmeFile} for project documentation`,
          autoFixable: true
        });
      } else {
        try {
          const content = readFileSync(join(process.cwd(), readmeFile), 'utf-8');
          
          // Check for essential README sections
          const hasInstallation = content.includes('Installation') || content.includes('install');
          const hasUsage = content.includes('Usage') || content.includes('Example');
          const hasAPI = content.includes('API') || content.includes('Props');
          
          if (!hasInstallation || !hasUsage) {
            issues.push({
              id: `readme-incomplete-${readmeFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'low',
              category: 'documentation',
              message: `README file incomplete: ${readmeFile}`,
              suggestion: 'Add installation and usage sections to README',
              autoFixable: true
            });
          } else {
            valid++;
          }
        } catch (error) {
          issues.push({
            id: `readme-read-error-${readmeFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'documentation',
            message: `Failed to read README: ${(error as Error).message}`,
            autoFixable: false
          });
        }
      }
    }

    return { total, valid, issues };
  }

  private generateRecommendations(issues: VerificationIssue[], documentedComponents: number, totalComponents: number): string[] {
    const recommendations: string[] = [];

    if (documentedComponents < totalComponents) {
      recommendations.push(`Improve documentation: ${totalComponents - documentedComponents} components need documentation`);
    }

    const jsdocIssues = issues.filter(i => i.message.includes('JSDoc'));
    if (jsdocIssues.length > 0) {
      recommendations.push('Add comprehensive JSDoc documentation to all components');
    }

    const propIssues = issues.filter(i => i.message.includes('prop'));
    if (propIssues.length > 0) {
      recommendations.push('Document all component props with detailed descriptions');
    }

    const readmeIssues = issues.filter(i => i.message.includes('README'));
    if (readmeIssues.length > 0) {
      recommendations.push('Create and maintain comprehensive README files');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    const result = await this.verify({ componentId });
    return {
      agentId: 'documentation-validator',
      agentName: 'Documentation Validator',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}

