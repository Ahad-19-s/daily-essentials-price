// app/layout.tsx
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bazar Dor - Price Tracking Website",
  description:
    "A Bangladeshi daily essential products price tracking application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${hindSiliguri.className} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body className="min-h-full bg-slate-50 text-slate-900 flex flex-col">
        {/* Sticky Header + Marquee */}
        <div className="sticky top-0 z-50 shadow bg-white">
          <Header />
          <Marquee />
        </div>

        {/* Main content */}
        <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
