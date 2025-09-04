'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

export default function ShopPageClient({ initialProducts, currentCategory }) {
  // Client-side filter states (optional)
  const [filter, setFilter] = useState('');
  
  const filteredProducts = initialProducts.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">{currentCategory ? `${currentCategory}` : 'All Products'}</h1>
        {currentCategory && <p className="text-slate-500">Explore products from our {currentCategory} collection.</p>}
      </div>
      
      {/* Optional: Add client-side search/filter bar here */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard product={product} key={product.slug}></ProductCard>
          ))
        ) : (
          <p className="col-span-full text-center">No products found in this collection.</p>
        )}
      </div>
    </div>
  );
}