import type { Metadata } from "next";
import { productService } from "@/services/product.service";

import HomeHero from "@/components/customs/home/HomeHero";
import HomeFeatures from "@/components/customs/home/HomeFeatures";
import HomeFeaturedProducts from "@/components/customs/home/HomeFeaturedProducts";
import HomeCategories from "@/components/customs/home/HomeCategories";
import HomeCTA from "@/components/customs/home/HomeCTA";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "D2Y FakeStore — Modern Shopping",
  description:
    "Discover curated products at D2Y FakeStore. Fast, beautiful, and reliable.",
};

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    productService.getAll(8),
    productService.getCategories(),
  ]);
  const featured = products.slice(0, 4);

  return (
    <div className="animate-fade-in">
      <HomeHero />
      <HomeFeatures />
      <HomeFeaturedProducts products={featured} />
      <HomeCategories categories={categories} />
      <HomeCTA />
    </div>
  );
}
