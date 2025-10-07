import { DashboardLayout } from '@/components/dashboard-layout';
import { LeadsManager } from '@/components/leads-manager';

export default function LeadsPage() {
  return (
    <DashboardLayout>
      <LeadsManager />
    </DashboardLayout>
  );
}

