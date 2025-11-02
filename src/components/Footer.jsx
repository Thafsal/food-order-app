import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold text-xl text-orange-600 dark:text-orange-400">
            FoodAura
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
            Bringing authentic, home-inspired meals to your doorstep since 2021.
            FoodAura is all about fresh flavors, hygiene, and happy tummies.
          </p>
        </div>

        <div>
          <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Useful Links
          </h5>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>
              <Link to="/" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="hover:text-orange-500 transition"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-orange-500 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-orange-500 transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Contact
          </h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Email:{" "}
            <a
              href="mailto:support@foodaura.in"
              className="hover:text-orange-500"
            >
              support@foodaura.in
            </a>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Phone: +91 1234567890
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Address: Bangalore, Karnataka, India
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-orange-500 font-semibold">FoodAura</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
