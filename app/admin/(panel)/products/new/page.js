'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Layout from '../../../../../components/Layout';

export default function NewProductPage() {
  const router = useRouter();
  // State for form fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  // State for the actual file, not the URL
  const [file, setFile] = useState(null); 
  const [isCreating, setIsCreating] = useState(false);

  const handleSlugify = (text) => {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };

  const handleFileChange = (e) => {
    // We just store the selected file, we don't upload it here
    setFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select an image to upload.');
      return;
    }
    setIsCreating(true);

    // Create a FormData object to send text and file together
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('description', description);
    formData.append('file', file); // Append the actual file

    try {
      // Send everything to a single endpoint
      await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product created successfully!');
      router.push('/admin/products');
    } catch (err) {
      toast.error('Failed to create product. Please check the data.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Layout title="Add New Product">
      <Toaster />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
        <form onSubmit={submitHandler} className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text" id="name" value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(handleSlugify(e.target.value));
              }}
              className="w-full p-2 mt-1 border rounded" required
            />
          </div>
          {/* Add other fields for slug, price, category, etc. here */}
          <div>
            <label htmlFor="slug">Slug</label>
            <input type="text" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full p-2 mt-1 border rounded" required />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 mt-1 border rounded" required />
          </div>
          <div>
            <label htmlFor="imageFile" className="block text-sm font-medium">Image File</label>
            <input type="file" onChange={handleFileChange} className="mt-2" required />
          </div>
           <div>
            <label htmlFor="category">Category</label>
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 mt-1 border rounded" required />
          </div>
          <div>
            <label htmlFor="countInStock">Count in Stock</label>
            <input type="number" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full p-2 mt-1 border rounded" required />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 mt-1 border rounded" rows="4" required />
          </div>
          <button type="submit" disabled={isCreating} className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400">
            {isCreating ? 'Creating...' : 'Create Product'}
          </button>
        </form>
      </div>
    </Layout>
  );
}