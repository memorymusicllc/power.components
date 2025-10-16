/**
 * A-TEAM Dashboard - Real-time Monitoring Interface
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Real-time dashboard for monitoring A-TEAM system status, agent performance,
 * and constitutional compliance.
 */

import React, { useState, useEffect } from 'react';
import { ATEAMSystem, ATEAMStatus, ATEAMResult } from './ateam-system';

interface ATEAMDashboardProps {
  ateamSystem: ATEAMSystem;
  refreshInterval?: number;
  showDetails?: boolean;
  className?: string;
}

interface AgentStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastActivity: string;
  operationsCompleted: number;
  operationsFailed: number;
  health: 'healthy' | 'warning' | 'critical';
}

interface SystemMetrics {
  totalSessions: number;
  successfulSessions: number;
  failedSessions: number;
  averageGoalScore: number;
  averageConfidenceScore: number;
  totalOperations: number;
  totalViolations: number;
}

export const ATEAMDashboard: React.FC<ATEAMDashboardProps> = ({
  ateamSystem,
  refreshInterval = 5000,
  showDetails = true,
  className = ''
}) => {
  const [status, setStatus] = useState<ATEAMStatus | null>(null);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [recentSessions, setRecentSessions] = useState<ATEAMResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [systemStatus, systemMetrics, sessions] = await Promise.all([
          Promise.resolve(ateamSystem.getStatus()),
          Promise.resolve(ateamSystem.getMetrics()),
          Promise.resolve(ateamSystem.getCompletedSessions())
        ]);

        setStatus(systemStatus);
        setMetrics(systemMetrics);
        setRecentSessions(sessions.slice(-10)); // Last 10 sessions
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    // Load initial data
    loadDashboardData();

    // Set up refresh interval
    const interval = setInterval(loadDashboardData, refreshInterval);

    return () => clearInterval(interval);
  }, [ateamSystem, refreshInterval]);

  if (isLoading) {
    return (
      <div className={`ateam-dashboard loading ${className}`}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading A-TEAM Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`ateam-dashboard error ${className}`}>
        <div className="error-message">
          <h3>Dashboard Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (!status || !metrics) {
    return (
      <div className={`ateam-dashboard no-data ${className}`}>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className={`ateam-dashboard ${className}`}>
      <div className="dashboard-header">
        <h1>A-TEAM System Dashboard</h1>
        <div className="system-status">
          <span className={`status-indicator ${status.systemHealth}`}>
            {status.systemHealth.toUpperCase()}
          </span>
          <span className="last-activity">
            Last Activity: {formatTimestamp(status.lastActivity)}
          </span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* System Overview */}
        <div className="dashboard-card system-overview">
          <h2>System Overview</h2>
          <div className="metrics-grid">
            <div className="metric">
              <span className="metric-label">Status</span>
              <span className={`metric-value ${status.isProcessing ? 'processing' : 'idle'}`}>
                {status.isProcessing ? 'Processing' : 'Idle'}
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Active Sessions</span>
              <span className="metric-value">{status.activeSessions}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Total Sessions</span>
              <span className="metric-value">{status.totalSessions}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Constitutional Compliance</span>
              <span className={`metric-value ${getComplianceColor(status.constitutionalCompliance)}`}>
                {status.constitutionalCompliance.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="dashboard-card performance-metrics">
          <h2>Performance Metrics</h2>
          <div className="metrics-grid">
            <div className="metric">
              <span className="metric-label">Success Rate</span>
              <span className="metric-value">
                {metrics.totalSessions > 0 
                  ? ((metrics.successfulSessions / metrics.totalSessions) * 100).toFixed(1)
                  : 0}%
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Average Goal Score</span>
              <span className="metric-value">{metrics.averageGoalScore.toFixed(1)}%</span>
            </div>
            <div className="metric">
              <span className="metric-label">Average Confidence</span>
              <span className="metric-value">{metrics.averageConfidenceScore.toFixed(1)}%</span>
            </div>
            <div className="metric">
              <span className="metric-label">Total Operations</span>
              <span className="metric-value">{metrics.totalOperations}</span>
            </div>
          </div>
        </div>

        {/* Agent Status */}
        <div className="dashboard-card agent-status">
          <h2>Agent Status</h2>
          <div className="agents-list">
            {Object.entries(status.agents).map(([agentId, agentStatus]) => (
              <div key={agentId} className="agent-item">
                <div className="agent-info">
                  <span className="agent-name">{formatAgentName(agentId)}</span>
                  <span className={`agent-status ${agentStatus.status}`}>
                    {agentStatus.status.toUpperCase()}
                  </span>
                </div>
                <div className="agent-metrics">
                  <span>Completed: {agentStatus.operationsCompleted}</span>
                  <span>Failed: {agentStatus.operationsFailed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="dashboard-card recent-sessions">
          <h2>Recent Sessions</h2>
          <div className="sessions-list">
            {recentSessions.length > 0 ? (
              recentSessions.map((session) => (
                <div key={session.sessionId} className="session-item">
                  <div className="session-header">
                    <span className="session-id">{session.sessionId}</span>
                    <span className={`session-status ${session.status}`}>
                      {session.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="session-details">
                    <p className="session-request">{session.userRequest}</p>
                    <div className="session-metrics">
                      <span>Goal: {session.goalScore.goalPercentage.toFixed(1)}%</span>
                      <span>Confidence: {session.goalScore.confidencePercentage.toFixed(1)}%</span>
                      <span>Duration: {session.duration}s</span>
                    </div>
                    {session.violations.length > 0 && (
                      <div className="session-violations">
                        <span className="violations-count">
                          {session.violations.length} violations
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-sessions">No recent sessions</p>
            )}
          </div>
        </div>

        {/* Constitutional Compliance */}
        <div className="dashboard-card constitutional-compliance">
          <h2>Constitutional Compliance</h2>
          <div className="compliance-meter">
            <div className="compliance-bar">
              <div 
                className="compliance-fill"
                style={{ width: `${status.constitutionalCompliance}%` }}
              ></div>
            </div>
            <span className="compliance-text">
              {status.constitutionalCompliance.toFixed(1)}% Compliant
            </span>
          </div>
          {status.constitutionalCompliance < 95 && (
            <div className="compliance-warning">
              <p>⚠️ Constitutional compliance below 95%</p>
            </div>
          )}
        </div>

        {/* System Health */}
        <div className="dashboard-card system-health">
          <h2>System Health</h2>
          <div className="health-indicators">
            <div className="health-indicator">
              <span className="indicator-label">Overall Health</span>
              <span className={`indicator-value ${status.systemHealth}`}>
                {status.systemHealth.toUpperCase()}
              </span>
            </div>
            <div className="health-indicator">
              <span className="indicator-label">Initialized</span>
              <span className={`indicator-value ${status.isInitialized ? 'yes' : 'no'}`}>
                {status.isInitialized ? 'YES' : 'NO'}
              </span>
            </div>
            <div className="health-indicator">
              <span className="indicator-label">Processing</span>
              <span className={`indicator-value ${status.isProcessing ? 'yes' : 'no'}`}>
                {status.isProcessing ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="dashboard-details">
          <h2>Detailed Information</h2>
          <div className="details-grid">
            <div className="detail-section">
              <h3>System Configuration</h3>
              <ul>
                <li>Workspace Root: {ateamSystem['config'].workspaceRoot}</li>
                <li>Auto Start: {ateamSystem['config'].autoStart ? 'Enabled' : 'Disabled'}</li>
                <li>Max Concurrent Sessions: {ateamSystem['config'].maxConcurrentSessions}</li>
                <li>Session Timeout: {ateamSystem['config'].sessionTimeout} minutes</li>
              </ul>
            </div>
            <div className="detail-section">
              <h3>Recent Activity</h3>
              <ul>
                {recentSessions.slice(0, 5).map((session) => (
                  <li key={session.sessionId}>
                    {session.userRequest} - {session.status} ({session.duration}s)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function formatAgentName(agentId: string): string {
  return agentId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getComplianceColor(compliance: number): string {
  if (compliance >= 95) return 'excellent';
  if (compliance >= 80) return 'good';
  if (compliance >= 60) return 'warning';
  return 'critical';
}

export default ATEAMDashboard;
