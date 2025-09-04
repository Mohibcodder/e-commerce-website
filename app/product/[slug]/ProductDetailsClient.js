'use client';

import { useContext, useState } from 'react';
import { Store } from '../../../context/Store';
import { toast, Toaster } from 'react-hot-toast';

export default function ProductDetailsClient({ product }) {
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
    toast.success('Product added to the cart!');
  };

  return (
    <div className="grid md:grid-cols-2 md:gap-8">
        <Toaster />
        <div className="md:col-span-1">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-lg"
            />
        </div>
        <div className="md:col-span-1 mt-6 md:mt-0">
            <h1 className="text-3xl font-bold font-serif">{product.name}</h1>
            <p className="text-slate-500 my-2">Category: {product.category}</p>
            <hr className="my-4"/>
            <p className="text-slate-700">{product.description}</p>
            <hr className="my-4"/>
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-md">
                <p className="text-2xl font-bold text-slate-800">${product.price}</p>
                <p className={product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}>
                    Status: {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                </p>
            </div>

            {product.countInStock > 0 && (
                <div className="mt-6">
                    <div className="flex items-center mb-4">
                        <label htmlFor="quantity" className="mr-4 font-semibold">Quantity:</label>
                        <select 
                            id="quantity" 
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="p-2 border rounded-md"
                        >
                            {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={addToCartHandler} className="w-full primary-button text-lg">
                        Add to Cart
                    </button>
                </div>
            )}
        </div>
    </div>
  );
}