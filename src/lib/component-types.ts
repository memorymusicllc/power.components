/**
 * Generated Component Types
 * Auto-generated from component discovery
 * 
 * @version 1.0.0
 * @date 2025-10-25
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

export const componentData: ComponentData = {
  "components": [
    {
      "id": "airesponsesystem",
      "name": "AIResponseSystem",
      "category": "dashboard",
      "description": "AIResponseSystem component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "airesponsesystem-v3",
      "name": "AIResponseSystem.v3",
      "category": "dashboard",
      "description": "AIResponseSystem.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "adminpanel",
      "name": "AdminPanel",
      "category": "dashboard",
      "description": "AdminPanel component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "adminpanel-v3",
      "name": "AdminPanel.v3",
      "category": "dashboard",
      "description": "AdminPanel.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "analyticsdashboard",
      "name": "AnalyticsDashboard",
      "category": "dashboard",
      "description": "AnalyticsDashboard component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "analyticsdashboard-v3",
      "name": "AnalyticsDashboard.v3",
      "category": "dashboard",
      "description": "AnalyticsDashboard.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "autopostingengine",
      "name": "AutoPostingEngine",
      "category": "dashboard",
      "description": "AutoPostingEngine component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "autopostingengine-v3",
      "name": "AutoPostingEngine.v3",
      "category": "dashboard",
      "description": "AutoPostingEngine.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "automationengine",
      "name": "AutomationEngine",
      "category": "dashboard",
      "description": "AutomationEngine component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "automationengine-v3",
      "name": "AutomationEngine.v3",
      "category": "dashboard",
      "description": "AutomationEngine.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "contentgenerator",
      "name": "ContentGenerator",
      "category": "dashboard",
      "description": "ContentGenerator component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "contentgenerator-v3",
      "name": "ContentGenerator.v3",
      "category": "dashboard",
      "description": "ContentGenerator.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "itemdetailscollector",
      "name": "ItemDetailsCollector",
      "category": "dashboard",
      "description": "ItemDetailsCollector component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "itemdetailscollector-v3",
      "name": "ItemDetailsCollector.v3",
      "category": "dashboard",
      "description": "ItemDetailsCollector.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "llmswitcher",
      "name": "LLMSwitcher",
      "category": "dashboard",
      "description": "LLMSwitcher component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "llmswitcher-v3",
      "name": "LLMSwitcher.v3",
      "category": "dashboard",
      "description": "LLMSwitcher.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "leadmonitor",
      "name": "LeadMonitor",
      "category": "dashboard",
      "description": "LeadMonitor component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "leadmonitor-v3",
      "name": "LeadMonitor.v3",
      "category": "dashboard",
      "description": "LeadMonitor.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "messagecenter",
      "name": "MessageCenter",
      "category": "dashboard",
      "description": "MessageCenter component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "messagecenter-v3",
      "name": "MessageCenter.v3",
      "category": "dashboard",
      "description": "MessageCenter.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "negotiationmanager",
      "name": "NegotiationManager",
      "category": "dashboard",
      "description": "NegotiationManager component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "negotiationmanager-v3",
      "name": "NegotiationManager.v3",
      "category": "dashboard",
      "description": "NegotiationManager.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "photoprocessor",
      "name": "PhotoProcessor",
      "category": "dashboard",
      "description": "PhotoProcessor component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "photoprocessor-v3",
      "name": "PhotoProcessor.v3",
      "category": "dashboard",
      "description": "PhotoProcessor.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "platformselector",
      "name": "PlatformSelector",
      "category": "dashboard",
      "description": "PlatformSelector component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "platformselector-v3",
      "name": "PlatformSelector.v3",
      "category": "dashboard",
      "description": "PlatformSelector.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "postingstrategy",
      "name": "PostingStrategy",
      "category": "dashboard",
      "description": "PostingStrategy component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "postingstrategy-v3",
      "name": "PostingStrategy.v3",
      "category": "dashboard",
      "description": "PostingStrategy.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "priceresearcher",
      "name": "PriceResearcher",
      "category": "dashboard",
      "description": "PriceResearcher component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "priceresearcher-v3",
      "name": "PriceResearcher.v3",
      "category": "dashboard",
      "description": "PriceResearcher.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "prompttemplatesmanager",
      "name": "PromptTemplatesManager",
      "category": "dashboard",
      "description": "PromptTemplatesManager component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "prompttemplatesmanager-v3",
      "name": "PromptTemplatesManager.v3",
      "category": "dashboard",
      "description": "PromptTemplatesManager.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "responsetemplatesmanager",
      "name": "ResponseTemplatesManager",
      "category": "dashboard",
      "description": "ResponseTemplatesManager component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "responsetemplatesmanager-v3",
      "name": "ResponseTemplatesManager.v3",
      "category": "dashboard",
      "description": "ResponseTemplatesManager.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "saleprocessor",
      "name": "SaleProcessor",
      "category": "dashboard",
      "description": "SaleProcessor component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "saleprocessor-v3",
      "name": "SaleProcessor.v3",
      "category": "dashboard",
      "description": "SaleProcessor.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "usermanager",
      "name": "UserManager",
      "category": "dashboard",
      "description": "UserManager component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "usermanager-v3",
      "name": "UserManager.v3",
      "category": "dashboard",
      "description": "UserManager.v3 component",
      "tags": [
        "dashboard",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "colorchart-v3",
      "name": "ColorChart.v3",
      "category": "charts",
      "description": "ColorChart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "llmperformancechart-v3",
      "name": "LLMPerformanceChart.v3",
      "category": "charts",
      "description": "LLMPerformanceChart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "bloom-graph-chart",
      "name": "bloom-graph-chart",
      "category": "charts",
      "description": "bloom-graph-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "bloom-graph-chart-v3",
      "name": "bloom-graph-chart.v3",
      "category": "charts",
      "description": "bloom-graph-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "confusion-matrix-chart",
      "name": "confusion-matrix-chart",
      "category": "charts",
      "description": "confusion-matrix-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "confusion-matrix-chart-v3",
      "name": "confusion-matrix-chart.v3",
      "category": "charts",
      "description": "confusion-matrix-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "cost-analysis-chart",
      "name": "cost-analysis-chart",
      "category": "charts",
      "description": "cost-analysis-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "cost-analysis-chart-v3",
      "name": "cost-analysis-chart.v3",
      "category": "charts",
      "description": "cost-analysis-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "error-rate-chart",
      "name": "error-rate-chart",
      "category": "charts",
      "description": "error-rate-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "error-rate-chart-v3",
      "name": "error-rate-chart.v3",
      "category": "charts",
      "description": "error-rate-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "gantt-chart",
      "name": "gantt-chart",
      "category": "charts",
      "description": "gantt-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "gantt-chart-v3",
      "name": "gantt-chart.v3",
      "category": "charts",
      "description": "gantt-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "heatmap-chart",
      "name": "heatmap-chart",
      "category": "charts",
      "description": "heatmap-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "heatmap-chart-v3",
      "name": "heatmap-chart.v3",
      "category": "charts",
      "description": "heatmap-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "latency-distribution-chart",
      "name": "latency-distribution-chart",
      "category": "charts",
      "description": "latency-distribution-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "latency-distribution-chart-v3",
      "name": "latency-distribution-chart.v3",
      "category": "charts",
      "description": "latency-distribution-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "leads-chart",
      "name": "leads-chart",
      "category": "charts",
      "description": "leads-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "leads-chart-v3",
      "name": "leads-chart.v3",
      "category": "charts",
      "description": "leads-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "llm-performance-chart",
      "name": "llm-performance-chart",
      "category": "charts",
      "description": "llm-performance-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "llm-performance-chart-v3",
      "name": "llm-performance-chart.v3",
      "category": "charts",
      "description": "llm-performance-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "model-comparison-chart",
      "name": "model-comparison-chart",
      "category": "charts",
      "description": "model-comparison-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "model-comparison-chart-v3",
      "name": "model-comparison-chart.v3",
      "category": "charts",
      "description": "model-comparison-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "network-graph-chart",
      "name": "network-graph-chart",
      "category": "charts",
      "description": "network-graph-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "network-graph-chart-v3",
      "name": "network-graph-chart.v3",
      "category": "charts",
      "description": "network-graph-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "price-chart",
      "name": "price-chart",
      "category": "charts",
      "description": "price-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "price-chart-v3",
      "name": "price-chart.v3",
      "category": "charts",
      "description": "price-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "quadrant-leader-chart",
      "name": "quadrant-leader-chart",
      "category": "charts",
      "description": "quadrant-leader-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "quadrant-leader-chart-v3",
      "name": "quadrant-leader-chart.v3",
      "category": "charts",
      "description": "quadrant-leader-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "quality-metrics-chart",
      "name": "quality-metrics-chart",
      "category": "charts",
      "description": "quality-metrics-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "quality-metrics-chart-v3",
      "name": "quality-metrics-chart.v3",
      "category": "charts",
      "description": "quality-metrics-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "request-volume-chart",
      "name": "request-volume-chart",
      "category": "charts",
      "description": "request-volume-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "request-volume-chart-v3",
      "name": "request-volume-chart.v3",
      "category": "charts",
      "description": "request-volume-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "roc-curve-chart",
      "name": "roc-curve-chart",
      "category": "charts",
      "description": "roc-curve-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "roc-curve-chart-v3",
      "name": "roc-curve-chart.v3",
      "category": "charts",
      "description": "roc-curve-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "sankey-diagram-chart",
      "name": "sankey-diagram-chart",
      "category": "charts",
      "description": "sankey-diagram-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "sankey-diagram-chart-v3",
      "name": "sankey-diagram-chart.v3",
      "category": "charts",
      "description": "sankey-diagram-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "scatter-plot-chart",
      "name": "scatter-plot-chart",
      "category": "charts",
      "description": "scatter-plot-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "scatter-plot-chart-v3",
      "name": "scatter-plot-chart.v3",
      "category": "charts",
      "description": "scatter-plot-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "timeline-chart",
      "name": "timeline-chart",
      "category": "charts",
      "description": "timeline-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "timeline-chart-v3",
      "name": "timeline-chart.v3",
      "category": "charts",
      "description": "timeline-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "token-usage-chart",
      "name": "token-usage-chart",
      "category": "charts",
      "description": "token-usage-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "token-usage-chart-v3",
      "name": "token-usage-chart.v3",
      "category": "charts",
      "description": "token-usage-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "usage-patterns-chart",
      "name": "usage-patterns-chart",
      "category": "charts",
      "description": "usage-patterns-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "usage-patterns-chart-v3",
      "name": "usage-patterns-chart.v3",
      "category": "charts",
      "description": "usage-patterns-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "word-cloud-chart",
      "name": "word-cloud-chart",
      "category": "charts",
      "description": "word-cloud-chart component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "word-cloud-chart-v3",
      "name": "word-cloud-chart.v3",
      "category": "charts",
      "description": "word-cloud-chart.v3 component",
      "tags": [
        "charts",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "filterchips",
      "name": "FilterChips",
      "category": "search",
      "description": "FilterChips component",
      "tags": [
        "search",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "filterchips-v3",
      "name": "FilterChips.v3",
      "category": "search",
      "description": "FilterChips.v3 component",
      "tags": [
        "search",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "logicoperators",
      "name": "LogicOperators",
      "category": "search",
      "description": "LogicOperators component",
      "tags": [
        "search",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "logicoperators-v3",
      "name": "LogicOperators.v3",
      "category": "search",
      "description": "LogicOperators.v3 component",
      "tags": [
        "search",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "search3d",
      "name": "Search3D",
      "category": "search",
      "description": "Search3D component",
      "tags": [
        "search",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "search3d-v3",
      "name": "Search3D.v3",
      "category": "search",
      "description": "Search3D.v3 component",
      "tags": [
        "search",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "searchintegration",
      "name": "SearchIntegration",
      "category": "search",
      "description": "SearchIntegration component",
      "tags": [
        "search",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "searchintegration-v3",
      "name": "SearchIntegration.v3",
      "category": "search",
      "description": "SearchIntegration.v3 component",
      "tags": [
        "search",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "universalsearch",
      "name": "UniversalSearch",
      "category": "search",
      "description": "UniversalSearch component",
      "tags": [
        "search",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "universalsearch-v3",
      "name": "UniversalSearch.v3",
      "category": "search",
      "description": "UniversalSearch.v3 component",
      "tags": [
        "search",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "dropdown-v3",
      "name": "Dropdown.v3",
      "category": "ui",
      "description": "Dropdown.v3 component",
      "tags": [
        "ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "badge",
      "name": "Badge",
      "category": "redux-ui",
      "description": "Badge component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "badge-v3",
      "name": "Badge.v3",
      "category": "redux-ui",
      "description": "Badge.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "button-phoenix",
      "name": "Button.phoenix",
      "category": "redux-ui",
      "description": "Button.phoenix component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "button",
      "name": "Button",
      "category": "redux-ui",
      "description": "Button component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "button-v3",
      "name": "Button.v3",
      "category": "redux-ui",
      "description": "Button.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "card",
      "name": "Card",
      "category": "redux-ui",
      "description": "Card component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "card-v3",
      "name": "Card.v3",
      "category": "redux-ui",
      "description": "Card.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "codeeditor",
      "name": "CodeEditor",
      "category": "redux-ui",
      "description": "CodeEditor component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "codeeditor-v3",
      "name": "CodeEditor.v3",
      "category": "redux-ui",
      "description": "CodeEditor.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "connectionstatus",
      "name": "ConnectionStatus",
      "category": "redux-ui",
      "description": "ConnectionStatus component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "connectionstatus-v3",
      "name": "ConnectionStatus.v3",
      "category": "redux-ui",
      "description": "ConnectionStatus.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "dashboardcard",
      "name": "DashboardCard",
      "category": "redux-ui",
      "description": "DashboardCard component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "dashboardcard-v3",
      "name": "DashboardCard.v3",
      "category": "redux-ui",
      "description": "DashboardCard.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "input",
      "name": "Input",
      "category": "redux-ui",
      "description": "Input component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "input-v3",
      "name": "Input.v3",
      "category": "redux-ui",
      "description": "Input.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "progress",
      "name": "Progress",
      "category": "redux-ui",
      "description": "Progress component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "progress-v3",
      "name": "Progress.v3",
      "category": "redux-ui",
      "description": "Progress.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "responsivegrid",
      "name": "ResponsiveGrid",
      "category": "redux-ui",
      "description": "ResponsiveGrid component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "responsivegrid-v3",
      "name": "ResponsiveGrid.v3",
      "category": "redux-ui",
      "description": "ResponsiveGrid.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "select",
      "name": "Select",
      "category": "redux-ui",
      "description": "Select component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "select-v3",
      "name": "Select.v3",
      "category": "redux-ui",
      "description": "Select.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "separator",
      "name": "Separator",
      "category": "redux-ui",
      "description": "Separator component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "separator-v3",
      "name": "Separator.v3",
      "category": "redux-ui",
      "description": "Separator.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "tabs",
      "name": "Tabs",
      "category": "redux-ui",
      "description": "Tabs component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "tabs-v3",
      "name": "Tabs.v3",
      "category": "redux-ui",
      "description": "Tabs.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "uielementsfilter",
      "name": "UIElementsFilter",
      "category": "redux-ui",
      "description": "UIElementsFilter component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "3.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "uielementsfilter-v3",
      "name": "UIElementsFilter.v3",
      "category": "redux-ui",
      "description": "UIElementsFilter.v3 component",
      "tags": [
        "redux-ui",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "legacyshowcase",
      "name": "LegacyShowcase",
      "category": "legacy",
      "description": "LegacyShowcase component",
      "tags": [
        "legacy",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "simplebadge",
      "name": "SimpleBadge",
      "category": "legacy",
      "description": "SimpleBadge component",
      "tags": [
        "legacy",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "simplebutton",
      "name": "SimpleButton",
      "category": "legacy",
      "description": "SimpleButton component",
      "tags": [
        "legacy",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "simplecard",
      "name": "SimpleCard",
      "category": "legacy",
      "description": "SimpleCard component",
      "tags": [
        "legacy",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "simpleinput",
      "name": "SimpleInput",
      "category": "legacy",
      "description": "SimpleInput component",
      "tags": [
        "legacy",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "simpleprogress",
      "name": "SimpleProgress",
      "category": "legacy",
      "description": "SimpleProgress component",
      "tags": [
        "legacy",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    },
    {
      "id": "universalcomponentcontainer-v3",
      "name": "UniversalComponentContainer.v3",
      "category": "universal",
      "description": "UniversalComponentContainer.v3 component",
      "tags": [
        "universal",
        "component"
      ],
      "version": "1.0.0",
      "status": "active",
      "health": "healthy"
    }
  ],
  "categories": {
    "dashboard": {
      "name": "Dashboard",
      "icon": "Monitor",
      "count": 38,
      "color": "blue"
    },
    "charts": {
      "name": "Charts",
      "icon": "BarChart3",
      "count": 46,
      "color": "green"
    },
    "workflows": {
      "name": "Workflows",
      "icon": "Settings",
      "count": 0,
      "color": "purple"
    },
    "search": {
      "name": "Search",
      "icon": "Search",
      "count": 10,
      "color": "orange"
    },
    "ui": {
      "name": "UI Components",
      "icon": "Layers",
      "count": 1,
      "color": "gray"
    },
    "redux-ui": {
      "name": "Redux UI",
      "icon": "Zap",
      "count": 27,
      "color": "red"
    },
    "pow3r": {
      "name": "Pow3r",
      "icon": "Shield",
      "count": 0,
      "color": "indigo"
    },
    "features": {
      "name": "Features",
      "icon": "Activity",
      "count": 0,
      "color": "pink"
    },
    "legacy": {
      "name": "Legacy",
      "icon": "Archive",
      "count": 6,
      "color": "yellow"
    },
    "universal": {
      "name": "Universal",
      "icon": "Globe",
      "count": 1,
      "color": "cyan"
    }
  },
  "totalCount": 129,
  "generatedAt": "2025-10-25T18:08:16.238Z"
};
