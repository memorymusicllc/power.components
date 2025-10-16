/**
 * Chat Analysis Agent - The A-TEAM Request Tracker
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Analyzes all chat history to extract user requests, track completion status,
 * and identify unresolved issues. Calculates likelihood of unresolved requests.
 */

import { EventEmitter } from 'events';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export interface ChatRequest {
  id: string;
  timestamp: string;
  originalText: string;
  extractedRequest: string;
  category: 'implementation' | 'bug_fix' | 'feature_request' | 'documentation' | 'testing' | 'deployment' | 'other';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'unresolved';
  mentions: number; // How many times this subject was brought up
  unresolvedLikelihood: number; // 10% increase per mention after first
  context: string;
  relatedRequests: string[];
  assignedAgent?: string;
  completionEvidence?: string[];
  userCritique?: string[];
  nextSteps?: string[];
  todos?: string[];
}

export interface ChatAnalysisReport {
  agentId: string;
  sessionId: string;
  totalRequests: number;
  completedRequests: number;
  unresolvedRequests: number;
  pendingRequests: number;
  failedRequests: number;
  averageUnresolvedLikelihood: number;
  criticalIssues: ChatRequest[];
  userCritiques: string[];
  nextSteps: string[];
  todos: string[];
  recommendations: string[];
  timestamp: string;
}

export class ChatAnalysisAgent extends EventEmitter {
  private workspaceRoot: string;
  private requests: Map<string, ChatRequest> = new Map();
  private chatHistory: string[] = [];
  private analysisReportPath: string;

  constructor(workspaceRoot: string) {
    super();
    this.workspaceRoot = workspaceRoot;
    this.analysisReportPath = join(workspaceRoot, 'chat-analysis-report.json');
  }

  /**
   * Initialize the agent
   */
  async initialize(): Promise<void> {
    await this.loadChatHistory();
    await this.loadExistingRequests();
  }

  /**
   * Execute chat analysis task
   */
  async executeTask(task: any): Promise<ChatAnalysisReport> {
    // Analyze all chat history
    await this.analyzeChatHistory();
    
    // Update request tracking
    await this.updateRequestTracking();
    
    // Generate comprehensive report
    const report = await this.generateReport(task.sessionId);
    
    this.emit('taskCompleted', task);
    this.emit('reportReady', report);
    
    return report;
  }

  /**
   * Generate final report
   */
  async generateReport(sessionId: string): Promise<ChatAnalysisReport> {
    const allRequests = Array.from(this.requests.values());
    
    const report: ChatAnalysisReport = {
      agentId: 'chat-analysis',
      sessionId,
      totalRequests: allRequests.length,
      completedRequests: allRequests.filter(r => r.status === 'completed').length,
      unresolvedRequests: allRequests.filter(r => r.status === 'unresolved').length,
      pendingRequests: allRequests.filter(r => r.status === 'pending').length,
      failedRequests: allRequests.filter(r => r.status === 'failed').length,
      averageUnresolvedLikelihood: this.calculateAverageUnresolvedLikelihood(allRequests),
      criticalIssues: allRequests.filter(r => r.priority === 'critical' && r.status !== 'completed'),
      userCritiques: this.extractUserCritiques(),
      nextSteps: this.extractNextSteps(),
      todos: this.extractTodos(),
      recommendations: this.generateRecommendations(allRequests),
      timestamp: new Date().toISOString()
    };

    await this.saveReport(report);
    return report;
  }

  /**
   * Load chat history from various sources
   */
  private async loadChatHistory(): Promise<void> {
    try {
      // Load from conversation history files
      const conversationFiles = [
        'conversation-history.md',
        'chat-log.txt',
        'session-history.json'
      ];

      for (const filename of conversationFiles) {
        try {
          const content = await readFile(join(this.workspaceRoot, filename), 'utf-8');
          this.chatHistory.push(content);
        } catch (error) {
          // File doesn't exist, continue
        }
      }

      // If no files found, create a placeholder for current session
      if (this.chatHistory.length === 0) {
        this.chatHistory.push('Current session chat history will be analyzed in real-time.');
      }
    } catch (error) {
      console.warn('Chat Analysis Agent: Failed to load chat history:', error);
    }
  }

  /**
   * Load existing requests from previous analysis
   */
  private async loadExistingRequests(): Promise<void> {
    try {
      const content = await readFile(this.analysisReportPath, 'utf-8');
      const data = JSON.parse(content);
      
      if (data.requests) {
        for (const request of data.requests) {
          this.requests.set(request.id, request);
        }
      }
    } catch (error) {
      // No existing requests, start fresh
    }
  }

