import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // 1. Get the form data from the request
    const formData = await req.formData();
    const file = formData.get('file'); // 'file' must match the key in your frontend form

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // 2. Convert the file to a buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // 3. Upload the buffer to Cloudinary using upload_stream
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'my-ecommerce-app',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    // 4. Return the secure URL
    return NextResponse.json({ url: result.secure_url });

  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json({ error: 'Error uploading to Cloudinary.' }, { status: 500 });
  }
}