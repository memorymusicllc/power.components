/**
 * Platform Selector Component
 * Phase 1: Content & Setup
 * Select and configure marketplace platforms
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags phase1,content,platform,marketplace
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Checkbox } from '../ui/checkbox'
import { Switch } from '../ui/switch'
import { Settings, Globe, Users, DollarSign, TrendingUp } from 'lucide-react'

interface PlatformSelectorProps {
  onPlatformsChange?: (platforms: any[]) => void
  loading?: boolean
}

export function PlatformSelector({ onPlatformsChange, loading }: PlatformSelectorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [platformSettings, setPlatformSettings] = useState<Record<string, any>>({})

  const platforms = [
    {
      id: 'ebay',
      name: 'eBay',
      icon: '🛒',
      description: 'Global marketplace with auction and fixed-price options',
      fees: '10-15%',
      audience: 'Global',
      features: ['Auctions', 'Fixed Price', 'International Shipping', 'Seller Protection']
    },
    {
      id: 'facebook',
      name: 'Facebook Marketplace',
      icon: '📘',
      description: 'Local marketplace integrated with Facebook',
      fees: 'Free',
      audience: 'Local',
      features: ['Local Pickup', 'No Fees', 'Social Integration', 'Messaging']
    },
    {
      id: 'craigslist',
      name: 'Craigslist',
      icon: '📋',
      description: 'Classified ads platform for local sales',
      fees: 'Free',
      audience: 'Local',
      features: ['Local Only', 'No Fees', 'Simple Posting', 'Direct Contact']
    },
    {
      id: 'amazon',
      name: 'Amazon',
      icon: '📦',
      description: 'Global e-commerce platform',
      fees: '15-20%',
      audience: 'Global',
      features: ['FBA', 'Prime', 'Global Reach', 'Fulfillment']
    },
    {
      id: 'offerup',
      name: 'OfferUp',
      icon: '📱',
      description: 'Mobile-first marketplace for local sales',
      fees: 'Free',
      audience: 'Local',
      features: ['Mobile App', 'Local Focus', 'No Fees', 'Instant Messaging']
    }
  ]

  const togglePlatform = (platformId: string) => {
    const newSelection = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(id => id !== platformId)
      : [...selectedPlatforms, platformId]
    
    setSelectedPlatforms(newSelection)
    
    if (onPlatformsChange) {
      const selectedPlatformData = platforms.filter(p => newSelection.includes(p.id))
      onPlatformsChange(selectedPlatformData)
    }
  }

  const updatePlatformSetting = (platformId: string, setting: string, value: any) => {
    setPlatformSettings(prev => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        [setting]: value
      }
    }))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-orange-500" />
            <CardTitle>Platform Selector</CardTitle>
          </div>
          <Badge variant="outline">Phase 1</Badge>
        </div>
        <CardDescription>
          Select and configure marketplace platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Platform Selection */}
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div key={platform.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={platform.id}
                  checked={selectedPlatforms.includes(platform.id)}
                  onCheckedChange={() => togglePlatform(platform.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{platform.icon}</span>
                    <h4 className="font-medium">{platform.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {platform.fees}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {platform.description}
                  </p>
                  
                  {/* Platform Stats */}
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{platform.audience}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{platform.fees}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>High Reach</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Platform Features */}
              <div className="ml-6">
                <p className="text-xs font-medium text-muted-foreground mb-1">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {platform.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Platform Settings (when selected) */}
              {selectedPlatforms.includes(platform.id) && (
                <div className="ml-6 p-3 bg-muted/50 rounded-lg space-y-3">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium">Settings</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-post</span>
                      <Switch
                        checked={platformSettings[platform.id]?.autoPost || false}
                        onCheckedChange={(checked) => 
                          updatePlatformSetting(platform.id, 'autoPost', checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Notifications</span>
                      <Switch
                        checked={platformSettings[platform.id]?.notifications || true}
                        onCheckedChange={(checked) => 
                          updatePlatformSetting(platform.id, 'notifications', checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Summary */}
        {selectedPlatforms.length > 0 && (
          <div className="p-4 rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">Selected Platforms ({selectedPlatforms.length})</h4>
            <div className="flex flex-wrap gap-2">
              {selectedPlatforms.map(platformId => {
                const platform = platforms.find(p => p.id === platformId)
                return (
                  <Badge key={platformId} variant="default">
                    {platform?.icon} {platform?.name}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

PlatformSelector.metadata = {
  name: "PlatformSelector",
  label: "Platform Selector",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Select and configure marketplace platforms",
  phase: "Phase 1",
  category: "Content & Setup",
  tags: ["phase1", "content", "platform", "marketplace", "configuration"]
}
