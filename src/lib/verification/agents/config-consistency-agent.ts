/**
 * Config Consistency Agent
 * Verifies consistency between component configs and main schema
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class ConfigConsistencyAgent {
  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('⚙️ Config Consistency Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalConfigs = 0;
    let consistentConfigs = 0;

    try {
      // Load main schema
      const mainSchema = await this.loadMainSchema();
      if (!mainSchema) {
        issues.push({
          id: 'main-schema-missing',
          severity: 'critical',
          category: 'schema',
          message: 'Main schema not found for consistency checking',
          autoFixable: false
        });
        return { score: 0, issues, recommendations };
      }

      // Check config consistency
      const consistencyResults = await this.checkConfigConsistency(mainSchema);
      totalConfigs += consistencyResults.total;
      consistentConfigs += consistencyResults.valid;
      issues.push(...consistencyResults.issues);

      // Check version consistency
      const versionResults = await this.checkVersionConsistency();
      totalConfigs += versionResults.total;
      consistentConfigs += versionResults.valid;
      issues.push(...versionResults.issues);

      // Check naming consistency
      const namingResults = await this.checkNamingConsistency();
      totalConfigs += namingResults.total;
      consistentConfigs += namingResults.valid;
      issues.push(...namingResults.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, consistentConfigs, totalConfigs));

      const score = totalConfigs > 0 ? Math.round((consistentConfigs / totalConfigs) * 100) : 100;

      console.log(`✅ Config Consistency: ${consistentConfigs}/${totalConfigs} configs consistent (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Config Consistency Agent failed:', error);
      issues.push({
        id: 'config-consistency-agent-error',
        severity: 'critical',
        category: 'schema',
        message: `Config consistency verification failed: ${(error as Error).message}`,
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

  private async checkConfigConsistency(mainSchema: any): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Find all config files
    const configFiles = await glob('**/*.config.json', { cwd: process.cwd() });
    
    for (const configFile of configFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), configFile), 'utf-8');
        const config = JSON.parse(content);
        
        // Check required fields consistency
        const requiredFields = ['id', 'type', 'version', 'io'];
        const missingFields = requiredFields.filter(field => !config[field]);
        
        if (missingFields.length > 0) {
          issues.push({
            id: `config-missing-fields-${configFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'schema',
            component: configFile,
            message: `Config missing required fields: ${missingFields.join(', ')}`,
            suggestion: 'Add missing required fields to config',
            autoFixable: true
          });
        }
        
        // Check schema compliance
        const schemaIssues = this.validateAgainstMainSchema(config, mainSchema, configFile);
        issues.push(...schemaIssues);
        
        if (missingFields.length === 0 && schemaIssues.length === 0) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `config-parse-error-${configFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'critical',
          category: 'schema',
          component: configFile,
          message: `Failed to parse config: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private validateAgainstMainSchema(config: any, mainSchema: any, configFile: string): VerificationIssue[] {
    const issues: VerificationIssue[] = [];

    // Check if config follows main schema structure
    if (mainSchema.definitions && mainSchema.definitions.Node) {
      const nodeSchema = mainSchema.definitions.Node;
      
      // Check required properties
      if (nodeSchema.required) {
        for (const required of nodeSchema.required) {
          if (!config[required]) {
            issues.push({
              id: `schema-required-missing-${required}-${configFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'high',
              category: 'schema',
              component: configFile,
              message: `Schema validation failed: required field '${required}' missing`,
              suggestion: `Add required field '${required}' to config`,
              autoFixable: true
            });
          }
        }
      }
      
      // Check property types
      if (nodeSchema.properties) {
        for (const [propName, propSchema] of Object.entries(nodeSchema.properties)) {
          if (config[propName] && typeof propSchema === 'object' && 'type' in propSchema) {
            const expectedType = (propSchema as any).type;
            const actualType = Array.isArray(config[propName]) ? 'array' : typeof config[propName];
            
            if (expectedType !== actualType) {
              issues.push({
                id: `schema-type-mismatch-${propName}-${configFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
                severity: 'medium',
                category: 'schema',
                component: configFile,
                message: `Type mismatch for '${propName}': expected ${expectedType}, got ${actualType}`,
                suggestion: `Fix type for '${propName}' field`,
                autoFixable: true
              });
            }
          }
        }
      }
    }

    return issues;
  }

  private async checkVersionConsistency(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Load main config version
    const mainConfigPath = join(process.cwd(), 'pow3r.v3.config.json');
    let mainVersion = '3.0.0';
    
    if (existsSync(mainConfigPath)) {
      try {
        const mainContent = readFileSync(mainConfigPath, 'utf-8');
        const mainConfig = JSON.parse(mainContent);
        mainVersion = mainConfig.version || '3.0.0';
      } catch (error) {
        console.warn('Failed to read main config version:', error);
      }
    }

    // Check component config versions
    const configFiles = await glob('**/*.config.json', { cwd: process.cwd() });
    
    for (const configFile of configFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), configFile), 'utf-8');
        const config = JSON.parse(content);
        
        if (config.version && config.version !== mainVersion) {
          issues.push({
            id: `version-mismatch-${configFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'schema',
            component: configFile,
            message: `Version mismatch: config has ${config.version}, main is ${mainVersion}`,
            suggestion: 'Update config version to match main version',
            autoFixable: true
          });
        } else {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `version-check-error-${configFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'schema',
          component: configFile,
          message: `Failed to check version: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async checkNamingConsistency(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check component naming patterns
    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Extract component name from file
        const fileName = componentFile.split('/').pop()?.replace(/\.tsx$/, '') || '';
        const expectedComponentName = this.toPascalCase(fileName);
        
        // Check if component name matches file name
        const componentNameMatch = content.match(/export\s+(?:default\s+)?(?:const|function)\s+(\w+)/);
        if (componentNameMatch) {
          const actualComponentName = componentNameMatch[1];
          
          if (actualComponentName !== expectedComponentName) {
            issues.push({
              id: `naming-mismatch-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'low',
              category: 'schema',
              component: componentFile,
              message: `Component name '${actualComponentName}' doesn't match file name '${fileName}'`,
              suggestion: 'Use consistent naming between file and component',
              autoFixable: true
            });
          } else {
            valid++;
          }
        } else {
          issues.push({
            id: `component-name-not-found-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'schema',
            component: componentFile,
            message: 'Could not find component name in file',
            suggestion: 'Ensure component is properly named and exported',
            autoFixable: true
          });
        }

      } catch (error) {
        issues.push({
          id: `naming-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'schema',
          component: componentFile,
          message: `Failed to check naming: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private toPascalCase(str: string): string {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  private generateRecommendations(issues: VerificationIssue[], consistentConfigs: number, totalConfigs: number): string[] {
    const recommendations: string[] = [];

    if (consistentConfigs < totalConfigs) {
      recommendations.push(`Improve config consistency: ${totalConfigs - consistentConfigs} configs need fixes`);
    }

    const schemaIssues = issues.filter(i => i.message.includes('schema'));
    if (schemaIssues.length > 0) {
      recommendations.push('Ensure all configs comply with main schema definition');
    }

    const versionIssues = issues.filter(i => i.message.includes('version'));
    if (versionIssues.length > 0) {
      recommendations.push('Maintain consistent versioning across all configs');
    }

    const namingIssues = issues.filter(i => i.message.includes('naming'));
    if (namingIssues.length > 0) {
      recommendations.push('Standardize naming conventions across components and configs');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    const result = await this.verify({ componentId });
    return {
      agentId: 'config-consistency',
      agentName: 'Config Consistency',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}

