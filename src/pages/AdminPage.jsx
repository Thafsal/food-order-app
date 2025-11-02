import React from "react";
import { useSelector } from "react-redux";

export default function AdminPage() {
  const { items } = useSelector((state) => state.products);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <table className="min-w-full border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-200 dark:bg-slate-700">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Meal</th>
            <th className="py-2 px-4">Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map((meal) => (
            <tr key={meal.idMeal} className="border-t">
              <td className="py-2 px-4">{meal.idMeal}</td>
              <td className="py-2 px-4">{meal.strMeal}</td>
              <td className="py-2 px-4">{meal.strCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
