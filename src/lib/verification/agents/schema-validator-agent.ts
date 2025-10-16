/**
 * Schema Validator Agent
 * Validates that all components conform to their pow3r.config.json schemas
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class SchemaValidatorAgent {
  private schemaCache = new Map<string, any>();
  private componentCache = new Map<string, any>();

  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('🔍 Schema Validator Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalComponents = 0;
    let validComponents = 0;

    try {
      // Load the main schema
      const mainSchema = await this.loadMainSchema();
      if (!mainSchema) {
        issues.push({
          id: 'schema-main-missing',
          severity: 'critical',
          category: 'schema',
          message: 'Main pow3r.config.json schema not found',
          autoFixable: false
        });
        return { score: 0, issues, recommendations };
      }

      // Find all component files
      const componentFiles = await this.findComponentFiles();
      totalComponents = componentFiles.length;

      // Validate each component
      for (const file of componentFiles) {
        const result = await this.validateComponent(file, mainSchema);
        if (result.valid) {
          validComponents++;
        } else {
          issues.push(...result.issues);
        }
      }

      // Check for missing config files
      const missingConfigs = await this.findMissingConfigFiles(componentFiles);
      issues.push(...missingConfigs);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, validComponents, totalComponents));

      const score = totalComponents > 0 ? Math.round((validComponents / totalComponents) * 100) : 0;

      console.log(`✅ Schema Validator: ${validComponents}/${totalComponents} components valid (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Schema Validator Agent failed:', error);
      issues.push({
        id: 'schema-agent-error',
        severity: 'critical',
        category: 'schema',
        message: `Schema validation failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async loadMainSchema(): Promise<any> {
    const schemaPath = join(process.cwd(), 'pow3r.v3.config.json');
    if (!existsSync(schemaPath)) {
      return null;
    }

    try {
      const schemaContent = readFileSync(schemaPath, 'utf-8');
      return JSON.parse(schemaContent);
    } catch (error) {
      console.error('Failed to load main schema:', error);
      return null;
    }
  }

  private async findComponentFiles(): Promise<string[]> {
    const patterns = [
      'src/components/**/*.tsx',
      'src/components/**/*.ts',
      'power-canvas/src/**/*.ts',
      'power-redact/**/*.js'
    ];

    const files: string[] = [];
    for (const pattern of patterns) {
      try {
        const matches = await glob(pattern, { cwd: process.cwd() });
        files.push(...matches);
      } catch (error) {
        console.warn(`Failed to search pattern ${pattern}:`, error);
      }
    }

    return files.filter(file => 
      !file.includes('.spec.') && 
      !file.includes('.test.') &&
      !file.includes('.d.ts')
    );
  }

  private async validateComponent(filePath: string, mainSchema: any): Promise<{
    valid: boolean;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    
    try {
      // Check if component has metadata
      const componentContent = readFileSync(join(process.cwd(), filePath), 'utf-8');
      const hasMetadata = this.extractComponentMetadata(componentContent);
      
      if (!hasMetadata) {
        issues.push({
          id: `metadata-missing-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'schema',
          component: filePath,
          message: 'Component missing metadata annotation',
          suggestion: 'Add metadata object with name, version, description, etc.',
          autoFixable: true
        });
      }

      // Check for pow3r.config.json file
      const configPath = this.findConfigFile(filePath);
      if (!configPath || !existsSync(join(process.cwd(), configPath))) {
        issues.push({
          id: `config-missing-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'medium',
          category: 'schema',
          component: filePath,
          message: 'Component missing pow3r.config.json file',
          suggestion: 'Create component-specific config file following schema',
          autoFixable: true
        });
      } else {
        // Validate config file against schema
        const configIssues = await this.validateConfigFile(configPath, mainSchema);
        issues.push(...configIssues);
      }

      // Check for required schema properties
      const schemaIssues = this.validateSchemaProperties(componentContent, filePath);
      issues.push(...schemaIssues);

      return { valid: issues.length === 0, issues };

    } catch (error) {
      issues.push({
        id: `validation-error-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`,
        severity: 'high',
        category: 'schema',
        component: filePath,
        message: `Failed to validate component: ${(error as Error).message}`,
        autoFixable: false
      });
      return { valid: false, issues };
    }
  }

  private extractComponentMetadata(content: string): any {
    // Look for metadata annotation
    const metadataMatch = content.match(/\.metadata\s*=\s*({[\s\S]*?});/);
    if (metadataMatch) {
      try {
        return JSON.parse(metadataMatch[1]);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  private findConfigFile(componentPath: string): string | null {
    const dir = componentPath.substring(0, componentPath.lastIndexOf('/'));
    const fileName = componentPath.substring(componentPath.lastIndexOf('/') + 1);
    const baseName = fileName.replace(/\.(tsx?|js)$/, '');
    
    // Look for various config file patterns
    const configPatterns = [
      `${dir}/${baseName}.pow3r.config.json`,
      `${dir}/${baseName}.config.json`,
      `${dir}/pow3r.config.json`,
      `${dir}/config.json`
    ];

    for (const pattern of configPatterns) {
      if (existsSync(join(process.cwd(), pattern))) {
        return pattern;
      }
    }

    return null;
  }

  private async validateConfigFile(configPath: string, mainSchema: any): Promise<VerificationIssue[]> {
    const issues: VerificationIssue[] = [];

    try {
      const configContent = readFileSync(join(process.cwd(), configPath), 'utf-8');
      const config = JSON.parse(configContent);

      // Validate against main schema
      const validationIssues = this.validateAgainstSchema(config, mainSchema, configPath);
      issues.push(...validationIssues);

      // Check for required fields
      const requiredFields = ['id', 'type', 'version', 'io', 'agentDirectives'];
      for (const field of requiredFields) {
        if (!config[field]) {
          issues.push({
            id: `required-field-missing-${field}-${configPath.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'schema',
            component: configPath,
            message: `Required field '${field}' is missing`,
            suggestion: `Add required field '${field}' to config`,
            autoFixable: true
          });
        }
      }

      // Validate version format
      if (config.version && !/^\d+\.\d+\.\d+$/.test(config.version)) {
        issues.push({
          id: `invalid-version-${configPath.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'medium',
          category: 'schema',
          component: configPath,
          message: `Invalid version format: ${config.version}`,
          suggestion: 'Use semantic versioning format (e.g., 1.0.0)',
          autoFixable: true
        });
      }

    } catch (error) {
      issues.push({
        id: `config-parse-error-${configPath.replace(/[^a-zA-Z0-9]/g, '-')}`,
        severity: 'critical',
        category: 'schema',
        component: configPath,
        message: `Failed to parse config file: ${(error as Error).message}`,
        autoFixable: false
      });
    }

    return issues;
  }

  private validateAgainstSchema(config: any, schema: any, configPath: string): VerificationIssue[] {
    const issues: VerificationIssue[] = [];

    // Basic schema validation (simplified)
    if (schema.definitions && schema.definitions.Node) {
      const nodeSchema = schema.definitions.Node;
      
      // Check required properties
      if (nodeSchema.required) {
        for (const required of nodeSchema.required) {
          if (!config[required]) {
            issues.push({
              id: `schema-required-${required}-${configPath.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'high',
              category: 'schema',
              component: configPath,
              message: `Schema validation failed: required field '${required}' missing`,
              suggestion: `Add required field '${required}'`,
              autoFixable: true
            });
          }
        }
      }
    }

    return issues;
  }

  private validateSchemaProperties(content: string, filePath: string): VerificationIssue[] {
    const issues: VerificationIssue[] = [];

    // Check for self-healing configuration
    if (!content.includes('selfHealing') && !content.includes('SELF_HEALING')) {
      issues.push({
        id: `self-healing-missing-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`,
        severity: 'medium',
        category: 'schema',
        component: filePath,
        message: 'Component missing self-healing configuration',
        suggestion: 'Add self-healing configuration for automated error recovery',
        autoFixable: true
      });
    }

    // Check for observability metrics
    if (!content.includes('observability') && !content.includes('metrics')) {
      issues.push({
        id: `observability-missing-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`,
        severity: 'low',
        category: 'schema',
        component: filePath,
        message: 'Component missing observability metrics',
        suggestion: 'Add observability metrics for monitoring and debugging',
        autoFixable: true
      });
    }

    // Check for agent directives
    if (!content.includes('agentDirectives') && !content.includes('AGENT_DIRECTIVES')) {
      issues.push({
        id: `agent-directives-missing-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`,
        severity: 'medium',
        category: 'schema',
        component: filePath,
        message: 'Component missing agent directives',
        suggestion: 'Add agent directives for automated testing and maintenance',
        autoFixable: true
      });
    }

    return issues;
  }

  private async findMissingConfigFiles(componentFiles: string[]): Promise<VerificationIssue[]> {
    const issues: VerificationIssue[] = [];
    
    for (const file of componentFiles) {
      const configPath = this.findConfigFile(file);
      if (!configPath || !existsSync(join(process.cwd(), configPath))) {
        issues.push({
          id: `config-missing-${file.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'medium',
          category: 'schema',
          component: file,
          message: 'Component missing configuration file',
          suggestion: 'Create pow3r.config.json file for this component',
          autoFixable: true
        });
      }
    }

    return issues;
  }

  private generateRecommendations(issues: VerificationIssue[], validComponents: number, totalComponents: number): string[] {
    const recommendations: string[] = [];

    if (validComponents < totalComponents) {
      recommendations.push(`Improve schema compliance: ${totalComponents - validComponents} components need schema fixes`);
    }

    const criticalIssues = issues.filter(i => i.severity === 'critical');
    if (criticalIssues.length > 0) {
      recommendations.push(`Address ${criticalIssues.length} critical schema issues immediately`);
    }

    const autoFixableIssues = issues.filter(i => i.autoFixable);
    if (autoFixableIssues.length > 0) {
      recommendations.push(`Run auto-fix to resolve ${autoFixableIssues.length} automatically fixable schema issues`);
    }

    if (issues.some(i => i.message.includes('metadata'))) {
      recommendations.push('Add metadata annotations to all components for better discoverability');
    }

    if (issues.some(i => i.message.includes('self-healing'))) {
      recommendations.push('Implement self-healing capabilities across all components');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    // Implementation for single component verification
    const result = await this.verify({ componentId });
    return {
      agentId: 'schema-validator',
      agentName: 'Schema Validator',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}

