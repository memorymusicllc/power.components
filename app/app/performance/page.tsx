
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Eye, MessageCircle, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function PerformancePage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Performance Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your listing performance across platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span>Total Views</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-sm text-green-600">+12% this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span>Inquiries</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-sm text-green-600">+8% this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Qualified</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-sm text-green-600">+3 new</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span>Conversion</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23.5%</div>
              <p className="text-sm text-green-600">+5.2% up</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
