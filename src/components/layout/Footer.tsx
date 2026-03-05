import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Categories</Link></li>
              <li><Link href="/cart" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Account</h4>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Sign In</Link></li>
              <li><Link href="/profile" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Support</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-500">FAQ</span></li>
              <li><span className="text-sm text-gray-500">Returns</span></li>
              <li><span className="text-sm text-gray-500">Shipping</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">About</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-500">D2Y Store</span></li>
              <li><span className="text-sm text-gray-500">Privacy Policy</span></li>
              <li><span className="text-sm text-gray-500">Terms of Use</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">Copyright © {new Date().getFullYear()} D2Y Store. All rights reserved.</p>
          <p className="text-xs text-gray-400">Built with Next.js & FakeStore API</p>
        </div>
      </div>
    </footer>
  );
}
