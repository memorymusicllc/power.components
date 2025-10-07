import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/storage';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Bot, 
  Globe, 
  Save,
  LogOut,
  Trash2,
  Download
} from 'lucide-react';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = storage.getSellerSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;

    setLoading(true);
    try {
      const success = storage.saveSellerSettings({
        ...settings,
        updatedAt: new Date().toISOString()
      });

      if (success) {
        toast({
          title: 'Settings Saved',
          description: 'Your preferences have been updated successfully',
        });
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    try {
      const exportData = storage.exportData();
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `ac-selling-dashboard-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Data Exported',
        description: 'Your dashboard data has been downloaded',
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export data. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      const success = storage.clearAllData();
      if (success) {
        toast({
          title: 'Data Cleared',
          description: 'All dashboard data has been cleared',
        });
        loadSettings();
      } else {
        toast({
          title: 'Clear Failed',
          description: 'Failed to clear data. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  if (!settings) {
    return (
      <DashboardLayout>
        <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="text-center">
            <SettingsIcon className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen p-3 sm:p-6 space-y-4 sm:space-y-8">
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage your account and automation preferences
              </p>
            </div>
            <Button onClick={saveSettings} disabled={loading} className="sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span>Profile Settings</span>
              </CardTitle>
              <CardDescription>
                Update your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={settings.firstName || ''}
                    onChange={(e) => setSettings({...settings, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={settings.lastName || ''}
                    onChange={(e) => setSettings({...settings, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  placeholder="(555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>
                Configure how you receive alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch
                    checked={settings.preferences?.notifications?.email ?? true}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings,
                        preferences: {
                          ...settings.preferences,
                          notifications: {
                            ...settings.preferences?.notifications,
                            email: checked
                          }
                        }
                      })
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Inquiry Alerts</Label>
                    <p className="text-xs text-muted-foreground">Get notified of new messages</p>
                  </div>
                  <Switch
                    checked={settings.preferences?.notifications?.newInquiry ?? true}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings,
                        preferences: {
                          ...settings.preferences,
                          notifications: {
                            ...settings.preferences?.notifications,
                            newInquiry: checked
                          }
                        }
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Automation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span>Automation</span>
              </CardTitle>
              <CardDescription>
                Configure automated features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Response</Label>
                  <p className="text-xs text-muted-foreground">Automatically respond to inquiries</p>
                </div>
                <Switch
                  checked={settings.preferences?.automation?.autoResponse ?? true}
                  onCheckedChange={(checked) => 
                    setSettings({
                      ...settings,
                      preferences: {
                        ...settings.preferences,
                        automation: {
                          ...settings.preferences?.automation,
                          autoResponse: checked
                        }
                      }
                    })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Refresh Listings</Label>
                  <p className="text-xs text-muted-foreground">Keep listings active and visible</p>
                </div>
                <Switch
                  checked={settings.preferences?.automation?.autoRefresh ?? true}
                  onCheckedChange={(checked) => 
                    setSettings({
                      ...settings,
                      preferences: {
                        ...settings.preferences,
                        automation: {
                          ...settings.preferences?.automation,
                          autoRefresh: checked
                        }
                      }
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                <span>Privacy</span>
              </CardTitle>
              <CardDescription>
                Control your privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Phone Number</Label>
                  <p className="text-xs text-muted-foreground">Display phone in public listings</p>
                </div>
                <Switch
                  checked={settings.preferences?.privacy?.showPhoneNumber ?? false}
                  onCheckedChange={(checked) => 
                    setSettings({
                      ...settings,
                      preferences: {
                        ...settings.preferences,
                        privacy: {
                          ...settings.preferences?.privacy,
                          showPhoneNumber: checked
                        }
                      }
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="sm:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span>Data Management</span>
              </CardTitle>
              <CardDescription>
                Export, import, or clear your dashboard data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button variant="outline" onClick={handleExportData} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Data
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleClearData}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All Data
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

