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

  useEffect(() => {
    let active = true;

    fetch("https://api.abcz.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((result) => {
        console.log(result); // API response দেখার জন্য
        // যদি result সরাসরি array হয়
        if (active && Array.isArray(result)) {
          setData(result);
        }
        // যদি result.data থাকে
        else if (active && Array.isArray(result.data)) {
          setData(result.data);
        }
      })
      .catch((err) => console.error("Failed to fetch categories:", err))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center text-sm text-gray-500">লোড হচ্ছে...</div>
    );
  }

  return (
    <div className="flex gap-5 justify-center mt-5 px-4 py-2 text-black">
      {data.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-yellow-400 hover:text-black"
        >
          <span>{cat.icon}</span>
          <span>{cat.nameBn}</span>
        </Link>
      ))}
    </div>
  );
}
