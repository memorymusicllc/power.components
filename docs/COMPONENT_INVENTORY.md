# Component Inventory

Complete listing of all components in the pow3r.cashout application.

**Total Components:** 139 files

---

## Dashboard Components

| Name | Description | ID | Version | Tags | Phase | Date Modified | Dependencies | Props | Usage | Path |
|------|-------------|----|---------|----- |-------|---------------|--------------|-------|-------|------|
| AdminPanel | System administration and oversight | admin-panel | v1.0.0 | admin, management, system, oversight | Core | 2025-10-08 | Card, Button, Badge, Switch, Select, lucide-react | onAdminAction?, loading? | Admin dashboard widget | src/components/dashboard/AdminPanel.tsx |
| AIResponseSystem | AI-powered auto-responses and template management | ai-response-system | v2.0.0 | ai, automation, responses, templates | Phase2 | 2025-10-10 | useAIResponseStore, Card, Button, Badge, Progress, Tabs | - | Phase 2 AI Response management | src/components/dashboard/AIResponseSystem.tsx |
| AnalyticsDashboard | Analytics and metrics dashboard | analytics-dashboard | v1.0.0 | analytics, metrics, reporting | Phase2 | 2025-01-08 | Card, Chart components, Badge | - | Analytics overview | src/components/dashboard/AnalyticsDashboard.tsx |
| AutomationEngine | Task automation and scheduling engine | automation-engine | v1.0.0 | automation, scheduling, workflow | Core | 2025-10-10 | Card, Button, Switch | - | Automation configuration | src/components/dashboard/AutomationEngine.tsx |
| AutoPostingEngine | Automated posting across platforms | auto-posting-engine | v1.0.0 | posting, automation, platforms | Phase2 | 2025-01-08 | Card, Button, Select | - | Auto-posting management | src/components/dashboard/AutoPostingEngine.tsx |
| ContentGenerator | AI content generation for posts | content-generator | v1.0.0 | ai, content, generation | Phase2 | 2025-01-08 | Card, Button, Textarea | - | Content creation tool | src/components/dashboard/ContentGenerator.tsx |
| ItemDetailsCollector | Collect and manage item information | item-collector | v1.0.0 | items, data-collection | Phase1 | 2025-01-08 | Card, Input, Button | - | Item data entry | src/components/dashboard/ItemDetailsCollector.tsx |
| LeadMonitor | Monitor and track leads | lead-monitor | v1.0.0 | leads, monitoring, tracking | Phase2 | 2025-10-10 | Card, Badge, Button | - | Lead tracking dashboard | src/components/dashboard/LeadMonitor.tsx |
| LLMSwitcher | Switch between AI language models | llm-switcher | v1.0.0 | ai, llm, configuration | Phase2 | 2025-01-08 | Card, Select, Button | - | AI model selector | src/components/dashboard/LLMSwitcher.tsx |
| MessageCenter | Central message hub | message-center | v1.0.0 | messaging, communication | Phase2 | 2025-01-08 | Card, Badge, ScrollArea | - | Message management | src/components/dashboard/MessageCenter.tsx |
| NegotiationManager | Manage price negotiations | negotiation-manager | v1.0.0 | negotiation, pricing, deals | Phase2 | 2025-01-08 | Card, Button, Badge | - | Negotiation workflow | src/components/dashboard/NegotiationManager.tsx |
| PhotoProcessor | Process and optimize images | photo-processor | v1.0.0 | images, processing, optimization | Phase1 | 2025-01-08 | Card, Button | - | Image processing | src/components/dashboard/PhotoProcessor.tsx |
| PlatformSelector | Select posting platforms | platform-selector | v1.0.0 | platforms, selection | Phase1 | 2025-01-08 | Card, Checkbox | platforms | Platform picker | src/components/dashboard/PlatformSelector.tsx |
| PostingStrategy | Configure posting strategies | posting-strategy | v1.0.0 | strategy, posting, scheduling | Phase2 | 2025-01-08 | Card, Select, Input | - | Strategy configuration | src/components/dashboard/PostingStrategy.tsx |
| PriceResearcher | Research market pricing | price-researcher | v1.0.0 | pricing, research, market | Phase1 | 2025-01-08 | Card, Button, Badge | - | Price analysis | src/components/dashboard/PriceResearcher.tsx |
| PromptTemplatesManager | Manage AI prompt templates | prompt-templates | v1.0.0 | ai, prompts, templates | Phase2 | 2025-01-08 | Card, Button, Textarea | - | Prompt management | src/components/dashboard/PromptTemplatesManager.tsx |
| ResponseTemplatesManager | Manage response templates | response-templates | v1.0.0 | responses, templates | Phase2 | 2025-01-08 | Card, Button, Input | - | Template management | src/components/dashboard/ResponseTemplatesManager.tsx |
| SaleProcessor | Process completed sales | sale-processor | v1.0.0 | sales, transactions | Phase2 | 2025-01-08 | Card, Button, Badge | - | Sales processing | src/components/dashboard/SaleProcessor.tsx |
| UserManager | User management and settings | user-manager | v1.0.0 | users, management, admin | Core | 2025-01-08 | Card, Button, Table | - | User administration | src/components/dashboard/UserManager.tsx |

