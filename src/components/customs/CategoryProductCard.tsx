"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";

interface Props {
  product: Product;
}

export default function CategoryProductCard({ product }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/products/${product.id}`)}
      className="cursor-pointer group text-left bg-white rounded-2xl p-4 shadow-apple hover:shadow-apple-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
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
    </button>
  );
}
