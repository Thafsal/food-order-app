// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import Carrousal from "../components/Carrousal";

export default function HomePage({ searchQuery }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMeals() {
      try {
        setLoading(true);
        let url;

        if (searchQuery && searchQuery.trim() !== "") {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
        } else {
          url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
        }

        const res = await fetch(url);
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        console.error("Failed to fetch meals:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, [searchQuery]);

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
