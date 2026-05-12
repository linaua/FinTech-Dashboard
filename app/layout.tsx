import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FinTrack — Personal Finance Dashboard',
  description: 'Track spending and analyze financial habits with Plaid integration.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
