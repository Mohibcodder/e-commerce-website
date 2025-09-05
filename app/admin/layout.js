'use client';
import { usePathname } from 'next/navigation';
import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    // Agar user login page par hai (/admin), to koi layout na dikhayein
    if (pathname === '/admin') {
        return (
            <div className="bg-slate-50 min-h-screen">
                {children}
            </div>
        );
    }

    // Baaki sab admin pages ke liye sidebar wala layout dikhayein
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <main className="flex-grow p-8">
                {children}
            </main>
        </div>
    );
}