import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-slate-800 text-slate-300">
            <div className="container mx-auto px-6 py-12">
                {/* --- Main Grid Layout --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    
                    {/* Column 1: Branding & Social */}
                    <div className="sm:col-span-2 md:col-span-1">
                        <h3 className="text-xl font-bold text-white mb-4 font-serif">MyShop</h3>
                        <p className="text-slate-400 text-sm max-w-xs">
                            Your one-stop shop for curated, high-quality products. Built for the modern lifestyle.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-white transition-colors">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-white transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-white transition-colors">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Shop Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/shop?category=Men" className="hover:text-white transition-colors">Men's Collection</Link></li>
                            <li><Link href="/shop?category=Women" className="hover:text-white transition-colors">Women's Collection</Link></li>
                            <li><Link href="/shop?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Help & Information */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Information</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Stay in the Loop</h4>
                        <p className="text-slate-400 text-sm mb-3">Get the latest updates and special offers directly in your inbox.</p>
                        <form>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="w-full bg-slate-700 border border-slate-600 text-white text-sm p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold p-2 px-4 rounded-r-md transition-colors">
                                    Go
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* --- Bottom Bar --- */}
                <div className="mt-10 pt-6 border-t border-slate-700 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} MyShop. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}