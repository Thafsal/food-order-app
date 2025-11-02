import { useState, useEffect } from "react";
import carousel1 from "../assets/car-1.jpg";
import carousel2 from "../assets/car-2.jpg";
import carousel3 from "../assets/car-3.png";

const carouselImages = [carousel1, carousel2 , carousel3];

const Carrousal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto mt-6 rounded-xl shadow-lg overflow-hidden relative border-4 border-white">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselImages.map((img, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img
              src={img}
              className="w-full h-64 md:h-[25rem] object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === idx ? "bg-orange-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carrousal;
