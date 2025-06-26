import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import ImageSlidShow from "../component/ImageSlidShow";

const dummyData = {
  clothes: [
    { name: "T-Shirt", price: 1200, image: "https://via.placeholder.com/300x200?text=T-Shirt" },
    { name: "Jeans", price: 2400, image: "https://via.placeholder.com/300x200?text=Jeans" },
    { name: "Jacket", price: 3800, image: "https://via.placeholder.com/300x200?text=Jacket" },
    { name: "Hoodie", price: 2200, image: "https://via.placeholder.com/300x200?text=Hoodie" },
    { name: "Shirt", price: 1600, image: "https://via.placeholder.com/300x200?text=Shirt" }
  ],
  bags: [
    { name: "Backpack", price: 3000, image: "https://via.placeholder.com/300x200?text=Backpack" },
    { name: "Handbag", price: 4500, image: "https://via.placeholder.com/300x200?text=Handbag" },
    { name: "Tote", price: 2700, image: "https://via.placeholder.com/300x200?text=Tote" },
    { name: "Messenger", price: 3200, image: "https://via.placeholder.com/300x200?text=Messenger" },
    { name: "Sling Bag", price: 1900, image: "https://via.placeholder.com/300x200?text=Sling+Bag" }
  ],
  shoes: [
    { name: "Sneakers", price: 5000, image: "https://via.placeholder.com/300x200?text=Sneakers" },
    { name: "Boots", price: 6000, image: "https://via.placeholder.com/300x200?text=Boots" },
    { name: "Loafers", price: 3500, image: "https://via.placeholder.com/300x200?text=Loafers" },
    { name: "Sandals", price: 2000, image: "https://via.placeholder.com/300x200?text=Sandals" },
    { name: "Heels", price: 4500, image: "https://via.placeholder.com/300x200?text=Heels" }
  ]
};

const ScrollSection = ({ title, products }) => {
  const scrollRef = useRef(null);
  const [favorites, setFavorites] = useState(Array(products.length).fill(false));

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth"
      });
    }
  };

  const toggleFavorite = (index) => {
    const updated = [...favorites];
    updated[index] = !updated[index];
    setFavorites(updated);
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide">
        {products.map((product, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] min-w-[300px] relative"
          >
            <div className="relative">
              <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
              <button
                onClick={() => toggleFavorite(i)}
                className="absolute top-2 right-2 bg-white/70 p-1 rounded-full hover:scale-110 transition-transform"
              >
                <Heart
                  className="w-5 h-5"
                  stroke={favorites[i] ? "red" : "white"}
                  fill={favorites[i] ? "red" : "none"}
                />
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
              <p className="text-gray-600">Rs: {product.price}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

const Home = () => {
  return (
    <div className="space-y-16 mt-10 xl:p-0 p-5">
      <ImageSlidShow/>
      <ScrollSection title="Clothes" products={dummyData.clothes} />
      <ScrollSection title="Bags" products={dummyData.bags} />
      <ScrollSection title="Shoes" products={dummyData.shoes} />
    </div>
  );
};

export default Home;
