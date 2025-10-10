/**
 * Item Details Collector Component
 * Phase 1: Content & Setup
 * Collects product information, category, and condition
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags phase1,content,item-management
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { FileText, Save, RefreshCw } from 'lucide-react'

interface ItemDetailsCollectorProps {
  onSave?: (data: any) => void
  loading?: boolean
}

export function ItemDetailsCollector({ onSave, loading }: ItemDetailsCollectorProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: '',
    description: '',
    specifications: '',
  })

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData)
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <CardTitle>Item Details</CardTitle>
          </div>
          <Badge variant="outline">Phase 1</Badge>
        </div>
        <CardDescription>
          Collect comprehensive product information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Product Name</label>
          <Input
            placeholder="e.g., 48V DC Mini Split Air Conditioner"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="appliances">Appliances</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Condition</label>
          <Select value={formData.condition} onValueChange={(v) => setFormData({ ...formData, condition: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="like-new">Like New</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Detailed product description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Specifications</label>
          <Textarea
            placeholder="Technical specifications..."
            value={formData.specifications}
            onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
            rows={3}
          />
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleSubmit} disabled={loading} className="flex-1">
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Details
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => setFormData({name:'',category:'',condition:'',description:'',specifications:''})}>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

ItemDetailsCollector.metadata = {
  name: "ItemDetailsCollector",
  label: "Item Details Collector",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Collects comprehensive product information for listings",
  phase: "Phase 1",
  category: "Content & Setup",
  tags: ["phase1", "content", "item-management", "form"]
}
