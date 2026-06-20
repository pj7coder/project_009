import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoneProvider } from '@/context/StoneContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'PJ Stones | Luxury Quartzite, Marble & Granite Exporters',
  description: 'Premium natural stone sourcing and export. Supplying bespoke Quartzite, Italian Marble, and durable Granite to construction projects in USA, Europe, UAE, Australia, and Southeast Asia.',
  keywords: 'Quartzite, Marble, Granite, Stone Exporter, Taj Mahal Quartzite, Alabaster White Granite, Calacatta Gold, Luxury Countertops, Interior Stone Sourcing',
  authors: [{ name: 'PJ Stones Exports' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <StoneProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </StoneProvider>
      </body>
    </html>
  );
}
