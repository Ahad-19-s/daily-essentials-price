// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Bazar Dor | স্মার্ট বাজার, সঠিক দাম",
    template: "%s | Bazar Dor",
  },
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন, বিভিন্ন পণ্যের দাম তুলনা করুন এবং স্মার্টভাবে বাজার করুন।",
  applicationName: "Bazar Dor",
  keywords: [
    "Bazar Dor",
    "Bangladesh market price",
    "daily essentials",
    "বাজার দর",
    "নিত্যপ্রয়োজনীয় পণ্যের দাম",
  ],
  openGraph: {
    title: "Bazar Dor | স্মার্ট বাজার, সঠিক দাম",
    description:
      "প্রতিদিনের বাজারদর জানুন। সঠিক দাম বুঝুন, স্মার্টভাবে বাজার করুন।",
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className="min-h-full antialiased font-sans"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-[#F9FAFB] text-slate-800 selection:bg-emerald-200 selection:text-emerald-950">
        {/* Premium sticky navigation */}
        <div className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/95 shadow-[0_4px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
          <Header />

          {/* Live market information strip */}
          <div className="border-t border-slate-100">
            <Marquee />
          </div>
        </div>

        {/* Main application content */}
        <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>

        {/* Soft, minimal background accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl"
        />
        <Footer />
      </body>
    </html>
  );
}
