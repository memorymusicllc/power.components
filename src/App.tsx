import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';

// Pages
import DashboardPage from '@/pages/Dashboard';
import ListingsPage from '@/pages/Listings';
import LeadsPage from '@/pages/Leads';
import AutoResponderPage from '@/pages/AutoResponder';
import CrossPostingPage from '@/pages/CrossPosting';
import NegotiationPage from '@/pages/Negotiation';
import PricingPage from '@/pages/Pricing';
import PerformancePage from '@/pages/Performance';
import SettingsPage from '@/pages/Settings';
import LoginPage from '@/pages/Login';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ac-dashboard-theme">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/auto-responder" element={<AutoResponderPage />} />
        <Route path="/cross-posting" element={<CrossPostingPage />} />
        <Route path="/negotiation" element={<NegotiationPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
      <SonnerToaster />
    </ThemeProvider>
  );
}

export default App;

