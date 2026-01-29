import Link from 'next/link';
import { fetchProducts, getCategories } from '@/lib/printify';

export default async function Categories() {
  const products = await fetchProducts();
  const categories = await getCategories(products);

  return (
    <div className="bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from(categories).map(([name, prods]) => (
          <div key={name} className="bg-white text-black rounded-lg p-4 shadow">
            <img src={prods[0].images[0]?.src || '/placeholder.svg'} alt={name} className="h-48 w-full object-cover mb-2" />
            <h3 className="font-semibold">{name}</h3>
            <Link href={`/category/${encodeURIComponent(name)}`} className="block bg-black text-white text-center py-2 mt-2 rounded">View Category</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
