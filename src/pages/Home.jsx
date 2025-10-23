import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Common Bloggers - Food Orders</h1>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Browse categories, add to cart and checkout. This is a frontend-only demo built with React and Tailwind.</p>
      <div className="flex justify-center gap-4">
        <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded">Browse Menu</Link>
        <Link to="/admin" className="bg-gray-800 text-white px-6 py-2 rounded">Admin</Link>
      </div>
    </section>
  );
}