## Chart Components

| Name | Description | ID | Version | Tags | Phase | Date Modified | Dependencies | Props | Usage | Path |
|------|-------------|----|---------|----- |-------|---------------|--------------|-------|-------|------|
| LeadsChart | Lead pipeline visualization | leads-chart | v2.0.0 | chart, leads, analytics, performance | Phase2 | 2025-01-08 | recharts, withErrorBoundary, withMemo | - | Lead status pie chart | src/components/charts/leads-chart.tsx |
| BloomGraphChart | Bloom filter visualization | bloom-graph | v1.0.0 | chart, visualization | Analytics | 2025-10-10 | recharts | - | Data bloom visualization | src/components/charts/bloom-graph-chart.tsx |
| ConfusionMatrixChart | ML confusion matrix | confusion-matrix | v1.0.0 | chart, ml, analytics | Analytics | 2025-01-08 | recharts | - | ML metrics | src/components/charts/confusion-matrix-chart.tsx |
| CostAnalysisChart | Cost breakdown analysis | cost-analysis | v1.0.0 | chart, cost, financial | Analytics | 2025-01-08 | recharts | - | Cost metrics | src/components/charts/cost-analysis-chart.tsx |
| ErrorRateChart | Error rate tracking | error-rate | v1.0.0 | chart, errors, monitoring | Analytics | 2025-01-08 | recharts | - | Error visualization | src/components/charts/error-rate-chart.tsx |
| GanttChart | Project timeline gantt chart | gantt-chart | v1.0.0 | chart, timeline, project | Analytics | 2025-01-08 | recharts | - | Project scheduling | src/components/charts/gantt-chart.tsx |
| HeatmapChart | Activity heatmap | heatmap | v1.0.0 | chart, heatmap, activity | Analytics | 2025-01-08 | recharts | - | Activity patterns | src/components/charts/heatmap-chart.tsx |
| LatencyDistributionChart | API latency distribution | latency-dist | v1.0.0 | chart, performance, latency | Analytics | 2025-01-08 | recharts | - | Performance metrics | src/components/charts/latency-distribution-chart.tsx |
| LLMPerformanceChart | AI model performance | llm-performance | v1.0.0 | chart, ai, performance | Analytics | 2025-01-08 | recharts | - | AI metrics | src/components/charts/llm-performance-chart.tsx |
| ModelComparisonChart | Compare AI models | model-comparison | v1.0.0 | chart, ai, comparison | Analytics | 2025-01-08 | recharts | - | Model benchmarking | src/components/charts/model-comparison-chart.tsx |
| NetworkGraphChart | Network relationship graph | network-graph | v1.0.0 | chart, network, graph | Analytics | 2025-01-08 | recharts | - | Relationship mapping | src/components/charts/network-graph-chart.tsx |
| PriceChart | Price trend chart | price-chart | v1.0.0 | chart, pricing, trends | Analytics | 2025-01-08 | recharts | - | Price history | src/components/charts/price-chart.tsx |
| QuadrantLeaderChart | Quadrant analysis | quadrant-leader | v1.0.0 | chart, quadrant, strategy | Analytics | 2025-01-08 | recharts | - | Strategic positioning | src/components/charts/quadrant-leader-chart.tsx |
| QualityMetricsChart | Quality metrics dashboard | quality-metrics | v1.0.0 | chart, quality, metrics | Analytics | 2025-01-08 | recharts | - | Quality tracking | src/components/charts/quality-metrics-chart.tsx |
| RequestVolumeChart | API request volume | request-volume | v1.0.0 | chart, api, volume | Analytics | 2025-01-08 | recharts | - | Traffic analysis | src/components/charts/request-volume-chart.tsx |
| RocCurveChart | ROC curve for ML | roc-curve | v1.0.0 | chart, ml, roc | Analytics | 2025-01-08 | recharts | - | ML evaluation | src/components/charts/roc-curve-chart.tsx |
| SankeyDiagramChart | Sankey flow diagram | sankey-diagram | v1.0.0 | chart, flow, sankey | Analytics | 2025-01-08 | recharts | - | Flow visualization | src/components/charts/sankey-diagram-chart.tsx |
| ScatterPlotChart | Scatter plot visualization | scatter-plot | v1.0.0 | chart, scatter, correlation | Analytics | 2025-01-08 | recharts | - | Data correlation | src/components/charts/scatter-plot-chart.tsx |
| TimelineChart | Event timeline | timeline-chart | v1.0.0 | chart, timeline, events | Analytics | 2025-10-10 | recharts | - | Event history | src/components/charts/timeline-chart.tsx |
| TokenUsageChart | AI token usage tracking | token-usage | v1.0.0 | chart, ai, tokens | Analytics | 2025-01-08 | recharts | - | Token metrics | src/components/charts/token-usage-chart.tsx |
| UsagePatternsChart | Usage pattern analysis | usage-patterns | v1.0.0 | chart, usage, patterns | Analytics | 2025-01-08 | recharts | - | Usage analytics | src/components/charts/usage-patterns-chart.tsx |
| WordCloudChart | Word cloud visualization | word-cloud | v1.0.0 | chart, wordcloud, text | Analytics | 2025-01-08 | recharts | - | Text analysis | src/components/charts/word-cloud-chart.tsx |

