'use client';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../../context/Store';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
// import Image from 'next/image';

export default function CheckoutPage() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems } = cart;

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [transactionId, setTransactionId] = useState('');

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (cartItems.length === 0) {
            router.push('/cart');
        }
    }, [cartItems, router]);

    const totalPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                customerInfo: { name, email, phone, city, address },
                paymentMethod,
                transactionId,
                totalPrice,
            });
            dispatch({ type: 'CART_CLEAR_ITEMS' });
            toast.success('Order placed successfully!');
            router.push(`/order/${data.order._id}`); 
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to place order.');
        }
    };
    
    // Prevents hydration error by only rendering cart-dependent values on the client
    if (!isClient) {
        return <Layout title="Checkout"><div className="text-center p-10">Loading...</div></Layout>;
    }

    return (
        <Layout title="Checkout">
            <Toaster />
            <div className="container mx-auto px-4 py-12">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    
                    {/* Shipping & Payment Form */}
                    <div className="lg:col-span-7 bg-white p-8 rounded-lg shadow-md border border-slate-200">
                        <form onSubmit={placeOrderHandler} className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-800">Contact Information</h2>
                                <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" type="email" className="mt-4 w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
                            </div>
                            
                            <hr />

                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-800">Shipping Address</h2>
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
                                    <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
                                    <input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full p-3 border border-slate-300 rounded-md sm:col-span-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
                                    <textarea required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street Address, Postal Code" rows="3" className="w-full p-3 border border-slate-300 rounded-md sm:col-span-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"></textarea>
                                </div>
                            </div>
                            
                            <hr />
                            
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-800">Payment Method</h2>
                                <div className="mt-4 space-y-3">
                                    <label htmlFor="COD" className="flex items-center p-4 border rounded-md has-[:checked]:bg-teal-50 has-[:checked]:border-teal-500 cursor-pointer">
                                        <input type="radio" id="COD" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-teal-600 focus:ring-teal-500"/>
                                        <span className="ml-3 font-medium text-slate-700">Cash on Delivery</span>
                                    </label>
                                    <label htmlFor="JazzCash" className="flex items-center p-4 border rounded-md has-[:checked]:bg-teal-50 has-[:checked]:border-teal-500 cursor-pointer">
                                        <input type="radio" id="JazzCash" value="JazzCash" checked={paymentMethod === 'JazzCash'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-teal-600 focus:ring-teal-500"/>
                                        <span className="ml-3 font-medium text-slate-700">JazzCash / Easypaisa</span>
                                    </label>

                                    {paymentMethod !== 'COD' && (
                                        <div className="p-4 bg-slate-50 border rounded-md">
                                            <p className="text-sm text-slate-600">Please send **${totalPrice.toFixed(2)}** to the following number: **{process.env.NEXT_PUBLIC_JAZZCASH_NUMBER}**</p>
                                            <input required={paymentMethod !== 'COD'} value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Enter Transaction ID (TID)" className="w-full p-3 mt-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"/>
                                        </div>
                                    )}
                                </div>
                            </div>
                             <div className="pt-4">
                                <button type="submit" className="w-full text-lg bg-slate-800 text-white font-bold py-4 px-6 rounded-md shadow-md hover:bg-slate-900 transition-all duration-300 ease-in-out">
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5 mt-8 lg:mt-0">
                        <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200 sticky top-24">
                            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.slug} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="relative">
                                                <img src={item.image} alt={item.name} width={64} height={64} className="rounded-md"></img>
                                                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{item.quantity}</span>
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-semibold text-slate-800">{item.name}</p>
                                                <p className="text-sm text-slate-500">${item.price}</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-slate-800">${(item.quantity * item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <hr className="my-6"/>
                            <div className="space-y-2">
                                <div className="flex justify-between text-slate-600">
                                    <p>Subtotal</p>
                                    <p className="font-semibold">${totalPrice.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <p>Shipping</p>
                                    <p className="font-semibold">Free</p>
                                </div>
                            </div>
                            <hr className="my-6"/>
                            <div className="flex justify-between text-xl font-bold text-slate-900">
                                <p>Total</p>
                                <p>${totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}