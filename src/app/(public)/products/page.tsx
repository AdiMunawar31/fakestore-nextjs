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
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const productsPromise = category
    ? productService.getByCategory(category)
    : productService.getAll();

  const categoriesPromise = productService.getCategories();

  const [products, categories] = await Promise.all([
    productsPromise,
    categoriesPromise,
  ]);

  return (
    <ProductsClient
      products={products}
      categories={categories}
      activeCategory={category}
    />
  );
}
