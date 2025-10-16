/**
 * Data Flow Analyzer Agent
 * Analyzes data flow between components and verifies data integrity
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { VerificationResult, VerificationIssue } from '../multi-agent-orchestrator';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

export class DataFlowAnalyzerAgent {
  async verify(options: any = {}): Promise<{
    score: number;
    issues: VerificationIssue[];
    recommendations: string[];
  }> {
    console.log('📊 Data Flow Analyzer Agent: Starting verification...');
    
    const issues: VerificationIssue[] = [];
    const recommendations: string[] = [];
    let totalFlows = 0;
    let validFlows = 0;

    try {
      // Analyze component data flows
      const componentFlows = await this.analyzeComponentDataFlows();
      totalFlows += componentFlows.total;
      validFlows += componentFlows.valid;
      issues.push(...componentFlows.issues);

      // Analyze state management
      const stateFlows = await this.analyzeStateManagement();
      totalFlows += stateFlows.total;
      validFlows += stateFlows.valid;
      issues.push(...stateFlows.issues);

      // Analyze API data flows
      const apiFlows = await this.analyzeApiDataFlows();
      totalFlows += apiFlows.total;
      validFlows += apiFlows.valid;
      issues.push(...apiFlows.issues);

      // Generate recommendations
      recommendations.push(...this.generateRecommendations(issues, validFlows, totalFlows));

      const score = totalFlows > 0 ? Math.round((validFlows / totalFlows) * 100) : 100;

      console.log(`✅ Data Flow Analyzer: ${validFlows}/${totalFlows} flows valid (${score}%)`);

      return { score, issues, recommendations };

    } catch (error) {
      console.error('❌ Data Flow Analyzer Agent failed:', error);
      issues.push({
        id: 'data-flow-agent-error',
        severity: 'critical',
        category: 'data',
        message: `Data flow analysis failed: ${(error as Error).message}`,
        autoFixable: false
      });
      return { score: 0, issues, recommendations };
    }
  }

  private async analyzeComponentDataFlows(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Check for proper prop types
        const hasPropTypes = content.includes('interface') && content.includes('Props');
        const hasDefaultProps = content.includes('defaultProps') || content.includes('= {}');
        
        // Check for data validation
        const hasDataValidation = content.includes('validate') || content.includes('schema');
        
        // Check for error boundaries
        const hasErrorHandling = content.includes('try') || content.includes('catch') || 
                                content.includes('ErrorBoundary');
        
        if (!hasPropTypes) {
          issues.push({
            id: `missing-prop-types-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'data',
            component: componentFile,
            message: 'Component missing proper prop type definitions',
            suggestion: 'Add TypeScript interfaces for component props',
            autoFixable: true
          });
        }
        
        if (!hasDataValidation) {
          issues.push({
            id: `missing-data-validation-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'data',
            component: componentFile,
            message: 'Component missing data validation',
            suggestion: 'Add data validation for props and state',
            autoFixable: true
          });
        }
        
        if (!hasErrorHandling) {
          issues.push({
            id: `missing-error-handling-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'data',
            component: componentFile,
            message: 'Component missing error handling for data operations',
            suggestion: 'Add error boundaries and try-catch blocks',
            autoFixable: true
          });
        }
        
        if (hasPropTypes && hasDataValidation && hasErrorHandling) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `data-flow-check-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'data',
          component: componentFile,
          message: `Failed to analyze data flow: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async analyzeStateManagement(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check for state management setup
    const storeFiles = await glob('src/lib/stores/**/*.ts', { cwd: process.cwd() });
    
    if (storeFiles.length === 0) {
      issues.push({
        id: 'no-state-management',
        severity: 'high',
        category: 'data',
        message: 'No state management system found',
        suggestion: 'Implement centralized state management (Redux, Zustand, etc.)',
        autoFixable: true
      });
      return { total: 0, valid: 0, issues };
    }

    total++;
    valid++;

    // Check components for proper state usage
    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Check for proper state management usage
        const hasStateManagement = content.includes('useStore') || content.includes('useSelector') || 
                                  content.includes('useDispatch') || content.includes('useState');
        
        // Check for state immutability
        const hasImmutability = !content.includes('.push(') && !content.includes('.pop()') && 
                               !content.includes('.splice(') && !content.includes('state =');
        
        if (!hasStateManagement) {
          issues.push({
            id: `no-state-management-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'medium',
            category: 'data',
            component: componentFile,
            message: 'Component not using proper state management',
            suggestion: 'Use centralized state management instead of local state',
            autoFixable: true
          });
        }
        
        if (!hasImmutability) {
          issues.push({
            id: `state-mutation-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
            severity: 'high',
            category: 'data',
            component: componentFile,
            message: 'Component may be mutating state directly',
            suggestion: 'Ensure state immutability in state updates',
            autoFixable: true
          });
        }
        
        if (hasStateManagement && hasImmutability) {
          valid++;
        }

      } catch (error) {
        issues.push({
          id: `state-analysis-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'data',
          component: componentFile,
          message: `Failed to analyze state management: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private async analyzeApiDataFlows(): Promise<{
    total: number;
    valid: number;
    issues: VerificationIssue[];
  }> {
    const issues: VerificationIssue[] = [];
    let total = 0;
    let valid = 0;

    // Check for API client
    const apiClientPath = join(process.cwd(), 'src/lib/api-client.ts');
    if (!existsSync(apiClientPath)) {
      issues.push({
        id: 'api-client-missing',
        severity: 'high',
        category: 'data',
        message: 'API client not found',
        suggestion: 'Create centralized API client for data fetching',
        autoFixable: true
      });
      return { total: 0, valid: 0, issues };
    }

    total++;
    valid++;

    // Check components for proper API usage
    const componentFiles = await glob('src/components/**/*.tsx', { cwd: process.cwd() });
    
    for (const componentFile of componentFiles) {
      total++;
      
      try {
        const content = readFileSync(join(process.cwd(), componentFile), 'utf-8');
        
        // Check for API calls
        const hasApiCalls = content.includes('fetch(') || content.includes('axios') || 
                           content.includes('api-client') || content.includes('useQuery');
        
        if (hasApiCalls) {
          // Check for loading states
          const hasLoadingStates = content.includes('loading') || content.includes('isLoading');
          
          // Check for error handling
          const hasErrorHandling = content.includes('error') || content.includes('catch');
          
          // Check for data caching
          const hasCaching = content.includes('cache') || content.includes('useQuery') || 
                            content.includes('useSWR');
          
          if (!hasLoadingStates) {
            issues.push({
              id: `no-loading-states-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'medium',
              category: 'data',
              component: componentFile,
              message: 'API calls missing loading states',
              suggestion: 'Add loading states for better UX',
              autoFixable: true
            });
          }
          
          if (!hasErrorHandling) {
            issues.push({
              id: `no-api-error-handling-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'high',
              category: 'data',
              component: componentFile,
              message: 'API calls missing error handling',
              suggestion: 'Add proper error handling for API calls',
              autoFixable: true
            });
          }
          
          if (!hasCaching) {
            issues.push({
              id: `no-api-caching-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
              severity: 'low',
              category: 'data',
              component: componentFile,
              message: 'API calls not using caching',
              suggestion: 'Implement caching for better performance',
              autoFixable: true
            });
          }
          
          if (hasLoadingStates && hasErrorHandling && hasCaching) {
            valid++;
          }
        } else {
          valid++; // No API calls is valid
        }

      } catch (error) {
        issues.push({
          id: `api-analysis-error-${componentFile.replace(/[^a-zA-Z0-9]/g, '-')}`,
          severity: 'high',
          category: 'data',
          component: componentFile,
          message: `Failed to analyze API data flow: ${(error as Error).message}`,
          autoFixable: false
        });
      }
    }

    return { total, valid, issues };
  }

  private generateRecommendations(issues: VerificationIssue[], validFlows: number, totalFlows: number): string[] {
    const recommendations: string[] = [];

    if (validFlows < totalFlows) {
      recommendations.push(`Improve data flow quality: ${totalFlows - validFlows} flows need fixes`);
    }

    const propIssues = issues.filter(i => i.message.includes('prop'));
    if (propIssues.length > 0) {
      recommendations.push('Standardize prop type definitions across all components');
    }

    const stateIssues = issues.filter(i => i.message.includes('state'));
    if (stateIssues.length > 0) {
      recommendations.push('Implement consistent state management patterns');
    }

    const apiIssues = issues.filter(i => i.message.includes('API'));
    if (apiIssues.length > 0) {
      recommendations.push('Standardize API data flow patterns with proper error handling');
    }

    return recommendations;
  }

  async verifyComponent(componentId: string): Promise<VerificationResult> {
    const result = await this.verify({ componentId });
    return {
      agentId: 'data-flow-analyzer',
      agentName: 'Data Flow Analyzer',
      status: result.score >= 80 ? 'success' : result.score >= 60 ? 'warning' : 'error',
      score: result.score,
      issues: result.issues,
      recommendations: result.recommendations,
      executionTime: 0,
      timestamp: new Date()
    };
  }
}

