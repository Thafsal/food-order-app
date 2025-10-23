import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/productsSlice";
import { addToCart } from "./features/cartSlice";
import Navbar from "./components/Navbar";
import carousel1 from "./assets/carousel1.png";
import carousel2 from "./assets/carousel2.png";
import carousel3 from "./assets/carousel3.png";
import carousel4 from "./assets/carousel4.png";

function App() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredMeals = items.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const carouselImages = [carousel1, carousel2, carousel3, carousel4];


  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <Navbar
        brand="FoodAura"
        cartCount={cartItems.length}
        onSearch={setSearchQuery}
      />

     {/* Carousel */}
<div className="relative w-full max-w-4xl mx-auto mt-4 overflow-hidden rounded-xl shadow-lg">
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
  >
    {carouselImages.map((img, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-full  h-50 sm:h-48 md:h-56 lg:h-94"
      >
        <img
          src={img}
          alt={`slide-${index + 1}`}
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
    ))}
  </div>

  {/* Dots navigation */}
  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
    {carouselImages.map((_, idx) => (
      <button
        key={idx}
        onClick={() => setCurrentSlide(idx)}
        className={`w-3 h-3 rounded-full ${
          currentSlide === idx ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"
        }`}
      />
    ))}
  </div>
</div>


      <main className="p-8">
        {status === "loading" && (
          <p className="text-center text-lg">🍳 Loading meals...</p>
        )}
        {status === "failed" && (
          <p className="text-center text-red-500">Error: {error}</p>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
          {status === "succeeded" &&
            filteredMeals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h2 className="font-semibold text-lg mb-2">{meal.strMeal}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {meal.strArea} Dish
                  </p>
                  <button
                    onClick={() => dispatch(addToCart(meal))}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
