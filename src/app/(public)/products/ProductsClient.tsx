"use client";
import { useMemo, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Product } from "@/types/product";
import ProductCard from "@/components/customs/ProductCard";

interface Props {
  products: Product[];
  categories: string[];
  activeCategory?: string;
}

type SortKey = "default" | "price-asc" | "price-desc" | "rating";

export default function ProductsClient({
  products,
  categories,
  activeCategory,
}: Props) {
  const router = useRouter();
  const [sort, setSort] = useState<SortKey>("default");
  const [search, setSearch] = useState("");

  const handleCategoryChange = useCallback(
    (cat: string | undefined) => {
      if (cat) {
        router.push(`/products?category=${encodeURIComponent(cat)}`);
      } else {
        router.push("/products");
      }
    },
    [router]
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "rating")
      result.sort((a, b) => b.rating.rate - a.rating.rate);

    return result;
  }, [products, search, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-1">
          {activeCategory ? (
            <span className="capitalize">{activeCategory}</span>
          ) : (
            "All Products"
          )}
        </h1>
        <p className="text-gray-500 text-sm">
          {filteredProducts.length} products
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => handleCategoryChange(undefined)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-brand text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              activeCategory === cat
                ? "bg-brand text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
