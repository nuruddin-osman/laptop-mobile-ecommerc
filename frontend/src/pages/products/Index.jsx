import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);

  // Sample products data
  const allProducts = [
    // Laptops
    {
      id: 1,
      name: "MacBook Pro 16",
      price: 2399,
      rating: 4.5,
      reviewCount: 132,
      description: "Powerful laptop for professionals with M2 Pro chip",
      image: "https://via.placeholder.com/300x200?text=MacBook+Pro",
      category: "laptops",
      brand: "Apple",
    },
    {
      id: 2,
      name: "Dell XPS 13",
      price: 1299,
      rating: 4.3,
      reviewCount: 87,
      description: "Ultra-thin laptop with InfinityEdge display",
      image: "https://via.placeholder.com/300x200?text=Dell+XPS+13",
      category: "laptops",
      brand: "Dell",
    },
    {
      id: 3,
      name: "HP Spectre x360",
      price: 1499,
      rating: 4.2,
      reviewCount: 64,
      description: "Convertible laptop with premium design",
      image: "https://via.placeholder.com/300x200?text=HP+Spectre",
      category: "laptops",
      brand: "HP",
    },
    // Mobiles
    {
      id: 4,
      name: "iPhone 14 Pro",
      price: 999,
      rating: 4.8,
      reviewCount: 245,
      description: "Latest iPhone with Dynamic Island and 48MP camera",
      image: "https://via.placeholder.com/300x200?text=iPhone+14+Pro",
      category: "mobiles",
      brand: "Apple",
    },
    {
      id: 5,
      name: "Samsung Galaxy S23",
      price: 899,
      rating: 4.6,
      reviewCount: 156,
      description: "Android flagship with powerful camera system",
      image: "https://via.placeholder.com/300x200?text=Galaxy+S23",
      category: "mobiles",
      brand: "Samsung",
    },
    {
      id: 6,
      name: "Google Pixel 7",
      price: 799,
      rating: 4.4,
      reviewCount: 98,
      description: "Google's flagship with exceptional camera software",
      image: "https://via.placeholder.com/300x200?text=Pixel+7",
      category: "mobiles",
      brand: "Google",
    },
  ];

  // Filter products by category if specified
  const filteredProducts = category
    ? allProducts.filter((product) => product.category === category)
    : allProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
          : "All Products"}
      </h1>

      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar - Hidden on mobile by default */}
        <div
          className={`md:w-1/4 mb-6 md:mb-0 md:pr-6 ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Category</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    defaultChecked={!category}
                  />
                  All Products
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    defaultChecked={category === "laptops"}
                  />
                  Laptops
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    defaultChecked={category === "mobiles"}
                  />
                  Mobiles
                </label>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="price" className="mr-2" />
                  Under $500
                </label>
                <label className="flex items-center">
                  <input type="radio" name="price" className="mr-2" />
                  $500 - $1000
                </label>
                <label className="flex items-center">
                  <input type="radio" name="price" className="mr-2" />
                  $1000 - $1500
                </label>
                <label className="flex items-center">
                  <input type="radio" name="price" className="mr-2" />
                  Over $1500
                </label>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Brand</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Apple
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Samsung
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Dell
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  HP
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Google
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
            <button
              className="md:hidden flex items-center bg-blue-600 text-white py-2 px-4 rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" />
              Filters
            </button>

            <select className="hidden md:block bg-white border border-gray-300 rounded-md py-2 px-4">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
