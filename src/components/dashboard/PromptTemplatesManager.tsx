/**
 * Prompt Templates Manager
 * Admin card for managing, selecting, creating, and editing prompt templates
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/design-system'
import { Button } from '@/lib/design-system'
import { Badge } from '@/lib/design-system'
import { Input } from '@/lib/design-system/form-components'
import { Textarea } from '@/lib/design-system/form-components'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/design-system/form-components'
import { Switch } from '@/lib/design-system/form-components'
import { Label } from '@/lib/design-system/form-components'
import { Separator } from '@/lib/design-system/form-components'
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Search,
  Tag,
  Settings,
  Eye,
  Save,
  X
} from 'lucide-react'

interface PromptTemplate {
  id: string
  name: string
  description: string
  category: string
  content: string
  variables: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  usageCount: number
}

interface PromptTemplatesManagerProps {
  className?: string
}

export function PromptTemplatesManager({ className }: PromptTemplatesManagerProps) {
  const [templates, setTemplates] = useState<PromptTemplate[]>([
    {
      id: '1',
      name: 'Product Description Generator',
      description: 'Generates compelling product descriptions for listings',
      category: 'Content Generation',
      content: 'Write a compelling product description for: {productName}\n\nInclude:\n- Key features: {features}\n- Target audience: {audience}\n- Price point: {price}\n- Unique selling points: {usp}',
      variables: ['productName', 'features', 'audience', 'price', 'usp'],
      isActive: true,
      createdAt: '2025-10-01',
      updatedAt: '2025-10-08',
      usageCount: 45
    },
    {
      id: '2',
      name: 'Price Negotiation Response',
      description: 'Professional responses for price negotiations',
      category: 'Negotiation',
      content: 'Thank you for your interest in {productName}. The listed price is {originalPrice}, but I can offer you {discountedPrice} if you\'re ready to move forward today. This represents a {discountPercent}% discount from the original price.',
      variables: ['productName', 'originalPrice', 'discountedPrice', 'discountPercent'],
      isActive: true,
      createdAt: '2025-10-02',
      updatedAt: '2025-10-07',
      usageCount: 23
    },
    {
      id: '3',
      name: 'Lead Qualification',
      description: 'Qualifies potential leads with targeted questions',
      category: 'Lead Management',
      content: 'Hi {leadName}, thanks for your interest in {productName}. To better assist you, could you tell me:\n1. What\'s your budget range?\n2. When are you looking to purchase?\n3. Do you have any specific requirements?',
      variables: ['leadName', 'productName'],
      isActive: false,
      createdAt: '2025-10-03',
      updatedAt: '2025-10-06',
      usageCount: 12
    }
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const categories = ['All', 'Content Generation', 'Negotiation', 'Lead Management', 'Customer Service', 'Marketing']

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleCreateTemplate = () => {
    const newTemplate: PromptTemplate = {
      id: Date.now().toString(),
      name: 'New Template',
      description: 'Template description',
      category: 'Content Generation',
      content: 'Enter your prompt template here...',
      variables: [],
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      usageCount: 0
    }
    setTemplates(prev => [...prev, newTemplate])
    setSelectedTemplate(newTemplate)
    setIsEditing(true)
  }

  const handleEditTemplate = (template: PromptTemplate) => {
    setSelectedTemplate(template)
    setIsEditing(true)
  }

  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      setTemplates(prev => 
        prev.map(t => 
          t.id === selectedTemplate.id 
            ? { ...selectedTemplate, updatedAt: new Date().toISOString().split('T')[0] }
            : t
        )
      )
      setIsEditing(false)
    }
  }

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId))
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null)
      setIsEditing(false)
    }
  }

  const handleCopyTemplate = (template: PromptTemplate) => {
    const copiedTemplate: PromptTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      usageCount: 0
    }
    setTemplates(prev => [...prev, copiedTemplate])
  }

  const extractVariables = (content: string) => {
    const variableRegex = /\{([^}]+)\}/g
    const matches = content.match(variableRegex)
    return matches ? matches.map(match => match.slice(1, -1)) : []
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Prompt Templates Manager</span>
        </CardTitle>
        <CardDescription>
          Create, edit, and manage AI prompt templates for different workflows
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search templates..."
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
          <Button onClick={handleCreateTemplate}>
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template List */}
          <div className="space-y-3">
            <h3 className="font-medium">Templates ({filteredTemplates.length})</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{template.name}</h4>
                        {template.isActive && (
                          <Badge variant="default" className="text-xs">Active</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{template.category}</span>
                        <span>•</span>
                        <span>{template.usageCount} uses</span>
                        <span>•</span>
                        <span>{template.variables.length} variables</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditTemplate(template)
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopyTemplate(template)
                        }}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteTemplate(template.id)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Editor */}
          <div className="space-y-4">
            {selectedTemplate ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Edit Template</h3>
                  <div className="flex items-center space-x-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={handleSaveTemplate}>
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(false)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={selectedTemplate.name}
                      onChange={(e) => setSelectedTemplate(prev => 
                        prev ? { ...prev, name: e.target.value } : null
                      )}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="template-description">Description</Label>
                    <Input
                      id="template-description"
                      value={selectedTemplate.description}
                      onChange={(e) => setSelectedTemplate(prev => 
                        prev ? { ...prev, description: e.target.value } : null
                      )}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="template-category">Category</Label>
                    <Select
                      value={selectedTemplate.category}
                      onValueChange={(value) => setSelectedTemplate(prev => 
                        prev ? { ...prev, category: value } : null
                      )}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="template-content">Template Content</Label>
                    <Textarea
                      id="template-content"
                      value={selectedTemplate.content}
                      onChange={(e) => {
                        const newContent = e.target.value
                        const variables = extractVariables(newContent)
                        setSelectedTemplate(prev => 
                          prev ? { ...prev, content: newContent, variables } : null
                        )
                      }}
                      disabled={!isEditing}
                      className="min-h-32 font-mono text-sm"
                      placeholder="Enter your prompt template here. Use {variableName} for variables."
                    />
                  </div>

                  <div>
                    <Label>Variables</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedTemplate.variables.map(variable => (
                        <Badge key={variable} variant="outline">
                          <Tag className="w-3 h-3 mr-1" />
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="template-active">Active</Label>
                    <Switch
                      id="template-active"
                      checked={selectedTemplate.isActive}
                      onCheckedChange={(checked) => setSelectedTemplate(prev => 
                        prev ? { ...prev, isActive: checked } : null
                      )}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a template to edit or create a new one</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

PromptTemplatesManager.metadata = {
  name: 'PromptTemplatesManager',
  label: 'Prompt Templates Manager',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Admin card for managing, selecting, creating, and editing AI prompt templates',
  phase: 'Core',
  category: 'Admin Tools',
  tags: ['Admin', 'Templates', 'Prompts', 'AI', 'Management']
}