## Workflow Components

| Name | Description | ID | Version | Tags | Phase | Date Modified | Dependencies | Props | Usage | Path |
|------|-------------|----|---------|----- |-------|---------------|--------------|-------|-------|------|
| WorkflowDashboard | Main workflow management dashboard | workflow-dashboard | v1.0.0 | workflow, dashboard, management | Phase2 | 2025-10-10 | Card, WorkflowCard | - | Workflow overview | src/components/workflows/WorkflowDashboard.tsx |
| WorkflowCard | Individual workflow card display | workflow-card | v1.0.0 | workflow, card, status | Phase2 | 2025-10-10 | Card, Badge, Button, Progress | id, title, description, status, progress, type | Workflow item display | src/components/workflows/WorkflowCard.tsx |
| WorkflowStep | Single step in workflow | workflow-step | v1.0.0 | workflow, step, process | Phase2 | 2025-10-10 | Card, Badge, Button | id, title, description, status | Workflow step component | src/components/workflows/WorkflowStep.tsx |
| WorkflowProgress | Visual workflow progress tracker | workflow-progress | v1.0.0 | workflow, progress, tracking | Phase2 | 2025-10-10 | Progress, Badge, Card | totalSteps, completedSteps, activeStep? | Progress visualization | src/components/workflows/WorkflowProgress.tsx |
| WorkflowStatus | Workflow status indicator | workflow-status | v1.0.0 | workflow, status, badge | Phase2 | 2025-10-10 | Badge | status, size?, showIcon? | Status display | src/components/workflows/WorkflowStatus.tsx |
| WorkflowActions | Workflow action buttons | workflow-actions | v1.0.0 | workflow, actions, controls | Phase2 | 2025-10-10 | Button | status, onStart?, onPause?, onResume? | Action controls | src/components/workflows/WorkflowActions.tsx |
| FlowModificationWorkflow | Modify existing workflows | flow-mod-workflow | v1.0.0 | workflow, modification | Phase2 | 2025-10-10 | Card, Button, Input, Label | - | Flow editing | src/components/workflows/FlowModificationWorkflow.tsx |
| MessageReviewWorkflow | Review and approve messages | message-review-workflow | v1.0.0 | workflow, messages, review | Phase2 | 2025-10-10 | Card, Button, Input, Label | - | Message review | src/components/workflows/MessageReviewWorkflow.tsx |
| PostManagementWorkflow | Manage posts lifecycle | post-mgmt-workflow | v1.0.0 | workflow, posts, management | Phase2 | 2025-10-10 | - | - | Post management | src/components/workflows/PostManagementWorkflow.tsx |
| ProjectManagementWorkflow | Project workflow management | project-mgmt-workflow | v1.0.0 | workflow, projects, management | Phase2 | 2025-10-10 | Card, Button, Input, Label | - | Project management | src/components/workflows/ProjectManagementWorkflow.tsx |

