/**
 * UI Elements Filter
 * Page filter for showing UI elements like buttons, badges, chips, etc.
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Palette, 
  Search, 
  Filter,
  Copy,
  Eye,
  Settings,
  Check,
  X,
  AlertCircle,
  Info,
  Star,
  Heart,
  ThumbsUp,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Home,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Globe,
  Link,
  ExternalLink,
  Lock,
  Unlock,
  EyeOff,
  Shield,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  SignalLow,
  SignalHigh,
  Bluetooth,
  BluetoothOff,
  Camera,
  Video,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Server,
  Database,
  HardDrive,
  Cpu,
  MemoryStick,
  Wrench,
  Settings2,
  Cog,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Power,
  PowerOff,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume1,
  Maximize,
  Minimize,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  RefreshCw,
  RefreshCcw,
  Undo,
  Redo,
  Save,
  Folder,
  FolderOpen,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileSpreadsheet,
  FileArchive,
  FileCheck,
  FileX,
  FilePlus,
  FileMinus,
  FileEdit,
  FileSearch,
  FolderPlus,
  FolderMinus,
  FolderEdit,
  FolderSearch,
  Archive,
  ArchiveRestore,
  Trash,
  Recycle
} from 'lucide-react'

interface UIElement {
  id: string
  name: string
  category: string
  component: React.ComponentType<any>
  description: string
  usage: string
  props: Array<{
    name: string
    type: string
    description: string
    required: boolean
    default?: any
  }>
  examples: Array<{
    title: string
    code: string
    preview: React.ReactNode
  }>
}

interface UIElementsFilterProps {
  className?: string
}

export function UIElementsFilter({ className }: UIElementsFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedElement, setSelectedElement] = useState<UIElement | null>(null)
  const [showCode, setShowCode] = useState(false)

  const categories = [
    'All',
    'Buttons',
    'Badges',
    'Chips',
    'Inputs',
    'Cards',
    'Navigation',
    'Feedback',
    'Icons',
    'Layout',
    'Typography',
    'Forms',
    'Data Display',
    'Overlays',
    'Media',
    'Charts',
    'Tables',
    'Lists',
    'Menus',
    'Dialogs',
    'Tooltips',
    'Popovers',
    'Modals',
    'Drawers',
    'Tabs',
    'Accordions',
    'Carousels',
    'Sliders',
    'Progress',
    'Spinners',
    'Alerts',
    'Notifications',
    'Toasts',
    'Breadcrumbs',
    'Pagination',
    'Steppers',
    'Timelines',
    'Calendars',
    'Date Pickers',
    'Time Pickers',
    'Color Pickers',
    'File Uploaders',
    'Image Galleries',
    'Video Players',
    'Audio Players',
    'Maps',
    'Charts',
    'Graphs',
    'Dashboards',
    'Widgets',
    'Panels',
    'Sidebars',
    'Headers',
    'Footers',
    'Heroes',
    'Features',
    'Testimonials',
    'Pricing',
    'Contact',
    'About',
    'Blog',
    'News',
    'Events',
    'Products',
    'Services',
    'Portfolio',
    'Gallery',
    'FAQ',
    'Help',
    'Support',
    'Documentation',
    'API',
    'SDK',
    'Tools',
    'Utilities',
    'Helpers',
    'Mixins',
    'Functions',
    'Hooks',
    'Contexts',
    'Providers',
    'Stores',
    'Actions',
    'Reducers',
    'Selectors',
    'Middleware',
    'Plugins',
    'Extensions',
    'Themes',
    'Styles',
    'Animations',
    'Transitions',
    'Effects',
    'Filters',
    'Blurs',
    'Shadows',
    'Gradients',
    'Patterns',
    'Textures',
    'Borders',
    'Radius',
    'Spacing',
    'Sizing',
    'Positioning',
    'Display',
    'Flexbox',
    'Grid',
    'Float',
    'Clear',
    'Overflow',
    'Visibility',
    'Opacity',
    'Z-Index',
    'Transform',
    'Transition',
    'Animation',
    'Keyframes',
    'Timing',
    'Easing',
    'Duration',
    'Delay',
    'Iteration',
    'Direction',
    'Fill',
    'Play',
    'Pause',
    'Reverse',
    'Alternate',
    'Infinite',
    'Forwards',
    'Backwards',
    'Both',
    'None',
    'Auto',
    'Initial',
    'Inherit',
    'Unset',
    'Revert',
    'Revert-Layer',
    'All',
    'None',
    'Auto',
    'Initial',
    'Inherit',
    'Unset',
    'Revert',
    'Revert-Layer'
  ]

  const uiElements: UIElement[] = [
    {
      id: 'button',
      name: 'Button',
      category: 'Buttons',
      component: Button,
      description: 'Interactive button component with multiple variants and sizes',
      usage: 'Use for actions, navigation, and user interactions',
      props: [
        { name: 'variant', type: 'string', description: 'Button style variant', required: false, default: 'default' },
        { name: 'size', type: 'string', description: 'Button size', required: false, default: 'default' },
        { name: 'disabled', type: 'boolean', description: 'Disable button', required: false, default: false }
      ],
      examples: [
        {
          title: 'Default Button',
          code: '<Button>Click me</Button>',
          preview: <Button>Click me</Button>
        },
        {
          title: 'Variant Button',
          code: '<Button variant="destructive">Delete</Button>',
          preview: <Button variant="destructive">Delete</Button>
        }
      ]
    },
    {
      id: 'badge',
      name: 'Badge',
      category: 'Badges',
      component: Badge,
      description: 'Small status indicator or label',
      usage: 'Use for status, categories, or small labels',
      props: [
        { name: 'variant', type: 'string', description: 'Badge style variant', required: false, default: 'default' },
        { name: 'size', type: 'string', description: 'Badge size', required: false, default: 'default' }
      ],
      examples: [
        {
          title: 'Default Badge',
          code: '<Badge>New</Badge>',
          preview: <Badge>New</Badge>
        },
        {
          title: 'Variant Badge',
          code: '<Badge variant="destructive">Error</Badge>',
          preview: <Badge variant="destructive">Error</Badge>
        }
      ]
    }
  ]

  const filteredElements = uiElements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         element.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || element.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <span>UI Elements Filter</span>
        </CardTitle>
        <CardDescription>
          Browse and filter UI elements like buttons, badges, chips, and more
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search UI elements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Elements List */}
          <div className="space-y-3">
            <h3 className="font-medium">UI Elements ({filteredElements.length})</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredElements.map(element => (
                <div
                  key={element.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedElement?.id === element.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedElement(element)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{element.name}</h4>
                        <Badge variant="outline" className="text-xs">{element.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{element.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{element.props.length} props</span>
                        <span>•</span>
                        <span>{element.examples.length} examples</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Element Details */}
          <div className="space-y-4">
            {selectedElement ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{selectedElement.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCode(!showCode)}
                    >
                      {showCode ? <Eye className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                      {showCode ? 'Preview' : 'Code'}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedElement.description}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Usage</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedElement.usage}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Props</Label>
                    <div className="space-y-2 mt-2">
                      {selectedElement.props.map(prop => (
                        <div key={prop.name} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <span className="font-mono text-sm">{prop.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">({prop.type})</span>
                            {prop.required && <Badge variant="destructive" className="text-xs ml-2">Required</Badge>}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {prop.default !== undefined ? `default: ${prop.default}` : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Examples</Label>
                    <div className="space-y-3 mt-2">
                      {selectedElement.examples.map((example, index) => (
                        <div key={index} className="border rounded p-3">
                          <h5 className="font-medium text-sm mb-2">{example.title}</h5>
                          {showCode ? (
                            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto">
                              {example.code}
                            </pre>
                          ) : (
                            <div className="p-2 border rounded bg-background">
                              {example.preview}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a UI element to view details</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

UIElementsFilter.metadata = {
  name: 'UIElementsFilter',
  label: 'UI Elements Filter',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Page filter for showing UI elements like buttons, badges, chips, and more',
  phase: 'Core',
  category: 'UI Tools',
  tags: ['UI', 'Elements', 'Filter', 'Components', 'Design']
}
