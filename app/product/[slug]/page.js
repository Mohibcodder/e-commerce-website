import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import Layout from '../../../components/Layout';
import ProductPageClient from './ProductDetailsClient'; // The new Client Component

async function getProduct(slug) {
  await dbConnect();
  const product = await Product.findOne({ slug }).lean();
  return JSON.parse(JSON.stringify(product));
}

async function getRelatedProducts(category, currentProductId) {
    await dbConnect();
    const related = await Product.find({
        category: category,
        _id: { $ne: currentProductId } // Exclude the current product
    }).limit(4).lean();
    return JSON.parse(JSON.stringify(related));
}

export default async function ProductDetailPage({ params }) {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const relatedProducts = await getRelatedProducts(product.category, product._id);

  return (
    <Layout title={product.name}>
        <ProductPageClient product={product} relatedProducts={relatedProducts} />
    </Layout>
  );
}