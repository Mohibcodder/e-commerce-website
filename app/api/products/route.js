import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET Request to fetch all products
export async function GET() {
  await dbConnect();
  try {
    const products = await Product.find({});
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// POST Request to create a new product
export async function POST(req) {
  await dbConnect();
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: 'No image file found' }, { status: 400 });
    }

    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'my-ecommerce-app' }, (error, result) => {
        if (error) reject(error);
        resolve(result);
      }).end(buffer);
    });

    // Create new product with Cloudinary URL
    const newProduct = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      price: Number(formData.get('price')),
      category: formData.get('category'),
      countInStock: Number(formData.get('countInStock')),
      description: formData.get('description'),
      image: result.secure_url, // Use the URL from Cloudinary
    };

    const product = await Product.create(newProduct);
    return NextResponse.json({ success: true, data: product }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, message: 'Error creating product' }, { status: 500 });
  }
}