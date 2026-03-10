"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import CategoryProductCard from "./CategoryProductCard";

interface Props {
  category: string;
  products: Product[];
  meta: {
    emoji: string;
    desc: string;
    color: string;
  };
}

export default function CategorySection({ category, products, meta }: Props) {
  const router = useRouter();

  return (
    <section>
      <div
        className={`rounded-3xl bg-linear-to-r ${meta.color} p-8 mb-6 flex items-center justify-between`}
      >
        <div>
          <span className="text-4xl mb-2 block">{meta.emoji}</span>

          <h2 className="text-2xl font-bold text-gray-900 capitalize mb-1">
            {category}
          </h2>

          <p className="text-gray-600 text-sm">{meta.desc}</p>
        </div>

        <button
          onClick={() =>
            router.push(`/products?category=${encodeURIComponent(category)}`)
          }
          className="cursor-pointer bg-white text-brand font-semibold px-5 py-2.5 rounded-full text-sm hover:shadow-apple transition-shadow shrink-0"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <CategoryProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
