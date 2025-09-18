import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
            TechBazar
          </Link>

          {/* Search Bar */}
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/account" className="flex items-center">
              <FaUser className="mr-1" />
              <span className="hidden md:inline">Account</span>
            </Link>
            <Link to="/cart" className="flex items-center relative">
              <FaShoppingCart className="mr-1" />
              <span className="hidden md:inline">Cart</span>
              <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Categories */}
        <nav className="mt-4">
          <ul className="flex flex-wrap justify-center space-x-6">
            <li>
              <Link to="/products/laptops" className="hover:underline">
                Laptops
              </Link>
            </li>
            <li>
              <Link to="/products/mobiles" className="hover:underline">
                Mobiles
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                All Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
