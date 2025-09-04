import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import Layout from '../../../components/Layout';
import ProductDetailsClient from './ProductDetailsClient';

async function getProduct(slug) {
  await dbConnect();
  const product = await Product.findOne({ slug }).lean();
  return JSON.parse(JSON.stringify(product));
}

export default async function ProductDetailPage({ params }) {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <Layout title={product.name}>
        <div className="py-12">
            <ProductDetailsClient product={product} />
        </div>
    </Layout>
  );
}