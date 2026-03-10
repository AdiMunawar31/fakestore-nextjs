"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HomeHero() {
  const router = useRouter();

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-brand font-semibold text-sm tracking-widest uppercase mb-4">
            Introducing D2Y FakeStore
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6">
            Shop smarter.
            <br />
            Live better.
          </h1>

          <p className="text-xl text-gray-500 mb-10">
            Curated products for every lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => router.push("/products")}>
              Shop Now <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => router.push("/categories")}
            >
              Browse Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
