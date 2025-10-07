
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function PricingPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pricing Strategy
          </h1>
          <p className="text-muted-foreground">
            Monitor and adjust pricing strategy for optimal results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Current Price</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$4,200</div>
              <p className="text-sm text-muted-foreground">Firm pricing strategy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Market Position</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">8.2%</div>
              <p className="text-sm text-muted-foreground">Below retail price</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Strategy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">Premium</div>
              <p className="text-sm text-muted-foreground">Quality positioning</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
