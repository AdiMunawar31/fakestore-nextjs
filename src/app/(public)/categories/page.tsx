import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { productService } from "@/services/product.service";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse products by category.",
};

const categoryMeta: Record<
  string,
  { emoji: string; desc: string; color: string }
> = {
  electronics: {
    emoji: "⚡",
    desc: "Latest gadgets and tech",
    color: "from-blue-50 to-blue-100",
  },
  jewelery: {
    emoji: "💎",
    desc: "Fine jewelry and accessories",
    color: "from-purple-50 to-purple-100",
  },
  "men's clothing": {
    emoji: "👔",
    desc: "Modern menswear",
    color: "from-slate-50 to-slate-100",
  },
  "women's clothing": {
    emoji: "👗",
    desc: "Elegant womenswear",
    color: "from-pink-50 to-pink-100",
  },
};

export default async function CategoriesPage() {
  const categories = await productService.getCategories();

  const categoryProducts = await Promise.all(
    categories.map(async (cat) => {
      const products = await productService.getByCategory(cat);
      return { cat, products: products.slice(0, 3) };
    })
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
          Categories
        </h1>
        <p className="text-gray-500">Explore our curated collections</p>
      </div>

      <div className="space-y-16">
        {categoryProducts.map(({ cat, products }) => {
          const meta = categoryMeta[cat] ?? {
            emoji: "🛍️",
            desc: "Shop now",
            color: "from-gray-50 to-gray-100",
          };
          return (
            <section key={cat}>
              <div
                className={`rounded-3xl bg-linear-to-r ${meta.color} p-8 mb-6 flex items-center justify-between`}
              >
                <div>
                  <span className="text-4xl mb-2 block">{meta.emoji}</span>
                  <h2 className="text-2xl font-bold text-gray-900 capitalize mb-1">
                    {cat}
                  </h2>
                  <p className="text-gray-600 text-sm">{meta.desc}</p>
                </div>
                <Link
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className="bg-white text-brand font-semibold px-5 py-2.5 rounded-full text-sm hover:shadow-apple transition-shadow shrink-0"
                >
                  View All
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {products.map((product: Product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group bg-white rounded-2xl p-4 shadow-apple hover:shadow-apple-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                  >
                    <div className="aspect-square bg-gray-50 rounded-xl mb-3 overflow-hidden relative">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        sizes="200px"
                      />
                    </div>
                    <p className="text-xs font-medium text-gray-900 line-clamp-2 mb-1">
                      {product.title}
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-auto">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
