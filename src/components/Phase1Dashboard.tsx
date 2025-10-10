/**
 * Phase 1 Complete Dashboard
 * Content & Setup - All Phase 1 Features Integrated
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @phase Phase1
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Image, 
  DollarSign, 
  Sparkles, 
  Globe, 
  Calendar,
  CheckCircle
} from 'lucide-react'

// Phase 1 Components
import { ItemDetailsCollector } from '@/components/dashboard/ItemDetailsCollector'
import { PhotoProcessor } from '@/components/dashboard/PhotoProcessor'
import { PriceResearcher } from '@/components/dashboard/PriceResearcher'
import { ContentGenerator } from '@/components/dashboard/ContentGenerator'
import { PlatformSelector } from '@/components/dashboard/PlatformSelector'
import { PostingStrategy } from '@/components/dashboard/PostingStrategy'

export function Phase1Dashboard() {
  const completionStatus = {
    itemDetails: 80,
    photos: 60,
    pricing: 75,
    content: 90,
    platforms: 85,
    strategy: 70
  }

  const overallCompletion = Math.round(
    Object.values(completionStatus).reduce((a, b) => a + b, 0) / Object.keys(completionStatus).length
  )

  return (
    <div className="space-y-6">
      {/* Phase 1 Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Phase 1: Content & Setup
          </h2>
          <p className="text-muted-foreground mt-1">
            Complete product setup and optimization for multi-platform selling
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-blue-600 border-blue-600">
          <CheckCircle className="w-4 h-4 mr-2" />
          {overallCompletion}% Complete
        </Badge>
      </div>

      {/* Completion Progress Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-bold text-blue-600">{completionStatus.itemDetails}%</span>
          </div>
          <h3 className="font-semibold text-sm">Item Details</h3>
          <div className="mt-2 h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500" 
              style={{ width: `${completionStatus.itemDetails}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
          <div className="flex items-center justify-between mb-2">
            <Image className="w-5 h-5 text-purple-600" />
            <span className="text-xs font-bold text-purple-600">{completionStatus.photos}%</span>
          </div>
          <h3 className="font-semibold text-sm">Photos</h3>
          <div className="mt-2 h-1 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-500" 
              style={{ width: `${completionStatus.photos}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-xs font-bold text-green-600">{completionStatus.pricing}%</span>
          </div>
          <h3 className="font-semibold text-sm">Pricing</h3>
          <div className="mt-2 h-1 bg-green-200 dark:bg-green-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 transition-all duration-500" 
              style={{ width: `${completionStatus.pricing}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <span className="text-xs font-bold text-orange-600">{completionStatus.content}%</span>
          </div>
          <h3 className="font-semibold text-sm">Content</h3>
          <div className="mt-2 h-1 bg-orange-200 dark:bg-orange-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-600 transition-all duration-500" 
              style={{ width: `${completionStatus.content}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-5 h-5 text-pink-600" />
            <span className="text-xs font-bold text-pink-600">{completionStatus.platforms}%</span>
          </div>
          <h3 className="font-semibold text-sm">Platforms</h3>
          <div className="mt-2 h-1 bg-pink-200 dark:bg-pink-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-pink-600 transition-all duration-500" 
              style={{ width: `${completionStatus.platforms}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/20 dark:to-cyan-900/20">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-cyan-600" />
            <span className="text-xs font-bold text-cyan-600">{completionStatus.strategy}%</span>
          </div>
          <h3 className="font-semibold text-sm">Strategy</h3>
          <div className="mt-2 h-1 bg-cyan-200 dark:bg-cyan-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-600 transition-all duration-500" 
              style={{ width: `${completionStatus.strategy}%` }}
            />
          </div>
        </div>
      </div>

      {/* Phase 1 Feature Tabs */}
      <Tabs defaultValue="item-details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="item-details" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Details</span>
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Photos</span>
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span className="hidden sm:inline">Pricing</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="platforms" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Platforms</span>
          </TabsTrigger>
          <TabsTrigger value="strategy" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Strategy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="item-details" className="space-y-6">
          <ItemDetailsCollector />
        </TabsContent>

        <TabsContent value="photos" className="space-y-6">
          <PhotoProcessor />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <PriceResearcher />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentGenerator />
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <PlatformSelector />
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <PostingStrategy />
        </TabsContent>
      </Tabs>
    </div>
  )
}
