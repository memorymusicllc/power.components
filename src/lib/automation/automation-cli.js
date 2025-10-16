#!/usr/bin/env node

/**
 * Automation CLI - Legacy Automation System
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Legacy automation CLI that now delegates to the A-TEAM system.
 */

import { Command } from 'commander';

const program = new Command();

program
  .name('automation')
  .description('Legacy Automation System - Now using A-TEAM')
  .version('3.0.0');

// Redirect all commands to A-TEAM system
program
  .command('*')
  .action(async (command) => {
    console.log('🔄 Redirecting to A-TEAM System...');
    console.log('The legacy automation system has been replaced by the A-TEAM system.');
    console.log('Please use the following commands:');
    console.log('');
    console.log('  npm run ateam:start      # Start A-TEAM system');
    console.log('  npm run ateam:stop       # Stop A-TEAM system');
    console.log('  npm run ateam:status     # Get system status');
    console.log('  npm run ateam:process    # Process user request');
    console.log('  npm run ateam:report     # Generate system report');
    console.log('  npm run ateam:dashboard  # Start dashboard');
    console.log('');
    console.log('For more information, see the README.md file.');
  });

// Start command
program
  .command('start')
  .description('Start automation system (redirects to A-TEAM)')
  .action(async () => {
    console.log('🔄 Redirecting to A-TEAM System...');
    console.log('Use: npm run ateam:start');
  });

// Stop command
program
  .command('stop')
  .description('Stop automation system (redirects to A-TEAM)')
  .action(async () => {
    console.log('🔄 Redirecting to A-TEAM System...');
    console.log('Use: npm run ateam:stop');
  });

// Status command
program
  .command('status')
  .description('Get automation system status (redirects to A-TEAM)')
  .action(async () => {
    console.log('🔄 Redirecting to A-TEAM System...');
    console.log('Use: npm run ateam:status');
  });

// Process request command
program
  .command('process-request')
  .description('Process user request (redirects to A-TEAM)')
  .action(async () => {
    console.log('🔄 Redirecting to A-TEAM System...');
    console.log('Use: npm run ateam:process "your request here"');
  });

// Report command
program
  .command('report')
  .description('Generate automation report (redirects to A-TEAM)')
  .action(async () => {
    console.log('🔄 Redirecting to A-TEAM System...');
    console.log('Use: npm run ateam:report');
  });

// Parse command line arguments
program.parse();
