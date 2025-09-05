'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission,
        // e.g., send the data to an API endpoint.
        alert('Thank you for your message!');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <Layout title="Contact Us">
            <div className="bg-white">
                {/* Header Section */}
                <div className="text-center py-16 bg-slate-50">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-800">Get In Touch</h1>
                    <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.</p>
                </div>

                <div className="container mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        
                        {/* Column 1: Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold font-serif text-slate-800 mb-4">Contact Information</h2>
                                <p className="text-slate-600">Fill up the form and our team will get back to you within 24 hours.</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FiPhone className="text-teal-600" size={20} />
                                <span className="text-slate-700">+1 234 567 890</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FiMail className="text-teal-600" size={20} />
                                <span className="text-slate-700">hello@myshop.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FiMapPin className="text-teal-600" size={20} />
                                <span className="text-slate-700">123 Shopping Lane, Commerce City</span>
                            </div>
                        </div>

                        {/* Column 2: Contact Form */}
                        <div className="bg-slate-50 p-8 rounded-lg shadow-md border border-slate-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                                    <textarea id="message" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-slate-800 text-white font-bold py-3 px-6 rounded-md shadow-md hover:bg-slate-900 transition-all duration-300 ease-in-out">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full h-[400px]">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.81956135078819!3d-6.194741395514663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sJakarta!5e0!3m2!1sen!2sid!4v1626241973347!5m2!1sen!2sid" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy"
                        title="Our Location"
                    ></iframe>
                </div>
            </div>
        </Layout>
    );
}