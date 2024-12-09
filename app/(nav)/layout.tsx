import { NavBar } from '@/components/navigator';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="flex-1 pt-14">{children}</div>
    </>
  );
}
