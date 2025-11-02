import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFoods, fetchFoodsByCategory } from "../features/foodSlice";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import Carrousal from "../components/Carrousal";

export default function HomePage() {
  const dispatch = useDispatch();
  const { list: meals, loading } = useSelector((state) => state.foods);
  const { selected } = useSelector((state) => state.categories);

  // ✅ Always fetch all foods on first load
  useEffect(() => {
    dispatch(fetchAllFoods());
  }, [dispatch]);

  // ✅ When category changes, fetch accordingly
  useEffect(() => {
    if (selected) {
      dispatch(fetchFoodsByCategory(selected));
    } else {
      dispatch(fetchAllFoods());
    }
  }, [dispatch, selected]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Carrousal />
      <h1 className="text-3xl font-bold text-center mt-8 mb-8 text-gray-900 dark:text-gray-100">
        Delicious Meals 🍲
      </h1>

      <CategoryFilter />

      {loading ? (
        <p className="text-center mt-8 text-gray-500">Loading meals...</p>
      ) : meals.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No meals found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
          {meals.map((meal) => (
            <ProductCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
