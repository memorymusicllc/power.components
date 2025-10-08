/**
 * Price Researcher Component
 * Phase 1: Content & Setup
 * Research and analyze competitive pricing
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags phase1,content,pricing,research
 */

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { TrendingUp, Search, DollarSign, BarChart3, AlertCircle } from 'lucide-react'

interface PriceResearcherProps {
  onPriceData?: (data: any) => void
  loading?: boolean
}

export function PriceResearcher({ onPriceData, loading }: PriceResearcherProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [marketplace, setMarketplace] = useState('all')
  const [priceData, setPriceData] = useState<any[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [recommendation, setRecommendation] = useState<any>(null)

  // Mock price research data
  const mockPriceData = [
    { platform: 'eBay', price: 1250, condition: 'Used', seller: 'TechDeals', rating: 4.8 },
    { platform: 'Facebook', price: 1100, condition: 'Like New', seller: 'LocalSeller', rating: 4.5 },
    { platform: 'Craigslist', price: 1350, condition: 'New', seller: 'RetailStore', rating: 4.9 },
    { platform: 'Amazon', price: 1400, condition: 'New', seller: 'OfficialStore', rating: 4.7 },
    { platform: 'OfferUp', price: 1200, condition: 'Used', seller: 'QuickSale', rating: 4.3 }
  ]

  const handleResearch = async () => {
    if (!searchQuery.trim()) return
    
    setAnalyzing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const filteredData = mockPriceData.filter(item => 
      marketplace === 'all' || item.platform.toLowerCase() === marketplace.toLowerCase()
    )
    
    setPriceData(filteredData)
    
    // Calculate recommendation
    const prices = filteredData.map(item => item.price)
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    
    setRecommendation({
      average: avgPrice,
      min: minPrice,
      max: maxPrice,
      suggested: Math.round(avgPrice * 0.9), // 10% below average
      confidence: 85
    })
    
    setAnalyzing(false)
    
    if (onPriceData) {
      onPriceData({ prices: filteredData, recommendation })
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <CardTitle>Price Researcher</CardTitle>
          </div>
          <Badge variant="outline">Phase 1</Badge>
        </div>
        <CardDescription>
          Research competitive pricing across marketplaces
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Controls */}
        <div className="space-y-3">
          <div className="flex space-x-2">
            <Input
              placeholder="Search for similar products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleResearch}
              disabled={!searchQuery.trim() || analyzing}
            >
              {analyzing ? (
                <>
                  <Search className="w-4 h-4 mr-2 animate-spin" />
                  Researching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Research
                </>
              )}
            </Button>
          </div>
          
          <Select value={marketplace} onValueChange={setMarketplace}>
            <SelectTrigger>
              <SelectValue placeholder="All Marketplaces" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Marketplaces</SelectItem>
              <SelectItem value="ebay">eBay</SelectItem>
              <SelectItem value="facebook">Facebook Marketplace</SelectItem>
              <SelectItem value="craigslist">Craigslist</SelectItem>
              <SelectItem value="amazon">Amazon</SelectItem>
              <SelectItem value="offerup">OfferUp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Analysis Results */}
        {priceData.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-green-500" />
              <h4 className="font-medium">Price Analysis</h4>
            </div>
            
            {/* Price List */}
            <div className="space-y-2">
              {priceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">{item.platform}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.condition} • {item.seller} • ⭐ {item.rating}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        {recommendation && (
          <div className="p-4 rounded-lg bg-muted/50 space-y-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <h4 className="font-medium">Pricing Recommendation</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Average Price</p>
                <p className="font-bold">${Math.round(recommendation.average)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Suggested Price</p>
                <p className="font-bold text-green-600">${recommendation.suggested}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Price Range</p>
                <p className="font-bold">${recommendation.min} - ${recommendation.max}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Confidence</p>
                <p className="font-bold">{recommendation.confidence}%</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

PriceResearcher.metadata = {
  name: "PriceResearcher",
  label: "Price Researcher",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Research competitive pricing across marketplaces",
  phase: "Phase 1",
  category: "Content & Setup",
  tags: ["phase1", "content", "pricing", "research", "analysis"]
}
