import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setMeal(data.meals ? data.meals[0] : null);
    }
    fetchMeal();
  }, [id]);

  if (!meal) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="rounded-lg shadow-md mb-6 w-full h-80 object-cover"
      />
      <h2 className="text-3xl font-bold mb-3">{meal.strMeal}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        <strong>Category:</strong> {meal.strCategory}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        <strong>Area:</strong> {meal.strArea}
      </p>
      <p className="mt-4 text-gray-700 dark:text-gray-200 leading-relaxed">
        {meal.strInstructions}
      </p>

      <Link
        to="/"
        className="inline-block mt-6 bg-orange-500 text-white px-4 py-2 rounded"
      >
        ← Back to Meals
      </Link>
    </div>
  );
}
