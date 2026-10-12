"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // এখানে BetterAuth register call করবে
      if (name && email && password) {
        router.push("/signin"); // সফল হলে লগইন পেজে পাঠাবে
      } else {
        setError("সব ফিল্ড পূরণ করুন!");
      }
    } catch {
      setError("রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">সাইন আপ</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
        />
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
          রেজিস্টার
        </button>
      </form>

      <div className="mt-4 text-sm">
        <Link href="/signin" className="text-green-700 hover:underline">
          ইতিমধ্যে একাউন্ট আছে? লগইন করুন
        </Link>
      </div>

      <div className="mt-4">
        <button className="w-full border rounded px-4 py-2 hover:bg-gray-50">
          Google দিয়ে রেজিস্টার
        </button>
        <button className="w-full border rounded px-4 py-2 hover:bg-gray-50 mt-2">
          GitHub দিয়ে রেজিস্টার
        </button>
      </div>
    </div>
  );
}
