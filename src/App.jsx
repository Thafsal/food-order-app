import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProductDetail from "./pages/ProductDetail";
import CategoriesPage from "./pages/CategoriesPage";
import { useState } from "react";
import ContactPage from "./pages/ContactPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <Navbar brand="FoodAura" onSearch={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
