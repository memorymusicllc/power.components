/**
 * Agent Manager - The A-TEAM Orchestrator
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Manages and orchestrates all specialized agents in the A-TEAM system.
 * Coordinates workflow, assigns tasks, and ensures constitutional compliance.
 */

import { EventEmitter } from 'events';
import { DirectorAbi, GoalScore } from './director-abi';
import { ChatAnalysisAgent } from './chat-analysis-agent';
import { VerificationAgent } from './verification-agent';
import { DeploymentAgent } from './deployment-agent';
import { GitHubAgent } from './github-agent';
import { DocumentationAgent } from './documentation-agent';
import { TestingAgent } from './testing-agent';

export interface AgentTask {
  id: string;
  agentId: string;
  type: 'analysis' | 'implementation' | 'testing' | 'deployment' | 'verification' | 'documentation';
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  dependencies: string[];
  estimatedDuration: number; // in minutes
  actualDuration?: number;
  result?: any;
  error?: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface AgentReport {
  agentId: string;
  sessionId: string;
  report: string;
  completedTasks: string[];
  failedTasks: string[];
  deploymentStatus: 'success' | 'failed' | 'pending';
  verificationStatus: 'complete' | 'incomplete' | 'failed';
  constitutionalCompliance: 'compliant' | 'violation' | 'unknown';
  metrics: {
    tasksCompleted: number;
    tasksFailed: number;
    timeSpent: number;
    errorsEncountered: number;
  };
  timestamp: string;
}

export interface WorkflowSession {
  id: string;
  userRequest: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  agents: string[];
  tasks: AgentTask[];
  reports: AgentReport[];
  goalScore?: GoalScore;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export class AgentManager extends EventEmitter {
  private directorAbi: DirectorAbi;
  private agents: Map<string, any> = new Map();
  private activeSessions: Map<string, WorkflowSession> = new Map();
  private taskQueue: AgentTask[] = [];
  private isProcessing = false;

  constructor(workspaceRoot: string) {
    super();
    this.directorAbi = new DirectorAbi(workspaceRoot);
    this.initializeAgents(workspaceRoot);
  }

  private initializeAgents(workspaceRoot: string): void {
    // Initialize all specialized agents
    this.agents.set('chat-analysis', new ChatAnalysisAgent(workspaceRoot));
    this.agents.set('verification', new VerificationAgent(workspaceRoot));
    this.agents.set('deployment', new DeploymentAgent(workspaceRoot));
    this.agents.set('github', new GitHubAgent(workspaceRoot));
    this.agents.set('documentation', new DocumentationAgent(workspaceRoot));
    this.agents.set('testing', new TestingAgent(workspaceRoot));

    // Set up agent event listeners
    for (const [agentId, agent] of this.agents) {
      agent.on('taskCompleted', (task: AgentTask) => {
        this.handleTaskCompleted(agentId, task);
      });
      
      agent.on('taskFailed', (task: AgentTask, error: string) => {
        this.handleTaskFailed(agentId, task, error);
      });
      
      agent.on('reportReady', (report: AgentReport) => {
        this.handleAgentReport(agentId, report);
      });
    }
  }

  /**
   * Initialize the A-TEAM system
   */
  async initialize(): Promise<void> {
    await this.directorAbi.initialize();
    
    // Initialize all agents
    for (const [agentId, agent] of this.agents) {
      if (typeof agent.initialize === 'function') {
        await agent.initialize();
      }
    }

    this.emit('systemInitialized');
  }

  /**
   * Process a user request with full automation
   */
  async processUserRequest(userRequest: string): Promise<WorkflowSession> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const session: WorkflowSession = {
      id: sessionId,
      userRequest,
      status: 'pending',
      agents: [],
      tasks: [],
      reports: [],
      createdAt: new Date().toISOString()
    };

    this.activeSessions.set(sessionId, session);
    
    try {
      // Step 1: Analyze the request and create tasks
      await this.analyzeAndPlan(session);
      
      // Step 2: Execute tasks in parallel where possible
      await this.executeWorkflow(session);
      
      // Step 3: Collect reports and get goal scoring from Abi
      await this.collectReportsAndScore(session);
      
      // Step 4: Complete the session
      session.status = 'completed';
      session.completedAt = new Date().toISOString();
      
      this.emit('sessionCompleted', session);
      
    } catch (error) {
      session.status = 'failed';
      session.completedAt = new Date().toISOString();
      
      this.emit('sessionFailed', session, error);
      throw error;
    }

    return session;
  }

