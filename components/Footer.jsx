import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-pink-400 text-black">
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">MyShop</h3>
                        <p className="text-gray-400">Your one-stop shop for everything you need. Quality products and unbeatable prices.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul>
                            <li className="mb-2"><Link href="/shop" className="hover:text-accent">Shop</Link></li>
                            <li className="mb-2"><Link href="/contact" className="hover:text-accent">Contact Us</Link></li>
                            <li className="mb-2"><Link href="#" className="hover:text-accent">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                        <p className="text-gray-400 mb-2">Subscribe to get the latest deals.</p>
                        <div className="flex">
                            <input type="email" placeholder="Your email" className="w-full p-2 rounded-l-md text-gray-800"/>
                            <button className="bg-accent hover:bg-accent-hover p-2 rounded-r-md">Subscribe</button>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-accent"><FaFacebook size={24} /></a>
                            <a href="#" className="hover:text-accent"><FaTwitter size={24} /></a>
                            <a href="#" className="hover:text-accent"><FaInstagram size={24} /></a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-500 mt-10 pt-6 border-t border-gray-700">
                    <p>&copy; {new Date().getFullYear()} MyShop. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}