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
  // Comprehensive logging for debugging
  console.log(`🔧 ComponentRenderer called:`, {
    componentId,
    componentName,
    category,
    width,
    height
  });
  // Chart Components
  if (category === 'charts') {
    console.log(`📊 Rendering chart component: ${componentName}`);
    
    // Handle all chart variations with proper matching
    const chartName = componentName.toLowerCase().replace(/[^a-z]/g, '');
    
    if (chartName.includes('pie') || chartName.includes('donut') || chartName.includes('leads')) {
      console.log(`🥧 Rendering PieChart for: ${componentName}`);
      return <PieChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    if (chartName.includes('bar') || chartName.includes('waterfall')) {
      console.log(`📊 Rendering BarChart for: ${componentName}`);
      return <BarChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    if (chartName.includes('heatmap') || chartName.includes('correlation')) {
      console.log(`🔥 Rendering HeatmapChart for: ${componentName}`);
      return <HeatmapChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Line Charts - only for actual line charts
    if (chartName.includes('line') && !chartName.includes('pie') && !chartName.includes('bar') && !chartName.includes('heatmap')) {
      console.log(`📈 Rendering LineChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Gauge Charts - special handling
    if (chartName.includes('gauge')) {
      console.log(`🎯 Rendering GaugeChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Radar Charts
    if (chartName.includes('radar')) {
      console.log(`📡 Rendering RadarChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Scatter Plots
    if (chartName.includes('scatter')) {
      console.log(`🔵 Rendering ScatterPlot for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Area Charts
    if (chartName.includes('area')) {
      console.log(`📈 Rendering AreaChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Bubble Charts
    if (chartName.includes('bubble')) {
      console.log(`🫧 Rendering BubbleChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Candlestick Charts
    if (chartName.includes('candlestick')) {
      console.log(`🕯️ Rendering CandlestickChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Funnel Charts
    if (chartName.includes('funnel')) {
      console.log(`🔻 Rendering FunnelChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Histogram Charts
    if (chartName.includes('histogram')) {
      console.log(`📊 Rendering HistogramChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Polar Charts
    if (chartName.includes('polar')) {
      console.log(`🧭 Rendering PolarChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Treemap Charts
    if (chartName.includes('treemap')) {
      console.log(`🌳 Rendering TreemapChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Sunburst Charts
    if (chartName.includes('sunburst')) {
      console.log(`☀️ Rendering SunburstChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Sankey Diagrams
    if (chartName.includes('sankey')) {
      console.log(`🌊 Rendering SankeyDiagram for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Confusion Matrix
    if (chartName.includes('confusion') || chartName.includes('matrix')) {
      console.log(`🔢 Rendering ConfusionMatrixChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Bloom Graph
    if (chartName.includes('bloom') || chartName.includes('graph')) {
      console.log(`🌸 Rendering BloomGraphChart for: ${componentName}`);
      return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
    }
    
    // Default to line chart for unknown chart types
    console.log(`📈 Rendering default LineChart for: ${componentName}`);
    return <LineChart title={`${componentName} Chart`} width={width} height={height} />;
  }

  // Dashboard Components
  if (category === 'dashboard') {
    console.log(`🏠 Rendering dashboard component: ${componentName}`);
    
    const dashboardName = componentName.toLowerCase().replace(/[^a-z]/g, '');
    
    if (dashboardName.includes('metric') || dashboardName.includes('overview')) {
      console.log(`📊 Rendering metrics overview for: ${componentName}`);
      return (
        <div className="grid grid-cols-2 gap-4">
          {dashboardMetrics.slice(0, 4).map((metric, index) => (
            <MetricCard key={index} data={metric} />
          ))}
        </div>
      );
    }
    
    if (dashboardName.includes('data') || dashboardName.includes('table')) {
      console.log(`📋 Rendering data table for: ${componentName}`);
      return <DataTable title={`${componentName} Data`} />;
    }
    
    if (dashboardName.includes('kpi') || dashboardName.includes('performance')) {
      console.log(`📈 Rendering KPI dashboard for: ${componentName}`);
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {dashboardMetrics.slice(0, 2).map((metric, index) => (
              <MetricCard key={index} data={metric} />
            ))}
          </div>
          <LineChart title={`${componentName} Trends`} width={width} height={height} />
        </div>
      );
    }
    
    if (dashboardName.includes('realtime') || dashboardName.includes('realtime')) {
      console.log(`⚡ Rendering realtime dashboard for: ${componentName}`);
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
    }
    
    if (dashboardName.includes('status') || dashboardName.includes('system')) {
      console.log(`🔍 Rendering status dashboard for: ${componentName}`);
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
    }
    
    if (dashboardName.includes('workflow') || dashboardName.includes('process')) {
      console.log(`🔄 Rendering workflow dashboard for: ${componentName}`);
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
    }
    
    // Default dashboard
    console.log(`🏠 Rendering default dashboard for: ${componentName}`);
    return (
      <div className="space-y-4">
        <MetricCard data={dashboardMetrics[0]} />
        <LineChart title={`${componentName} Dashboard`} width={width} height={height} />
      </div>
    );
  }

  // UI Components - Comprehensive interactive examples
  if (category === 'ui') {
    console.log(`🎨 Rendering UI component: ${componentName}`);
    
    const uiName = componentName.toLowerCase().replace(/[^a-z]/g, '');
    
    if (uiName.includes('button')) {
      console.log(`🔘 Rendering Button for: ${componentName}`);
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
    }
    
    if (uiName.includes('card')) {
      console.log(`🃏 Rendering Card for: ${componentName}`);
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Card Title</h3>
          <p className="text-gray-600 dark:text-gray-400">This is a sample card component with some content.</p>
        </div>
      );
    }
    
    if (uiName.includes('input') || uiName.includes('textfield')) {
      console.log(`📝 Rendering Input for: ${componentName}`);
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
    }
    
    if (uiName.includes('progress') || uiName.includes('bar')) {
      console.log(`📊 Rendering Progress for: ${componentName}`);
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
    }
    
    if (uiName.includes('badge') || uiName.includes('tag')) {
      console.log(`🏷️ Rendering Badge for: ${componentName}`);
      return (
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Primary</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Success</span>
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Error</span>
        </div>
      );
    }
    
    if (uiName.includes('switch') || uiName.includes('toggle')) {
      console.log(`🔀 Rendering Switch for: ${componentName}`);
      return (
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="sr-only" />
            <div className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
            </div>
            <span className="text-sm">Toggle Switch</span>
          </label>
        </div>
      );
    }
    
    if (uiName.includes('slider') || uiName.includes('range')) {
      console.log(`🎚️ Rendering Slider for: ${componentName}`);
      return (
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="100" 
            defaultValue="50"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center text-sm text-gray-600">Value: 50</div>
        </div>
      );
    }
    
    if (uiName.includes('tabs') || uiName.includes('tab')) {
      console.log(`📑 Rendering Tabs for: ${componentName}`);
      return (
        <div className="space-y-4">
          <div className="flex border-b border-gray-200">
            <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">Tab 1</button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Tab 2</button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Tab 3</button>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <p className="text-gray-700">Tab content goes here</p>
          </div>
        </div>
      );
    }
    
    if (uiName.includes('accordion') || uiName.includes('collapse')) {
      console.log(`📋 Rendering Accordion for: ${componentName}`);
      return (
        <div className="space-y-2">
          <div className="border border-gray-200 rounded">
            <button className="w-full px-4 py-2 text-left bg-gray-50 hover:bg-gray-100">
              Accordion Item 1
            </button>
            <div className="px-4 py-2 text-sm text-gray-600">
              Accordion content goes here
            </div>
          </div>
        </div>
      );
    }
    
    if (uiName.includes('breadcrumb') || uiName.includes('bread')) {
      console.log(`🍞 Rendering Breadcrumb for: ${componentName}`);
      return (
        <nav className="flex space-x-2 text-sm">
          <a href="#" className="text-blue-600 hover:underline">Home</a>
          <span className="text-gray-400">/</span>
          <a href="#" className="text-blue-600 hover:underline">Category</a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Current Page</span>
        </nav>
      );
    }
    
    if (uiName.includes('pagination') || uiName.includes('page')) {
      console.log(`📄 Rendering Pagination for: ${componentName}`);
      return (
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
        </div>
      );
    }
    
    if (uiName.includes('stepper') || uiName.includes('step')) {
      console.log(`👣 Rendering Stepper for: ${componentName}`);
      return (
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">1</div>
            <span className="ml-2 text-sm">Step 1</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">2</div>
            <span className="ml-2 text-sm text-gray-600">Step 2</span>
          </div>
        </div>
      );
    }
    
    if (uiName.includes('table') || uiName.includes('grid')) {
      console.log(`📊 Rendering Table for: ${componentName}`);
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-sm">Item 1</td>
                <td className="px-4 py-2 text-sm"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span></td>
                <td className="px-4 py-2 text-sm"><button className="text-blue-600 hover:underline">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    
    if (uiName.includes('list') || uiName.includes('item')) {
      console.log(`📝 Rendering List for: ${componentName}`);
      return (
        <div className="space-y-2">
          <div className="flex items-center p-2 bg-gray-50 rounded">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-sm">List Item 1</span>
          </div>
          <div className="flex items-center p-2 bg-gray-50 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm">List Item 2</span>
          </div>
          <div className="flex items-center p-2 bg-gray-50 rounded">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-sm">List Item 3</span>
          </div>
        </div>
      );
    }
    
    if (uiName.includes('tree') || uiName.includes('hierarchical')) {
      console.log(`🌳 Rendering Tree for: ${componentName}`);
      return (
        <div className="space-y-1">
          <div className="flex items-center">
            <span className="mr-2">📁</span>
            <span className="text-sm">Root Node</span>
          </div>
          <div className="ml-4 space-y-1">
            <div className="flex items-center">
              <span className="mr-2">📄</span>
              <span className="text-sm">Child 1</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📄</span>
              <span className="text-sm">Child 2</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (uiName.includes('calendar') || uiName.includes('date')) {
      console.log(`📅 Rendering Calendar for: ${componentName}`);
      return (
        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="text-center text-sm font-medium mb-2">January 2025</div>
          <div className="grid grid-cols-7 gap-1 text-xs">
            <div className="text-center py-1 text-gray-500">S</div>
            <div className="text-center py-1 text-gray-500">M</div>
            <div className="text-center py-1 text-gray-500">T</div>
            <div className="text-center py-1 text-gray-500">W</div>
            <div className="text-center py-1 text-gray-500">T</div>
            <div className="text-center py-1 text-gray-500">F</div>
            <div className="text-center py-1 text-gray-500">S</div>
            <div className="text-center py-1">1</div>
            <div className="text-center py-1">2</div>
            <div className="text-center py-1">3</div>
            <div className="text-center py-1">4</div>
            <div className="text-center py-1">5</div>
            <div className="text-center py-1">6</div>
            <div className="text-center py-1">7</div>
          </div>
        </div>
      );
    }
    
    // Default UI component
    console.log(`🎨 Rendering default UI component for: ${componentName}`);
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{componentName}</h3>
        <p className="text-gray-600 dark:text-gray-400">Interactive {componentName} component</p>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Sample Action
          </button>
        </div>
      </div>
    );
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
