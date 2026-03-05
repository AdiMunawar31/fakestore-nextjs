"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getTokenFromCookie } from "@/utils/getToken";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { memo, useCallback } from "react";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slices/cart.slice";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const token = getTokenFromCookie();

      if (!token) {
        toast.error("Please login first");
        router.push("/login");
        return;
      }

      dispatch(
        addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1,
        })
      );

      toast.success("Product added to cart");
    },
    [dispatch, product, router]
  );

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-3xl p-6 shadow-apple hover:shadow-apple-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
        <div className="relative w-full aspect-square bg-gray-50 rounded-2xl mb-4 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        <Badge variant="default" className="self-start mb-2 capitalize">
          {product.category}
        </Badge>

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 grow leading-snug">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">
            {product.rating.rate}{" "}
            <span className="text-gray-400">({product.rating.count})</span>
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="p-2.5 bg-brand text-white rounded-full hover:bg-brand-hover active:scale-95 transition-all duration-200"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
});
ProductCard.displayName = "ProductCard";
export default ProductCard;
