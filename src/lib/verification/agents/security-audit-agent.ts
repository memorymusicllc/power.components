/**
 * Security Audit Agent
 * Audits security practices and vulnerabilities across all components
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class SecurityAuditAgent {
  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('🔒 Security Audit Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalChecks = 0;
    let passedChecks = 0;

    try {
      // Check for security vulnerabilities
      const vulnerabilityResults = await this.checkSecurityVulnerabilities();
      totalChecks += vulnerabilityResults.total;
      passedChecks += vulnerabilityResults.valid;
      issues.push(...vulnerabilityResults.issues);

      // Check for secure coding practices
      const practicesResults = await this.checkSecureCodingPractices();
      totalChecks += practicesResults.total;
      passedChecks += practicesResults.valid;
      issues.push(...practicesResults.issues);

      // Check for data protection
      const dataProtectionResults = await this.checkDataProtection();
      totalChecks += dataProtectionResults.total;
      passedChecks += dataProtectionResults.valid;
      issues.push(...dataProtectionResults.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, passedChecks, totalChecks));

      const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;

      console.log(`✅ Security Audit: ${passedChecks}/${totalChecks} checks passed (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Security Audit Agent failed:', error);
      issues.push({
        id: 'security-agent-error',
        severity: 'critical',
        category: 'security',
        message: `Security audit failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async checkSecurityVulnerabilities(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    const componentFiles = await glob('src/**/*.{ts,tsx,js,jsx}', { cwd: process.cwd() });
    
    for (const file of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), file), 'utf-8');
        
        // Check for dangerous patterns
        const hasDangerousPatterns = content.includes('eval(') || content.includes('innerHTML') || 
                                    content.includes('document.write') || content.includes('dangerouslySetInnerHTML');
        
        // Check for hardcoded secrets
        const hasHardcodedSecrets = content.includes('password') || content.includes('secret') || 
                                  content.includes('api_key') || content.includes('token');
        
        // Check for XSS vulnerabilities
        const hasXSSVulnerabilities = content.includes('innerHTML') && !content.includes('sanitize');
        
        if (hasDangerousPatterns || hasXSSVulnerabilities) {
          issues.push({
            id: `security-vulnerability-${file.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'critical',
            category: 'security',
            component: file,
            message: 'Potential security vulnerability detected',
            suggestion: 'Remove dangerous patterns and sanitize user input',
            autoFixable: false
          });
        } else if (hasHardcodedSecrets) {
          issues.push({
            id: `hardcoded-secret-${file.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'security',
            component: file,
            message: 'Potential hardcoded secret detected',
            suggestion: 'Use environment variables for sensitive data',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `security-check-error-${file.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'security',
          component: file,
          message: `Failed to check security: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkSecureCodingPractices(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    const componentFiles = await glob('src/**/*.{ts,tsx,js,jsx}', { cwd: process.cwd() });
    
    for (const file of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), file), 'utf-8');
        
        // Check for input validation
        const hasInputValidation = content.includes('validate') || content.includes('sanitize');
        
        // Check for error handling
        const hasErrorHandling = content.includes('try') || content.includes('catch') || 
                                content.includes('ErrorBoundary');
        
        // Check for HTTPS usage
        const hasHTTPS = !content.includes('http://') || content.includes('https://');
        
        if (!hasInputValidation) {
          issues.push({
            id: `no-input-validation-${file.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'security',
            component: file,
            message: 'Missing input validation',
            suggestion: 'Add input validation and sanitization',
            autoFixable: true
          });
        }
        
        if (!hasErrorHandling) {
          issues.push({
            id: `no-error-handling-${file.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'security',
            component: file,
            message: 'Missing error handling',
            suggestion: 'Add proper error handling to prevent information leakage',
            autoFixable: true
          });
        }
        
        if (hasInputValidation && hasErrorHandling && hasHTTPS) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `practices-check-error-${file.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'security',
          component: file,
          message: `Failed to check secure practices: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkDataProtection(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check for data protection measures
    const powerRedactPath = join(process.cwd(), 'power-redact');
    if (existsSync(powerRedactPath)) {
      total++;
      valid++; // Power Redact exists for data protection
    } else {
      issues.push({
        id: 'no-data-protection',
        severity: 'high',
        category: 'security',
        message: 'No data protection system found',
        suggestion: 'Implement data redaction and protection measures',
        autoFixable: true
      });
    }

    // Check components for data protection
    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Check for PII handling
        const hasPIIHandling = content.includes('redact') || content.includes('mask') || 
                              content.includes('encrypt') || content.includes('hash');
        
        // Check for data encryption
        const hasEncryption = content.includes('encrypt') || content.includes('crypto');
        
        if (!hasPIIHandling && !hasEncryption) {
          issues.push({
            id: `no-data-protection-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'security',
            component: componentFile,
            message: 'Component not implementing data protection measures',
            suggestion: 'Add data protection for sensitive information',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `data-protection-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'security',
          component: componentFile,
          message: `Failed to check data protection: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private generateRecommendations(issues: VerificationIssue[], passedChecks: number, totalChecks: number): string[] {
    const recommendations: string[] = [];

    if (passedChecks < totalChecks) {
      recommendations.push(`Improve security: ${totalChecks - passedChecks} security issues need attention`);
    }

    const vulnerabilityIssues = issues.filter(i => i.severity === 'critical');
    if (vulnerabilityIssues.length > 0) {
      recommendations.push('Address critical security vulnerabilities immediately');
    }

    const secretIssues = issues.filter(i => i.message.includes('secret'));
    if (secretIssues.length > 0) {
      recommendations.push('Remove hardcoded secrets and use environment variables');
    }

    const validationIssues = issues.filter(i => i.message.includes('validation'));
    if (validationIssues.length > 0) {
      recommendations.push('Implement comprehensive input validation and sanitization');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    const result = await this.verify({ componentId });
    return {
      agentId: 'security-audit',
      agentName: 'Security Audit',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}
