/**
 * Posting Strategy Component
 * Phase 1: Content & Setup
 * Configure posting schedule and strategy
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags phase1,content,strategy,scheduling
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'
import { Clock, Calendar, Target, Zap, BarChart3 } from 'lucide-react'

interface PostingStrategyProps {
  onStrategyChange?: (strategy: any) => void
  loading?: boolean
}

export function PostingStrategy({ onStrategyChange, loading }: PostingStrategyProps) {
  const [strategy, setStrategy] = useState({
    schedule: 'immediate',
    timing: 'optimal',
    reposting: true,
    repostInterval: 'weekly',
    priceStrategy: 'competitive',
    autoOptimize: true
  })

  const updateStrategy = (key: string, value: any) => {
    const newStrategy = { ...strategy, [key]: value }
    setStrategy(newStrategy)
    if (onStrategyChange) onStrategyChange(newStrategy)
  }

  const scheduleOptions = [
    { value: 'immediate', label: 'Post Immediately', description: 'Post to all platforms right away' },
    { value: 'staggered', label: 'Staggered Posting', description: 'Post to platforms over time' },
    { value: 'scheduled', label: 'Scheduled Posting', description: 'Post at specific times' }
  ]

  const timingOptions = [
    { value: 'optimal', label: 'Optimal Times', description: 'Based on platform analytics' },
    { value: 'morning', label: 'Morning (8-10 AM)', description: 'High engagement period' },
    { value: 'evening', label: 'Evening (6-8 PM)', description: 'Peak user activity' },
    { value: 'weekend', label: 'Weekend', description: 'More browsing time' }
  ]

  const priceStrategies = [
    { value: 'competitive', label: 'Competitive Pricing', description: 'Match or beat competitors' },
    { value: 'premium', label: 'Premium Pricing', description: 'Higher price for quality' },
    { value: 'auction', label: 'Auction Style', description: 'Let market decide' },
    { value: 'dynamic', label: 'Dynamic Pricing', description: 'Adjust based on demand' }
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-red-500" />
            <CardTitle>Posting Strategy</CardTitle>
          </div>
          <Badge variant="outline">Phase 1</Badge>
        </div>
        <CardDescription>
          Configure posting schedule and optimization strategy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Posting Schedule */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <h4 className="font-medium">Posting Schedule</h4>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">When to Post</label>
            <Select value={strategy.schedule} onValueChange={(v) => updateStrategy('schedule', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scheduleOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Timing Strategy</label>
            <Select value={strategy.timing} onValueChange={(v) => updateStrategy('timing', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timingOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reposting Strategy */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-500" />
            <h4 className="font-medium">Reposting Strategy</h4>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Enable Auto-Reposting</p>
              <p className="text-xs text-muted-foreground">Automatically repost listings</p>
            </div>
            <Switch
              checked={strategy.reposting}
              onCheckedChange={(checked) => updateStrategy('reposting', checked)}
            />
          </div>
          
          {strategy.reposting && (
            <div>
              <label className="text-sm font-medium mb-2 block">Repost Interval</label>
              <Select value={strategy.repostInterval} onValueChange={(v) => updateStrategy('repostInterval', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Pricing Strategy */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-purple-500" />
            <h4 className="font-medium">Pricing Strategy</h4>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Price Strategy</label>
            <Select value={strategy.priceStrategy} onValueChange={(v) => updateStrategy('priceStrategy', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceStrategies.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Optimization Settings */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <h4 className="font-medium">Optimization</h4>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Auto-Optimize Listings</p>
              <p className="text-xs text-muted-foreground">Automatically improve based on performance</p>
            </div>
            <Switch
              checked={strategy.autoOptimize}
              onCheckedChange={(checked) => updateStrategy('autoOptimize', checked)}
            />
          </div>
        </div>

        {/* Strategy Summary */}
        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <h4 className="font-medium">Strategy Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Schedule:</span>
              <span className="ml-2 font-medium">
                {scheduleOptions.find(s => s.value === strategy.schedule)?.label}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Timing:</span>
              <span className="ml-2 font-medium">
                {timingOptions.find(t => t.value === strategy.timing)?.label}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Reposting:</span>
              <span className="ml-2 font-medium">
                {strategy.reposting ? `Every ${strategy.repostInterval}` : 'Disabled'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Pricing:</span>
              <span className="ml-2 font-medium">
                {priceStrategies.find(p => p.value === strategy.priceStrategy)?.label}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

PostingStrategy.metadata = {
  name: "PostingStrategy",
  label: "Posting Strategy",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Configure posting schedule and optimization strategy",
  phase: "Phase 1",
  category: "Content & Setup",
  tags: ["phase1", "content", "strategy", "scheduling", "optimization"]
}
