/**
 * Verification Agent - The A-TEAM Compliance Enforcer
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Verifies no fake, sudo, temp, placeholder, or mock code/data is used.
 * Ensures constitutional compliance and validates all implementations.
 */

import { EventEmitter } from 'events';
import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

export interface VerificationResult {
  id: string;
  timestamp: string;
  type: 'fake_code_check' | 'constitutional_compliance' | 'implementation_validation' | 'data_validation';
  status: 'passed' | 'failed' | 'warning';
  violations: VerificationViolation[];
  summary: string;
  details: any;
}

export interface VerificationViolation {
  type: 'fake_code' | 'constitutional_violation' | 'placeholder_code' | 'mock_data' | 'temp_code' | 'sudo_code';
  severity: 'critical' | 'high' | 'medium' | 'low';
  file?: string;
  line?: number;
  description: string;
  suggestion: string;
  constitutionalArticle?: string;
}

export interface VerificationReport {
  agentId: string;
  sessionId: string;
  totalFiles: number;
  filesChecked: number;
  violationsFound: number;
  criticalViolations: number;
  constitutionalCompliance: number; // 0-100
  fakeCodeDetected: boolean;
  mockDataDetected: boolean;
  placeholderCodeDetected: boolean;
  tempCodeDetected: boolean;
  sudoCodeDetected: boolean;
  results: VerificationResult[];
  recommendations: string[];
  timestamp: string;
}

export class VerificationAgent extends EventEmitter {
  private workspaceRoot: string;
  private verificationResults: VerificationResult[] = [];
  private fakeCodePatterns: RegExp[] = [];
  private mockDataPatterns: RegExp[] = [];
  private placeholderPatterns: RegExp[] = [];
  private tempCodePatterns: RegExp[] = [];
  private sudoCodePatterns: RegExp[] = [];
  private constitutionalPatterns: Map<string, RegExp[]> = new Map();

  constructor(workspaceRoot: string) {
    super();
    this.workspaceRoot = workspaceRoot;
    this.initializePatterns();
  }

  /**
   * Initialize the agent
   */
  async initialize(): Promise<void> {
    await this.loadConstitutionalPatterns();
  }

  /**
   * Execute verification task
   */
  async executeTask(task: any): Promise<VerificationReport> {
    // Perform comprehensive verification
    await this.verifyNoFakeCode();
    await this.verifyConstitutionalCompliance();
    await this.verifyImplementationQuality();
    await this.verifyDataIntegrity();
    
    // Generate comprehensive report
    const report = await this.generateReport(task.sessionId);
    
    this.emit('taskCompleted', task);
    this.emit('reportReady', report);
    
    return report;
  }

  /**
   * Generate final report
   */
  async generateReport(sessionId: string): Promise<VerificationReport> {
    const totalFiles = await this.countFiles();
    const filesChecked = this.verificationResults.length;
    const violationsFound = this.verificationResults.reduce((sum, result) => sum + result.violations.length, 0);
    const criticalViolations = this.verificationResults.reduce((sum, result) => 
      sum + result.violations.filter(v => v.severity === 'critical').length, 0
    );

    const report: VerificationReport = {
      agentId: 'verification',
      sessionId,
      totalFiles,
      filesChecked,
      violationsFound,
      criticalViolations,
      constitutionalCompliance: this.calculateConstitutionalCompliance(),
      fakeCodeDetected: this.hasFakeCode(),
      mockDataDetected: this.hasMockData(),
      placeholderCodeDetected: this.hasPlaceholderCode(),
      tempCodeDetected: this.hasTempCode(),
      sudoCodeDetected: this.hasSudoCode(),
      results: [...this.verificationResults],
      recommendations: this.generateRecommendations(),
      timestamp: new Date().toISOString()
    };

    return report;
  }

