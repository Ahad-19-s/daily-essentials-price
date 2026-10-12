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

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "❌ সাইন ইন করতে সমস্যা হয়েছে!");
        return;
      }

      if (data) {
        toast.success("✅ সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("❌ Network error! আবার চেষ্টা করুন।");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "❌ Google সাইন ইন ব্যর্থ!");
      }
    } catch {
      toast.error("❌ Google সাইন ইন ব্যর্থ!");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন ইন ব্যর্থ!");
      }
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      toast.error("GitHub দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center px-4">
      <h2 className="mb-6 text-3xl font-bold text-green-700">সাইন ইন</h2>

      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 shadow-lg"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ইমেইল
          </label>
          <input
            name="email"
            type="email"
            autoComplete="email"
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
            autoComplete="current-password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring focus:ring-green-200"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700"
        >
          সাইন ইন করুন
        </button>
      </form>

      {/* Social Sign In */}
      <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full rounded-md bg-red-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-600"
        >
          Google দিয়ে সাইন ইন
        </button>

        <button
          type="button"
          onClick={handleGithubSignIn}
          className="w-full rounded-md bg-gray-800 px-4 py-2 font-semibold text-white transition-colors hover:bg-gray-900"
        >
          GitHub দিয়ে সাইন ইন
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
