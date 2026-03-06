"use client";

import Link from "next/link";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useCallback, useState } from "react";
import { selectCartCount, useAppSelector } from "@/store/hooks";
import { selectAuthToken } from "@/store/hooks";

const navLinks = [
  { href: "/", label: "Store" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = useAppSelector(selectCartCount);
  const token = useAppSelector(selectAuthToken);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-apple border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight text-gray-900"
        >
          <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center">
            <ShoppingBag className="w-3.5 h-3.5 text-white" />
          </div>
          D2Y FakeStore
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {token ? (
            <>
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />

                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/profile"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                <User className="w-4 h-4 text-gray-700" />
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 text-sm font-medium bg-brand text-white rounded-full"
            >
              Login
            </Link>
          )}

          <button
            onClick={toggleMobile}
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95">
          <ul className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-gray-700 px-3 py-2.5 rounded-xl hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
