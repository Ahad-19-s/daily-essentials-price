"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    if (!user.email || !user.password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড দিতে হবে!");
      return;
    }

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("✅ সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
    }

    if (error) {
      toast.error(error.message || "❌ সাইন ইন করতে সমস্যা হয়েছে!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
      toast.success("✅ Google দিয়ে সাইন ইন সফল!");
    } catch (err) {
      toast.error("❌ Google সাইন ইন ব্যর্থ!");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: "github" });
      toast.success("✅ Github দিয়ে সাইন ইন সফল!");
    } catch (err) {
      toast.error("❌ Github সাইন ইন ব্যর্থ!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">সাইন ইন</h2>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ইমেইল
          </label>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            পাসওয়ার্ড
          </label>
          <input
            name="password"
            type="password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700 transition-colors"
        >
          সাইন ইন করুন
        </button>
      </form>

      {/* Social Sign In */}
      <div className="mt-6 flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={handleGoogleSignIn}
          className="w-full rounded-md bg-red-500 px-4 py-2 text-white font-semibold hover:bg-red-600 transition-colors"
        >
          Google দিয়ে সাইন ইন
        </button>
        <button
          onClick={handleGithubSignIn}
          className="w-full rounded-md bg-gray-800 px-4 py-2 text-white font-semibold hover:bg-gray-900 transition-colors"
        >
          Github দিয়ে সাইন ইন
        </button>
      </div>

      {/* Link to Sign Up */}
      <p className="mt-4 text-sm text-gray-600">
        নতুন ব্যবহারকারী?{" "}
        <Link href="/signup" className="text-green-700 hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
