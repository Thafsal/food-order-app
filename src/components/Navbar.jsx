import { ShoppingCart, Search, Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar({
  brand = "Foodaura",
  cartCount = 0,
  onSearch,
}) {
  const { theme, setTheme } = useTheme();
  const [q, setQ] = useState("");

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 dark:bg-gray-900/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          <a
            href="/"
            className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-2xl"
          >
            <ShoppingCart className="h-6 w-6" />
            <span>{brand}</span>
          </a>


          <div className="hidden md:flex items-center gap-3">

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={q}
                onChange={(e) => {
                  const v = e.target.value;
                  setQ(v);
                  onSearch?.(v);
                }}
                placeholder="Search meals…"
                className="w-64 pl-9 pr-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>


            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>


            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
              aria-label="Open cart"
              title="Open cart"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-100" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 grid min-w-5 min-h-5 place-items-center rounded-full bg-orange-600 px-1 text-[10px] leading-none text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}