"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // এখানে BetterAuth login call করবে
      if (email === "test@test.com" && password === "123456") {
        router.push("/"); // সফল হলে হোমে পাঠাবে
      } else {
        setError("ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!");
      }
    } catch {
      setError("লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">সাইন ইন</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="ইমেইল"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="পাসওয়ার্ড"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
        >
          লগইন
        </button>
      </form>

      <div className="mt-4 text-sm">
        <Link href="/signup" className="text-green-700 hover:underline">
          নতুন একাউন্ট খুলুন
        </Link>
      </div>

      <div className="mt-4">
        <button className="w-full border rounded px-4 py-2 hover:bg-gray-50">
          Google দিয়ে লগইন
        </button>
        <button className="w-full border rounded px-4 py-2 hover:bg-gray-50 mt-2">
          GitHub দিয়ে লগইন
        </button>
      </div>
    </div>
  );
}
