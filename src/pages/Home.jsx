import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingBag, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproducts } from "../redux/slice/productSlice";
import ImageSlidShow from "../component/ImageSlidShow";

// Hero Carousel Component
// const ImageSlidShow = () => {
//   const images = [
//     "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
//     "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
//   ];
  
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-xl mb-16">
//       {images.map((img, index) => (
//         <div 
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
//         >
//           <img 
//             src={img} 
//             alt={`Slide ${index}`} 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-12">
//             <div className="max-w-2xl">
//               <h2 className="text-4xl font-bold text-white mb-4">New Season Collection</h2>
//               <p className="text-lg text-gray-200 mb-6">Discover our latest arrivals with up to 30% off</p>
//               <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
//                 Shop Now
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// Product Card Component
const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4]">
        <img
          className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
          src={product.image}
          alt={product.name}
        />
        <div className={`absolute inset-0 bg-black/10 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-white text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors">
            <ShoppingBag size={16} /> Add to Cart
          </button>
        </div>
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:scale-110 transition-all"
        >
          <Heart
            size={20}
            className="transition-colors"
            stroke="currentColor"
            strokeWidth={2}
            fill={isFavorite ? "currentColor" : "none"}
            color={isFavorite ? "#ef4444" : "#6b7280"}
          />
        </button>
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
          <div className="flex items-center">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm ml-1 text-gray-600">{product.rating || '4.5'}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Scrollable Product Section
const ScrollSection = ({ title, products, bgColor }) => {
  const scrollRef = useRef(null);
  const [favorites, setFavorites] = useState(Array(products.length).fill(false));
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = dir === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const toggleFavorite = (index) => {
    const updated = [...favorites];
    updated[index] = !updated[index];
    setFavorites(updated);
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    ref?.addEventListener('scroll', checkScrollPosition);
    return () => ref?.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return (
    <div className={`${bgColor} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
          </div>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium flex items-center">
            View all
            <ChevronRight className="ml-1" size={18} />
          </a>
        </div>

        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 z-10 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
          
          <div
            ref={scrollRef}
            className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
          >
            {products.map((product, i) => (
              <div key={i} className="snap-start">
                <ProductCard 
                  product={product} 
                  isFavorite={favorites[i]} 
                  onToggleFavorite={() => toggleFavorite(i)} 
                />
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 z-10 transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Category Grid Component
const CategoryGrid = () => {
  const categories = [
    { name: "Men's Fashion", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80" },
    { name: "Women's Wear", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { name: "Electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { name: "Home & Living", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="relative group overflow-hidden rounded-xl shadow-md h-64">
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-6">
              <h3 className="text-xl font-semibold text-white">{category.name}</h3>
            </div>
            <a href="#" className="absolute inset-0" aria-label={`Shop ${category.name}`}></a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic
    alert(`Thank you for subscribing with ${email}`);
    setEmail("");
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Subscribe to our newsletter for the latest products, deals, and style inspiration.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

const Home = () => {
  const {
    product: products,
    loadingproduct,
    errorproduct,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchproducts());
  }, [dispatch]);

  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});
  };

  const backgroundColors = [
    "bg-gray-50",
    "bg-white",
    "bg-gray-50",
    "bg-white",
  ];

  // Add mock data for demonstration
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      name: "Classic Leather Watch",
      category: "Accessories",
      price: 149.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      category: "Men's Fashion",
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
    },
    {
      id: 4,
      name: "Smart Fitness Tracker",
      category: "Electronics",
      price: 79.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 5,
      name: "Ceramic Coffee Mug Set",
      category: "Home & Kitchen",
      price: 24.99,
      originalPrice: 34.99,
      discount: 29,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
  ];

  const groupedProducts = groupByCategory(products);
  const categories = Object.entries(groupedProducts);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ImageSlidShow />
      </div>

      {/* Featured Products */}
      <ScrollSection 
        title="Featured Products" 
        products={featuredProducts} 
        bgColor="bg-white" 
      />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Category Sections */}
      {categories.map(([category, items], index) => (
        <ScrollSection
          key={category}
          title={category}
          products={items}
          bgColor={backgroundColors[index % backgroundColors.length]}
        />
      ))}

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;