## Search Components

| Name | Description | ID | Version | Tags | Phase | Date Modified | Dependencies | Props | Usage | Path |
|------|-------------|----|---------|----- |-------|---------------|--------------|-------|-------|------|
| UniversalSearch | Universal search with advanced features | universal-search | v1.0.0 | search, filter, operators | Core | 2025-01-08 | lucide-react, search algorithms, search types | data, onResultSelect?, onFilterAdd?, placeholder? | Main search component | src/components/search/UniversalSearch.tsx |
| Search3D | 3D spatial search visualization | search-3d | v1.0.0 | search, 3d, visualization | Core | 2025-01-08 | search types, utils | searchQuery, onResultSelect?, searchRadius? | 3D search interface | src/components/search/Search3D.tsx |
| FilterChips | Search filter chips display | filter-chips | v1.0.0 | search, filters, chips | Core | 2025-01-08 | lucide-react, search types | filters, onRemove, onClearAll | Filter management | src/components/search/FilterChips.tsx |
| LogicOperators | Logic operators for search | logic-operators | v1.0.0 | search, logic, operators | Core | 2025-01-08 | lucide-react, search operators | onOperatorSelect, onQueryUpdate, currentQuery | Query logic | src/components/search/LogicOperators.tsx |
| SearchIntegration | Integrated search with all features | search-integration | v1.0.0 | search, integration | Core | 2025-01-08 | UniversalSearch, FilterChips, LogicOperators | data, onResultSelect?, className? | Complete search solution | src/components/search/SearchIntegration.tsx |

## UI Components (Primitives)

