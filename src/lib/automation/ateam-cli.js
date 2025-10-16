#!/usr/bin/env node

/**
 * A-TEAM CLI - Command Line Interface
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Command line interface for the A-TEAM system.
 */

import { Command } from 'commander';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .name('ateam')
  .description('A-TEAM System Command Line Interface')
  .version('3.0.0');

// Start command
program
  .command('start')
  .description('Start the A-TEAM system')
  .option('-m, --monitor', 'Enable monitoring mode')
  .option('-c, --config <path>', 'Path to configuration file')
  .action(async (options) => {
    try {
      console.log('🚀 Starting A-TEAM System...');
      
      // Import the A-TEAM system
      const { quickStartATEAM } = await import('./index.js');
      
      // Start the system
      const ateamSystem = await quickStartATEAM();
      
      console.log('✅ A-TEAM System started successfully');
      console.log('📊 System Status:', ateamSystem.getStatus());
      
      if (options.monitor) {
        console.log('👁️  Monitoring mode enabled');
        // Keep the process running for monitoring
        process.on('SIGINT', async () => {
          console.log('\n🛑 Stopping A-TEAM System...');
          await ateamSystem.stop();
          process.exit(0);
        });
        
        // Keep alive
        setInterval(() => {
          const status = ateamSystem.getStatus();
          console.log(`📈 Status: ${status.systemHealth} | Sessions: ${status.activeSessions} | Compliance: ${status.constitutionalCompliance.toFixed(1)}%`);
        }, 30000);
      }
    } catch (error) {
      console.error('❌ Failed to start A-TEAM System:', error.message);
      process.exit(1);
    }
  });

// Stop command
program
  .command('stop')
  .description('Stop the A-TEAM system')
  .action(async () => {
    try {
      console.log('🛑 Stopping A-TEAM System...');
      
      // Import the A-TEAM system
      const { quickStartATEAM } = await import('./index.js');
      
      // Stop the system
      const ateamSystem = await quickStartATEAM();
      await ateamSystem.stop();
      
      console.log('✅ A-TEAM System stopped successfully');
    } catch (error) {
      console.error('❌ Failed to stop A-TEAM System:', error.message);
      process.exit(1);
    }
  });

// Status command
program
  .command('status')
  .description('Get A-TEAM system status')
  .option('-j, --json', 'Output in JSON format')
  .action(async (options) => {
    try {
      // Import the A-TEAM system
      const { quickStartATEAM } = await import('./index.js');
      
      const ateamSystem = await quickStartATEAM();
      const status = ateamSystem.getStatus();
      const metrics = ateamSystem.getMetrics();
      
      if (options.json) {
        console.log(JSON.stringify({ status, metrics }, null, 2));
      } else {
        console.log('📊 A-TEAM System Status');
        console.log('======================');
        console.log(`Status: ${status.isProcessing ? 'Processing' : 'Idle'}`);
        console.log(`Health: ${status.systemHealth.toUpperCase()}`);
        console.log(`Active Sessions: ${status.activeSessions}`);
        console.log(`Total Sessions: ${status.totalSessions}`);
        console.log(`Constitutional Compliance: ${status.constitutionalCompliance.toFixed(1)}%`);
        console.log(`Success Rate: ${metrics.totalSessions > 0 ? ((metrics.successfulSessions / metrics.totalSessions) * 100).toFixed(1) : 0}%`);
        console.log(`Average Goal Score: ${metrics.averageGoalScore.toFixed(1)}%`);
        console.log(`Average Confidence: ${metrics.averageConfidenceScore.toFixed(1)}%`);
      }
    } catch (error) {
      console.error('❌ Failed to get A-TEAM System status:', error.message);
      process.exit(1);
    }
  });

