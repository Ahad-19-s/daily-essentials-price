// src/components/Header.tsx
"use client";

import Image from "next/image";
import NavLinks from "./Navlinks";
import { startTransition, useEffect, useState } from "react";

const Header = () => {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // প্রথমবার সেট করা
    startTransition(() => {
      setNow(Date.now());
    });

    // প্রতি সেকেন্ডে আপডেট হবে
    const id = setInterval(() => {
      startTransition(() => {
        setNow(Date.now());
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative mx-auto max-w-7xl px-4 py-4">
      <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
        <Image
          src="/logo-icon.png"
          alt="Bazar Dor Logo"
          width={40}
          height={40}
          priority
        />
        <div className="flex flex-col items-center sm:items-start">
          <span
            suppressHydrationWarning
            className="text-2xl font-bold text-green-700"
          >
            বাজার দর
          </span>

          <span className="text-xs text-neutral-500">
            {now
              ? new Date(now).toLocaleDateString("bn-BD", { dateStyle: "full" })
              : "তারিখ লোড হচ্ছে..."}{" "}
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

      <NavLinks />
    </header>
  );
};

export default Header;
