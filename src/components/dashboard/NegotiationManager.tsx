/**
 * Negotiation Manager Component - Phase 2 Core
 * Handles price negotiation, meetup scheduling, and sale processing
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import React, { useEffect, useState } from 'react'
import { useNegotiationStore } from '@/lib/stores/negotiation.store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Handshake, 
  DollarSign, 
  Calendar, 
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Target,
  Zap,
  Settings
} from 'lucide-react'

export function NegotiationManager() {
  const {
    activeNegotiations,
    completedNegotiations,
    strategies,
    transactions,
    metrics,
    loading,
    negotiating,
    processing,
    fetchNegotiations,
    fetchStrategies,
    fetchTransactions,
    startNegotiation,
    makeOffer,
    acceptOffer,
    rejectOffer,
    scheduleMeetup,
    confirmMeetup,
    cancelMeetup,
    createTransaction,
    updatePaymentStatus,
    scheduleDelivery,
    completeTransaction,
    refreshAll
  } = useNegotiationStore()

  const [activeTab, setActiveTab] = useState('active')
  const [selectedNegotiation, setSelectedNegotiation] = useState<string | null>(null)

  useEffect(() => {
    refreshAll()
  }, [])

  const handleStartNegotiation = async () => {
    try {
      const negotiationId = await startNegotiation('lead-001', 'listing-001', 4200)
      console.log('Started negotiation:', negotiationId)
    } catch (error) {
      console.error('Failed to start negotiation:', error)
    }
  }

  const handleMakeOffer = async (negotiationId: string, amount: number) => {
    try {
      await makeOffer(negotiationId, amount, `I can offer $${amount} for this item.`)
    } catch (error) {
      console.error('Failed to make offer:', error)
    }
  }

  const handleScheduleMeetup = async (negotiationId: string) => {
    try {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      await scheduleMeetup(
        negotiationId,
        tomorrow.toISOString().split('T')[0],
        '14:00',
        'Police Station Parking Lot, Mid-Wilshire'
      )
    } catch (error) {
      console.error('Failed to schedule meetup:', error)
    }
  }

  const handleCreateTransaction = async (negotiationId: string) => {
    try {
      const transactionId = await createTransaction(negotiationId, 4000, 'cash')
      console.log('Created transaction:', transactionId)
    } catch (error) {
      console.error('Failed to create transaction:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'accepted': return 'default'
      case 'rejected': return 'destructive'
      case 'expired': return 'secondary'
      case 'cancelled': return 'outline'
      default: return 'outline'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'pending': return 'secondary'
      case 'failed': return 'destructive'
      case 'refunded': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Negotiation Manager</h2>
          <p className="text-muted-foreground">Price negotiation, meetup scheduling, and sale processing</p>
          </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={refreshAll} disabled={loading}>
            <TrendingUp className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleStartNegotiation} disabled={negotiating}>
            <Handshake className="w-4 h-4 mr-2" />
            Start Negotiation
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Negotiations</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalNegotiations}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.successfulNegotiations} successful
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.totalNegotiations > 0 ? Math.round((metrics.successfulNegotiations / metrics.totalNegotiations) * 100) : 0}%
            </div>
            <Progress 
              value={metrics.totalNegotiations > 0 ? (metrics.successfulNegotiations / metrics.totalNegotiations) * 100 : 0} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Negotiation Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics.averageNegotiationTime / 60)}m</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(metrics.averagePriceReduction)}% avg reduction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetup Conversion</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics.meetupConversionRate * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(metrics.paymentSuccessRate * 100)}% payment success
            </p>
          </CardContent>
        </Card>
        </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active ({activeNegotiations.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedNegotiations.length})</TabsTrigger>
          <TabsTrigger value="strategies">Strategies ({strategies.length})</TabsTrigger>
          <TabsTrigger value="transactions">Transactions ({transactions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {activeNegotiations.map((negotiation) => (
              <Card key={negotiation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                  <div>
                      <CardTitle className="text-base">Negotiation {negotiation.id}</CardTitle>
                      <CardDescription>
                        Lead {negotiation.leadId} • Listing {negotiation.listingId} • 
                        Started: {new Date(negotiation.startedAt).toLocaleString()}
                      </CardDescription>
                  </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(negotiation.status)}>
                        {negotiation.status}
                      </Badge>
                      <div className="text-right">
                        <div className="text-lg font-bold">${negotiation.currentPrice}</div>
                        <div className="text-sm text-muted-foreground">
                          Target: ${negotiation.targetPrice}
                  </div>
                </div>
              </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Price Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Price Negotiation</span>
                        <span>${negotiation.initialPrice} → ${negotiation.currentPrice}</span>
                      </div>
                      <Progress 
                        value={((negotiation.initialPrice - negotiation.currentPrice) / negotiation.initialPrice) * 100} 
                        className="h-2" 
                    />
                  </div>
                  
                    {/* Offers */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Recent Offers:</div>
                      {negotiation.offers.slice(-3).map((offer) => (
                        <div key={offer.id} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">${offer.amount}</span>
                            <Badge variant={offer.from === 'buyer' ? 'secondary' : 'default'}>
                              {offer.from}
                            </Badge>
                            {offer.accepted && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(offer.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Meetup Info */}
                    {negotiation.meetupScheduled && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Meetup Scheduled</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>Date: {negotiation.meetupScheduled.date}</div>
                          <div>Time: {negotiation.meetupScheduled.time}</div>
                          <div>Location: {negotiation.meetupScheduled.location}</div>
                          <div className="flex items-center gap-2">
                            <Badge variant={negotiation.meetupScheduled.confirmed ? 'default' : 'secondary'}>
                              {negotiation.meetupScheduled.confirmed ? 'Confirmed' : 'Pending'}
                            </Badge>
                            {negotiation.meetupScheduled.reminderSent && (
                              <Badge variant="outline">Reminder Sent</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleMakeOffer(negotiation.id, negotiation.currentPrice - 100)}
                      >
                        <DollarSign className="w-4 h-4 mr-1" />
                        Make Offer
                      </Button>
                      {!negotiation.meetupScheduled && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleScheduleMeetup(negotiation.id)}
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          Schedule Meetup
                        </Button>
                      )}
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleCreateTransaction(negotiation.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Create Transaction
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
                </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedNegotiations.map((negotiation) => (
              <Card key={negotiation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Negotiation {negotiation.id}</CardTitle>
                      <CardDescription>
                        {negotiation.status} • 
                        Completed: {negotiation.completedAt ? new Date(negotiation.completedAt).toLocaleString() : 'N/A'}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(negotiation.status)}>
                        {negotiation.status}
                      </Badge>
                      <div className="text-right">
                        <div className="text-lg font-bold">${negotiation.currentPrice}</div>
                        <div className="text-sm text-muted-foreground">
                          Final price
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <strong>Duration:</strong> {Math.round((new Date(negotiation.completedAt || negotiation.lastActivity).getTime() - new Date(negotiation.startedAt).getTime()) / (1000 * 60 * 60))} hours
                    </div>
                    <div className="text-sm">
                      <strong>Offers:</strong> {negotiation.offers.length} total
                    </div>
                    <div className="text-sm">
                      <strong>Price Reduction:</strong> ${negotiation.initialPrice - negotiation.currentPrice} (${Math.round(((negotiation.initialPrice - negotiation.currentPrice) / negotiation.initialPrice) * 100)}%)
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Negotiation Strategies</h3>
            <Button>
              <Target className="w-4 h-4 mr-2" />
              New Strategy
            </Button>
          </div>

          <div className="grid gap-4">
            {strategies.map((strategy) => (
              <Card key={strategy.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{strategy.name}</CardTitle>
                      <CardDescription>
                        {strategy.conditions.competitionLevel} competition • 
                        {strategy.tactics.maxDiscount}% max discount
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={strategy.isActive ? 'default' : 'outline'}>
                        {strategy.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">{Math.round(strategy.successRate * 100)}%</div>
                        <div className="text-xs text-muted-foreground">Success rate</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <strong>Conditions:</strong> Price ${strategy.conditions.listingPrice[0]}-${strategy.conditions.listingPrice[1]}, 
                      Score {strategy.conditions.leadScore[0]}-{strategy.conditions.leadScore[1]}
                    </div>
                    <div className="text-sm">
                      <strong>Tactics:</strong> {strategy.tactics.initialDiscount}% initial discount, 
                      {strategy.tactics.discountSteps.length} steps, 
                      {strategy.tactics.timePressure ? 'Time pressure' : 'No pressure'}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Used {strategy.usageCount} times
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Zap className="w-4 h-4 mr-1" />
                          Test
                        </Button>
                      </div>
                </div>
            </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Sale Transactions</h3>
            <Button>
              <DollarSign className="w-4 h-4 mr-2" />
              New Transaction
            </Button>
          </div>

          <div className="grid gap-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Transaction {transaction.id}</CardTitle>
                      <CardDescription>
                        ${transaction.finalPrice} • {transaction.paymentMethod} • 
                        Created: {new Date(transaction.createdAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPaymentStatusColor(transaction.paymentStatus)}>
                        {transaction.paymentStatus}
                      </Badge>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <strong>Payment:</strong> ${transaction.paymentDetails.amount} 
                      {transaction.paymentDetails.fees > 0 && ` (${transaction.paymentDetails.fees} fees)`}
                      {transaction.paymentDetails.transactionId && ` • ID: ${transaction.paymentDetails.transactionId}`}
                    </div>
                    <div className="text-sm">
                      <strong>Delivery:</strong> {transaction.delivery.method}
                      {transaction.delivery.scheduledDate && ` • Scheduled: ${transaction.delivery.scheduledDate}`}
                      {transaction.delivery.trackingNumber && ` • Tracking: ${transaction.delivery.trackingNumber}`}
                    </div>
                    <div className="text-sm">
                      <strong>Documentation:</strong> 
                      {transaction.documentation.receiptGenerated && ' Receipt'}
                      {transaction.documentation.contractGenerated && ' Contract'}
                      {transaction.documentation.invoiceGenerated && ' Invoice'}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Net: ${transaction.paymentDetails.netAmount}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                        <Button size="sm" variant="outline">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Payment
                        </Button>
                      </div>
                    </div>
        </div>
      </CardContent>
    </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}