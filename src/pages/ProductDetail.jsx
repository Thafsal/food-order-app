import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading)
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;
  if (!product)
    return <div className="text-center text-gray-500">Product not found</div>;

  return (
    <section className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded p-6">
      <img src={product.image} alt={product.title} className="h-64 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold">{product.title}</h2>
      <p className="text-gray-600 my-2">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="text-blue-600 font-bold">₹{product.price}</div>
        <Link to="/products" className="px-4 py-2 bg-gray-800 text-white rounded">
          Back to Menu
        </Link>
      </div>
    </section>
  );
}
