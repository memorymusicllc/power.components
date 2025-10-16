/**
 * A-TEAM System - The Main Orchestrator
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * The main A-TEAM system that orchestrates all agents and provides the public API.
 * This is the entry point for all automated operations.
 */

import { EventEmitter } from 'events';
import { AgentManager, WorkflowSession } from './agent-manager';
import { DirectorAbi, GoalScore } from './director-abi';
import { ChatAnalysisAgent } from './chat-analysis-agent';
import { VerificationAgent } from './verification-agent';
import { GitHubAgent } from './github-agent';
import { DeploymentAgent } from './deployment-agent';
import { DocumentationAgent } from './documentation-agent';
import { TestingAgent } from './testing-agent';

export interface ATEAMStatus {
  isInitialized: boolean;
  isProcessing: boolean;
  activeSessions: number;
  totalSessions: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  constitutionalCompliance: number; // 0-100
  lastActivity: string;
  agents: {
    [agentId: string]: {
      status: 'active' | 'inactive' | 'error';
      lastActivity: string;
      operationsCompleted: number;
      operationsFailed: number;
    };
  };
}

export interface ATEAMConfig {
  workspaceRoot: string;
  autoStart: boolean;
  maxConcurrentSessions: number;
  sessionTimeout: number; // in minutes
  enableLogging: boolean;
  enableMetrics: boolean;
  constitutionalComplianceThreshold: number; // 0-100
}

export interface ATEAMResult {
  sessionId: string;
  userRequest: string;
  goalScore: GoalScore;
  status: 'completed' | 'failed' | 'timeout';
  duration: number; // in seconds
  agents: string[];
  operations: number;
  violations: string[];
  recommendations: string[];
  deploymentUrl?: string;
  screenshotPath?: string;
  timestamp: string;
}

export class ATEAMSystem extends EventEmitter {
  private config: ATEAMConfig;
  private agentManager: AgentManager;
  private directorAbi: DirectorAbi;
  private isInitialized = false;
  private isProcessing = false;
  private activeSessions: Map<string, WorkflowSession> = new Map();
  private completedSessions: ATEAMResult[] = [];
  private systemMetrics: {
    totalSessions: number;
    successfulSessions: number;
    failedSessions: number;
    averageGoalScore: number;
    averageConfidenceScore: number;
    totalOperations: number;
    totalViolations: number;
  } = {
    totalSessions: 0,
    successfulSessions: 0,
    failedSessions: 0,
    averageGoalScore: 0,
    averageConfidenceScore: 0,
    totalOperations: 0,
    totalViolations: 0
  };

  constructor(config: ATEAMConfig) {
    super();
    this.config = config;
    this.agentManager = new AgentManager(config.workspaceRoot);
    this.directorAbi = new DirectorAbi(config.workspaceRoot);
    
    this.setupEventListeners();
  }

  /**
   * Initialize the A-TEAM system
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Initialize Director Abi
      await this.directorAbi.initialize();
      
      // Initialize Agent Manager
      await this.agentManager.initialize();
      
      this.isInitialized = true;
      this.emit('systemInitialized');
      
      if (this.config.autoStart) {
        await this.start();
      }
    } catch (error) {
      this.emit('systemError', error);
      throw error;
    }
  }

  /**
   * Start the A-TEAM system
   */
  async start(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.emit('systemStarted');
  }

  /**
   * Stop the A-TEAM system
   */
  async stop(): Promise<void> {
    this.isProcessing = false;
    this.emit('systemStopped');
  }

