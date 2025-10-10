/**
 * Metadata Display Component
 * Displays component metadata in the component library
 * 
 * @name MetadataDisplay
 * @version 1.0.0
 * @date 2025-10-08
 */

import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface ComponentMetadata {
  name: string
  label: string
  version: string
  date: string
  description?: string
}

interface MetadataDisplayProps {
  metadata: ComponentMetadata
  children: React.ReactNode
}

export function MetadataDisplay({ metadata, children }: MetadataDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Metadata Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{metadata.label}</CardTitle>
            <Badge variant="outline">v{metadata.version}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="text-muted-foreground">Component Name:</dt>
            <dd className="font-mono">{metadata.name}</dd>
            
            <dt className="text-muted-foreground">Version:</dt>
            <dd>{metadata.version}</dd>
            
            <dt className="text-muted-foreground">Last Updated:</dt>
            <dd>{metadata.date}</dd>
            
            {metadata.description && (
              <>
                <dt className="text-muted-foreground col-span-2">Description:</dt>
                <dd className="col-span-2">{metadata.description}</dd>
              </>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Component Preview */}
      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">Component Preview</h3>
        {children}
      </div>
    </div>
  )
}

MetadataDisplay.metadata = {
  name: "MetadataDisplay",
  label: "Metadata Display",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Displays component metadata and preview"
}
