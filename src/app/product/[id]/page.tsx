import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import ProductDetails from "./ProductDetails";

export const instant = false;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const products = await getProducts();

  const product = products.find((item: { slug: string }) => item.slug === id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
