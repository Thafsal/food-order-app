import { ShoppingCart, Search, Sun, Moon, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useSelector } from "react-redux";
import foodaura from "../assets/foodaura-logo.png";
import { Link } from "react-router-dom";

export default function Navbar({ brand = "FoodAura", onSearch }) {
  const { theme, setTheme } = useTheme();
  const [q, setQ] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch?.(q);
    }, 400);
    return () => clearTimeout(handler);
  }, [q, onSearch]);

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 dark:bg-slate-900/70 backdrop-blur text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-orange-600 dark:text-orange-400 font-semibold text-2xl"
          >
            <img src={foodaura} alt="logo" className="h-8 w-8 object-contain" />
            <span>{brand}</span>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1 px-4">
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search meals..."
                className="w-full pl-9 pr-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-slate-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <nav className="flex items-center gap-4 text-sm">
                <Link
                  to="/categories"
                  className="text-gray-700 dark:text-gray-200 hover:text-orange-600"
                >
                  Categories
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 dark:text-gray-200 hover:text-orange-600"
                >
                  Contact
                </Link>
              </nav>

              <button
                onClick={toggleTheme}
                title="Toggle theme"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>

              <Link
                to="/login"
                className="text-sm text-gray-700 dark:text-gray-200 border px-3 py-2 rounded"
              >
                Login
              </Link>

              <Link
                to="/cart"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-100" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 grid min-w-5 min-h-5 place-items-center rounded-full bg-orange-600 px-1 text-[10px] text-white">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
