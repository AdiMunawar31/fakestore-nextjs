"use client";

import { useRouter } from "next/navigation";

interface Props {
  categories: string[];
}

export default function HomeCategories({ categories }: Props) {
  const router = useRouter();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      <h2 className="text-3xl font-bold mb-10">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              router.push(`/products?category=${encodeURIComponent(cat)}`)
            }
            className="cursor-pointer group bg-white rounded-3xl p-6 shadow-apple hover:-translate-y-1"
          >
            <span className="text-sm font-semibold capitalize">{cat}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
