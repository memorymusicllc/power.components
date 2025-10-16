#!/usr/bin/env node

/**
 * Fix Chart Component Names
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Fixes TypeScript naming issues in chart components by converting hyphens to camelCase.
 */

import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';

// Convert kebab-case to PascalCase
function kebabToPascal(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Convert kebab-case to camelCase
function kebabToCamel(str) {
  const pascal = kebabToPascal(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

async function fixChartComponents() {
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
      const camelName = kebabToCamel(baseName);
      
      // Fix the content
      let fixedContent = content
        // Fix interface names
        .replace(new RegExp(`export interface ${baseName}V3Props`, 'g'), `export interface ${pascalName}V3Props`)
        // Fix component names
        .replace(new RegExp(`const ${baseName}V3Component`, 'g'), `const ${pascalName}V3Component`)
        // Fix display names
        .replace(new RegExp(`${baseName}V3Component.displayName = "${baseName}V3"`, 'g'), `${pascalName}V3Component.displayName = "${pascalName}V3"`)
        // Fix export names
        .replace(new RegExp(`export const ${baseName}V3`, 'g'), `export const ${pascalName}V3`)
        // Fix component references
        .replace(new RegExp(`<${baseName}V3`, 'g'), `<${pascalName}V3`)
        .replace(new RegExp(`</${baseName}V3`, 'g'), `</${pascalName}V3`);
      
      // Write the fixed content
      await writeFile(filePath, fixedContent);
      console.log(`✅ Fixed ${file}`);
    }
    
    console.log('🎉 All chart components fixed!');
    
  } catch (error) {
    console.error('❌ Error fixing chart components:', error);
    throw error;
  }
}

// Run the fix
fixChartComponents().catch(console.error);
