"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function NavLinks() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories",
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const result = await res.json();

        const categories = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : [];

        setData(categories);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch categories:", err);
        setError("ক্যাটাগরি লোড করা যাচ্ছে না। পরে আবার চেষ্টা করুন।");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchCategories();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="mt-5 px-4 py-2 text-center text-sm text-gray-500">
        ক্যাটাগরি লোড হচ্ছে...
      </div>
    );
  }

  return (
    <nav className="mt-5 flex flex-wrap justify-center gap-3 px-4 py-2 text-black">
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : data.length > 0 ? (
        data.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-yellow-400 hover:text-black"
          >
            <span>{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </Link>
        ))
      ) : (
        <p className="text-sm text-gray-500">কোনো ক্যাটাগরি পাওয়া যায়নি।</p>
      )}
    </nav>
  );
}
