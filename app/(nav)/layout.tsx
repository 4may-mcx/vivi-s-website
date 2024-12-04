import { NavBar } from '@/components/navigator';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="z-0 h-full w-full pt-14">{children}</main>
    </>
  );
}
