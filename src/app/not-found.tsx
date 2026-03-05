import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-gray-100 mb-6">404</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Page not found</h1>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
