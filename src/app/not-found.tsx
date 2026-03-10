"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-gray-100 mb-6">404</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
        Page not found
      </h1>
      <p className="text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button onClick={() => router.push("/")}>
        <Button>Back to Home</Button>
      </Button>
    </div>
  );
}
