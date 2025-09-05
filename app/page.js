import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import HomePageClient from '../components/HomePageClient';

// Add this line to re-fetch data at most once every 60 seconds
export const revalidate = 60; 

export const dynamic = 'force-dynamic'; // <-- YEH LINE ADD KAREIN

async function getProducts() {
  await dbConnect();
  const products = await Product.find({}).limit(8).lean(); 
  return JSON.parse(JSON.stringify(products));
}

export default async function Page() {
  const products = await getProducts();
  return <HomePageClient products={products} />;
}