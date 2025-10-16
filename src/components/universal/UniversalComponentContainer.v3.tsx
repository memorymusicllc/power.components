/**
 * Universal Component Container v3
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * A single container that can morph into any of 52 component types by switching data.
 * This eliminates the need for 52 separate components and provides a unified interface.
 * 
 * @version 3.0.0
 * @date 2025-01-15
 * @schema pow3r.v3.data.json
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Settings, 
  Layers, 
  Zap, 
  Eye, 
  BarChart3, 
  Cpu, 
  Monitor,
  Globe,
  Shield,
  Heart,
  Star,
  Filter,
  Search,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Grid,
  List,
  ToggleLeft,
  ToggleRight,
  Activity,
  Workflow,
  Database,
  Server,
  Cloud,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Wifi,
  Bluetooth,
  Battery,
  Volume2,
  Camera,
  Image,
  Video,
  Music,
  File,
  Folder,
  Download,
  Upload,
  Share,
  Link,
  Lock,
  Unlock,
  Key,
  Bell,
  Mail,
  Phone,
  MessageCircle,
  Users,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Calendar,
  Clock,
  Timer,
  Stopwatch
} from 'lucide-react';

// Component Registry - All 52 Component Types
interface ComponentType {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  description: string;
  dataSchema: any;
  renderFunction: (data: any, props: any) => React.ReactNode;
  defaultProps: any;
}

// Universal Component Container
export default function UniversalComponentContainerV3() {
  const [activeComponentId, setActiveComponentId] = useState<string>('dashboard');
  const [componentData, setComponentData] = useState<any>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(3000);

  // Component Registry - 52 Component Types
  const componentRegistry: ComponentType[] = useMemo(() => [
    // Dashboard Components (8)
    {
      id: 'dashboard',
      name: 'Dashboard',
      category: 'Dashboard',
      icon: Monitor,
      description: 'Main dashboard with widgets and metrics',
      dataSchema: { widgets: [], metrics: {}, layout: 'grid' },
      renderFunction: (data) => <DashboardRenderer data={data} />,
      defaultProps: { theme: 'dark', layout: 'grid' }
    },
    {
      id: 'analytics',
      name: 'Analytics',
      category: 'Dashboard',
      icon: BarChart3,
      description: 'Data analytics and insights dashboard',
      dataSchema: { charts: [], metrics: {}, filters: {} },
      renderFunction: (data) => <AnalyticsRenderer data={data} />,
      defaultProps: { chartType: 'line', timeRange: '7d' }
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      category: 'Dashboard',
      icon: Activity,
      description: 'System monitoring and health checks',
      dataSchema: { alerts: [], metrics: {}, status: 'healthy' },
      renderFunction: (data) => <MonitoringRenderer data={data} />,
      defaultProps: { refreshInterval: 5000, alertThreshold: 80 }
    },
    {
      id: 'workflow',
      name: 'Workflow',
      category: 'Dashboard',
      icon: Workflow,
      description: 'Workflow orchestration and automation',
      dataSchema: { steps: [], status: 'idle', progress: 0 },
      renderFunction: (data) => <WorkflowRenderer data={data} />,
      defaultProps: { autoStart: false, parallel: true }
    },
    {
      id: 'database',
      name: 'Database',
      category: 'Dashboard',
      icon: Database,
      description: 'Database management and queries',
      dataSchema: { tables: [], queries: [], connections: [] },
      renderFunction: (data) => <DatabaseRenderer data={data} />,
      defaultProps: { connectionLimit: 10, queryTimeout: 30000 }
    },
    {
      id: 'server',
      name: 'Server',
      category: 'Dashboard',
      icon: Server,
      description: 'Server management and configuration',
      dataSchema: { services: [], resources: {}, logs: [] },
      renderFunction: (data) => <ServerRenderer data={data} />,
      defaultProps: { autoRestart: true, logLevel: 'info' }
    },
    {
      id: 'cloud',
      name: 'Cloud',
      category: 'Dashboard',
      icon: Cloud,
      description: 'Cloud services and infrastructure',
      dataSchema: { instances: [], regions: [], costs: {} },
      renderFunction: (data) => <CloudRenderer data={data} />,
      defaultProps: { region: 'us-east-1', instanceType: 't3.micro' }
    },
    {
      id: 'security',
      name: 'Security',
      category: 'Dashboard',
      icon: Shield,
      description: 'Security monitoring and compliance',
      dataSchema: { threats: [], policies: [], compliance: {} },
      renderFunction: (data) => <SecurityRenderer data={data} />,
      defaultProps: { threatLevel: 'low', complianceMode: 'strict' }
    },

    // UI Components (12)
    {
      id: 'button',
      name: 'Button',
      category: 'UI',
      icon: Zap,
      description: 'Interactive button component',
      dataSchema: { text: '', variant: 'primary', size: 'md' },
      renderFunction: (data) => <ButtonRenderer data={data} />,
      defaultProps: { variant: 'primary', size: 'md', disabled: false }
    },
    {
      id: 'dropdown',
      name: 'Dropdown',
      category: 'UI',
      icon: ChevronDown,
      description: 'Dropdown selection component',
      dataSchema: { options: [], value: '', searchable: false },
      renderFunction: (data) => <DropdownRenderer data={data} />,
      defaultProps: { searchable: true, multiSelect: false }
    },
    {
      id: 'input',
      name: 'Input',
      category: 'UI',
      icon: Settings,
      description: 'Text input component',
      dataSchema: { value: '', placeholder: '', type: 'text' },
      renderFunction: (data) => <InputRenderer data={data} />,
      defaultProps: { type: 'text', required: false, maxLength: 255 }
    },
    {
      id: 'toggle',
      name: 'Toggle',
      category: 'UI',
      icon: ToggleRight,
      description: 'Toggle switch component',
      dataSchema: { checked: false, label: '', disabled: false },
      renderFunction: (data) => <ToggleRenderer data={data} />,
      defaultProps: { size: 'md', color: 'blue' }
    },
    {
      id: 'slider',
      name: 'Slider',
      category: 'UI',
      icon: Settings,
      description: 'Range slider component',
      dataSchema: { value: 50, min: 0, max: 100, step: 1 },
      renderFunction: (data) => <SliderRenderer data={data} />,
      defaultProps: { orientation: 'horizontal', showLabels: true }
    },
    {
      id: 'checkbox',
      name: 'Checkbox',
      category: 'UI',
      icon: CheckCircle,
      description: 'Checkbox component',
      dataSchema: { checked: false, label: '', indeterminate: false },
      renderFunction: (data) => <CheckboxRenderer data={data} />,
      defaultProps: { size: 'md', color: 'blue' }
    },
    {
      id: 'radio',
      name: 'Radio',
      category: 'UI',
      icon: Radio,
      description: 'Radio button component',
      dataSchema: { value: '', options: [], name: '' },
      renderFunction: (data) => <RadioRenderer data={data} />,
      defaultProps: { size: 'md', color: 'blue' }
    },
    {
      id: 'select',
      name: 'Select',
      category: 'UI',
      icon: List,
      description: 'Select component',
      dataSchema: { options: [], value: '', multiple: false },
      renderFunction: (data) => <SelectRenderer data={data} />,
      defaultProps: { searchable: true, clearable: true }
    },
    {
      id: 'textarea',
      name: 'Textarea',
      category: 'UI',
      icon: File,
      description: 'Multi-line text input',
      dataSchema: { value: '', placeholder: '', rows: 3 },
      renderFunction: (data) => <TextareaRenderer data={data} />,
      defaultProps: { maxLength: 1000, autoResize: true }
    },
    {
      id: 'modal',
      name: 'Modal',
      category: 'UI',
      icon: Eye,
      description: 'Modal dialog component',
      dataSchema: { open: false, title: '', content: '' },
      renderFunction: (data) => <ModalRenderer data={data} />,
      defaultProps: { size: 'md', closable: true }
    },
    {
      id: 'tooltip',
      name: 'Tooltip',
      category: 'UI',
      icon: MessageCircle,
      description: 'Tooltip component',
      dataSchema: { content: '', position: 'top', trigger: 'hover' },
      renderFunction: (data) => <TooltipRenderer data={data} />,
      defaultProps: { delay: 300, maxWidth: 200 }
    },
    {
      id: 'popover',
      name: 'Popover',
      category: 'UI',
      icon: Layers,
      description: 'Popover component',
      dataSchema: { open: false, content: '', placement: 'bottom' },
      renderFunction: (data) => <PopoverRenderer data={data} />,
      defaultProps: { trigger: 'click', arrow: true }
    },

    // Data Components (8)
    {
      id: 'table',
      name: 'Table',
      category: 'Data',
      icon: Grid,
      description: 'Data table component',
      dataSchema: { columns: [], data: [], pagination: true },
      renderFunction: (data) => <TableRenderer data={data} />,
      defaultProps: { sortable: true, filterable: true, pageSize: 10 }
    },
    {
      id: 'list',
      name: 'List',
      category: 'Data',
      icon: List,
      description: 'List component',
      dataSchema: { items: [], renderItem: null, virtualized: false },
      renderFunction: (data) => <ListRenderer data={data} />,
      defaultProps: { itemHeight: 40, overscan: 5 }
    },
    {
      id: 'grid',
      name: 'Grid',
      category: 'Data',
      icon: Grid,
      description: 'Grid layout component',
      dataSchema: { columns: 3, gap: 16, items: [] },
      renderFunction: (data) => <GridRenderer data={data} />,
      defaultProps: { responsive: true, autoFit: true }
    },
    {
      id: 'card',
      name: 'Card',
      category: 'Data',
      icon: File,
      description: 'Card component',
      dataSchema: { title: '', content: '', actions: [] },
      renderFunction: (data) => <CardRenderer data={data} />,
      defaultProps: { shadow: 'md', padding: 'md' }
    },
    {
      id: 'accordion',
      name: 'Accordion',
      category: 'Data',
      icon: ChevronDown,
      description: 'Accordion component',
      dataSchema: { items: [], allowMultiple: false },
      renderFunction: (data) => <AccordionRenderer data={data} />,
      defaultProps: { defaultOpen: [], animated: true }
    },
    {
      id: 'tabs',
      name: 'Tabs',
      category: 'Data',
      icon: Layers,
      description: 'Tabs component',
      dataSchema: { tabs: [], activeTab: 0 },
      renderFunction: (data) => <TabsRenderer data={data} />,
      defaultProps: { variant: 'line', size: 'md' }
    },
    {
      id: 'stepper',
      name: 'Stepper',
      category: 'Data',
      icon: Activity,
      description: 'Stepper component',
      dataSchema: { steps: [], currentStep: 0 },
      renderFunction: (data) => <StepperRenderer data={data} />,
      defaultProps: { orientation: 'horizontal', clickable: true }
    },
    {
      id: 'breadcrumb',
      name: 'Breadcrumb',
      category: 'Data',
      icon: ChevronRight,
      description: 'Breadcrumb navigation',
      dataSchema: { items: [], separator: '/' },
      renderFunction: (data) => <BreadcrumbRenderer data={data} />,
      defaultProps: { maxItems: 5, showHome: true }
    },

    // Media Components (6)
    {
      id: 'image',
      name: 'Image',
      category: 'Media',
      icon: Image,
      description: 'Image component',
      dataSchema: { src: '', alt: '', width: 300, height: 200 },
      renderFunction: (data) => <ImageRenderer data={data} />,
      defaultProps: { lazy: true, placeholder: 'blur' }
    },
    {
      id: 'video',
      name: 'Video',
      category: 'Media',
      icon: Video,
      description: 'Video player component',
      dataSchema: { src: '', poster: '', controls: true },
      renderFunction: (data) => <VideoRenderer data={data} />,
      defaultProps: { autoplay: false, loop: false, muted: false }
    },
    {
      id: 'audio',
      name: 'Audio',
      category: 'Media',
      icon: Music,
      description: 'Audio player component',
      dataSchema: { src: '', controls: true, loop: false },
      renderFunction: (data) => <AudioRenderer data={data} />,
      defaultProps: { autoplay: false, preload: 'metadata' }
    },
    {
      id: 'gallery',
      name: 'Gallery',
      category: 'Media',
      icon: Grid,
      description: 'Image gallery component',
      dataSchema: { images: [], layout: 'grid' },
      renderFunction: (data) => <GalleryRenderer data={data} />,
      defaultProps: { columns: 3, gap: 16, lightbox: true }
    },
    {
      id: 'carousel',
      name: 'Carousel',
      category: 'Media',
      icon: Play,
      description: 'Carousel component',
      dataSchema: { items: [], autoplay: false, interval: 3000 },
      renderFunction: (data) => <CarouselRenderer data={data} />,
      defaultProps: { showDots: true, showArrows: true }
    },
    {
      id: 'lightbox',
      name: 'Lightbox',
      category: 'Media',
      icon: Eye,
      description: 'Lightbox component',
      dataSchema: { open: false, images: [], currentIndex: 0 },
      renderFunction: (data) => <LightboxRenderer data={data} />,
      defaultProps: { keyboard: true, zoom: true }
    },

    // Navigation Components (6)
    {
      id: 'navbar',
      name: 'Navbar',
      category: 'Navigation',
      icon: Menu,
      description: 'Navigation bar component',
      dataSchema: { items: [], logo: '', position: 'top' },
      renderFunction: (data) => <NavbarRenderer data={data} />,
      defaultProps: { sticky: true, transparent: false }
    },
    {
      id: 'sidebar',
      name: 'Sidebar',
      category: 'Navigation',
      icon: PanelLeft,
      description: 'Sidebar navigation',
      dataSchema: { items: [], collapsed: false },
      renderFunction: (data) => <SidebarRenderer data={data} />,
      defaultProps: { width: 250, collapsible: true }
    },
    {
      id: 'menu',
      name: 'Menu',
      category: 'Navigation',
      icon: Menu,
      description: 'Menu component',
      dataSchema: { items: [], trigger: 'click' },
      renderFunction: (data) => <MenuRenderer data={data} />,
      defaultProps: { position: 'bottom-start', arrow: true }
    },
    {
      id: 'pagination',
      name: 'Pagination',
      category: 'Navigation',
      icon: ChevronLeft,
      description: 'Pagination component',
      dataSchema: { current: 1, total: 10, pageSize: 10 },
      renderFunction: (data) => <PaginationRenderer data={data} />,
      defaultProps: { showSizeChanger: true, showQuickJumper: true }
    },
    {
      id: 'steps',
      name: 'Steps',
      category: 'Navigation',
      icon: Activity,
      description: 'Steps navigation',
      dataSchema: { steps: [], current: 0 },
      renderFunction: (data) => <StepsRenderer data={data} />,
      defaultProps: { direction: 'horizontal', size: 'default' }
    },
    {
      id: 'anchor',
      name: 'Anchor',
      category: 'Navigation',
      icon: Link,
      description: 'Anchor links component',
      dataSchema: { links: [], offset: 0 },
      renderFunction: (data) => <AnchorRenderer data={data} />,
      defaultProps: { affix: true, showInkInFixed: true }
    },

    // Form Components (8)
    {
      id: 'form',
      name: 'Form',
      category: 'Form',
      icon: File,
      description: 'Form component',
      dataSchema: { fields: [], validation: {}, layout: 'vertical' },
      renderFunction: (data) => <FormRenderer data={data} />,
      defaultProps: { validateOnChange: true, scrollToFirstError: true }
    },
    {
      id: 'field',
      name: 'Field',
      category: 'Form',
      icon: Settings,
      description: 'Form field component',
      dataSchema: { name: '', type: 'text', required: false },
      renderFunction: (data) => <FieldRenderer data={data} />,
      defaultProps: { labelPosition: 'top', help: '' }
    },
    {
      id: 'validation',
      name: 'Validation',
      category: 'Form',
      icon: Shield,
      description: 'Form validation component',
      dataSchema: { rules: [], messages: {} },
      renderFunction: (data) => <ValidationRenderer data={data} />,
      defaultProps: { validateOnBlur: true, validateOnChange: false }
    },
    {
      id: 'upload',
      name: 'Upload',
      category: 'Form',
      icon: Upload,
      description: 'File upload component',
      dataSchema: { files: [], multiple: false, accept: '*' },
      renderFunction: (data) => <UploadRenderer data={data} />,
      defaultProps: { drag: true, showUploadList: true }
    },
    {
      id: 'datepicker',
      name: 'DatePicker',
      category: 'Form',
      icon: Calendar,
      description: 'Date picker component',
      dataSchema: { value: null, format: 'YYYY-MM-DD' },
      renderFunction: (data) => <DatePickerRenderer data={data} />,
      defaultProps: { showTime: false, allowClear: true }
    },
    {
      id: 'timepicker',
      name: 'TimePicker',
      category: 'Form',
      icon: Clock,
      description: 'Time picker component',
      dataSchema: { value: null, format: 'HH:mm' },
      renderFunction: (data) => <TimePickerRenderer data={data} />,
      defaultProps: { use12Hours: false, allowClear: true }
    },
    {
      id: 'colorpicker',
      name: 'ColorPicker',
      category: 'Form',
      icon: Palette,
      description: 'Color picker component',
      dataSchema: { value: '#000000', format: 'hex' },
      renderFunction: (data) => <ColorPickerRenderer data={data} />,
      defaultProps: { showText: true, allowClear: true }
    },
    {
      id: 'rating',
      name: 'Rating',
      category: 'Form',
      icon: Star,
      description: 'Rating component',
      dataSchema: { value: 0, max: 5, allowHalf: false },
      renderFunction: (data) => <RatingRenderer data={data} />,
      defaultProps: { disabled: false, showTooltip: true }
    },

    // Layout Components (4)
    {
      id: 'container',
      name: 'Container',
      category: 'Layout',
      icon: Box,
      description: 'Container layout component',
      dataSchema: { maxWidth: 'lg', padding: 'md' },
      renderFunction: (data) => <ContainerRenderer data={data} />,
      defaultProps: { fluid: false, centered: true }
    },
    {
      id: 'flex',
      name: 'Flex',
      category: 'Layout',
      icon: Layout,
      description: 'Flexbox layout component',
      dataSchema: { direction: 'row', wrap: 'nowrap', gap: 16 },
      renderFunction: (data) => <FlexRenderer data={data} />,
      defaultProps: { align: 'stretch', justify: 'flex-start' }
    },
    {
      id: 'grid',
      name: 'Grid',
      category: 'Layout',
      icon: Grid,
      description: 'CSS Grid layout component',
      dataSchema: { columns: 12, gap: 16, areas: [] },
      renderFunction: (data) => <GridLayoutRenderer data={data} />,
      defaultProps: { responsive: true, autoFit: true }
    },
    {
      id: 'spacer',
      name: 'Spacer',
      category: 'Layout',
      icon: Minus,
      description: 'Spacing component',
      dataSchema: { size: 'md', axis: 'vertical' },
      renderFunction: (data) => <SpacerRenderer data={data} />,
      defaultProps: { responsive: true, breakpoints: {} }
    }
  ], []);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setActiveComponentId(prev => {
        const currentIndex = componentRegistry.findIndex(c => c.id === prev);
        const nextIndex = (currentIndex + 1) % componentRegistry.length;
        return componentRegistry[nextIndex].id;
      });
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [autoRotate, rotationSpeed, componentRegistry]);

  // Get current component
  const currentComponent = componentRegistry.find(c => c.id === activeComponentId) || componentRegistry[0];

  // Get component data
  const currentData = componentData[activeComponentId] || currentComponent.defaultProps;

  // Component selector
  const ComponentSelector = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Component Selector
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={`grid gap-2 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
          {componentRegistry.map((component) => {
            const Icon = component.icon;
            return (
              <button
                key={component.id}
                onClick={() => setActiveComponentId(component.id)}
                className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                  activeComponentId === component.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm truncate">{component.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {component.category}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  // Auto-rotation controls
  const AutoRotationControls = () => (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            autoRotate
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {autoRotate ? 'Pause' : 'Auto Rotate'}
        </button>
      </div>
      
      {autoRotate && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Speed:</label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {rotationSpeed / 1000}s
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Universal Component Container v3
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Single container that morphs into any of 52 component types
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Component Selector */}
        <ComponentSelector />

        {/* Auto-rotation Controls */}
        <AutoRotationControls />

        {/* Current Component Display */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <currentComponent.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentComponent.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentComponent.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {currentComponent.renderFunction(currentData, {})}
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder Renderers for each component type
const DashboardRenderer = ({ data }: { data: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
      <h4 className="font-semibold text-blue-900 dark:text-blue-100">Total Users</h4>
      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">1,234</p>
    </div>
    <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
      <h4 className="font-semibold text-green-900 dark:text-green-100">Revenue</h4>
      <p className="text-2xl font-bold text-green-700 dark:text-green-300">$12,345</p>
    </div>
    <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
      <h4 className="font-semibold text-purple-900 dark:text-purple-100">Orders</h4>
      <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">567</p>
    </div>
  </div>
);

const AnalyticsRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      <BarChart3 className="w-12 h-12 text-gray-400" />
      <span className="ml-2 text-gray-500 dark:text-gray-400">Analytics Chart</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Page Views</div>
        <div className="text-xl font-bold">45,678</div>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Bounce Rate</div>
        <div className="text-xl font-bold">23.4%</div>
      </div>
    </div>
  </div>
);

const MonitoringRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      <span className="text-sm font-medium">System Status: Healthy</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <div className="text-sm font-medium mt-1">45%</div>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
        </div>
        <div className="text-sm font-medium mt-1">67%</div>
      </div>
    </div>
  </div>
);

const WorkflowRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Activity className="w-5 h-5 text-blue-500" />
      <span className="font-medium">Workflow Progress</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-400">Step 3 of 5 completed</div>
  </div>
);

const DatabaseRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Database className="w-5 h-5 text-green-500" />
      <span className="font-medium">Database Status</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Connections</div>
        <div className="text-xl font-bold">12/50</div>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Queries/sec</div>
        <div className="text-xl font-bold">1,234</div>
      </div>
    </div>
  </div>
);

const ServerRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Server className="w-5 h-5 text-orange-500" />
      <span className="font-medium">Server Status</span>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
        <div className="text-lg font-bold">99.9%</div>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">Load</div>
        <div className="text-lg font-bold">0.45</div>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">Services</div>
        <div className="text-lg font-bold">8/8</div>
      </div>
    </div>
  </div>
);

const CloudRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Cloud className="w-5 h-5 text-blue-500" />
      <span className="font-medium">Cloud Infrastructure</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Instances</div>
        <div className="text-xl font-bold">24</div>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Cost</div>
        <div className="text-xl font-bold">$2,456</div>
      </div>
    </div>
  </div>
);

const SecurityRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Shield className="w-5 h-5 text-green-500" />
      <span className="font-medium">Security Status</span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Threats Blocked</div>
        <div className="text-xl font-bold">1,234</div>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Compliance</div>
        <div className="text-xl font-bold">98%</div>
      </div>
    </div>
  </div>
);

