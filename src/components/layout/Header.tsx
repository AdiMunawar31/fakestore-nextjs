"use client";

import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { selectCartCount, useAppSelector } from "@/store/hooks";
import { selectAuthToken } from "@/store/hooks";

const navLinks = [
  { href: "/", label: "Store" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
];

export default function Header() {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = useAppSelector(selectCartCount);
  const token = useAppSelector(selectAuthToken);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);

  const handleNavigate = useCallback(
    (href: string) => {
      router.push(href);
      setMobileOpen(false);
    },
    [router]
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-apple border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer flex items-center gap-2 font-bold text-lg tracking-tight text-gray-900"
        >
          <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center">
            <ShoppingBag className="w-3.5 h-3.5 text-white" />
          </div>
          D2Y FakeStore
        </button>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavigate(link.href)}
                className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {token ? (
            <>
              <button
                onClick={() => router.push("/cart")}
                className="cursor-pointer relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />

                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => router.push("/profile")}
                className="cursor-pointer w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                <User className="w-4 h-4 text-gray-700" />
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="cursor-pointer px-4 py-1.5 text-sm font-medium bg-brand text-white rounded-full"
            >
              Login
            </button>
          )}

          <button
            onClick={toggleMobile}
            className="cursor-pointer md:hidden p-2 rounded-full hover:bg-gray-100"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95">
          <ul className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavigate(link.href)}
                  className="cursor-pointer block text-sm text-gray-700 px-3 py-2.5 rounded-xl hover:bg-gray-50 w-full text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
