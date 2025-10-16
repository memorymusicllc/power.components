#!/usr/bin/env node

/**
 * Multi-Agent Verification CLI
 * Command-line interface for running comprehensive verification across all components
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { verificationOrchestrator, VerificationReport } from './multi-agent-orchestrator';
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import Table from 'cli-table3';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('verify')
  .description('Multi-Agent Verification System for Power Components')
  .version('1.0.0');

program
  .command('full')
  .description('Run full verification across all components and features')
  .option('-p, --parallel', 'Run agents in parallel for faster execution')
  .option('-f, --auto-fix', 'Automatically fix issues that can be auto-fixed')
  .option('-o, --output <file>', 'Output report to JSON file')
  .option('--include-charts', 'Include chart components in verification')
  .option('--include-redux-ui', 'Include Redux UI components in verification')
  .option('--include-power-canvas', 'Include Power Canvas components in verification')
  .option('--include-power-redact', 'Include Power Redact components in verification')
  .action(async (options) => {
    const spinner = ora('Starting Multi-Agent Verification System...').start();
    
    try {
      const report = await verificationOrchestrator.runFullVerification({
        includeCharts: options.includeCharts,
        includeReduxUI: options.includeReduxUI,
        includePowerCanvas: options.includePowerCanvas,
        includePowerRedact: options.includePowerRedact,
        parallel: options.parallel,
        autoFix: options.autoFix
      });

      spinner.succeed('Verification completed successfully!');
      
      // Display summary
      displayReportSummary(report);
      
      // Display detailed results
      displayDetailedResults(report);
      
      // Auto-fix if requested
      if (options.autoFix) {
        const fixSpinner = ora('Auto-fixing issues...').start();
        const fixResults = await verificationOrchestrator.autoFixIssues(report);
        fixSpinner.succeed(`Auto-fixed ${fixResults.fixed} issues, ${fixResults.failed} failed`);
      }
      
      // Save report if requested
      if (options.output) {
        const reportPath = path.resolve(options.output);
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(chalk.green(`\n📄 Report saved to: ${reportPath}`));
      }
      
      // Exit with appropriate code
      process.exit(report.status === 'fail' ? 1 : 0);
      
    } catch (error) {
      spinner.fail('Verification failed!');
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

program
  .command('component <componentId>')
  .description('Verify a specific component')
  .action(async (componentId) => {
    const spinner = ora(`Verifying component: ${componentId}`).start();
    
    try {
      const results = await verificationOrchestrator.verifyComponent(componentId);
      
      spinner.succeed(`Component ${componentId} verification completed!`);
      
      // Display component results
      displayComponentResults(componentId, results);
      
    } catch (error) {
      spinner.fail(`Component ${componentId} verification failed!`);
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

program
  .command('agents')
  .description('List all available verification agents')
  .action(() => {
    console.log(chalk.blue('\n🤖 Available Verification Agents:\n'));
    
    const agents = [
      { id: 'schema-validator', name: 'Schema Validator', description: 'Validates component schemas and configs' },
      { id: 'integration-verifier', name: 'Integration Verifier', description: 'Verifies component integrations' },
      { id: 'presentation-checker', name: 'Presentation Checker', description: 'Checks UI consistency and accessibility' },
      { id: 'data-flow-analyzer', name: 'Data Flow Analyzer', description: 'Analyzes data flow and integrity' },
      { id: 'component-registry', name: 'Component Registry', description: 'Verifies component registration' },
      { id: 'config-consistency', name: 'Config Consistency', description: 'Checks config consistency' },
      { id: 'performance-monitor', name: 'Performance Monitor', description: 'Monitors performance metrics' },
      { id: 'accessibility-validator', name: 'Accessibility Validator', description: 'Validates accessibility compliance' },
      { id: 'security-audit', name: 'Security Audit', description: 'Audits security practices' },
      { id: 'documentation-validator', name: 'Documentation Validator', description: 'Validates documentation quality' },
      { id: 'test-coverage', name: 'Test Coverage', description: 'Checks test coverage and quality' },
      { id: 'self-healing-validator', name: 'Self-Healing Validator', description: 'Validates self-healing capabilities' }
    ];
    
    const table = new Table({
      head: ['Agent ID', 'Name', 'Description'],
      colWidths: [20, 25, 50]
    });
    
    agents.forEach(agent => {
      table.push([agent.id, agent.name, agent.description]);
    });
    
    console.log(table.toString());
  });

program
  .command('status')
  .description('Show verification system status')
  .action(() => {
    const report = verificationOrchestrator.getLatestReport();
    
    if (!report) {
      console.log(chalk.yellow('No verification report available. Run "verify full" to generate a report.'));
      return;
    }
    
    displayReportSummary(report);
  });

function displayReportSummary(report: VerificationReport) {
  console.log(chalk.blue('\n📊 Verification Report Summary\n'));
  
  const statusColor = report.status === 'pass' ? chalk.green : 
                     report.status === 'warning' ? chalk.yellow : chalk.red;
  
  console.log(`Status: ${statusColor(report.status.toUpperCase())}`);
  console.log(`Overall Score: ${chalk.bold(report.overallScore)}/100`);
  console.log(`Execution Time: ${report.executionTime}ms`);
  console.log(`Timestamp: ${report.timestamp.toISOString()}\n`);
  
  const summary = report.summary;
  console.log(chalk.blue('📈 Statistics:'));
  console.log(`  Total Components: ${summary.totalComponents}`);
  console.log(`  Verified Components: ${summary.verifiedComponents}`);
  console.log(`  Total Issues: ${summary.totalIssues}`);
  console.log(`  Critical Issues: ${chalk.red(summary.criticalIssues)}`);
  console.log(`  High Issues: ${chalk.yellow(summary.highIssues)}`);
  console.log(`  Medium Issues: ${chalk.blue(summary.mediumIssues)}`);
  console.log(`  Low Issues: ${chalk.gray(summary.lowIssues)}`);
  console.log(`  Auto-fixable Issues: ${chalk.green(summary.autoFixableIssues)}\n`);
}

function displayDetailedResults(report: VerificationReport) {
  console.log(chalk.blue('🔍 Detailed Results:\n'));
  
  const table = new Table({
    head: ['Agent', 'Status', 'Score', 'Issues', 'Time'],
    colWidths: [25, 10, 8, 8, 10]
  });
  
  report.results.forEach(result => {
    const statusColor = result.status === 'success' ? chalk.green : 
                       result.status === 'warning' ? chalk.yellow : chalk.red;
    
    table.push([
      result.agentName,
      statusColor(result.status),
      `${result.score}/100`,
      result.issues.length,
      `${result.executionTime}ms`
    ]);
  });
  
  console.log(table.toString());
  
  // Display recommendations
  if (report.recommendations.length > 0) {
    console.log(chalk.blue('\n💡 Recommendations:\n'));
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
  }
}

function displayComponentResults(componentId: string, results: any[]) {
  console.log(chalk.blue(`\n🔍 Component: ${componentId}\n`));
  
  const table = new Table({
    head: ['Agent', 'Status', 'Score', 'Issues'],
    colWidths: [25, 10, 8, 8]
  });
  
  results.forEach(result => {
    const statusColor = result.status === 'success' ? chalk.green : 
                       result.status === 'warning' ? chalk.yellow : chalk.red;
    
    table.push([
      result.agentName,
      statusColor(result.status),
      `${result.score}/100`,
      result.issues.length
    ]);
  });
  
  console.log(table.toString());
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error(chalk.red('Uncaught Exception:'), error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('Unhandled Rejection at:'), promise, 'reason:', reason);
  process.exit(1);
});

// Parse command line arguments
program.parse();

