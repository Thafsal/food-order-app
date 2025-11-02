import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../features/cartSlice";
import { Link } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.price || 100), // placeholder if no price
    0
  );

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
              <button className="bg-orange-600 text-white px-4 py-2 rounded">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