  /**
   * Analyze chat history to extract requests
   */
  private async analyzeChatHistory(): Promise<void> {
    for (const chatContent of this.chatHistory) {
      const requests = this.extractRequestsFromText(chatContent);
      
      for (const request of requests) {
        await this.processRequest(request);
      }
    }
  }

  /**
   * Extract requests from chat text
   */
  private extractRequestsFromText(text: string): Partial<ChatRequest>[] {
    const requests: Partial<ChatRequest>[] = [];
    const lines = text.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Look for request patterns
      if (this.isRequestLine(line)) {
        const request = this.parseRequestLine(line, i, lines);
        if (request) {
          requests.push(request);
        }
      }
      
      // Look for user critiques
      if (this.isCritiqueLine(line)) {
        const critique = this.extractCritique(line);
        if (critique) {
          // Find related request and add critique
          const relatedRequest = this.findRelatedRequest(line, requests);
          if (relatedRequest) {
            if (!relatedRequest.userCritique) {
              relatedRequest.userCritique = [];
            }
            relatedRequest.userCritique.push(critique);
          }
        }
      }
      
      // Look for next steps
      if (this.isNextStepsLine(line)) {
        const nextStep = this.extractNextStep(line);
        if (nextStep) {
          // Find related request and add next step
          const relatedRequest = this.findRelatedRequest(line, requests);
          if (relatedRequest) {
            if (!relatedRequest.nextSteps) {
              relatedRequest.nextSteps = [];
            }
            relatedRequest.nextSteps.push(nextStep);
          }
        }
      }
      
      // Look for todos
      if (this.isTodoLine(line)) {
        const todo = this.extractTodo(line);
        if (todo) {
          // Find related request and add todo
          const relatedRequest = this.findRelatedRequest(line, requests);
          if (relatedRequest) {
            if (!relatedRequest.todos) {
              relatedRequest.todos = [];
            }
            relatedRequest.todos.push(todo);
          }
        }
      }
    }
    
