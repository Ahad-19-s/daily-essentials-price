import Link from "next/link";
import { getProducts } from "@/lib/api";
import CategoryProductGrid from "./CategoryProductGrid";

export const instant = false;

type Product = {
  id: string | number;
  slug: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
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
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const products: Product[] = await getProducts();

  const filteredProducts = products.filter(
    (product) => product.category === slug,
  );

  if (filteredProducts.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f1f5f0] px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#e1e9df] bg-[#fbfdfb] p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edf3ed] text-3xl">
            🛒
          </div>

          <h1 className="text-xl font-bold text-[#263c2b]">
            কোনো পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#788279]">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্যের তথ্য পাওয়া যাচ্ছে না।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-[#294631] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#38543e]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const category = filteredProducts[0];

  return (
    <main className="min-h-screen bg-[#f1f5f0] text-[#253128]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="flex-1">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2 text-sm text-[#7c887e]"
          >
            <Link href="/" className="transition hover:text-[#294631]">
              হোম
            </Link>

            <span>/</span>

            <span className="font-medium text-[#344b38]">
              {category.categoryNameBn}
            </span>
          </nav>

          {/* Category Header */}
          <header className="relative overflow-hidden rounded-3xl border border-[#dfe8df] bg-[#fbfdfb] p-5 shadow-sm sm:p-7">
            <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#edf4e9] blur-2xl" />

            <div className="relative flex items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#e3ebe1] bg-[#f0f5ee] text-4xl sm:h-20 sm:w-20 sm:text-5xl">
                {category.categoryIcon}
              </div>

              <div className="min-w-0">
                <p className="mb-1 text-xs font-semibold tracking-wide text-[#789078] sm:text-sm">
                  বাজারদর · ক্যাটাগরি
                </p>

                <h1 className="text-2xl font-extrabold tracking-tight text-[#263b2b] sm:text-3xl">
                  {category.categoryNameBn}
                </h1>

                <p className="mt-2 max-w-xl text-xs leading-5 text-[#7a857c] sm:text-sm sm:leading-6">
                  নিত্যপ্রয়োজনীয় পণ্যের দাম ও বাজারের পরিবর্তন এক জায়গায় দেখুন।
                </p>
              </div>
            </div>
          </header>

          {/* Sorting and Product Cards */}
          <CategoryProductGrid products={filteredProducts} />
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-[#dce5dc] py-5">
          <div className="flex flex-col gap-2 text-xs leading-5 text-[#778078] sm:flex-row sm:items-center sm:justify-between">
            <p>বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

            <p>দাম বাজার ও সরবরাহ অনুযায়ী পরিবর্তিত হতে পারে।</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
