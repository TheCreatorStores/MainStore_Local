import { fetchProducts, getCategories } from '@/lib/printify';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: { name: string } }) {
  const products = await fetchProducts();
  const categories = await getCategories(products);
  const categoryProducts = categories.get(decodeURIComponent(params.name)) || [];

  return (
    <div className="bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">{decodeURIComponent(params.name)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <div key={product.id} className="bg-white text-black rounded-lg p-4 shadow">
            <img src={product.images[0]?.src || '/placeholder.svg'} alt={product.title} className="h-48 w-full object-cover mb-2" />
            <h3 className="font-semibold">{product.title}</h3>
            <p>${(product.variants[0]?.price / 100).toFixed(2)}</p>
            <Link href={`/product/${product.id}`} className="block bg-black text-white text-center py-2 mt-2 rounded">View Product</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
