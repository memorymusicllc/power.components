/**
 * Sale Processor Component
 * Phase 2: Automation
 * Process completed sales and transactions
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags phase2,automation,sales,transactions
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Receipt, DollarSign, Package, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface SaleProcessorProps {
  onSaleProcessed?: (sale: any) => void
  loading?: boolean
}

export function SaleProcessor({ onSaleProcessed, loading }: SaleProcessorProps) {
  const [sales, setSales] = useState([
    {
      id: 1,
      buyer: 'John Smith',
      item: '48V DC Mini Split AC',
      amount: 1000,
      status: 'completed',
      platform: 'Facebook',
      date: '2025-10-07',
      paymentMethod: 'Cash',
      shipping: 'Local Pickup'
    },
    {
      id: 2,
      buyer: 'Sarah Johnson',
      item: 'Professional Tools Set',
      amount: 750,
      status: 'shipped',
      platform: 'eBay',
      date: '2025-10-06',
      paymentMethod: 'PayPal',
      shipping: 'Standard Shipping'
    },
    {
      id: 3,
      buyer: 'Mike Wilson',
      item: 'Vintage Camera',
      amount: 400,
      status: 'pending',
      platform: 'Craigslist',
      date: '2025-10-05',
      paymentMethod: 'Cash',
      shipping: 'Local Pickup'
    }
  ])

  const [stats, setStats] = useState({
    totalRevenue: 2150,
    completedSales: 1,
    pendingSales: 1,
    shippedSales: 1
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500'
      case 'shipped': return 'text-blue-500'
      case 'pending': return 'text-yellow-500'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'shipped': return <Package className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const updateSaleStatus = (id: number, newStatus: string) => {
    setSales(prev => prev.map(sale => 
      sale.id === id ? { ...sale, status: newStatus } : sale
    ))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Receipt className="w-5 h-5 text-green-500" />
            <CardTitle>Sale Processor</CardTitle>
          </div>
          <Badge variant="outline">Phase 2</Badge>
        </div>
        <CardDescription>
          Process completed sales and transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sales Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-green-500/10 text-center">
            <div className="text-2xl font-bold text-green-500">${stats.totalRevenue}</div>
            <div className="text-xs text-muted-foreground">Total Revenue</div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.completedSales}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.shippedSales}</div>
            <div className="text-xs text-muted-foreground">Shipped</div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 text-center">
            <div className="text-2xl font-bold text-yellow-500">{stats.pendingSales}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>

        {/* Sales List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Recent Sales</h4>
            <Button size="sm" variant="outline">
              <DollarSign className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
          
          <div className="space-y-3">
            {sales.map((sale) => (
              <div key={sale.id} className="p-4 rounded-lg border space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-bold">{sale.buyer[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{sale.buyer}</p>
                      <p className="text-sm text-muted-foreground">{sale.item}</p>
                      <p className="text-xs text-muted-foreground">{sale.platform} • {sale.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <p className="font-bold text-lg">${sale.amount}</p>
                      <p className="text-xs text-muted-foreground">{sale.paymentMethod}</p>
                    </div>
                    <div className={`flex items-center space-x-1 ${getStatusColor(sale.status)}`}>
                      {getStatusIcon(sale.status)}
                    </div>
                  </div>
                </div>

                {/* Sale Details */}
                <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Payment Method</p>
                    <p className="text-sm font-medium">{sale.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Shipping</p>
                    <p className="text-sm font-medium">{sale.shipping}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <Badge variant={sale.status === 'completed' ? 'default' : sale.status === 'shipped' ? 'secondary' : 'outline'}>
                    {sale.status}
                  </Badge>
                  
                  <div className="flex space-x-2">
                    {sale.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateSaleStatus(sale.id, 'shipped')}
                        >
                          <Package className="w-4 h-4 mr-1" />
                          Mark Shipped
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => updateSaleStatus(sale.id, 'completed')}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                      </>
                    )}
                    {sale.status === 'shipped' && (
                      <Button 
                        size="sm"
                        onClick={() => updateSaleStatus(sale.id, 'completed')}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Complete
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
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
              <Receipt className="w-4 h-4 mr-2" />
              Generate Invoice
            </Button>
            <Button size="sm" variant="outline" className="justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Revenue Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

SaleProcessor.metadata = {
  name: "SaleProcessor",
  label: "Sale Processor",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Process completed sales and transactions",
  phase: "Phase 2",
  category: "Automation",
  tags: ["phase2", "automation", "sales", "transactions", "revenue"]
}
