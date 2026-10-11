import type { ComponentProps } from "react";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

type Product = ComponentProps<typeof ProductCard>["product"];

export default async function Page() {
  const products = (await getProducts()) as Product[];

  const risers = products.filter((p) => p.change?.dir === "up").slice(0, 6);
  const fallers = products.filter((p) => p.change?.dir === "down").slice(0, 6);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Section A */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">আজ দাম বেড়েছে ▲</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section B */}
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">আজ দাম কমেছে ▼</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section C */}
      <section className="mt-10">
        <h2 id="সব-পণ্য" className="mb-2 text-2xl font-bold">
          সব পণ্য
        </h2>
        <p className="mb-4 text-gray-600">
          সব নিত্যপ্রয়োজনীয় পণ্যের দাম একসাথে দেখুন।
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
