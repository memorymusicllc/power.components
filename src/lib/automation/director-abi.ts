/**
 * Director Abi - The A-TEAM Director Agent
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Abi manages the Context Log, Intent Tracker, and APD (Architectural Progress Diagram).
 * She provides goal scoring and confidence assessment to the agent manager.
 * 
 * IMPORTANT: Abi does not share her analysis with other agents - only delivers GOAL % and CONFIDENCE %.
 */

import { EventEmitter } from 'events';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export interface ContextLogEntry {
  timestamp: string;
  agentId: string;
  sessionId: string;
  summary: string;
  goals: string[];
  status: 'in_progress' | 'completed' | 'failed';
  confidence: number;
}

export interface IntentTrackerEntry {
  id: string;
  timestamp: string;
  type: 'job_request' | 'chat' | 'task' | 'project' | 'sprint' | 'repo';
  intent: string;
  context: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  repoStatus?: string;
  repoGoal?: string;
  successMetrics?: string[];
  vision?: string;
  xIndexStatus?: string;
}

export interface APDNode {
  id: string;
  type: 'component' | 'feature' | 'system' | 'agent' | 'workflow';
  name: string;
  status: 'planned' | 'in_progress' | 'completed' | 'failed' | 'deprecated';
  dependencies: string[];
  metadata: {
    version?: string;
    lastModified?: string;
    health?: 'healthy' | 'warning' | 'critical';
    compliance?: 'compliant' | 'violation' | 'unknown';
    tests?: {
      unit: number;
      integration: number;
      e2e: number;
    };
    performance?: {
      renderTime?: number;
      memoryUsage?: number;
      errorRate?: number;
    };
  };
}

export interface APDEdge {
  from: string;
  to: string;
  type: 'dependency' | 'data_flow' | 'control_flow' | 'communication';
  status: 'active' | 'inactive' | 'error';
  metadata?: {
    latency?: number;
    reliability?: number;
    throughput?: number;
  };
}

export interface APD {
  version: string;
  lastUpdated: string;
  nodes: APDNode[];
  edges: APDEdge[];
  metadata: {
    totalComponents: number;
    completedComponents: number;
    failedComponents: number;
    overallHealth: 'healthy' | 'warning' | 'critical';
    constitutionalCompliance: number; // 0-100
  };
}

export interface GoalScore {
  goalPercentage: number;
  confidencePercentage: number;
  analysis: {
    userRequestClarity: number;
    implementationCompleteness: number;
    constitutionalCompliance: number;
    deploymentSuccess: number;
    verificationCompleteness: number;
  };
  violations: string[];
  recommendations: string[];
}

export class DirectorAbi extends EventEmitter {
  private contextLogPath: string;
  private intentTrackerPath: string;
  private apdPath: string;
  private contextLog: ContextLogEntry[] = [];
  private intentTracker: IntentTrackerEntry[] = [];
  private apd!: APD;

  constructor(workspaceRoot: string) {
    super();
    this.contextLogPath = join(workspaceRoot, 'Context Log.txt');
    this.intentTrackerPath = join(workspaceRoot, 'Intent Tracker.md');
    this.apdPath = join(workspaceRoot, 'apd.json');
    
    this.initializeAPD();
  }

  private initializeAPD(): void {
    this.apd = {
      version: '3.0.0',
      lastUpdated: new Date().toISOString(),
      nodes: [],
      edges: [],
      metadata: {
        totalComponents: 0,
        completedComponents: 0,
        failedComponents: 0,
        overallHealth: 'healthy',
        constitutionalCompliance: 100
      }
    };
  }

  /**
   * Load existing data from files
   */
  async initialize(): Promise<void> {
    try {
      await this.loadContextLog();
      await this.loadIntentTracker();
      await this.loadAPD();
    } catch (error) {
      console.warn('Director Abi: Failed to load existing data, starting fresh:', error);
    }
  }

  /**
   * Add entry to Context Log
   */
  async addContextLogEntry(entry: Omit<ContextLogEntry, 'timestamp'>): Promise<void> {
    const fullEntry: ContextLogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };

    this.contextLog.push(fullEntry);
    await this.saveContextLog();
    
