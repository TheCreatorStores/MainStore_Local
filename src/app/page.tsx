import Link from 'next/link';
import { fetchProducts } from '@/lib/printify';

export default async function Home() {
  const products = await fetchProducts();
  const featured = products.slice(0, 4); // First 4 as featured

  return (
    <div className="bg-black text-white min-h-screen">
      <nav className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="rounded-full bg-white text-black font-bold p-2 mr-2">TT</div>
          <span className="font-bold">TheCreatorStores</span>
        </div>
        <ul className="flex space-x-6">
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/categories">Categories</Link></li>
          <li><Link href="/upload">Upload Your Design</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div>🛒</div>
      </nav>
      <header className="bg-gradient-to-b from-black to-blue-950 p-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Bring Your Designs to Life</h1>
        <p className="text-lg mb-8">Premium print-on-demand products for creators, artists, and brands. Create custom merchandise that stands out.</p>
        <Link href="/shop" className="bg-white text-black px-6 py-3 rounded font-semibold">Shop Now →</Link>
      </header>
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featured.map((product) => (
            <div key={product.id} className="bg-white text-black rounded-lg p-4 shadow">
              <img src={product.images[0]?.src || '/placeholder.svg'} alt={product.title} className="h-48 w-full object-cover mb-2" />
              <h3 className="font-semibold">{product.title}</h3>
              <p>${(product.variants[0]?.price / 100).toFixed(2)}</p>
              <Link href={`/product/${product.id}`} className="block bg-black text-white text-center py-2 mt-2 rounded">View Product</Link>
            </div>
          ))}
        </div>
      </section>
      <footer className="p-4 text-gray-400 text-center border-t border-gray-800">
        <p>© 2024 TheCreatorStores. All rights reserved.</p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </footer>
    </div>
  );
}
