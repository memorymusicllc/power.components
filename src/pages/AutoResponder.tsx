import { DashboardLayout } from '@/components/dashboard-layout';
import { ResponseMonitor } from '@/components/response-monitor';

export default function AutoResponderPage() {
  return (
    <DashboardLayout>
      <ResponseMonitor />
    </DashboardLayout>
  );
}

