import Layout from '../../components/Layout';
import Product from '../../models/Product';
import dbConnect from '../../lib/dbConnect';
import ShopPageClient from '../../components/ShopPageClient';

async function getProducts(category) {
  await dbConnect();
  
  const filter = category ? { category } : {}; // Agar category hai to filter karein
  
  const products = await Product.find(filter).lean();
  return JSON.parse(JSON.stringify(products));
}

export const dynamic = 'force-dynamic'; // <-- YEH LINE ADD KAREIN

export default async function ShopPage({ searchParams }) {
  const category = searchParams.category || '';
  const products = await getProducts(category);

  return (
    <Layout title="Shop">
      <ShopPageClient initialProducts={products} currentCategory={category} />
    </Layout>
  );
}