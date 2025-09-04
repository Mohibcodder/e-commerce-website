'use client';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { Store } from '../context/Store';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { state } = useContext(Store);
  const { cart } = state;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
          MyShop
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-secondary hover:text-accent font-medium transition-colors">Shop</Link>
          <Link href="/contact" className="text-secondary hover:text-accent font-medium transition-colors">Contact</Link>
          <Link href="/admin" className="text-secondary hover:text-accent font-medium transition-colors">Admin</Link>
          <Link href="/cart" className="relative text-secondary hover:text-accent p-2 transition-colors">
            <FiShoppingCart size={24} />
            {cart.cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white py-4 px-6 space-y-4">
          <Link href="/shop" className="block text-secondary hover:text-accent font-medium transition-colors">Shop</Link>
          <Link href="/contact" className="block text-secondary hover:text-accent font-medium transition-colors">Contact</Link>
          <Link href="/admin" className="block text-secondary hover:text-accent font-medium transition-colors">Admin</Link>
          <Link href="/cart" className="block text-secondary hover:text-accent font-medium transition-colors">Cart ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)})</Link>
        </div>
      )}
    </header>
  );
}