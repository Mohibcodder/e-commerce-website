'use client'; // Add this line at the top

import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { usePathname } from 'next/navigation'; // Import the hook

export default function Layout({ title, children }) {
    const pathname = usePathname(); // Get the current URL path

    // Check if the current path starts with '/admin'
    const isAdminRoute = pathname.startsWith('/admin');

    // If it's an admin route, we will render only the children without the header and footer
    if (isAdminRoute) {
        return <>{children}</>;
    }

    // Otherwise, for all public routes, render the full layout with header and footer
    return (
        <>
            <Head>
                <title>{title ? `${title} - My Shop` : 'My Shop'}</title>
                <meta name="description" content="E-commerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex min-h-screen flex-col justify-between">
                <header>
                    <Navbar />
                </header>
                <main className="container m-auto mt-4 px-4">{children}</main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
}