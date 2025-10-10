/**
 * LLM Switcher Component
 * Card for changing LLM models and settings in different workflows
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Brain, 
  Settings, 
  Zap, 
  DollarSign, 
  Clock, 
  Shield,
  ChevronRight,
  Check
} from 'lucide-react'

interface LLMConfig {
  id: string
  name: string
  provider: string
  model: string
  cost: string
  speed: 'fast' | 'medium' | 'slow'
  quality: 'high' | 'medium' | 'low'
  features: string[]
  isActive: boolean
}

interface LLMSwitcherProps {
  className?: string
}

export function LLMSwitcher({ className }: LLMSwitcherProps) {
  const [selectedWorkflow, setSelectedWorkflow] = useState('content-generation')
  const [llmConfigs, setLlmConfigs] = useState<LLMConfig[]>([
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      model: 'gpt-4-turbo',
      cost: '$0.03/1K tokens',
      speed: 'medium',
      quality: 'high',
      features: ['Code Generation', 'Analysis', 'Creative Writing'],
      isActive: true
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      provider: 'Anthropic',
      model: 'claude-3-sonnet',
      cost: '$0.015/1K tokens',
      speed: 'fast',
      quality: 'high',
      features: ['Long Context', 'Analysis', 'Reasoning'],
      isActive: false
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'Google',
      model: 'gemini-pro-1.5',
      cost: '$0.01/1K tokens',
      speed: 'fast',
      quality: 'medium',
      features: ['Multimodal', 'Code', 'Translation'],
      isActive: false
    },
    {
      id: 'llama-2',
      name: 'Llama 2',
      provider: 'Meta',
      model: 'llama-2-70b',
      cost: '$0.002/1K tokens',
      speed: 'slow',
      quality: 'medium',
      features: ['Open Source', 'Customizable', 'Privacy'],
      isActive: false
    }
  ])

  const workflows = [
    { id: 'content-generation', name: 'Content Generation', icon: Brain },
    { id: 'code-generation', name: 'Code Generation', icon: Settings },
    { id: 'analysis', name: 'Data Analysis', icon: Zap },
    { id: 'translation', name: 'Translation', icon: Shield }
  ]

  const handleModelSwitch = (modelId: string) => {
    setLlmConfigs(prev => 
      prev.map(config => ({
        ...config,
        isActive: config.id === modelId
      }))
    )
  }

  const getSpeedColor = (speed: string) => {
    switch (speed) {
      case 'fast': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'slow': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5" />
          <span>LLM Model Switcher</span>
        </CardTitle>
        <CardDescription>
          Configure and switch between different LLM models for various workflows
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Workflow Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Active Workflow</Label>
          <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {workflows.map(workflow => {
                const Icon = workflow.icon
                return (
                  <SelectItem key={workflow.id} value={workflow.id}>
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{workflow.name}</span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Model Selection */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Available Models</Label>
          <div className="grid gap-3">
            {llmConfigs.map((config) => (
              <div
                key={config.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  config.isActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleModelSwitch(config.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium">{config.name}</h4>
                      {config.isActive && (
                        <Badge variant="default" className="text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <span>{config.provider}</span>
                      <span>•</span>
                      <span>{config.model}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span>{config.cost}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span className={getSpeedColor(config.speed)}>
                          {config.speed} speed
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span className={getQualityColor(config.quality)}>
                          {config.quality} quality
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {config.features.map(feature => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Advanced Settings */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Advanced Settings</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-fallback" className="text-sm">
                Auto-fallback to backup model
              </Label>
              <Switch id="auto-fallback" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="cost-optimization" className="text-sm">
                Cost optimization mode
              </Label>
              <Switch id="cost-optimization" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="quality-priority" className="text-sm">
                Quality over speed
              </Label>
              <Switch id="quality-priority" defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

LLMSwitcher.metadata = {
  name: 'LLMSwitcher',
  label: 'LLM Model Switcher',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Card for managing and switching between different LLM models and settings across workflows',
  phase: 'Core',
  category: 'LLM Management',
  tags: ['LLM', 'Models', 'Configuration', 'Workflows', 'Settings']
}
