
// This will be the page to add, edit, and delete products.
// You'll need to build a form to interact with the /api/products API endpoints.
'use client'
import Layout from '../../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // useRouter import karein
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminProductsPage() {
     const router = useRouter();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data.data);
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/api/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (err) {
                console.error('Failed to delete product', err);
            }
        }
    }

    return (
        <Layout title="Admin Products">
            <h1 className="text-2xl font-bold">Manage Products</h1>
            <Link href="/admin/products/new" className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
                    Create New
                </Link>
            {/* Add New Product Form Here */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b">
                        <tr>
                            <th className="px-5 text-left">ID</th>
                            <th className="p-5 text-left">NAME</th>
                            <th className="p-5 text-left">PRICE</th>
                            <th className="p-5 text-left">CATEGORY</th>
                            <th className="p-5 text-left">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="border-b">
                                <td className="p-5">{product._id.substring(20, 24)}</td>
                                <td className="p-5">{product.name}</td>
                                <td className="p-5">${product.price}</td>
                                <td className="p-5">{product.category}</td>
                                <td className="p-5">
                                    <Link href={`/admin/product/${product._id}`} className="text-blue-500">Edit</Link>
                                    {' / '}
                                    <button onClick={() => handleDelete(product._id)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}