  /**
   * Process a user request with full automation
   */
  async processRequest(userRequest: string): Promise<ATEAMResult> {
    if (!this.isInitialized) {
      throw new Error('A-TEAM system not initialized');
    }

    if (this.isProcessing && this.activeSessions.size >= this.config.maxConcurrentSessions) {
      throw new Error('Maximum concurrent sessions reached');
    }

    this.isProcessing = true;
    const startTime = Date.now();

    try {
      // Process the request through the agent manager
      const session = await this.agentManager.processUserRequest(userRequest);
      
      // Store active session
      this.activeSessions.set(session.id, session);
      
      // Wait for session completion
      await this.waitForSessionCompletion(session.id);
      
      // Get the completed session
      const completedSession = this.activeSessions.get(session.id);
      if (!completedSession) {
        throw new Error('Session not found after completion');
      }
      
      // Create A-TEAM result
      const result = await this.createATEAMResult(completedSession, startTime);
      
      // Move to completed sessions
      this.activeSessions.delete(session.id);
      this.completedSessions.push(result);
      
      // Update system metrics
      this.updateSystemMetrics(result);
      
      this.emit('requestCompleted', result);
      
      return result;
    } catch (error) {
      this.emit('requestFailed', { userRequest, error });
      throw error;
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Get system status
   */
  getStatus(): ATEAMStatus {
    const agentStatuses = this.getAgentStatuses();
    const systemHealth = this.calculateSystemHealth();
    const constitutionalCompliance = this.calculateConstitutionalCompliance();
    
    return {
      isInitialized: this.isInitialized,
      isProcessing: this.isProcessing,
      activeSessions: this.activeSessions.size,
      totalSessions: this.systemMetrics.totalSessions,
      systemHealth,
      constitutionalCompliance,
      lastActivity: this.getLastActivity(),
      agents: agentStatuses
    };
  }

  /**
   * Get system metrics
   */
  getMetrics() {
    return { ...this.systemMetrics };
  }

  /**
   * Get completed sessions
   */
  getCompletedSessions(): ATEAMResult[] {
    return [...this.completedSessions];
  }

  /**
   * Get active sessions
   */
  getActiveSessions(): WorkflowSession[] {
    return Array.from(this.activeSessions.values());
  }

  /**
   * Get Director Abi's analysis
   */
  async getDirectorAbiAnalysis(): Promise<{
    contextLog: any[];
    intentTracker: any[];
    apd: any;
    systemHealth: any;
  }> {
    return {
      contextLog: this.directorAbi.getContextLog(),
      intentTracker: this.directorAbi.getIntentTracker(),
      apd: this.directorAbi.getAPD(),
      systemHealth: this.directorAbi.getSystemHealth()
    };
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    this.agentManager.on('sessionCompleted', (session: WorkflowSession) => {
      this.emit('sessionCompleted', session);
    });

    this.agentManager.on('sessionFailed', (session: WorkflowSession, error: any) => {
      this.emit('sessionFailed', { session, error });
    });

    this.agentManager.on('taskCompleted', (data: any) => {
      this.emit('taskCompleted', data);
    });

    this.agentManager.on('taskFailed', (data: any) => {
      this.emit('taskFailed', data);
    });

    this.agentManager.on('agentReport', (data: any) => {
      this.emit('agentReport', data);
    });
  }

  /**
   * Wait for session completion
   */
  private async waitForSessionCompletion(sessionId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Session ${sessionId} timed out after ${this.config.sessionTimeout} minutes`));
      }, this.config.sessionTimeout * 60 * 1000);

      const checkCompletion = () => {
        const session = this.activeSessions.get(sessionId);
        if (session && (session.status === 'completed' || session.status === 'failed')) {
          clearTimeout(timeout);
          resolve();
        } else {
          setTimeout(checkCompletion, 1000);
        }
      };

      checkCompletion();
    });
  }

  /**
   * Create A-TEAM result from completed session
   */
  private async createATEAMResult(session: WorkflowSession, startTime: number): Promise<ATEAMResult> {
    const duration = Math.round((Date.now() - startTime) / 1000);
    
    return {
      sessionId: session.id,
      userRequest: session.userRequest,
      goalScore: session.goalScore || {
        goalPercentage: 0,
        confidencePercentage: 0,
        analysis: {
          userRequestClarity: 0,
          implementationCompleteness: 0,
          constitutionalCompliance: 0,
          deploymentSuccess: 0,
          verificationCompleteness: 0
        },
        violations: [],
        recommendations: []
      },
      status: session.status === 'completed' ? 'completed' : 'failed',
      duration,
      agents: session.agents,
      operations: session.tasks.length,
      violations: session.goalScore?.violations || [],
      recommendations: session.goalScore?.recommendations || [],
      deploymentUrl: this.getDeploymentUrl(session),
      screenshotPath: this.getScreenshotPath(session),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get deployment URL from session
   */
  private getDeploymentUrl(session: WorkflowSession): string | undefined {
    // Look for deployment URL in agent reports
    for (const report of session.reports) {
      if (report.agentId === 'deployment' && (report as any).result?.url) {
        return (report as any).result.url;
      }
    }
    return undefined;
  }

  /**
   * Get screenshot path from session
   */
  private getScreenshotPath(session: WorkflowSession): string | undefined {
    // Look for screenshot path in agent reports
    for (const report of session.reports) {
      if (report.agentId === 'deployment' && (report as any).result?.screenshotPath) {
        return (report as any).result.screenshotPath;
      }
    }
    return undefined;
  }

  /**
   * Update system metrics
   */
  private updateSystemMetrics(result: ATEAMResult): void {
    this.systemMetrics.totalSessions++;
    
    if (result.status === 'completed') {
      this.systemMetrics.successfulSessions++;
    } else {
      this.systemMetrics.failedSessions++;
    }
    
    this.systemMetrics.totalOperations += result.operations;
    this.systemMetrics.totalViolations += result.violations.length;
    
    // Update average scores
    const totalSessions = this.systemMetrics.totalSessions;
    const currentGoalAvg = this.systemMetrics.averageGoalScore;
    const currentConfidenceAvg = this.systemMetrics.averageConfidenceScore;
    
    this.systemMetrics.averageGoalScore = 
      (currentGoalAvg * (totalSessions - 1) + result.goalScore.goalPercentage) / totalSessions;
    
    this.systemMetrics.averageConfidenceScore = 
      (currentConfidenceAvg * (totalSessions - 1) + result.goalScore.confidencePercentage) / totalSessions;
  }

  /**
   * Get agent statuses
   */
  private getAgentStatuses(): { [agentId: string]: any } {
    const agentStatuses: { [agentId: string]: any } = {};
    
    // Get status from agent manager
    const systemStatus = this.agentManager.getSystemStatus();
    
    for (const agentId of systemStatus.agents) {
      agentStatuses[agentId] = {
        status: 'active',
        lastActivity: new Date().toISOString(),
        operationsCompleted: 0,
        operationsFailed: 0
      };
    }
    
    return agentStatuses;
  }

  /**
   * Calculate system health
   */
  private calculateSystemHealth(): 'healthy' | 'warning' | 'critical' {
    const successRate = this.systemMetrics.totalSessions > 0 
      ? this.systemMetrics.successfulSessions / this.systemMetrics.totalSessions 
      : 1;
    
    const averageGoalScore = this.systemMetrics.averageGoalScore;
    const constitutionalCompliance = this.calculateConstitutionalCompliance();
    
    if (successRate >= 0.9 && averageGoalScore >= 90 && constitutionalCompliance >= 95) {
      return 'healthy';
    } else if (successRate >= 0.7 && averageGoalScore >= 70 && constitutionalCompliance >= 80) {
      return 'warning';
    } else {
      return 'critical';
    }
  }

  /**
   * Calculate constitutional compliance
   */
  private calculateConstitutionalCompliance(): number {
    if (this.systemMetrics.totalSessions === 0) return 100;
    
    const violationRate = this.systemMetrics.totalViolations / this.systemMetrics.totalSessions;
    return Math.max(0, 100 - (violationRate * 100));
  }

  /**
   * Get last activity timestamp
   */
  private getLastActivity(): string {
    if (this.completedSessions.length > 0) {
      return this.completedSessions[this.completedSessions.length - 1].timestamp;
    }
    return new Date().toISOString();
  }

  /**
   * Generate system report
   */
  async generateSystemReport(): Promise<{
    status: ATEAMStatus;
    metrics: any;
    recentSessions: ATEAMResult[];
    directorAbiAnalysis: any;
    recommendations: string[];
  }> {
    const status = this.getStatus();
    const metrics = this.getMetrics();
    const recentSessions = this.completedSessions.slice(-10); // Last 10 sessions
    const directorAbiAnalysis = await this.getDirectorAbiAnalysis();
    
    const recommendations = this.generateRecommendations(status, metrics);
    
    return {
      status,
      metrics,
      recentSessions,
      directorAbiAnalysis,
      recommendations
    };
  }

  /**
   * Generate recommendations based on system status
   */
  private generateRecommendations(status: ATEAMStatus, metrics: any): string[] {
    const recommendations: string[] = [];
    
    if (status.systemHealth === 'critical') {
      recommendations.push('System health is critical - immediate attention required');
    } else if (status.systemHealth === 'warning') {
      recommendations.push('System health is warning - monitor closely');
    }
    
    if (status.constitutionalCompliance < this.config.constitutionalComplianceThreshold) {
      recommendations.push('Constitutional compliance below threshold - review violations');
    }
    
    if (metrics.averageGoalScore < 80) {
      recommendations.push('Average goal score below 80% - improve request processing');
    }
    
    if (metrics.averageConfidenceScore < 70) {
      recommendations.push('Average confidence score below 70% - reduce violations');
    }
    
    if (metrics.totalViolations > 0) {
      recommendations.push(`${metrics.totalViolations} total violations - address compliance issues`);
    }
    
    return recommendations;
  }
}

export default ATEAMSystem;
