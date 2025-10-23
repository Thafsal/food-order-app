import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 flex flex-col">
      <div className="h-36 bg-gray-100 dark:bg-slate-700 rounded mb-3 flex items-center justify-center">
        {/* placeholder image, swap with real src */}
        <span className="text-gray-500">{product.category}</span>
      </div>
      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{product.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{product.desc}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="text-blue-600 font-semibold">₹{product.price}</div>
        <div className="flex gap-2">
          <Link to={`/products/${product.id}`} className="text-sm px-3 py-1 border rounded">View</Link>
          <button onClick={() => onAdd(product)} className="text-sm bg-blue-600 text-white px-3 py-1 rounded">Add</button>
        </div>
      </div>
    </div>
  );
}
