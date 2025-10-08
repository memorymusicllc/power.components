/**
 * Lead Monitor Component
 * Phase 2: Automation
 * Monitor and track leads across platforms
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags phase2,automation,leads,monitoring
 */

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { MessageSquare, Users, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface LeadMonitorProps {
  onLeadsChange?: (leads: any[]) => void
  loading?: boolean
}

export function LeadMonitor({ onLeadsChange, loading }: LeadMonitorProps) {
  const [leads, setLeads] = useState<any[]>([])
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    responded: 0,
    converted: 0
  })

  // Mock leads data
  useEffect(() => {
    const mockLeads = [
      {
        id: 1,
        name: 'John Smith',
        platform: 'Facebook',
        message: 'Is this still available?',
        status: 'new',
        priority: 'high',
        time: '5 minutes ago',
        responseTime: null
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        platform: 'eBay',
        message: 'What is the condition?',
        status: 'responded',
        priority: 'medium',
        time: '2 hours ago',
        responseTime: '1 hour ago'
      },
      {
        id: 3,
        name: 'Mike Wilson',
        platform: 'Craigslist',
        message: 'Can you deliver?',
        status: 'converted',
        priority: 'high',
        time: '1 day ago',
        responseTime: '1 day ago'
      },
      {
        id: 4,
        name: 'Lisa Brown',
        platform: 'OfferUp',
        message: 'Price negotiable?',
        status: 'new',
        priority: 'low',
        time: '3 hours ago',
        responseTime: null
      }
    ]
    setLeads(mockLeads)
    
    // Calculate stats
    setStats({
      total: mockLeads.length,
      new: mockLeads.filter(l => l.status === 'new').length,
      responded: mockLeads.filter(l => l.status === 'responded').length,
      converted: mockLeads.filter(l => l.status === 'converted').length
    })
  }, [])

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true
    return lead.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-500'
      case 'responded': return 'text-yellow-500'
      case 'converted': return 'text-green-500'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />
      case 'responded': return <MessageSquare className="w-4 h-4" />
      case 'converted': return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'outline'
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-500" />
            <CardTitle>Lead Monitor</CardTitle>
          </div>
          <Badge variant="outline">Phase 2</Badge>
        </div>
        <CardDescription>
          Monitor and track leads across platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Lead Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total Leads</div>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.new}</div>
            <div className="text-xs text-muted-foreground">New</div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 text-center">
            <div className="text-2xl font-bold text-yellow-500">{stats.responded}</div>
            <div className="text-xs text-muted-foreground">Responded</div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.converted}</div>
            <div className="text-xs text-muted-foreground">Converted</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Filter:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="responded">Responded</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Leads List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Leads ({filteredLeads.length})</h4>
            <Button size="sm" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-bold">{lead.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.platform} • {lead.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityColor(lead.priority)}>
                      {lead.priority}
                    </Badge>
                    <div className={`flex items-center space-x-1 ${getStatusColor(lead.status)}`}>
                      {getStatusIcon(lead.status)}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">"{lead.message}"</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {lead.status}
                    </Badge>
                    {lead.responseTime && (
                      <span className="text-xs text-muted-foreground">
                        Responded {lead.responseTime}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 rounded-lg bg-muted/50">
          <h4 className="font-medium mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Auto-Reply Setup
            </Button>
            <Button size="sm" variant="outline" className="justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Lead Analytics
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

LeadMonitor.metadata = {
  name: "LeadMonitor",
  label: "Lead Monitor",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Monitor and track leads across platforms",
  phase: "Phase 2",
  category: "Automation",
  tags: ["phase2", "automation", "leads", "monitoring", "tracking"]
}
