#!/usr/bin/env node

/**
 * Generate Component Data from File System
 * Scans all component directories and generates component metadata
 * 
 * @version 1.0.0
 * @date 2025-01-16
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Component categories mapping
const categoryMapping = {
  'dashboard': { name: 'Dashboard', icon: 'Monitor', count: 0, color: 'blue' },
  'charts': { name: 'Charts', icon: 'BarChart3', count: 0, color: 'green' },
  'workflows': { name: 'Workflows', icon: 'Settings', count: 0, color: 'purple' },
  'search': { name: 'Search', icon: 'Search', count: 0, color: 'orange' },
  'ui': { name: 'UI Components', icon: 'Layers', count: 0, color: 'gray' },
  'redux-ui': { name: 'Redux UI', icon: 'Zap', count: 0, color: 'red' },
  'pow3r': { name: 'Pow3r', icon: 'Shield', count: 0, color: 'indigo' },
  'features': { name: 'Features', icon: 'Activity', count: 0, color: 'pink' },
  'legacy': { name: 'Legacy', icon: 'Archive', count: 0, color: 'yellow' },
  'universal': { name: 'Universal', icon: 'Globe', count: 0, color: 'cyan' }
};

// Component directories to scan
const componentDirs = [
  'src/components/dashboard',
  'src/components/charts', 
  'src/components/workflows',
  'src/components/search',
  'src/components/ui',
  'src/components/redux-ui',
  'src/components/pow3r',
  'src/components/features',
  'src/components/legacy',
  'src/components/universal'
];

function getComponentMetadata(filePath, category) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const configPath = filePath.replace(/\.(tsx|ts)$/, '.pow3r.v3.config.json');
  
  let metadata = {
    id: fileName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: fileName,
    category: category,
    description: `${fileName} component`,
    tags: [category, 'component'],
    version: '1.0.0',
    status: 'active',
    health: 'healthy'
  };

  // Try to read config file for more metadata
  if (fs.existsSync(configPath)) {
    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(configContent);
      
      if (config.props?.description) {
        metadata.description = config.props.description;
      }
      if (config.props?.tags) {
        metadata.tags = [...metadata.tags, ...config.props.tags];
      }
      if (config.version) {
        metadata.version = config.version;
      }
    } catch (error) {
      console.warn(`Warning: Could not parse config for ${fileName}:`, error.message);
    }
  }

  return metadata;
}

function scanDirectory(dirPath, category) {
  const components = [];
  
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return components;
  }

  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
      // Skip index files and test files
      if (file.includes('index') || file.includes('.test.') || file.includes('.spec.')) {
        continue;
      }
      
      const metadata = getComponentMetadata(filePath, category);
      components.push(metadata);
    }
  }
  
  return components;
}

function generateAllComponents() {
  const allComponents = [];
  
  for (const dir of componentDirs) {
    const category = path.basename(dir);
    const components = scanDirectory(dir, category);
    allComponents.push(...components);
    
    // Update category count
    if (categoryMapping[category]) {
      categoryMapping[category].count = components.length;
    }
  }
  
  return allComponents;
}

function generateComponentData() {
  console.log('🔍 Scanning component directories...');
  
  const components = generateAllComponents();
  
  console.log(`✅ Found ${components.length} components`);
  
  // Generate component data file
  const componentData = {
    components,
    categories: categoryMapping,
    totalCount: components.length,
    generatedAt: new Date().toISOString()
  };
  
  const outputPath = path.join(__dirname, '../src/lib/component-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(componentData, null, 2));
  
  console.log(`📁 Component data written to: ${outputPath}`);
  
  // Generate TypeScript types
  const typesPath = path.join(__dirname, '../src/lib/component-types.ts');
  const typesContent = `/**
 * Generated Component Types
 * Auto-generated from component discovery
 * 
 * @version 1.0.0
 * @date ${new Date().toISOString().split('T')[0]}
 */

export interface ComponentMetadata {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  version: string;
  status: 'active' | 'inactive' | 'deprecated' | 'development';
  health: 'healthy' | 'warning' | 'critical';
}

export interface ComponentCategory {
  name: string;
  icon: string;
  count: number;
  color: string;
}

export interface ComponentData {
  components: ComponentMetadata[];
  categories: Record<string, ComponentCategory>;
  totalCount: number;
  generatedAt: string;
}

export const componentData: ComponentData = ${JSON.stringify(componentData, null, 2)};
`;

  fs.writeFileSync(typesPath, typesContent);
  console.log(`📝 TypeScript types written to: ${typesPath}`);
  
  return componentData;
}

// Run the generator
if (import.meta.url === `file://${process.argv[1]}`) {
  generateComponentData();
}

export { generateComponentData };