| Name | Description | ID | Version | Tags | Phase | Date Modified | Dependencies | Props | Usage | Path |
|------|-------------|----|---------|----- |-------|---------------|--------------|-------|-------|------|
| Button | Primary button component | ui-button | v1.0.0 | ui, button, interactive | Core | 2025-01-08 | @radix-ui/react-slot, CVA | variant, size, asChild? | Interactive button | src/components/ui/button.tsx |
| Card | Card container component | ui-card | v1.0.0 | ui, card, container | Core | 2025-01-08 | utils | className | Content container | src/components/ui/card.tsx |
| Badge | Badge/tag component | ui-badge | v1.0.0 | ui, badge, label | Core | 2025-01-08 | CVA | variant | Label display | src/components/ui/badge.tsx |
| Input | Text input field | ui-input | v1.0.0 | ui, input, form | Core | 2025-01-08 | utils | - | Text entry | src/components/ui/input.tsx |
| Textarea | Multi-line text input | ui-textarea | v1.0.0 | ui, textarea, form | Core | 2025-01-08 | utils | - | Multi-line text | src/components/ui/textarea.tsx |
| Select | Dropdown select component | ui-select | v1.0.0 | ui, select, dropdown | Core | 2025-01-08 | @radix-ui/react-select, lucide-react | - | Dropdown selection | src/components/ui/select.tsx |
| Checkbox | Checkbox input | ui-checkbox | v1.0.0 | ui, checkbox, form | Core | 2025-01-08 | @radix-ui/react-checkbox, lucide-react | - | Boolean input | src/components/ui/checkbox.tsx |
| Switch | Toggle switch | ui-switch | v1.0.0 | ui, switch, toggle | Core | 2025-01-08 | @radix-ui/react-switch | - | Boolean toggle | src/components/ui/switch.tsx |
| Tabs | Tab navigation | ui-tabs | v1.0.0 | ui, tabs, navigation | Core | 2025-01-08 | @radix-ui/react-tabs | - | Tab interface | src/components/ui/tabs.tsx |
| Dialog | Modal dialog | ui-dialog | v1.0.0 | ui, dialog, modal | Core | 2025-01-08 | @radix-ui/react-dialog, lucide-react | - | Modal overlay | src/components/ui/dialog.tsx |
| Alert | Alert message component | ui-alert | v1.0.0 | ui, alert, notification | Core | 2025-01-08 | CVA | variant | Alert display | src/components/ui/alert.tsx |
| AlertDialog | Confirmation dialog | ui-alert-dialog | v1.0.0 | ui, dialog, confirm | Core | 2025-01-08 | @radix-ui/react-alert-dialog, Button | - | Confirmation modal | src/components/ui/alert-dialog.tsx |
| Progress | Progress bar | ui-progress | v1.0.0 | ui, progress, indicator | Core | 2025-01-08 | @radix-ui/react-progress | value | Progress indicator | src/components/ui/progress.tsx |
| Separator | Visual separator | ui-separator | v1.0.0 | ui, separator, divider | Core | 2025-01-08 | @radix-ui/react-separator | - | Content divider | src/components/ui/separator.tsx |
| Tooltip | Hover tooltip | ui-tooltip | v1.0.0 | ui, tooltip, hint | Core | 2025-01-08 | @radix-ui/react-tooltip | - | Hover information | src/components/ui/tooltip.tsx |
| Popover | Popover component | ui-popover | v1.0.0 | ui, popover, overlay | Core | 2025-01-08 | @radix-ui/react-popover | - | Popup content | src/components/ui/popover.tsx |
| DropdownMenu | Dropdown menu | ui-dropdown | v1.0.0 | ui, menu, dropdown | Core | 2025-01-08 | @radix-ui/react-dropdown-menu, lucide-react | - | Dropdown menu | src/components/ui/dropdown-menu.tsx |
| ContextMenu | Right-click context menu | ui-context-menu | v1.0.0 | ui, menu, context | Core | 2025-01-08 | @radix-ui/react-context-menu, lucide-react | - | Context menu | src/components/ui/context-menu.tsx |
| Accordion | Collapsible accordion | ui-accordion | v1.0.0 | ui, accordion, collapse | Core | 2025-01-08 | @radix-ui/react-accordion, lucide-react | - | Expandable sections | src/components/ui/accordion.tsx |
| Table | Data table | ui-table | v1.0.0 | ui, table, data | Core | 2025-01-08 | utils | - | Tabular data | src/components/ui/table.tsx |
| ScrollArea | Scrollable area | ui-scroll-area | v1.0.0 | ui, scroll, container | Core | 2025-01-08 | @radix-ui/react-scroll-area | - | Scrollable content | src/components/ui/scroll-area.tsx |
| Sheet | Side panel sheet | ui-sheet | v1.0.0 | ui, sheet, panel | Core | 2025-01-08 | @radix-ui/react-dialog, CVA, lucide-react | - | Side drawer | src/components/ui/sheet.tsx |
| Drawer | Bottom drawer | ui-drawer | v1.0.0 | ui, drawer, panel | Core | 2025-01-08 | vaul | - | Bottom panel | src/components/ui/drawer.tsx |
| Calendar | Date picker calendar | ui-calendar | v1.0.0 | ui, calendar, date | Core | 2025-01-08 | react-day-picker, lucide-react, Button | - | Date selection | src/components/ui/calendar.tsx |
| DateRangePicker | Date range selector | ui-date-range | v1.0.0 | ui, date, range | Core | 2025-01-08 | date-fns, react-day-picker, lucide-react | value, onChange, className? | Date range input | src/components/ui/date-range-picker.tsx |
| Label | Form label | ui-label | v1.0.0 | ui, label, form | Core | 2025-01-08 | @radix-ui/react-label, CVA | - | Input label | src/components/ui/label.tsx |
| Form | Form component | ui-form | v1.0.0 | ui, form, validation | Core | 2025-01-08 | @radix-ui/react-label, @radix-ui/react-slot | - | Form container | src/components/ui/form.tsx |
| Slider | Range slider | ui-slider | v1.0.0 | ui, slider, range | Core | 2025-01-08 | @radix-ui/react-slider | - | Value slider | src/components/ui/slider.tsx |
| RadioGroup | Radio button group | ui-radio | v1.0.0 | ui, radio, form | Core | 2025-01-08 | @radix-ui/react-radio-group, lucide-react | - | Radio selection | src/components/ui/radio-group.tsx |
| Toggle | Toggle button | ui-toggle | v1.0.0 | ui, toggle, button | Core | 2025-01-08 | @radix-ui/react-toggle, CVA | - | Toggle state | src/components/ui/toggle.tsx |
| ToggleGroup | Toggle button group | ui-toggle-group | v1.0.0 | ui, toggle, group | Core | 2025-01-08 | @radix-ui/react-toggle-group, CVA | - | Multiple toggles | src/components/ui/toggle-group.tsx |
| HoverCard | Hover card overlay | ui-hover-card | v1.0.0 | ui, hover, card | Core | 2025-01-08 | @radix-ui/react-hover-card | - | Hover content | src/components/ui/hover-card.tsx |
| Avatar | User avatar | ui-avatar | v1.0.0 | ui, avatar, user | Core | 2025-01-08 | @radix-ui/react-avatar | - | Profile image | src/components/ui/avatar.tsx |
| AspectRatio | Aspect ratio container | ui-aspect-ratio | v1.0.0 | ui, layout, ratio | Core | 2025-01-08 | @radix-ui/react-aspect-ratio | - | Fixed ratio content | src/components/ui/aspect-ratio.tsx |
| Resizable | Resizable panels | ui-resizable | v1.0.0 | ui, layout, resize | Core | 2025-01-08 | react-resizable-panels, lucide-react | - | Resizable layout | src/components/ui/resizable.tsx |
| Collapsible | Collapsible content | ui-collapsible | v1.0.0 | ui, collapse, toggle | Core | 2025-01-08 | @radix-ui/react-collapsible | - | Show/hide content | src/components/ui/collapsible.tsx |
| Breadcrumb | Breadcrumb navigation | ui-breadcrumb | v1.0.0 | ui, nav, breadcrumb | Core | 2025-01-08 | @radix-ui/react-slot, lucide-react | - | Navigation trail | src/components/ui/breadcrumb.tsx |
| NavigationMenu | Navigation menu | ui-nav-menu | v1.0.0 | ui, nav, menu | Core | 2025-01-08 | @radix-ui/react-navigation-menu, CVA, lucide-react | - | Site navigation | src/components/ui/navigation-menu.tsx |
| Menubar | Menu bar | ui-menubar | v1.0.0 | ui, menu, bar | Core | 2025-01-08 | @radix-ui/react-menubar, lucide-react | - | Menu bar | src/components/ui/menubar.tsx |
| Pagination | Pagination controls | ui-pagination | v1.0.0 | ui, pagination, nav | Core | 2025-01-08 | lucide-react, Button | - | Page navigation | src/components/ui/pagination.tsx |
| Command | Command palette | ui-command | v1.0.0 | ui, command, search | Core | 2025-01-08 | @radix-ui/react-dialog, cmdk, lucide-react | - | Command search | src/components/ui/command.tsx |
| Carousel | Image carousel | ui-carousel | v1.0.0 | ui, carousel, images | Core | 2025-01-08 | lucide-react, Button | - | Image slider | src/components/ui/carousel.tsx |
| InputOTP | OTP input field | ui-input-otp | v1.0.0 | ui, input, otp | Core | 2025-01-08 | input-otp, lucide-react | - | OTP entry | src/components/ui/input-otp.tsx |
| Skeleton | Loading skeleton | ui-skeleton | v1.0.0 | ui, loading, skeleton | Core | 2025-01-08 | utils | - | Loading placeholder | src/components/ui/skeleton.tsx |
| Toast | Toast notification | ui-toast | v1.0.0 | ui, toast, notification | Core | 2025-01-08 | @radix-ui/react-toast, CVA, lucide-react | - | Notification toast | src/components/ui/toast.tsx |
| Toaster | Toast container | ui-toaster | v1.0.0 | ui, toast, container | Core | 2025-01-08 | use-toast hook | - | Toast manager | src/components/ui/toaster.tsx |
| Sonner | Sonner toast system | ui-sonner | v1.0.0 | ui, toast, sonner | Core | 2025-01-08 | sonner, theme-provider | - | Alternative toast | src/components/ui/sonner.tsx |
| DashboardCard | Dashboard widget card | ui-dashboard-card | v1.0.0 | ui, dashboard, card | Core | 2025-10-10 | Card, utils | title?, description?, icon? | Dashboard widget | src/components/ui/dashboard-card.tsx |
| TaskCard | Task display card | ui-task-card | v1.0.0 | ui, task, card | Core | 2025-01-08 | Card, Badge, Checkbox, Button | id, title, description? | Task item | src/components/ui/task-card.tsx |
| ConnectionStatus | Connection status indicator | ui-connection-status | v1.0.0 | ui, status, connection | Core | 2025-01-08 | use-real-time, Badge, lucide-react | - | Real-time status | src/components/ui/connection-status.tsx |
| CodeEditor | Code editor component | ui-code-editor | v1.0.0 | ui, code, editor, wysiwyg | Core | 2025-01-08 | Card, Button, Select, Badge | className?, initialLanguage?, initialCode? | Code editing | src/components/ui/code-editor.tsx |
| ResponsiveGrid | Responsive grid layout | ui-responsive-grid | v1.0.0 | ui, grid, responsive | Core | 2025-01-08 | utils | children, defaultSize? | Grid layout | src/components/ui/responsive-grid.tsx |
| MobileNav | Mobile navigation | ui-mobile-nav | v1.0.0 | ui, nav, mobile | Core | 2025-01-08 | Sheet, Button, lucide-react, Sidebar | - | Mobile menu | src/components/ui/mobile-nav.tsx |
| UIElementsFilter | UI component filter | ui-elements-filter | v1.0.0 | ui, filter, components | Core | 2025-01-08 | Card, Button, Badge, Input | className? | Component browser | src/components/ui/ui-elements-filter.tsx |

