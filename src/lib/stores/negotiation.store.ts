/**
 * Negotiation Store - Phase 2 Core
 * Handles price negotiation, meetup scheduling, and sale processing
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import { create } from 'zustand'
import { api } from '@/lib/api-client'

export interface NegotiationSession {
  id: string
  leadId: string
  listingId: string
  initialPrice: number
  currentPrice: number
  targetPrice: number
  status: 'active' | 'accepted' | 'rejected' | 'expired' | 'cancelled'
  offers: Array<{
    id: string
    amount: number
    from: 'buyer' | 'seller'
    timestamp: string
    message?: string
    accepted: boolean
  }>
  meetupScheduled?: {
    date: string
    time: string
    location: string
    confirmed: boolean
    reminderSent: boolean
  }
  paymentMethod?: 'cash' | 'venmo' | 'paypal' | 'zelle' | 'other'
  notes: string[]
  startedAt: string
  lastActivity: string
  completedAt?: string
}

export interface NegotiationStrategy {
  id: string
  name: string
  conditions: {
    listingPrice: [number, number]
    leadScore: [number, number]
    timeOnMarket: [number, number]
    competitionLevel: 'low' | 'medium' | 'high'
  }
  tactics: {
    initialDiscount: number
    maxDiscount: number
    discountSteps: number[]
    timePressure: boolean
    scarcityMessage: boolean
    bundleOffers: boolean
  }
  isActive: boolean
  successRate: number
  usageCount: number
}

export interface SaleTransaction {
  id: string
  negotiationId: string
  leadId: string
  listingId: string
  finalPrice: number
  paymentMethod: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentDetails: {
    transactionId?: string
    amount: number
    fees: number
    netAmount: number
    currency: string
    timestamp?: string
  }
  delivery: {
    method: 'pickup' | 'delivery' | 'shipping'
    scheduledDate?: string
    completedDate?: string
    trackingNumber?: string
    deliveryAddress?: string
  }
  documentation: {
    receiptGenerated: boolean
    receiptUrl?: string
    contractGenerated: boolean
    contractUrl?: string
    invoiceGenerated: boolean
    invoiceUrl?: string
  }
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'disputed'
  createdAt: string
  updatedAt: string
}

export interface NegotiationMetrics {
  totalNegotiations: number
  successfulNegotiations: number
  averageNegotiationTime: number
  averagePriceReduction: number
  meetupConversionRate: number
  paymentSuccessRate: number
  strategyEffectiveness: Record<string, number>
  lastUpdated: string
}

interface NegotiationState {
  // Negotiation data
  activeNegotiations: NegotiationSession[]
  completedNegotiations: NegotiationSession[]
  strategies: NegotiationStrategy[]
  
  // Sales data
  transactions: SaleTransaction[]
  
  // Metrics
  metrics: NegotiationMetrics
  
  // Loading states
  loading: boolean
  negotiating: boolean
  processing: boolean
  
  // Actions
  fetchNegotiations: () => Promise<void>
  startNegotiation: (leadId: string, listingId: string, initialPrice: number) => Promise<string>
  makeOffer: (negotiationId: string, amount: number, message?: string) => Promise<void>
  acceptOffer: (negotiationId: string, offerId: string) => Promise<void>
  rejectOffer: (negotiationId: string, offerId: string, reason?: string) => Promise<void>
  
  // Meetup scheduling
  scheduleMeetup: (negotiationId: string, date: string, time: string, location: string) => Promise<void>
  confirmMeetup: (negotiationId: string) => Promise<void>
  cancelMeetup: (negotiationId: string, reason: string) => Promise<void>
  
  // Strategy management
  fetchStrategies: () => Promise<void>
  createStrategy: (strategy: Omit<NegotiationStrategy, 'id' | 'successRate' | 'usageCount'>) => Promise<void>
  updateStrategy: (id: string, updates: Partial<NegotiationStrategy>) => Promise<void>
  deleteStrategy: (id: string) => Promise<void>
  
  // Sale processing
  fetchTransactions: () => Promise<void>
  createTransaction: (negotiationId: string, finalPrice: number, paymentMethod: string) => Promise<string>
  updatePaymentStatus: (transactionId: string, status: SaleTransaction['paymentStatus']) => Promise<void>
  scheduleDelivery: (transactionId: string, method: string, date?: string, address?: string) => Promise<void>
  completeTransaction: (transactionId: string) => Promise<void>
  
  // Documentation
  generateReceipt: (transactionId: string) => Promise<string>
  generateContract: (transactionId: string) => Promise<string>
  generateInvoice: (transactionId: string) => Promise<string>
  
  // Metrics
  fetchMetrics: () => Promise<void>
  refreshAll: () => Promise<void>
}

export const useNegotiationStore = create<NegotiationState>((set, get) => ({
  // Initial state
  activeNegotiations: [],
  completedNegotiations: [],
  strategies: [],
  transactions: [],
  metrics: {
    totalNegotiations: 0,
    successfulNegotiations: 0,
    averageNegotiationTime: 0,
    averagePriceReduction: 0,
    meetupConversionRate: 0,
    paymentSuccessRate: 0,
    strategyEffectiveness: {},
    lastUpdated: new Date().toISOString()
  },
  loading: false,
  negotiating: false,
  processing: false,

  // Negotiation management
  fetchNegotiations: async () => {
    set({ loading: true })
    try {
      const response = await api.getNegotiations()
      const negotiations = Array.isArray(response.data) ? response.data : []
      
      set({
        activeNegotiations: negotiations.filter(n => n.status === 'active'),
        completedNegotiations: negotiations.filter(n => n.status !== 'active'),
        loading: false
      })
    } catch (error) {
      console.error('Failed to fetch negotiations:', error)
      set({ loading: false })
    }
  },

  startNegotiation: async (leadId, listingId, initialPrice) => {
    set({ negotiating: true })
    try {
      const newNegotiation = {
        id: `negotiation-${Date.now()}`,
        leadId,
        listingId,
        initialPrice,
        currentPrice: initialPrice,
        targetPrice: initialPrice * 0.9, // 10% discount target
        status: 'active' as const,
        offers: [],
        notes: [],
        startedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      }
      
      const response = await api.createNegotiation(newNegotiation)
      set(state => ({
        activeNegotiations: [...state.activeNegotiations, response.data],
        negotiating: false
      }))
      
      return response.data.id
    } catch (error) {
      console.error('Failed to start negotiation:', error)
      set({ negotiating: false })
      throw error
    }
  },

  makeOffer: async (negotiationId, amount, message) => {
    try {
      const newOffer = {
        id: `offer-${Date.now()}`,
        amount,
        from: 'seller' as const,
        timestamp: new Date().toISOString(),
        message,
        accepted: false
      }
      
      const response = await api.makeNegotiationOffer(negotiationId, newOffer)
      
      set(state => ({
        activeNegotiations: state.activeNegotiations.map(negotiation => 
          negotiation.id === negotiationId 
            ? { 
                ...negotiation, 
                offers: [...negotiation.offers, response.data],
                currentPrice: amount,
                lastActivity: new Date().toISOString()
              }
            : negotiation
        )
      }))
    } catch (error) {
      console.error('Failed to make offer:', error)
    }
  },

  acceptOffer: async (negotiationId, offerId) => {
    try {
      const response = await api.acceptNegotiationOffer(negotiationId, offerId)
      
      set(state => ({
        activeNegotiations: state.activeNegotiations.map(negotiation => 
          negotiation.id === negotiationId 
            ? { 
                ...negotiation, 
                status: 'accepted' as const,
                offers: negotiation.offers.map(offer => 
                  offer.id === offerId ? { ...offer, accepted: true } : offer
                ),
                lastActivity: new Date().toISOString(),
                completedAt: new Date().toISOString()
              }
            : negotiation
        )
      }))
    } catch (error) {
      console.error('Failed to accept offer:', error)
    }
  },

  rejectOffer: async (negotiationId, offerId, reason) => {
    try {
      const response = await api.rejectNegotiationOffer(negotiationId, offerId, reason)
      
      set(state => ({
        activeNegotiations: state.activeNegotiations.map(negotiation => 
          negotiation.id === negotiationId 
            ? { 
                ...negotiation, 
                offers: negotiation.offers.map(offer => 
                  offer.id === offerId ? { ...offer, accepted: false } : offer
                ),
                lastActivity: new Date().toISOString()
              }
            : negotiation
        )
      }))
    } catch (error) {
      console.error('Failed to reject offer:', error)
    }
  },

  // Meetup scheduling
  scheduleMeetup: async (negotiationId, date, time, location) => {
    try {
      const meetupData = {
        date,
        time,
        location,
        confirmed: false,
        reminderSent: false
      }
      
      const response = await api.scheduleNegotiationMeetup(negotiationId, meetupData)
      
      set(state => ({
        activeNegotiations: state.activeNegotiations.map(negotiation => 
          negotiation.id === negotiationId 
            ? { 
                ...negotiation, 
                meetupScheduled: response.data,
                lastActivity: new Date().toISOString()
              }
            : negotiation
        )
      }))
    } catch (error) {
      console.error('Failed to schedule meetup:', error)
    }
  },

  confirmMeetup: async (negotiationId) => {
    try {
      const response = await api.confirmNegotiationMeetup(negotiationId)
      
      set(state => ({
        activeNegotiations: state.activeNegotiations.map(negotiation => 
          negotiation.id === negotiationId 
            ? { 
                ...negotiation, 
                meetupScheduled: negotiation.meetupScheduled ? {
                  ...negotiation.meetupScheduled,
                  confirmed: true
                } : undefined,
                lastActivity: new Date().toISOString()
              }
            : negotiation
        )
      }))
    } catch (error) {
      console.error('Failed to confirm meetup:', error)
    }
  },

  cancelMeetup: async (negotiationId, reason) => {
    try {
      const response = await api.cancelNegotiationMeetup(negotiationId, reason)
      
      set(state => ({
        activeNegotiations: state.activeNegotiations.map(negotiation => 
          negotiation.id === negotiationId 
            ? { 
                ...negotiation, 
                meetupScheduled: undefined,
                lastActivity: new Date().toISOString()
              }
            : negotiation
        )
      }))
    } catch (error) {
      console.error('Failed to cancel meetup:', error)
    }
  },

  // Strategy management
  fetchStrategies: async () => {
    try {
      const response = await api.getNegotiationStrategies()
      set({ strategies: Array.isArray(response.data) ? response.data : [] })
    } catch (error) {
      console.error('Failed to fetch negotiation strategies:', error)
    }
  },

  createStrategy: async (strategyData) => {
    try {
      const newStrategy = {
        ...strategyData,
        id: `strategy-${Date.now()}`,
        successRate: 0,
        usageCount: 0
      }
      
      const response = await api.createNegotiationStrategy(newStrategy)
      set(state => ({
        strategies: [...state.strategies, response.data]
      }))
    } catch (error) {
      console.error('Failed to create negotiation strategy:', error)
    }
  },

  updateStrategy: async (id, updates) => {
    try {
      const response = await api.updateNegotiationStrategy(id, updates)
      set(state => ({
        strategies: state.strategies.map(strategy => 
          strategy.id === id ? { ...strategy, ...response.data } : strategy
        )
      }))
    } catch (error) {
      console.error('Failed to update negotiation strategy:', error)
    }
  },

  deleteStrategy: async (id) => {
    try {
      await api.deleteNegotiationStrategy(id)
      set(state => ({
        strategies: state.strategies.filter(strategy => strategy.id !== id)
      }))
    } catch (error) {
      console.error('Failed to delete negotiation strategy:', error)
    }
  },

  // Sale processing
  fetchTransactions: async () => {
    try {
      const response = await api.getSaleTransactions()
      set({ transactions: Array.isArray(response.data) ? response.data : [] })
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    }
  },

  createTransaction: async (negotiationId, finalPrice, paymentMethod) => {
    set({ processing: true })
    try {
      const newTransaction = {
        id: `transaction-${Date.now()}`,
        negotiationId,
        leadId: '', // Will be filled from negotiation
        listingId: '', // Will be filled from negotiation
        finalPrice,
        paymentMethod,
        paymentStatus: 'pending' as const,
        paymentDetails: {
          amount: finalPrice,
          fees: 0,
          netAmount: finalPrice,
          currency: 'USD'
        },
        delivery: {
          method: 'pickup' as const
        },
        documentation: {
          receiptGenerated: false,
          contractGenerated: false,
          invoiceGenerated: false
        },
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const response = await api.createSaleTransaction(newTransaction)
      set(state => ({
        transactions: [...state.transactions, response.data],
        processing: false
      }))
      
      return response.data.id
    } catch (error) {
      console.error('Failed to create transaction:', error)
      set({ processing: false })
      throw error
    }
  },

  updatePaymentStatus: async (transactionId, status) => {
    try {
      const response = await api.updateTransactionPaymentStatus(transactionId, status)
      set(state => ({
        transactions: state.transactions.map(transaction => 
          transaction.id === transactionId ? { ...transaction, ...response.data } : transaction
        )
      }))
    } catch (error) {
      console.error('Failed to update payment status:', error)
    }
  },

  scheduleDelivery: async (transactionId, method, date, address) => {
    try {
      const deliveryData = {
        method,
        scheduledDate: date,
        deliveryAddress: address
      }
      
      const response = await api.scheduleTransactionDelivery(transactionId, deliveryData)
      set(state => ({
        transactions: state.transactions.map(transaction => 
          transaction.id === transactionId ? { ...transaction, ...response.data } : transaction
        )
      }))
    } catch (error) {
      console.error('Failed to schedule delivery:', error)
    }
  },

  completeTransaction: async (transactionId) => {
    try {
      const response = await api.completeSaleTransaction(transactionId)
      set(state => ({
        transactions: state.transactions.map(transaction => 
          transaction.id === transactionId ? { ...transaction, ...response.data } : transaction
        )
      }))
    } catch (error) {
      console.error('Failed to complete transaction:', error)
    }
  },

  // Documentation
  generateReceipt: async (transactionId) => {
    try {
      const response = await api.generateTransactionReceipt(transactionId)
      set(state => ({
        transactions: state.transactions.map(transaction => 
          transaction.id === transactionId 
            ? { 
                ...transaction, 
                documentation: {
                  ...transaction.documentation,
                  receiptGenerated: true,
                  receiptUrl: response.data.url
                }
              }
            : transaction
        )
      }))
      return response.data.url
    } catch (error) {
      console.error('Failed to generate receipt:', error)
      throw error
    }
  },

  generateContract: async (transactionId) => {
    try {
      const response = await api.generateTransactionContract(transactionId)
      set(state => ({
        transactions: state.transactions.map(transaction => 
          transaction.id === transactionId 
            ? { 
                ...transaction, 
                documentation: {
                  ...transaction.documentation,
                  contractGenerated: true,
                  contractUrl: response.data.url
                }
              }
            : transaction
        )
      }))
      return response.data.url
    } catch (error) {
      console.error('Failed to generate contract:', error)
      throw error
    }
  },

  generateInvoice: async (transactionId) => {
    try {
      const response = await api.generateTransactionInvoice(transactionId)
      set(state => ({
        transactions: state.transactions.map(transaction => 
          transaction.id === transactionId 
            ? { 
                ...transaction, 
                documentation: {
                  ...transaction.documentation,
                  invoiceGenerated: true,
                  invoiceUrl: response.data.url
                }
              }
            : transaction
        )
      }))
      return response.data.url
    } catch (error) {
      console.error('Failed to generate invoice:', error)
      throw error
    }
  },

  // Metrics
  fetchMetrics: async () => {
    try {
      const response = await api.getNegotiationMetrics()
      set({ metrics: response.data })
    } catch (error) {
      console.error('Failed to fetch negotiation metrics:', error)
    }
  },

  refreshAll: async () => {
    await Promise.all([
      get().fetchNegotiations(),
      get().fetchStrategies(),
      get().fetchTransactions(),
      get().fetchMetrics()
    ])
  }
}))
