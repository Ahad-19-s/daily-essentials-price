import Link from "next/link";

type Product = {
  id: string | number;
  slug?: string;
  icon?: string;
  nameBn: string;
  unit: string;
  today: number | string;
  change: {
    dir: "up" | "down" | "same" | "flat" | "neutral" | string;
    pct: number;
  };
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={
        product.slug ? `/product/${product.slug}` : `/product/${product.id}`
      }
      className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 hover:shadow-md transition"
    >
      <span className="text-3xl">{product.icon ?? "🛒"}</span>
      <h3 className="font-semibold text-lg">{product.nameBn}</h3>
      <p className="text-sm text-gray-500">প্রতি {product.unit}</p>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700">আজকের দাম</span>
        <span className="font-bold text-green-900">{product.today} টাকা</span>
      </div>

      <span
        className={
          product.change.dir === "up"
            ? "text-red-500 font-semibold"
            : product.change.dir === "down"
              ? "text-green-500 font-semibold"
              : "text-gray-400 font-semibold"
        }
      >
        {product.change.dir === "up"
          ? `▲ ${product.change.pct}%`
          : product.change.dir === "down"
            ? `▼ ${Math.abs(product.change.pct)}%`
            : "— 0%"}
      </span>
    </Link>
  );
}
