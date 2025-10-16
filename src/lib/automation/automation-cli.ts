#!/usr/bin/env node

/**
 * Automation CLI - Full Automation System Command Line Interface
 * Constitutional Authority: Article I, Article III, Article IX
 * 
 * This CLI provides commands to manage the full automation system:
 * - Start/stop automation
 * - Process user requests
 * - Monitor system status
 * - Generate reports
 * - Manage agents
 */

import { Command } from 'commander';
import { masterOrchestrator } from './master-orchestrator';
import { githubOrchestratorAgent } from './agents/github-orchestrator-agent';
import { cloudFlareDeploymentAgent } from './agents/cloudflare-deployment-agent';
import { apiTestingAgent } from './agents/api-testing-agent';
import { MultiAgentVerificationOrchestrator } from '../verification/multi-agent-orchestrator';

const program = new Command();
const verificationOrchestrator = new MultiAgentVerificationOrchestrator();

program
  .name('automation-cli')
  .description('Full Automation System CLI for Pow3r v3')
  .version('3.0.0');

// Main automation commands
program
  .command('start')
  .description('Start the full automation system')
  .option('-v, --verbose', 'Enable verbose logging')
  .option('-m, --monitor', 'Enable continuous monitoring')
  .action(async (options) => {
    try {
      console.log('🚀 Starting Full Automation System...');
      console.log('📋 Constitutional Authority: Article I (Full-Auto Mandate)');
      
      await masterOrchestrator.startFullAutomation();
      
      console.log('✅ Full Automation System started successfully!');
      console.log('🤖 All agents are now active and monitoring');
      
      if (options.monitor) {
        console.log('📊 Continuous monitoring enabled');
        // Keep the process running for monitoring
        process.on('SIGINT', async () => {
          console.log('\n🛑 Shutting down automation system...');
          await masterOrchestrator.stop();
          process.exit(0);
        });
        
        // Keep alive
        setInterval(() => {
          const status = masterOrchestrator.getStatus();
          console.log(`📈 Status: ${status.taskCount} tasks, ${status.agentCount} agents active`);
        }, 30000);
      }
    } catch (error) {
      console.error('❌ Failed to start automation system:', error);
      process.exit(1);
    }
  });

