import React from 'react';
import LineChart from './charts/LineChart';
import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';
import HeatmapChart from './charts/HeatmapChart';
import MetricCard from './dashboard/MetricCard';
import DataTable from './dashboard/DataTable';
import { chartData, dashboardMetrics } from '../lib/dummy-data';

interface ComponentRendererProps {
  componentId: string;
  componentName: string;
  category: string;
  width?: number;
  height?: number;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ 
  componentId, 
  componentName, 
  category,
  width = 300,
  height = 200
}) => {
  // Chart Components
  if (category === 'charts') {
    switch (componentName.toLowerCase()) {
      case 'linechart':
        return <LineChart title="Performance Metrics" width={width} height={height} />;
      case 'piechart':
        return <PieChart title="Leads Distribution" width={width} height={height} />;
      case 'barchart':
        return <BarChart title="Monthly Revenue" width={width} height={height} />;
      case 'heatmapchart':
        return <HeatmapChart title="Activity Heatmap" width={width} height={height} />;
      case 'leads-chart':
        return <PieChart title="Leads Distribution" width={width} height={height} />;
      case 'donut-chart':
        return <PieChart title="Donut Chart" width={width} height={height} />;
      case 'gauge-chart':
        return <LineChart title="Gauge Chart" width={width} height={height} />;
      case 'waterfall-chart':
        return <BarChart title="Waterfall Chart" width={width} height={height} />;
      case 'sparkline-chart':
        return <LineChart title="Sparkline" width={width} height={height} />;
      default:
        return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
  }

  // Dashboard Components
  if (category === 'dashboard') {
    switch (componentName.toLowerCase()) {
      case 'metricscard':
      case 'metrics-overview':
        return (
          <div className="grid grid-cols-2 gap-4">
            {dashboardMetrics.slice(0, 4).map((metric, index) => (
              <MetricCard key={index} data={metric} />
            ))}
          </div>
        );
      case 'datatable':
      case 'data-visualization':
        return <DataTable title="Data Visualization" />;
      case 'kpidashboard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {dashboardMetrics.slice(0, 2).map((metric, index) => (
                <MetricCard key={index} data={metric} />
              ))}
            </div>
            <LineChart title="KPI Trends" width={width} height={height} />
          </div>
        );
      case 'performancemonitor':
        return (
          <div className="space-y-4">
            <MetricCard data={dashboardMetrics[3]} />
            <LineChart title="Performance Metrics" width={width} height={height} />
          </div>
        );
      case 'realtimedashboard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {dashboardMetrics.map((metric, index) => (
                <MetricCard key={index} data={metric} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <LineChart title="Real-time Metrics" width={width} height={height} />
              <PieChart title="Status Distribution" width={width} height={height} />
            </div>
          </div>
        );
      case 'statusdashboard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {dashboardMetrics.slice(0, 2).map((metric, index) => (
                <MetricCard key={index} data={metric} />
              ))}
            </div>
            <HeatmapChart title="System Status" width={width} height={height} />
          </div>
        );
      case 'userdashboard':
        return (
          <div className="space-y-4">
            <MetricCard data={dashboardMetrics[0]} />
            <DataTable title="User Activity" />
          </div>
        );
      case 'workflowdashboard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {dashboardMetrics.slice(0, 2).map((metric, index) => (
                <MetricCard key={index} data={metric} />
              ))}
            </div>
            <BarChart title="Workflow Metrics" width={width} height={height} />
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <MetricCard data={dashboardMetrics[0]} />
            <LineChart title={`${componentName} Dashboard`} width={width} height={height} />
          </div>
        );
    }
  }

  // UI Components - Simple interactive examples
  if (category === 'ui') {
    switch (componentName.toLowerCase()) {
      case 'button':
        return (
          <div className="space-y-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Primary Button
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
              Secondary Button
            </button>
          </div>
        );
      case 'card':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Card Title</h3>
            <p className="text-gray-600 dark:text-gray-400">This is a sample card component with some content.</p>
          </div>
        );
      case 'input':
        return (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Enter text..." 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="email" 
              placeholder="Enter email..." 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      case 'progress':
        return (
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        );
      case 'badge':
        return (
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Primary</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Success</span>
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Error</span>
          </div>
        );
      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{componentName}</h3>
            <p className="text-gray-600 dark:text-gray-400">Interactive {componentName} component</p>
          </div>
        );
    }
  }

  // Default fallback
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{componentName}</h3>
      <p className="text-gray-600 dark:text-gray-400">Interactive {componentName} component</p>
    </div>
  );
};

export default ComponentRenderer;
