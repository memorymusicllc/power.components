/**
 * Admin Panel Component
 * Admin management and system oversight
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags admin,management,system,oversight
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Shield, Users, Settings, Activity, AlertTriangle, CheckCircle } from 'lucide-react'

interface AdminPanelProps {
  onAdminAction?: (action: any) => void
  loading?: boolean
}

export function AdminPanel({ onAdminAction, loading }: AdminPanelProps) {
  const [systemStatus, setSystemStatus] = useState({
    apiStatus: 'healthy',
    databaseStatus: 'healthy',
    queueStatus: 'normal',
    userCount: 1247,
    activeUsers: 89,
    systemLoad: 45
  })

  const [adminSettings, setAdminSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    errorLogging: true,
    userRegistration: true,
    apiRateLimit: 'normal'
  })

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'User Registration', user: 'john@example.com', time: '2 minutes ago', status: 'success' },
    { id: 2, action: 'System Backup', user: 'System', time: '1 hour ago', status: 'success' },
    { id: 3, action: 'API Error', user: 'api-service', time: '3 hours ago', status: 'error' },
    { id: 4, action: 'User Login', user: 'sarah@example.com', time: '4 hours ago', status: 'success' }
  ])

  const updateSetting = (key: string, value: any) => {
    setAdminSettings(prev => ({ ...prev, [key]: value }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500'
      case 'warning': return 'text-yellow-500'
      case 'error': return 'text-red-500'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'error': return <AlertTriangle className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-500" />
            <CardTitle>Admin Panel</CardTitle>
          </div>
          <Badge variant="destructive">Admin Only</Badge>
        </div>
        <CardDescription>
          System administration and oversight
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Status */}
        <div className="space-y-4">
          <h4 className="font-medium">System Status</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">API Status</span>
                <div className={`flex items-center space-x-1 ${getStatusColor(systemStatus.apiStatus)}`}>
                  {getStatusIcon(systemStatus.apiStatus)}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">All endpoints operational</p>
            </div>
            
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Database</span>
                <div className={`flex items-center space-x-1 ${getStatusColor(systemStatus.databaseStatus)}`}>
                  {getStatusIcon(systemStatus.databaseStatus)}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Connection stable</p>
            </div>
            
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Queue Status</span>
                <div className={`flex items-center space-x-1 ${getStatusColor(systemStatus.queueStatus)}`}>
                  {getStatusIcon(systemStatus.queueStatus)}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{systemStatus.queueStatus} load</p>
            </div>
            
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">System Load</span>
                <span className="text-sm font-bold">{systemStatus.systemLoad}%</span>
              </div>
              <p className="text-xs text-muted-foreground">CPU usage</p>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        <div className="space-y-4">
          <h4 className="font-medium">User Statistics</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 text-center">
              <div className="text-2xl font-bold text-blue-500">{systemStatus.userCount}</div>
              <div className="text-xs text-muted-foreground">Total Users</div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 text-center">
              <div className="text-2xl font-bold text-green-500">{systemStatus.activeUsers}</div>
              <div className="text-xs text-muted-foreground">Active Now</div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 text-center">
              <div className="text-2xl font-bold text-purple-500">
                {Math.round((systemStatus.activeUsers / systemStatus.userCount) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Active Rate</div>
            </div>
          </div>
        </div>

        {/* Admin Settings */}
        <div className="space-y-4">
          <h4 className="font-medium">System Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">Temporarily disable user access</p>
              </div>
              <Switch
                checked={adminSettings.maintenanceMode}
                onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto Backup</p>
                <p className="text-xs text-muted-foreground">Automatically backup system data</p>
              </div>
              <Switch
                checked={adminSettings.autoBackup}
                onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Error Logging</p>
                <p className="text-xs text-muted-foreground">Log system errors and events</p>
              </div>
              <Switch
                checked={adminSettings.errorLogging}
                onCheckedChange={(checked) => updateSetting('errorLogging', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">User Registration</p>
                <p className="text-xs text-muted-foreground">Allow new user registrations</p>
              </div>
              <Switch
                checked={adminSettings.userRegistration}
                onCheckedChange={(checked) => updateSetting('userRegistration', checked)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">API Rate Limit</label>
              <Select value={adminSettings.apiRateLimit} onValueChange={(value) => updateSetting('apiRateLimit', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (100 req/min)</SelectItem>
                  <SelectItem value="normal">Normal (500 req/min)</SelectItem>
                  <SelectItem value="high">High (1000 req/min)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Recent Activity</h4>
            <Button size="sm" variant="outline">
              <Activity className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center space-x-3">
                  <div className={`${getStatusColor(activity.status)}`}>
                    {getStatusIcon(activity.status)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                  </div>
                </div>
                <Badge variant={activity.status === 'success' ? 'default' : 'destructive'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 rounded-lg bg-muted/50">
          <h4 className="font-medium mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="justify-start">
              <Users className="w-4 h-4 mr-2" />
              User Management
            </Button>
            <Button size="sm" variant="outline" className="justify-start">
              <Settings className="w-4 h-4 mr-2" />
              System Config
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

AdminPanel.metadata = {
  name: "AdminPanel",
  label: "Admin Panel",
  version: "1.0.0",
  date: "2025-10-08",
  description: "System administration and oversight",
  phase: "Core",
  category: "Admin",
  tags: ["admin", "management", "system", "oversight", "control"]
}
