/**
 * User Manager Component
 * User management and profile administration
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags user,management,profiles,administration
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Users, Search, Filter, MoreHorizontal, Edit, Trash2, Shield, Mail } from 'lucide-react'

interface UserManagerProps {
  onUserAction?: (action: any) => void
  loading?: boolean
}

export function UserManager({ onUserAction, loading }: UserManagerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'seller',
      status: 'active',
      joinDate: '2025-01-15',
      lastActive: '2 hours ago',
      listings: 12,
      sales: 8
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'buyer',
      status: 'active',
      joinDate: '2025-02-20',
      lastActive: '1 day ago',
      listings: 0,
      sales: 0
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-12-01',
      lastActive: '30 minutes ago',
      listings: 0,
      sales: 0
    },
    {
      id: 4,
      name: 'Lisa Brown',
      email: 'lisa@example.com',
      role: 'seller',
      status: 'suspended',
      joinDate: '2025-03-10',
      lastActive: '1 week ago',
      listings: 5,
      sales: 2
    }
  ])

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive'
      case 'seller': return 'default'
      case 'buyer': return 'secondary'
      default: return 'outline'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500'
      case 'suspended': return 'text-red-500'
      case 'inactive': return 'text-yellow-500'
      default: return 'text-muted-foreground'
    }
  }

  const handleUserAction = (userId: number, action: string) => {
    if (onUserAction) {
      onUserAction({ userId, action })
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-500" />
            <CardTitle>User Manager</CardTitle>
          </div>
          <Badge variant="outline">Admin</Badge>
        </div>
        <CardDescription>
          Manage users and their permissions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-32">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10 text-center">
            <div className="text-2xl font-bold text-blue-500">{users.length}</div>
            <div className="text-xs text-muted-foreground">Total Users</div>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 text-center">
            <div className="text-2xl font-bold text-green-500">
              {users.filter(u => u.status === 'active').length}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="p-3 rounded-lg bg-purple-500/10 text-center">
            <div className="text-2xl font-bold text-purple-500">
              {users.filter(u => u.role === 'seller').length}
            </div>
            <div className="text-xs text-muted-foreground">Sellers</div>
          </div>
          <div className="p-3 rounded-lg bg-orange-500/10 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {users.filter(u => u.role === 'admin').length}
            </div>
            <div className="text-xs text-muted-foreground">Admins</div>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Users ({filteredUsers.length})</h4>
            <Button size="sm" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-bold">{user.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined {user.joinDate} • Last active {user.lastActive}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                      {user.status}
                    </Badge>
                  </div>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-2 gap-4 p-2 bg-muted/30 rounded-lg mb-2">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Listings</p>
                    <p className="font-bold">{user.listings}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Sales</p>
                    <p className="font-bold">{user.sales}</p>
                  </div>
                </div>

                {/* User Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${getStatusColor(user.status)}`}>
                      {user.status === 'active' ? '●' : '●'} {user.status}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Shield className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
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
              Bulk Actions
            </Button>
            <Button size="sm" variant="outline" className="justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Permissions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

UserManager.metadata = {
  name: "UserManager",
  label: "User Manager",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Manage users and their permissions",
  phase: "Core",
  category: "Admin",
  tags: ["user", "management", "profiles", "administration", "permissions"]
}
