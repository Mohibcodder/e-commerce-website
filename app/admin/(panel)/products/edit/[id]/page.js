'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';


export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const { id: productId } = params;

    // State for form fields
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!productId) return;
        
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${productId}`);
                const product = data.data;
                setName(product.name);
                setSlug(product.slug);
                setPrice(product.price);
                setImage(product.image);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            } catch (err) {
                toast.error("Failed to fetch product details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    // --- FUNCTION TO ADD ---
    // This function converts a string to a URL-friendly slug
    const handleSlugify = (text) => {
        return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('slug', slug);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('countInStock', countInStock);
            formData.append('description', description);
            
            if (file) {
                formData.append('file', file);
            }

            await axios.put(`/api/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Product updated successfully!');
            router.push('/admin/products');
        } catch (err) {
            toast.error('Failed to update product.');
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return <div className="text-center p-10 text-slate-500">Loading Product...</div>;
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
            <Toaster />
            <h1 className="text-2xl font-bold font-serif mb-6">Edit Product</h1>
            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                    {/* --- UPDATE THIS INPUT FIELD --- */}
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => {
                            setName(e.target.value); 
                            setSlug(handleSlugify(e.target.value));
                        }} 
                        className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-slate-700">Slug</label>
                    <input type="text" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                </div>
                  <div>
                     <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price</label>
                     <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                 </div>

                <div>
                    <label htmlFor="imageFile" className="block text-sm font-medium text-slate-700">Change Image</label>
                    <div className="mt-2 flex items-center space-x-4">
                        <img src={image} alt="Current product image" width={80} height={80} className="rounded-md object-cover" />
                        <input
                            type="file"
                            id="imageFile"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        />
                    </div>
                </div>

                <div>
                     <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                     <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                 </div>
                 <div>
                     <label htmlFor="countInStock" className="block text-sm font-medium text-slate-700">Count In Stock</label>
                     <input type="number" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                 </div>
                 <div>
                     <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                     <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
                 </div>    
                {/* ... other form fields ... */}
                <div className="pt-4">
                    <button type="submit" className="w-full bg-teal-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-teal-700 transition-colors">
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
}