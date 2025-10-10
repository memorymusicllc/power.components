/**
 * Photo Processor Component
 * Phase 1: Content & Setup
 * Handles photo upload, optimization, and management
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags phase1,content,photo-management
 */

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Image, Upload, Camera, Download, Trash2, RotateCcw } from 'lucide-react'

interface PhotoProcessorProps {
  onPhotosChange?: (photos: any[]) => void
  loading?: boolean
}

export function PhotoProcessor({ onPhotosChange, loading }: PhotoProcessorProps) {
  const [photos, setPhotos] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (files: FileList) => {
    setUploading(true)
    setUploadProgress(0)
    
    const newPhotos: any[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const photo = {
          id: Date.now() + i,
          file,
          url: e.target?.result,
          name: file.name,
          size: file.size,
          type: file.type,
          optimized: false
        }
        newPhotos.push(photo)
        
        if (newPhotos.length === files.length) {
          setPhotos(prev => [...prev, ...newPhotos])
          setUploading(false)
          setUploadProgress(100)
          if (onPhotosChange) onPhotosChange([...photos, ...newPhotos])
        }
      }
      
      reader.readAsDataURL(file)
      setUploadProgress((i + 1) / files.length * 100)
    }
  }

  const removePhoto = (id: number) => {
    const updated = photos.filter(p => p.id !== id)
    setPhotos(updated)
    if (onPhotosChange) onPhotosChange(updated)
  }

  const optimizePhoto = (id: number) => {
    setPhotos(prev => prev.map(p => 
      p.id === id ? { ...p, optimized: true } : p
    ))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-green-500" />
            <CardTitle>Photo Processor</CardTitle>
          </div>
          <Badge variant="outline">Phase 1</Badge>
        </div>
        <CardDescription>
          Upload, optimize, and manage product photos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div 
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Upload Photos</p>
          <p className="text-sm text-muted-foreground mb-4">
            Drag & drop or click to select files
          </p>
          <Button variant="outline" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Choose Files'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {/* Photo Grid */}
        {photos.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Photos ({photos.length})</h4>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPhotos([])}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border">
                    <img 
                      src={photo.url} 
                      alt={photo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Photo Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => optimizePhoto(photo.id)}
                        disabled={photo.optimized}
                      >
                        <RotateCcw className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removePhoto(photo.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Photo Info */}
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-medium truncate">{photo.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {(photo.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                      {photo.optimized && (
                        <Badge variant="secondary" className="text-xs">
                          Optimized
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

PhotoProcessor.metadata = {
  name: "PhotoProcessor",
  label: "Photo Processor",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Upload, optimize, and manage product photos",
  phase: "Phase 1",
  category: "Content & Setup",
  tags: ["phase1", "content", "photo-management", "upload"]
}
