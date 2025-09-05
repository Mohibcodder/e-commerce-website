'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
// import Image from 'next/image';

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data.data);
        } catch (error) {
            toast.error("Failed to fetch products.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteHandler = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/api/products/${productId}`);
                toast.success('Product deleted successfully.');
                fetchProducts(); // Re-fetch products to update the list
            } catch (err) {
                toast.error('Failed to delete product.');
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
            <Toaster />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold font-serif">Products</h1>
                <Link href="/admin/products/new" className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
                    Create New
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={product.image} alt={product.name} width={64} height={64} className="rounded-md object-cover"/>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.countInStock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                    <Link href={`/admin/products/edit/${product._id}`} className="text-teal-600 hover:text-teal-800">Edit</Link>
                                    <button onClick={() => deleteHandler(product._id)} className="text-red-600 hover:text-red-800">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}