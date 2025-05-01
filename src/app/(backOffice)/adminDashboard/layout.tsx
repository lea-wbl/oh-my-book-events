import Providers from "@/app/providers";

export default function BackOfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Providers>{children}</Providers>
    </div>
  );
}
