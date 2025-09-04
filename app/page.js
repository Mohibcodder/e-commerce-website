import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import HomePageClient from '../components/HomePageClient'; // Client component ko import karein

// Yeh function server par chalega aur data fetch karega
async function getProducts() {
  await dbConnect();
  // Homepage par sirf 8 products dikhayein
  const products = await Product.find({}).limit(8).lean(); 
  return JSON.parse(JSON.stringify(products));
}

// Yeh main Server Component hai
export default async function Page() {
  // Products ka data hasil karein
  const products = await getProducts();
  
  // Data ko client component mein as a prop bhej dein
  return <HomePageClient products={products} />;
}