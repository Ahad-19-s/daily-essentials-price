import Link from "next/link";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id?: string | number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  image?: string | null;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change?: {
    dir: string;
    pct: number;
  };
  markets?: Market[];
};

type Props = {
  product: Product;
};

const formatPrice = (price: number) => Number(price).toLocaleString("bn-BD");

export default function ProductDetails({ product }: Props) {
  const prices = [
    Number(product.today),
    Number(product.yesterday),
    Number(product.lastWeek),
    Number(product.lastMonth),
  ].filter(Number.isFinite);

  const averagePrice = prices.length
    ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length)
    : 0;

  const markets = product.markets ?? [];

  const lowestPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => Number(market.min)))
      : Math.min(...prices);

  const highestPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => Number(market.max)))
      : Math.max(...prices);

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <main className="min-h-screen bg-[#f0f5f0] text-[#27352b]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#7a857c] sm:text-sm"
        >
          <Link href="/" className="hover:text-[#294631]">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-[#294631]"
          >
            {product.categoryNameBn}
          </Link>

          <span>/</span>

          <span className="font-medium text-[#344b38]">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <header className="relative overflow-hidden rounded-3xl border border-[#dfe8df] bg-[#fbfdfb] p-5 shadow-sm sm:p-7">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#e9f2e6] blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#e4ebe1] bg-[#eff5ed] text-4xl sm:h-20 sm:w-20 sm:text-5xl">
                {product.image ?? product.categoryIcon ?? "🛒"}
              </div>

              <div className="min-w-0">
                <p className="mb-1 text-xs font-semibold text-[#7c957b] sm:text-sm">
                  পণ্যের বিস্তারিত
                </p>

                <h1 className="text-xl font-extrabold tracking-tight text-[#263b2b] sm:text-2xl lg:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-xs text-[#7a857c] sm:text-sm">
                  {product.categoryNameBn} · প্রতি {product.unit}
                </p>

                <p className="mt-2 text-xs text-[#68766b]">
                  বর্তমান বাজারদর ও মূল্য পরিবর্তনের তথ্য
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="flex shrink-0 items-center justify-between gap-5 rounded-2xl border border-[#e4ebe2] bg-[#f0f5ef] px-5 py-4 sm:min-w-40 sm:flex-col sm:items-center sm:gap-1">
              <div className="sm:text-center">
                <p className="text-xs text-[#758276]">আজকের দাম</p>

                <p className="mt-1 text-2xl font-extrabold text-[#263b2b] sm:text-3xl">
                  {formatPrice(Number(product.today))}
                </p>

                <p className="text-xs text-[#758276]">টাকা / {product.unit}</p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  isUp
                    ? "bg-[#fff0ef] text-[#d94b48]"
                    : isDown
                      ? "bg-[#e6f5e9] text-[#27834a]"
                      : "bg-white text-[#778178]"
                }`}
              >
                {isUp
                  ? `▲ ${formatPrice(Math.abs(Number(product.change?.pct ?? 0)))}%`
                  : isDown
                    ? `▼ ${formatPrice(Math.abs(Number(product.change?.pct ?? 0)))}%`
                    : "— ০.০%"}
              </span>
            </div>
          </div>
        </header>

        {/* Price Summary */}
        <section className="mt-5 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4 sm:p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-[#344337] sm:text-base">
              দামের সারসংক্ষেপ
            </h2>

            <p className="mt-1 text-xs text-[#818a82]">
              পণ্যের মূল্য সম্পর্কে এক নজরে ধারণা নিন
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Lowest Price */}
            <div className="rounded-2xl border border-[#e3ebe1] bg-white p-4 transition hover:border-[#cbdcc9]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#788279]">
                  সর্বনিম্ন দাম
                </p>

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#eaf5eb] text-[#27834a]">
                  ↓
                </span>
              </div>

              <p className="mt-2 text-2xl font-extrabold text-[#279052]">
                {formatPrice(lowestPrice)}{" "}
                <span className="text-sm font-semibold">টাকা</span>
              </p>

              <p className="mt-1 text-[11px] text-[#89928a]">
                {markets.length
                  ? "বাজারভিত্তিক সর্বনিম্ন দাম"
                  : "উপলব্ধ মূল্যগুলোর মধ্যে"}
              </p>
            </div>

            {/* Highest Price */}
            <div className="rounded-2xl border border-[#e3ebe1] bg-white p-4 transition hover:border-[#e8d3d0]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#788279]">
                  সর্বাধিক দাম
                </p>

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#fff0ef] text-[#d94b48]">
                  ↑
                </span>
              </div>

              <p className="mt-2 text-2xl font-extrabold text-[#d94b48]">
                {formatPrice(highestPrice)}{" "}
                <span className="text-sm font-semibold">টাকা</span>
              </p>

              <p className="mt-1 text-[11px] text-[#89928a]">
                {markets.length
                  ? "বাজারভিত্তিক সর্বাধিক দাম"
                  : "উপলব্ধ মূল্যগুলোর মধ্যে"}
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-2xl border border-[#e3ebe1] bg-white p-4 transition hover:border-[#cbdcc9]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#788279]">গড় দাম</p>

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#eff2ed] text-[#586d59]">
                  ≈
                </span>
              </div>

              <p className="mt-2 text-2xl font-extrabold text-[#344d38]">
                {formatPrice(averagePrice)}{" "}
                <span className="text-sm font-semibold">টাকা</span>
              </p>

              <p className="mt-1 text-[11px] text-[#89928a]">
                গত ও বর্তমান মূল্যের গড়
              </p>
            </div>
          </div>
        </section>

        {/* Market Price Table */}
        <section className="mt-5 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4 sm:p-5">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#344337] sm:text-base">
                বাজারভিত্তিক আজকের দাম
              </h2>

              <p className="mt-1 text-xs text-[#818a82]">
                বিভিন্ন বাজারের দামের তুলনা
              </p>
            </div>

            <span className="mt-2 w-fit rounded-full bg-[#edf4eb] px-3 py-1.5 text-xs font-medium text-[#547456] sm:mt-0">
              {markets.length.toLocaleString("bn-BD")} টি বাজার
            </span>
          </div>

          {markets.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#dce5da] px-4 py-10 text-center">
              <p className="text-sm text-[#647266]">
                বাজারভিত্তিক দামের তথ্য এখনো পাওয়া যায়নি।
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#e2e9e1]">
              <table className="w-full min-w-[600px] border-collapse text-sm">
                <thead>
                  <tr className="bg-[#f0f5ef] text-[#5f6d61]">
                    <th className="px-4 py-3 text-left text-xs font-semibold">
                      বাজার
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold">
                      বিভাগ
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold">
                      সর্বনিম্ন
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold">
                      সর্বাধিক
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#e4eae2]">
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${market.division}-${index}`}
                      className="transition hover:bg-[#f0f6ef]"
                    >
                      <td className="px-4 py-3.5 font-medium text-[#354438]">
                        {market.market}
                      </td>

                      <td className="px-4 py-3.5 text-[#758077]">
                        {market.division}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        {formatPrice(Number(market.min))} টাকা
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        {formatPrice(Number(market.max))} টাকা
                      </td>

                      <td className="px-4 py-3.5 text-right font-bold text-[#294631]">
                        {formatPrice(
                          Math.round(
                            (Number(market.min) + Number(market.max)) / 2,
                          ),
                        )}{" "}
                        টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
