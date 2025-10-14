/**
 * Test Coverage Agent
 * Validates test coverage and quality across all components
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class TestCoverageAgent {
  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('🧪 Test Coverage Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalComponents = 0;
    let testedComponents = 0;

    try {
      // Check test files
      const testResults = await this.checkTestFiles();
      totalComponents += testResults.total;
      testedComponents += testResults.valid;
      issues.push(...testResults.issues);

      // Check test quality
      const qualityResults = await this.checkTestQuality();
      totalComponents += qualityResults.total;
      testedComponents += qualityResults.valid;
      issues.push(...qualityResults.issues);

      // Check test configuration
      const configResults = await this.checkTestConfiguration();
      totalComponents += configResults.total;
      testedComponents += configResults.valid;
      issues.push(...configResults.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, testedComponents, totalComponents));

      const score = totalComponents > 0 ? Math.round((testedComponents / totalComponents) * 100) : 100;

      console.log(`✅ Test Coverage: ${testedComponents}/${totalComponents} components tested (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Test Coverage Agent failed:', error);
      issues.push({
        id: 'test-coverage-agent-error',
        severity: 'critical',
        category: 'testing',
        message: `Test coverage verification failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async checkTestFiles(): Promise<{
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
      
      // Look for corresponding test file
      const testFile = componentFile.replace('.tsx', '.spec.tsx').replace('src/', 'tests/');
      const testFileExists = existsSync(join(process.cwd(), testFile));
      
      if (!testFileExists) {
        issues.push({
          id: `no-test-file-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'testing',
          component: componentFile,
          message: 'Component missing test file',
          suggestion: `Create test file: ${testFile}`,
          autoFixable: true
        });
      } else {
        valid++;
      }
    }

    return { total, valid, issues };
  }

  private async checkTestQuality(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    const testFiles = await glob('tests/**/*.spec.{ts,tsx}', { cwd: process.cwd() });
    
    for (const testFile of testFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), testFile), 'utf-8');
        
        // Check for test structure
        const hasDescribe = content.includes('describe(');
        const hasIt = content.includes('it(') || content.includes('test(');
        const hasExpect = content.includes('expect(');
        
        // Check for different test types
        const hasUnitTests = content.includes('unit') || content.includes('Unit');
        const hasIntegrationTests = content.includes('integration') || content.includes('Integration');
        const hasE2ETests = content.includes('e2e') || content.includes('E2E');
        
        // Check for test coverage
        const hasRenderTest = content.includes('render(') || content.includes('mount(');
        const hasInteractionTest = content.includes('click') || content.includes('fireEvent');
        const hasPropsTest = content.includes('props') || content.includes('Props');
        
        if (!hasDescribe || !hasIt || !hasExpect) {
          issues.push({
            id: `poor-test-structure-${testFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'testing',
            component: testFile,
            message: 'Test file has poor structure',
            suggestion: 'Use proper test structure with describe, it, and expect',
            autoFixable: true
          });
        }
        
        if (!hasRenderTest && !hasInteractionTest && !hasPropsTest) {
          issues.push({
            id: `incomplete-test-coverage-${testFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'testing',
            component: testFile,
            message: 'Test file has incomplete coverage',
            suggestion: 'Add tests for rendering, interactions, and props',
            autoFixable: true
          });
        }
        
        if (hasDescribe && hasIt && hasExpect && (hasRenderTest || hasInteractionTest || hasPropsTest)) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `test-quality-check-error-${testFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'testing',
          component: testFile,
          message: `Failed to check test quality: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkTestConfiguration(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check for test configuration files
    const configFiles = [
      'playwright.config.ts',
      'jest.config.js',
      'vitest.config.ts'
    ];

    for (const configFile of configFiles) {
      total++;
      
      if (!existsSync(join(process.cwd(), configFile))) {
        issues.push({
          id: `test-config-missing-${configFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'medium',
          category: 'testing',
          message: `Test configuration missing: ${configFile}`,
          suggestion: `Create ${configFile} for test configuration`,
          autoFixable: true
        });
      } else {
        valid++;
      }
    }

    // Check package.json for test scripts
    const packageJsonPath = join(process.cwd(), 'package.json');
    if (existsSync(packageJsonPath)) {
      total++;
      
      try {
        const packageContent = readFileSync(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageContent);
        
        const hasTestScript = packageJson.scripts && (
          packageJson.scripts.test || 
          packageJson.scripts['test:unit'] || 
          packageJson.scripts['test:e2e']
        );
        
        if (!hasTestScript) {
          issues.push({
            id: 'no-test-scripts',
            severity: 'high',
            category: 'testing',
            message: 'No test scripts found in package.json',
            suggestion: 'Add test scripts to package.json',
            autoFixable: true
          });
        } else {
          valid++;
        }
      } catch (error) {
        issues.push({
          id: 'package-json-read-error',
          severity: 'high',
          category: 'testing',
          message: `Failed to read package.json: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private generateRecommendations(issues: VerificationIssue[], testedComponents: number, totalComponents: number): string[] {
    const recommendations: string[] = [];

    if (testedComponents < totalComponents) {
      recommendations.push(`Improve test coverage: ${totalComponents - testedComponents} components need tests`);
    }

    const testFileIssues = issues.filter(i => i.message.includes('test file'));
    if (testFileIssues.length > 0) {
      recommendations.push('Create test files for all components');
    }

    const testQualityIssues = issues.filter(i => i.message.includes('test quality') || i.message.includes('coverage'));
    if (testQualityIssues.length > 0) {
      recommendations.push('Improve test quality and coverage');
    }

    const configIssues = issues.filter(i => i.message.includes('configuration'));
    if (configIssues.length > 0) {
      recommendations.push('Set up proper test configuration and scripts');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    const result = await this.verify({ componentId });
    return {
      agentId: 'test-coverage',
      agentName: 'Test Coverage',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}
