import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, FilterX, Heart, Star, ShoppingBag, ChevronDown, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slice/categorySlice";
import { fetchColors } from "../redux/slice/colorSlice";
import { fetchproducts } from "../redux/slice/productSlice";


const genderOptions = ["Male", "Female", "Unisex"];

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-black/10 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-white text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md"
          >
            <ShoppingBag size={16} /> Add to Cart
          </button>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
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
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating || '4.5'}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: product.color.toLowerCase() }} />
          <span className="text-sm text-gray-600">{product.color}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">{product.gender}</span>
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">Rs {product.price.toLocaleString()}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">Rs {product.originalPrice.toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const [sortOption, setSortOption] = useState("lowToHigh");
  const [activeColor, setActiveColor] = useState("");
  const [activeGender, setActiveGender] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const { categories, loading, error } = useSelector((state) => state.category);
  const { Colors, loadingColor, errorColor } = useSelector((state) => state.color);
  const { product, loadingproduct, errorproduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchColors());
    dispatch(fetchproducts());
  }, [dispatch]);
  
  useEffect(() => {
    if (product && product.length > 0) {
      let filtered = [...product];

      if (activeColor) {
        filtered = filtered.filter(
          (product) => product.color.toLowerCase() === activeColor.toLowerCase()
        );
      }

      if (activeGender) {
        filtered = filtered.filter(
          (product) => product.gender.toLowerCase() === activeGender.toLowerCase()
        );
      }

      if (activeCategory) {
        filtered = filtered.filter(
          (product) =>
            product.category.toLowerCase() === activeCategory.toLowerCase()
        );
      }

      if (sortOption === "lowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
      } else {
        filtered.sort((a, b) => b.price - a.price);
      }
      
      setFilteredProducts(filtered);
    }
  }, [sortOption, activeColor, activeGender, activeCategory, product]);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Explore Our Latest Collection
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full lg:w-72 space-y-8">
            <div className="bg-gray-50 rounded-2xl shadow-md p-6 space-y-6 border border-gray-200">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Sort by Price
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSortOption("lowToHigh")}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      sortOption === "lowToHigh"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <span>Low to High</span>
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSortOption("highToLow")}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      sortOption === "highToLow"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <span>High to Low</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Filter by Color
                </h3>
                <div className="flex flex-wrap gap-3">
                  {loadingColor ? (
                    <p className="text-sm text-gray-400">Loading...</p>
                  ) : errorColor ? (
                    <p className="text-sm text-red-500">Error: {errorColor}</p>
                  ) : Colors && Colors.length > 0 ? (
                    Colors.map((color) => (
                      <button
                        key={color._id}
                        className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${
                          activeColor === color.name
                            ? "ring-2 ring-offset-2 ring-green-600 scale-110 border-white"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.name.toLowerCase() }}
                        onClick={() =>
                          setActiveColor(
                            activeColor === color.name ? "" : color.name
                          )
                        }
                        title={color.name}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No colors found</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Filter by Gender
                </h3>
                <div className="space-y-2">
                  {genderOptions.map((gender) => (
                    <button
                      key={gender}
                      onClick={() =>
                        setActiveGender(activeGender === gender ? "" : gender)
                      }
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeGender === gender
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Filter by Category
                </h3>
                <div className="space-y-2">
                  {loading ? (
                    <p className="text-sm text-gray-400">Loading...</p>
                  ) : error ? (
                    <p className="text-sm text-red-500">Error: {error}</p>
                  ) : categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <button
                        key={category._id || category.name}
                        onClick={() =>
                          setActiveCategory(
                            activeCategory === category.name
                              ? ""
                              : category.name
                          )
                        }
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeCategory === category.name
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No categories found</p>
                  )}
                </div>
              </div>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 bg-white border border-red-300 text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg font-medium transition-colors shadow"
              onClick={() => {
                setActiveColor("");
                setActiveGender("");
                setActiveCategory("");
              }}
            >
              <FilterX className="w-4 h-4" /> Clear Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {(activeColor || activeGender || activeCategory) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {activeColor && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Color: {activeColor}
                    <button
                      onClick={() => setActiveColor("")}
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-600 hover:bg-green-200"
                    >
                      ×
                    </button>
                  </span>
                )}
                {activeGender && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Gender: {activeGender}
                    <button
                      onClick={() => setActiveGender("")}
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-600 hover:bg-green-200"
                    >
                      ×
                    </button>
                  </span>
                )}
                {activeCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Category: {activeCategory}
                    <button
                      onClick={() => setActiveCategory("")}
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-600 hover:bg-green-200"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {loadingproduct ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : errorproduct ? (
              <div className="bg-red-50 rounded-xl shadow-sm p-12 text-center border border-red-200">
                <div className="max-w-md mx-auto">
                  <svg
                    className="mx-auto h-12 w-12 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-red-900">
                    Error loading products
                  </h3>
                  <p className="mt-1 text-sm text-red-500">
                    {errorproduct}
                  </p>
                </div>
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                 <ProductCard 
                    key={product._id} 
                    product={product} 
                    onAddToCart={handleAddToCart} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl shadow-sm p-12 text-center border border-gray-200">
                <div className="max-w-md mx-auto">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No products found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;