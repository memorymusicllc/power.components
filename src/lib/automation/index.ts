/**
 * A-TEAM System - Main Export
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Main export file for the A-TEAM system and all its components.
 */

// Core System
export { default as ATEAMSystem } from './ateam-system';
export { default as AgentManager } from './agent-manager';
export { default as DirectorAbi } from './director-abi';

// Specialized Agents
export { default as ChatAnalysisAgent } from './chat-analysis-agent';
export { default as VerificationAgent } from './verification-agent';
export { default as GitHubAgent } from './github-agent';
export { default as DeploymentAgent } from './deployment-agent';
export { default as DocumentationAgent } from './documentation-agent';
export { default as TestingAgent } from './testing-agent';

// Dashboard
export { default as ATEAMDashboard } from './ateam-dashboard';

// Types
export type {
  ATEAMStatus,
  ATEAMConfig,
  ATEAMResult
} from './ateam-system';

export type {
  AgentTask,
  AgentReport,
  WorkflowSession
} from './agent-manager';

export type {
  ContextLogEntry,
  IntentTrackerEntry,
  APDNode,
  APDEdge,
  APD,
  GoalScore
} from './director-abi';

export type {
  ChatRequest,
  ChatAnalysisReport
} from './chat-analysis-agent';

export type {
  VerificationResult,
  VerificationViolation,
  VerificationReport
} from './verification-agent';

export type {
  GitHubOperation,
  GitHubReport
} from './github-agent';

export type {
  DeploymentOperation,
  DeploymentReport
} from './deployment-agent';

export type {
  DocumentationOperation,
  DocumentationReport
} from './documentation-agent';

export type {
  TestingOperation,
  TestResult,
  TestingReport
} from './testing-agent';

// Utility Functions
export const createATEAMSystem = (config: ATEAMConfig): ATEAMSystem => {
  return new ATEAMSystem(config);
};

export const createATEAMConfig = (workspaceRoot: string, options: Partial<ATEAMConfig> = {}): ATEAMConfig => {
  return {
    workspaceRoot,
    autoStart: true,
    maxConcurrentSessions: 3,
    sessionTimeout: 30,
    enableLogging: true,
    enableMetrics: true,
    constitutionalComplianceThreshold: 95,
    ...options
  };
};

// Default Configuration
export const DEFAULT_ATEAM_CONFIG: ATEAMConfig = {
  workspaceRoot: process.cwd(),
  autoStart: true,
  maxConcurrentSessions: 3,
  sessionTimeout: 30,
  enableLogging: true,
  enableMetrics: true,
  constitutionalComplianceThreshold: 95
};

// Version Information
export const ATEAM_VERSION = '3.0.0';
export const ATEAM_BUILD_DATE = '2025-01-11';

// Constitutional Authority
export const CONSTITUTIONAL_AUTHORITY = [
  'Article I: Full-Auto Mandate',
  'Article III: The Loop',
  'Article IX: Guardian Protocol'
];

// System Information
export const ATEAM_INFO = {
  name: 'A-TEAM System',
  version: ATEAM_VERSION,
  buildDate: ATEAM_BUILD_DATE,
  description: 'Autonomous Team of Expert Agents for Full Automation',
  constitutionalAuthority: CONSTITUTIONAL_AUTHORITY,
  agents: [
    'Director Abi',
    'Chat Analysis Agent',
    'Verification Agent',
    'GitHub Agent',
    'Deployment Agent',
    'Documentation Agent',
    'Testing Agent'
  ],
  features: [
    '100% User Request Implementation',
    'All Issues Understood and Fixed',
    'Documentation Updated for AI Agents',
    'All TODOs Completed',
    'Repository Structure Organized',
    'GitHub Automation',
    'CloudFlare Deployment',
    'API Testing',
    'Screenshot Proof',
    'Constitutional Compliance'
  ]
};

// Quick Start Function
export const quickStartATEAM = async (workspaceRoot?: string): Promise<ATEAMSystem> => {
  const config = createATEAMConfig(workspaceRoot || process.cwd());
  const ateamSystem = createATEAMSystem(config);
  
  await ateamSystem.initialize();
  await ateamSystem.start();
  
  return ateamSystem;
};

// Process Request Function
export const processRequest = async (
  ateamSystem: ATEAMSystem,
  userRequest: string
): Promise<ATEAMResult> => {
  return await ateamSystem.processRequest(userRequest);
};

// Get System Status Function
export const getSystemStatus = (ateamSystem: ATEAMSystem): ATEAMStatus => {
  return ateamSystem.getStatus();
};

// Generate System Report Function
export const generateSystemReport = async (ateamSystem: ATEAMSystem) => {
  return await ateamSystem.generateSystemReport();
};

// Example Usage
export const exampleUsage = `
// Quick start
import { quickStartATEAM, processRequest } from '@/lib/automation';

const ateamSystem = await quickStartATEAM();
const result = await processRequest(ateamSystem, 'Add new dashboard component');

// Custom configuration
import { createATEAMSystem, createATEAMConfig } from '@/lib/automation';

const config = createATEAMConfig('/path/to/workspace', {
  maxConcurrentSessions: 5,
  sessionTimeout: 60,
  constitutionalComplianceThreshold: 98
});

const ateamSystem = createATEAMSystem(config);
await ateamSystem.initialize();
await ateamSystem.start();

// Process request
const result = await ateamSystem.processRequest('Implement new feature');

// Get status
const status = ateamSystem.getStatus();
console.log('System Health:', status.systemHealth);
console.log('Constitutional Compliance:', status.constitutionalCompliance);

// Generate report
const report = await ateamSystem.generateSystemReport();
console.log('System Report:', report);
`;

export default {
  ATEAMSystem,
  AgentManager,
  DirectorAbi,
  ChatAnalysisAgent,
  VerificationAgent,
  GitHubAgent,
  DeploymentAgent,
  DocumentationAgent,
  TestingAgent,
  ATEAMDashboard,
  createATEAMSystem,
  createATEAMConfig,
  quickStartATEAM,
  processRequest,
  getSystemStatus,
  generateSystemReport,
  DEFAULT_ATEAM_CONFIG,
  ATEAM_VERSION,
  ATEAM_BUILD_DATE,
  CONSTITUTIONAL_AUTHORITY,
  ATEAM_INFO,
  exampleUsage
};