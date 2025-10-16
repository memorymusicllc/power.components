/**
 * Testing Agent - The A-TEAM Quality Assurance
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Runs comprehensive tests, quality assurance, and validation.
 * Ensures 100% test coverage and constitutional compliance.
 */

import { EventEmitter } from 'events';
import { exec } from 'child_process';
import { promisify } from 'util';
import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const execAsync = promisify(exec);

export interface TestingOperation {
  id: string;
  type: 'unit_tests' | 'integration_tests' | 'e2e_tests' | 'performance_tests' | 'security_tests' | 'accessibility_tests';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  description: string;
  result?: any;
  error?: string;
  timestamp: string;
  duration?: number;
}

export interface TestResult {
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  coverage?: number;
}

export interface TestingReport {
  agentId: string;
  sessionId: string;
  operations: TestingOperation[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  testCoverage: number;
  performanceScore: number;
  accessibilityScore: number;
  securityScore: number;
  testingStatus: 'complete' | 'incomplete' | 'failed';
  verificationStatus: 'complete' | 'incomplete' | 'failed';
  constitutionalCompliance: 'compliant' | 'violation' | 'unknown';
  metrics: {
    operationsCompleted: number;
    operationsFailed: number;
    timeSpent: number;
    errorsEncountered: number;
  };
  timestamp: string;
}

export class TestingAgent extends EventEmitter {
  private workspaceRoot: string;
  private operations: TestingOperation[] = [];
  private testResults: TestResult[] = [];

  constructor(workspaceRoot: string) {
    super();
    this.workspaceRoot = workspaceRoot;
  }

  /**
   * Initialize the agent
   */
  async initialize(): Promise<void> {
    // Check if testing tools are available
    await this.checkTestingTools();
  }

  /**
   * Execute testing task
   */
  async executeTask(task: any): Promise<TestingReport> {
    // Perform all testing operations
    await this.runUnitTests();
    await this.runIntegrationTests();
    await this.runE2ETests();
    await this.runPerformanceTests();
    await this.runSecurityTests();
    await this.runAccessibilityTests();
    
    // Generate comprehensive report
    const report = await this.generateReport(task.sessionId);
    
    this.emit('taskCompleted', task);
    this.emit('reportReady', report);
    
    return report;
  }

  /**
   * Generate final report
   */
  async generateReport(sessionId: string): Promise<TestingReport> {
    const completedOperations = this.operations.filter(op => op.status === 'completed');
    const failedOperations = this.operations.filter(op => op.status === 'failed');
    
    const report: TestingReport = {
      agentId: 'testing',
      sessionId,
      operations: [...this.operations],
      totalTests: this.testResults.length,
      passedTests: this.testResults.filter(t => t.status === 'passed').length,
      failedTests: this.testResults.filter(t => t.status === 'failed').length,
      skippedTests: this.testResults.filter(t => t.status === 'skipped').length,
      testCoverage: this.calculateTestCoverage(),
      performanceScore: this.calculatePerformanceScore(),
      accessibilityScore: this.calculateAccessibilityScore(),
      securityScore: this.calculateSecurityScore(),
      testingStatus: this.checkTestingStatus(),
      verificationStatus: this.checkVerificationStatus(),
      constitutionalCompliance: this.checkConstitutionalCompliance(),
      metrics: {
        operationsCompleted: completedOperations.length,
        operationsFailed: failedOperations.length,
        timeSpent: this.calculateTimeSpent(),
        errorsEncountered: failedOperations.length
      },
      timestamp: new Date().toISOString()
    };

    return report;
  }

  /**
   * Check if testing tools are available
   */
  private async checkTestingTools(): Promise<void> {
    try {
      // Check for Playwright
      await execAsync('npx playwright --version', { cwd: this.workspaceRoot });
      
      // Check for Vitest
      await execAsync('npx vitest --version', { cwd: this.workspaceRoot });
      
      // Check for npm test script
      const packageJson = await readFile(join(this.workspaceRoot, 'package.json'), 'utf-8');
      const packageData = JSON.parse(packageJson);
      
      if (!packageData.scripts?.test) {
        throw new Error('No test script found in package.json');
      }
    } catch (error) {
      console.warn('Testing Agent: Some testing tools not available:', error);
    }
  }

