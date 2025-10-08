/**
 * Content Generator Component
 * Phase 1: Content & Setup
 * AI-powered content generation for listings
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags phase1,content,ai,generation
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { FileText, Wand2, Copy, RefreshCw, Check } from 'lucide-react'

interface ContentGeneratorProps {
  onContentGenerated?: (content: any) => void
  loading?: boolean
}

export function ContentGenerator({ onContentGenerated, loading }: ContentGeneratorProps) {
  const [productInfo, setProductInfo] = useState('')
  const [tone, setTone] = useState('professional')
  const [length, setLength] = useState('medium')
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!productInfo.trim()) return
    
    setGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const content = {
      title: `Premium ${productInfo.split(' ')[0]} - Excellent Condition`,
      description: `This ${productInfo} is in excellent condition and perfect for anyone looking for quality. Features include professional-grade components and reliable performance. Well-maintained and ready for immediate use.`,
      features: [
        'Professional-grade quality',
        'Excellent condition',
        'Ready for immediate use',
        'Well-maintained',
        'Reliable performance'
      ],
      keywords: productInfo.split(' ').slice(0, 5),
      seoScore: 85
    }
    
    setGeneratedContent(content)
    setGenerating(false)
    
    if (onContentGenerated) {
      onContentGenerated(content)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wand2 className="w-5 h-5 text-purple-500" />
            <CardTitle>Content Generator</CardTitle>
          </div>
          <Badge variant="outline">Phase 1</Badge>
        </div>
        <CardDescription>
          AI-powered content generation for listings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input Controls */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Product Information</label>
            <Textarea
              placeholder="Describe your product (e.g., 48V DC Mini Split Air Conditioner, 12,000 BTU, like new condition)"
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Length</label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="long">Long</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!productInfo.trim() || generating}
            className="w-full"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Generated Content</h4>
              <Badge variant="secondary">SEO Score: {generatedContent.seoScore}%</Badge>
            </div>
            
            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Title</label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(generatedContent.title)}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <div className="p-3 rounded-lg border bg-muted/50">
                <p className="font-medium">{generatedContent.title}</p>
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Description</label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(generatedContent.description)}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <div className="p-3 rounded-lg border bg-muted/50">
                <p className="text-sm">{generatedContent.description}</p>
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Key Features</label>
              <div className="space-y-1">
                {generatedContent.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Keywords */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Keywords</label>
              <div className="flex flex-wrap gap-1">
                {generatedContent.keywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

ContentGenerator.metadata = {
  name: "ContentGenerator",
  label: "Content Generator",
  version: "1.0.0",
  date: "2025-10-08",
  description: "AI-powered content generation for listings",
  phase: "Phase 1",
  category: "Content & Setup",
  tags: ["phase1", "content", "ai", "generation", "seo"]
}
