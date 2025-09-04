'use client';

import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePageClient({ products }) {
  // --- Logic for Categories ---
  const uniqueCategories = [...new Set(products.map(p => p.category))];

  return (
    <Layout title="Home - MyShop">
      {/* 1. Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-6 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Style</h1>
          <p className="text-md md:text-lg mb-8 max-w-xl">Explore our curated collection of high-quality products, designed for the modern lifestyle.</p>
          <Link href="/shop" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300">
            Explore Products
          </Link>
        </div>
      </section>

      {/* 2. Shop by Collections Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Shop by Collections</h2>
            <p className="text-slate-500 mt-2">Find what you're looking for, faster.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {uniqueCategories.map((category, index) => (
              <div key={category}>
                <Link href={`/shop?category=${encodeURIComponent(category)}`} className="block group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img src={`https://picsum.photos/400/300?random=${index+1}`} alt={category} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"/>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold tracking-wider">{category}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 3. Products Section (with See All button) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Products</h2>
            <p className="text-slate-500 mt-2">A glimpse of our curated collection.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sirf 3 products dikhayein */}
            {products.slice(0, 3).map((product) => (
              <div key={product.slug}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300">
              See All Products
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}