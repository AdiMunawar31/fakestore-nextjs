"use client";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/slices/cart.slice";
import { Product } from "@/types/product";
import { getTokenFromCookie } from "@/utils/getToken";
import { Check, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [dispatch, product, router]);

  return (
    <button
      onClick={handleAdd}
      className={`cursor-pointer w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-base transition-all duration-300 active:scale-[0.98] ${
        added
          ? "bg-green-500 text-white"
          : "bg-brand text-white hover:bg-brand-hover"
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          Add to Cart
        </>
      )}
    </button>
  );
}
