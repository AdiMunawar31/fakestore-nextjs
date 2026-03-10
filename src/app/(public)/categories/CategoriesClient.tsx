"use client";

import { Product } from "@/types/product";
import CategorySection from "@/components/customs/CategorySection";

interface CategoryData {
  cat: string;
  products: Product[];
}

interface Props {
  categoryProducts: CategoryData[];
  categoryMeta: Record<string, { emoji: string; desc: string; color: string }>;
}

export default function CategoriesClient({
  categoryProducts,
  categoryMeta,
}: Props) {
  return (
    <div className="space-y-16">
      {categoryProducts.map(({ cat, products }) => {
        const meta = categoryMeta[cat] ?? {
          emoji: "🛍️",
          desc: "Shop now",
          color: "from-gray-50 to-gray-100",
        };

        return (
          <CategorySection
            key={cat}
            category={cat}
            products={products}
            meta={meta}
          />
        );
      })}
    </div>
  );
}
