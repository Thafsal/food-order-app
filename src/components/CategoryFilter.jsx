import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectCategory } from "../features/categorySlice";

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const { list, selected, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p className="text-center py-4">Loading categories...</p>;

  return (
    <div id="categories" className="flex flex-wrap gap-1  justify-center ">
      <button
        onClick={() => dispatch(selectCategory("All"))}
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          selected === "All"
            ? "bg-orange-500 text-white"
            : "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100"
        }`}
      >
        All
      </button>
      {list.map((cat) => (
        <button
          key={cat.idCategory}
          onClick={() => dispatch(selectCategory(cat.strCategory))}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selected === cat.strCategory
              ? "bg-orange-500 text-white"
              : "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100"
          }`}
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
}
