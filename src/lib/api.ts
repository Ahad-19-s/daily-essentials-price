// lib/api.ts
export async function getProducts() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
    next: { revalidate: 300 },
  });
  const result = await res.json();
  if (Array.isArray(result.data)) return result.data;
  if (Array.isArray(result)) return result;
  return [];
}
