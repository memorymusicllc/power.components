
import { DashboardLayout } from '@/components/dashboard-layout';
import { ListingManagement } from '@/components/listing-management';

export const dynamic = 'force-dynamic';

export default function ListingsPage() {
  return (
    <DashboardLayout>
      <ListingManagement />
    </DashboardLayout>
  );
}
