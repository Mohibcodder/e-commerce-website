'use client';
import { useContext } from 'react';
import { Store } from '../../context/Store';
import Link from 'next/link';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';

export default function CartPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    if (quantity < 1) return;
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  const subtotal = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

  return (
    <Layout title="Shopping Cart">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 font-serif">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <FiShoppingBag className="mx-auto text-slate-300" size={80} />
            <p className="text-xl text-slate-500 mt-4">Your cart is empty.</p>
            <Link href="/shop" className="mt-6 inline-block bg-teal-600 text-white font-semibold py-3 px-8 rounded-md shadow-sm hover:bg-teal-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.slug} className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                  <div className="flex-shrink-0">
                    <img src={item.image} alt={item.name} width={80} height={80} className="rounded-md"></img>
                  </div>
                  <div className="flex-grow ml-4">
                    <Link href={`/product/${item.slug}`} className="font-semibold text-slate-800 hover:text-teal-600">
                      {item.name}
                    </Link>
                    <p className="text-slate-500 text-sm">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateCartHandler(item, item.quantity - 1)} className="p-1 rounded-full hover:bg-slate-100"><FiMinus /></button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button onClick={() => updateCartHandler(item, item.quantity + 1)} className="p-1 rounded-full hover:bg-slate-100"><FiPlus /></button>
                  </div>
                  <div className="ml-6 font-semibold text-lg">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                  <div className="ml-6">
                    <button onClick={() => removeItemHandler(item)} className="text-slate-400 hover:text-red-500">
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 sticky top-24">
                <h2 className="text-xl font-bold font-serif mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-slate-600">Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)</p>
                    <p className="font-semibold">${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-slate-600">Shipping</p>
                    <p className="font-semibold">Free</p>
                  </div>
                </div>
                <hr className="my-4"/>
                <div className="flex justify-between text-xl font-bold">
                  <p>Total</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full mt-6 bg-black cursor-pointer text-white font-bold py-3 px-6 rounded-md shadow-md hover:bg-primary-hover transition-all duration-300 ease-in-out"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}