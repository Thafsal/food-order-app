import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectCategory } from "../features/categorySlice";
import { fetchAllFoods } from "../features/foodSlice";

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const { list, selected, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

const handleCategoryClick = (category) => {
  if (selected === category) {
    dispatch(selectCategory(null));
    dispatch(fetchAllFoods());
  } else {
    dispatch(selectCategory(category));
  }
};

  if (loading) return <p className="text-center py-4">Loading categories...</p>;

  return (
    <div id="categories" className="flex flex-wrap gap-4 justify-center py-6">
      {list.map((cat) => (
        <div
          key={cat.idCategory}
          onClick={() => handleCategoryClick(cat.strCategory)}
          className={`cursor-pointer flex flex-col items-center p-4 border rounded-xl shadow-sm transition-transform hover:scale-105 ${
            selected === cat.strCategory
              ? "border-orange-500 bg-orange-50 dark:bg-slate-700"
              : "border-gray-300 bg-white dark:bg-slate-800"
          }`}
        >
          {cat.strCategoryThumb && (
            <img
              src={cat.strCategoryThumb}
              alt={cat.strCategory}
              className="w-8 h-8 object-cover rounded-full mb-2"
            />
          )}
          <p
            className={`text-sm font-medium text-center ${
              selected === cat.strCategory
                ? "text-orange-600"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {cat.strCategory}
          </p>
        </div>
      ))}
    </div>
  );
}
