'use client';

import { useContext, useState } from 'react';
import { Store } from '../../../context/Store';
import { toast, Toaster } from 'react-hot-toast';
// import Image from 'next/image';
import ProductCard from '../../../components/ProductCard';
import { FiPlus, FiMinus } from 'react-icons/fi';

export default function ProductPageClient({ product, relatedProducts }) {
  const { state, dispatch } = useContext(Store);
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const newQuantity = existItem ? existItem.quantity + quantity : quantity;

    if (product.countInStock < newQuantity) {
      toast.error('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: newQuantity } });
    toast.success(`${quantity} x ${product.name} added to the cart!`);
  };

  return (
    <>
      <Toaster />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 md:gap-12">
          
          {/* Image Gallery */}
          <div className="md:col-span-1">
              <img
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              {/* Thumbnail images could be added here */}
          </div>

          {/* Product Information */}
          <div className="md:col-span-1 mt-6 md:mt-0">
              <p className="text-sm text-slate-500 uppercase tracking-wider">{product.category}</p>
              <h1 className="text-4xl font-bold font-serif text-slate-800 my-2">{product.name}</h1>
              <p className="text-3xl font-semibold text-slate-900 mb-4">${product.price}</p>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
              
              <hr className="my-6"/>

              {product.countInStock > 0 ? (
                <div className="flex items-center space-x-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-slate-300 rounded-md">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-slate-100"><FiMinus /></button>
                    <span className="px-4 font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))} className="p-3 hover:bg-slate-100"><FiPlus /></button>
                  </div>
                  {/* Add to Cart Button */}
                  <button onClick={addToCartHandler} className="flex-grow bg-slate-800 text-white font-bold py-3 px-6 rounded-md shadow-md hover:bg-slate-900 transition-all duration-300 ease-in-out">
                      Add to Cart
                  </button>
                </div>
              ) : (
                <p className="text-red-500 font-semibold">Out of Stock</p>
              )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="bg-slate-50 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold font-serif text-center mb-10">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map(related => (
                        <ProductCard key={related._id} product={related} />
                    ))}
                </div>
            </div>
        </div>
      )}
    </>
  );
}