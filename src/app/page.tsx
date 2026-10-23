import HeroBanner from "@/components/Banner";
import Page from "@/app/product/Page";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-8 sm:gap-16 sm:px-6 lg:gap-20 lg:px-8">
      <section>
        <HeroBanner />
      </section>

      <section className="w-full">
        <Page />
      </section>
    </main>
  );
}
