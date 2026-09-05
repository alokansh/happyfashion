import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Happy Fashion — Handcrafted Leather Bags',
  description: 'Beautiful handcrafted leather bags. Shop totes, crossbody, shoulder bags & clutches. Free shipping, COD available.',
  openGraph: {
    title: 'Happy Fashion — Handcrafted Leather Bags',
    description: 'Beautiful handcrafted leather bags. Shop totes, crossbody, shoulder bags & clutches.',
    url: 'https://happyfashion.co.in',
    siteName: 'Happy Fashion',
    images: [{
      url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
      width: 800,
      height: 800,
    }],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:," />
        <meta name="theme-color" content="#FAF6F0" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
