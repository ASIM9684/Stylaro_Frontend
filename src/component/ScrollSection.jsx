import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const ScrollSection = ({ title, products, bgGradient }) => {
  const scrollRef = useRef(null);
  const [favorites, setFavorites] = useState(
    Array(products.length).fill(false)
  );

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  const toggleFavorite = (index) => {
    const updated = [...favorites];
    updated[index] = !updated[index];
    setFavorites(updated);
  };

  return (
    <section className={`w-full ${bgGradient} py-12`}>
      <div className="max-w-screen-xl mx-auto px-4 relative">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded mt-2" />
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
          >
            {products.map((product, i) => (
              <div
                key={i}
                className="min-w-[260px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(i)}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow"
                  >
                    <Heart
                      className="w-5 h-5"
                      stroke="red"
                      strokeWidth={2}
                      fill={favorites[i] ? "red" : "none"}
                    />
                  </button>
                </div>
                <div className="p-4 text-black">
                  <h3 className="text-lg font-semibold truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-1">Rs: {product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Controls */}
          <button
            onClick={() => scroll("left")}
            className="absolute top-1/2 -translate-y-1/2 left-0 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute top-1/2 -translate-y-1/2 right-0 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScrollSection;
