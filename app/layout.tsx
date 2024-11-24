import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/navigator";

export const metadata: Metadata = {
  title: "Vivi",
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
        <NavBar />
        <main className="pt-14 w-full h-full">{children}</main>
      </body>
    </html>
  );
}
