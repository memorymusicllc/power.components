/**
 * AI Response Store - Phase 2 Core
 * Handles AI-powered auto-responses, template management, and escalation
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import { create } from 'zustand'
import { api } from '@/lib/api-client'

export interface AIResponseTemplate {
  id: string
  name: string
  category: 'greeting' | 'pricing' | 'availability' | 'negotiation' | 'meetup' | 'followup'
  triggerKeywords: string[]
  responseTemplate: string
  variables: string[]
  tone: 'professional' | 'friendly' | 'casual' | 'urgent'
  priority: number
  isActive: boolean
  usageCount: number
  successRate: number
  createdAt: string
  updatedAt: string
}

export interface AIResponseRule {
  id: string
  name: string
  conditions: {
    leadScore: [number, number]
    messageLength: [number, number]
    keywords: string[]
    platform: string[]
    timeOfDay: string[]
    dayOfWeek: string[]
  }
  actions: {
    templateId: string
    delay: number // seconds
    escalation: boolean
    followUp: boolean
  }
  isActive: boolean
  priority: number
  usageCount: number
  successRate: number
}

export interface AIResponseSession {
  id: string
  leadId: string
  messages: Array<{
    id: string
    content: string
    sender: 'user' | 'ai'
    timestamp: string
    templateId?: string
    confidence: number
  }>
  status: 'active' | 'completed' | 'escalated' | 'cancelled'
  startedAt: string
  lastActivity: string
  aiConfidence: number
  escalationReason?: string
}

export interface AIResponseMetrics {
  totalResponses: number
  successfulResponses: number
  escalatedResponses: number
  averageResponseTime: number
  averageConfidence: number
  templateUsage: Record<string, number>
  categoryBreakdown: Record<string, number>
  platformBreakdown: Record<string, number>
  lastUpdated: string
}

interface AIResponseState {
  // Templates and rules
  templates: AIResponseTemplate[]
  rules: AIResponseRule[]
  activeSessions: AIResponseSession[]
  
  // Metrics
  metrics: AIResponseMetrics
  
  // Loading states
  loading: boolean
  processing: boolean
  generating: boolean
  
  // AI Configuration
  aiConfig: {
    model: string
    temperature: number
    maxTokens: number
    confidenceThreshold: number
    escalationThreshold: number
  }
  
  // Actions
  fetchTemplates: () => Promise<void>
  createTemplate: (template: Omit<AIResponseTemplate, 'id' | 'createdAt' | 'updatedAt' | 'usageCount' | 'successRate'>) => Promise<void>
  updateTemplate: (id: string, updates: Partial<AIResponseTemplate>) => Promise<void>
  deleteTemplate: (id: string) => Promise<void>
  
  // Rules management
  fetchRules: () => Promise<void>
  createRule: (rule: Omit<AIResponseRule, 'id' | 'usageCount' | 'successRate'>) => Promise<void>
  updateRule: (id: string, updates: Partial<AIResponseRule>) => Promise<void>
  deleteRule: (id: string) => Promise<void>
  
  // AI Response generation
  generateResponse: (leadId: string, message: string, context: any) => Promise<string>
  processIncomingMessage: (leadId: string, message: string, metadata: any) => Promise<void>
  
  // Session management
  startSession: (leadId: string) => Promise<string>
  endSession: (sessionId: string, reason: 'completed' | 'escalated' | 'cancelled') => Promise<void>
  escalateSession: (sessionId: string, reason: string) => Promise<void>
  
  // Metrics
  fetchMetrics: () => Promise<void>
  refreshAll: () => Promise<void>
  
  // AI Configuration
  updateAIConfig: (config: Partial<AIResponseState['aiConfig']>) => Promise<void>
}

export const useAIResponseStore = create<AIResponseState>((set, get) => ({
  // Initial state
  templates: [],
  rules: [],
  activeSessions: [],
  metrics: {
    totalResponses: 0,
    successfulResponses: 0,
    escalatedResponses: 0,
    averageResponseTime: 0,
    averageConfidence: 0,
    templateUsage: {},
    categoryBreakdown: {},
    platformBreakdown: {},
    lastUpdated: new Date().toISOString()
  },
  loading: false,
  processing: false,
  generating: false,
  aiConfig: {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 500,
    confidenceThreshold: 0.8,
    escalationThreshold: 0.3
  },

  // Template management
  fetchTemplates: async () => {
    set({ loading: true })
    try {
      const response = await api.getAIResponseTemplates()
      set({ 
        templates: Array.isArray(response.data) ? response.data : [],
        loading: false 
      })
    } catch (error) {
      console.error('Failed to fetch AI response templates:', error)
      set({ loading: false })
    }
  },

  createTemplate: async (templateData) => {
    try {
      const newTemplate = {
        ...templateData,
        id: `template-${Date.now()}`,
        usageCount: 0,
        successRate: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const response = await api.createAIResponseTemplate(newTemplate)
      set(state => ({
        templates: [...state.templates, response.data]
      }))
    } catch (error) {
      console.error('Failed to create AI response template:', error)
    }
  },

  updateTemplate: async (id, updates) => {
    try {
      const response = await api.updateAIResponseTemplate(id, {
        ...updates,
        updatedAt: new Date().toISOString()
      })
      
      set(state => ({
        templates: state.templates.map(template => 
          template.id === id ? { ...template, ...response.data } : template
        )
      }))
    } catch (error) {
      console.error('Failed to update AI response template:', error)
    }
  },

  deleteTemplate: async (id) => {
    try {
      await api.deleteAIResponseTemplate(id)
      set(state => ({
        templates: state.templates.filter(template => template.id !== id)
      }))
    } catch (error) {
      console.error('Failed to delete AI response template:', error)
    }
  },

  // Rules management
  fetchRules: async () => {
    try {
      const response = await api.getAIResponseRules()
      set({ rules: Array.isArray(response.data) ? response.data : [] })
    } catch (error) {
      console.error('Failed to fetch AI response rules:', error)
    }
  },

  createRule: async (ruleData) => {
    try {
      const newRule = {
        ...ruleData,
        id: `rule-${Date.now()}`,
        usageCount: 0,
        successRate: 0
      }
      
      const response = await api.createAIResponseRule(newRule)
      set(state => ({
        rules: [...state.rules, response.data]
      }))
    } catch (error) {
      console.error('Failed to create AI response rule:', error)
    }
  },

  updateRule: async (id, updates) => {
    try {
      const response = await api.updateAIResponseRule(id, updates)
      set(state => ({
        rules: state.rules.map(rule => 
          rule.id === id ? { ...rule, ...response.data } : rule
        )
      }))
    } catch (error) {
      console.error('Failed to update AI response rule:', error)
    }
  },

  deleteRule: async (id) => {
    try {
      await api.deleteAIResponseRule(id)
      set(state => ({
        rules: state.rules.filter(rule => rule.id !== id)
      }))
    } catch (error) {
      console.error('Failed to delete AI response rule:', error)
    }
  },

  // AI Response generation
  generateResponse: async (leadId, message, context) => {
    set({ generating: true })
    try {
      // Find matching rules
      const matchingRules = get().rules.filter(rule => {
        if (!rule.isActive) return false
        
        const { conditions } = rule
        const { leadScore, messageLength, keywords, platform, timeOfDay, dayOfWeek } = conditions
        
        // Check conditions
        const scoreMatch = context.leadScore >= leadScore[0] && context.leadScore <= leadScore[1]
        const lengthMatch = message.length >= messageLength[0] && message.length <= messageLength[1]
        const keywordMatch = keywords.some(keyword => 
          message.toLowerCase().includes(keyword.toLowerCase())
        )
        const platformMatch = platform.includes(context.platform)
        const timeMatch = timeOfDay.includes(context.timeOfDay)
        const dayMatch = dayOfWeek.includes(context.dayOfWeek)
        
        return scoreMatch && lengthMatch && keywordMatch && platformMatch && timeMatch && dayMatch
      })
      
      if (matchingRules.length === 0) {
        throw new Error('No matching rules found')
      }
      
      // Sort by priority and select the best rule
      const bestRule = matchingRules.sort((a, b) => b.priority - a.priority)[0]
      const template = get().templates.find(t => t.id === bestRule.actions.templateId)
      
      if (!template) {
        throw new Error('Template not found')
      }
      
      // Generate AI response using the template
      const response = await api.generateAIResponse({
        templateId: template.id,
        message,
        context,
        config: get().aiConfig
      })
      
      set({ generating: false })
      return response.data.response
    } catch (error) {
      console.error('Failed to generate AI response:', error)
      set({ generating: false })
      throw error
    }
  },

  processIncomingMessage: async (leadId, message, metadata) => {
    set({ processing: true })
    try {
      // Find or create active session
      let session = get().activeSessions.find(s => s.leadId === leadId)
      if (!session) {
        const sessionId = await get().startSession(leadId)
        session = get().activeSessions.find(s => s.id === sessionId)
      }
      
      if (!session) {
        throw new Error('Failed to create session')
      }
      
      // Add user message to session
      const userMessage = {
        id: `msg-${Date.now()}`,
        content: message,
        sender: 'user' as const,
        timestamp: new Date().toISOString(),
        confidence: 1.0
      }
      
      // Update session with user message
      set(state => ({
        activeSessions: state.activeSessions.map(s => 
          s.id === session!.id 
            ? { 
                ...s, 
                messages: [...s.messages, userMessage],
                lastActivity: new Date().toISOString()
              }
            : s
        )
      }))
      
      // Generate AI response
      const context = {
        leadScore: metadata.leadScore || 50,
        platform: metadata.platform || 'unknown',
        timeOfDay: new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening',
        dayOfWeek: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()]
      }
      
      const aiResponse = await get().generateResponse(leadId, message, context)
      
      // Add AI response to session
      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        content: aiResponse,
        sender: 'ai' as const,
        timestamp: new Date().toISOString(),
        confidence: 0.9 // AI confidence score
      }
      
      set(state => ({
        activeSessions: state.activeSessions.map(s => 
          s.id === session!.id 
            ? { 
                ...s, 
                messages: [...s.messages, aiMessage],
                lastActivity: new Date().toISOString(),
                aiConfidence: aiMessage.confidence
              }
            : s
        )
      }))
      
      set({ processing: false })
    } catch (error) {
      console.error('Failed to process incoming message:', error)
      set({ processing: false })
    }
  },

  // Session management
  startSession: async (leadId) => {
    try {
      const newSession = {
        id: `session-${Date.now()}`,
        leadId,
        messages: [],
        status: 'active' as const,
        startedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        aiConfidence: 0
      }
      
      const response = await api.createAIResponseSession(newSession)
      set(state => ({
        activeSessions: [...state.activeSessions, response.data]
      }))
      
      return response.data.id
    } catch (error) {
      console.error('Failed to start AI response session:', error)
      throw error
    }
  },

  endSession: async (sessionId, reason) => {
    try {
      const response = await api.endAIResponseSession(sessionId, reason)
      set(state => ({
        activeSessions: state.activeSessions.map(session => 
          session.id === sessionId ? { ...session, ...response.data } : session
        )
      }))
    } catch (error) {
      console.error('Failed to end AI response session:', error)
    }
  },

  escalateSession: async (sessionId, reason) => {
    try {
      const response = await api.escalateAIResponseSession(sessionId, reason)
      set(state => ({
        activeSessions: state.activeSessions.map(session => 
          session.id === sessionId 
            ? { 
                ...session, 
                status: 'escalated' as const,
                escalationReason: reason,
                lastActivity: new Date().toISOString()
              }
            : session
        )
      }))
    } catch (error) {
      console.error('Failed to escalate AI response session:', error)
    }
  },

  // Metrics
  fetchMetrics: async () => {
    try {
      const response = await api.getAIResponseMetrics()
      set({ metrics: response.data })
    } catch (error) {
      console.error('Failed to fetch AI response metrics:', error)
    }
  },

  refreshAll: async () => {
    await Promise.all([
      get().fetchTemplates(),
      get().fetchRules(),
      get().fetchMetrics()
    ])
  },

  // AI Configuration
  updateAIConfig: async (config) => {
    try {
      const response = await api.updateAIConfig(config)
      set({ aiConfig: { ...get().aiConfig, ...response.data } })
    } catch (error) {
      console.error('Failed to update AI config:', error)
    }
  }
}))
