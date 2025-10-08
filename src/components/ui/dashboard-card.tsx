/**
 * Dashboard Card Component
 * A standardized wrapper for all dashboard widgets
 * 
 * Metadata:
 * @name DashboardCard
 * @version 1.0.0
 * @date 2025-10-08
 */

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  headerAction?: React.ReactNode
  loading?: boolean
  error?: string | null
}

export function DashboardCard({
  title,
  description,
  icon,
  children,
  className,
  headerAction,
  loading,
  error,
}: DashboardCardProps) {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      {(title || description || icon || headerAction) && (
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2 flex-1">
              {icon && <div className="text-primary">{icon}</div>}
              <div className="flex-1 min-w-0">
                {title && <CardTitle className="text-lg">{title}</CardTitle>}
                {description && <CardDescription>{description}</CardDescription>}
              </div>
            </div>
            {headerAction && <div className="ml-2">{headerAction}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-32 text-destructive">
            <p>{error}</p>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}

// Component metadata
DashboardCard.metadata = {
  name: "DashboardCard",
  label: "Dashboard Card Wrapper",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Standardized container for dashboard widgets"
}
