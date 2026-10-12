// src/components/Header.tsx
"use client";

import Image from "next/image";
import NavLinks from "./Navlinks";
import { startTransition, useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [now, setNow] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // demo state

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
    <header className="relative mx-auto max-w-7xl px-4 py-4">
      {/* Top row: logo + date/time + auth */}
      <div className="flex items-center justify-between">
        {/* Logo + Date */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="Bazar Dor Logo"
            width={40}
            height={40}
            priority
          />
          <div className="flex flex-col">
            <span
              suppressHydrationWarning
              className="text-2xl font-bold text-green-700"
            >
              🛒 বাজার দর
            </span>
            <span className="text-xs text-neutral-500">
              {now
                ? new Date(now).toLocaleDateString("bn-BD", {
                    dateStyle: "full",
                  })
                : "তারিখ লোড হচ্ছে..."}
            </span>
            <span className="text-xs text-neutral-400">
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

        {/* Auth buttons */}
        <div className="flex gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="text-sm font-medium text-green-700 hover:underline"
              >
                প্রোফাইল
              </Link>
              <button className="text-sm text-red-600 hover:underline">
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium text-green-700 hover:underline"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-green-700 hover:underline"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Second row: category nav links */}
      <NavLinks />
    </header>
  );
};

export default Header;
