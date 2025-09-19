import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaHeart,
  FaBars,
  FaTimes,
  FaBox,
  FaPhoneAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 text-center text-sm">
        <p>
          🎉 বিশেষ অফার! আজই অর্ডার করুন এবং পাচ্ছেন ১০% ছাড়! | বিনামূল্যে
          ডেলিভারি ৫০০৳+ অর্ডারে
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Header Section */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 flex items-center"
            >
              <FaBox className="mr-2" />
              NuruddinTech
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="flex w-full">
                <input
                  type="text"
                  name="search"
                  placeholder="What are you looking for? (Ex: iPhone, MacBook)"
                  className="w-full py-2 px-4 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-r-full hover:bg-blue-700 transition-colors"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Right Icons - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={toggleSearch}
                className="md:hidden text-gray-600 hover:text-blue-600"
              >
                <FaSearch size={18} />
              </button>

              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaUser size={18} />
                  <span className="ml-1">My Account</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/account"
                      className=" px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600 flex items-center"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser className="mr-2" /> Profile
                    </Link>
                    <Link
                      to="/wishlist"
                      className=" px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600 flex items-center"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaHeart className="mr-2" /> Wishlist
                    </Link>
                    <Link
                      to="/orders"
                      className=" px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600 flex items-center"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaBox className="mr-2" /> Orders
                    </Link>
                    <hr className="my-1" />
                    <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 flex items-center">
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>

              <Link
                to="/wishlist"
                className="text-gray-600 hover:text-blue-600 relative"
              >
                <FaHeart size={18} />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  3
                </span>
              </Link>

              <Link
                to="/cart"
                className="text-gray-600 hover:text-blue-600 relative"
              >
                <FaShoppingCart size={18} />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  2
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden text-gray-600">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Search - Shows when toggled */}
          {isSearchOpen && (
            <div className="md:hidden py-3 border-t border-gray-200">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  name="search"
                  placeholder="খুঁজুন..."
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          )}

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex justify-end py-3 border-t border-gray-200">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                All products
              </Link>
              <Link
                to="/products/laptops"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Laptop
              </Link>
              <Link
                to="/products/mobiles"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Mobile
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About us
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile Menu - Shows when toggled */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  হোম
                </Link>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  সকল প্রোডাক্ট
                </Link>
                <Link
                  to="/products/laptops"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ল্যাপটপ
                </Link>
                <Link
                  to="/products/mobiles"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  মোবাইল
                </Link>

                <hr />

                <Link
                  to="/account"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser className="mr-2" /> আমার অ্যাকাউন্ট
                </Link>
                <Link
                  to="/wishlist"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaHeart className="mr-2" /> উইশলিস্ট
                </Link>
                <Link
                  to="/cart"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaShoppingCart className="mr-2" /> কার্ট
                  <span className="ml-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    2
                  </span>
                </Link>

                <hr />

                <Link
                  to="/about"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  আমাদের সম্পর্কে
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaPhoneAlt className="mr-2" /> যোগাযোগ
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
