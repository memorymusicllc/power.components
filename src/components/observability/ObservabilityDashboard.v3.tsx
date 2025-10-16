/**
 * Observability Dashboard - Real-time monitoring and self-healing interface
 * 
 * This component provides the observability layer that connects to application monitors,
 * agents, and Cursor/AI systems for autonomous multidimensional platform management.
 * 
 * Constitutional Authority: Article I, Article III, Article IX
 */

import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Cpu,
  Database,
  Globe,
  Heart,
  Monitor,
  Network,
  RefreshCw,
  Server,
  Shield,
  Zap,
  Bot,
  Brain,
  Eye,
  Wrench
} from 'lucide-react';
import { useObservabilitySelectors, useObservabilityActions, initializeObservabilitySystem } from '../../lib/observability/observability-engine';

interface ObservabilityDashboardProps {
  className?: string;
}

const ObservabilityDashboard: React.FC<ObservabilityDashboardProps> = ({ className = '' }) => {
  const {
    metrics,
    applicationMonitors,
    agentConnections,
    selfHealingActions,
    systemHealth,
    errorCount,
    lastUpdate
  } = useObservabilitySelectors();

  const {
    triggerSelfHealing,
    connectToCursor,
    connectToAI,
    startMonitoring,
    stopMonitoring
  } = useObservabilityActions();

  const [isMonitoring, setIsMonitoring] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'agents' | 'healing' | 'metrics'>('overview');

  // Initialize observability system
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        initializeObservabilitySystem();
        setIsMonitoring(true);
      } catch (error) {
        console.error('Failed to initialize observability system:', error);
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
      try {
        stopMonitoring();
      } catch (error) {
        console.error('Failed to stop monitoring:', error);
      }
    };
  }, [stopMonitoring]);

  // Get health status color
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Get health status icon
  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Recent metrics (last 10)
  const recentMetrics = metrics.slice(-10).reverse();

  // Active self-healing actions
  const activeHealingActions = selfHealingActions.filter(action => 
    action.status === 'pending' || action.status === 'executing'
  );

  return (
    <div className={`bg-white dark:bg-[hsl(0,0%,6%)] rounded-lg border border-[0.8px] border-gray-200 dark:border-[hsl(0,0%,12%)] ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-[hsl(0,0%,12%)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Observability Engine
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                World's Leading Autonomous Multidimensional Platform
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {getHealthIcon(systemHealth)}
              <span className={`font-medium ${getHealthColor(systemHealth)}`}>
                {systemHealth.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isMonitoring ? 'Monitoring' : 'Stopped'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-[hsl(0,0%,12%)]">
        <div className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: Monitor },
            { id: 'agents', label: 'Agents', icon: Bot },
            { id: 'healing', label: 'Self-Healing', icon: Wrench },
            { id: 'metrics', label: 'Metrics', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Server className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {applicationMonitors.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Application Monitors
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Bot className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {agentConnections.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Connected Agents
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Wrench className="w-8 h-8 text-purple-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {activeHealingActions.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Active Healing
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {errorCount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Active Errors
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Metrics */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Real-time Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentMetrics.slice(0, 3).map((metric) => (
                  <div key={metric.id} className="bg-white dark:bg-[hsl(0,0%,6%)] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {metric.name}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(metric.severity)}`}>
                        {metric.severity}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value.toFixed(1)} {metric.unit}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {metric.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'agents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Connected Agents
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={connectToCursor}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                >
                  Connect Cursor
                </button>
                <button
                  onClick={connectToAI}
                  className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
                >
                  Connect AI
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agentConnections.map((agent) => (
                <div key={agent.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {agent.type === 'cursor' ? (
                      <Brain className="w-6 h-6 text-blue-500" />
                    ) : (
                      <Bot className="w-6 h-6 text-green-500" />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {agent.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {agent.type.toUpperCase()} Agent
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        agent.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {agent.status}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div>Response Time: {agent.performance.responseTime}ms</div>
                      <div>Success Rate: {(agent.performance.successRate * 100).toFixed(1)}%</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {agent.capabilities.slice(0, 3).map((capability) => (
                        <span
                          key={capability}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'healing' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Self-Healing Actions
              </h3>
              <button
                onClick={() => triggerSelfHealing('test-component', 'Performance degradation detected')}
                className="px-3 py-1 bg-purple-500 text-white rounded-md text-sm hover:bg-purple-600 transition-colors"
              >
                Test Healing
              </button>
            </div>
            
            <div className="space-y-3">
              {selfHealingActions.map((action) => (
                <div key={action.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-purple-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {action.componentId}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      action.status === 'completed' ? 'bg-green-100 text-green-800' :
                      action.status === 'executing' ? 'bg-blue-100 text-blue-800' :
                      action.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {action.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <div>Action: {action.action}</div>
                    <div>Trigger: {action.trigger}</div>
                    <div>Time: {action.timestamp.toLocaleString()}</div>
                  </div>
                  
                  {action.result && (
                    <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900 p-2 rounded">
                      {action.result}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'metrics' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Real-time Metrics Stream
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {recentMetrics.map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-2 bg-white dark:bg-[hsl(0,0%,6%)] rounded">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        metric.category === 'performance' ? 'bg-blue-500' :
                        metric.category === 'error' ? 'bg-red-500' :
                        metric.category === 'security' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}></div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {metric.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {metric.value.toFixed(1)} {metric.unit}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(metric.severity)}`}>
                        {metric.severity}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {metric.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObservabilityDashboard;
