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
      className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition border border-gray-100"
    >
      {/* Icon */}
      <span className="text-4xl">{product.icon ?? "🛒"}</span>

      {/* Name */}
      <h3 className="font-bold text-lg text-gray-900">{product.nameBn}</h3>
      <p className="text-sm text-gray-500">প্রতি {product.unit}</p>

      {/* Price */}
      <div className="flex items-center justify-between text-sm mt-2">
        <span className="text-gray-600">আজকের দাম</span>
        <span className="font-extrabold text-green-700">
          {product.today} টাকা
        </span>
      </div>

      {/* Change Indicator */}
      <span
        className={
          product.change.dir === "up"
            ? "text-red-500 font-semibold"
            : product.change.dir === "down"
              ? "text-green-600 font-semibold"
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
