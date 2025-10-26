/**
 * Shared Dummy Data Schema for All Components
 * Provides consistent data structure for charts, dashboards, and other components
 */

export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
  color?: string;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  category?: string;
}

export interface MetricData {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  format: 'number' | 'percentage' | 'currency' | 'duration';
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'table' | 'list';
  data: any;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
}

// Chart Data
export const chartData = {
  // Line Chart Data
  performanceMetrics: [
    { x: 'Jan', y: 120, label: 'Response Time (ms)', color: '#3b82f6' },
    { x: 'Feb', y: 80, label: 'Response Time (ms)', color: '#3b82f6' },
    { x: 'Mar', y: 180, label: 'Response Time (ms)', color: '#3b82f6' },
    { x: 'Apr', y: 150, label: 'Response Time (ms)', color: '#3b82f6' },
    { x: 'May', y: 200, label: 'Response Time (ms)', color: '#3b82f6' },
    { x: 'Jun', y: 120, label: 'Response Time (ms)', color: '#3b82f6' },
    { x: 'Jul', y: 160, label: 'Response Time (ms)', color: '#3b82f6' },
    { x: 'Aug', y: 140, label: 'Response Time (ms)', color: '#3b82f6' },
    { x: 'Sep', y: 110, label: 'Response Time (ms)', color: '#3b82f6' },
    { x: 'Oct', y: 90, label: 'Response Time (ms)', color: '#3b82f6' }
  ],
  
  accuracyMetrics: [
    { x: 'Jan', y: 85, label: 'Accuracy (%)', color: '#10b981' },
    { x: 'Feb', y: 88, label: 'Accuracy (%)', color: '#10b981' },
    { x: 'Mar', y: 82, label: 'Accuracy (%)', color: '#10b981' },
    { x: 'Apr', y: 87, label: 'Accuracy (%)', color: '#10b981' },
    { x: 'May', y: 84, label: 'Accuracy (%)', color: '#10b981' },
    { x: 'Jun', y: 89, label: 'Accuracy (%)', color: '#10b981' },
    { x: 'Jul', y: 86, label: 'Accuracy (%)', color: '#10b981' },
    { x: 'Aug', y: 88, label: 'Accuracy (%)', color: '#10b981' },
    { x: 'Sep', y: 91, label: 'Accuracy (%)', color: '#10b981' },
    { x: 'Oct', y: 93, label: 'Accuracy (%)', color: '#10b981' }
  ],

  // Token Usage Data
  tokenUsage: [
    { x: '00:00', y: 1000, label: 'Input Tokens', color: '#8b5cf6' },
    { x: '04:00', y: 1200, label: 'Input Tokens', color: '#8b5cf6' },
    { x: '08:00', y: 2500, label: 'Input Tokens', color: '#8b5cf6' },
    { x: '12:00', y: 3200, label: 'Input Tokens', color: '#8b5cf6' },
    { x: '16:00', y: 2800, label: 'Input Tokens', color: '#8b5cf6' },
    { x: '20:00', y: 1800, label: 'Input Tokens', color: '#8b5cf6' },
    { x: '24:00', y: 1100, label: 'Input Tokens', color: '#8b5cf6' }
  ],

  outputTokens: [
    { x: '00:00', y: 400, label: 'Output Tokens', color: '#ec4899' },
    { x: '04:00', y: 500, label: 'Output Tokens', color: '#ec4899' },
    { x: '08:00', y: 800, label: 'Output Tokens', color: '#ec4899' },
    { x: '12:00', y: 1200, label: 'Output Tokens', color: '#ec4899' },
    { x: '16:00', y: 1000, label: 'Output Tokens', color: '#ec4899' },
    { x: '20:00', y: 600, label: 'Output Tokens', color: '#ec4899' },
    { x: '24:00', y: 450, label: 'Output Tokens', color: '#ec4899' }
  ],

  costData: [
    { x: '00:00', y: 0.05, label: 'Total Cost ($)', color: '#f59e0b' },
    { x: '04:00', y: 0.06, label: 'Total Cost ($)', color: '#f59e0b' },
    { x: '08:00', y: 0.12, label: 'Total Cost ($)', color: '#f59e0b' },
    { x: '12:00', y: 0.15, label: 'Total Cost ($)', color: '#f59e0b' },
    { x: '16:00', y: 0.13, label: 'Total Cost ($)', color: '#f59e0b' },
    { x: '20:00', y: 0.08, label: 'Total Cost ($)', color: '#f59e0b' },
    { x: '24:00', y: 0.06, label: 'Total Cost ($)', color: '#f59e0b' }
  ],

  // Pie Chart Data
  leadsData: [
    { label: 'Qualified', value: 45, color: '#3b82f6' },
    { label: 'Unqualified', value: 30, color: '#ef4444' },
    { label: 'In Progress', value: 25, color: '#f59e0b' }
  ],

  // Bar Chart Data
  monthlyRevenue: [
    { x: 'Jan', y: 45000, color: '#3b82f6' },
    { x: 'Feb', y: 52000, color: '#3b82f6' },
    { x: 'Mar', y: 48000, color: '#3b82f6' },
    { x: 'Apr', y: 61000, color: '#3b82f6' },
    { x: 'May', y: 55000, color: '#3b82f6' },
    { x: 'Jun', y: 67000, color: '#3b82f6' }
  ],

  // Heatmap Data
  heatmapData: [
    { x: 'Mon', y: 'Morning', value: 65, color: '#10b981' },
    { x: 'Mon', y: 'Afternoon', value: 45, color: '#f59e0b' },
    { x: 'Mon', y: 'Evening', value: 30, color: '#ef4444' },
    { x: 'Tue', y: 'Morning', value: 70, color: '#10b981' },
    { x: 'Tue', y: 'Afternoon', value: 55, color: '#f59e0b' },
    { x: 'Tue', y: 'Evening', value: 40, color: '#ef4444' },
    { x: 'Wed', y: 'Morning', value: 60, color: '#10b981' },
    { x: 'Wed', y: 'Afternoon', value: 50, color: '#f59e0b' },
    { x: 'Wed', y: 'Evening', value: 35, color: '#ef4444' }
  ]
};

// Dashboard Metrics
export const dashboardMetrics: MetricData[] = [
  {
    label: 'Total Users',
    value: 12543,
    change: 12.5,
    trend: 'up',
    format: 'number'
  },
  {
    label: 'Revenue',
    value: 125430,
    change: 8.2,
    trend: 'up',
    format: 'currency'
  },
  {
    label: 'Conversion Rate',
    value: 3.2,
    change: -0.5,
    trend: 'down',
    format: 'percentage'
  },
  {
    label: 'Avg Response Time',
    value: 245,
    change: -15.2,
    trend: 'up',
    format: 'duration'
  }
];

// Table Data
export const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' }
];

// Workflow Data
export const workflowData = [
  { id: 1, name: 'User Registration', status: 'completed', progress: 100 },
  { id: 2, name: 'Email Verification', status: 'completed', progress: 100 },
  { id: 3, name: 'Profile Setup', status: 'in-progress', progress: 75 },
  { id: 4, name: 'Onboarding', status: 'pending', progress: 0 }
];

// Search Data
export const searchData = [
  { id: 1, title: 'Dashboard Components', category: 'UI', relevance: 95 },
  { id: 2, title: 'Chart Library', category: 'Data', relevance: 88 },
  { id: 3, title: 'User Management', category: 'Admin', relevance: 92 },
  { id: 4, title: 'Analytics Tools', category: 'Data', relevance: 85 }
];
