import { NavBar } from "@/components/navigator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="z-0 pt-14 w-full h-full">{children}</main>
    </>
  );
}
