// src/components/Header.tsx
"use client";

import Image from "next/image";
import NavLinks from "./Navlinks";
import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Header = () => {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    startTransition(() => {
      setNow(Date.now());
    });
    const id = setInterval(() => {
      startTransition(() => {
        setNow(Date.now());
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative mx-auto max-w-7xl px-6 py-4 bg-white shadow-md rounded-lg">
      {/* Top row: logo + date/time + auth */}
      <div className="flex items-center justify-between">
        {/* Logo + Date */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor Logo"
              width={44}
              height={44}
              priority
              className="drop-shadow-sm"
            />
            <span
              suppressHydrationWarning
              className="text-2xl font-extrabold text-green-700 tracking-tight"
            >
              বাজার দর
            </span>
          </Link>

          {/* Date & Time box */}
          <div className="flex flex-col items-start bg-emerald-50 px-4 py-2 rounded-md shadow-sm border border-emerald-100">
            <span
              suppressHydrationWarning
              className="text-sm font-bold text-emerald-800"
            >
              {now
                ? new Date(now).toLocaleDateString("bn-BD", {
                    dateStyle: "full",
                  })
                : "তারিখ লোড হচ্ছে..."}
            </span>
            <span
              suppressHydrationWarning
              className="text-sm font-semibold text-slate-700"
            >
              {now
                ? new Date(now).toLocaleTimeString("bn-BD", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : ""}
            </span>
          </div>
        </div>

        {/* Auth buttons (imported from UserInfo.tsx) */}
        <UserInfo />
      </div>

      {/* Second row: category nav links */}
      <div className="mt-4 border-t border-slate-200 pt-3">
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
