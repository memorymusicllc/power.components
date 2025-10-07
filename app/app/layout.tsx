
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AC Selling Dashboard | Automated Marketplace Management',
  description: 'Comprehensive selling automation dashboard for CNCUSA-HD-12L 12V DC Air Conditioner',
  keywords: ['selling automation', 'marketplace', 'air conditioner', 'van life', 'RV', 'off-grid'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