// UI Component Renderers
const ButtonRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex gap-2">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Primary Button
      </button>
      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        Secondary Button
      </button>
    </div>
  </div>
);

const DropdownRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <option>Select an option...</option>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
  </div>
);

const InputRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <input
      type="text"
      placeholder="Enter text..."
      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
    />
  </div>
);

const ToggleRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="relative inline-block w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full">
        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300">Toggle Switch</span>
    </div>
  </div>
);

const SliderRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="px-4">
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  </div>
);

const CheckboxRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <span className="text-sm text-gray-700 dark:text-gray-300">Checkbox Option</span>
    </div>
  </div>
);

const RadioRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="radio-group"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">Option 1</span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="radio-group"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">Option 2</span>
      </div>
    </div>
  </div>
);

const SelectRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <option>Choose an option...</option>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
  </div>
);

const TextareaRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <textarea
      placeholder="Enter your message..."
      rows={4}
      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
    />
  </div>
);

const ModalRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Modal Content</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">This is a modal dialog component.</p>
    </div>
  </div>
);

const TooltipRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="inline-block p-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg">
      Hover me for tooltip
    </div>
  </div>
);

const PopoverRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="inline-block p-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
      Click me for popover
    </div>
  </div>
);

// Data Component Renderers
const TableRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">John Doe</td>
            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">john@example.com</td>
            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Admin</td>
          </tr>
          <tr>
            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Jane Smith</td>
            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">jane@example.com</td>
            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">User</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const ListRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">List Item 1</div>
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">List Item 2</div>
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">List Item 3</div>
    </div>
  </div>
);

const GridRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">Item 1</div>
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">Item 2</div>
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">Item 3</div>
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">Item 4</div>
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">Item 5</div>
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">Item 6</div>
    </div>
  </div>
);

const CardRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Card Title</h4>
      <p className="text-gray-600 dark:text-gray-400 mb-4">This is a card component with content.</p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Action
      </button>
    </div>
  </div>
);

const AccordionRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white">Accordion Item 1</h4>
      </div>
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-400">Accordion content goes here.</p>
      </div>
    </div>
  </div>
);

const TabsRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="flex space-x-8">
        <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium">
          Tab 1
        </button>
        <button className="py-2 px-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          Tab 2
        </button>
        <button className="py-2 px-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          Tab 3
        </button>
      </div>
    </div>
    <div className="p-4">
      <p className="text-gray-600 dark:text-gray-400">Tab content goes here.</p>
    </div>
  </div>
);

const StepperRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
        <div className="w-16 h-1 bg-blue-500"></div>
      </div>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
        <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">3</div>
      </div>
    </div>
  </div>
);

const BreadcrumbRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Home</a>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Category</a>
        </li>
        <li className="text-gray-400">/</li>
        <li className="text-gray-900 dark:text-white font-medium">Current Page</li>
      </ol>
    </nav>
  </div>
);

