import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../features/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../utils/storage";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [orders, setOrders] = useLocalStorage("orders", []);
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", payment: "" });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.price || 100),
    0
  );

  const handleCheckout = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.payment) newErrors.payment = "Select a payment method";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const order = {
      id: Date.now(),
      items: cartItems,
      total: totalAmount,
      date: new Date().toLocaleString(),
      user: form.name,
      address: form.address,
      payment: form.payment,
    };

    setOrders([...orders, order]);
    dispatch(clearCart());
    setShowCheckout(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-3">
          🎉 Order Placed Successfully!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Thank you for choosing <span className="font-semibold">FoodAura</span>.
          Your delicious meal will arrive soon!
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-orange-600 text-white px-5 py-2 rounded"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <p>Your cart is empty.</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded"
          >
            Browse Meals
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.idMeal}
                className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {item.strMeal}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.strCategory} • {item.strArea}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(removeFromCart(item.idMeal))}
                    className="bg-gray-200 dark:bg-slate-700 px-3 py-1 rounded text-lg font-bold text-gray-700 dark:text-gray-100"
                  >
                    –
                  </button>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="bg-orange-500 text-white px-3 py-1 rounded text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Total: ₹{totalAmount.toFixed(2)}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-gray-300 dark:bg-slate-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <button
                onClick={() => setShowCheckout(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {showCheckout && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Checkout
            </h3>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-slate-700"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <textarea
                  placeholder="Delivery Address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-slate-700"
                  rows="3"
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
              <div>
                <select
                  value={form.payment}
                  onChange={(e) =>
                    setForm({ ...form, payment: e.target.value })
                  }
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-slate-700"
                >
                  <option value="">Select Payment Method</option>
                  <option value="COD">Cash on Delivery</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Credit/Debit Card</option>
                </select>
                {errors.payment && (
                  <p className="text-red-500 text-sm mt-1">{errors.payment}</p>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="px-4 py-2 border rounded text-gray-700 dark:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
