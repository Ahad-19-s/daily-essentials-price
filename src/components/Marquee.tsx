import Link from "next/link";

interface Product {
  id: string;
  nameBn: string;
  icon?: string;
  today: number; // আজকের দাম
  unit: string; // kg/litre ইত্যাদি
  change: {
    dir: "up" | "down" | "none";
    pct: number;
  };
}

interface ApiResponse {
  data?: Product[];
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      throw new Error(`Product API failed: ${res.status}`);
    }

    const result: ApiResponse | Product[] = await res.json();

    if (Array.isArray(result)) {
      return result.slice(0, 15);
    }
    if (Array.isArray(result.data)) {
      return result.data.slice(0, 15);
    }
    return [];
  } catch (error) {
    console.error("Marquee product fetch failed:", error);
    return [];
  }
}

export default async function Marquee() {
  const products = await getProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden bg-green-900 text-yellow-300">
      <div className="mx-auto max-w-7xl">
        <div className="marquee-track flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1}
            >
              {products.map((product, index) => (
                <Link
                  key={`${copy}-${product.id}-${index}`}
                  href={`/product/${product.id}`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="mx-5 flex shrink-0 items-center gap-2 py-2 text-sm hover:underline"
                >
                  {/* নাম */}
                  <span className="font-semibold">{product.nameBn}</span>
                  {/* আজকের দাম */}
                  <span className="text-yellow-200">
                    {product.today} টাকা/{product.unit}
                  </span>
                  {/* পরিবর্তন শতাংশ */}
                  <span
                    className={
                      product.change.dir === "up"
                        ? "font-semibold text-red-300"
                        : product.change.dir === "down"
                          ? "font-semibold text-green-300"
                          : "font-semibold text-yellow-200"
                    }
                  >
                    {product.change.dir === "up"
                      ? `▲ ${product.change.pct}%`
                      : product.change.dir === "down"
                        ? `▼ ${Math.abs(product.change.pct)}%`
                        : "— 0%"}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
