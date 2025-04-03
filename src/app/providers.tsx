"use client";

import MarkerShapeFilter from "@/components/MarkerShapeFilter";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <MarkerShapeFilter />
      <Sidebar />
      <main className="flex-1 p-8 pt-16 md:p-16 lg:ml-64">{children}</main>
    </SessionProvider>
  );
}
