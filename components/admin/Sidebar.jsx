'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiBox, FiShoppingBag, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
    const pathname = usePathname();
    const navLinks = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
        { href: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
        { href: '/admin/products', label: 'Products', icon: FiBox },
    ];

    return (
        <aside className="w-64 bg-slate-800 text-white p-6 flex flex-col h-screen sticky top-0">
            <h1 className="text-2xl font-bold font-serif mb-10">MyShop Admin</h1>
            <nav className="flex-grow">
                <ul className="space-y-2">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href}
                                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                    pathname === link.href 
                                    ? 'bg-teal-600' 
                                    : 'hover:bg-slate-700'
                                }`}
                            >
                                <link.icon size={20} />
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                <button className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-slate-700 transition-colors">
                    <FiLogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}