  /**
   * Analyze user request and create task plan
   */
  private async analyzeAndPlan(session: WorkflowSession): Promise<void> {
    session.status = 'in_progress';
    session.startedAt = new Date().toISOString();

    // Add context log entry
    await this.directorAbi.addContextLogEntry({
      agentId: 'agent-manager',
      sessionId: session.id,
      summary: `Processing user request: ${session.userRequest}`,
      goals: this.extractGoals(session.userRequest),
      status: 'in_progress',
      confidence: 0
    });

    // Add intent tracker entry
    await this.directorAbi.addIntentTrackerEntry({
      type: 'job_request',
      intent: session.userRequest,
      context: 'User request for A-TEAM processing',
      priority: 'high',
      status: 'in_progress'
    });

    // Create tasks based on request analysis
    const tasks = await this.createTaskPlan(session.userRequest);
    session.tasks = tasks;
    session.agents = [...new Set(tasks.map(task => task.agentId))];

    // Add tasks to queue
    this.taskQueue.push(...tasks);
  }

  /**
   * Execute the workflow by processing tasks
   */
  private async executeWorkflow(session: WorkflowSession): Promise<void> {
    this.isProcessing = true;

    try {
      // Process tasks in dependency order
      while (this.taskQueue.length > 0) {
        const readyTasks = this.getReadyTasks();
        
        if (readyTasks.length === 0) {
          // Wait for dependencies to complete
          await this.waitForDependencies();
          continue;
        }

        // Execute ready tasks in parallel
        const taskPromises = readyTasks.map(task => this.executeTask(task));
        await Promise.allSettled(taskPromises);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Collect agent reports and get goal scoring from Abi
   */
  private async collectReportsAndScore(session: WorkflowSession): Promise<void> {
    // Collect reports from all agents
    const agentReports: AgentReport[] = [];
    
    for (const agentId of session.agents) {
      const agent = this.agents.get(agentId);
      if (agent && typeof agent.generateReport === 'function') {
        const report = await agent.generateReport(session.id);
        if (report) {
          agentReports.push(report);
          session.reports.push(report);
        }
      }
    }

    // Get goal scoring from Director Abi
    const goalScore = await this.directorAbi.analyzeAgentReports(
      session.userRequest,
      agentReports
    );
    
    session.goalScore = goalScore;

    // Update context log with final summary
    await this.directorAbi.addContextLogEntry({
      agentId: 'agent-manager',
      sessionId: session.id,
      summary: `Session completed with ${goalScore.goalPercentage}% goal achievement and ${goalScore.confidencePercentage}% confidence`,
      goals: this.extractGoals(session.userRequest),
      status: 'completed',
      confidence: goalScore.confidencePercentage
    });

    // Update intent tracker
    const intentId = await this.directorAbi.addIntentTrackerEntry({
      type: 'job_request',
      intent: session.userRequest,
      context: `Completed with ${goalScore.goalPercentage}% goal achievement`,
      priority: 'high',
      status: 'completed'
    });
  }

  /**
   * Create task plan based on user request
   */
  private async createTaskPlan(userRequest: string): Promise<AgentTask[]> {
    const tasks: AgentTask[] = [];
    const baseTime = Date.now();

    // Always start with chat analysis
    tasks.push({
      id: `task_${baseTime}_chat_analysis`,
      agentId: 'chat-analysis',
      type: 'analysis',
      description: 'Analyze chat history and extract all user requests',
      priority: 'critical',
      status: 'pending',
      dependencies: [],
      estimatedDuration: 5,
      createdAt: new Date().toISOString()
    });

    // Add verification task
    tasks.push({
      id: `task_${baseTime}_verification`,
      agentId: 'verification',
      type: 'verification',
      description: 'Verify no fake code and constitutional compliance',
      priority: 'critical',
      status: 'pending',
      dependencies: [`task_${baseTime}_chat_analysis`],
      estimatedDuration: 10,
      createdAt: new Date().toISOString()
    });

    // Add implementation tasks based on request type
    if (this.isImplementationRequest(userRequest)) {
      tasks.push({
        id: `task_${baseTime}_implementation`,
        agentId: 'implementation',
        type: 'implementation',
        description: 'Implement requested features/components',
        priority: 'high',
        status: 'pending',
        dependencies: [`task_${baseTime}_verification`],
        estimatedDuration: 30,
        createdAt: new Date().toISOString()
      });
    }

    // Add testing task
    tasks.push({
      id: `task_${baseTime}_testing`,
      agentId: 'testing',
      type: 'testing',
      description: 'Run comprehensive tests',
      priority: 'high',
      status: 'pending',
      dependencies: [`task_${baseTime}_verification`],
      estimatedDuration: 15,
      createdAt: new Date().toISOString()
    });

    // Add GitHub task
    tasks.push({
      id: `task_${baseTime}_github`,
      agentId: 'github',
      type: 'deployment',
      description: 'Push to GitHub and manage PRs',
      priority: 'high',
      status: 'pending',
      dependencies: [`task_${baseTime}_testing`],
      estimatedDuration: 10,
      createdAt: new Date().toISOString()
    });

    // Add CloudFlare deployment task
    tasks.push({
      id: `task_${baseTime}_deployment`,
      agentId: 'deployment',
      type: 'deployment',
      description: 'Deploy to CloudFlare and verify',
      priority: 'high',
      status: 'pending',
      dependencies: [`task_${baseTime}_github`],
      estimatedDuration: 15,
      createdAt: new Date().toISOString()
    });

    // Add documentation task
    tasks.push({
      id: `task_${baseTime}_documentation`,
      agentId: 'documentation',
      type: 'documentation',
      description: 'Update documentation for AI agents',
      priority: 'medium',
      status: 'pending',
      dependencies: [`task_${baseTime}_deployment`],
      estimatedDuration: 10,
      createdAt: new Date().toISOString()
    });

    return tasks;
  }

  /**
   * Execute a single task
   */
  private async executeTask(task: AgentTask): Promise<void> {
    const agent = this.agents.get(task.agentId);
    if (!agent) {
      throw new Error(`Agent ${task.agentId} not found`);
    }

    task.status = 'in_progress';
    task.startedAt = new Date().toISOString();

    try {
      const result = await agent.executeTask(task);
      task.result = result;
      task.status = 'completed';
      task.completedAt = new Date().toISOString();
      task.actualDuration = this.calculateDuration(task.startedAt!, task.completedAt);

      this.emit('taskCompleted', task);
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : String(error);
      task.completedAt = new Date().toISOString();
      task.actualDuration = this.calculateDuration(task.startedAt!, task.completedAt);

      this.emit('taskFailed', task, task.error);
      throw error;
    }
  }

  /**
   * Get tasks that are ready to execute (dependencies completed)
   */
  private getReadyTasks(): AgentTask[] {
    return this.taskQueue.filter(task => {
      if (task.status !== 'pending') return false;
      
      return task.dependencies.every(depId => {
        const depTask = this.taskQueue.find(t => t.id === depId);
        return depTask && depTask.status === 'completed';
      });
    });
  }

  /**
   * Wait for dependencies to complete
   */
  private async waitForDependencies(): Promise<void> {
    return new Promise(resolve => {
      const checkDependencies = () => {
        const readyTasks = this.getReadyTasks();
        if (readyTasks.length > 0) {
          resolve();
        } else {
          setTimeout(checkDependencies, 1000);
        }
      };
      checkDependencies();
    });
  }

  /**
   * Handle task completion
   */
  private handleTaskCompleted(agentId: string, task: AgentTask): void {
    this.emit('taskCompleted', { agentId, task });
  }

  /**
   * Handle task failure
   */
  private handleTaskFailed(agentId: string, task: AgentTask, error: string): void {
    this.emit('taskFailed', { agentId, task, error });
  }

  /**
   * Handle agent report
   */
  private handleAgentReport(agentId: string, report: AgentReport): void {
    this.emit('agentReport', { agentId, report });
  }

  /**
   * Extract goals from user request
   */
  private extractGoals(userRequest: string): string[] {
    const goals: string[] = [];
    
    if (userRequest.includes('implement') || userRequest.includes('create') || userRequest.includes('add')) {
      goals.push('implementation');
    }
    
    if (userRequest.includes('test') || userRequest.includes('verify')) {
      goals.push('testing');
    }
    
    if (userRequest.includes('deploy') || userRequest.includes('push')) {
      goals.push('deployment');
    }
    
    if (userRequest.includes('document') || userRequest.includes('update docs')) {
      goals.push('documentation');
    }

    return goals;
  }

  /**
   * Check if request is for implementation
   */
  private isImplementationRequest(userRequest: string): boolean {
    const implementationKeywords = [
      'implement', 'create', 'add', 'build', 'develop', 'code',
      'component', 'feature', 'system', 'function', 'class'
    ];
    
    return implementationKeywords.some(keyword => 
      userRequest.toLowerCase().includes(keyword)
    );
  }

  /**
   * Calculate task duration
   */
  private calculateDuration(startTime: string, endTime: string): number {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    return Math.round((end - start) / 1000 / 60); // minutes
  }

  // Public getters
  getActiveSessions(): WorkflowSession[] {
    return Array.from(this.activeSessions.values());
  }

  getTaskQueue(): AgentTask[] {
    return [...this.taskQueue];
  }

  getSystemStatus(): {
    isProcessing: boolean;
    activeSessions: number;
    queuedTasks: number;
    agents: string[];
  } {
    return {
      isProcessing: this.isProcessing,
      activeSessions: this.activeSessions.size,
      queuedTasks: this.taskQueue.length,
      agents: Array.from(this.agents.keys())
    };
  }
}

export default AgentManager;
