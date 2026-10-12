"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="absolute right-4 top-4 flex items-center gap-4 text-sm">
      {user ? (
        <div className="flex flex-col items-center gap-2">
          {/* Avatar */}
          <Link href="/profile">
            <div className="w-12 h-12 rounded-full ring-2 ring-green-500 overflow-hidden shadow-md hover:scale-105 transition-transform">
              <Image
                src={user?.image || "/default-avatar.png"}
                alt="User Avatar"
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
          </Link>

          {/* Name */}
          <h2 className="text-sm font-semibold text-green-800">{user?.name}</h2>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href="/signin">
            <button
              suppressHydrationWarning
              className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-md shadow-sm hover:bg-green-100 hover:text-green-800 transition-colors"
            >
              সাইন ইন
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-linear-to-r from-green-600 to-emerald-700 rounded-md shadow-md hover:from-green-700 hover:to-emerald-800 transition-all">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
