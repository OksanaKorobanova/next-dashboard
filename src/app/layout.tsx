import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from './ThemeRegistry';
import { NextAuthProvider } from './NextAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth in next.js',
  description: 'JWT Authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
        </NextAuthProvider>
      </body>
    </html>
  );
}
