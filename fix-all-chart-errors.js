#!/usr/bin/env node

/**
 * Fix All Chart Component Errors
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Comprehensive fix for all chart component naming and syntax errors.
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

async function fixAllChartErrors() {
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
      
      // Fix the content comprehensively
      let fixedContent = content;
      
      // Fix interface names
      fixedContent = fixedContent.replace(
        new RegExp(`${baseName}V3Props`, 'g'),
        `${pascalName}V3Props`
      );
      
      // Fix component variable names
      fixedContent = fixedContent.replace(
        new RegExp(`${baseName}V3Component`, 'g'),
        `${pascalName}V3Component`
      );
      
      // Fix export names
      fixedContent = fixedContent.replace(
        new RegExp(`export const ${baseName}V3`, 'g'),
        `export const ${pascalName}V3`
      );
      
      // Fix default export names
      fixedContent = fixedContent.replace(
        new RegExp(`export default ${baseName}V3`, 'g'),
        `export default ${pascalName}V3`
      );
      
      // Fix withMemo calls
      fixedContent = fixedContent.replace(
        new RegExp(`withMemo\\(${baseName}V3Component\\)`, 'g'),
        `withMemo(${pascalName}V3Component)`
      );
      
      // Fix displayName assignments
      fixedContent = fixedContent.replace(
        new RegExp(`${baseName}V3Component\\.displayName = "${baseName}V3"`, 'g'),
        `${pascalName}V3Component.displayName = "${pascalName}V3"`
      );
      
      // Remove unused imports
      fixedContent = fixedContent.replace(
        /import React, \{ useState, useEffect, useRef, useCallback \} from 'react';/g,
        'import React from \'react\';'
      );
      
      // Remove unused xFiles variable
      fixedContent = fixedContent.replace(
        /const xFiles = useXFiles\(\);\s*/g,
        ''
      );
      
      // Remove unused props parameter
      fixedContent = fixedContent.replace(
        /\(props, ref\) => \{/g,
        '(_, ref) => {'
      );
      
      // Write the fixed content
      await writeFile(filePath, fixedContent);
      console.log(`✅ Fixed all errors in ${file}`);
    }
    
    console.log('🎉 All chart component errors fixed!');
    
  } catch (error) {
    console.error('❌ Error fixing chart components:', error);
    throw error;
  }
}

// Run the fix
fixAllChartErrors().catch(console.error);
