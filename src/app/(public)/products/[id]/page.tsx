import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, ShoppingBag, ArrowLeft, Package } from "lucide-react";
import { productService } from "@/services/product.service";
import { formatPrice } from "@/utils/formatPrice";
import AddToCartButton from "./AddToCartButton";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import NavButton from "@/components/customs/NavButton";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await productService.getById(id);

    return {
      title: product.title,
      description: product.description.slice(0, 155),
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  console.log("params : ", id);

  const product = await productService.getById(id);

  if (!product) notFound();

  console.log("product detail : ", product);

  const stars = Math.round(product.rating.rate);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <NavButton
        href="/products"
        className="cursor-pointer inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </NavButton>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white rounded-3xl p-10 shadow-apple flex items-center justify-center aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain w-full h-full max-h-80"
            priority
          />
        </div>

        <div className="flex flex-col">
          <Badge variant="default" className="self-start mb-3 capitalize">
            {product.category}
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= stars
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating.rate}
            </span>
            <span className="text-sm text-gray-400">
              ({product.rating.count} reviews)
            </span>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-sm">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-8 text-sm text-green-600 font-medium">
            <Package className="w-4 h-4" />
            In Stock — Ready to Ship
          </div>

          <AddToCartButton product={product} />

          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs text-gray-500">
            <div>✓ Free returns within 30 days</div>
            <div>✓ Secure checkout</div>
            <div>✓ Fast delivery</div>
            <div>✓ 1-year warranty</div>
          </div>
        </div>
      </div>
    </div>
  );
}
