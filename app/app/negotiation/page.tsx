
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, MessageSquare, DollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function NegotiationPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Negotiation Tools
          </h1>
          <p className="text-muted-foreground">
            Scripts and templates for effective negotiations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Firm Pricing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Price is non-negotiable at $4,200</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Auto Responses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Automated replies handle price inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Handshake className="w-5 h-5 text-purple-600" />
                <span>Qualified Leads</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Focus only on serious buyers</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
