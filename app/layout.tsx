import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/provider/app-provider';
import { Toaster } from '@/components/ui/sonner';

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
          <AppProvider>
            <main className="flex h-screen w-screen flex-col">{children}</main>
          </AppProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
