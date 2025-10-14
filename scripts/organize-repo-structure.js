#!/usr/bin/env node
/**
 * Repository Structure Organization Script
 * Ensures compliance with Pow3r Law and proper file organization
 * 
 * @version 3.0.0
 * @date 2025-01-11
 */

const fs = require('fs');
const path = require('path');

console.log('🏗️ Organizing repository structure according to Pow3r Law...');

// Define the proper directory structure
const properStructure = {
  '.github/workflows/': [
    'pow3r-deployment-pipeline.yml'
  ],
  'src/': [
    'components/',
    'lib/',
    'index.ts',
    'main.tsx',
    'index.css'
  ],
  'src/components/': [
    'redux-ui/',
    'charts/',
    'dashboard/',
    'search/',
    '*.tsx'
  ],
  'src/lib/': [
    'design-system/',
    'utils.ts',
    'types.ts'
  ],
  'docs/': [
    '*.md',
    '*.pdf'
  ],
  'tests/': [
    '*.spec.ts'
  ],
  'scripts/': [
    '*.js',
    '*.sh'
  ],
  '.archive/': [
    'v2/',
    'old-configs/'
  ],
  '.cursor/rules/': [
    '*.md'
  ]
};

// Files to organize
const fileOrganization = {
  // Move old config files to archive
  'pow3r.config.json': '.archive/old-configs/pow3r.config.json',
  'pow3r.config.md': '.archive/old-configs/pow3r.config.md',
  'pow3r.status.json': '.archive/old-configs/pow3r.status.json',
  
  // Ensure proper placement of v3 files
  'pow3r.v3.config.json': 'pow3r.v3.config.json',
  'pow3r.v3.data.json': 'pow3r.v3.data.json',
  'ComponentLibrary.tsx': 'ComponentLibrary.tsx',
  'ComponentLibrary.v2.tsx': 'ComponentLibrary.v2.tsx',
  'ComponentLibrary.v3.tsx': 'ComponentLibrary.v3.tsx'
};

// Create directories
function createDirectories() {
  console.log('📁 Creating directory structure...');
  
  Object.keys(properStructure).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
}

// Organize files
function organizeFiles() {
  console.log('📄 Organizing files...');
  
  Object.entries(fileOrganization).forEach(([source, destination]) => {
    if (fs.existsSync(source)) {
      // Ensure destination directory exists
      const destDir = path.dirname(destination);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Move file if it's not already in the right place
      if (source !== destination) {
        fs.renameSync(source, destination);
        console.log(`✅ Moved: ${source} → ${destination}`);
      } else {
        console.log(`✅ Verified: ${source} is in correct location`);
      }
    }
  });
}

// Clean up temporary files
function cleanupTempFiles() {
  console.log('🧹 Cleaning up temporary files...');
  
  const tempPatterns = [
    '*.tmp',
    '*.log',
    '.DS_Store',
    'Thumbs.db',
    '*.swp',
    '*.swo',
    '*~'
  ];
  
  const directoriesToClean = [
    '.',
    'src',
    'tests',
    'dist'
  ];
  
  directoriesToClean.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile()) {
          // Check if file matches temp patterns
          const shouldDelete = tempPatterns.some(pattern => {
            const regex = new RegExp(pattern.replace('*', '.*'));
            return regex.test(file);
          });
          
          if (shouldDelete) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted temp file: ${filePath}`);
          }
        }
      });
    }
  });
}

// Verify Pow3r Law compliance
function verifyCompliance() {
  console.log('⚖️ Verifying Pow3r Law compliance...');
  
  const complianceChecks = [
    {
      name: 'Schema files present',
      check: () => fs.existsSync('pow3r.v3.config.json') && fs.existsSync('pow3r.v3.data.json')
    },
    {
      name: 'Component library files present',
      check: () => fs.existsSync('ComponentLibrary.tsx') && 
                     fs.existsSync('ComponentLibrary.v2.tsx') && 
                     fs.existsSync('ComponentLibrary.v3.tsx')
    },
    {
      name: 'GitHub Actions workflow present',
      check: () => fs.existsSync('.github/workflows/pow3r-deployment-pipeline.yml')
    },
    {
      name: 'Documentation present',
      check: () => fs.existsSync('README.md') && fs.existsSync('CHANGELOG.md')
    },
    {
      name: 'Tests present',
      check: () => fs.existsSync('tests/') && fs.readdirSync('tests/').length > 0
    },
    {
      name: 'Source structure organized',
      check: () => fs.existsSync('src/') && fs.existsSync('src/components/') && fs.existsSync('src/lib/')
    }
  ];
  
  let allPassed = true;
  
  complianceChecks.forEach(check => {
    if (check.check()) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name}`);
      allPassed = false;
    }
  });
  
  if (allPassed) {
    console.log('🎉 All compliance checks passed!');
    return true;
  } else {
    console.log('⚠️ Some compliance checks failed!');
    return false;
  }
}

// Generate organization report
function generateReport() {
  console.log('📊 Generating organization report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    version: '3.0.0',
    compliance: verifyCompliance(),
    structure: properStructure,
    files: fileOrganization
  };
  
  fs.writeFileSync('REPO_ORGANIZATION_REPORT.json', JSON.stringify(report, null, 2));
  console.log('✅ Organization report saved to REPO_ORGANIZATION_REPORT.json');
}

// Main execution
function main() {
  try {
    createDirectories();
    organizeFiles();
    cleanupTempFiles();
    const compliant = verifyCompliance();
    generateReport();
    
    if (compliant) {
      console.log('🎉 Repository organization completed successfully!');
      console.log('✅ All files are properly organized according to Pow3r Law');
      process.exit(0);
    } else {
      console.log('⚠️ Repository organization completed with warnings');
      console.log('❌ Some compliance issues remain');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error during repository organization:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  createDirectories,
  organizeFiles,
  cleanupTempFiles,
  verifyCompliance,
  generateReport
};
