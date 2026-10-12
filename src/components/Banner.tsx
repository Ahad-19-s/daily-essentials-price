import Image from "next/image";
import Link from "next/link";

interface StatProps {
  value: number | string;
  label: string;
}

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white">
      {/* Decorative Blur Circles */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-3xl" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:py-28">
        {/* ---------- Left Content ---------- */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-yellow-300 backdrop-blur-sm sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-300" />
          </span>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            আজকের বাজারের{" "}
            <span className="bg-linear-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
              দাম এক নজরে
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-green-50/90 sm:text-lg lg:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও ফলের দাম — বাজারভিত্তিক
            বিশ্লেষণ, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তনের এক জায়গায়।
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="#সব-পণ্য"
              className="group inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-base font-semibold text-green-900 shadow-lg shadow-yellow-400/30 transition-all hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-yellow-400/50"
            >
              সব পণ্য দেখুন
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
            >
              ক্যাটাগরি ব্রাউজ করুন
            </Link>
          </div>

          {/* Stats Row */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
            <Stat value="৩৩+" label="পণ্য" />
            <Stat value="৮" label="ক্যাটাগরি" />
            <Stat value="১২+" label="বাজার" />
          </div>
        </div>

        {/* ---------- Right Image ---------- */}
        <div className="relative flex flex-1 justify-center lg:justify-end">
          <div className="absolute inset-0 -z-10 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="relative rounded-3xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <Image
              src="/bazar-hero.png"
              alt="Market Basket"
              width={420}
              height={320}
              priority
              className="h-auto w-full max-w-sm rounded-2xl object-contain drop-shadow-2xl sm:max-w-md"
            />
            <div className="absolute -top-4 -right-4 rounded-2xl border border-white/20 bg-white/90 px-4 py-2 text-xs font-bold text-green-800 shadow-xl sm:text-sm">
              🔥 লাইভ আপডেট
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/90 px-4 py-2 text-xs font-bold text-green-800 shadow-xl sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              দাম বাড়ছে
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  );
}

/* ---------- Stat Sub-component ---------- */
function Stat({ value, label }: StatProps) {
  return (
    <div className="text-center lg:text-left">
      <p className="text-2xl font-extrabold text-yellow-300 sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-green-100/80 sm:text-sm">
        {label}
      </p>
    </div>
  );
}
