import dbConnect from "../../../../lib/dbConnect";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product";
import { FiDollarSign, FiShoppingBag, FiBox, FiGrid } from 'react-icons/fi';

async function getSummary() {
    await dbConnect();
    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();
    
    const salesData = await Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } }
    ]);
    const totalSales = salesData.length > 0 ? salesData[0].totalSales : 0;
    
    const categories = await Product.distinct('category');
    const categoriesCount = categories.length;

    return { ordersCount, productsCount, totalSales, categoriesCount };
}

function StatCard({ title, value, icon: Icon }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 flex items-center space-x-4">
            <div className="bg-teal-100 p-3 rounded-full">
                <Icon className="text-teal-600" size={24} />
            </div>
            <div>
                <p className="text-sm text-slate-500">{title}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );
}

export default async function AdminDashboardPage() {
    const summary = await getSummary();

    return (
        <div>
            <h1 className="text-3xl font-bold font-serif mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Sales" 
                    value={`$${summary.totalSales.toFixed(2)}`} 
                    icon={FiDollarSign} 
                />
                <StatCard 
                    title="Total Orders" 
                    value={summary.ordersCount} 
                    icon={FiShoppingBag} 
                />
                <StatCard 
                    title="Total Products" 
                    value={summary.productsCount} 
                    icon={FiBox} 
                />
                <StatCard 
                    title="Categories" 
                    value={summary.categoriesCount} 
                    icon={FiGrid} 
                />
            </div>
            {/* You can add charts or recent orders list here */}
        </div>
    );
}