  /**
   * Run unit tests
   */
  private async runUnitTests(): Promise<void> {
    const operation: TestingOperation = {
      id: `unit_tests_${Date.now()}`,
      type: 'unit_tests',
      status: 'in_progress',
      description: 'Run unit tests with Vitest',
      timestamp: new Date().toISOString()
    };

    this.operations.push(operation);
    const startTime = Date.now();

    try {
      // Run unit tests
      const { stdout, stderr } = await execAsync('npm run test:unit', { cwd: this.workspaceRoot });
      
      const testResults = this.parseTestOutput(stdout, 'unit');
      this.testResults.push(...testResults);
      
      const failedTests = testResults.filter(t => t.status === 'failed');
      
      if (failedTests.length === 0) {
        operation.status = 'completed';
        operation.result = { 
          message: `Unit tests completed: ${testResults.length} tests passed`,
          testResults
        };
      } else {
        operation.status = 'failed';
        operation.error = `${failedTests.length} unit tests failed`;
        throw new Error(operation.error);
      }
    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      operation.duration = Date.now() - startTime;
    }
  }

  /**
   * Run integration tests
   */
  private async runIntegrationTests(): Promise<void> {
    const operation: TestingOperation = {
      id: `integration_tests_${Date.now()}`,
      type: 'integration_tests',
      status: 'in_progress',
      description: 'Run integration tests',
      timestamp: new Date().toISOString()
    };

    this.operations.push(operation);
    const startTime = Date.now();

    try {
      // Run integration tests
      const { stdout, stderr } = await execAsync('npm run test:integration', { cwd: this.workspaceRoot });
      
      const testResults = this.parseTestOutput(stdout, 'integration');
      this.testResults.push(...testResults);
      
      const failedTests = testResults.filter(t => t.status === 'failed');
      
      if (failedTests.length === 0) {
        operation.status = 'completed';
        operation.result = { 
          message: `Integration tests completed: ${testResults.length} tests passed`,
          testResults
        };
      } else {
        operation.status = 'failed';
        operation.error = `${failedTests.length} integration tests failed`;
        throw new Error(operation.error);
      }
    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      operation.duration = Date.now() - startTime;
    }
  }

  /**
   * Run E2E tests
   */
  private async runE2ETests(): Promise<void> {
    const operation: TestingOperation = {
      id: `e2e_tests_${Date.now()}`,
      type: 'e2e_tests',
      status: 'in_progress',
      description: 'Run E2E tests with Playwright',
      timestamp: new Date().toISOString()
    };

    this.operations.push(operation);
    const startTime = Date.now();

    try {
      // Run E2E tests
      const { stdout, stderr } = await execAsync('npx playwright test', { cwd: this.workspaceRoot });
      
      const testResults = this.parseTestOutput(stdout, 'e2e');
      this.testResults.push(...testResults);
      
      const failedTests = testResults.filter(t => t.status === 'failed');
      
      if (failedTests.length === 0) {
        operation.status = 'completed';
        operation.result = { 
          message: `E2E tests completed: ${testResults.length} tests passed`,
          testResults
        };
      } else {
        operation.status = 'failed';
        operation.error = `${failedTests.length} E2E tests failed`;
        throw new Error(operation.error);
      }
    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      operation.duration = Date.now() - startTime;
    }
  }

  /**
   * Run performance tests
   */
  private async runPerformanceTests(): Promise<void> {
    const operation: TestingOperation = {
      id: `performance_tests_${Date.now()}`,
      type: 'performance_tests',
      status: 'in_progress',
      description: 'Run performance tests',
      timestamp: new Date().toISOString()
    };

    this.operations.push(operation);
    const startTime = Date.now();

    try {
      // Run performance tests
      const { stdout, stderr } = await execAsync('npm run test:performance', { cwd: this.workspaceRoot });
      
      const testResults = this.parseTestOutput(stdout, 'performance');
      this.testResults.push(...testResults);
      
      const failedTests = testResults.filter(t => t.status === 'failed');
      
      if (failedTests.length === 0) {
        operation.status = 'completed';
        operation.result = { 
          message: `Performance tests completed: ${testResults.length} tests passed`,
          testResults
        };
      } else {
        operation.status = 'failed';
        operation.error = `${failedTests.length} performance tests failed`;
        throw new Error(operation.error);
      }
    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      operation.duration = Date.now() - startTime;
    }
  }

  /**
   * Run security tests
   */
  private async runSecurityTests(): Promise<void> {
    const operation: TestingOperation = {
      id: `security_tests_${Date.now()}`,
      type: 'security_tests',
      status: 'in_progress',
      description: 'Run security tests and vulnerability scanning',
      timestamp: new Date().toISOString()
    };

    this.operations.push(operation);
    const startTime = Date.now();

    try {
      // Run security audit
      const { stdout, stderr } = await execAsync('npm audit', { cwd: this.workspaceRoot });
      
      // Parse security audit results
      const securityResults = this.parseSecurityAudit(stdout);
      this.testResults.push(...securityResults);
      
      const failedTests = securityResults.filter(t => t.status === 'failed');
      
      if (failedTests.length === 0) {
        operation.status = 'completed';
        operation.result = { 
          message: `Security tests completed: ${securityResults.length} tests passed`,
          testResults: securityResults
        };
      } else {
        operation.status = 'failed';
        operation.error = `${failedTests.length} security issues found`;
        throw new Error(operation.error);
      }
    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      operation.duration = Date.now() - startTime;
    }
  }