// Process command
program
  .command('process')
  .description('Process a user request with A-TEAM system')
  .argument('<request>', 'User request to process')
  .option('-w, --wait', 'Wait for completion')
  .option('-j, --json', 'Output result in JSON format')
  .action(async (request, options) => {
    try {
      console.log('🔄 Processing request with A-TEAM System...');
      console.log(`Request: ${request}`);
      
      // Import the A-TEAM system
      const { quickStartATEAM } = await import('./index.js');
      
      const ateamSystem = await quickStartATEAM();
      const result = await ateamSystem.processRequest(request);
      
      if (options.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        console.log('✅ Request processed successfully');
        console.log(`Goal Score: ${result.goalScore.goalPercentage.toFixed(1)}%`);
        console.log(`Confidence: ${result.goalScore.confidencePercentage.toFixed(1)}%`);
        console.log(`Status: ${result.status.toUpperCase()}`);
        console.log(`Duration: ${result.duration}s`);
        console.log(`Operations: ${result.operations}`);
        
        if (result.violations.length > 0) {
          console.log(`Violations: ${result.violations.length}`);
          result.violations.forEach(violation => {
            console.log(`  - ${violation}`);
          });
        }
        
        if (result.deploymentUrl) {
          console.log(`Deployment URL: ${result.deploymentUrl}`);
        }
        
        if (result.screenshotPath) {
          console.log(`Screenshot: ${result.screenshotPath}`);
        }
      }
    } catch (error) {
      console.error('❌ Failed to process request:', error.message);
      process.exit(1);
    }
  });

// Report command
program
  .command('report')
  .description('Generate A-TEAM system report')
  .option('-t, --type <type>', 'Report type (system, performance, compliance)', 'system')
  .option('-j, --json', 'Output in JSON format')
  .option('-o, --output <file>', 'Output file path')
  .action(async (options) => {
    try {
      console.log('📊 Generating A-TEAM System report...');
      
      // Import the A-TEAM system
      const { quickStartATEAM } = await import('./index.js');
      
      const ateamSystem = await quickStartATEAM();
      const report = await ateamSystem.generateSystemReport();
      
      const output = options.json ? JSON.stringify(report, null, 2) : formatReport(report);
      
      if (options.output) {
        await writeFile(options.output, output);
        console.log(`✅ Report saved to ${options.output}`);
      } else {
        console.log(output);
      }
    } catch (error) {
      console.error('❌ Failed to generate report:', error.message);
      process.exit(1);
    }
  });

// Dashboard command
program
  .command('dashboard')
  .description('Start A-TEAM dashboard server')
  .option('-p, --port <port>', 'Port number', '3000')
  .option('-h, --host <host>', 'Host address', 'localhost')
  .action(async (options) => {
    try {
      console.log('🌐 Starting A-TEAM Dashboard...');
      console.log(`Server will be available at http://${options.host}:${options.port}`);
      
      // Import the A-TEAM system
      const { quickStartATEAM } = await import('./index.js');
      
      const ateamSystem = await quickStartATEAM();
      
      // Start a simple HTTP server for the dashboard
      const http = await import('http');
      const fs = await import('fs');
      const path = await import('path');
      
      const server = http.createServer(async (req, res) => {
        if (req.url === '/') {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(await generateDashboardHTML(ateamSystem));
        } else if (req.url === '/api/status') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(ateamSystem.getStatus()));
        } else if (req.url === '/api/metrics') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(ateamSystem.getMetrics()));
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
        }
      });
      
      server.listen(options.port, options.host, () => {
        console.log(`✅ A-TEAM Dashboard started on http://${options.host}:${options.port}`);
      });
      
      // Handle graceful shutdown
      process.on('SIGINT', () => {
        console.log('\n🛑 Stopping A-TEAM Dashboard...');
        server.close(() => {
          process.exit(0);
        });
      });
    } catch (error) {
      console.error('❌ Failed to start dashboard:', error.message);
      process.exit(1);
    }
  });