  /**
   * Initialize detection patterns
   */
  private initializePatterns(): void {
    // Fake code patterns
    this.fakeCodePatterns = [
      /fake\s+(code|data|implementation|function|class)/i,
      /dummy\s+(code|data|implementation|function|class)/i,
      /pseudo\s+(code|data|implementation|function|class)/i,
      /example\s+(code|data|implementation|function|class)/i,
      /sample\s+(code|data|implementation|function|class)/i,
      /test\s+(code|data|implementation|function|class)/i,
      /placeholder\s+(code|data|implementation|function|class)/i,
      /TODO:\s*implement/i,
      /FIXME:\s*implement/i,
      /XXX:\s*implement/i
    ];

    // Mock data patterns
    this.mockDataPatterns = [
      /mock\s+(data|object|response|api|service)/i,
      /fake\s+(data|object|response|api|service)/i,
      /dummy\s+(data|object|response|api|service)/i,
      /test\s+(data|object|response|api|service)/i,
      /sample\s+(data|object|response|api|service)/i,
      /example\s+(data|object|response|api|service)/i,
      /placeholder\s+(data|object|response|api|service)/i,
      /lorem\s+ipsum/i,
      /john\s+doe/i,
      /test@example\.com/i,
      /123-456-7890/i
    ];

    // Placeholder code patterns
    this.placeholderPatterns = [
      /placeholder/i,
      /PLACEHOLDER/i,
      /TODO:/i,
      /FIXME:/i,
      /XXX:/i,
      /HACK:/i,
      /TEMP:/i,
      /TEMPORARY/i,
      /throw new Error\('Not implemented'\)/i,
      /throw new Error\('TODO'\)/i,
      /return null; \/\/ TODO/i,
      /return undefined; \/\/ TODO/i,
      /console\.log\('TODO'\)/i,
      /console\.warn\('TODO'\)/i
    ];

    // Temporary code patterns
    this.tempCodePatterns = [
      /temp\s+(code|file|function|class|variable)/i,
      /temporary\s+(code|file|function|class|variable)/i,
      /tmp\s+(code|file|function|class|variable)/i,
      /\.tmp\b/i,
      /\.temp\b/i,
      /temp_/i,
      /_temp/i,
      /TEMP_/i,
      /_TEMP/i
    ];

    // Sudo code patterns
    this.sudoCodePatterns = [
      /sudo\s+(code|implementation|function|class)/i,
      /pseudo\s+(code|implementation|function|class)/i,
      /pseudocode/i,
      /algorithm\s+description/i,
      /step\s+\d+:/i,
      /if\s+condition\s+then/i,
      /while\s+condition\s+do/i,
      /for\s+each\s+item/i
    ];
  }

  /**
   * Load constitutional compliance patterns
   */
  private async loadConstitutionalPatterns(): Promise<void> {
    // Article I: Full-Auto Mandate patterns
    this.constitutionalPatterns.set('article_i', [
      /ask\s+for\s+permission/i,
      /halt\s+execution/i,
      /wait\s+for\s+user/i,
      /user\s+intervention/i,
      /manual\s+approval/i
    ]);

    // Article II: pow3r.config.json Supremacy patterns
    this.constitutionalPatterns.set('article_ii', [
      /hardcoded\s+(config|configuration)/i,
      /static\s+(config|configuration)/i,
      /manual\s+(config|configuration)/i,
      /not\s+derived\s+from\s+schema/i
    ]);

    // Article III: The Loop patterns
    this.constitutionalPatterns.set('article_iii', [
      /code\s+without\s+schema/i,
      /implementation\s+without\s+config/i,
      /no\s+test\s+generation/i,
      /no\s+deployment\s+verification/i
    ]);

    // Article IV: Technical Mandates patterns
    this.constitutionalPatterns.set('article_iv', [
      /next\.js/i,
      /shadcn/i,
      /radix/i,
      /bound\s+(component|data)/i,
      /desktop\s+first/i
    ]);

    // Article V: Agent Conduct patterns
    this.constitutionalPatterns.set('article_v', [
      /break\s+the\s+build/i,
      /fail\s+own\s+tests/i,
      /report\s+working\s+without\s+verification/i,
      /local\s+build\s+sufficient/i
    ]);
  }

