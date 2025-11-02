import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartSlice";

function ProductCard({ meal }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const found = cartItems.find((i) => i.idMeal === meal.idMeal);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-3 flex flex-col">
      <div className="h-40 overflow-hidden rounded-md mb-3">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg mb-1">{meal.strMeal}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {meal.strArea} • {meal.strCategory}
      </p>

      <div className="mt-auto flex items-center justify-between">
        {found ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(removeFromCart(meal.idMeal))}
              className="bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded text-lg font-semibold text-gray-700 dark:text-gray-100"
            >
              –
            </button>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {found.quantity}
            </span>
            <button
              onClick={() => dispatch(addToCart(meal))}
              className="bg-orange-500 text-white px-2 py-1 rounded text-lg font-semibold"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => dispatch(addToCart(meal))}
            className="bg-orange-500 text-white px-3 py-2 rounded"
          >
            Add
          </button>
        )}

        <a
          href={"/products/" + meal.idMeal}
          className="text-sm text-gray-600 dark:text-gray-200"
        >
          View
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
