
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResponseMonitor } from '@/components/response-monitor';

export const dynamic = 'force-dynamic';

export default function AutoResponderPage() {
  return (
    <DashboardLayout>
      <ResponseMonitor />
    </DashboardLayout>
  );
}
