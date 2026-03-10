"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCallback } from "react";
import {
  useAppDispatch,
  useAppSelector,
  selectCartItems,
  selectCartTotal,
} from "@/store/hooks";
import {
  removeItem,
  updateQuantity,
  clearCart,
} from "@/store/slices/cart.slice";
import { formatPrice } from "@/utils/formatPrice";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  const handleQuantity = useCallback(
    (id: number, qty: number) =>
      dispatch(updateQuantity({ id, quantity: qty })),
    [dispatch]
  );
  const handleRemove = useCallback(
    (id: number) => dispatch(removeItem(id)),
    [dispatch]
  );
  const handleClear = useCallback(() => dispatch(clearCart()), [dispatch]);

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Button onClick={() => router.push("/products")}>
          <span>Start Shopping</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Cart
        </h1>
        <button
          onClick={handleClear}
          className="text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-apple flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden relative shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500 mt-0.5 capitalize">
                  {item.category}
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-2 py-1">
                  <button
                    onClick={() => handleQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors
                      ${
                        item.quantity === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-200"
                      }`}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-apple sticky top-20">
            <h2 className="font-bold text-gray-900 text-lg mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items)
                </span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatPrice(total * 0.1)}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span>{formatPrice(total * 1.1)}</span>
              </div>
            </div>
            <Button
              className="w-full justify-center"
              size="lg"
              onClick={() => alert("Product checkout!")}
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="flex justify-center">
              <Button
                onClick={() => router.push("/products")}
                variant="ghost"
                className="text-sm text-brand mt-3"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