// Media Component Renderers
const ImageRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      <Image className="w-12 h-12 text-gray-400" />
      <span className="ml-2 text-gray-500 dark:text-gray-400">Image Placeholder</span>
    </div>
  </div>
);

const VideoRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      <Video className="w-12 h-12 text-gray-400" />
      <span className="ml-2 text-gray-500 dark:text-gray-400">Video Player</span>
    </div>
  </div>
);

const AudioRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <Music className="w-8 h-8 text-gray-400" />
      <span className="ml-2 text-gray-500 dark:text-gray-400">Audio Player</span>
    </div>
  </div>
);

const GalleryRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <Image className="w-6 h-6 text-gray-400" />
        </div>
      ))}
    </div>
  </div>
);

const CarouselRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <Play className="w-12 h-12 text-gray-400" />
        <span className="ml-2 text-gray-500 dark:text-gray-400">Carousel</span>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
    </div>
  </div>
);

const LightboxRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
      <Eye className="w-12 h-12 text-gray-400" />
      <span className="ml-2 text-gray-500 dark:text-gray-400">Lightbox</span>
    </div>
  </div>
);

// Navigation Component Renderers
const NavbarRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="w-full h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-between px-4">
      <div className="font-semibold text-gray-900 dark:text-white">Logo</div>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Home</a>
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</a>
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</a>
      </div>
    </div>
  </div>
);

const SidebarRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="w-64 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      <div className="space-y-2">
        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded text-sm">Menu Item 1</div>
        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded text-sm">Menu Item 2</div>
        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded text-sm">Menu Item 3</div>
      </div>
    </div>
  </div>
);

const MenuRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <span className="text-sm text-gray-700 dark:text-gray-300">Menu Trigger</span>
    </div>
  </div>
);

const PaginationRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-center space-x-2">
      <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm">Previous</button>
      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</button>
      <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm">2</button>
      <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm">3</button>
      <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm">Next</button>
    </div>
  </div>
);

const StepsRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
        <div className="w-16 h-1 bg-blue-500"></div>
      </div>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
        <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">3</div>
      </div>
    </div>
  </div>
);

const AnchorRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <a href="#section1" className="block text-blue-600 dark:text-blue-400 hover:underline">Section 1</a>
      <a href="#section2" className="block text-blue-600 dark:text-blue-400 hover:underline">Section 2</a>
      <a href="#section3" className="block text-blue-600 dark:text-blue-400 hover:underline">Section 3</a>
    </div>
  </div>
);

// Form Component Renderers
const FormRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
        <input type="text" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input type="email" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Submit
      </button>
    </div>
  </div>
);

const FieldRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Field Label</label>
      <input type="text" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
    </div>
  </div>
);

const ValidationRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div>
      <input type="text" className="w-full p-2 border border-red-300 dark:border-red-600 rounded-lg bg-white dark:bg-gray-800" />
      <p className="text-sm text-red-600 dark:text-red-400 mt-1">This field is required</p>
    </div>
  </div>
);

const UploadRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
      <Upload className="w-8 h-8 text-gray-400" />
      <span className="ml-2 text-gray-500 dark:text-gray-400">Drop files here or click to upload</span>
    </div>
  </div>
);

const DatePickerRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-between">
      <span className="text-gray-500 dark:text-gray-400">Select date...</span>
      <Calendar className="w-4 h-4 text-gray-400" />
    </div>
  </div>
);

const TimePickerRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-between">
      <span className="text-gray-500 dark:text-gray-400">Select time...</span>
      <Clock className="w-4 h-4 text-gray-400" />
    </div>
  </div>
);

const ColorPickerRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-500 rounded border border-gray-300 dark:border-gray-600"></div>
      <span className="text-sm text-gray-700 dark:text-gray-300">#3B82F6</span>
    </div>
  </div>
);

const RatingRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-5 h-5 ${star <= 3 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
      ))}
    </div>
  </div>
);

// Layout Component Renderers
const ContainerRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <p className="text-center text-gray-600 dark:text-gray-400">Container Content</p>
    </div>
  </div>
);

const FlexRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">Item 1</div>
      <div className="p-2 bg-green-100 dark:bg-green-900 rounded">Item 2</div>
      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded">Item 3</div>
    </div>
  </div>
);

const GridLayoutRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">Grid Item 1</div>
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">Grid Item 2</div>
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">Grid Item 3</div>
    </div>
  </div>
);

const SpacerRenderer = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <p className="text-center text-gray-600 dark:text-gray-400">Content above spacer</p>
    </div>
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <p className="text-center text-gray-600 dark:text-gray-400">Content below spacer</p>
    </div>
  </div>
);

// Missing icon imports
const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Radio = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Menu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const PanelLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
  </svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const Palette = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
  </svg>
);

const Box = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const Layout = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18M21 9H3" />
  </svg>
);

const Minus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);
