'use client';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { Store } from '../context/Store';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { state } = useContext(Store);
  const { cart } = state;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-800 text-white text-center py-2 text-sm">
        Free Shipping on All Orders Over $50
      </div>

      {/* Main Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold font-serif text-slate-800">
            MyShop
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
            <Link href="/shop" className="hover:text-teal-600 transition-colors">Shop</Link>
            <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <button aria-label="Search" className="text-slate-600 hover:text-teal-600"><FiSearch size={22} /></button>
            <Link href="/admin" aria-label="Admin" className="text-slate-600 hover:text-teal-600"><FiUser size={22} /></Link>
            <Link href="/cart" aria-label="Cart" className="relative text-slate-600 hover:text-teal-600">
              <FiShoppingCart size={22} />
              {cart.cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
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
            <Link href="/shop" className="block text-slate-600 hover:text-teal-600">Shop</Link>
            <Link href="/contact" className="block text-slate-600 hover:text-teal-600">Contact</Link>
            <hr/>
            <Link href="/admin" className="block text-slate-600 hover:text-teal-600">My Account</Link>
            <Link href="/cart" className="block text-slate-600 hover:text-teal-600">Cart ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)})</Link>
          </div>
        )}
      </header>
    </>
  );
}