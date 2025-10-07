
import { DashboardLayout } from '@/components/dashboard-layout';
import { LeadsManager } from '@/components/leads-manager';

export const dynamic = 'force-dynamic';

export default function LeadsPage() {
  return (
    <DashboardLayout>
      <LeadsManager />
    </DashboardLayout>
  );
}
