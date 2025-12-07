import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Feedback from '@/components/feedback';

export const metadata: Metadata = {
  title: 'ShopWise',
  description: 'Find the best deals, guaranteed.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-YB0H9M7D2B"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YB0H9M7D2B');
            `,
          }} />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Feedback />
      </body>
    </html>
  );
}
