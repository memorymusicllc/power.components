/**
 * Negotiation Manager Component
 * Phase 2: Automation
 * Manage price negotiations and offers
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags phase2,automation,negotiation,offers
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Handshake, DollarSign, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react'

interface NegotiationManagerProps {
  onNegotiationUpdate?: (negotiation: any) => void
  loading?: boolean
}

export function NegotiationManager({ onNegotiationUpdate, loading }: NegotiationManagerProps) {
  const [negotiations, setNegotiations] = useState([
    {
      id: 1,
      buyer: 'John Smith',
      item: '48V DC Mini Split AC',
      originalPrice: 1200,
      currentOffer: 1000,
      status: 'active',
      messages: 3,
      timeLeft: '2 days',
      platform: 'Facebook'
    },
    {
      id: 2,
      buyer: 'Sarah Johnson',
      item: 'Professional Tools Set',
      originalPrice: 800,
      currentOffer: 750,
      status: 'accepted',
      messages: 5,
      timeLeft: 'Completed',
      platform: 'eBay'
    },
    {
      id: 3,
      buyer: 'Mike Wilson',
      item: 'Vintage Camera',
      originalPrice: 500,
      currentOffer: 400,
      status: 'declined',
      messages: 2,
      timeLeft: 'Expired',
      platform: 'Craigslist'
    }
  ])

  const [newOffer, setNewOffer] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-500'
      case 'accepted': return 'text-green-500'
      case 'declined': return 'text-red-500'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />
      case 'accepted': return <CheckCircle className="w-4 h-4" />
      case 'declined': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const handleCounterOffer = (id: number) => {
    if (!newOffer) return
    
    setNegotiations(prev => prev.map(neg => 
      neg.id === id 
        ? { ...neg, currentOffer: parseInt(newOffer), messages: neg.messages + 1 }
        : neg
    ))
    setNewOffer('')
  }

  const handleAccept = (id: number) => {
    setNegotiations(prev => prev.map(neg => 
      neg.id === id 
        ? { ...neg, status: 'accepted', timeLeft: 'Completed' }
        : neg
    ))
  }

  const handleDecline = (id: number) => {
    setNegotiations(prev => prev.map(neg => 
      neg.id === id 
        ? { ...neg, status: 'declined', timeLeft: 'Expired' }
        : neg
    ))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Handshake className="w-5 h-5 text-green-500" />
            <CardTitle>Negotiation Manager</CardTitle>
          </div>
          <Badge variant="outline">Phase 2</Badge>
        </div>
        <CardDescription>
          Manage price negotiations and offers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Negotiation Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10 text-center">
            <div className="text-2xl font-bold text-blue-500">
              {negotiations.filter(n => n.status === 'active').length}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 text-center">
            <div className="text-2xl font-bold text-green-500">
              {negotiations.filter(n => n.status === 'accepted').length}
            </div>
            <div className="text-xs text-muted-foreground">Accepted</div>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 text-center">
            <div className="text-2xl font-bold text-red-500">
              {negotiations.filter(n => n.status === 'declined').length}
            </div>
            <div className="text-xs text-muted-foreground">Declined</div>
          </div>
        </div>

        {/* Negotiations List */}
        <div className="space-y-4">
          <h4 className="font-medium">Active Negotiations</h4>
          {negotiations.map((negotiation) => (
            <div key={negotiation.id} className="p-4 rounded-lg border space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-bold">{negotiation.buyer[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium">{negotiation.buyer}</p>
                    <p className="text-sm text-muted-foreground">{negotiation.item}</p>
                    <p className="text-xs text-muted-foreground">{negotiation.platform}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{negotiation.status}</Badge>
                  <div className={`flex items-center space-x-1 ${getStatusColor(negotiation.status)}`}>
                    {getStatusIcon(negotiation.status)}
                  </div>
                </div>
              </div>

              {/* Price Information */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Original</p>
                  <p className="font-bold">${negotiation.originalPrice}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Current Offer</p>
                  <p className="font-bold text-blue-500">${negotiation.currentOffer}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Difference</p>
                  <p className="font-bold text-red-500">
                    -${negotiation.originalPrice - negotiation.currentOffer}
                  </p>
                </div>
              </div>

              {/* Negotiation Actions */}
              {negotiation.status === 'active' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Counter offer amount"
                      value={newOffer}
                      onChange={(e) => setNewOffer(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      size="sm"
                      onClick={() => handleCounterOffer(negotiation.id)}
                      disabled={!newOffer}
                    >
                      <DollarSign className="w-4 h-4 mr-1" />
                      Counter
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Textarea
                      placeholder="Add a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      <span>{negotiation.messages} messages</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{negotiation.timeLeft}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDecline(negotiation.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleAccept(negotiation.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Completed Negotiation Info */}
              {negotiation.status !== 'active' && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-muted-foreground">
                      Final Price: <span className="font-bold">${negotiation.currentOffer}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Messages: {negotiation.messages}
                    </span>
                  </div>
                  <Badge variant={negotiation.status === 'accepted' ? 'default' : 'destructive'}>
                    {negotiation.status}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

NegotiationManager.metadata = {
  name: "NegotiationManager",
  label: "Negotiation Manager",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Manage price negotiations and offers",
  phase: "Phase 2",
  category: "Automation",
  tags: ["phase2", "automation", "negotiation", "offers", "pricing"]
}
