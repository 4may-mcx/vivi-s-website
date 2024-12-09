export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-pink-200/85 to-blue-200/85">
      {children}
    </div>
  );
}