// Helper function to format report
function formatReport(report) {
  let output = '';
  
  output += 'A-TEAM System Report\n';
  output += '===================\n\n';
  
  output += 'System Status:\n';
  output += `  Health: ${report.status.systemHealth.toUpperCase()}\n`;
  output += `  Active Sessions: ${report.status.activeSessions}\n`;
  output += `  Total Sessions: ${report.status.totalSessions}\n`;
  output += `  Constitutional Compliance: ${report.status.constitutionalCompliance.toFixed(1)}%\n\n`;
  
  output += 'Performance Metrics:\n';
  output += `  Success Rate: ${report.metrics.totalSessions > 0 ? ((report.metrics.successfulSessions / report.metrics.totalSessions) * 100).toFixed(1) : 0}%\n`;
  output += `  Average Goal Score: ${report.metrics.averageGoalScore.toFixed(1)}%\n`;
  output += `  Average Confidence: ${report.metrics.averageConfidenceScore.toFixed(1)}%\n`;
  output += `  Total Operations: ${report.metrics.totalOperations}\n`;
  output += `  Total Violations: ${report.metrics.totalViolations}\n\n`;
  
  if (report.recommendations.length > 0) {
    output += 'Recommendations:\n';
    report.recommendations.forEach(rec => {
      output += `  - ${rec}\n`;
    });
    output += '\n';
  }
  
  if (report.recentSessions.length > 0) {
    output += 'Recent Sessions:\n';
    report.recentSessions.forEach(session => {
      output += `  ${session.sessionId}: ${session.userRequest} (${session.status}, ${session.duration}s)\n`;
    });
  }
  
  return output;
}

// Helper function to generate dashboard HTML
async function generateDashboardHTML(ateamSystem) {
  const status = ateamSystem.getStatus();
  const metrics = ateamSystem.getMetrics();
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A-TEAM Dashboard</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .metric { display: flex; justify-content: space-between; margin: 10px 0; }
        .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .healthy { background: #d4edda; color: #155724; }
        .warning { background: #fff3cd; color: #856404; }
        .critical { background: #f8d7da; color: #721c24; }
        .processing { background: #cce5ff; color: #004085; }
        .idle { background: #e2e3e5; color: #383d41; }
        .refresh { margin-top: 20px; }
        .refresh button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>A-TEAM System Dashboard</h1>
            <div class="refresh">
                <button onclick="location.reload()">Refresh</button>
            </div>
        </div>
        
        <div class="grid">
            <div class="card">
                <h2>System Status</h2>
                <div class="metric">
                    <span>Status:</span>
                    <span class="status ${status.isProcessing ? 'processing' : 'idle'}">${status.isProcessing ? 'Processing' : 'Idle'}</span>
                </div>
                <div class="metric">
                    <span>Health:</span>
                    <span class="status ${status.systemHealth}">${status.systemHealth.toUpperCase()}</span>
                </div>
                <div class="metric">
                    <span>Active Sessions:</span>
                    <span>${status.activeSessions}</span>
                </div>
                <div class="metric">
                    <span>Total Sessions:</span>
                    <span>${status.totalSessions}</span>
                </div>
            </div>
            
            <div class="card">
                <h2>Performance Metrics</h2>
                <div class="metric">
                    <span>Success Rate:</span>
                    <span>${metrics.totalSessions > 0 ? ((metrics.successfulSessions / metrics.totalSessions) * 100).toFixed(1) : 0}%</span>
                </div>
                <div class="metric">
                    <span>Average Goal Score:</span>
                    <span>${metrics.averageGoalScore.toFixed(1)}%</span>
                </div>
                <div class="metric">
                    <span>Average Confidence:</span>
                    <span>${metrics.averageConfidenceScore.toFixed(1)}%</span>
                </div>
                <div class="metric">
                    <span>Total Operations:</span>
                    <span>${metrics.totalOperations}</span>
                </div>
            </div>
            
            <div class="card">
                <h2>Constitutional Compliance</h2>
                <div class="metric">
                    <span>Compliance:</span>
                    <span>${status.constitutionalCompliance.toFixed(1)}%</span>
                </div>
                <div class="metric">
                    <span>Total Violations:</span>
                    <span>${metrics.totalViolations}</span>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Auto-refresh every 30 seconds
        setTimeout(() => location.reload(), 30000);
    </script>
</body>
</html>
  `;
}

// Parse command line arguments
program.parse();
