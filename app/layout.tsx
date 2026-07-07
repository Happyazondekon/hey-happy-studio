import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'HeyHappy Studio — Games & Apps from Benin',
  description:
    "HeyHappy est un studio indie de jeux et d'apps mobiles basé à Cotonou, Bénin. Découvrez MathsCool, HappyGoal, SmartSpend et plus.",
  keywords: ['HeyHappy', 'jeux mobile', 'apps Bénin', 'MathsCool', 'indie studio Africa'],
  openGraph: {
    title: 'HeyHappy Studio',
    description: "Building Africa's next generation of games & apps.",
    siteName: 'HeyHappy',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/heyhappy.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

