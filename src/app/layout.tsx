import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import Animations from './animations';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const metaDescription =
  'Computer Vision & Full-Stack Engineer · AI/ML · Software Development';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AJ's Portfolio",
    template: "%s | AJ's Portfolio"
  },
  description: metaDescription,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: "AJ's Portfolio",
    title: "AJ's Portfolio",
    description: metaDescription
  },
  twitter: {
    card: 'summary_large_image',
    title: "AJ's Portfolio",
    description: metaDescription
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-scroll overflow-x-hidden">
        <Animations>
          <main>
            <Header />
            <div className="flex flex-col bg-background text-foreground">
              <main className={`flex-grow ${inter.className}`}>{children}</main>
            </div>
            <Toaster />
          </main>
        </Animations>
      </body>
    </html>
  );
}
