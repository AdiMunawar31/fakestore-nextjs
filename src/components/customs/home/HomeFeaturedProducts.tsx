import { Product } from "@/types/product";
import ProductCard from "@/components/customs/ProductCard";

interface Props {
  products: Product[];
}

export default function HomeFeaturedProducts({ products }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <h2 className="text-3xl font-bold mb-10">Featured Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
