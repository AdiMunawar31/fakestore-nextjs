import apiClient from "./apiClient";
import { Product } from "@/types/product";
import { REVALIDATE_PRODUCTS } from "@/config/constants";

export const productService = {
  getAll: (limit?: number) =>
    apiClient<Product[]>(`/products${limit ? `?limit=${limit}` : ""}`, {
      revalidate: REVALIDATE_PRODUCTS,
    }),

  getById: (id: number | string) =>
    apiClient<Product>(`/products/${id}`, {
      revalidate: 0, // SSR - no cache
    }),

  getCategories: () =>
    apiClient<string[]>("/products/categories", {
      revalidate: false, // SSG - cache forever
    }),

  getByCategory: (category: string) =>
    apiClient<Product[]>(`/products/category/${encodeURIComponent(category)}`, {
      revalidate: REVALIDATE_PRODUCTS,
    }),
};
