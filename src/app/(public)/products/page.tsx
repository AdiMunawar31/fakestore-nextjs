import type { Metadata } from "next";
import { productService } from "@/services/product.service";
import ProductsClient from "./ProductsClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our complete collection of products.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [products, categories] = await Promise.all([
    searchParams.category
      ? productService.getByCategory(searchParams.category)
      : productService.getAll(),
    productService.getCategories(),
  ]);

  return (
    <ProductsClient
      products={products}
      categories={categories}
      activeCategory={searchParams.category}
    />
  );
}