program
  .command('stop')
  .description('Stop the full automation system')
  .action(async () => {
    try {
      console.log('🛑 Stopping Full Automation System...');
      await masterOrchestrator.stop();
      console.log('✅ Full Automation System stopped successfully!');
    } catch (error) {
      console.error('❌ Failed to stop automation system:', error);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Get current automation system status')
  .option('-j, --json', 'Output as JSON')
  .action(async (options) => {
    try {
      const status = masterOrchestrator.getStatus();
      const report = masterOrchestrator.generateAutomationReport();
      
      if (options.json) {
        console.log(JSON.stringify({ status, report }, null, 2));
      } else {
        console.log('📊 Full Automation System Status');
        console.log('================================');
        console.log(`🔄 Running: ${status.isRunning ? 'Yes' : 'No'}`);
        console.log(`📋 Tasks: ${status.taskCount}`);
        console.log(`🤖 Agents: ${status.agentCount}`);
        console.log(`✅ Completed Tasks: ${report.completedTasks}`);
        console.log(`❌ Failed Tasks: ${report.failedTasks}`);
        console.log(`⏳ In Progress: ${report.inProgressTasks}`);
        console.log(`📈 GitHub Status: ${report.deploymentStatus.github}`);
        console.log(`☁️  CloudFlare Status: ${report.deploymentStatus.cloudflare}`);
        console.log(`🧪 API Tests: ${report.deploymentStatus.apiTests}`);
        console.log(`📸 Screenshot: ${report.deploymentStatus.screenshot}`);
        
        if (report.nextActions.length > 0) {
          console.log('\n🎯 Next Actions:');
          report.nextActions.forEach((action, index) => {
            console.log(`   ${index + 1}. ${action}`);
          });
        }
      }
    } catch (error) {
      console.error('❌ Failed to get status:', error);
      process.exit(1);
    }
  });

// User request processing
program
  .command('process-request')
  .description('Process a user request with full automation')
  .argument('<request>', 'The user request to process')
  .option('-c, --context <context>', 'Additional context for the request')
  .option('-p, --priority <priority>', 'Request priority', 'high')
  .action(async (request, options) => {
    try {
      console.log('📝 Processing user request...');
      console.log(`📋 Request: ${request}`);
      console.log(`🎯 Priority: ${options.priority}`);
      
      const taskId = await masterOrchestrator.processUserRequest(request, options.context);
      
      console.log(`✅ Request submitted successfully!`);
      console.log(`🆔 Task ID: ${taskId}`);
      console.log('🤖 Agents are now processing your request...');
      
      // Monitor task progress
      const checkProgress = setInterval(async () => {
        const report = masterOrchestrator.generateAutomationReport();
        const task = Array.from(masterOrchestrator['tasks'].values()).find(t => t.id === taskId);
        
        if (task) {
          console.log(`📊 Task Status: ${task.status}`);
          if (task.status === 'completed') {
            console.log('🎉 Request completed successfully!');
            clearInterval(checkProgress);
          } else if (task.status === 'failed') {
            console.log(`❌ Request failed: ${task.errorMessage}`);
            clearInterval(checkProgress);
          }
        }
      }, 5000);
      
    } catch (error) {
      console.error('❌ Failed to process request:', error);
      process.exit(1);
    }
  });

// GitHub operations
program
  .command('github')
  .description('GitHub operations')
  .command('create-pr')
  .description('Create a new pull request')
  .argument('<branch>', 'Branch name')
  .argument('<title>', 'PR title')
  .argument('<description>', 'PR description')
  .action(async (branch, title, description) => {
    try {
      console.log('🔀 Creating pull request...');
      const prNumber = await githubOrchestratorAgent.createPR(branch, title, description, []);
      console.log(`✅ Pull request created: #${prNumber}`);
    } catch (error) {
      console.error('❌ Failed to create PR:', error);
      process.exit(1);
    }
  });

program
  .command('github')
  .command('merge-pr')
  .description('Merge a pull request')
  .argument('<pr-number>', 'PR number')
  .option('-s, --strategy <strategy>', 'Merge strategy', 'squash')
  .action(async (prNumber, options) => {
    try {
      console.log(`🔀 Merging PR #${prNumber}...`);
      await githubOrchestratorAgent.mergePR(parseInt(prNumber), options.strategy);
      console.log(`✅ PR #${prNumber} merged successfully!`);
    } catch (error) {
      console.error('❌ Failed to merge PR:', error);
      process.exit(1);
    }
  });

program
  .command('github')
  .command('cleanup')
  .description('Clean up stale branches')
  .action(async () => {
    try {
      console.log('🧹 Cleaning up stale branches...');
      const deletedBranches = await githubOrchestratorAgent.cleanupBranches();
      console.log(`✅ Cleaned up ${deletedBranches.length} branches:`, deletedBranches);
    } catch (error) {
      console.error('❌ Failed to cleanup branches:', error);
      process.exit(1);
    }
  });

// Deployment operations
program
  .command('deploy')
  .description('Deploy to CloudFlare')
  .argument('<environment>', 'Deployment environment (preview|production)')
  .option('-v, --version <version>', 'Deployment version')
  .option('--skip-tests', 'Skip tests before deployment')
  .option('--force', 'Force deployment even if tests fail')
  .action(async (environment, options) => {
    try {
      console.log(`🚀 Deploying to ${environment}...`);
      
      const deploymentStatus = await cloudFlareDeploymentAgent.deploy(
        environment as 'preview' | 'production',
        options.version,
        {
          skipTests: options.skipTests,
          forceDeploy: options.force
        }
      );
      
      console.log(`✅ Deployment successful!`);
      console.log(`🌐 URL: ${deploymentStatus.url}`);
      console.log(`📊 Health Score: ${deploymentStatus.healthScore}%`);
      console.log(`⚡ Performance Score: ${deploymentStatus.performanceScore}%`);
      
    } catch (error) {
      console.error('❌ Deployment failed:', error);
      process.exit(1);
    }
  });

program
  .command('screenshot')
  .description('Take screenshot proof of deployment')
  .argument('<url>', 'URL to screenshot')
  .action(async (url) => {
    try {
      console.log(`📸 Taking screenshot proof of ${url}...`);
      const screenshotProof = await cloudFlareDeploymentAgent.takeScreenshotProof(url);
      
      console.log(`✅ Screenshot captured!`);
      console.log(`📁 Path: ${screenshotProof.screenshotPath}`);
      console.log(`⏱️  Load Time: ${screenshotProof.metadata.performance.loadTime}ms`);
      console.log(`🎨 FCP: ${screenshotProof.metadata.performance.firstContentfulPaint}ms`);
      console.log(`🖼️  LCP: ${screenshotProof.metadata.performance.largestContentfulPaint}ms`);
      
    } catch (error) {
      console.error('❌ Screenshot failed:', error);
      process.exit(1);
    }
  });

// Testing operations
program
  .command('test')
  .description('Run tests')
  .command('api')
  .description('Run API tests')
  .option('-e, --environment <env>', 'Test environment', 'production')
  .action(async (options) => {
    try {
      console.log(`🧪 Running API tests on ${options.environment}...`);
      const report = await apiTestingAgent.runFullTestSuite(options.environment as any);
      
      console.log(`✅ API tests completed!`);
      console.log(`📊 Overall Pass Rate: ${report.overallPassRate.toFixed(1)}%`);
      console.log(`📈 Coverage: ${report.overallCoverage.toFixed(1)}%`);
      console.log(`🔒 Security Score: ${report.security.securityScore}%`);
      console.log(`⚡ Avg Response Time: ${report.performance.averageResponseTime}ms`);
      
      if (report.recommendations.length > 0) {
        console.log('\n💡 Recommendations:');
        report.recommendations.forEach((rec, index) => {
          console.log(`   ${index + 1}. ${rec}`);
        });
      }
      
    } catch (error) {
      console.error('❌ API tests failed:', error);
      process.exit(1);
    }
  });

program
  .command('test')
  .command('e2e')
  .description('Run E2E tests')
  .action(async () => {
    try {
      console.log('🧪 Running E2E tests...');
      const report = await verificationOrchestrator.runFullVerification({
        parallel: true,
        autoFix: true,
        includeCharts: true,
        includeReduxUI: true,
        includePowerCanvas: true,
        includePowerRedact: true
      });
      
      if (report.hasErrors) {
        console.log('❌ E2E tests failed:');
        report.errors.forEach(error => console.log(`   - ${error}`));
        process.exit(1);
      } else {
        console.log('✅ E2E tests passed!');
        console.log(`📊 Components verified: ${report.componentsVerified}`);
        console.log(`🔧 Issues fixed: ${report.issuesFixed}`);
      }
      
    } catch (error) {
      console.error('❌ E2E tests failed:', error);
      process.exit(1);
    }
  });

// Verification operations
program
  .command('verify')
  .description('Run verification')
  .command('full')
  .description('Run full verification')
  .action(async () => {
    try {
      console.log('🔍 Running full verification...');
      const report = await verificationOrchestrator.runFullVerification({
        parallel: true,
        autoFix: true,
        includeCharts: true,
        includeReduxUI: true,
        includePowerCanvas: true,
        includePowerRedact: true
      });
      
      if (report.hasErrors) {
        console.log('❌ Verification failed:');
        report.errors.forEach(error => console.log(`   - ${error}`));
        process.exit(1);
      } else {
        console.log('✅ Full verification passed!');
        console.log(`📊 Components verified: ${report.componentsVerified}`);
        console.log(`🔧 Issues fixed: ${report.issuesFixed}`);
      }
      
    } catch (error) {
      console.error('❌ Verification failed:', error);
      process.exit(1);
    }
  });

// Report generation
program
  .command('report')
  .description('Generate reports')
  .command('automation')
  .description('Generate automation report')
  .option('-f, --format <format>', 'Report format (json|markdown)', 'markdown')
  .action(async (options) => {
    try {
      console.log('📊 Generating automation report...');
      const report = masterOrchestrator.generateAutomationReport();
      
      if (options.format === 'json') {
        console.log(JSON.stringify(report, null, 2));
      } else {
        console.log('# Full Automation System Report');
        console.log('================================');
        console.log(`📅 Generated: ${report.timestamp.toISOString()}`);
        console.log(`📋 Total Tasks: ${report.totalTasks}`);
        console.log(`✅ Completed: ${report.completedTasks}`);
        console.log(`❌ Failed: ${report.failedTasks}`);
        console.log(`⏳ In Progress: ${report.inProgressTasks}`);
        console.log(`📈 GitHub: ${report.deploymentStatus.github}`);
        console.log(`☁️  CloudFlare: ${report.deploymentStatus.cloudflare}`);
        console.log(`🧪 API Tests: ${report.deploymentStatus.apiTests}`);
        console.log(`📸 Screenshot: ${report.deploymentStatus.screenshot}`);
        
        console.log('\n## Agent Status');
        report.agentStatuses.forEach(agent => {
          console.log(`- ${agent.name}: ${agent.status} (${agent.completedTasks} completed, ${agent.failedTasks} failed)`);
        });
        
        if (report.nextActions.length > 0) {
          console.log('\n## Next Actions');
          report.nextActions.forEach((action, index) => {
            console.log(`${index + 1}. ${action}`);
          });
        }
      }
      
    } catch (error) {
      console.error('❌ Failed to generate report:', error);
      process.exit(1);
    }
  });

// Agent management
program
  .command('agents')
  .description('Manage agents')
  .command('list')
  .description('List all agents')
  .action(async () => {
    try {
      const report = masterOrchestrator.generateAutomationReport();
      
      console.log('🤖 Active Agents');
      console.log('================');
      report.agentStatuses.forEach(agent => {
        const status = agent.status === 'active' ? '🟢' : 
                      agent.status === 'busy' ? '🟡' : 
                      agent.status === 'error' ? '🔴' : '⚪';
        console.log(`${status} ${agent.name}`);
        console.log(`   Status: ${agent.status}`);
        console.log(`   Completed: ${agent.completedTasks}`);
        console.log(`   Failed: ${agent.failedTasks}`);
        console.log(`   Last Activity: ${agent.lastActivity.toISOString()}`);
        console.log('');
      });
      
    } catch (error) {
      console.error('❌ Failed to list agents:', error);
      process.exit(1);
    }
  });

// Help command
program
  .command('help')
  .description('Show help information')
  .action(() => {
    console.log('🤖 Full Automation System CLI');
    console.log('=============================');
    console.log('');
    console.log('This CLI provides commands to manage the full automation system');
    console.log('that ensures 100% user request implementation, issue resolution,');
    console.log('documentation updates, TODO completion, repository organization,');
    console.log('GitHub automation, CloudFlare deployment, API testing, and');
    console.log('screenshot proof - all in compliance with Pow3r Law V3.');
    console.log('');
    console.log('📋 Constitutional Authority:');
    console.log('   - Article I: Full-Auto Mandate');
    console.log('   - Article III: The Loop');
    console.log('   - Article IX: Guardian Protocol');
    console.log('');
    console.log('🚀 Quick Start:');
    console.log('   automation-cli start --monitor');
    console.log('   automation-cli process-request "Add new feature"');
    console.log('   automation-cli status');
    console.log('');
    console.log('📚 For more information, run: automation-cli --help');
  });

// Error handling
program.on('command:*', () => {
  console.error('❌ Invalid command. Use --help for available commands.');
  process.exit(1);
});

// Parse command line arguments
program.parse();

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
