import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categorySlice";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { selected, loading, error } = useSelector((state) => state.categories);
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    async function fetchMeals() {
      try {
        let url =
          selected === "All"
            ? "https://www.themealdb.com/api/json/v1/1/search.php?s="
            : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selected}`;
        const res = await fetch(url);
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        console.error("Failed to fetch meals:", err);
      }
    }
    fetchMeals();
  }, [selected]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Browse by Category 🍴
      </h1>
      <CategoryFilter />
      {loading && <p className="text-center mt-8">Loading meals...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && meals.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No meals found.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {meals.map((meal) => (
          <ProductCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}
