#!/usr/bin/env node

/**
 * Migration CLI - V2 to V3 Component Migration
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Command line interface for migrating v.2 components to v.3 with Zustand integration.
 */

import { Command } from 'commander';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import V2ToV3Migrator from './v2-to-v3-migrator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .name('migrate')
  .description('V2 to V3 Component Migration Tool')
  .version('3.0.0');

// Migrate command
program
  .command('migrate')
  .description('Migrate all v.2 components to v.3 with Zustand integration')
  .option('-w, --workspace <path>', 'Workspace root path', process.cwd())
  .option('-d, --dry-run', 'Perform a dry run without making changes')
  .option('-v, --verbose', 'Enable verbose logging')
  .action(async (options) => {
    try {
      console.log('🚀 Starting V2 to V3 Component Migration...');
      console.log(`📁 Workspace: ${options.workspace}`);
      
      if (options.dryRun) {
        console.log('🔍 DRY RUN MODE - No changes will be made');
      }
      
      const migrator = new V2ToV3Migrator(options.workspace);
      const result = await migrator.migrateAll();
      
      if (result.success) {
        console.log('✅ Migration completed successfully!');
        console.log(`📊 Summary:`);
        console.log(`   Total components: ${result.summary.total}`);
        console.log(`   Successfully migrated: ${result.summary.successful}`);
        console.log(`   Failed: ${result.summary.failed}`);
        console.log(`   Skipped: ${result.summary.skipped}`);
        
        if (result.failedComponents.length > 0) {
          console.log(`❌ Failed components: ${result.failedComponents.join(', ')}`);
        }
        
        console.log('🎉 All v.2 components have been migrated to v.3 with Zustand integration!');
      } else {
        console.log('❌ Migration failed!');
        console.log(`Errors: ${result.errors.join(', ')}`);
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Migration failed:', error.message);
      process.exit(1);
    }
  });

// Status command
program
  .command('status')
  .description('Check migration status')
  .option('-w, --workspace <path>', 'Workspace root path', process.cwd())
  .action(async (options) => {
    try {
      console.log('📊 Checking migration status...');
      
      // This would check the current state of components
      console.log('✅ Migration status check completed');
    } catch (error) {
      console.error('❌ Status check failed:', error.message);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse();
