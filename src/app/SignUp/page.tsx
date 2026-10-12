"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!name || !email || !password) {
      toast.error("সব required field পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        ...(image ? { image } : {}),
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
        return;
      }

      if (data) {
        toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Network error! আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    if (loading) return;

    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || `${provider} দিয়ে সাইন আপ ব্যর্থ হয়েছে!`);
        setLoading(false);
      }
    } catch (error) {
      console.error("Social sign-up error:", error);
      toast.error("Social sign-up করা যায়নি। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-center text-2xl font-bold text-green-700">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          নতুন অ্যাকাউন্ট তৈরি করতে তথ্যগুলো পূরণ করুন।
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label htmlFor="name" className="text-sm font-medium">
            নাম
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-600"
            placeholder="আপনার নাম"
            required
          />

          <label htmlFor="image" className="text-sm font-medium">
            Profile Image URL (ঐচ্ছিক)
          </label>
          <input
            id="image"
            name="image"
            type="url"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-600"
            placeholder="https://example.com/image.jpg"
          />

          <label htmlFor="email" className="text-sm font-medium">
            ইমেইল
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-600"
            placeholder="আপনার ইমেইল"
            required
          />

          <label htmlFor="password" className="text-sm font-medium">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-green-600"
            placeholder="কমপক্ষে ৮ অক্ষর"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-3 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ করুন"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignUp("google")}
            className="w-full rounded-lg border px-4 py-3 font-medium transition hover:bg-gray-50"
          >
            Google দিয়ে সাইন আপ
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSocialSignUp("github")}
            className="w-full rounded-lg border px-4 py-3 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "github দিয়ে সাইন আপ"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
