'use client';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Something went wrong</h1>
      <p className="text-gray-500 mb-8">{error.message || 'An unexpected error occurred.'}</p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
