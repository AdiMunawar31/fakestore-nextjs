import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-8">
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Copyright © {new Date().getFullYear()} D2Y FakeStore. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-400">
            Built with Next.js & FakeStore API
          </p>
        </div>
      </div>
    </footer>
  );
}
