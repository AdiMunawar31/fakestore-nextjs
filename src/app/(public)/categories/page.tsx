import type { Metadata } from "next";
import { productService } from "@/services/product.service";
import CategoriesClient from "./CategoriesClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse products by category.",
};

const categoryMeta = {
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

      <CategoriesClient
        categoryProducts={categoryProducts}
        categoryMeta={categoryMeta}
      />
    </div>
  );
}
