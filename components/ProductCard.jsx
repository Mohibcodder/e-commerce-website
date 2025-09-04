'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { Store } from '../context/Store';
import { toast, Toaster } from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    
    if (product.countInStock < quantity) {
        toast.error('Sorry. Product is out of stock');
        return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Product added to the cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group border border-slate-200 hover:shadow-lg transition-shadow duration-300">
      <Toaster />
      <Link href={`/product/${product.slug}`} className="block relative h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-4 text-left">
        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">{product.category}</p>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg font-semibold text-slate-800 truncate hover:text-teal-600 transition-colors">{product.name}</h2>
        </Link>
        <div className="flex items-center justify-between mt-3">
            <p className="text-base font-bold text-slate-900">${product.price}</p>
            <button onClick={addToCartHandler} className="bg-teal-600 text-white font-semibold text-sm py-2 px-4 rounded-md shadow-sm hover:bg-teal-700 transition-colors duration-300">
            Add to cart
            </button>
        </div>
      </div>
    </div>
  );
}