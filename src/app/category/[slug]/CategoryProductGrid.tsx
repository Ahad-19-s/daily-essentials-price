"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Product = {
  id: string | number;
  slug: string;
  nameBn: string;
  image?: string | null;
  unit: string;
  today: number | string;
  change: {
    dir: string;
    pct: number;
  };
};

type Props = {
  products: Product[];
};

export default function CategoryProductGrid({ products }: Props) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    switch (sort) {
      case "price-low":
        return result.sort((a, b) => Number(a.today) - Number(b.today));

      case "price-high":
        return result.sort((a, b) => Number(b.today) - Number(a.today));

      case "name":
        return result.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));

      default:
        return result;
    }
  }, [products, sort]);

  return (
    <>
      {/* Toolbar */}
      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[#dfe8de] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h2 className="text-sm font-bold text-[#344337] sm:text-base">
            পণ্যের তালিকা
          </h2>

          <p className="mt-1 text-xs text-[#818a82]">
            মোট {sortedProducts.length} টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div>
          <label
            htmlFor="product-sort"
            className="mb-1.5 block text-xs font-medium text-[#788279]"
          >
            সাজান
          </label>

          <select
            id="product-sort"
            name="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="w-full min-w-48 cursor-pointer rounded-xl border border-[#dce5da] bg-white px-3 py-2.5 text-sm text-[#344337] outline-none transition focus:border-[#91ad92] focus:ring-2 focus:ring-[#e4eee2] sm:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <section
        aria-label="পণ্যের তালিকা"
        className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {sortedProducts.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group rounded-2xl border border-[#e0e8df] bg-[#fbfdfb] p-4 transition duration-200 hover:-translate-y-1 hover:border-[#c8d9c6] hover:bg-white hover:shadow-lg hover:shadow-[#263b2b]/5 sm:p-5"
            >
              {/* Product Information */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eff4ed] text-2xl transition group-hover:bg-[#e7f0e4]">
                  {product.image ?? "🛒"}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-[#2c3b2f] sm:text-base">
                    {product.nameBn}
                  </h3>

                  <p className="mt-1 text-xs text-[#7e897f]">
                    প্রতি {product.unit}
                  </p>
                </div>

                <span className="text-lg text-[#a1ada1] transition group-hover:translate-x-0.5 group-hover:text-[#496b4c]">
                  →
                </span>
              </div>

              <div className="my-4 border-t border-dashed border-[#e4eae2]" />

              {/* Price and Price Change */}
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="mb-1.5 text-xs text-[#7d887e]">আজকের দাম</p>

                  <p className="text-xl font-extrabold tracking-tight text-[#293c2d] sm:text-2xl">
                    {Number(product.today).toLocaleString("bn-BD")}{" "}
                    <span className="text-sm font-semibold">টাকা</span>
                  </p>
                </div>

                <span
                  className={`mb-0.5 shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-bold ${
                    isUp
                      ? "bg-[#fff0ef] text-[#d94b48]"
                      : isDown
                        ? "bg-[#eaf6eb] text-[#27834a]"
                        : "bg-[#f0f3ef] text-[#778178]"
                  }`}
                >
                  {isUp
                    ? `▲ ${Math.abs(product.change.pct).toLocaleString("bn-BD")}%`
                    : isDown
                      ? `▼ ${Math.abs(product.change.pct).toLocaleString("bn-BD")}%`
                      : "— ০.০%"}
                </span>
              </div>

              <p className="mt-3 text-[11px] text-[#929b92]">
                {isUp
                  ? "আগের তুলনায় দাম বেড়েছে"
                  : isDown
                    ? "আগের তুলনায় দাম কমেছে"
                    : "দামের কোনো পরিবর্তন নেই"}
              </p>
            </Link>
          );
        })}
      </section>
    </>
  );
}
