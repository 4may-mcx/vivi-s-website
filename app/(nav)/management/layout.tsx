import { ManagementSideBar } from './_component/side-bar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full">
      <ManagementSideBar />
      <div className="flex-1 overflow-y-auto py-4 text-accent-foreground">
        {children}
      </div>
    </div>
  );
}
