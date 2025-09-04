// app/components/Filterbar.js
'use client';

export default function Filterbar({ categories, onFilterChange, onSearchChange }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <input
                    type="text"
                    placeholder="Search for products..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="px-4 py-2 border rounded-lg w-full md:w-1/2"
                />
                <select
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="px-4 py-2 border rounded-lg w-full md:w-1/4"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