  /**
   * Verify no fake code is present
   */
  private async verifyNoFakeCode(): Promise<void> {
    const files = await this.getCodeFiles();
    
    for (const file of files) {
      try {
        const content = await readFile(file, 'utf-8');
        const violations: VerificationViolation[] = [];

        // Check for fake code patterns
        for (const pattern of this.fakeCodePatterns) {
          const matches = content.matchAll(new RegExp(pattern, 'gi'));
          for (const match of matches) {
            const lineNumber = this.getLineNumber(content, match.index!);
            violations.push({
              type: 'fake_code',
              severity: 'critical',
              file,
              line: lineNumber,
              description: `Fake code detected: ${match[0]}`,
              suggestion: 'Replace with real implementation',
              constitutionalArticle: 'Article I'
            });
          }
        }

        // Check for mock data patterns
        for (const pattern of this.mockDataPatterns) {
          const matches = content.matchAll(new RegExp(pattern, 'gi'));
          for (const match of matches) {
            const lineNumber = this.getLineNumber(content, match.index!);
            violations.push({
              type: 'mock_data',
              severity: 'high',
              file,
              line: lineNumber,
              description: `Mock data detected: ${match[0]}`,
              suggestion: 'Replace with real data or remove',
              constitutionalArticle: 'Article I'
            });
          }
        }

        // Check for placeholder patterns
        for (const pattern of this.placeholderPatterns) {
          const matches = content.matchAll(new RegExp(pattern, 'gi'));
          for (const match of matches) {
            const lineNumber = this.getLineNumber(content, match.index!);
            violations.push({
              type: 'placeholder_code',
              severity: 'high',
              file,
              line: lineNumber,
              description: `Placeholder code detected: ${match[0]}`,
              suggestion: 'Implement the placeholder functionality',
              constitutionalArticle: 'Article I'
            });
          }
        }

        // Check for temporary code patterns
        for (const pattern of this.tempCodePatterns) {
          const matches = content.matchAll(new RegExp(pattern, 'gi'));
          for (const match of matches) {
            const lineNumber = this.getLineNumber(content, match.index!);
            violations.push({
              type: 'temp_code',
              severity: 'medium',
              file,
              line: lineNumber,
              description: `Temporary code detected: ${match[0]}`,
              suggestion: 'Replace temporary code with permanent implementation',
              constitutionalArticle: 'Article I'
            });
          }
        }

        // Check for sudo code patterns
        for (const pattern of this.sudoCodePatterns) {
          const matches = content.matchAll(new RegExp(pattern, 'gi'));
          for (const match of matches) {
            const lineNumber = this.getLineNumber(content, match.index!);
            violations.push({
              type: 'sudo_code',
              severity: 'medium',
              file,
              line: lineNumber,
              description: `Sudo code detected: ${match[0]}`,
              suggestion: 'Replace sudo code with actual implementation',
              constitutionalArticle: 'Article I'
            });
          }
        }

        if (violations.length > 0) {
          this.verificationResults.push({
            id: `fake_code_check_${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: 'fake_code_check',
            status: violations.some(v => v.severity === 'critical') ? 'failed' : 'warning',
            violations,
            summary: `Found ${violations.length} fake code violations in ${file}`,
            details: { file, violations }
          });
        }
      } catch (error) {
        console.warn(`Verification Agent: Failed to check file ${file}:`, error);
      }
    }
  }

  /**
   * Verify constitutional compliance
   */
  private async verifyConstitutionalCompliance(): Promise<void> {
    const files = await this.getCodeFiles();
    
    for (const file of files) {
      try {
        const content = await readFile(file, 'utf-8');
        const violations: VerificationViolation[] = [];

        // Check each constitutional article
        for (const [article, patterns] of this.constitutionalPatterns) {
          for (const pattern of patterns) {
            const matches = content.matchAll(new RegExp(pattern, 'gi'));
            for (const match of matches) {
              const lineNumber = this.getLineNumber(content, match.index!);
              violations.push({
                type: 'constitutional_violation',
                severity: 'critical',
                file,
                line: lineNumber,
                description: `Constitutional violation (${article}): ${match[0]}`,
                suggestion: `Ensure compliance with ${article}`,
                constitutionalArticle: article
              });
            }
          }
        }

        if (violations.length > 0) {
          this.verificationResults.push({
            id: `constitutional_check_${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: 'constitutional_compliance',
            status: 'failed',
            violations,
            summary: `Found ${violations.length} constitutional violations in ${file}`,
            details: { file, violations }
          });
        }
      } catch (error) {
        console.warn(`Verification Agent: Failed to check file ${file}:`, error);
      }
    }
  }

  /**
   * Verify implementation quality
   */
  private async verifyImplementationQuality(): Promise<void> {
    const files = await this.getCodeFiles();
    
    for (const file of files) {
      try {
        const content = await readFile(file, 'utf-8');
        const violations: VerificationViolation[] = [];

        // Check for empty functions
        const emptyFunctionPattern = /function\s+\w+\s*\([^)]*\)\s*\{\s*\}/g;
        const emptyFunctionMatches = content.matchAll(emptyFunctionPattern);
        for (const match of emptyFunctionMatches) {
          const lineNumber = this.getLineNumber(content, match.index!);
          violations.push({
            type: 'placeholder_code',
            severity: 'high',
            file,
            line: lineNumber,
            description: 'Empty function implementation',
            suggestion: 'Implement the function body',
            constitutionalArticle: 'Article I'
          });
        }

        // Check for console.log statements (should be removed in production)
        const consoleLogPattern = /console\.(log|warn|error|info)\s*\(/g;
        const consoleLogMatches = content.matchAll(consoleLogPattern);
        for (const match of consoleLogMatches) {
          const lineNumber = this.getLineNumber(content, match.index!);
          violations.push({
            type: 'temp_code',
            severity: 'low',
            file,
            line: lineNumber,
            description: `Console statement detected: ${match[0]}`,
            suggestion: 'Remove or replace with proper logging',
            constitutionalArticle: 'Article V'
          });
        }

        // Check for hardcoded values
        const hardcodedPattern = /(localhost|127\.0\.0\.1|test\.com|example\.com)/g;
        const hardcodedMatches = content.matchAll(hardcodedPattern);
        for (const match of hardcodedMatches) {
          const lineNumber = this.getLineNumber(content, match.index!);
          violations.push({
            type: 'placeholder_code',
            severity: 'medium',
            file,
            line: lineNumber,
            description: `Hardcoded value detected: ${match[0]}`,
            suggestion: 'Use configuration or environment variables',
            constitutionalArticle: 'Article II'
          });
        }

        if (violations.length > 0) {
          this.verificationResults.push({
            id: `implementation_check_${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: 'implementation_validation',
            status: violations.some(v => v.severity === 'critical' || v.severity === 'high') ? 'failed' : 'warning',
            violations,
            summary: `Found ${violations.length} implementation quality issues in ${file}`,
            details: { file, violations }
          });
        }
      } catch (error) {
        console.warn(`Verification Agent: Failed to check file ${file}:`, error);
      }
    }
  }

  /**
   * Verify data integrity
   */
  private async verifyDataIntegrity(): Promise<void> {
    const dataFiles = await this.getDataFiles();
    
    for (const file of dataFiles) {
      try {
        const content = await readFile(file, 'utf-8');
        const violations: VerificationViolation[] = [];

        // Check for mock data in data files
        for (const pattern of this.mockDataPatterns) {
          const matches = content.matchAll(new RegExp(pattern, 'gi'));
          for (const match of matches) {
            const lineNumber = this.getLineNumber(content, match.index!);
            violations.push({
              type: 'mock_data',
              severity: 'high',
              file,
              line: lineNumber,
              description: `Mock data detected in data file: ${match[0]}`,
              suggestion: 'Replace with real data',
              constitutionalArticle: 'Article I'
            });
          }
        }

        if (violations.length > 0) {
          this.verificationResults.push({
            id: `data_check_${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: 'data_validation',
            status: 'failed',
            violations,
            summary: `Found ${violations.length} data integrity issues in ${file}`,
            details: { file, violations }
          });
        }
      } catch (error) {
        console.warn(`Verification Agent: Failed to check data file ${file}:`, error);
      }
    }
  }

  /**
   * Get all code files in the workspace
   */
  private async getCodeFiles(): Promise<string[]> {
    const codeExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'];
    return await this.getFilesByExtensions(codeExtensions);
  }

  /**
   * Get all data files in the workspace
   */
  private async getDataFiles(): Promise<string[]> {
    const dataExtensions = ['.json', '.yaml', '.yml', '.csv', '.xml'];
    return await this.getFilesByExtensions(dataExtensions);
  }

  /**
   * Get files by extensions
   */
  private async getFilesByExtensions(extensions: string[]): Promise<string[]> {
    const files: string[] = [];
    
    const scanDirectory = async (dir: string): Promise<void> => {
      try {
        const entries = await readdir(dir);
        
        for (const entry of entries) {
          const fullPath = join(dir, entry);
          const stats = await stat(fullPath);
          
          if (stats.isDirectory()) {
            // Skip node_modules and other build directories
            if (!['node_modules', 'dist', 'build', '.git'].includes(entry)) {
              await scanDirectory(fullPath);
            }
          } else if (stats.isFile()) {
            const ext = extname(entry);
            if (extensions.includes(ext)) {
              files.push(fullPath);
            }
          }
        }
      } catch (error) {
        console.warn(`Verification Agent: Failed to scan directory ${dir}:`, error);
      }
    };
    
    await scanDirectory(this.workspaceRoot);
    return files;
  }

  /**
   * Count total files in workspace
   */
  private async countFiles(): Promise<number> {
    const codeFiles = await this.getCodeFiles();
    const dataFiles = await this.getDataFiles();
    return codeFiles.length + dataFiles.length;
  }

  /**
   * Get line number from character index
   */
  private getLineNumber(content: string, index: number): number {
    return content.substring(0, index).split('\n').length;
  }

  /**
   * Calculate constitutional compliance percentage
   */
  private calculateConstitutionalCompliance(): number {
    const totalViolations = this.verificationResults.reduce((sum, result) => sum + result.violations.length, 0);
    const constitutionalViolations = this.verificationResults.reduce((sum, result) => 
      sum + result.violations.filter(v => v.type === 'constitutional_violation').length, 0
    );
    
    if (totalViolations === 0) return 100;
    return Math.max(0, 100 - (constitutionalViolations / totalViolations) * 100);
  }

  /**
   * Check if fake code was detected
   */
  private hasFakeCode(): boolean {
    return this.verificationResults.some(result => 
      result.violations.some(v => v.type === 'fake_code')
    );
  }

  /**
   * Check if mock data was detected
   */
  private hasMockData(): boolean {
    return this.verificationResults.some(result => 
      result.violations.some(v => v.type === 'mock_data')
    );
  }

  /**
   * Check if placeholder code was detected
   */
  private hasPlaceholderCode(): boolean {
    return this.verificationResults.some(result => 
      result.violations.some(v => v.type === 'placeholder_code')
    );
  }

  /**
   * Check if temporary code was detected
   */
  private hasTempCode(): boolean {
    return this.verificationResults.some(result => 
      result.violations.some(v => v.type === 'temp_code')
    );
  }

  /**
   * Check if sudo code was detected
   */
  private hasSudoCode(): boolean {
    return this.verificationResults.some(result => 
      result.violations.some(v => v.type === 'sudo_code')
    );
  }

  /**
   * Generate recommendations based on verification results
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.hasFakeCode()) {
      recommendations.push('Remove all fake code and replace with real implementations');
    }
    
    if (this.hasMockData()) {
      recommendations.push('Replace mock data with real data or remove entirely');
    }
    
    if (this.hasPlaceholderCode()) {
      recommendations.push('Implement all placeholder code before deployment');
    }
    
    if (this.hasTempCode()) {
      recommendations.push('Replace temporary code with permanent implementations');
    }
    
    if (this.hasSudoCode()) {
      recommendations.push('Replace sudo code with actual implementations');
    }
    
    const constitutionalViolations = this.verificationResults.reduce((sum, result) => 
      sum + result.violations.filter(v => v.type === 'constitutional_violation').length, 0
    );
    
    if (constitutionalViolations > 0) {
      recommendations.push(`Address ${constitutionalViolations} constitutional violations`);
    }
    
    const criticalViolations = this.verificationResults.reduce((sum, result) => 
      sum + result.violations.filter(v => v.severity === 'critical').length, 0
    );
    
    if (criticalViolations > 0) {
      recommendations.push(`Immediately address ${criticalViolations} critical violations`);
    }
    
    return recommendations;
  }
}

export default VerificationAgent;