    this.emit('contextLogUpdated', fullEntry);
  }

  /**
   * Add entry to Intent Tracker
   */
  async addIntentTrackerEntry(entry: Omit<IntentTrackerEntry, 'id' | 'timestamp'>): Promise<string> {
    const id = `intent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullEntry: IntentTrackerEntry = {
      ...entry,
      id,
      timestamp: new Date().toISOString()
    };

    this.intentTracker.push(fullEntry);
    await this.saveIntentTracker();
    
    this.emit('intentTrackerUpdated', fullEntry);
    return id;
  }

  /**
   * Update APD with new node or edge
   */
  async updateAPD(updates: { nodes?: APDNode[]; edges?: APDEdge[] }): Promise<void> {
    if (updates.nodes) {
      for (const node of updates.nodes) {
        const existingIndex = this.apd.nodes.findIndex(n => n.id === node.id);
        if (existingIndex >= 0) {
          this.apd.nodes[existingIndex] = node;
        } else {
          this.apd.nodes.push(node);
        }
      }
    }

    if (updates.edges) {
      for (const edge of updates.edges) {
        const existingIndex = this.apd.edges.findIndex(e => e.from === edge.from && e.to === edge.to);
        if (existingIndex >= 0) {
          this.apd.edges[existingIndex] = edge;
        } else {
          this.apd.edges.push(edge);
        }
      }
    }

    this.apd.lastUpdated = new Date().toISOString();
    this.updateAPDMetadata();
    await this.saveAPD();
    
    this.emit('apdUpdated', this.apd);
  }

  /**
   * Analyze agent reports and provide goal scoring
   */
  async analyzeAgentReports(
    userRequest: string,
    agentReports: Array<{
      agentId: string;
      report: string;
      completedTasks: string[];
      failedTasks: string[];
      deploymentStatus: 'success' | 'failed' | 'pending';
      verificationStatus: 'complete' | 'incomplete' | 'failed';
      constitutionalCompliance: 'compliant' | 'violation' | 'unknown';
    }>
  ): Promise<GoalScore> {
    const analysis = {
      userRequestClarity: this.analyzeRequestClarity(userRequest),
      implementationCompleteness: this.analyzeImplementationCompleteness(agentReports),
      constitutionalCompliance: this.analyzeConstitutionalCompliance(agentReports),
      deploymentSuccess: this.analyzeDeploymentSuccess(agentReports),
      verificationCompleteness: this.analyzeVerificationCompleteness(agentReports)
    };

    const violations = this.identifyViolations(agentReports);
    const recommendations = this.generateRecommendations(analysis, violations);

    const goalPercentage = this.calculateGoalPercentage(analysis);
    const confidencePercentage = this.calculateConfidencePercentage(analysis, violations);

    return {
      goalPercentage,
      confidencePercentage,
      analysis,
      violations,
      recommendations
    };
  }

  /**
   * Check if all mandatory procedures were completed
   */
  private checkMandatoryProcedures(agentReports: any[]): {
    pushedToGitHub: boolean;
    cloudflareDeployment: boolean;
    verifiedOnProd: boolean;
    screenshotTaken: boolean;
    docsUpdated: boolean;
    agentsSignedOff: boolean;
  } {
    const procedures = {
      pushedToGitHub: false,
      cloudflareDeployment: false,
      verifiedOnProd: false,
      screenshotTaken: false,
      docsUpdated: false,
      agentsSignedOff: false
    };

    for (const report of agentReports) {
      if (report.report.includes('pushed to GitHub') || report.report.includes('committed to main')) {
        procedures.pushedToGitHub = true;
      }
      if (report.deploymentStatus === 'success') {
        procedures.cloudflareDeployment = true;
      }
      if (report.verificationStatus === 'complete') {
        procedures.verifiedOnProd = true;
      }
      if (report.report.includes('screenshot') || report.report.includes('proof')) {
        procedures.screenshotTaken = true;
      }
      if (report.report.includes('documentation updated') || report.report.includes('docs updated')) {
        procedures.docsUpdated = true;
      }
    }

    // Check if all agents signed off (all reports completed)
    procedures.agentsSignedOff = agentReports.every(report => 
      report.completedTasks.length > 0 && report.failedTasks.length === 0
    );

    return procedures;
  }

  private analyzeRequestClarity(userRequest: string): number {
    // Analyze how clear and specific the user request is
    const clarityIndicators = [
      userRequest.length > 50, // Detailed request
      userRequest.includes('implement') || userRequest.includes('create') || userRequest.includes('add'),
      userRequest.includes('component') || userRequest.includes('feature') || userRequest.includes('system'),
      !userRequest.includes('?') || userRequest.includes('how') // Not just a question
    ];

    return (clarityIndicators.filter(Boolean).length / clarityIndicators.length) * 100;
  }

  private analyzeImplementationCompleteness(agentReports: any[]): number {
    const totalTasks = agentReports.reduce((sum, report) => 
      sum + report.completedTasks.length + report.failedTasks.length, 0
    );
    const completedTasks = agentReports.reduce((sum, report) => 
      sum + report.completedTasks.length, 0
    );

    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  }

  private analyzeConstitutionalCompliance(agentReports: any[]): number {
    const compliantReports = agentReports.filter(report => 
      report.constitutionalCompliance === 'compliant'
    ).length;

    return (compliantReports / agentReports.length) * 100;
  }

  private analyzeDeploymentSuccess(agentReports: any[]): number {
    const successfulDeployments = agentReports.filter(report => 
      report.deploymentStatus === 'success'
    ).length;

    return (successfulDeployments / agentReports.length) * 100;
  }

  private analyzeVerificationCompleteness(agentReports: any[]): number {
    const completeVerifications = agentReports.filter(report => 
      report.verificationStatus === 'complete'
    ).length;

    return (completeVerifications / agentReports.length) * 100;
  }

  private identifyViolations(agentReports: any[]): string[] {
    const violations: string[] = [];
    const procedures = this.checkMandatoryProcedures(agentReports);

    if (!procedures.pushedToGitHub) violations.push('Not pushed to GitHub');
    if (!procedures.cloudflareDeployment) violations.push('CloudFlare deployment not successful');
    if (!procedures.verifiedOnProd) violations.push('Not verified on DEV or PROD');
    if (!procedures.screenshotTaken) violations.push('No screenshot taken for user');
    if (!procedures.docsUpdated) violations.push('Documentation not updated to best-in-class standards');
    if (!procedures.agentsSignedOff) violations.push('Not all agents signed off');

    // Check for constitutional violations
    const constitutionalViolations = agentReports.filter(report => 
      report.constitutionalCompliance === 'violation'
    );

    if (constitutionalViolations.length > 0) {
      violations.push(`Constitutional violations detected in ${constitutionalViolations.length} agent reports`);
    }

    return violations;
  }

  private generateRecommendations(analysis: any, violations: string[]): string[] {
    const recommendations: string[] = [];

    if (analysis.userRequestClarity < 80) {
      recommendations.push('Improve user request clarity and specificity');
    }

    if (analysis.implementationCompleteness < 90) {
      recommendations.push('Complete all assigned tasks before reporting');
    }

    if (analysis.constitutionalCompliance < 100) {
      recommendations.push('Ensure full constitutional compliance in all operations');
    }

    if (analysis.deploymentSuccess < 100) {
      recommendations.push('Verify successful deployment to CloudFlare');
    }

    if (analysis.verificationCompleteness < 100) {
      recommendations.push('Complete full verification and testing');
    }

    return recommendations;
  }

  private calculateGoalPercentage(analysis: any): number {
    const weights = {
      userRequestClarity: 0.2,
      implementationCompleteness: 0.3,
      constitutionalCompliance: 0.2,
      deploymentSuccess: 0.15,
      verificationCompleteness: 0.15
    };

    return Object.entries(weights).reduce((total, [key, weight]) => {
      return total + (analysis[key] * weight);
    }, 0);
  }

  private calculateConfidencePercentage(analysis: any, violations: string[]): number {
    const baseConfidence = this.calculateGoalPercentage(analysis);
    const violationPenalty = violations.length * 10; // 10% penalty per violation
    
    return Math.max(0, baseConfidence - violationPenalty);
  }

  private updateAPDMetadata(): void {
    const totalComponents = this.apd.nodes.length;
    const completedComponents = this.apd.nodes.filter(n => n.status === 'completed').length;
    const failedComponents = this.apd.nodes.filter(n => n.status === 'failed').length;
    
    const healthyComponents = this.apd.nodes.filter(n => n.metadata.health === 'healthy').length;
    const overallHealth = healthyComponents / totalComponents > 0.8 ? 'healthy' : 
                        healthyComponents / totalComponents > 0.6 ? 'warning' : 'critical';
    
    const compliantComponents = this.apd.nodes.filter(n => n.metadata.compliance === 'compliant').length;
    const constitutionalCompliance = totalComponents > 0 ? (compliantComponents / totalComponents) * 100 : 100;

    this.apd.metadata = {
      totalComponents,
      completedComponents,
      failedComponents,
      overallHealth,
      constitutionalCompliance
    };
  }

  // File I/O methods
  private async loadContextLog(): Promise<void> {
    try {
      const content = await readFile(this.contextLogPath, 'utf-8');
      this.contextLog = JSON.parse(content);
    } catch (error) {
      this.contextLog = [];
    }
  }

  private async saveContextLog(): Promise<void> {
    await writeFile(this.contextLogPath, JSON.stringify(this.contextLog, null, 2));
  }

  private async loadIntentTracker(): Promise<void> {
    try {
      const content = await readFile(this.intentTrackerPath, 'utf-8');
      // Parse markdown format and extract entries
      this.intentTracker = this.parseIntentTrackerMarkdown(content);
    } catch (error) {
      this.intentTracker = [];
    }
  }

  private async saveIntentTracker(): Promise<void> {
    const markdown = this.generateIntentTrackerMarkdown();
    await writeFile(this.intentTrackerPath, markdown);
  }

  private async loadAPD(): Promise<void> {
    try {
      const content = await readFile(this.apdPath, 'utf-8');
      this.apd = JSON.parse(content);
    } catch (error) {
      this.initializeAPD();
    }
  }

  private async saveAPD(): Promise<void> {
    await writeFile(this.apdPath, JSON.stringify(this.apd, null, 2));
  }

  private parseIntentTrackerMarkdown(content: string): IntentTrackerEntry[] {
    // Parse markdown format and convert to entries
    // This is a simplified parser - in production, use a proper markdown parser
    const entries: IntentTrackerEntry[] = [];
    const lines = content.split('\n');
    
    let currentEntry: Partial<IntentTrackerEntry> = {};
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (currentEntry.id) {
          entries.push(currentEntry as IntentTrackerEntry);
        }
        currentEntry = {
          id: line.replace('## ', '').toLowerCase().replace(/\s+/g, '_'),
          timestamp: new Date().toISOString()
        };
      } else if (line.startsWith('- **Type:**')) {
        currentEntry.type = line.replace('- **Type:**', '').trim() as any;
      } else if (line.startsWith('- **Intent:**')) {
        currentEntry.intent = line.replace('- **Intent:**', '').trim();
      } else if (line.startsWith('- **Status:**')) {
        currentEntry.status = line.replace('- **Status:**', '').trim() as any;
      }
    }
    
    if (currentEntry.id) {
      entries.push(currentEntry as IntentTrackerEntry);
    }
    
    return entries;
  }

  private generateIntentTrackerMarkdown(): string {
    let markdown = '# Intent Tracker\n\n';
    markdown += 'Continuous tracking of project intents, goals, and status updates.\n\n';
    
    for (const entry of this.intentTracker) {
      markdown += `## ${entry.id}\n\n`;
      markdown += `- **Type:** ${entry.type}\n`;
      markdown += `- **Intent:** ${entry.intent}\n`;
      markdown += `- **Context:** ${entry.context}\n`;
      markdown += `- **Priority:** ${entry.priority}\n`;
      markdown += `- **Status:** ${entry.status}\n`;
      markdown += `- **Timestamp:** ${entry.timestamp}\n\n`;
      
      if (entry.repoStatus) {
        markdown += `- **Repo Status:** ${entry.repoStatus}\n`;
      }
      if (entry.repoGoal) {
        markdown += `- **Repo Goal:** ${entry.repoGoal}\n`;
      }
      if (entry.successMetrics) {
        markdown += `- **Success Metrics:** ${entry.successMetrics.join(', ')}\n`;
      }
      if (entry.vision) {
        markdown += `- **Vision:** ${entry.vision}\n`;
      }
      if (entry.xIndexStatus) {
        markdown += `- **X-Index Status:** ${entry.xIndexStatus}\n`;
      }
      
      markdown += '\n---\n\n';
    }
    
    return markdown;
  }

  // Public getters for other agents (read-only access)
  getContextLog(): ContextLogEntry[] {
    return [...this.contextLog];
  }

  getIntentTracker(): IntentTrackerEntry[] {
    return [...this.intentTracker];
  }

  getAPD(): APD {
    return JSON.parse(JSON.stringify(this.apd)); // Deep copy
  }

  // Status methods
  getSystemHealth(): {
    overall: 'healthy' | 'warning' | 'critical';
    contextLogEntries: number;
    intentTrackerEntries: number;
    apdNodes: number;
    constitutionalCompliance: number;
  } {
    return {
      overall: this.apd.metadata.overallHealth,
      contextLogEntries: this.contextLog.length,
      intentTrackerEntries: this.intentTracker.length,
      apdNodes: this.apd.nodes.length,
      constitutionalCompliance: this.apd.metadata.constitutionalCompliance
    };
  }
}

export default DirectorAbi;
