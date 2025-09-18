import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  // Sample products data - in real app, this would come from API
  const featuredProducts = [
    {
      id: 1,
      name: "MacBook Pro 16",
      price: 2399,
      rating: 4.5,
      reviewCount: 132,
      description: "Powerful laptop for professionals with M2 Pro chip",
      image: "https://via.placeholder.com/300x200?text=MacBook+Pro",
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      price: 999,
      rating: 4.8,
      reviewCount: 245,
      description: "Latest iPhone with Dynamic Island and 48MP camera",
      image: "https://via.placeholder.com/300x200?text=iPhone+14+Pro",
    },
    {
      id: 3,
      name: "Dell XPS 13",
      price: 1299,
      rating: 4.3,
      reviewCount: 87,
      description: "Ultra-thin laptop with InfinityEdge display",
      image: "https://via.placeholder.com/300x200?text=Dell+XPS+13",
    },
    {
      id: 4,
      name: "Samsung Galaxy S23",
      price: 899,
      rating: 4.6,
      reviewCount: 156,
      description: "Android flagship with powerful camera system",
      image: "https://via.placeholder.com/300x200?text=Galaxy+S23",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to TechBazar
          </h1>
          <p className="text-xl mb-8">
            Find the best laptops and mobile phones at amazing prices
          </p>
          <Link
            to="/products"
            className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Browse Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/products/laptops" className="relative group">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://via.placeholder.com/600x300?text=Laptops"
                  alt="Laptops"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-3xl text-white font-bold">Laptops</h3>
                </div>
              </div>
            </Link>
            <Link to="/products/mobiles" className="relative group">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://via.placeholder.com/600x300?text=Mobiles"
                  alt="Mobiles"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-3xl text-white font-bold">Mobiles</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
