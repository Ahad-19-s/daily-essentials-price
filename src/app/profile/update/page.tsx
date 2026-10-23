"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateInformationPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(user?.image || "");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authClient.updateUser({
        name,
        ...(password ? { password } : {}),
        image,
      });
      toast.success("✅ তথ্য সফলভাবে আপডেট হয়েছে!");
    } catch (err) {
      toast.error("❌ তথ্য আপডেট করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">তথ্য আপডেট করুন</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <label className="block">
          নাম
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input w-full border rounded-md px-3 py-2 mt-1"
          />
        </label>

        <label className="block">
          ইমেইল
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full border rounded-md px-3 py-2 mt-1"
          />
        </label>

        <label className="block">
          পাসওয়ার্ড
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full border rounded-md px-3 py-2 mt-1"
          />
        </label>

        <label className="block">
          প্রোফাইল ছবি (Image URL)
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input w-full border rounded-md px-3 py-2 mt-1"
          />
        </label>

        <button
          type="submit"
          className="btn w-full bg-green-600 text-white hover:bg-green-700"
        >
          তথ্য আপডেট করুন
        </button>
      </form>
    </div>
  );
}