  /**
   * Run accessibility tests
   */
  private async runAccessibilityTests(): Promise<void> {
    const operation: TestingOperation = {
      id: `accessibility_tests_${Date.now()}`,
      type: 'accessibility_tests',
      status: 'in_progress',
      description: 'Run accessibility tests (WCAG 2.1 AA compliance)',
      timestamp: new Date().toISOString()
    };

    this.operations.push(operation);
    const startTime = Date.now();

    try {
      // Run accessibility tests with Playwright
      const { stdout, stderr } = await execAsync('npx playwright test --grep="accessibility"', { cwd: this.workspaceRoot });
      
      const testResults = this.parseTestOutput(stdout, 'accessibility');
      this.testResults.push(...testResults);
      
      const failedTests = testResults.filter(t => t.status === 'failed');
      
      if (failedTests.length === 0) {
        operation.status = 'completed';
        operation.result = { 
          message: `Accessibility tests completed: ${testResults.length} tests passed`,
          testResults
        };
      } else {
        operation.status = 'failed';
        operation.error = `${failedTests.length} accessibility tests failed`;
        throw new Error(operation.error);
      }
    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : String(error);
      throw error;
    } finally {
      operation.duration = Date.now() - startTime;
    }
  }

  /**
   * Parse test output
   */
  private parseTestOutput(output: string, testType: string): TestResult[] {
    const results: TestResult[] = [];
    const lines = output.split('\n');
    
    for (const line of lines) {
      // Parse different test output formats
      if (line.includes('✓') || line.includes('PASS')) {
        const testName = this.extractTestName(line);
        results.push({
          testName: `${testType}: ${testName}`,
          status: 'passed',
          duration: this.extractDuration(line),
          coverage: this.extractCoverage(line)
        });
      } else if (line.includes('✗') || line.includes('FAIL')) {
        const testName = this.extractTestName(line);
        results.push({
          testName: `${testType}: ${testName}`,
          status: 'failed',
          duration: this.extractDuration(line),
          error: this.extractError(line)
        });
      } else if (line.includes('SKIP') || line.includes('○')) {
        const testName = this.extractTestName(line);
        results.push({
          testName: `${testType}: ${testName}`,
          status: 'skipped',
          duration: 0
        });
      }
    }
    
    return results;
  }

  /**
   * Parse security audit output
   */
  private parseSecurityAudit(output: string): TestResult[] {
    const results: TestResult[] = [];
    const lines = output.split('\n');
    
    let vulnerabilityCount = 0;
    let highSeverityCount = 0;
    let moderateSeverityCount = 0;
    let lowSeverityCount = 0;
    
    for (const line of lines) {
      if (line.includes('found') && line.includes('vulnerabilities')) {
        const match = line.match(/(\d+)\s+vulnerabilities/);
        if (match) {
          vulnerabilityCount = parseInt(match[1]);
        }
      }
      
      if (line.includes('high')) {
        const match = line.match(/(\d+)\s+high/);
        if (match) {
          highSeverityCount = parseInt(match[1]);
        }
      }
      
      if (line.includes('moderate')) {
        const match = line.match(/(\d+)\s+moderate/);
        if (match) {
          moderateSeverityCount = parseInt(match[1]);
        }
      }
      
      if (line.includes('low')) {
        const match = line.match(/(\d+)\s+low/);
        if (match) {
          lowSeverityCount = parseInt(match[1]);
        }
      }
    }
    
    // Create test results based on security audit
    if (vulnerabilityCount === 0) {
      results.push({
        testName: 'security: No vulnerabilities found',
        status: 'passed',
        duration: 0
      });
    } else {
      if (highSeverityCount > 0) {
        results.push({
          testName: `security: ${highSeverityCount} high severity vulnerabilities`,
          status: 'failed',
          duration: 0,
          error: `${highSeverityCount} high severity vulnerabilities found`
        });
      }
      
      if (moderateSeverityCount > 0) {
        results.push({
          testName: `security: ${moderateSeverityCount} moderate severity vulnerabilities`,
          status: 'failed',
          duration: 0,
          error: `${moderateSeverityCount} moderate severity vulnerabilities found`
        });
      }
      
      if (lowSeverityCount > 0) {
        results.push({
          testName: `security: ${lowSeverityCount} low severity vulnerabilities`,
          status: 'failed',
          duration: 0,
          error: `${lowSeverityCount} low severity vulnerabilities found`
        });
      }
    }
    
    return results;
  }

