import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { productService } from "@/services/product.service";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/customs/ProductCard";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "D2Y FakeStore — Modern Shopping",
  description:
    "Discover curated products at D2Y FakeStore. Fast, beautiful, and reliable.",
};

const features = [
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Lightning-fast shipping to your door",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    desc: "Your data is always protected",
  },
  { icon: Truck, title: "Free Returns", desc: "30-day hassle-free returns" },
];

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    productService.getAll(8),
    productService.getCategories(),
  ]);

  const featured = products.slice(0, 4);

  return (
    <div className="animate-fade-in">
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-brand font-semibold text-sm tracking-widest uppercase mb-4">
              Introducing D2Y FakeStore
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-[1.05]">
              Shop smarter.
              <br />
              Live better.
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">
              Curated products for every lifestyle. Discover thousands of items
              with unbeatable prices and quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products">
                <Button size="lg">
                  Shop Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="secondary">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 bg-linear-to-b from-blue-50/30 to-transparent pointer-events-none" />
      </section>

      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-apple"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-1">
              Handpicked
            </p>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Featured Products
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-brand hover:underline flex items-center gap-1 font-medium"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-10">
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-1">
            Explore
          </p>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat: string) => (
            <Link
              key={cat}
              href={`/categories?cat=${encodeURIComponent(cat)}`}
              className="group bg-white rounded-3xl p-6 shadow-apple hover:shadow-apple-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand group-hover:scale-110 transition-all duration-300">
                <span className="text-xl">
                  {cat === "electronics"
                    ? "⚡"
                    : cat === "jewelery"
                    ? "💎"
                    : cat === "men's clothing"
                    ? "👔"
                    : "👗"}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 capitalize">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-brand mx-4 sm:mx-6 max-w-6xl md:mx-auto rounded-3xl mb-16 overflow-hidden">
        <div className="px-8 py-14 text-center">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Ready to start shopping?
          </h2>
          <p className="text-blue-100 mb-8">
            Join thousands of happy customers today.
          </p>
          <Link href="/products">
            <button className="bg-white text-brand font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors">
              Explore Products
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
