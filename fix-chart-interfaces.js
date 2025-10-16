#!/usr/bin/env node

/**
 * Fix Chart Interface Names
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Fixes interface names in chart components to use proper PascalCase.
 */

import { readFile, writeFile, readdir } from 'fs/promises';
import { join, basename } from 'path';

// Convert kebab-case to PascalCase
function kebabToPascal(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

async function fixChartInterfaces() {
  const chartsDir = join(process.cwd(), 'src', 'components', 'charts');
  
  try {
    const files = await readdir(chartsDir);
    const chartFiles = files.filter(file => file.endsWith('.v3.tsx'));
    
    console.log(`Found ${chartFiles.length} chart files to fix...`);
    
    for (const file of chartFiles) {
      const filePath = join(chartsDir, file);
      const content = await readFile(filePath, 'utf-8');
      
      // Extract the base name (without .v3.tsx)
      const baseName = basename(file, '.v3.tsx');
      
      // Convert to proper naming
      const pascalName = kebabToPascal(baseName);
      
      // Fix the content - replace all instances of kebab-case interface names
      let fixedContent = content;
      
      // Fix interface names in forwardRef calls
      fixedContent = fixedContent.replace(
        new RegExp(`${baseName}V3Props`, 'g'),
        `${pascalName}V3Props`
      );
      
      // Write the fixed content
      await writeFile(filePath, fixedContent);
      console.log(`✅ Fixed interfaces in ${file}`);
    }
    
    console.log('🎉 All chart interfaces fixed!');
    
  } catch (error) {
    console.error('❌ Error fixing chart interfaces:', error);
    throw error;
  }
}

// Run the fix
fixChartInterfaces().catch(console.error);
