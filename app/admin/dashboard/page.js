// This is a protected route. You should add authentication logic here.
// For now, it's a simple placeholder.
import Link from 'next/link';
import Layout from '../../../components/Layout';

export default function AdminDashboard() {
    return (
        <Layout title="Admin Dashboard">
            <div className="grid md:grid-cols-4 md:gap-5">
                <div>
                    <ul>    
                        <li>
  <Link href="/admin/dashboard" className="font-bold">
    Dashboard
  </Link>
</li>
<li>
  <Link href="/admin/orders">
    Orders
  </Link>
</li>
<li>
  <Link href="/admin/products">
    Products
  </Link>
</li>
                    </ul>
                </div>
                <div className="md:col-span-3">
                    <h1 className="mb-4 text-xl">Admin Dashboard</h1>
                    <p>Welcome to the admin panel. Here you can manage orders and products.</p>
                </div>
            </div>
        </Layout>
    );
}