## Redux UI Components

| Name | Description | ID | Version | Tags | Phase | Date Modified | Dependencies | Props | Usage | Path |
|------|-------------|----|---------|----- |-------|---------------|--------------|-------|-------|------|
| Button | Redux UI Button | redux-button | v1.0.0 | redux-ui, button | Core | 2025-10-09 | utils | variant?, size? | Button component | src/components/redux-ui/Button.tsx |
| Card | Redux UI Card | redux-card | v1.0.0 | redux-ui, card | Core | 2025-10-09 | Card, utils | - | Card wrapper | src/components/redux-ui/Card.tsx |
| Badge | Redux UI Badge | redux-badge | v1.0.0 | redux-ui, badge | Core | 2025-10-09 | Badge | variant? | Badge component | src/components/redux-ui/Badge.tsx |
| Input | Redux UI Input | redux-input | v1.0.0 | redux-ui, input | Core | 2025-10-09 | utils | - | Input field | src/components/redux-ui/Input.tsx |
| Select | Redux UI Select | redux-select | v1.0.0 | redux-ui, select | Core | 2025-10-10 | lucide-react | value?, onValueChange?, children | Dropdown select | src/components/redux-ui/Select.tsx |
| Tabs | Redux UI Tabs | redux-tabs | v1.0.0 | redux-ui, tabs | Core | 2025-10-09 | utils | - | Tab navigation | src/components/redux-ui/Tabs.tsx |
| Progress | Redux UI Progress | redux-progress | v1.0.0 | redux-ui, progress | Core | 2025-10-09 | utils | value? | Progress bar | src/components/redux-ui/Progress.tsx |
| Separator | Redux UI Separator | redux-separator | v1.0.0 | redux-ui, separator | Core | 2025-10-09 | utils | - | Content divider | src/components/redux-ui/Separator.tsx |
| DashboardCard | Redux UI Dashboard Card | redux-dashboard-card | v1.0.0 | redux-ui, dashboard, card | Core | 2025-10-10 | Card, utils | - | Dashboard widget card | src/components/redux-ui/DashboardCard.tsx |
| ConnectionStatus | Redux UI Connection Status | redux-connection-status | v1.0.0 | redux-ui, status | Core | 2025-10-09 | Badge, lucide-react | - | Connection indicator | src/components/redux-ui/ConnectionStatus.tsx |
| CodeEditor | Redux UI Code Editor | redux-code-editor | v1.0.0 | redux-ui, code, editor | Core | 2025-10-09 | Card, Button, Select | - | Code editor | src/components/redux-ui/CodeEditor.tsx |
| ResponsiveGrid | Redux UI Responsive Grid | redux-grid | v1.0.0 | redux-ui, grid, responsive | Core | 2025-10-09 | utils | children, defaultSize? | Grid layout | src/components/redux-ui/ResponsiveGrid.tsx |
| UIElementsFilter | Redux UI Elements Filter | redux-elements-filter | v1.0.0 | redux-ui, filter | Core | 2025-10-09 | Input, Button, utils | - | Component filter | src/components/redux-ui/UIElementsFilter.tsx |

