/**
 * Response Templates Manager
 * Admin card for managing response and message templates
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
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Search,
  Tag,
  Send,
  Save,
  X,
  Eye
} from 'lucide-react'

interface ResponseTemplate {
  id: string
  name: string
  description: string
  category: string
  content: string
  variables: string[]
  isActive: boolean
  isAutoResponse: boolean
  triggerKeywords: string[]
  createdAt: string
  updatedAt: string
  usageCount: number
}

interface ResponseTemplatesManagerProps {
  className?: string
}

export function ResponseTemplatesManager({ className }: ResponseTemplatesManagerProps) {
  const [templates, setTemplates] = useState<ResponseTemplate[]>([
    {
      id: '1',
      name: 'Welcome Message',
      description: 'Initial welcome message for new leads',
      category: 'Lead Management',
      content: 'Hi {leadName}, thank you for your interest in {productName}! I\'m excited to help you find the perfect solution. When would be a good time to discuss your needs?',
      variables: ['leadName', 'productName'],
      isActive: true,
      isAutoResponse: true,
      triggerKeywords: ['hello', 'hi', 'interested', 'price'],
      createdAt: '2025-10-01',
      updatedAt: '2025-10-08',
      usageCount: 67
    },
    {
      id: '2',
      name: 'Price Inquiry Response',
      description: 'Professional response to price inquiries',
      category: 'Sales',
      content: 'Thank you for asking about pricing for {productName}. The current price is {price}, but I can offer you a special discount of {discountPercent}% if you\'re ready to move forward. Would you like to schedule a call to discuss further?',
      variables: ['productName', 'price', 'discountPercent'],
      isActive: true,
      isAutoResponse: false,
      triggerKeywords: ['price', 'cost', 'how much'],
      createdAt: '2025-10-02',
      updatedAt: '2025-10-07',
      usageCount: 34
    },
    {
      id: '3',
      name: 'Follow-up Message',
      description: 'Follow-up message for leads who haven\'t responded',
      category: 'Lead Management',
      content: 'Hi {leadName}, I wanted to follow up on your interest in {productName}. I understand you might be busy, but I\'d love to answer any questions you might have. Is there a better time to connect?',
      variables: ['leadName', 'productName'],
      isActive: true,
      isAutoResponse: false,
      triggerKeywords: ['follow-up', 'reminder'],
      createdAt: '2025-10-03',
      updatedAt: '2025-10-06',
      usageCount: 28
    },
    {
      id: '4',
      name: 'Objection Handling',
      description: 'Response to common objections',
      category: 'Sales',
      content: 'I understand your concern about {objection}. Let me address that: {objectionResponse}. Many of our customers had similar concerns initially, but they found that {benefit}. Would you like to hear more about how this could work for you?',
      variables: ['objection', 'objectionResponse', 'benefit'],
      isActive: false,
      isAutoResponse: false,
      triggerKeywords: ['too expensive', 'not interested', 'maybe later'],
      createdAt: '2025-10-04',
      updatedAt: '2025-10-05',
      usageCount: 15
    }
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<ResponseTemplate | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const categories = ['All', 'Lead Management', 'Sales', 'Customer Service', 'Marketing', 'Follow-up']

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleCreateTemplate = () => {
    const newTemplate: ResponseTemplate = {
      id: Date.now().toString(),
      name: 'New Response Template',
      description: 'Template description',
      category: 'Lead Management',
      content: 'Enter your response template here...',
      variables: [],
      isActive: true,
      isAutoResponse: false,
      triggerKeywords: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      usageCount: 0
    }
    setTemplates(prev => [...prev, newTemplate])
    setSelectedTemplate(newTemplate)
    setIsEditing(true)
  }

  const handleEditTemplate = (template: ResponseTemplate) => {
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

  const handleCopyTemplate = (template: ResponseTemplate) => {
    const copiedTemplate: ResponseTemplate = {
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
          <MessageSquare className="w-5 h-5" />
          <span>Response Templates Manager</span>
        </CardTitle>
        <CardDescription>
          Create and manage response templates for automated and manual messaging
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search response templates..."
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
            <h3 className="font-medium">Response Templates ({filteredTemplates.length})</h3>
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
                        {template.isAutoResponse && (
                          <Badge variant="secondary" className="text-xs">Auto</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{template.category}</span>
                        <span>•</span>
                        <span>{template.usageCount} uses</span>
                        <span>•</span>
                        <span>{template.variables.length} variables</span>
                        {template.triggerKeywords.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{template.triggerKeywords.length} triggers</span>
                          </>
                        )}
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
                  <h3 className="font-medium">Edit Response Template</h3>
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
                    <Label htmlFor="template-content">Response Content</Label>
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
                      placeholder="Enter your response template here. Use {variableName} for variables."
                    />
                  </div>

                  <div>
                    <Label htmlFor="trigger-keywords">Trigger Keywords (comma-separated)</Label>
                    <Input
                      id="trigger-keywords"
                      value={selectedTemplate.triggerKeywords.join(', ')}
                      onChange={(e) => setSelectedTemplate(prev => 
                        prev ? { 
                          ...prev, 
                          triggerKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                        } : null
                      )}
                      disabled={!isEditing}
                      placeholder="price, cost, interested, hello"
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

                  <Separator />

                  <div className="space-y-3">
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="template-auto">Auto Response</Label>
                      <Switch
                        id="template-auto"
                        checked={selectedTemplate.isAutoResponse}
                        onCheckedChange={(checked) => setSelectedTemplate(prev => 
                          prev ? { ...prev, isAutoResponse: checked } : null
                        )}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a response template to edit or create a new one</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

ResponseTemplatesManager.metadata = {
  name: 'ResponseTemplatesManager',
  label: 'Response Templates Manager',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Admin card for managing response and message templates for automated and manual messaging',
  phase: 'Core',
  category: 'Admin Tools',
  tags: ['Admin', 'Templates', 'Responses', 'Messages', 'Management']
}
