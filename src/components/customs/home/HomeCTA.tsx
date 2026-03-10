"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function HomeCTA() {
  const router = useRouter();

  return (
    <section className="bg-brand mx-4 sm:mx-6 max-w-6xl md:mx-auto rounded-3xl mb-16">
      <div className="px-8 py-14 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">
          Ready to start shopping?
        </h2>

        <Button
          size="lg"
          variant="secondary"
          onClick={() => router.push("/products")}
        >
          Explore Products
        </Button>
      </div>
    </section>
  );
}
