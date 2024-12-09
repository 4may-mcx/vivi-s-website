import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vivi',
  description: "vivi's website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={'/sign-in'}>
      <html lang="zh">
        <body>
          <main className="flex h-screen w-screen flex-col">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