## Feature Components

| Name | Description | ID | Version | Tags | Phase | Date Modified | Dependencies | Props | Usage | Path |
|------|-------------|----|---------|----- |-------|---------------|--------------|-------|-------|------|
| NewPostFlow | Complete new post creation workflow | new-post-flow | v1.0.0 | workflow, posts, creation | Phase1 | 2025-10-10 | Card, Button, Input, Select, framer-motion, useNewPostFlowStore | - | Multi-step post creation | src/components/NewPostFlow.tsx |
| Phase1Dashboard | Phase 1 dashboard view | phase1-dashboard | v1.0.0 | dashboard, phase1 | Phase1 | 2025-01-08 | Dashboard components | - | Phase 1 interface | src/components/Phase1Dashboard.tsx |
| Phase2Dashboard | Phase 2 dashboard view | phase2-dashboard | v1.0.0 | dashboard, phase2 | Phase2 | 2025-01-08 | Dashboard components | - | Phase 2 interface | src/components/Phase2Dashboard.tsx |
| DashboardLayout | Main dashboard layout wrapper | dashboard-layout | v1.0.0 | layout, dashboard | Core | 2025-01-08 | Sidebar, MobileNav | - | Dashboard container | src/components/dashboard-layout.tsx |
| DashboardOverview | Dashboard overview page | dashboard-overview | v1.0.0 | dashboard, overview | Core | 2025-01-08 | Card, Chart components | - | Dashboard home | src/components/dashboard-overview.tsx |
| Sidebar | Application sidebar navigation | sidebar | v1.0.0 | navigation, sidebar | Core | 2025-01-08 | Button, lucide-react, react-router-dom | - | Side navigation | src/components/sidebar.tsx |
| ListingGenerator | Generate listings for items | listing-generator | v1.0.0 | listings, generation | Phase1 | 2025-01-08 | Card, Button, AI integration | - | Listing creation | src/components/listing-generator.tsx |
| ListingManagement | Manage active listings | listing-management | v1.0.0 | listings, management | Phase1 | 2025-01-08 | Card, Button, Table | - | Listing admin | src/components/listing-management.tsx |
| LeadsManager | Lead management interface | leads-manager | v1.0.0 | leads, management | Phase2 | 2025-01-08 | Card, Badge, Button | - | Lead administration | src/components/leads-manager.tsx |
| AutoResponderManager | Auto-responder configuration | auto-responder-manager | v1.0.0 | automation, responses | Phase2 | 2025-01-08 | Card, Switch, Select | - | Response automation | src/components/auto-responder-manager.tsx |
| ResponseMonitor | Monitor auto-responses | response-monitor | v1.0.0 | monitoring, responses | Phase2 | 2025-01-08 | Card, Badge, Button | - | Response tracking | src/components/response-monitor.tsx |
| MetadataDisplay | Display item metadata | metadata-display | v1.0.0 | metadata, display | Core | 2025-01-08 | Card, Badge | - | Metadata viewer | src/components/MetadataDisplay.tsx |
| ThemeProvider | Theme management provider | theme-provider | v1.0.0 | theme, provider | Core | 2025-01-08 | react | - | Theme context | src/components/theme-provider.tsx |
| Providers | Application providers wrapper | providers | v1.0.0 | providers, context | Core | 2025-01-08 | ThemeProvider, QueryClient | - | App providers | src/components/providers.tsx |

---

## Component Categories Summary

- **Dashboard Components:** 19
- **Chart Components:** 22
- **Workflow Components:** 10
- **Search Components:** 5
- **UI Primitives:** 52
- **Redux UI Components:** 13
- **Feature Components:** 15

## Tag Index

### By Phase
- **Core:** 81 components
- **Phase1:** 7 components
- **Phase2:** 29 components
- **Analytics:** 22 components

### By Category
- **UI:** 52 components
- **Dashboard:** 19 components
- **Chart:** 22 components
- **Workflow:** 10 components
- **Search:** 5 components
- **Feature:** 15 components
- **Redux UI:** 13 components
- **Navigation:** 3 components

---

**Last Updated:** 2025-10-10  
**Generated by:** Component Inventory System  
**Repository:** pow3r.cashout

