import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Admin from "./pages/Admin";
import About from "./pages/Home"; // reuse Home for About or create About.jsx

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
