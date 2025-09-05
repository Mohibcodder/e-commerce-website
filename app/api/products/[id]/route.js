

import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Product from '../../../../models/Product';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET function remains the same
export async function GET(req, { params }) {
    await dbConnect();
    try {
        const product = await Product.findById(params.id);
        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}

// --- UPDATE THE PUT FUNCTION ---
export async function PUT(req, { params }) {
    await dbConnect();
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        const updateData = {
            name: formData.get('name'),
            slug: formData.get('slug'),
            price: Number(formData.get('price')),
            category: formData.get('category'),
            countInStock: Number(formData.get('countInStock')),
            description: formData.get('description'),
        };

        // If a new file is uploaded, upload it to Cloudinary
        if (file) {
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: 'my-ecommerce-app' }, (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }).end(buffer);
            });
            
            // Add the new image URL to our update data
            updateData.image = result.secure_url;
        }

        const product = await Product.findByIdAndUpdate(params.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: product });

    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ success: false, message: "Update failed" }, { status: 400 });
    }
}

// DELETE function remains the same
export async function DELETE(req, { params }) {
    await dbConnect();
    try {
        const deletedProduct = await Product.deleteOne({ _id: params.id });
        if (deletedProduct.deletedCount === 0) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Product deleted" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
    }
}