    return requests;
  }

  /**
   * Check if line contains a request
   */
  private isRequestLine(line: string): boolean {
    const requestPatterns = [
      /^(can you|please|i need|i want|i wish|add|create|implement|build|make|fix|update|change|modify)/i,
      /^(add|create|implement|build|make|fix|update|change|modify)\s+/i,
      /^(i need|i want|i wish|can you|please)\s+/i,
      /^(todo|task|feature|component|system|function|class)\s+/i
    ];
    
    return requestPatterns.some(pattern => pattern.test(line));
  }

  /**
   * Check if line contains user critique
   */
  private isCritiqueLine(line: string): boolean {
    const critiquePatterns = [
      /^(issue|problem|error|bug|doesn't work|not working|failed|broken)/i,
      /^(this is|that's|it's)\s+(wrong|incorrect|not right|not working)/i,
      /^(i'm having|i have|there's)\s+(trouble|problems|issues)/i
    ];
    
    return critiquePatterns.some(pattern => pattern.test(line));
  }

  /**
   * Check if line contains next steps
   */
  private isNextStepsLine(line: string): boolean {
    const nextStepsPatterns = [
      /^(next|then|after that|next step|next steps)/i,
      /^(we should|we need to|we have to)/i,
      /^(the next|next we|then we)/i
    ];
    
    return nextStepsPatterns.some(pattern => pattern.test(line));
  }

  /**
   * Check if line contains todo
   */
  private isTodoLine(line: string): boolean {
    const todoPatterns = [
      /^[-*]\s+/,
      /^(todo|task|item|action):/i,
      /^\d+\.\s+/
    ];
    
    return todoPatterns.some(pattern => pattern.test(line));
  }

  /**
   * Parse request line into request object
   */
  private parseRequestLine(line: string, lineIndex: number, allLines: string[]): Partial<ChatRequest> | null {
    const id = `request_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id,
      timestamp: new Date().toISOString(),
      originalText: line,
      extractedRequest: this.cleanRequestText(line),
      category: this.categorizeRequest(line),
      priority: this.determinePriority(line),
      status: 'pending',
      mentions: 1,
      unresolvedLikelihood: 0,
      context: this.extractContext(line, lineIndex, allLines)
    };
  }

  /**
   * Clean and normalize request text
   */
  private cleanRequestText(text: string): string {
    return text
      .replace(/^(can you|please|i need|i want|i wish)\s+/i, '')
      .replace(/^(add|create|implement|build|make|fix|update|change|modify)\s+/i, '')
      .trim();
  }

  /**
   * Categorize request type
   */
  private categorizeRequest(text: string): ChatRequest['category'] {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('bug') || lowerText.includes('fix') || lowerText.includes('error')) {
      return 'bug_fix';
    }
    
    if (lowerText.includes('feature') || lowerText.includes('add') || lowerText.includes('create')) {
      return 'feature_request';
    }
    
    if (lowerText.includes('document') || lowerText.includes('readme') || lowerText.includes('docs')) {
      return 'documentation';
    }
    
    if (lowerText.includes('test') || lowerText.includes('testing')) {
      return 'testing';
    }
    
    if (lowerText.includes('deploy') || lowerText.includes('push') || lowerText.includes('github')) {
      return 'deployment';
    }
    
    if (lowerText.includes('implement') || lowerText.includes('code') || lowerText.includes('component')) {
      return 'implementation';
    }
    
    return 'other';
  }

  /**
   * Determine request priority
   */
  private determinePriority(text: string): ChatRequest['priority'] {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('critical') || lowerText.includes('urgent') || lowerText.includes('asap')) {
      return 'critical';
    }
    
    if (lowerText.includes('important') || lowerText.includes('high priority')) {
      return 'high';
    }
    
    if (lowerText.includes('low priority') || lowerText.includes('when you have time')) {
      return 'low';
    }
    
    return 'medium';
  }

  /**
   * Extract context around the request
   */
  private extractContext(line: string, lineIndex: number, allLines: string[]): string {
    const contextLines = [];
    const start = Math.max(0, lineIndex - 2);
    const end = Math.min(allLines.length, lineIndex + 3);
    
    for (let i = start; i < end; i++) {
      if (i !== lineIndex) {
        contextLines.push(allLines[i].trim());
      }
    }
    
    return contextLines.join(' ').substring(0, 200);
  }

  /**
   * Extract critique from line
   */
  private extractCritique(line: string): string | null {
    return line.trim();
  }

  /**
   * Extract next step from line
   */
  private extractNextStep(line: string): string | null {
    return line.trim();
  }

  /**
   * Extract todo from line
   */
  private extractTodo(line: string): string | null {
    return line.replace(/^[-*]\s+/, '').replace(/^(todo|task|item|action):\s*/i, '').trim();
  }

  /**
   * Find related request for critique/next step/todo
   */
  private findRelatedRequest(line: string, requests: Partial<ChatRequest>[]): Partial<ChatRequest> | null {
    // Find the most recent request that could be related
    return requests[requests.length - 1] || null;
  }

  /**
   * Process a request (handle duplicates and updates)
   */
  private async processRequest(request: Partial<ChatRequest>): Promise<void> {
    if (!request.id || !request.extractedRequest) return;
    
    // Check for existing similar request
    const existingRequest = this.findSimilarRequest(request.extractedRequest);
    
    if (existingRequest) {
      // Update existing request
      existingRequest.mentions++;
      existingRequest.unresolvedLikelihood = Math.min(100, existingRequest.unresolvedLikelihood + 10);
      
      // Update context and related information
      if (request.userCritique) {
        if (!existingRequest.userCritique) {
          existingRequest.userCritique = [];
        }
        existingRequest.userCritique.push(...request.userCritique);
      }
      
      if (request.nextSteps) {
        if (!existingRequest.nextSteps) {
          existingRequest.nextSteps = [];
        }
        existingRequest.nextSteps.push(...request.nextSteps);
      }
      
      if (request.todos) {
        if (!existingRequest.todos) {
          existingRequest.todos = [];
        }
        existingRequest.todos.push(...request.todos);
      }
    } else {
      // Add new request
      const fullRequest: ChatRequest = {
        id: request.id,
        timestamp: request.timestamp || new Date().toISOString(),
        originalText: request.originalText || '',
        extractedRequest: request.extractedRequest,
        category: request.category || 'other',
        priority: request.priority || 'medium',
        status: 'pending',
        mentions: 1,
        unresolvedLikelihood: 0,
        context: request.context || '',
        relatedRequests: [],
        userCritique: request.userCritique || [],
        nextSteps: request.nextSteps || [],
        todos: request.todos || []
      };
      
      this.requests.set(fullRequest.id, fullRequest);
    }
  }

  /**
   * Find similar existing request
   */
  private findSimilarRequest(extractedRequest: string): ChatRequest | null {
    const normalizedRequest = extractedRequest.toLowerCase().trim();
    
    for (const request of this.requests.values()) {
      const normalizedExisting = request.extractedRequest.toLowerCase().trim();
      
      // Check for similarity (simple word overlap for now)
      const requestWords = normalizedRequest.split(/\s+/);
      const existingWords = normalizedExisting.split(/\s+/);
      
      const commonWords = requestWords.filter(word => existingWords.includes(word));
      const similarity = commonWords.length / Math.max(requestWords.length, existingWords.length);
      
      if (similarity > 0.6) { // 60% similarity threshold
        return request;
      }
    }
    
    return null;
  }

  /**
   * Update request tracking based on completion evidence
   */
  private async updateRequestTracking(): Promise<void> {
    for (const request of this.requests.values()) {
      // Check for completion evidence
      const completionEvidence = this.findCompletionEvidence(request);
      
      if (completionEvidence.length > 0) {
        request.status = 'completed';
        request.completionEvidence = completionEvidence;
        request.unresolvedLikelihood = 0;
      } else if (request.mentions > 1) {
        // If mentioned multiple times without completion evidence, mark as unresolved
        request.status = 'unresolved';
      }
    }
  }

  /**
   * Find completion evidence for a request
   */
  private findCompletionEvidence(request: ChatRequest): string[] {
    const evidence: string[] = [];
    const lowerRequest = request.extractedRequest.toLowerCase();
    
    // Look for completion indicators in chat history
    for (const chatContent of this.chatHistory) {
      const lowerChat = chatContent.toLowerCase();
      
      if (lowerChat.includes('completed') || lowerChat.includes('done') || lowerChat.includes('finished')) {
        // Check if this completion relates to the request
        const requestWords = lowerRequest.split(/\s+/);
        const hasCommonWords = requestWords.some(word => 
          word.length > 3 && lowerChat.includes(word)
        );
        
        if (hasCommonWords) {
          evidence.push('Completion mentioned in chat');
        }
      }
    }
    
    return evidence;
  }

  /**
   * Calculate average unresolved likelihood
   */
  private calculateAverageUnresolvedLikelihood(requests: ChatRequest[]): number {
    if (requests.length === 0) return 0;
    
    const totalLikelihood = requests.reduce((sum, request) => sum + request.unresolvedLikelihood, 0);
    return totalLikelihood / requests.length;
  }

  /**
   * Extract all user critiques
   */
  private extractUserCritiques(): string[] {
    const critiques: string[] = [];
    
    for (const request of this.requests.values()) {
      if (request.userCritique) {
        critiques.push(...request.userCritique);
      }
    }
    
    return [...new Set(critiques)]; // Remove duplicates
  }

  /**
   * Extract all next steps
   */
  private extractNextSteps(): string[] {
    const nextSteps: string[] = [];
    
    for (const request of this.requests.values()) {
      if (request.nextSteps) {
        nextSteps.push(...request.nextSteps);
      }
    }
    
    return [...new Set(nextSteps)]; // Remove duplicates
  }

  /**
   * Extract all todos
   */
  private extractTodos(): string[] {
    const todos: string[] = [];
    
    for (const request of this.requests.values()) {
      if (request.todos) {
        todos.push(...request.todos);
      }
    }
    
    return [...new Set(todos)]; // Remove duplicates
  }

  /**
   * Generate recommendations based on analysis
   */
  private generateRecommendations(requests: ChatRequest[]): string[] {
    const recommendations: string[] = [];
    
    const unresolvedRequests = requests.filter(r => r.status === 'unresolved');
    const highLikelihoodRequests = requests.filter(r => r.unresolvedLikelihood > 50);
    const criticalRequests = requests.filter(r => r.priority === 'critical' && r.status !== 'completed');
    
    if (unresolvedRequests.length > 0) {
      recommendations.push(`Address ${unresolvedRequests.length} unresolved requests`);
    }
    
    if (highLikelihoodRequests.length > 0) {
      recommendations.push(`Prioritize ${highLikelihoodRequests.length} high-likelihood unresolved requests`);
    }
    
    if (criticalRequests.length > 0) {
      recommendations.push(`Immediately address ${criticalRequests.length} critical requests`);
    }
    
    const requestsWithCritiques = requests.filter(r => r.userCritique && r.userCritique.length > 0);
    if (requestsWithCritiques.length > 0) {
      recommendations.push(`Address user critiques for ${requestsWithCritiques.length} requests`);
    }
    
    return recommendations;
  }

  /**
   * Save analysis report
   */
  private async saveReport(report: ChatAnalysisReport): Promise<void> {
    const data = {
      report,
      requests: Array.from(this.requests.values()),
      lastUpdated: new Date().toISOString()
    };
    
    await writeFile(this.analysisReportPath, JSON.stringify(data, null, 2));
  }

  // Public getters
  getRequests(): ChatRequest[] {
    return Array.from(this.requests.values());
  }

  getUnresolvedRequests(): ChatRequest[] {
    return Array.from(this.requests.values()).filter(r => r.status === 'unresolved');
  }

  getCriticalRequests(): ChatRequest[] {
    return Array.from(this.requests.values()).filter(r => r.priority === 'critical' && r.status !== 'completed');
  }
}

export default ChatAnalysisAgent;