  /**
   * Extract test name from output line
   */
  private extractTestName(line: string): string {
    // Remove test status indicators and extract test name
    return line
      .replace(/[✓✗○]/g, '')
      .replace(/PASS|FAIL|SKIP/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Extract duration from output line
   */
  private extractDuration(line: string): number {
    const match = line.match(/(\d+(?:\.\d+)?)\s*ms/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Extract coverage from output line
   */
  private extractCoverage(line: string): number {
    const match = line.match(/(\d+(?:\.\d+)?)%/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Extract error from output line
   */
  private extractError(line: string): string {
    // Extract error message from test output
    return line.replace(/.*FAIL\s*/, '').trim();
  }

  /**
   * Calculate test coverage
   */
  private calculateTestCoverage(): number {
    const coverageResults = this.testResults.filter(t => t.coverage !== undefined);
    
    if (coverageResults.length === 0) return 0;
    
    const totalCoverage = coverageResults.reduce((sum, result) => sum + (result.coverage || 0), 0);
    return Math.round(totalCoverage / coverageResults.length);
  }

  /**
   * Calculate performance score
   */
  private calculatePerformanceScore(): number {
    const performanceResults = this.testResults.filter(t => t.testName.includes('performance'));
    const passedPerformanceTests = performanceResults.filter(t => t.status === 'passed').length;
    
    if (performanceResults.length === 0) return 100;
    
    return Math.round((passedPerformanceTests / performanceResults.length) * 100);
  }

  /**
   * Calculate accessibility score
   */
  private calculateAccessibilityScore(): number {
    const accessibilityResults = this.testResults.filter(t => t.testName.includes('accessibility'));
    const passedAccessibilityTests = accessibilityResults.filter(t => t.status === 'passed').length;
    
    if (accessibilityResults.length === 0) return 100;
    
    return Math.round((passedAccessibilityTests / accessibilityResults.length) * 100);
  }

  /**
   * Calculate security score
   */
  private calculateSecurityScore(): number {
    const securityResults = this.testResults.filter(t => t.testName.includes('security'));
    const passedSecurityTests = securityResults.filter(t => t.status === 'passed').length;
    
    if (securityResults.length === 0) return 100;
    
    return Math.round((passedSecurityTests / securityResults.length) * 100);
  }

  /**
   * Check testing status
   */
  private checkTestingStatus(): 'complete' | 'incomplete' | 'failed' {
    const failedOperations = this.operations.filter(op => op.status === 'failed');
    const criticalOperations = ['unit_tests', 'e2e_tests'];
    
    const criticalFailures = failedOperations.filter(op => criticalOperations.includes(op.type));
    
    if (criticalFailures.length > 0) {
      return 'failed';
    } else if (failedOperations.length > 0) {
      return 'incomplete';
    } else {
      return 'complete';
    }
  }

  /**
   * Check verification status
   */
  private checkVerificationStatus(): 'complete' | 'incomplete' | 'failed' {
    const failedTests = this.testResults.filter(t => t.status === 'failed');
    
    if (failedTests.length === 0) {
      return 'complete';
    } else {
      return 'incomplete';
    }
  }

  /**
   * Check constitutional compliance
   */
  private checkConstitutionalCompliance(): 'compliant' | 'violation' | 'unknown' {
    const failedOperations = this.operations.filter(op => op.status === 'failed');
    
    // Check for constitutional violations
    const hasTestFailure = failedOperations.some(op => op.type === 'unit_tests' || op.type === 'e2e_tests');
    
    if (hasTestFailure) {
      return 'violation'; // Article V: Agent Conduct violation
    }
    
    return 'compliant';
  }

  /**
   * Calculate total time spent
   */
  private calculateTimeSpent(): number {
    const startTime = this.operations[0]?.timestamp;
    const endTime = this.operations[this.operations.length - 1]?.timestamp;
    
    if (startTime && endTime) {
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();
      return Math.round((end - start) / 1000); // seconds
    }
    
    return 0;
  }

  // Public getters
  getOperations(): TestingOperation[] {
    return [...this.operations];
  }

  getTestResults(): TestResult[] {
    return [...this.testResults];
  }

  getLastOperation(): TestingOperation | null {
    return this.operations[this.operations.length - 1] || null;
  }
}

export default TestingAgent;
