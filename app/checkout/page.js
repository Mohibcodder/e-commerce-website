'use client';
import { useContext, useState } from 'react';
import { Store } from '../../context/Store';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

export default function CheckoutPage() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [transactionId, setTransactionId] = useState('');

    const totalPrice = cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/orders', {
                orderItems: cart.cartItems,
                customerInfo: { name, email, phone, city, address },
                paymentMethod,
                transactionId,
                totalPrice,
            });
            dispatch({ type: 'CART_CLEAR_ITEMS' });
            toast.success('Order placed successfully!');
            // Yahan aap user ko "Thank You" page par redirect kar sakte hain
            router.push(`/order/${data.order._id}`); 
        } catch (err) {
            toast.error('Failed to place order.');
        }
    };

    return (
        <Layout title="Checkout">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <form onSubmit={placeOrderHandler} className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-xl">Shipping Information</h2>
                    {/* Input fields for name, email, phone, city, address */}
                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full p-2 border rounded" />
                    {/* ... other inputs */}
                    
                    <h2 className="text-xl mt-4">Payment Method</h2>
                    <div>
                        <input type="radio" id="COD" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor="COD" className="ml-2">Cash on Delivery</label>
                    </div>
                    <div>
                        <input type="radio" id="JazzCash" value="JazzCash" checked={paymentMethod === 'JazzCash'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor="JazzCash" className="ml-2">JazzCash</label>
                    </div>
                    {paymentMethod === 'JazzCash' && (
                        <div className="p-2 border rounded">
                            Pay on: {process.env.NEXT_PUBLIC_JAZZCASH_NUMBER}
                            <input required value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Transaction ID" className="w-full p-2 mt-2 border rounded" />
                        </div>
                    )}
                    {/* Easypaisa can be added similarly */}
                </div>
                <div className="card p-5 h-fit">
                    <h2 className="text-xl mb-2">Order Summary</h2>
                    <div className="flex justify-between"><span>Subtotal</span><span>${totalPrice}</span></div>
                    <button type="submit" className="primary-button w-full mt-4">Place Order</button>
                </div>
            </form>
        </Layout>
    );
}