import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Globe, Smartphone } from 'lucide-react';

export default function CrossPostingPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cross-Platform Posting
          </h1>
          <p className="text-muted-foreground">
            Manage listings across multiple platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Facebook className="w-5 h-5 text-blue-600" />
                <span>Facebook</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-600">Active</div>
              <p className="text-sm text-muted-foreground">Posted 3 days ago</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-green-600" />
                <span>OfferUp</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-orange-600">Pending</div>
              <p className="text-sm text-muted-foreground">Ready to post</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-purple-600" />
                <span>Craigslist</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-orange-600">Scheduled</div>
              <p className="text-sm text-muted-foreground">Tomorrow 9 AM</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

