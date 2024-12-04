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
    <html lang="zh">
      <body>
        <main className="h-full w-full">{children}</main>
      </body>
    </html>
  );
}
