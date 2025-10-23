import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CartPanel from "../components/CartPanel";
import SearchFilter from "../components/SearchFilter";
import { useLocalStorage } from "../utils/storage";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useLocalStorage("cart", []);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        const uniqueCategories = ["All", ...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.title.toLowerCase().includes(query.toLowerCase())
  );

  function handleAdd(prod) {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.id === prod.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].qty += 1;
        return copy;
      } else return [...prev, { ...prod, qty: 1 }];
    });
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }

  function handleClear() {
    setCart([]);
  }

  if (loading)
    return <div className="text-center text-lg text-gray-600">Loading products...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <SearchFilter
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                ...p,
                name: p.title,
                price: p.price,
                desc: p.description,
                image: p.image,
              }}
              onAdd={handleAdd}
            />
          ))}
        </div>
      </div>
      <aside className="md:col-span-1">
        <CartPanel cart={cart} onRemove={handleRemove} onClear={handleClear} />
      </aside>
    </div>
  );
}
