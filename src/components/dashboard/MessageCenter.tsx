/**
 * Message Center Component
 * Centralized messaging and communication
 * 
 * @version 1.0.0
 * @date 2025-10-08
 * @type dashboard-widget
 * @tags messaging,communication,chat,notifications
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { MessageSquare, Send, Search, Filter, MoreHorizontal, Reply, Archive } from 'lucide-react'

interface MessageCenterProps {
  onMessageSent?: (message: any) => void
  loading?: boolean
}

export function MessageCenter({ onMessageSent, loading }: MessageCenterProps) {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const [conversations, setConversations] = useState([
    {
      id: 1,
      contact: 'John Smith',
      platform: 'Facebook',
      lastMessage: 'Is this still available?',
      time: '2 minutes ago',
      status: 'unread',
      messages: [
        { id: 1, sender: 'John Smith', message: 'Hi, is this item still available?', time: '10:30 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'Yes, it is still available!', time: '10:32 AM', isOwn: true },
        { id: 3, sender: 'John Smith', message: 'Great! What is the condition?', time: '10:35 AM', isOwn: false }
      ]
    },
    {
      id: 2,
      contact: 'Sarah Johnson',
      platform: 'eBay',
      lastMessage: 'Can you provide more photos?',
      time: '1 hour ago',
      status: 'read',
      messages: [
        { id: 1, sender: 'Sarah Johnson', message: 'Can you provide more photos of the item?', time: '9:15 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'Sure! I can send additional photos.', time: '9:20 AM', isOwn: true }
      ]
    },
    {
      id: 3,
      contact: 'Mike Wilson',
      platform: 'Craigslist',
      lastMessage: 'Price negotiable?',
      time: '3 hours ago',
      status: 'read',
      messages: [
        { id: 1, sender: 'Mike Wilson', message: 'Is the price negotiable?', time: '7:45 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'Yes, I can consider reasonable offers.', time: '8:00 AM', isOwn: true }
      ]
    }
  ])

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New message from John Smith', time: '2 minutes ago', type: 'message' },
    { id: 2, message: 'Sarah Johnson viewed your listing', time: '1 hour ago', type: 'view' },
    { id: 3, message: 'Mike Wilson made an offer', time: '3 hours ago', type: 'offer' }
  ])

  const currentConversation = conversations.find(c => c.id === selectedConversation)

  const sendMessage = () => {
    if (!newMessage.trim() || !currentConversation) return

    const message = {
      id: Date.now(),
      sender: 'You',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    }

    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, messages: [...conv.messages, message], lastMessage: newMessage, time: 'Just now' }
        : conv
    ))

    setNewMessage('')
    if (onMessageSent) onMessageSent(message)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'text-blue-500'
      case 'read': return 'text-muted-foreground'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <CardTitle>Message Center</CardTitle>
          </div>
          <Badge variant="outline">Communication</Badge>
        </div>
        <CardDescription>
          Centralized messaging and communication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
          {/* Conversations List */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="flex-1" />
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedConversation === conversation.id ? 'bg-muted' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-medium text-sm">{conversation.contact}</p>
                      <p className="text-xs text-muted-foreground">{conversation.platform}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={`text-xs ${getStatusColor(conversation.status)}`}>
                        {conversation.status === 'unread' ? '●' : '○'}
                      </span>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 space-y-4">
            {currentConversation && (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between p-3 border-b">
                  <div>
                    <p className="font-medium">{currentConversation.contact}</p>
                    <p className="text-sm text-muted-foreground">{currentConversation.platform}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Archive className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {currentConversation.messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.isOwn 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-blue-100' : 'text-muted-foreground'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    rows={2}
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <h4 className="font-medium">Recent Notifications</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <p className="text-sm">{notification.message}</p>
                </div>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

MessageCenter.metadata = {
  name: "MessageCenter",
  label: "Message Center",
  version: "1.0.0",
  date: "2025-10-08",
  description: "Centralized messaging and communication",
  phase: "Core",
  category: "Communication",
  tags: ["messaging", "communication", "chat", "notifications", "real-time"]
}
